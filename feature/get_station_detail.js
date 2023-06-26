const get_matrix = require("../helper/get_matrix");
const get_station_detail_db = require("../middleware/get_station_detail_db.js");

async function get_station_detail(station_id, longitude, latitude) {
    const res = await get_station_detail_db(station_id);
    if(res.success) {
        const matrix = await get_matrix([
            `${longitude},${latitude}`,
            `${res.result[0].longitude},${res.result[0].latitude}`
        ]);
        res.result[0].distance = Math.round(matrix.distances[0][1]);
        res.result[0].duration = Math.round(matrix.durations[0][1]/60);
    }
    return res;
}

module.exports = get_station_detail