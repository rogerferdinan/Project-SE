const { queryWithExceptionHandler, promisePool : promise_pool } = require("./pool_connection");

async function get_reservation_history_db(user_id) {
    return await queryWithExceptionHandler(async() => {
        const conn = await promise_pool.getConnection();
        const [res, ] = await conn.query(`
        SELECT 
            DATE_FORMAT(reserve_date, "%a, %d-%m-%Y") as reserve_date,
            DATE_FORMAT(reserve_date, "%h.%i %p") as reserve_time,
            s.station_name,
            ct.type_name,
            ct.reserve_price
        FROM reserve_history rh 
        JOIN stations s on rh.station_id = s.station_id 
        JOIN spot s2 ON s.station_id = s2.station_id 
        JOIN charging_types ct ON s2.type_id = ct.type_id 
        WHERE reserve_date IS NOT NULL
        AND user_id = ?
        ORDER BY reserve_date DESC`, [user_id])
        return res
    })
}

module.exports = get_reservation_history_db