const pool = require("./pool_connection");

async function validateUsernamePassword(email, password) {
    const conn = await pool.getConnection()
    const [rows, fields] = await conn.query(`
    SELECT 
        CASE 
            WHEN users.email IS NULL 
            THEN FALSE 
            ELSE TRUE 
        END as is_valid 
    FROM users 
    WHERE (email=? or phone_number=?) and password=?`, [email, email, password])
    conn.release()
    return rows[0]
}

async function addUser(first_name, last_name, email, phone_number, password) {
    const conn = await pool.getConnection()
    const [rows, fields] = await conn.query("INSERT INTO users(first_name, last_name, email, phone_number, password) value(?, ?, ?, ?, ?)", [first_name, last_name, email, phone_number, password])
    conn.release()
    console.log(rows)
    return rows
}

module.exports = {
    validateUsernamePassword,
    addUser
}
