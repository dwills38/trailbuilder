// PreToolUse guard (Douglas's file-containment rule, 2026-07-18; HARDENED 2026-07-22):
// every session's files live INSIDE D:\MTB Bike Builder. Only exemption: the
// harness-managed temp scratchpad under AppData\Local\Temp\claude.
//
// Coverage (each a leak route that actually happened):
//   1. Bash/PowerShell `git worktree add` / `git clone` targeting an outside
//      absolute path (the D:\gdd-a3f1 / D:\mtb-wt-rsq-195f pattern).
//   2. Write / Edit / NotebookEdit tool calls whose file_path is outside the
//      project (scratch files at D:\ root, found 2026-07-22).
//   3. Bash/PowerShell write-shaped commands (redirects, tee/mv/cp/mkdir/touch,
//      Out-File/Set-Content/Add-Content/New-Item/Copy-Item/Move-Item) carrying
//      an outside absolute path token. Read-only commands with system paths
//      (node, npm, git plumbing) pass untouched.
'use strict';
var data = '';
process.stdin.on('data', function (c) { data += c; });
process.stdin.on('end', function () {
  var input, toolName, ti;
  try {
    input = JSON.parse(data);
    toolName = input.tool_name || '';
    ti = input.tool_input || {};
  } catch (e) { return; }

  function deny(path, hint) {
    process.stdout.write(JSON.stringify({
      hookSpecificOutput: {
        hookEventName: 'PreToolUse',
        permissionDecision: 'deny',
        permissionDecisionReason: 'FILE CONTAINMENT (CLAUDE.md hard rule 5): ALL project files stay inside D:\\MTB Bike Builder. Blocked outside path: ' + path + ' - ' + hint
      }
    }));
  }

  // A token is INSIDE iff it resolves under the project root or the harness
  // temp scratchpad. Everything else absolute is outside.
  function isOutside(raw) {
    var n = raw.replace(/^['"]|['"]$/g, '').toLowerCase()
               .replace(/\//g, '\\').replace(/\\+/g, '\\');
    if (!/^[a-z]:\\|^\\[a-z]\\/.test(n)) return false;           // not absolute
    if (n.indexOf('mtb bike builder') !== -1) return false;      // inside the project
    if (/\\temp\\claude\\/.test(n)) return false;                // harness scratchpad
    // unquoted "D:\MTB Bike Builder\..." truncates at the space to "D:\MTB" —
    // a token that is a PREFIX of the project root is inside, not a stray
    if ('d:\\mtb bike builder'.indexOf(n) === 0) return false;
    var tail = n.replace(/^[a-z]:\\|^\\[a-z]\\/, '');
    if ('mtb bike builder'.indexOf(tail) === 0) return false;
    return true;
  }

  // --- Route 2: file-writing tools ---------------------------------------
  if (toolName === 'Write' || toolName === 'Edit' || toolName === 'NotebookEdit') {
    var fp = ti.file_path || ti.notebook_path || '';
    if (fp && isOutside(fp))
      deny(fp, 'write inside D:\\MTB Bike Builder (worktrees at .claude\\worktrees, scratch inside your worktree or the harness Temp\\claude scratchpad).');
    return;
  }

  // --- Routes 1 + 3: shell commands ---------------------------------------
  var cmd = ti.command || '';
  if (!cmd) return;
  var absTokens = cmd.match(/(?:"[A-Za-z]:[\\\/][^"]*"|'[A-Za-z]:[\\\/][^']*'|[A-Za-z]:[\\\/][^\s'"]+|"\/[a-z]\/[^"]*"|'\/[a-z]\/[^']*'|\/[a-z]\/[^\s'"]+)/g) || [];
  if (!absTokens.length) return;
  var bad = absTokens.filter(isOutside);
  if (!bad.length) return;

  // Route 1: worktree/clone with ANY outside absolute path -> deny.
  if (/\bworktree\s+add\b|\bgit\s+clone\b/i.test(cmd)) {
    deny(bad[0], 'create your worktree at .claude/worktrees/<unique-name> instead.');
    return;
  }
  // Route 3: write-shaped shell command with an outside absolute path -> deny.
  // (Pure reads of system paths - node, npm, git, cat - do not match this list.)
  if (/(?:^|[^>])>{1,2}\s*["']?(?:[A-Za-z]:[\\\/]|\/[a-z]\/)|\b(?:tee|mv|cp|mkdir|touch|rsync|robocopy|xcopy)\b|\b(?:Out-File|Set-Content|Add-Content|New-Item|Copy-Item|Move-Item)\b/i.test(cmd)) {
    deny(bad[0], 'redirect/copy/create files only inside D:\\MTB Bike Builder (or the harness Temp\\claude scratchpad).');
  }
});
