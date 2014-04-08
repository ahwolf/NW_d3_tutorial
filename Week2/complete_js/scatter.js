var dataset = [
    [30, 20],
    [480, 90],
    [250, 50],
    [100, 33],
    [330, 95],
    [410, 12],
    [475, 44],
    [25, 67],
    [85, 21],
    [220, 88]
];


// initializing the svg -- very commmon, use this as a template
var margin = {
    top: 20,
    right: 30,
    bottom: 30,
    left: 40
};

var width = 960 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;

var tip = d3.tip()
      .attr('class', 'd3-tip')
      .html(function(d) { return d })
      .direction('n')
      .offset([-10, 0]);

var svg = d3.select("#graph").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            .call(tip);


var xScale = d3.scale.linear()
        .domain([0, d3.max(dataset, function(d){return d[0]})])
        .range([0,width]);

var yScale = d3.scale.linear()
        .domain([0, d3.max(dataset, function(d){return d[1]})])
        .range([height, 0]);


svg.selectAll("circle")
    .data(dataset)
    .enter().append("circle")
    .attr("cx", function(d){return xScale(d[0])})
    .attr("cy", function(d){return yScale(d[1])})
    .attr("r", function(d){return Math.floor((Math.random()*10)+5);})
    .attr("fill", "red")
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide);

// adding axes
var xAxis = d3.svg.axis()
                  .scale(xScale)
                  .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left");

svg.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

svg.append("g")
      .attr("class", "axis")
      .call(yAxis);


