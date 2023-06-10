const get_near_station = require("./feature/get_near_station");
const bcrypt = require("bcrypt")

const plain_text = "dummy"
const hash_text = bcrypt.hashSync("dummy", 10)
const compare_password = bcrypt.compareSync(plain_text, hash_text)
console.log(hash_text)
console.log(hash_text.length)
console.log(compare_password)