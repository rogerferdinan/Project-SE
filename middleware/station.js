const poolPromise = require("../middleware/pool_connection")

async function get_near_station() {
    try {
        const conn = await poolPromise.getConnection()
        const [rows, fields] = await conn.query("SELECT latitude, longtitude FROM stations")
        return rows
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    get_near_station
}