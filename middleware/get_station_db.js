const { queryWithExceptionHandler, promisePool : promise_pool } = require("./pool_connection");

async function get_station_db(city, type) {
    var query = 
        `SELECT
            s.station_id,
            s.station_name,
            s.station_address,
            s.latitude,
            s.longitude,
            s.charging_power
        FROM stations s`
    const where = [];
    const params = [];
    if(city) {
        where.push("s.city=?");
        params.push(city);
    }
    if(type) {
        query += 
        ` JOIN spot sp ON s.station_id = sp.station_id
        JOIN charging_types ct ON ct.type_id = sp.type_id`
        where.push("ct.type_name=?");
        params.push(type);
    }
    if (where.length != 0) {
        query += " WHERE ";
    }
    query += where.join(" AND ");

    return await queryWithExceptionHandler(async() => {
        const conn = await promise_pool.getConnection()
        const [rows, ] = await conn.query(query, params);
        return {
            success: true,
            result: rows
        }
    })
}

module.exports = get_station_db;