const hashString = require("../helper/hash_string")
const user = require("../middleware/user")

// TODO : add mysql middleware
async function authenticate(username, password) {
    // pass email and password -> database
    const result = await user.checkUser(username, username, password)
    return result
}

module.exports = authenticate