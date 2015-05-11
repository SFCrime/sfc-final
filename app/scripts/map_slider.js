d3.csv("data/map_slider.csv", function(data) {
    drawMarkerArea(data);
});

function drawMarkerArea(csvfile) {
    var groupname = "crimes";
    var data = crossfilter(csvfile);


    var mapChart = dc.leafletMarkerChart("#dcjs-map", groupname);
    var crime = data.dimension(function(d) {
        return d.lon + "," + d.lat;
    });
    var crimeGroup = crime.group().reduceCount();
    mapChart
        .dimension(crime)
        .group(crimeGroup)
        .width(600)
        .height(600)
        .zoom(14)
        .center([37.7595, -122.427]);


    var categoryChart = dc.rowChart("#category", groupname);
    var category = data.dimension(function(d) {
        return d.category;
    });
    var categoryGroup = category.group().reduceCount();
    categoryChart
        .dimension(category)
        .group(categoryGroup)
        .height(600)
        .width(270)
        .elasticX(true)
        .colors(["#2ca25f"])
        .xAxis().ticks(2).tickFormat(d3.format("s"));


    var gameChart = dc.rowChart("#game", groupname);
    var game = data.dimension(function(d) {
        return d.game;
    });
    var gameGroup = game.group().reduceCount();
    gameChart
        .dimension(game)
        .group(gameGroup)
        .height(300)
        .width(270)
        .elasticX(true)
        .colors(["#2b8cbe"])
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
        .x(d3.scale.linear().domain([0, 23]))
        .yAxis().ticks(2).tickFormat(d3.format("s"));


    // var winChart = dc.barChart("#win", groupname);
    // var win = data.dimension(function(d) {
    //     return d.win;
    // });
    // var winGroup = win.group().reduceCount();
    // winChart
    //     .dimension(win)
    //     .group(winGroup)
    //     .xUnits(dc.units.ordinal)
    //     .width(200)
    //     .elasticY(true)
    //     .colors(["#2ca25f"])
    //     .yAxis().ticks(2).tickFormat(d3.format("s"));
    // var homeChart = dc.barChart("#home", groupname);
    // var home = data.dimension(function(d) {
    //     return d.home;
    // });
    // var homeGroup = home.group().reduceCount();
    // homeChart
    //     .dimension(home)
    //     .group(homeGroup)
    //     .xUnits(dc.units.ordinal)
    //     .width(200)
    //     .elasticY(true)
    //     .colors(["#2ca25f"])
    //     .yAxis().ticks(2).tickFormat(d3.format("s"));

    dc.renderAll(groupname);
}
