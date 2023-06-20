const hashString = require("../helper/hash_string")
const user = require("../middleware/user")

async function authenticate(username, password) {
    const check = await user.checkUser(username, username, password)
    console.log(check);
    if(!check.success) return undefined
    return check.result
}

module.exports = authenticate