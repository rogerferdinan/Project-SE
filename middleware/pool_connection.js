const mysql = require("mysql2/promise")

const pool = mysql.createPool({
    database: "ucharging",
    user: "ucharging",
    host: "localhost",
    password: "ucharging"
})

module.exports = pool;