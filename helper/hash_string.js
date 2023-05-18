const bcrypt = require("bcrypt")

const secretKey = "secretkey123"

function hash_string(string) {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(string, salt)
    return hash
}

module.exports = hash_string