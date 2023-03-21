
import {ObjectState as Transaction} from 'object-rollback';

/**
 * Creates transactional-object.
 *
 * @param {object} o
 * @return {object}
 */
export default function(o = {}) {
    let tran = null;
    let inTransaction = false;
    Object.defineProperties(o, {
        beginTransaction: {
            /**
             * Begin transaction.
             */
            value: () => {
                if (inTransaction) {
                    // eslint-disable-next-line max-len
                    throw new Error('Object could not start a new transaction. Transaction is already started.');
                }
                tran = new Transaction(o);
                inTransaction = true;
            },
            configurable: false,
            enumerable: false,
            writable: false,
        },
        commit: {
            /**
             * Transaction commit.
             */
            value: () => {
                if (!inTransaction) {
                    // eslint-disable-next-line max-len
                    throw new Error('Transaction could not commit. Transaction is not started yet.');
                }
                tran = null;
                inTransaction = false;
            },
            configurable: false,
            enumerable: false,
            writable: false,
        },
        rollback: {
            /**
             * Transaction rollback.
             */
            value: () => {
                if (!inTransaction) {
                    // eslint-disable-next-line max-len
                    throw new Error('Transaction could not rollback. Transaction is not started yet.');
                }
                tran.rollback();
                tran = null;
                inTransaction = false;
            },
            configurable: false,
            enumerable: false,
            writable: false,
        },
        inTransaction: {
            /**
             * In transaction.
             *
             * @return {boolean}
             */
            value: () => {
                return inTransaction;
            },
            configurable: false,
            enumerable: false,
            writable: false,
        },
    });
    return o;
};
