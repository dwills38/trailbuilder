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

  // --- H3 harden 2026-07-23: still-blocked (regression backstop) ---
  [{tool_name:'Bash', tool_input:{command:'wget https://example.com/spec.pdf'}}, 'deny'],
  [{tool_name:'Bash', tool_input:{command:'curl -o /d/spec.pdf https://example.com/spec.pdf'}}, 'deny'],
  [{tool_name:'Bash', tool_input:{command:'curl https://sram.com/en/sram/models/foo'}}, 'silent'],
  [{tool_name:'PowerShell', tool_input:{command:'Copy-Item x.txt D:\\buildmymtb-backup-evil\\x.txt'}}, 'deny'],
  [{tool_name:'Bash', tool_input:{command:'echo start && cp data/road.js /c/Users/Douglas/Desktop/road.js && echo done'}}, 'deny'],
  [{tool_name:'Bash', tool_input:{command:
    'git commit -F- <<\'EOF\'\n' +
    'unrelated doc text\n' +
    'EOF\n' +
    'cp data/road.js /c/Users/Douglas/Desktop/road.js'
  }}, 'deny'],

  // --- H3 harden 2026-07-23: newly-allowed (the false positives being fixed) ---
  [{tool_name:'Bash', tool_input:{command:
    'git commit -F- <<\'EOF\'\n' +
    'Docs reference D:\\other-project\\notes.md as prior art; no files touched.\n' +
    'EOF'
  }}, 'silent'],
  [{tool_name:'Bash', tool_input:{command:
    'node -e "var re = /^[A-Za-z]:\\\\/; console.log(re.test(\'C:\\\\Users\\\\x\'))"'
  }}, 'silent'],
  [{tool_name:'Bash', tool_input:{command:
    'node -e "var s = \'D:\\\\other-project\\\\a.js\'; console.log(s.length > 0)"'
  }}, 'silent'],
  [{tool_name:'PowerShell', tool_input:{command:'Copy-Item x.txt D:\\buildmymtb-backup\\x.txt'}}, 'silent'],
  [{tool_name:'PowerShell', tool_input:{command:'Copy-Item x.txt D:\\buildmymtb-backup\\subdir\\x.txt'}}, 'silent'],
  [{tool_name:'Bash', tool_input:{command:'echo "see D:\\other-project\\a.js for background" && node validate.js'}}, 'silent']
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
