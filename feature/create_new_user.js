const hashString = require("../helper/hash_string")
const { addUser } = require("../middleware/user")

async function createNewAccount(first_name, last_name, email, phone_number, password) {
    const hash_password = hashString(password)
    const result = await addUser(first_name, last_name, email, phone_number, hash_password)
    console.log(result)
}

module.exports = createNewAccount