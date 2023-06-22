const { queryWithExceptionHandler, promisePool : promise_pool } = require("./pool_connection");

async function get_station(longtitude, latitude) {
    return await queryWithExceptionHandler(async() => {
        const conn = await promise_pool.getConnection()
        const [rows, fields] = await conn.query(`
        SELECT 
            station_id,
            station_name, 
            longtitude, 
            latitude,
            station_address,
            charging_power,
            CASE
                WHEN distance < 1000 THEN CONCAT(ROUND(distance, 0), " m")
                ELSE CONCAT(ROUND(distance / 1000, 2), " km")
            END as distance
        FROM (
            SELECT
                station_id,
                station_name,
                longtitude, 
                latitude,
                station_address,
                charging_power,
                ST_DISTANCE_SPHERE(point(longtitude, latitude), point(?, ?)) as distance
            from stations
            ORDER BY distance) as t1
        WHERE distance <= 10000`, [longtitude, latitude])
        return {
            success: true,
            result: rows
        }
    })
}

async function get_normal_station(longtitude, latitude) {
    return await queryWithExceptionHandler(async() => {
        const conn = await promise_pool.getConnection()
        const [rows, fields] = await conn.query(`
        SELECT
            s.station_id, 
            s.station_name, 
            s.longtitude, 
            s.latitude,
            s.station_address,
            s.charging_power,
            CASE
                WHEN distance < 1000 THEN CONCAT(ROUND(s.distance, 0), " m")
                ELSE CONCAT(ROUND(s.distance / 1000, 2), " km")
            END as distance
        FROM (
            SELECT 
                station_id,
                station_name, 
                longtitude, 
                latitude, 
                station_address,
                charging_power,
                ST_DISTANCE_SPHERE(point(longtitude, latitude), point(?, ?)) as distance
            from stations
            ORDER BY distance) as s
        JOIN spot sp 
            ON s.station_id = sp.station_id 
        JOIN charging_types ct 
            ON sp.type_id = ct.type_id 
        WHERE ct.type_name = "Normal"
        AND distance <= 10000`, [longtitude, latitude])
        return {
            success: true,
            result: rows
        }
    })
}

async function get_fast_station(longtitude, latitude) {
    return await queryWithExceptionHandler(async() => {
        const conn = await promise_pool.getConnection()
        const [rows, fields] = await conn.query(`
        SELECT 
            s.station_id,
            s.station_name, 
            s.longtitude, 
            s.latitude,
            s.station_address,
            s.charging_power,
            CASE
                WHEN distance < 1000 THEN CONCAT(ROUND(s.distance, 0), " m")
                ELSE CONCAT(ROUND(s.distance / 1000, 2), " km")
            END as distance
        FROM (
            SELECT 
                station_id,
                station_name, 
                longtitude, 
                latitude,
                station_address,
                charging_power,
                ST_DISTANCE_SPHERE(point(longtitude, latitude), point(?, ?)) as distance
            from stations
            ORDER BY distance) as s
        JOIN spot sp 
            ON s.station_id = sp.station_id 
        JOIN charging_types ct 
            ON sp.type_id = ct.type_id 
        WHERE ct.type_name = "Fast"
        AND distance <= 10000`, [longtitude, latitude])
        return {
            success: true,
            result: rows
        }
    })
}

module.exports = {
    get_station,
    get_normal_station,
    get_fast_station
}