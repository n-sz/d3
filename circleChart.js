function cleateCircle(dataset, totalVal, circleChartId, circleNo) {

    var width = 480,
        height = 250,
        radius = Math.min(width, height) / 2;

    var arc = d3.svg.arc()
        .outerRadius(radius - 10)
        .innerRadius(0);

    var pie = d3.layout.pie()
        .sort(null)
        .value(function (d) { return d.graphValue; });

    var tooltip = d3.select("body")
        .append("div")
        .style("position", "absolute")
        .style("z-index", "20")
        .style("border", "1px solid #eee")
        .style("background-color", "#fff")
        .style("visibility", "hidden");

    var svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("id", circleChartId)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");


    var g = svg.selectAll(".arc")
        .data(pie(dataset))
        .enter().append("g")
        .on("mouseover", function () { return tooltip.style("visibility", "visible"); })
        .on("mouseout", function () { return tooltip.style("visibility", "hidden"); })
        .on("mousemove", function (d, i) {
            return tooltip
                .style("top", (event.pageY - 10) + "px")
                .style("left", (event.pageX + 10) + "px")
                .html("<div style='bold'>" + d.data.graphKey + "</br>"
                + "val" + circleNo + " : " + d.data.graphValue + "</br>"
                + "Ratio : " + Math.round((d.data.graphValue / totalVal) * 100) + "</div>");
        }
        );

    g.append("path")
        .attr("d", arc)
        .style("fill", function (d) { return d.data.graphColor; })
        .transition()
        .duration(1000) // 1秒間でアニメーションさせる
        .attrTween("d", function (d) {
            var interpolate = d3.interpolate(
                { startAngle: 0, endAngle: 0 },
                { startAngle: d.startAngle, endAngle: d.endAngle }
            );
            return function (t) {
                return arc(interpolate(t));
            }
        }
        );

    g.append("text")
        .attr("transform", function (d) { return "translate(" + arc.centroid(d) + ")"; })
        .attr("dy", ".35em")
        .style("text-anchor", "middle")
        .text(function (d) { return d.data.graphKey; });


}