const { queryWithExceptionHandler, promisePool : promise_pool } = require("./pool_connection");

async function get_station_detail_db(station_id) {
    return await queryWithExceptionHandler(async () => {
        const conn = await promise_pool.getConnection();
        const [rows, ] = await conn.query(`
        SELECT
            s.station_id,
            s.station_name,
            s.station_address,
            s.latitude,
            s.longitude,
            s.charging_power
        FROM stations s
        WHERE station_id=?
        LIMIT 1`, [station_id]);
        return {
            success: true,
            result: rows
        };
    })
}

module.exports = get_station_detail_db;