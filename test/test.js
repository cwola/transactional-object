
// esm
import transactionalObject from '../src/transactionalObject.mjs';

// commonjs
//const transactionalObject = require('../src/transactionalObject.cjs');


const someValue = transactionalObject({
    a: 1,
    b: 2,
    c: [1, 2, 3],
});

console.log('--- TEST ROLLBACK ---');
console.log(someValue); // { a: 1, b: 2, c: [ 1, 2, 3 ] }
someValue.beginTransaction();
someValue.b = 200;
someValue.x = 42;
someValue.c.push(9);
console.log(someValue); // { a: 1, b: 200, c: [ 1, 2, 3, 9 ], x: 42 }
someValue.rollback();
console.log(someValue); // { a: 1, b: 2, c: [ 1, 2, 3 ] }

console.log('--- TEST COMMIT ---');
console.log(someValue); // { a: 1, b: 2, c: [ 1, 2, 3 ] }
someValue.beginTransaction();
someValue.b = 200;
someValue.x = 42;
someValue.c.push(9);
console.log(someValue); // { a: 1, b: 200, c: [ 1, 2, 3, 9 ], x: 42 }
someValue.commit();
console.log(someValue); // { a: 1, b: 200, c: [ 1, 2, 3, 9 ], x: 42 }
