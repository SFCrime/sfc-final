$(document).ready(function() {

    var mapDiv = 'overviewmap';

    var poly =  [
                [-122.41996765398653, 37.807734540229234],
                [-122.42717743181856, 37.80542888105082],
                [-122.4379920985666, 37.8046151018008],
                [-122.44588852190644, 37.80380131358372],
                [-122.44400024675996, 37.79620552449143],
                [-122.42614746355683, 37.799189677645636],
                [-122.42219925188691, 37.772735028367485],
                [-122.42734909319552, 37.76920702633172],
                [-122.42494583391816, 37.74789974483029],
                [-122.40571975969942, 37.74952854346419],
                [-122.40709305071503, 37.768392848111056],
                [-122.39953995012911, 37.7696141120805],
                [-122.38597869873045, 37.7791272169824],
                [-122.38735199236542, 37.790779482644],
                [-122.40383148455292, 37.80610702357597],
                [-122.41189956926975, 37.808819531404076],
                [-122.41996765398653, 37.807734540229234]
    ]

    var attpark = [37.778611,-122.389167];
    var mission19th = [37.7602377,-122.4192456];
    var mission23rd = [37.7538463,-122.4186018];
    var valencia16th = [37.7649217,-122.4219094];
    var market3rd = [37.7876655,-122.4034605];
    var valencia21st = [37.7568988,-122.4211319];
    var bryant16th = [37.765618,-122.4105284];

    poly = poly.map(function(d){ return [d[1],d[0]];});


    var mapbox_pk = "pk.eyJ1IjoiYmlsbGMiLCJhIjoiYllENmI2VSJ9.7 wxYGAIJoOtQ2WE3zoCJEA";
    var map = L.map(mapDiv).setView([37.77, -122.44], 13);
    L.tileLayer('http://{s}.tiles.mapbox.com/v3/billc.lj7dn4cg/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    }).addTo(map);

    L.polygon(poly).addTo(map);

    L.marker(attpark)
        .addTo(map)
        .bindPopup("This is AT&T Park, the location of the home games.");
    L.marker(mission19th)
        .addTo(map)
        .bindPopup("This is 19th and Mission, the Location of a bonfire.");

    L.marker(mission23rd)
        .addTo(map)
        .bindPopup("This is 23rd and Mission, the site of another bonfire.");

    L.marker(valencia16th)
        .addTo(map)
        .bindPopup("Site of the Police Station and another bonfire.");

    L.marker(market3rd)
        .addTo(map)
        .bindPopup("Site where a bus was set on fire downtown.");
    
    L.marker(valencia21st)
        .addTo(map)
        .bindPopup("Shooting and Stabbing Near here, 21st and Valencia.");
    
    L.marker(bryant16th)
        .addTo(map)
        .bindPopup("A victim reported being shot here, 16th and Bryant.");
    
    
});
