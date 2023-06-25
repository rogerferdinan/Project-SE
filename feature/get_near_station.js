const get_city = require("../helper/get_city");
const get_matrix = require("../helper/get_matrix");
const get_station_db = require("../middleware/get_station_db");

async function get_near_station(longitude, latitude) {
    const city = await get_city(longitude, latitude);
    const res = await get_station_db(city);
    if(res.success) {
        const divide = 24;
        var loop = Math.ceil(res.result.length / divide); // loop 4x
        
        for (var i=0; i<loop; i++) {
            var start = i*divide;
            var end = 0;
            if(res.result.length%divide != 0 && i == loop-1) {
                end = i*divide + res.result.length%divide-1
            } else {
                end = i*divide + divide-1
            }
            const coor_list = [`${longitude},${latitude}`];
            for(var j=start; j<=end; j++) {
                coor_list.push(`${res.result[j].longitude},${res.result[j].latitude}`)
            }
            const matrix = await get_matrix(coor_list)
            const duration = matrix.durations[0];
            const distance = matrix.distances[0];
            for(var j=0; j<duration.length-1; j++) {
                res.result[start+j].duration = Math.round(duration[j+1]/60);
                res.result[start+j].distance = (distance[j+1]/1000).toFixed(2);
            }
        }
    }
    return res;
}

module.exports = get_near_station;