const poolPromise = require("../middleware/pool_connection")

async function get_station(longtitude, latitude) {
    try {
        const conn = await poolPromise.getConnection()
        const [rows, fields] = await conn.query(`select longtitude, latitude
        from stations
        ORDER BY ST_DISTANCE_SPHERE(point(longtitude, latitude), point(?, ?))
        LIMIT 50`, [longtitude, latitude])
        console.log(rows)
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
    get_station
}