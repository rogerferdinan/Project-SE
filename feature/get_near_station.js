const get_city = require("../helper/get_city");
const get_matrix = require("../helper/get_matrix");
const get_station_db = require("../middleware/get_station_db");

async function get_near_station(longitude, latitude) {
    const city = await get_city(longitude, latitude);
    const res = await get_station_db(city, latitude, longitude);
    return res;
}

module.exports = get_near_station;