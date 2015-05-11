$(document)
    .ready(function() {
        var w = 600,
            h = 600;
        d3.xhr("data/radar.csv", function(csv) {
            function showLegend(data) {
                var LegendOptions = cols = data.map(function(d, i) {
                    var weekday = new Array(7);
                    weekday[0]=  "Sunday";
                    weekday[1] = "Monday";
                    weekday[2] = "Tuesday";
                    weekday[3] = "Wednesday";
                    weekday[4] = "Thursday";
                    weekday[5] = "Friday";
                    weekday[6] = "Saturday";
                    var game_local = [
                        "away",
                        "away",
                        "home",
                        "home",
                        "home",
                        "away",
                        "away"
                    ];
                    var temp = d.className.split("a")[1].split("-");
                    var myDate = new Date(temp[0],temp[1]-1,temp[2]);
                    return {
                        text: "World Series Game " + (i + 1) + ": " + weekday[myDate.getDay()] + ", Oct. " + myDate.getDate() + ", " + game_local[i],
                        classed: d.className
                    }
                });

                var colorscale = d3.scale.category10();
                //Legend titles
                var svg = d3.select('#legend')
                    .selectAll('svg')
                    .data([1])
                    .enter()
                    .append('svg')
                    .attr("width", 280)
                    .attr("height", 160);

                //Initiate Legend
                var legend = svg.append("g")
                    .attr("class", "legend")
                    .attr("height", 160)
                    .attr("width", 280)
                    .attr('transform', 'translate(10,20)');
                //Create colour squares
                legend.selectAll('rect')
                    .data(LegendOptions)
                    .enter()
                    .append("rect")
                    .attr("x", 20)
                    .attr("y", function(d, i) {
                        return i * 20;
                    })
                    .attr("class", function(d) {
                        return d.class;

                    })
                    .attr("width", 10)
                    .attr("height", 10)
                    .style("fill", function(d, i) {
                        return colorscale(i);
                    });
                //Create text next to squares
                legend.selectAll('text')
                    .data(LegendOptions)
                    .enter()
                    .append("text")
                    .attr("x", 35)
                    .attr("y", function(d, i) {
                        return i * 20 + 9;
                    })
                    .attr("class", function(d) {
                        return d.classed;
                    })
                    .attr("font-size", "11px")
                    .attr("fill", "#737373")
                    .text(function(d) {
                        return d.text;
                    });


                var rects = d3.select("#legend").selectAll("svg").selectAll("rect");
                var texts = d3.select("#legend").selectAll("svg").selectAll("text");
                var mousov = function (el){
                    var graphed = d3.select("#radar-chart").selectAll("svg").selectAll("polygon."+el.classed);
                    graphed.classed("focused", true);
                    console.log(graphed);
                };
                var mousout = function (el){
                    var graphed = d3.select("#radar-chart").selectAll("svg").selectAll("polygon."+el.classed);
                    graphed.classed("focused", false);
                    console.log(graphed);
                };
                rects.on("mouseover", mousov);
                texts.on("mouseover", mousov);
                rects.on("mouseout", mousout);
                texts.on("mouseout", mousout);
                
            }

            function showRadar() {
                var data = [];
                var chart = RadarChart.chart();
                var c = csv.response;
                csv = c.split("\n").map(function(i) {
                    return i.split(",");
                })
                var headers = [];
                csv.forEach(function(item, i) {
                    if (i == 0) {
                        headers = item;
                    } else {
                        newSeries = {};
                        item.forEach(function(v, j) {
                            if (j == 0) {
                                newSeries.className = "a"+v;
                                newSeries.axes = [];
                            } else {
                                newSeries.axes.push({
                                    "axis": [headers[j]],
                                    "value": parseFloat(v)
                                });
                            }
                        });
                        data.push(newSeries);
                    }
                })
                data = data.slice(0, 7);
                RadarChart.defaultConfig.w = w;
                RadarChart.defaultConfig.h = h;
                RadarChart.defaultConfig.levels = 6;
                RadarChart.defaultConfig.circles = false;
                RadarChart.defaultConfig.axisText = true;
                RadarChart.draw("#radar-chart", data);

                //d3.select("#radar-chart").selectAll(".level-group").selectAll("text");
                showLegend(data);
            }
            showRadar();



            // is the hover object...
            $('.area').hover(function(e) {


            }, function(e) {});
        });
    });
