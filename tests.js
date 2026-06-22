'use strict';
/* Test entry point. Run with:  node tests.js   (or: npm test)
   Each suite registers its tests on require; then we run them all. */

require('./test/test-data.js');     // the real catalog passes the schema validator
require('./test/test-schema.js');   // the validator itself catches bad data
require('./test/test-engine.js');   // compatibility rules behave
require('./test/test-greying.js');  // dot / conflict predicate
require('./test/test-pricing.js');  // bundle pricing + weight totals
require('./test/test-golden.js');   // whole real bikes pass; known-bad fail

require('./test/test-harness.js').run();
