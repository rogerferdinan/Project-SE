const express = require("express")
const homeRouter = express.Router()
const checkLogin = require("../helper/check_login")

homeRouter.get("/", (req, res) => {
    res.render("index")
})
module.exports = homeRouter