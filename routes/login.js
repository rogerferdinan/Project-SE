const express = require("express")
const loginRouter = express.Router()
const authenticate = require("../feature/authenticate")

loginRouter.get('/signin', async(req, res, next) => {
    if(!req.session.loggedin) res.render("signin")
    else res.redirect("/")
})

loginRouter.post('/signin', async(req, res, next) => {
    const username = req.body.username
    const password = req.body.password

    // Check username dan password tidak kosong
    if(!username) {
        // TODO: buatkan file html dengan password salah!
        res.render("signin", {message: "Email / Phone Number tidak boleh kosong"})
        return
    }
    if (!password) {
        res.render("signin", {message: "Password tidak boleh kosong"})
        return
    }
    try {
        const success_login = await authenticate(username, password)
        if(success_login) {
            req.session.loggedin = true
            res.redirect('/')
        } else {
            res.render("signin", {message: "Email / Phone Number / Password salah"})
        }
    } catch (e) {
        res.render("signin", {message: "Server Sedang Gangguan"})
    }

    
})

module.exports = loginRouter