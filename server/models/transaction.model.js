const sql = require('../database')

const Transaction = function(transaction) {
    this.value = transaction.value;
    this.points = transaction.points;
    this.status = transaction.status;
    this.user_id = transaction.user_id;
};

Transaction.create = (newTransaction, result) => {
    sql.query('INSERT INTO transactions SET ?', newTransaction, (err, res) => {
        if (err) {
            result(err, null);
        }
        result(null, { message: "Transaccion creada correctamente", newTransaction });
    });
};

Transaction.inactiveTransaction = (transaction_id, result) => {
    sql.query('UPDATE transactions SET status = ? WHERE transaction_id = ?', [0, transaction_id], (err, res) => {
        if (err) {
            result(err, null);
        }

        if (res.affectedRows === 0) {
            console.log(res);
            result({ message: 'not_found' }, null);
            return;
        }
        result(null, { message: "Transaccion inactiva." });
    })
};

Transaction.findById = (transaction_id, result) => {
    sql.query('SELECT transaction_id FROM transactions WHERE transaction_id = ?', transaction_id, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        if (res.length > 0) {
            result(null, { response: true });
            return;
        }
        result(null, { response: false });
    });
};

module.exports = Transaction;