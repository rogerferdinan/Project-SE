const get_matrix = require("../helper/get_matrix");
const get_single_station_db = require("../middleware/get_single_station_db");
const get_station_db = require("../middleware/get_station_db");
const get_station_detail_db = require("../middleware/get_station_detail_db.js");

async function get_station_detail(station_id, longitude, latitude) {
    const station = await get_single_station_db(station_id, latitude, longitude);
    const res = await get_station_detail_db(station_id);
    if(res.success) {
        // const matrix = await get_matrix([
        //     `${longitude},${latitude}`,
        //     `${res.result[0].longitude},${res.result[0].latitude}`
        // ]);
        res.result[0].distance = Math.round(station.result.distance);
        res.result[0].duration = Math.round(station.result.duration);
    }
    return res;
}

module.exports = get_station_detail