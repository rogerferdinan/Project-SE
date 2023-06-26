const get_station_detail = require("./feature/get_station_detail");

get_station_detail(1, 106.7, -6.2).then((T) => {
    console.log(T);
});