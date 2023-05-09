const express = require("express")
const homeRouter = express.Router()
const path = require("path")
const checkLogin = require("../helper/check_login")
const loginRouter = require("./login")

homeRouter.get("/", checkLogin, (req, res) => {
    // res.
    res.sendFile(path.join(__dirname, '..', 'src', 'html', 'home.html'))
})
module.exports = homeRouter