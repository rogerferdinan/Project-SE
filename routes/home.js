const express = require("express")
const homeRouter = express.Router()
const checkLogin = require("../helper/check_login")

<<<<<<< Updated upstream
homeRouter.get("/", (req, res) => {
    res.render("index")
=======
homeRouter.get("/", async (req, res) => {
    if(req.session.loggedin) res.render("index")
    else res.render("index-guest")
>>>>>>> Stashed changes
})
module.exports = homeRouter