mapboxgl.accessToken = 'pk.eyJ1Ijoicm9nZXItZmVyZGluYW4iLCJhIjoiY2xoZWlkNnowMHdtaDNkczc3MHQ0cmF6dCJ9.uptRzyfzpQPPemd1_wYo_Q';

function setupMap(center) {
    const marker = new mapboxgl.Marker().setLngLat(center).addTo(map);
}

const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/navigation-night-v1', // style URL
});

var features = []
// Get Current Location
navigator.geolocation.getCurrentPosition((position)=> {
    const longitude = position.coords.longitude;
    const latitude = position.coords.latitude;
    setupMap([longitude, latitude])
    map.flyTo({center: [longitude, latitude], zoom: 13})
    const params = {
        longtitude : longitude,
        latitude : latitude
    }
    var resp = makeRequest("POST", "/near_station", params)
    resp.then((r) => {
        var result = JSON.parse(r)["result"]
        const features = []
        result.forEach((T) => {
            features.push({
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [T.longitude, T.latitude]
                },
                "properties": {
                    "name": T.station_name
                }
            })
        })
        map.addSource("stations", {
            type: "geojson",
            data: {
                "type": "FeatureCollection",
                "features": features
            }
        })
        map.addLayer({
            "id": "stations",
            "type": "marker",
            "source": "stations"
        })
        map.getSource("stations").setData({
            "type": "FeatureCollection",
            "features": features
        })
        map.on("load", "stations", (e) => {
            console.log(e)
        })
    })
    
}, () => {}, {enableHighAccuracy: true})

// Promised Make Request
function makeRequest(method, url, params) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response);
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };
        xhr.send(JSON.stringify(params));
    });
}