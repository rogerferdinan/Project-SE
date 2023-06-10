const express = require("express")
const checkLogin = require("../helper/check_login")
const logoutRouter = express.Router()

logoutRouter.get("/signout", checkLogin, async(req, res) => {
    req.session.destroy()
    res.redirect("/signin")
})

// TODO: masih perlu fixing di logout

module.exports = logoutRouter