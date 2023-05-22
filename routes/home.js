const express = require("express")
const homeRouter = express.Router()
const checkLogin = require("../helper/check_login")

homeRouter.get("/", async (req, res) => {
    if(req.session.loggedin) res.render("index")
    else res.render("index-guest")
})
module.exports = homeRouter