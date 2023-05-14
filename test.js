const test = require('test')
const user = require("./middleware/user")

// Functional Test
test("string", async() => {
    let a = await user.validateUsernamePassword("a", "a");
    console.log(a)
    expect()
})

// Integration Test