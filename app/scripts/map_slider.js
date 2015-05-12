$(document).ready(function() {
    d3.csv("data/map_slider.csv", function(data) {
        drawMarkerArea(data);
        window.myData = data;
    });

    var drawMarkerArea = function(csvfile) {
        var groupname = "crimes";
        var data = crossfilter(csvfile);
        var icn = L.icon({
            iconUrl: 'images/myMarker.png',
            iconSize: [25, 41],
	    iconAnchor: [12, 41],
	    popupAnchor: [1, -34],
	    shadowSize: [41, 41]
        });
        var mapChart = dc.leafletMarkerChart("#dcjs-map", groupname);
        var crime = data.dimension(function(d) {
            return d.lon + "," + d.lat;
        });
        var crimeGroup = crime.group().reduceCount();
        mapChart
            .dimension(crime)
            .group(crimeGroup)
            .width(600)
            .icon(function(d,map){return icn;})
            .renderPopup(false)
            .height(600)
            .zoom(12)
            .cluster(true)
            .center([37.77, -122.44]);


        var categoryChart = dc.rowChart("#category", groupname);
        var category = data.dimension(function(d) {
            return d.category;
        });
        var categoryGroup = category.group().reduceCount();
        categoryChart
            .dimension(category)
            .group(categoryGroup)
            .height(700)
            .width(390)
            .elasticX(true)
            .colors(["#f0ad4e"])
            .xAxis().ticks(2).tickFormat(d3.format("s"));


        var gameChart = dc.rowChart("#gamegraph", groupname);
        var game = data.dimension(function(d) {
            return d.game;
        });
        var gameGroup = game.group().reduceCount();
        gameChart
            .dimension(game)
            .group(gameGroup)
            .height(200)
            .width(390)
            .elasticX(true)
            .colors(["#EB9316"])
            .xAxis().ticks(2).tickFormat(d3.format("s"));



        var hourChart = dc.barChart("#crimesbyhour", groupname);
        var crimesbyhour = data.dimension(function(d) {
            return d.hour;
        });
        var crimesbyhourGroup = crimesbyhour.group().reduceCount();
        hourChart
            .dimension(crimesbyhour)
            .group(crimesbyhourGroup)
            .width(800)
            .transitionDuration(500)
            .elasticY(true)
            .colors(["#EB9316"])
            .x(d3.scale.linear().domain([0, 23]))
            .yAxis().ticks(2).tickFormat(d3.format("s"));




        var winChart = dc.rowChart("#mywingraph", groupname);
        var win = data.dimension(function(d) {
            return d.win;
        });
        var winGroup = win.group().reduceCount();
        winChart
            .dimension(win)
            .group(winGroup)
            .width(390)
            .elasticX(true)
            .colors(["#f0ad4e"])
            .xAxis().ticks(2).tickFormat(d3.format("s"));



        var homeChart = dc.rowChart("#myhomegraph", groupname);
        var home = data.dimension(function(d) {
            return d.home;
        });
        var homeGroup = home.group().reduceCount();
        homeChart
            .dimension(home)
            .group(homeGroup)
            .width(390)
            .transitionDuration(500)
            .elasticX(true)
            .colors(["#f0ad4e"])
            .xAxis().ticks(2).tickFormat(d3.format("s"));

        dc.renderAll(groupname);
    }
    $('#resetMapRender').click(function(){
        $('#crimesbyhour').empty();
        $('#gamegraph').empty();
        $('#mywingraph').empty();
        $('#myhomegraph').empty();
        $('#category').empty();
        $('#dcjs-map').empty();
        drawMarkerArea(window.myData);
    });
});
