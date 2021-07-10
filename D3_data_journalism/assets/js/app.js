// Set dimensions and margins
var svgWidth = 960;
var svgHeight = 600;
var margin = {
    top: 20,
    right: 40,
    bottom: 80,
    left: 50
  };
    var width = svgWidth - margin.left - margin.right;
    var height = svgHeight - margin.top - margin.bottom;
// Create container and append
var svg = d3.select("#scatter")
.append("svg")
.attr("width", svgWidth)
.attr("height", svgHeight);
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);
// Create option lists for buttons
var xvarOptions = ["Poverty", "Age", "Income"]
var yvarOptions = ["Obesity", "Smoking", "Healthcare"]
