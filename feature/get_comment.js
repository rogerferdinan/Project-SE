const get_comment_db = require("../middleware/get_comment_db");

async function get_comment(station_id) {
    const res = await get_comment_db(station_id);
    if(!res.success) console.log("Something wrong in get_comment")
    return res;
}

module.exports = get_comment