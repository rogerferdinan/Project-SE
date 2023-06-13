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
    const hash_password = hash_string(password)
    try {
        const conn = await promise_pool.getConnection();
        await conn.beginTransaction();
        const [user_id, ] = await conn.query(`
            select case
                when count(user_id) = 0 then "U001"
                else CONCAT("U",LPAD(right(user_id, 3) + 1, 3, 0))
                end as user_id
            from users
            order by user_id DESC`)
        const [rows, ] = await conn.query(`
            INSERT INTO users
            (user_id, first_name, last_name, email, phone_number, encrypted_password) 
            VALUE(?, ?, ?, ?, ?, ?)`, 
            [user_id[0].user_id, first_name, last_name, email, phone_number, hash_password]);
        await conn.commit();
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
