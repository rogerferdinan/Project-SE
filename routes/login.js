const express = require("express")
const loginRouter = express.Router()
const path = require("path")
const authenticate = require("../feature/authenticate")
const checkLogin = require("../helper/check_login")

loginRouter.get('/signin', async(req, res, next) => {
    if(!req.session.loggedin) res.render("signin")
    else res.redirect("/")
})

loginRouter.post('/signin', async(req, res, next) => {
    const username = req.body.username
    const password = req.body.password

    // Check username dan password tidak kosong
    if(!username || !password) {
        // TODO: buatkan file html dengan password salah!
        res.sendFile(path.join(__dirname, '..', 'src', 'html', 'login_false.html'))
        return
    }
    console.log(username, password)
    success_login = await authenticate(username, password)
    if(success_login) {
        req.session.loggedin = true
        res.redirect('/')
    } else {
        res.sendFile(path.join(__dirname, '..', 'src', 'html', 'login_false2.html'))
    }
})

module.exports = loginRouter