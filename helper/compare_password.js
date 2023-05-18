const bcrypt = require("bcrypt")

function compare_password(password1, password2) {
    return bcrypt.compareSync(password1, password2)
}

module.exports = compare_password