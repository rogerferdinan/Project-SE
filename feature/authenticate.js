const hashString = require("../helper/hash_string")
const user = require("../middleware/user")

async function authenticate(username, password) {
    const check = await user.checkUser(username, username, password);
    if(!check.success) {
        check.success = false;
    }
    return check
}

module.exports = authenticate