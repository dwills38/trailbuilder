'use strict';
/* Tiny zero-dependency test harness. Test files call test(...) to register;
   tests.js requires them all, then calls run(). No npm install needed. */

var tests = [];

function test(name, fn){ tests.push({ name: name, fn: fn }); }

function eq(actual, expected, msg){
  if(actual !== expected){
    throw new Error((msg ? msg + ': ' : '') +
      'expected ' + JSON.stringify(expected) + ', got ' + JSON.stringify(actual));
  }
}

function ok(value, msg){
  if(!value) throw new Error(msg || ('expected truthy, got ' + JSON.stringify(value)));
}

// assert that some string in `arr` contains substring `sub`
function some(arr, sub, msg){
  if(!arr.some(function(x){ return String(x).indexOf(sub) >= 0; })){
    throw new Error((msg ? msg + ': ' : '') + 'no item contained "' + sub + '"');
  }
}

function run(){
  var pass = 0, fail = 0, failures = [];
  tests.forEach(function(t){
    try { t.fn(); pass++; }
    catch(e){ fail++; failures.push({ name: t.name, err: e.message }); }
  });
  if(failures.length){
    console.log('');
    failures.forEach(function(f){ console.log('  FAIL  ' + f.name + '\n        ' + f.err); });
  }
  console.log('\n' + (fail ? 'FAILED' : 'PASSED') + ' - ' + pass + ' passed, ' + fail + ' failed, ' + tests.length + ' total');
  if(fail) process.exitCode = 1;
}

module.exports = { test: test, eq: eq, ok: ok, some: some, run: run };
