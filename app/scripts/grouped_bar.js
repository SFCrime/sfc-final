 var svg = dimple.newSvg("#groupedBar", 590, 400);
  d3.csv("data/grouped_bar.csv", function (data) {
    var myChart = new dimple.chart(svg, data);
    myChart.setBounds(60, 30, 510, 330);
    myChart.addCategoryAxis("x", ["game", "category"]);
    myChart.addMeasureAxis("y", "value");
    myChart.addSeries("category", dimple.plot.bar);
    myChart.addLegend(65, 10, 510, 20, "right");
    myChart.draw();
  });
