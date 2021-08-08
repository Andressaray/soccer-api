const mysql = require('mysql')

require('dotenv').config()

exports.connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
})
/**
 * @function connection = Create the connection with the databases
 *                      with environment variables
 */