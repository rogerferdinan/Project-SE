const express = require("express")
const loginRouter = express.Router()
const authenticate = require("../feature/authenticate")

loginRouter.get('/signin', async(req, res, next) => {
    if(!req.session.loggedin) res.render("signin")
    else res.redirect("/")
})

loginRouter.post('/signin', async(req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const remember_me = req.body.remember_me;

    if(!username) {
        res.render("signin", {message: "Email / Phone Number tidak boleh kosong"})
        return
    }
    if (!password) {
        res.render("signin", {message: "Password tidak boleh kosong"})
        return
    }
    try {
        const success_login = await authenticate(username, password)
        if(success_login && remember_me) {
            req.session.loggedin = true
            var hour = 60 * 60 * 1000
            req.session.cookie.maxAge = hour
            req.session.cookie.expires = new Date(Date.now() + hour)
            req.session.save( (e) => {} )
            res.redirect('/')
        } else if (success_login) {
            req.session.loggedin = true
            res.redirect('/')
        } else {
            res.render("signin", {message: "Kredensial salah, tolong periksa ulang!"})
        }
    } catch (e) {
        console.log(e)
        res.render("signin", {message: "Server Sedang Gangguan"})
    }    
})

loginRouter.get('/change-password', async(req, res, next) => {
    if(!req.session.loggedin) res.render("change-password")
    else res.redirect("/")
})

module.exports = loginRouter