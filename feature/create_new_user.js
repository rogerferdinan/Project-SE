const { addUser } = require("../middleware/user")

function createNewAccount(first_name, last_name, email, phone_number, password) {
    addUser(first_name, last_name, email, phone_number, password)
}

module.exports = createNewAccount