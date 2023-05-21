const bcrypt = require("bcrypt")

function compare_password(password, encrypted_password) {
    return bcrypt.compare(password, encrypted_password)
}

module.exports = compare_password