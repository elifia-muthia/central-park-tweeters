function initMap() {

    var openIcon = new L.Icon({
        iconUrl: openareaIconUrl,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });
      
      var waterIcon = new L.Icon({
        iconUrl: freshwaterIconUrl,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });


    var centralPark = [40.7829, -73.9654];
    var turtlePond = [40.7751, -73.9689];
    var bethesdaTerrace = [40.7740, -73.9708];

    var map = L.map('map').setView(centralPark, 14);

    // Set up the OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add a marker for Central Park at the approximate center
    // var marker = L.marker(centralPark).addTo(map);
    // marker.bindPopup('<b>Central Park</b><br>New York City').openPopup();

    var turtlePondMarker = L.marker(turtlePond, {icon: waterIcon}).addTo(map);
    turtlePondMarker.bindPopup('<b>Turtle Pond</b>').openPopup();

    // Bethesda Terrace Marker
    var bethesdaTerraceMarker = L.marker(bethesdaTerrace, {icon: openIcon}).addTo(map);
    bethesdaTerraceMarker.bindPopup('<b>Bethesda Terrace</b>').openPopup();

    // marker.on('click', function(e) {
    //     // Custom behavior code
    //     console.log('Marker clicked at ' + e.latlng.toString());
    // });
  
}

initMap();
