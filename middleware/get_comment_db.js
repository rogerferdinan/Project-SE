const { queryWithExceptionHandler, promisePool : promise_pool } = require("./pool_connection");

async function get_comment_db(station_id) {
    return await queryWithExceptionHandler(async() => {
        const conn = await promise_pool.getConnection();
        const [rows, ] = await conn.query(`
        SELECT 
            u.first_name, 
            c.rating, 
            c.comment
        FROM comments c
        JOIN users u ON u.user_id = c.user_id
        JOIN stations s ON s.station_id = c.station_id
        WHERE s.station_id = ?`, [station_id]);
        return {
            success: true,
            result: rows
        };
    })
}

module.exports = get_comment_db;