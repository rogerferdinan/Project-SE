const bcrypt = require("bcrypt")

function compare_password(password, encrypted_password) {
    if(!password || !encrypted_password) return false
    const compare_text = bcrypt.compareSync(password, encrypted_password)
    return compare_text
}

module.exports = compare_password