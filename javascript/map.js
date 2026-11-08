/*interactive map for bright beginnigs this will be the map in the contact us page */
/*this is using leaflet */
document.addEventListener("DOMContentLoaded", function () {

    // create the map ()
    var map = L.map("map");

    // the map tiles
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // our locations
    var locations = [
        { name: "Bright Beginnings Head Office", lat: -29.839544, lng: 30.926681, info: "Open Mon-Fri, 08:00-16:00" },
        { name: "Food Drop-off Point", lat: -29.675936, lng: 31.034072, info: "Donate non-perishable food here" }
        //used claude for this part as i didnt know how to get cordinates
    ];

    // popups for each location
    var points = [];
    locations.forEach(function (place) {
        var marker = L.marker([place.lat, place.lng]).addTo(map);
        marker.bindPopup("<strong>" + place.name + "</strong><br>" + place.info);
        points.push([place.lat, place.lng]);
    });

    // zoom and move the map so every marker is visible
    map.fitBounds(points, { padding: [40, 40] });
});