const compare_password = require("../helper/compare_password");
const promise_pool = require("./pool_connection");
const hash_string = require("../helper/hash_string")

async function checkUser(email, phone_number, password) {
    try {
        const conn = await promise_pool.getConnection()
        const [rows, fields] = await conn.query(`
        SELECT * FROM users 
        WHERE email=? or phone_number=?`
        , [email, phone_number])
        if(rows[0] !== undefined){
            return {
                success: true,
                result: compare_password(password, rows[0].encrypted_password)
            }
        } else {
            return {
                success: false,
                result: undefined
            }
        }
    } catch (err) {
        if(err.errno == -4039) console.log("Database is closed")
        return {
            success: false,
            result: false
        }
    }
}

async function addUser(first_name, last_name, email, phone_number, password) {
    const encrypted_password = hash_string(password)
    try {
        const conn = await promise_pool.getConnection()
        const [rows, fields] = await conn.query(`INSERT INTO users
        (first_name, last_name, email, phone_number, encrypted_password) 
        VALUE(?, ?, ?, ?, ?)`, 
        [first_name, last_name, email, phone_number, encrypted_password])
        return {
            success: true,
            result: rows
        }
    } catch(err) {
        if(err.errno == -4039) console.log("Database is closed")
        return {
            success: false,
            result: false
        }
    }
}

async function deleteUser(user_id) {
    const conn = await promise_pool.getConnection()
    conn [rows, fields] = await conn.query("DELETE users WHERE user_id=?", [user_id])
    return rows
}

module.exports = {
    checkUser,
    addUser
}
