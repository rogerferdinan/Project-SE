const test = require('test')
const user = require("./middleware/user")

// Functional Test
// test("string", async() => {
//     let a = await user.validateUsernamePassword("a", "a");
//     console.log(a)
//     expect()
// })

// user.addUser("dummy", "Dummy", "dummy1@gmail.com", "1234", "pass123").then(res => {
//     console.log(res)
// })
user.checkUser("dummy@gmail.com", "", "dummy").then(res => {
    console.log(res)
})