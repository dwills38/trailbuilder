var cp = require('child_process');
var cases = [
  [{tool_name:'Write', tool_input:{file_path:'D:\\scratch_foo.js'}}, 'deny'],
  [{tool_name:'Write', tool_input:{file_path:'D:\\MTB Bike Builder\\src\\compat.js'}}, 'silent'],
  [{tool_name:'Write', tool_input:{file_path:'C:\\Users\\Douglas\\AppData\\Local\\Temp\\claude\\x\\scratch\\a.js'}}, 'silent'],
  [{tool_name:'Bash', tool_input:{command:'node x.js > /d/scratch_out.txt'}}, 'deny'],
  [{tool_name:'Bash', tool_input:{command:'git worktree add "D:\\gdd-9999" -b x origin/main'}}, 'deny'],
  [{tool_name:'Bash', tool_input:{command:'"C:\\Program Files\\nodejs\\node.exe" validate.js'}}, 'silent'],
  [{tool_name:'Bash', tool_input:{command:'mkdir /d/mtb-worktrees'}}, 'deny'],
  [{tool_name:'Bash', tool_input:{command:'git worktree add .claude/worktrees/x-1 -b x origin/main'}}, 'silent'],
  [{tool_name:'PowerShell', tool_input:{command:'Set-Content -Path D:\\leak.txt -Value hi'}}, 'deny'],
  [{tool_name:'Bash', tool_input:{command:'cat "D:\\MTB Bike Builder\\src\\compat.js" | head'}}, 'silent'],
  [{tool_name:'Edit', tool_input:{file_path:'D:\\other-project\\a.js'}}, 'deny'],
  [{tool_name:'Bash', tool_input:{command:'cp data/road.js /c/Users/Douglas/Desktop/road.js'}}, 'deny'],
  // --- NO DOWNLOADS (Route 4: browser navigation to a file URL) ---
  [{tool_name:'mcp__Claude_Browser__navigate', tool_input:{url:'https://www.wilier.com/intro_tecnica_jena_eng.pdf'}}, 'deny'],
  [{tool_name:'mcp__Claude_Browser__navigate', tool_input:{url:'https://www.sram.com/en/rockshox/models/fs-zeb-ult-b1'}}, 'silent'],
  [{tool_name:'mcp__Claude_Browser__navigate', tool_input:{url:'https://www.ribblecycles.co.uk/ribble-cgr-al-105-v3/?country=us'}}, 'silent'],
  [{tool_name:'mcp__Claude_Browser__preview_start', tool_input:{url:'https://example.com/spec-sheet.PDF'}}, 'deny'],
  [{tool_name:'mcp__claude-in-chrome__navigate', tool_input:{url:'https://x.com/catalog.zip'}}, 'deny'],
  // --- NO DOWNLOADS (Route 5: download-to-save shell commands) ---
  [{tool_name:'Bash', tool_input:{command:'wget https://www.wilier.com/intro_tecnica_jena_eng.pdf'}}, 'deny'],
  [{tool_name:'Bash', tool_input:{command:'curl -o jena.pdf https://www.wilier.com/intro_tecnica_jena_eng.pdf'}}, 'deny'],
  [{tool_name:'Bash', tool_input:{command:'curl -sL "https://www.sram.com/en/rockshox/models/fs-zeb-ult-b1"'}}, 'silent'],
  [{tool_name:'PowerShell', tool_input:{command:'Invoke-WebRequest https://x/y.pdf -OutFile y.pdf'}}, 'deny'],
  // mentions of download commands inside a commit message / echo must NOT trip Route 5
  [{tool_name:'Bash', tool_input:{command:'git commit -q -m "guard: block wget and curl -o and iwr -OutFile downloads"'}}, 'silent'],
  [{tool_name:'Bash', tool_input:{command:'echo "to fetch use wget or curl -o file"'}}, 'silent'],
  [{tool_name:'Bash', tool_input:{command:'grep -n "curl -o" tools/hooks/test-guard.js'}}, 'silent'],
  // real download after a shell separator still caught
  [{tool_name:'Bash', tool_input:{command:'cd /x && wget https://y/z.pdf'}}, 'deny']
];
var fails = 0;
cases.forEach(function(c, i){
  var r = cp.spawnSync('node', ['tools/hooks/guard-worktree-path.js'], {input: JSON.stringify(c[0]), encoding: 'utf8'});
  var denied = (r.stdout || '').indexOf('deny') !== -1;
  var want = c[1] === 'deny';
  var ok = denied === want;
  if (!ok) fails++;
  console.log((ok ? 'PASS' : 'FAIL') + '  #' + (i+1) + '  expected ' + c[1] + (ok ? '' : '  got: ' + (r.stdout || '(silent)')));
});
process.exit(fails ? 1 : 0);
