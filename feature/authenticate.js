const hashString = require("../helper/hash_string")
const user = require("../middleware/user")

async function authenticate(username, password) {
    // check user and password
    // this method return {status: boolean, result: boolean}
    const check = await user.checkUser(username, username, password)
    if(!check.success) console.log("Failed to check user")
    else if(!check.result) console.log("User not found")
    return check.result
}

module.exports = authenticate