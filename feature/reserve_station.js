const get_last_reserve_db = require("../middleware/get_reserve_db");
const insert_reserve_db = require("../middleware/insert_reserve_db");

async function reserve_station(user_id, station_id) {
    const date = Math.round(Date.now() / 1000);
    const result = await insert_reserve_db(user_id, station_id, date);
    if(!result.success) return {
        success: false,
        result: "Database error"
    }
    const last_reserve = await get_last_reserve_db(user_id);
    if(!last_reserve.success) {
        return {
            success: false,
            result: "Database error"
        }
    }
    return last_reserve;
}

module.exports = reserve_station;