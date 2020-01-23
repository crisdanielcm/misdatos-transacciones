const mysql = require('mysql');
const { database } = require('./config/config');

var connection = mysql.createConnection(database);
connection.connect((err, res) => {

    if (err) throw err;

    console.log("Base de datos online");
});

module.exports = connection;