const express = require("express")
const checkLogin = require("../helper/check_login")
const get_near_station = require("../feature/get_near_station")
const stationRouter = express.Router()

stationRouter.post("/near_station", async (req, res) => {
    const longitude = req.body.longitude
    const latitude = req.body.latitude

    if(!longitude || !latitude) {
        res.status(400).send({
            status: "longitude or Latitude cannot be empty"
        })
        return
    }
    result = await get_near_station(longitude, latitude)
    res.send(result)
})

stationRouter.post("/normal_station", async(req, res) => {
    const longitude = req.body.longitude
    const latitude = req.body.latitude

    console.log(req.body)
    if(!longitude || !latitude) {
        res.status(400).send({
            message: "longitude or Latitude cannot be empty"
        })
        return
    }
    result = await get_normal_station(longitude, latitude)
    res.send(result)
})

stationRouter.post("/fast_station", async(req, res) => {
    const longitude = req.body.longitude
    const latitude = req.body.latitude

    console.log(req.body)
    if(!longitude || !latitude) {
        res.status(400).send({
            message: "longitude or Latitude cannot be empty"
        })
        return
    }
    result = await get_fast_station(longitude, latitude)
    res.send(result)
})

stationRouter.get("/station-detail", checkLogin, async (req, res) => {
    res.redirect("/")
})

stationRouter.post("/station-detail", checkLogin, async (req, res) => {
    const station_id = req.body.station_id;
    const longitude = req.body.longitude;
    const latitude = req.body.latitude;
    var result = await get_station_detail(station_id, longitude, latitude);
    console.log(result);
    if(result.success) {
        result = result.result[0];
        res.render("station-detail", {
            station_name: result.station_name,
            station_address: result.station_address,
            charging_power: result.charging_power,
            distance: result.distance
        });
    }
})
// GET all List Station
// Get Station Coordinate

module.exports = stationRouter