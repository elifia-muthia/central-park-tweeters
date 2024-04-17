$(document).ready(function() {
  initMap();
});


function initMap() {

    var openIcon = new L.Icon({
        iconUrl: openareaIconUrl,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -30],
        shadowSize: [41, 41]
      });
      
      var waterIcon = new L.Icon({
        iconUrl: freshwaterIconUrl,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });

      var woodlandIcon = new L.Icon({
        iconUrl: woodlandIconUrl,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });

      


    var centralPark = [40.7829, -73.9654];

    // Freshwater
    var turtlePond = [40.7751, -73.9689];
    var harlemMeer = [40.7967, -73.9519];
    var reservoir = [40.7854, -73.9639]
    var lake = [40.7740, -73.9693]
    var loch = [40.7950,  -73.9580]
    var gill = [40.7745, -73.9716]

    // Woodland 
    var ramble = [40.7754, -73.9727]
    var northWoods = [40.7950, -73.9580]
    var halletNature = [40.7672, -73.9730]

    // Open Areas 
    var wildflowerMeadow = [40.7967, -73.9519]
    var conservatoryGarden = [40.7932, -73.9523]
    var shakespearGarden = [40.7794, -73.9673]
    var greatLawn = [40.7790, -73.9665]


    var map = L.map('map').setView(centralPark, 14);

    // Set up the OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Freshwater 
    var turtlePondMarker = L.marker(turtlePond, {icon: waterIcon}).addTo(map);
    turtlePondMarker.bindPopup('<b>Turtle Pond</b> <br> <a href = "/birds/freshwater">Freshwater</a>');

    var harlemMeerMarker = L.marker(harlemMeer, {icon: waterIcon}).addTo(map);
    harlemMeerMarker.bindPopup('<b>Harlem Meer</b> <br> <a href = "/birds/freshwater">Freshwater</a>');

    var reservoirMarker = L.marker(reservoir, {icon: waterIcon}).addTo(map);
    reservoirMarker.bindPopup('<b>Reservoir</b> <br> <a href = "/birds/freshwater">Freshwater</a>');

    var lakeMarker = L.marker(lake, {icon: waterIcon}).addTo(map);
    lakeMarker.bindPopup('<b>The Lake</b> <br> <a href = "/birds/freshwater">Freshwater</a>');

    var lochMarker = L.marker(loch, {icon: waterIcon}).addTo(map);
    lochMarker.bindPopup('<b>The Loch r</b> <br> <a href = "/birds/freshwater">Freshwater</a>');

    var gillMarker = L.marker(gill, {icon: waterIcon}).addTo(map);
    gillMarker.bindPopup('<b>The Gill</b> <br> <a href = "/birds/freshwater">Freshwater</a>');


    // Woodland 
    var rambleMarker = L.marker(ramble, {icon: woodlandIcon}).addTo(map);
    rambleMarker.bindPopup('<b>Ramble</b> <br> <a href = "/birds/Woodlands">Woodlands</a>');

    var northWoodsMarker = L.marker(northWoods, {icon: woodlandIcon}).addTo(map);
    northWoodsMarker.bindPopup('<b>North Woods</b> <br> <a href = "/birds/Woodlands">Woodlands</a>');

    var halletNatureMarker = L.marker(halletNature, {icon: woodlandIcon}).addTo(map);
    halletNatureMarker.bindPopup('<b>Hallet Nature Sanctuary</b> <br> <a href = "/birds/Woodlands">Woodlands</a>');

    // Opean Areas
    var wildflowerMeadowMarker = L.marker(wildflowerMeadow, {icon: openIcon}).addTo(map);
    wildflowerMeadowMarker.bindPopup('<b>Wildflower Meadow</b> <br> <a href = "/birds/open-areas">Open Areas</a>');

    var conservatoryGardenMarker = L.marker(conservatoryGarden, {icon: openIcon}).addTo(map);
    conservatoryGardenMarker.bindPopup('<b>Conservatory Garden</b> <br> <a href = "/birds/open-areas">Open Areas</a>');

    var shakespearGardenMarker = L.marker(shakespearGarden, {icon: openIcon}).addTo(map);
    shakespearGardenMarker.bindPopup('<b>Shakespeare Garden</b> <br> <a href = "/birds/open-areas">Open Areas</a>');

    var greatLawnMarker = L.marker(greatLawn, {icon: openIcon}).addTo(map);
    greatLawnMarker.bindPopup('<b>Great Lawn</b> <br> <a href = "/birds/open-areas">Open Areas</a>');


  
}




