const mysql = require("mysql2/promise")

const pool = mysql.createPool({
    database: "ucharging",
    user: "ucharging",
    host: "52.1.167.157",
    password: "ucharging"
})

module.exports = pool;