const hashString = require("./hashString")

// TODO : add mysql middleware
function authenticate(email, password) {
    const hash_password = hashString(password)
    // pass email and password -> database
    return true
}

module.exports = authenticate