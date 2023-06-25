const https = require("node:https");

async function get_matrix(coordinates) {
    coordinates.join(";");
    const access_token = "pk.eyJ1Ijoicm9nZXItZmVyZGluYW4iLCJhIjoiY2xoZWlkNnowMHdtaDNkczc3MHQ0cmF6dCJ9.uptRzyfzpQPPemd1_wYo_Q"
    const opt = {
        host: "api.mapbox.com",
        path: `/directions-matrix/v1/mapbox/driving/${coordinates.join(";")}?annotations=duration,distance&access_token=${access_token}`
    }

    const matrix = new Promise((resolve, reject) => {
        https.get(opt, (res) => {
            var body = "";
            res.on("data", (chunk) => {
                body += chunk;
            })
            res.on("end", () => {
                resolve(JSON.parse(body))
            })
        }).on("error", (e) => {
            reject(e.message)
        })
    })
    return matrix;
}
module.exports = get_matrix