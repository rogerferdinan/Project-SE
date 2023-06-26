const express = require("express")
const checkLogin = require("../helper/check_login")
const get_near_station = require("../feature/get_near_station")
const get_station_detail = require("../feature/get_station_detail")
const get_comment = require("../feature/get_comment")
const get_normal_station = require("../feature/get_normal_station")
const get_fast_station = require("../feature/get_fast_station")
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
    var station_detail = await get_station_detail(station_id, longitude, latitude);
    var comment = await get_comment(station_id);
    if(station_detail.success) {
        station_detail = station_detail.result[0];
        res.render("station-detail", {
            station_name: station_detail.station_name,
            station_address: station_detail.station_address,
            charging_power: station_detail.charging_power,
            distance: station_detail.distance,
            time_travel: station_detail.duration,
            comments: comment.result
        });
    }
})

// GET all List Station
// Get Station Coordinate

module.exports = stationRouter