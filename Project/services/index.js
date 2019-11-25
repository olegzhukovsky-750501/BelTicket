'use strict'
const express = require('express')
const app = express()
const config = require('./config.json')
const login = require('./routers/login')
const register = require('./routers/register')
const payment = require('./routers/payment')
const user = require('./routers/user')
const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "ticketsdb",
    password: "123321"
});

app.use(express.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

app.use(login)
app.use(register)
app.use(payment)
app.use(user)

app.listen(8080, err => {
    if (err) {
        console.error(err)
        return
    }
    console.log('app listening on port 8080')
});