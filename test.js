const get_near_station = require("./feature/get_near_station");

get_near_station(10, 10).then(res => {
    console.log(res)
})