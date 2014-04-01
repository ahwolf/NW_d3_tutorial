var northwestern = "not in NCAA tournament";
var years = 200;

var days_of_week = ["Monday", "Tuesday", "Wednesday","Thursday", "Friday"];

var day_of_the_week = ["Monday"];
var test = d3.select("#dom").selectAll("p")
    .data(day_of_the_week);

test.enter().append("p")
    .text(function(d,i){
        console.log("what is d?: ", d);
        console.log("what is i?", i);
        return d;
    });

test.exit().remove();


var circle_data = [10,15,20,25,30,35,40];

var circles = d3.select("#visual").select("svg").selectAll("circle")
                .data(circle_data);

var colorMax = d3.max(circle_data);
var colorMin = d3.min(circle_data);
console.log("The max and min are: ", colorMax, colorMin);

var colorExtent = d3.extent(circle_data);
console.log("The min and max are: ", colorExtent);


colorScale = d3.scale.linear()
                    .domain(colorExtent)
                    .range(["rgb(255,0,0)", "rgb(0,0,255)"]);

circles.enter().append("circle")
    .attr("cx", function(d,i){return i*40 + 30})
    .attr("cy", function(d,i){return i*40 + 30})
    .attr("r", function(d){
        return d;
    })
    .attr("fill", function(d){
        return colorScale(d);
    });


var first_object = {
    name: "Aaron",
    age: 33,
    location: "Chicago",
    team: "Michigan"
}

// $(".man_in_front_row").html(first_object.name);

function doSomething(){
    for (var i = 0; i < days_of_week.length; i++){
        console.log("Day of the week is: " + days_of_week[i]);
    }
    console.log("My first object is: ", first_object);

    console.log("My name is ", first_object['name'], " and I am ", first_object.age);
}