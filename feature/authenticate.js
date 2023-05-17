const hashString = require("../helper/hashString")
const user = require("../middleware/user")

// TODO : add mysql middleware
async function authenticate(email, password) {
    const hash_password = hashString(password)
    
    // pass email and password -> database
    const result = await user.checkUser(email, hash_password)
    if (!result) {
        return false
    }
    return true
}

module.exports = authenticate