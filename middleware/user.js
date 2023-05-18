const compare_password = require("../helper/compare_password");
const promisePool = require("./pool_connection");

async function checkUser(email, phone_number, password) {
    const conn = await promisePool.getConnection()
    const [rows, fields] = await conn.query("SELECT * FROM users WHERE email=? or phone_number=?", [email, phone_number])
    console.log(rows)
    // if(rows) return compare_password(rows[0].password, password)
    // return false
}

async function addUser(first_name, last_name, email, phone_number, password) {
    // const conn = await pool.getConnection()
    // const rows = await conn.query("INSERT INTO users(first_name, last_name, email, phone_number, password) value(?, ?, ?, ?, ?)", [first_name, last_name, email, phone_number, password])
    // console.log(rows)
    // return rows
}

module.exports = {
    checkUser,
    addUser
}
