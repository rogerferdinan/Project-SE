const https = require("node:https");

async function get_city(longitude, latitude) {
    // const access_token = "pk.eyJ1Ijoicm9nZXItZmVyZGluYW4iLCJhIjoiY2xoZWlkNnowMHdtaDNkczc3MHQ0cmF6dCJ9.uptRzyfzpQPPemd1_wYo_Q"
    // const opt = {
    //     host: "api.mapbox.com",
    //     path: `/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${access_token}`,
    // }
    // const city = new Promise((resolve, reject) => {
    //     https.get(opt, (res) => {
    //         var body = "";
    //         res.on("data", (chunk) => {
    //             body += chunk;
    //         })
    //         res.on("end", () => {
    //             resolve(JSON.parse(body).features[0].context[3].text)
    //         })
    //     }).on("error", (e) => {
    //         reject(e.message)
    //     })
    // })
    const city = "Jakarta";
    return city;
}

module.exports = get_city