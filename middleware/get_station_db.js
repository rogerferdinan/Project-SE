const { queryWithExceptionHandler, promisePool : promise_pool } = require("./pool_connection");

async function get_station_db(city, latitude, longtitude, type) {
    const where = [];
    const params = [];
    var query = 
        `SELECT
            s.station_id,
            s.station_name,
            s.station_address,
            s.latitude,
            s.longtitude,
            s.charging_power,
            CEIL(s.distance) as distance,
            CEIL(s.distance/13/60) as duration
        FROM (SELECT *, ST_DISTANCE_SPHERE(POINT(longtitude, latitude), POINT(?, ?)) as distance 
            FROM stations) as s`
    params.push(longtitude);
    params.push(latitude);
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
        console.log(rows);
        return {
            success: true,
            result: rows
        }
    })
}

module.exports = get_station_db;