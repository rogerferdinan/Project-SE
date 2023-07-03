const { queryWithExceptionHandler, promisePool : promise_pool } = require("./pool_connection");

async function get_single_station_db(station_id, latitude, longitude) {
    return await queryWithExceptionHandler(async() => {
        const conn = await promise_pool.getConnection();
        const [rows, ] = await conn.query(`
        SELECT 
            *,
            (distance/13) as duration
        FROM (SELECT *, ST_DISTANCE_SPHERE(POINT(longitude, latitude), POINT(?, ?)) as distance 
        FROM stations) as s
        WHERE station_id = ?`, [longitude, latitude, station_id]);
        return {
            success: true,
            result: rows[0]
        }
    })
}

module.exports = get_single_station_db;