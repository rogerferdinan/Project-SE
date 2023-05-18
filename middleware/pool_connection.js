const mysql = require("mysql2")

const pool = mysql.createPool({
        host: "52.1.167.157",
        port: 3306,
        user: "ucharging",
        password: "ucharging",
        database: "ucharging",
        connectTimeout:30000
        })

const promisePool = pool.promise()

module.exports = promisePool;