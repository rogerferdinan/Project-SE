const { queryWithExceptionHandler, promisePool : promise_pool } = require("./pool_connection");

async function get_last_reserve_db(user_id) {
    return await queryWithExceptionHandler(async() => {
        const conn = await promise_pool.getConnection();
        const [rows, ] = await conn.query(`
        SELECT 
            DATE_FORMAT(rh.reserve_date, "%d-%M-%Y %h.%i %p") as reserve_date, 
            rh.reserve_id, 
            s.station_name, 
            ct.reserve_price, 
            u.phone_number 
        FROM reserve_history rh
        JOIN users u ON u.user_id = rh.user_id
        JOIN stations s ON s.station_id = rh.station_id
        JOIN spot s2 ON s2.station_id = s.station_id 
        JOIN charging_types ct ON ct.type_id = s2.type_id
        WHERE u.user_id = ?
        ORDER BY rh.reserve_id DESC
        LIMIT 1`, [user_id]);
        return {
            success: true,
            result: rows[0]
        }
    })
}

module.exports = get_last_reserve_db;