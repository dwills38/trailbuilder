// PreToolUse guard (Douglas's rules). Two independent policies:
//
//  A. FILE CONTAINMENT (2026-07-18; HARDENED 2026-07-22): every session's files
//     live INSIDE D:\MTB Bike Builder. Only exemption: the harness-managed temp
//     scratchpad under AppData\Local\Temp\claude.
//       1. Bash/PowerShell `git worktree add` / `git clone` to an outside path.
//       2. Write / Edit / NotebookEdit whose file_path is outside the project.
//       3. Bash/PowerShell write-shaped commands (redirects, tee/mv/cp/mkdir/
//          touch, Out-File/Set-Content/Add-Content/New-Item/Copy-Item/Move-Item)
//          carrying an outside absolute path. Read-only system-path commands pass.
//
//  B. NO DOWNLOADS (2026-07-23, Douglas: a chip tried to browser-download
//     "intro_tecnica_jena_eng.pdf"): no session downloads files (PDFs especially).
//     Read a spec PDF via WebFetch (it extracts text, saves nothing); a maker PDF
//     WebFetch can't read is a documented wall — skip the row, never download it.
//       4. Browser navigation (mcp__Claude_Browser__navigate / preview_start,
//          mcp__claude-in-chrome__navigate) to a file-download URL — navigating
//          the browser to a .pdf/.zip/etc. triggers a download. (Query strings are
//          stripped first, so an HTML page like "...?country=us" is NOT blocked.)
//       5. Bash/PowerShell download-to-save commands (wget, curl -o/-O/--output,
//          Invoke-WebRequest/iwr -OutFile, Start-BitsTransfer, certutil -urlcache).
//          `curl URL` to stdout (how chips read sram.com) is NOT a download — allowed.
//     NOTE: a download triggered by CLICKING a page's download button can't be seen
//     here (the click's target URL isn't in the tool args) — that vector is covered
//     by chip wording + any browser-level download setting, not this hook.
//
// Self-test: node tools/hooks/test-guard.js
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

  function denyReason(reason) {
    process.stdout.write(JSON.stringify({
      hookSpecificOutput: {
        hookEventName: 'PreToolUse',
        permissionDecision: 'deny',
        permissionDecisionReason: reason
      }
    }));
  }
  function deny(path, hint) {
    denyReason('FILE CONTAINMENT (CLAUDE.md hard rule 5): ALL project files stay inside D:\\MTB Bike Builder. Blocked outside path: ' + path + ' - ' + hint);
  }
  function denyDownload(what, hint) {
    denyReason('NO DOWNLOADS (CLAUDE.md hard rule): no session downloads files. ' + hint + ' Blocked: ' + what);
  }

  // A token is INSIDE iff it resolves under the project root or the harness
  // temp scratchpad. Everything else absolute is outside.
  function isOutside(raw) {
    var n = raw.replace(/^['"]|['"]$/g, '').toLowerCase()
               .replace(/\//g, '\\').replace(/\\+/g, '\\');
    if (!/^[a-z]:\\|^\\[a-z]\\/.test(n)) return false;           // not absolute
    if (n.indexOf('mtb bike builder') !== -1) return false;      // inside the project
    if (/\\temp\\claude\\/.test(n)) return false;                // harness scratchpad
    if (/^c:\\users\\[^\\]+\\\.claude\\/.test(n)) return false;  // harness home (memory, config)
    // Douglas's sanctioned backup folder (2026-07-23, his explicit word: "you can make a
    // back up buildmymtb for critical files that aren't on git... make sure it is on D:
    // and that is THE ONLY OTHER FOLDER YOU HAVE PERMISSION TO TOUCH"). Deliberately an
    // exact-prefix match on ONE path — it does not open D:\ generally.
    // exact root or a child of it — NOT a bare prefix, so "…-backup-evil\" stays blocked
    if (n === 'd:\\buildmymtb-backup' ||
        n.indexOf('d:\\buildmymtb-backup\\') === 0) return false; // sanctioned backup root
    // unquoted "D:\MTB Bike Builder\..." truncates at the space to "D:\MTB" —
    // a token that is a PREFIX of the project root is inside, not a stray
    if ('d:\\mtb bike builder'.indexOf(n) === 0) return false;
    var tail = n.replace(/^[a-z]:\\|^\\[a-z]\\/, '');
    if ('mtb bike builder'.indexOf(tail) === 0) return false;
    return true;
  }

  // Downloadable file extension at the END of a URL/path (query already stripped).
  var DL_EXT = /\.(pdf|zip|7z|rar|tar|gz|tgz|dmg|exe|msi|xls|xlsx|doc|docx|csv|ppt|pptx|bin|iso|apk|pkg)$/i;

  // --- Route 4: browser navigation to a file-download URL (NO DOWNLOADS) ---
  if (toolName === 'mcp__Claude_Browser__navigate' ||
      toolName === 'mcp__Claude_Browser__preview_start' ||
      toolName === 'mcp__claude-in-chrome__navigate') {
    var url = (ti.url || '') + '';
    var pathPart = url.split(/[?#]/)[0];   // drop query/fragment so "?country=us" HTML pages pass
    if (DL_EXT.test(pathPart)) {
      denyDownload(url, 'Reading a maker spec PDF? WebFetch the URL instead (it extracts text without saving); if WebFetch can\'t read it, it\'s a documented wall — skip the row.');
    }
    return;
  }

  // --- Route 2: file-writing tools (containment) ---
  if (toolName === 'Write' || toolName === 'Edit' || toolName === 'NotebookEdit') {
    var fp = ti.file_path || ti.notebook_path || '';
    if (fp && isOutside(fp))
      deny(fp, 'write inside D:\\MTB Bike Builder (worktrees at .claude\\worktrees, scratch inside your worktree or the harness Temp\\claude scratchpad).');
    return;
  }

  // --- Shell commands (Routes 5, 1, 3) ---
  var cmd = ti.command || '';
  if (!cmd) return;

  // Route 5: file-download shell commands. The tool must be at a real COMMAND POSITION
  // (start, or after a pipe / ; / && / newline) so a MENTION inside a quoted commit message
  // or echo does NOT trip it — and only when it actually SAVES a file. A fetch to stdout
  // (`curl URL`, `iwr URL` — how chips read sram.com) is not a download -> allowed.
  var dlm = cmd.match(/(?:^|[|;&\n])\s*(?:sudo\s+)?(wget|curl|invoke-webrequest|iwr|start-bitstransfer|certutil)(?:\.exe)?\b([^|;&\n]*)/i);
  if (dlm) {
    var dtool = dlm[1].toLowerCase(), drest = dlm[2] || '';
    var saves = dtool === 'wget' || dtool === 'start-bitstransfer'
      || (dtool === 'curl' && /(?:^|\s)-[oO]\b|\s--output\b|\s--remote-name\b/.test(drest))
      || ((dtool === 'invoke-webrequest' || dtool === 'iwr') && /-OutFile\b/i.test(drest))
      || (dtool === 'certutil' && /-urlcache\b/i.test(drest));
    if (saves) {
      denyDownload(cmd.slice(0, 140), 'Fetch page/spec text with WebFetch instead; a maker PDF WebFetch can\'t read is a documented wall — skip it, don\'t save it.');
      return;
    }
  }

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
  if (/(?:^|[^>])>{1,2}\s*["']?(?:[A-Za-z]:[\\\/]|\/[a-z]\/)|\b(?:tee|mv|cp|mkdir|touch|rsync|robocopy|xcopy)\b|\b(?:Out-File|Set-Content|Add-Content|New-Item|Copy-Item|Move-Item)\b/i.test(cmd)) {
    deny(bad[0], 'redirect/copy/create files only inside D:\\MTB Bike Builder (or the harness Temp\\claude scratchpad).');
  }
});
