function createData(numPoints) {
  var returningList = []
  for (var i = 0; i < numPoints; i++) {
    returningList.push({
      name: i,
      value: Math.floor((Math.random() * i) + i)
    })
  }
  return returningList
}

var dataset = createData(300);

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
      .html(function(d) { return d.value })
      .direction('n')
      .offset([-10, 0]);

var svg = d3.select("#graph").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            .call(tip);



var xScale = d3.scale.linear()
        .domain([0, d3.max(dataset, function(d){return d.name})])
        .range([0,width]);

var yScale = d3.scale.linear()
        .domain([0, d3.max(dataset, function(d){return d.value})])
        .range([height, 0]);

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