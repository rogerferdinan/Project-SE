const express = require("express")
const loginRouter = express.Router()
const path = require("path")
const authenticate = require("../feature/authenticate")
const checkLogin = require("../helper/check_login")

<<<<<<< Updated upstream
loginRouter.get('/login', async(req, res, next) => {
    if(!req.session.loggedin) {
        res.sendFile(path.join(__dirname, '..', 'src', 'html', 'login.html')) 
    } else {
       res.redirect("/")
    }
})

loginRouter.post('/login', async(req, res, next) => {
=======
loginRouter.get('/signin', async(req, res, next) => {
    if(!req.session.loggedin) res.render("signin")
    else res.redirect("/")
})

loginRouter.post('/signin', async(req, res, next) => {
>>>>>>> Stashed changes
    const username = req.body.username
    const password = req.body.password

    // Check username dan password tidak kosong
    if(!username || !password) {
        // TODO: buatkan file html dengan password salah!
        res.sendFile(path.join(__dirname, '..', 'src', 'html', 'login_false.html'))
        return
    }
<<<<<<< Updated upstream
    
=======
    console.log(username, password)
>>>>>>> Stashed changes
    success_login = await authenticate(username, password)
    if(success_login) {
        req.session.loggedin = true
        res.redirect('/')
    } else {
        res.sendFile(path.join(__dirname, '..', 'src', 'html', 'login_false2.html'))
    }
})

module.exports = loginRouter