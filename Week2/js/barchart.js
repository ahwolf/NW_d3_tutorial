function createData(numPoints) {
  var returningList = []
  for (var i = 0; i < numPoints; i++) {
    returningList.push({
      name: i,
      value: Math.floor((Math.random() * 100) + 1)
    })
  }
  return returningList
}

var dataset = createData(20);
console.log(dataset);
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
  .html(function(d) {
    return d.value;
  })
  .direction('n')
  .offset([-10, 0]);

var svg = d3.select("#graph").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
  .call(tip);


var xScale = d3.scale.ordinal()
  .domain(dataset.map(function(d) {
    return d.name
  }))
  .rangeRoundBands([0,width],.1);

var yScale = d3.scale.linear()
  .domain([0, d3.max(dataset, function(d) {
    return d.value
  })])
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

svg.selectAll("rect")
   .data(dataset)
   .enter().append("rect")
   .attr("x", function(d){return xScale(d.name)})
   .attr("y", function(d){return yScale(d.value)})
   .attr("width", xScale.rangeBand())
   .attr("height", function(d) {
    return height - yScale(d.value);
    })
   .attr("fill", "red")
   .on("mouseover", tip.show)
   .on("mouseout", tip.hide);


function doTransition(){
  var newData = createData(20);

  yScale.domain([0, d3.max(newData, function(d) {
    return d.value
  })])

  var newRGB = randomColor();

  svg.selectAll("rect")
    .data(newData)
    .transition().duration(500)
    .attr("y", function(d){return yScale(d.value)})
    .attr("height", function(d) {
      return height - yScale(d.value);
    })
    .attr("fill", newRGB);
}

function randomColor(){
  var red = Math.floor((Math.random() * 255))
  var green = Math.floor((Math.random() * 255))
  var blue = Math.floor((Math.random() * 255))
  return "rgb(" + red + "," + green + "," + blue + ")";
}



















