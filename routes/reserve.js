const express = require("express");
const reserve_station = require("../feature/reserve_station");
const get_reservation_history = require("../feature/get_reservation_history");
const reserveRouter = express.Router()
const checkLogin = require("../helper/check_login")

reserveRouter.get("/reservation-detail", checkLogin, async(req, res) => [
    res.redirect("/")
])

reserveRouter.post("/reservation-detail", checkLogin, async (req, res) => {
    const station_id = req.body.station_id;
    const user_id = req.session.user_id;
    const reserve_detail = await reserve_station(user_id, station_id);
    console.log(reserve_detail);
    res.render("reservation-detail", {
        date: reserve_detail.result.reserve_date,
        station: reserve_detail.result.station_name,
        price: reserve_detail.result.reserve_price,
        va: "3901"+reserve_detail.result.phone_number
    })
})

reserveRouter.get("/reservation-history", checkLogin, async(req, res) => {
    const hist = await get_reservation_history(req.session.user_id);
    res.render("reservation-history", {
        first_name: req.session.first_name,
        history: hist
    })
})

module.exports = reserveRouter;