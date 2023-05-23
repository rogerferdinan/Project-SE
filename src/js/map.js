mapboxgl.accessToken = 'pk.eyJ1Ijoicm9nZXItZmVyZGluYW4iLCJhIjoiY2xoZWlkNnowMHdtaDNkczc3MHQ0cmF6dCJ9.uptRzyfzpQPPemd1_wYo_Q';
navigator.geolocation.getCurrentPosition((position)=> {
    setupMap([position.coords.longitude, position.coords.latitude])
}, ()=> { }, {
    enableHighAccuracy: true
})
function setupMap(center) {
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/streets-v12', // style URL
        center: center, // starting position [lng, lat]
        zoom: 15 // starting zoom
    });
    const marker = new mapboxgl.Marker().setLngLat(center).addTo(map);
}