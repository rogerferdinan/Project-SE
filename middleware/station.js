const poolPromise = require("../middleware/pool_connection")

async function get_station(longtitude, latitude) {
    try {
        const conn = await poolPromise.getConnection()
        const [rows, fields] = await conn.query(`
        SELECT 
            station_name, 
            longtitude, 
            latitude
        FROM (SELECT
                station_name,
                longtitude, 
                latitude, 
                ST_DISTANCE_SPHERE(point(longtitude, latitude), point(?, ?)) as distance
            from stations
            ORDER BY distance) as t1
        WHERE distance <= 10000`, [longtitude, latitude])
        return {
            success: true,
            result: rows
        }
    } catch (err) {
        if(err.errno == -4039) console.log("Database is closed")
        console.log(err)
        return {
            success: false,
            result: false
        }
    }
}

async function get_normal_station(longtitude, latitude) {
    try {
        const conn = await poolPromise.getConnection()
        const [rows, fields] = await conn.query(`SELECT * FROM (SELECT 
                station_id, 
                longtitude, 
                latitude, 
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
    } catch (err) {
        if(err.errno == -4039) console.log("Database is closed")
        console.log(err)
        return {
            success: false,
            result: false
        }
    }
}

async function get_fast_station(longtitude, latitude) {
    try {
        const conn = await poolPromise.getConnection()
        const [rows, fields] = await conn.query(`SELECT * FROM (SELECT 
                station_id, 
                longtitude, 
                latitude, 
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
    } catch (err) {
        if(err.errno == -4039) console.log("Database is closed")
        console.log(err)
        return {
            success: false,
            result: false
        }
    }
}

module.exports = {
    get_station,
    get_normal_station,
    get_fast_station
}