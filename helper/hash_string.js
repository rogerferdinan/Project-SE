const bcrypt = require("bcrypt")

const secretKey = "secretkey123"

function hash_string(string) {
    const hash = bcrypt.hashSync(string, 10)
    return hash
}

module.exports = hash_string