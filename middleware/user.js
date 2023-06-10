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
            console.log(password)
            console.log(rows[0].encrypted_password)
            return {
                success: true,
                result: compare_password(password, rows[0].encrypted_password)
            }
        } else {
            return {
                success: false,
                result: "user not found"
            }
        }
    } catch (err) {
        if(err.errno == -4039) {
            return {
                success: false,
                result: "database is closed"
            }
        }
        return {
            success: false,
            result: err
        }
    }
}

async function addUser(first_name, last_name, email, phone_number, password) {
    try {
        const conn = await promise_pool.getConnection()
        const [rows, fields] = await conn.query(`
        INSERT INTO users
        (first_name, last_name, email, phone_number, encrypted_password) 
        VALUE(?, ?, ?, ?, ?)`, 
        [first_name, last_name, email, phone_number, password])
        return {
            success: true,
            result: "new user is successfully created"
        }
    } catch(err) {
        if(err.errno == -4039) {
            return {
                success: false,
                return: "database is closed"
            }
        } else if(err.errno == 1062) {
            return {
                success: false,
                result: "user already exists"
            }
        }

        return {
            success: false,
            result: err
        }
    }
}

// TODO: Delete User need to complete
async function deleteUser(user_id) {
    const conn = await promise_pool.getConnection()
    conn [rows, fields] = await conn.query("DELETE users WHERE user_id=?", [user_id])
    return rows
}

module.exports = {
    checkUser,
    addUser
}
