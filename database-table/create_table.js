const pool_promise = require("../middleware/user.js")

function create_table() {
  const conn = pool_promise.getConnection()
}
