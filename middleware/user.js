const compare_password = require("../helper/compare_password");
const hash_string = require("../helper/hash_string");
const { queryWithExceptionHandler, promisePool : promise_pool } = require("./pool_connection");

async function checkUser(email, phone_number, password) {
    return await queryWithExceptionHandler(async () => {
        const conn = await promise_pool.getConnection()
        const [rows, fields] = await conn.query(`
        SELECT * FROM users 
        WHERE email=? or phone_number=?`
        , [email, phone_number])
        if(rows[0] !== undefined) {
            return {
                success: true,
                user_id: rows[0].user_id,
                first_name: rows[0].first_name,
                isAuthenticated: compare_password(password, rows[0].encrypted_password)
            }
        } else {
            return {
                success: false,
                message: "user not found"
            }
        }
    })
}

async function addUser(first_name, last_name, email, phone_number, password) {
    return await queryWithExceptionHandler(async () => {
        const hash_password = hash_string(password);
        const conn = await promise_pool.getConnection();
        await conn.beginTransaction();
        const [user, ] = await conn.query(`
        SELECT COALESCE(
            (SELECT 
                CONCAT("U", LPAD( TRIM(LEADING "US" FROM user_id)+1, 8, 0 )) 
            FROM users 
            ORDER BY user_id DESC 
            LIMIT 1),
            CONCAT("US", LPAD(1, 8, 0))
        ) as reserve_id
        `)
        const [rows, ] = await conn.query(`
            INSERT INTO users
            (user_id, first_name, last_name, email, phone_number, encrypted_password) 
            VALUE(?, ?, ?, ?, ?, ?)`, 
            [user[0].user_id, first_name, last_name, email, phone_number, hash_password]);
        await conn.commit();
        return {
            success: true,
            result: "new user is successfully created"
        }
    })
}

// TODO: Delete User need to complete
async function deleteUser(user_id) {
    const conn = await promise_pool.getConnection()
    await conn.beginTransaction();
    const [rows, ] = await conn.query("DELETE users WHERE user_id=?", [user_id]);
    await conn.commit();
    return rows
}

async function changePassword(email, new_password) {
    const conn = await promise_pool.getConnection()
    await conn.beginTransaction();
    const [isFound, ] = await conn.query(`
    SELECT count(email)
    FROM users
    WHERE email = ?
    `, [email]);    
    await conn.commit();
    return rows;
}

module.exports = {
    checkUser,
    addUser
}
