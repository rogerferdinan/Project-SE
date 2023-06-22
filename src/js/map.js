mapboxgl.accessToken = 'pk.eyJ1Ijoicm9nZXItZmVyZGluYW4iLCJhIjoiY2xoZWlkNnowMHdtaDNkczc3MHQ0cmF6dCJ9.uptRzyfzpQPPemd1_wYo_Q';

function set_popup(id, name, address, distance, power) {
    const popup = document.createElement("div");
    popup.className = "location-box";
    
    const div_wrapper = document.createElement("div");
    div_wrapper.className = "popup-wrapper";
    const div1 = document.createElement("div");
    const h5 = document.createElement("h5");
    h5.innerHTML = name;
    const h6 = document.createElement("h6");
    h6.innerHTML = address;
    div1.appendChild(h5);
    div1.appendChild(h6);

    const div2 = document.createElement("div");
    div2.classList.add("distance");
    div2.classList.add("popup-detail");
    var img = document.createElement("img");
    img.src = "asset/location.png";
    var h7 = document.createElement("h7");
    h7.innerHTML = distance;
    div2.appendChild(img);
    div2.appendChild(h7);

    div_wrapper.appendChild(div1);
    div_wrapper.appendChild(div2);

    const div3 = document.createElement("div");
    div3.classList.add("popup-detail");
    div3.classList.add("charging-power");
    var img = document.createElement("img");
    img.src = "asset/charging-power.png";
    var h7 = document.createElement("h7");
    h7.innerHTML = power + " kW";
    div3.appendChild(img);
    div3.appendChild(h7);

    const form = document.createElement("form");
    form.setAttribute("action", "/station-detail");
    form.setAttribute("method", "get");
    form.id = id;
    const input_station_id = document.createElement("input");
    input_station_id.setAttribute("type", "hidden");

    const btn = document.createElement("input");
    btn.className = "button-detail";
    btn.value = "Detail";
    btn.setAttribute("type", "submit");

    form.appendChild(input_station_id);
    form.appendChild(btn);

    popup.appendChild(div_wrapper);
    popup.appendChild(div3);
    popup.appendChild(form);
    
    return popup;
}

function setupMap(coordinate, className, popup) {
    const el = document.createElement('div');
    el.className = className;
    const marker = new mapboxgl.Marker(el)
        .setLngLat(coordinate)
        .setPopup(popup)
        .addTo(map);
    return marker;
}

const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/navigation-day-v1', // style URL
});

var station_marker = []
var longtitude = 0;
var latitude = 0;
// Get Current Location
navigator.geolocation.getCurrentPosition((position)=> {
    // longtitude = position.coords.longitude;
    longtitude = 106.77;
    latitude = -6.2017;
    // latitude = position.coords.latitude;
    setupMap([longtitude, latitude], "marker-user", undefined);
    map.flyTo({center: [longtitude, latitude], zoom: 13});
    const params = {
        longtitude : longtitude,
        latitude : latitude
    }

    var resp = makeRequest("POST", "/near_station", params)
    resp.then((r) => {
        var result = JSON.parse(r)["result"]
        result.forEach((T) => {
            const popup = new mapboxgl.Popup({
                offset: 25,
                maxWidth: "auto"
            }).setDOMContent(
                set_popup(
                    T.station_id,
                    T.station_name,
                    T.station_address,
                    T.distance,
                    T.charging_power
                )
            );
            const marker = setupMap([T.longtitude, T.latitude], "marker-station", popup);
            station_marker.push(marker);
        })
    })
    
}, () => {}, {
    enableHighAccuracy: true
})

function getNormalCharger() {
    deleteAllMarker()
    const params = {
        longtitude : longtitude,
        latitude : latitude
    }
    var resp = makeRequest("POST", "/normal_station", params)
    resp.then((r) => {
        var result = JSON.parse(r)["result"]
        result.forEach((T) => {
            const popup = new mapboxgl.Popup({
                offset: 25,
                maxWidth: "auto"
            }).setDOMContent(
                set_popup(
                    T.station_id,
                    T.station_name,
                    T.station_address,
                    T.distance,
                    T.charging_power
                )
            );
            const marker = setupMap([T.longtitude, T.latitude], "marker-normal", popup);
            station_marker.push(marker);
        })
    })
}

function getFastCharger() {
    deleteAllMarker()
    const params = {
        longtitude : longtitude,
        latitude : latitude
    }
    var resp = makeRequest("POST", "/fast_station", params)
    resp.then((r) => {
        var result = JSON.parse(r)["result"]
        result.forEach((T) => {
            const popup = new mapboxgl.Popup({
                offset: 25,
                maxWidth: "auto"
            }).setDOMContent(
                set_popup(
                    T.station_id,
                    T.station_name,
                    T.station_address,
                    T.distance,
                    T.charging_power
                )
            );
            const marker = setupMap([T.longtitude, T.latitude], "marker-fast", popup);
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