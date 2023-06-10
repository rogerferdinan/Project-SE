const mysql = require("mysql2")

const pool = mysql.createPool({
        host: "54.175.61.68",
        port: 3306,
        user: "ucharging",
        password: "ucharging",
        database: "ucharging_db",
        connectTimeout:30000
})

const promisePool = pool.promise()

module.exports = promisePool;
