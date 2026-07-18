// PreToolUse guard (Douglas's file-containment rule, 2026-07-18):
// every session's files live INSIDE D:\MTB Bike Builder. This hook auto-denies
// any `git worktree add` / `git clone` whose absolute target path is outside
// the project, which is the failure mode that actually happened (worktrees at
// D:\gdd-a3f1 and D:\mtb-wt-rsq-195f). Relative paths resolve to the session
// cwd (inside the project) and pass. Harness temp scratchpads under
// AppData\Local\Temp\claude are harness-managed and exempt.
'use strict';
var data = '';
process.stdin.on('data', function (c) { data += c; });
process.stdin.on('end', function () {
  var cmd = '';
  try { cmd = (JSON.parse(data).tool_input || {}).command || ''; } catch (e) { return; }
  if (!/\bworktree\s+add\b|\bgit\s+clone\b/i.test(cmd)) return;
  // absolute path tokens: X:\..., X:/..., or git-bash /x/... — quoted or bare
  var abs = cmd.match(/(?:"[A-Za-z]:[\\\/][^"]*"|'[A-Za-z]:[\\\/][^']*'|[A-Za-z]:[\\\/][^\s'"]+|"\/[a-z]\/[^"]*"|'\/[a-z]\/[^']*'|\/[a-z]\/[^\s'"]+)/g) || [];
  var bad = abs.filter(function (p) {
    var n = p.replace(/^['"]|['"]$/g, '').toLowerCase().replace(/\//g, '\\').replace(/\\+/g, '\\');
    if (n.indexOf('mtb bike builder') !== -1) return false;      // inside the project
    if (/\\temp\\claude\\/.test(n)) return false;                // harness scratchpad
    // unquoted "D:\MTB Bike Builder\..." truncates at the space to "D:\MTB" —
    // a token that is a PREFIX of the project root is inside, not a stray
    if ('d:\\mtb bike builder'.indexOf(n) === 0) return false;
    var tail = n.replace(/^[a-z]:\\|^\\[a-z]\\/, '');
    if ('mtb bike builder'.indexOf(tail) === 0) return false;
    return true;
  });
  if (bad.length) {
    process.stdout.write(JSON.stringify({
      hookSpecificOutput: {
        hookEventName: 'PreToolUse',
        permissionDecision: 'deny',
        permissionDecisionReason: 'FILE CONTAINMENT (CLAUDE.md hard rule): all files stay inside D:\\MTB Bike Builder. Blocked outside path: ' + bad[0] + ' - create your worktree at .claude/worktrees/<unique-name> instead.'
      }
    }));
  }
});
