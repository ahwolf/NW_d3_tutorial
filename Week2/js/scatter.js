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


var svg = d3.select("#graph").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");