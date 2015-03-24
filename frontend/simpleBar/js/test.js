window.onload = function(){
    console.log("ok");
    var data = d3.range(10).map(function(i) {
      return {x: i / 9, y: (Math.sin(i * 2) + 1) / 2};
    });

    w = 960,
        h = 500,
        p = 100,
        x = d3.scale.linear().domain([0, 1]).range([p, w - p]),
        y = d3.scale.linear().domain([0, 1]).range([h - p, p]);

    var line = d3.svg.line()
        .interpolate("cardinal")
        .x(function(d) { return x(d.x); })
        .y(function(d) { return y(d.y); });

    var vis = d3.select("body").append("svg:svg")
        .attr("width", w)
        .attr("height", h)
      .append("svg:g");

    var rules = vis.selectAll("g.rule")
        .data(x.ticks(10))
      .enter().append("svg:g")
        .attr("class", "rule");

    rules.append("svg:line")
        .attr("x1", x)
        .attr("x2", x)
        .attr("y1", p)
        .attr("y2", h - p -1 );

    rules.append("svg:line")
        .attr("class", function(d) { return d ? null : "axis"; })
        .attr("y1", y)
        .attr("y2", y)
        .attr("x1", p)
        .attr("x2", w - p +1);

    rules.append("svg:text")
        .attr("x", x)
        .attr("y", h - p + 3)
        .attr("dy", ".71em")
        .attr("text-anchor", "middle")
        .text(x.tickFormat(10));

    rules.append("svg:text")
        .attr("y", y)
        .attr("x", p - 3)
        .attr("dy", ".35em")
        .attr("text-anchor", "end")
        .text(y.tickFormat(10));

    vis.selectAll("path")
        .data([0, 0.2, 0.4, 0.6, 0.8, 1])
      .enter().append("svg:path")
        .attr("d", function(d) { return line.tension(d)(data); })
        .style("stroke", d3.interpolateRgb("brown", "steelblue"));

    vis.selectAll("circle")
        .data(data)
      .enter().append("svg:circle")
        .attr("cx", function(d) { return x(d.x); })
        .attr("cy", function(d) { return y(d.y); })
        .attr("r", 4.5);
};