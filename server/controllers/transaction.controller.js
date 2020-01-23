const Transaction = require('../models/transaction.model');

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).json({
            success: false,
            message: "Petición inválida!"
        });
        return;
    }
    const transaction = new Transaction({
        value: req.body.value,
        points: req.body.points,
        status: req.body.status,
        user_id: req.body.user_id
    });
    Transaction.create(transaction, (err, data) => {
        if (err)
            res.status(200).json({
                message: err.message || "Ocurrio un error mientras se creaba el usuario."
            });
        else res.json(data);
    })
};

exports.inactiveTransaction = (req, res) => {
    if (!req.body) {
        res.status(400).json({
            success: false,
            message: "Petición inválida!"
        });
        return;
    }
    let transaction_id = req.body.transaction_id;
    Transaction.findById(transaction_id, (err, data) => {
        if (data) {
            if (data.response) {
                Transaction.inactiveTransaction(transaction_id, (err, data) => {
                    if (err) {
                        if (err.message === "not_found") {
                            res.status(404).json({
                                message: 'No se actualizaron registros.'
                            });
                        } else {
                            res.status(200).json({
                                message: `Error inactivando el registro asociado al id ${transaction_id}`
                            })
                        }
                    } else res.json(data);
                });
            } else {
                res.status(200).json({
                    message: `No existe una transaccion asociada al id ${transaction_id}`
                })
            }
        }
    })
};