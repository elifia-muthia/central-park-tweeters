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

    var bethesdaTerrace = [40.7740, -73.9708];


    var map = L.map('map').setView(centralPark, 14);

    console.log(map)
    // Set up the OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add a marker for Central Park at the approximate center
    // var marker = L.marker(centralPark).addTo(map);
    // marker.bindPopup('<b>Central Park</b><br>New York City').openPopup();

    // Freshwater 
    var turtlePondMarker = L.marker(turtlePond, {icon: waterIcon}).addTo(map);
    turtlePondMarker.bindPopup('<b>Turtle Pond</b>');

    var harlemMeerMarker = L.marker(harlemMeer, {icon: waterIcon}).addTo(map);
    harlemMeerMarker.bindPopup('<b>Harlem Meer</b>');

    var reservoirMarker = L.marker(reservoir, {icon: waterIcon}).addTo(map);
    reservoirMarker.bindPopup('<b>Reservoir</b>');

    var lakeMarker = L.marker(lake, {icon: waterIcon}).addTo(map);
    lakeMarker.bindPopup('<b>The Lake</b>');

    var lochMarker = L.marker(loch, {icon: waterIcon}).addTo(map);
    lochMarker.bindPopup('<b>The Loch r</b>');

    var gillMarker = L.marker(gill, {icon: waterIcon}).addTo(map);
    gillMarker.bindPopup('<b>The Gill</b>');


    // Woodland 
    var rambleMarker = L.marker(ramble, {icon: woodlandIcon}).addTo(map);
    rambleMarker.bindPopup('<b>Ramble</b>');

    var northWoodsMarker = L.marker(northWoods, {icon: woodlandIcon}).addTo(map);
    northWoodsMarker.bindPopup('<b>North Woods</b>');

    var halletNatureMarker = L.marker(halletNature, {icon: woodlandIcon}).addTo(map);
    halletNatureMarker.bindPopup('<b>Hallet Nature Sanctuary</b>');

    // Opean Areas
    var wildflowerMeadowMarker = L.marker(wildflowerMeadow, {icon: openIcon}).addTo(map);
    wildflowerMeadowMarker.bindPopup('<b>Wildflower Meadow</b>');

    var conservatoryGardenMarker = L.marker(conservatoryGarden, {icon: openIcon}).addTo(map);
    conservatoryGardenMarker.bindPopup('<b>Conservatory Garden</b>');

    var shakespearGardenMarker = L.marker(shakespearGarden, {icon: openIcon}).addTo(map);
    shakespearGardenMarker.bindPopup('<b>Shakespeare Garden</b>');

    var greatLawnMarker = L.marker(greatLawn, {icon: openIcon}).addTo(map);
    greatLawnMarker.bindPopup('<b>Great Lawn</b>');


    // Bethesda Terrace Marker
    // var bethesdaTerraceMarker = L.marker(bethesdaTerrace, {icon: openIcon}).addTo(map);
    // bethesdaTerraceMarker.bindPopup('<b>Bethesda Terrace</b>').openPopup();

    // marker.on('click', function(e) {
    //     // Custom behavior code
    //     console.log('Marker clicked at ' + e.latlng.toString());
    // });
  
}

initMap();


