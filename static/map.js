$(document).ready(function() {
  initMap();

  $(".accordion").click(function(){
      $(this).toggleClass("active");

      var panel = $(this).next();

      if (panel.css("maxHeight") !== "0px" && panel.css("maxHeight")) {
          panel.css("maxHeight", "0px");
      } else {
          panel.css("maxHeight", panel.prop("scrollHeight") + "px");
      }
  });
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
    var turtlePond = [40.7795, -73.9680];
    var harlemMeer = [40.7965, -73.9516];
    var reservoir = [40.7857, -73.9639]
    var lake = [40.7768, -73.9727]
    var loch = [40.79473,  -73.9594]
    var gill = [40.7775, -73.97092]

    // Woodland 
    var ramble = [40.7779, -73.9697]
    var northWoods = [40.7978, -73.9561]
    var halletNature = [40.76718, -73.97498]

    // Open Areas 
    var wildflowerMeadow = [40.79434, -73.95706]
    var conservatoryGarden = [40.7932, -73.9523]
    var shakespearGarden = [40.7798, -73.9699]
    var greatLawn = [40.78199, -73.9665]


    var map = L.map('map').setView(centralPark, 14);

    // Set up the OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Freshwater 
    var turtlePondMarker = L.marker(turtlePond, {icon: waterIcon}).addTo(map);
    turtlePondMarker.bindPopup('<b>Turtle Pond</b> <br> <a href = "/birds/freshwater">Freshwater</a>');

    $('#link-turtle-pond').click(function() {
      turtlePondMarker.openPopup();
      map.setView(turtlePond, 16); // Optional: centers the map on the marker and zooms in
   });

    var harlemMeerMarker = L.marker(harlemMeer, {icon: waterIcon}).addTo(map);
    harlemMeerMarker.bindPopup('<b>Harlem Meer</b> <br> <a href = "/birds/freshwater">Freshwater</a>');

    $('#link-harlem-meer').click(function() {
      harlemMeerMarker.openPopup();
      map.setView(harlemMeer, 16); // Optional: centers the map on the marker and zooms in
    });

    var reservoirMarker = L.marker(reservoir, {icon: waterIcon}).addTo(map);
    reservoirMarker.bindPopup('<b>Reservoir</b> <br> <a href = "/birds/freshwater">Freshwater</a>');
    $('#link-reservoir').click(function() {
      reservoirMarker.openPopup();
      map.setView(reservoir, 16); // Optional: centers the map on the marker and zooms in
    });

    var lakeMarker = L.marker(lake, {icon: waterIcon}).addTo(map);
    lakeMarker.bindPopup('<b>The Lake</b> <br> <a href = "/birds/freshwater">Freshwater</a>');
    $('#link-lake').click(function() {
      lakeMarker.openPopup();
      map.setView(lake, 16); // Optional: centers the map on the marker and zooms in
    });

    var lochMarker = L.marker(loch, {icon: waterIcon}).addTo(map);
    lochMarker.bindPopup('<b>The Loch </b> <br> <a href = "/birds/freshwater">Freshwater</a>');
    $('#link-loch').click(function() {
      lochMarker.openPopup();
      map.setView(loch, 16); // Optional: centers the map on the marker and zooms in
    });



    var gillMarker = L.marker(gill, {icon: waterIcon}).addTo(map);
    gillMarker.bindPopup('<b>The Gill</b> <br> <a href = "/birds/freshwater">Freshwater</a>');
    $('#link-gill').click(function() {
      gillMarker.openPopup();
      map.setView(gill, 16); // Optional: centers the map on the marker and zooms in
    });



    // Woodland 
    var rambleMarker = L.marker(ramble, {icon: woodlandIcon}).addTo(map);
    rambleMarker.bindPopup('<b>Ramble</b> <br> <a href = "/birds/Woodlands">Woodlands</a>');
    $('#link-ramble').click(function() {
      rambleMarker.openPopup();
      map.setView(ramble, 16); // Optional: centers the map on the marker and zooms in
    });


    var northWoodsMarker = L.marker(northWoods, {icon: woodlandIcon}).addTo(map);
    northWoodsMarker.bindPopup('<b>North Woods</b> <br> <a href = "/birds/Woodlands">Woodlands</a>');
    $('#link-north-woods').click(function() {
      northWoodsMarker.openPopup();
      map.setView(northWoods, 16); // Optional: centers the map on the marker and zooms in
    });

    var halletNatureMarker = L.marker(halletNature, {icon: woodlandIcon}).addTo(map);
    halletNatureMarker.bindPopup('<b>Hallet Nature Sanctuary</b> <br> <a href = "/birds/Woodlands">Woodlands</a>');
    $('#link-hallet-nature').click(function() {
      halletNatureMarker.openPopup();
      map.setView(halletNature, 16); // Optional: centers the map on the marker and zooms in
    });

    // Opean Areas
    var wildflowerMeadowMarker = L.marker(wildflowerMeadow, {icon: openIcon}).addTo(map);
    wildflowerMeadowMarker.bindPopup('<b>Wildflower Meadow</b> <br> <a href = "/birds/open-areas">Open Areas</a>');
    $('#link-wildflower').click(function() {
      wildflowerMeadowMarker.openPopup();
      map.setView(wildflowerMeadow, 16); // Optional: centers the map on the marker and zooms in
    });


    var conservatoryGardenMarker = L.marker(conservatoryGarden, {icon: openIcon}).addTo(map);
    conservatoryGardenMarker.bindPopup('<b>Conservatory Garden</b> <br> <a href = "/birds/open-areas">Open Areas</a>');
    $('#link-conservatory').click(function() {
      conservatoryGardenMarker.openPopup();
      map.setView(conservatoryGarden, 16); // Optional: centers the map on the marker and zooms in
    });

    var shakespearGardenMarker = L.marker(shakespearGarden, {icon: openIcon}).addTo(map);
    shakespearGardenMarker.bindPopup('<b>Shakespeare Garden</b> <br> <a href = "/birds/open-areas">Open Areas</a>');
    $('#link-shakespeare').click(function() {
      shakespearGardenMarker.openPopup();
      map.setView(shakespearGarden, 16); // Optional: centers the map on the marker and zooms in
    });

    var greatLawnMarker = L.marker(greatLawn, {icon: openIcon}).addTo(map);
    greatLawnMarker.bindPopup('<b>Great Lawn</b> <br> <a href = "/birds/open-areas">Open Areas</a>');
    $('#link-great-lawns').click(function() {
      greatLawnMarker.openPopup();
      map.setView(greatLawn, 16); // Optional: centers the map on the marker and zooms in
    });


  
}




