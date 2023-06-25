const express = require("express")
const reserveRouter = express.Router()

reserveRouter.get("/reservation-detail", async (req, res) => {
    res.render("reservation-detail")
})

module.exports = reserveRouter;