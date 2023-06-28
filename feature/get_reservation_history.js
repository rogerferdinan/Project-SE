const get_reservation_history_db = require("../middleware/get_reservation_history_db");

async function get_reservation_history(user_id) {
    const hist = await get_reservation_history_db(user_id);
    if(hist.length != 0) {
        var reduced = new Object();
        hist.forEach(T => {
            const date = (reduced[T.reserve_date] || [])
            date.push(T);
            reduced[T.reserve_date] = date;
        })
        return reduced;
    }
    return hist;
}

module.exports = get_reservation_history