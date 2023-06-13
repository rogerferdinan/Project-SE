mapboxgl.accessToken = 'pk.eyJ1Ijoicm9nZXItZmVyZGluYW4iLCJhIjoiY2xoZWlkNnowMHdtaDNkczc3MHQ0cmF6dCJ9.uptRzyfzpQPPemd1_wYo_Q';

function setupMap(coordinate, className) {
    const el = document.createElement('div');
    el.className = className;

    const popup = new mapboxgl.Popup({offset: 25})
        .setText("Lorem Ipsum");
    const marker = new mapboxgl.Marker(el)
        .setLngLat(coordinate)
        .addTo(map);
    return marker;
}

const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/navigation-day-v1', // style URL
});

var station_marker = []
var longitude = 0;
var latitude = 0;
// Get Current Location
navigator.geolocation.getCurrentPosition((position)=> {
    longtitude = position.coords.longitude;
    latitude = position.coords.latitude;
    setupMap([longitude, latitude], "marker-user")
    map.flyTo({center: [longtitude, latitude], zoom: 13})
    const params = {
        longtitude : longtitude,
        latitude : latitude
    }
    var resp = makeRequest("POST", "/near_station", params)
    resp.then((r) => {
        var result = JSON.parse(r)["result"]
        result.forEach((T) => {
            console.log(T)
            const marker = setupMap([T.longtitude, T.latitude], "marker-station")
            station_marker.push(marker)
        })
    })
    
}, () => {}, {enableHighAccuracy: true})

function getNormalCharger() {
    deleteAllMarker()
    const params = {
        longtitude : longitude,
        latitude : latitude
    }
    var resp = makeRequest("POST", "/normal_station", params)
    resp.then((r) => {
        var result = JSON.parse(r)["result"]
        result.forEach((T) => {
            const marker = setupMap([T.longtitude, T.latitude], "marker-normal")
            station_marker.push(marker);
        })
    })
}

function getFastCharger() {
    deleteAllMarker()
    const params = {
        longtitude : longitude,
        latitude : latitude
    }
    var resp = makeRequest("POST", "/fast_station", params)
    resp.then((r) => {
        var result = JSON.parse(r)["result"]
        result.forEach((T) => {
            const marker = setupMap([T.longtitude, T.latitude], "marker-normal");
            station_marker.push(marker)
        })
    })
}

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

function deleteAllMarker() {
    if(station_marker !== null) {
        for (var i = station_marker.length - 1; i >= 0; i--) {
            station_marker[i].remove();
        }
    } 
}