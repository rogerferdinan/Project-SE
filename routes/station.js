const express = require("express")
const checkLogin = require("../helper/check_login")
const { get_station } = require("../middleware/station")
const stationRouter = express.Router()

stationRouter.post("/near_station", async (req, res) => {
    const longitude = req.body.longtitude
    const latitude = req.body.latitude

    console.log(req.body)
    if(!longitude || !latitude) {
        res.status(400).send({
            status: "Longtitude or Latitude cannot be empty"
        })
        return
    }
    result = await get_station(longitude, latitude)
    res.send(result)
})
// GET all List Station
// Get Station Coordinate

module.exports = stationRouter