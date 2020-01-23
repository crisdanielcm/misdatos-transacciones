require('./config/config')

const bodyParser = require('body-parser')
const express = require('express')
const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//-------------------iniciar servidor----------------------------
app.listen(process.env.PORT, () => {
    console.log("Escuchando puerto....", process.env.PORT);
});