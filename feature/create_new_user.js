const hash_string = require("../helper/hash_string")
const { addUser } = require("../middleware/user")

async function createNewAccount(first_name, last_name, email, phone_number, password) {
    const hash_password = hash_string(password)
    const check = await addUser(first_name, last_name, email, phone_number, hash_password)
    if(!check.success) console.log("Failed to add new account")
    return check.result
}

module.exports = createNewAccount
