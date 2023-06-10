const mysql = require("mysql2")

const pool = mysql.createPool({
        host: "localhost",
        port: 3306,
        user: "ucharging",
        password: "ucharging",
        database: "ucharging_db",
        connectTimeout:30000
        })

const promisePool = pool.promise()

module.exports = promisePool;
