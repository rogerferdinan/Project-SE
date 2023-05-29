const { get_station } = require("../middleware/station");

async function get_near_station(longtitude, latitude) {
    station = await get_station(longtitude, latitude)
    if(!station.success) console.log("Failed to retrieve station data")
    return station
}

module.exports = get_near_station