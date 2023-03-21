# transactional-object

object transactions.

## Installation

```
$ npm i --save @cwola/transactional-object
```

## require / import

- esm

    ```
    import transactionalObject from '@cwola/transactional-object';
    ```

- commonjs

    ```
    const transactionalObject = require('@cwola/transactional-object');
    ```

## Usage

```
// esm
import createTranObj from '@cwola/transactional-object';

const someValue = createTranObj({
    a: 1,
    b: 2,
    c: [1, 2, 3],
});

// ROLLBACK
console.log(someValue); // { a: 1, b: 2, c: [ 1, 2, 3 ] }
someValue.beginTransaction();
someValue.b = 200;
someValue.x = 42;
someValue.c.push(9);
console.log(someValue); // { a: 1, b: 200, c: [ 1, 2, 3, 9 ], x: 42 }
someValue.rollback();
console.log(someValue); // { a: 1, b: 2, c: [ 1, 2, 3 ] }

// COMMIT
console.log(someValue); // { a: 1, b: 2, c: [ 1, 2, 3 ] }
someValue.beginTransaction();
someValue.b = 200;
someValue.x = 42;
someValue.c.push(9);
console.log(someValue); // { a: 1, b: 200, c: [ 1, 2, 3, 9 ], x: 42 }
someValue.commit();
console.log(someValue); // { a: 1, b: 200, c: [ 1, 2, 3, 9 ], x: 42 }
```

## Reserved word

- **beginTransaction**

- **commit**

- **rollback**

- **inTransaction**


## License

[MIT](https://github.com/cwola/transactional-object/blob/develop/LICENSE)
