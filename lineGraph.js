function cleateLine(dataset) {

    var lineDefault = 2;

    var margin = { top: 50, right: 20, bottom: 50, left: 90 },
        width = 960 - margin.left - margin.right,
        height = 530 - margin.top - margin.bottom;

    // *** 縦棒グラフ ********

    var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(10, "");

    var svg = d3.select("body").append("svg")
        .attr("id", "lineGraph")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    x.domain(dataset.map(function (d) { return d.graphKey; }));
    y.domain([0, d3.max(dataset, function (d) { return d.y1Val; })]);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("");

    var barChart = svg.selectAll(".bar")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("fill", function (d) { return d.graphColor; })
        .attr("x", function (d) { return x(d.graphKey); })
        .attr("width", x.rangeBand());

    // アニメーション
    barChart.transition()
        .delay(function (d, i) { return i * 100; })
        .duration(200)
        .attr("y", function (d) { return y(d.y1Val); })
        .attr("height", function (d) { return height - y(d.y1Val); });

    // ツールチップ
    var tooltip = d3.select("body")
        .append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("visibility", "hidden");

    barChart
        .on("mouseover", function () {
            return tooltip.style("visibility", "visible");
        })
        .on("mousemove", function (d) {
            return tooltip
                .style("top", (d3.event.pageY - 10) + "px")
                .style("left", (d3.event.pageX + 10) + "px")
                .html("<span>" + "val1 : " + d.y1Val + "</br>"
                + "val2 : " + d.y2Val + "</span>");
        })
        .on("mouseout", function () {
            return tooltip.style("visibility", "hidden");
        });

    // *** 折れ線グラフ ********

    var yScaleForLine = d3.scale.linear()
        .domain([0, d3.max(dataset, function (d) { return d.y2Val; })])
        .range([height, 0]);

    var yAxisForLine = d3.svg.axis()
        .scale(yScaleForLine)
        .orient("right")
        .ticks(4)
        .innerTickSize(-width)
        .outerTickSize(0)
        .tickPadding(4);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(x);

    svg.append('g')
        .attr("class", "y axis")
        .attr("transform", "translate(" + width + "," + 0 + ")")
        .call(yAxisForLine)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("");

    var line = d3.svg.line()
        .x(function (d) { return x(d.graphKey); })
        .y(function (d) { return yScaleForLine(d.y2Val); });

    var path = svg.append("path")
        .datum(dataset)
        .attr("class", "line")
        .attr("d", line)
        .attr("transform", "translate(" + margin.left + "," + 0 + ")");

    // 以降は、アニメーションのための設定
    var totalLength = path.node().getTotalLength();

    path.attr("stroke-dasharray", totalLength + " " + totalLength)
        .attr("stroke-dashoffset", totalLength)
        .transition()
        .duration(1000) // アニメーション速度
        .ease("linear")
        .attr("stroke-dashoffset", 0);
}