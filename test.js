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
async function a() {
    await user.checkUser("dummy@gmail.com", "dummy@gmail.com", "dummy").then(res => {
        console.log(res)
    })

    await user.checkUser("dummy@gmail.com", "", "dummy").then(res => {
        console.log("dummy@gmail.com", "", "dummy")
        console.log(res)
    })

    await user.checkUser("dummy@gmail.com", "", "").then(res => {
        console.log(res)
    })
}

a()