// replace "toner" here with "terrain" or "watercolor"
var layer = new L.StamenTileLayer("toner");
var lat = 41.88362062793376,
    lon = -87.64411926269531; // the coordinates of Chicago

var map = new L.Map("map", {
    center: new L.LatLng(lat, lon),
    zoom: 12,
    minZoom: 12,
    maxZoom: 15,
});

map.addLayer(layer);

var svg = d3.select(map.getPanes().overlayPane).append("svg"),
    g = svg.append("g").attr("class", "leaflet-zoom-hide");

// These are transformation functions for d3, that allow my lat long
// data to interface with leaflet
function projectPoint(x, y) {
    var point = map.latLngToLayerPoint(new L.LatLng(y, x));
    this.stream.point(point.x, point.y);
}

var transform = d3.geo.transform({
    point: projectPoint
});

var path = d3.geo.path().projection(transform);


//    .clipExtent([[-87.5706023,41.7041652],[-87.7072447,41.9382713]]);

d3.csv("data/Station_Data.csv", function(data) {
    

    map.on("viewreset", reset);
    reset();


    function reset() {
        var bounds = path.bounds(geo_json);
        var topLeft = bounds[0];
        var bottomRight = bounds[1];

        svg.style("width", bottomRight[0] - topLeft[0] + "px")
            .style("height", bottomRight[1] - topLeft[1] + "px")
            .style("left", topLeft[0] + "px")
            .style("top", topLeft[1] + "px")

        g.attr("transform",
            "translate(" + -topLeft[0] + "," + -topLeft[1] + ")");

        feature.attr("d", path);
    };
});




// converts our voronoi polygon into a geoJSON
function polygon2geoJsonFeature(polygon) {
    polygon.push(polygon[0]) // geo_json polygons need to start and
    // stop at the same point
    return {
        "type": "Feature",
        "properties": {
            "name": polygon.point.name,
            "outCounts": $.parseJSON(polygon.point.outCounts),
        },
        "geometry": {
            "type": "Polygon",
            "coordinates": [polygon]
        }
    };
}