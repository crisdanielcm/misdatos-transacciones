const express = require('express');
const app = express();
const transactionController = require('../controllers/transaction.controller');

app.post('/create_transaction', transactionController.create);
app.put('/inactive_transaction', transactionController.inactiveTransaction);

module.exports = app;