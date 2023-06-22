const express = require("express")
const checkLogin = require("../helper/check_login")
const profileRouter = express.Router()

profileRouter.get("/profile", checkLogin, async(req, res) => {
    res.render("profile", {first_name: req.session.first_name});
})

module.exports = profileRouter