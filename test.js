const test = require('test')
const user = require("./middleware/user")
const { get_near_station } = require('./middleware/station')

// Functional Test
// test("string", async() => {
//     let a = await user.validateUsernamePassword("a", "a");
//     console.log(a)
//     expect()
// })

// user.addUser("dummy", "Dummy", "dummy1@gmail.com", "1234", "pass123").then(res => {
//     console.log(res)
// })
get_near_station()