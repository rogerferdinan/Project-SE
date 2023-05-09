const bcrypt = require("bcrypt")

const secretKey = "secretkey123"

function hashString(string) {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(string, salt)
    return hash
}

module.exports = hashString