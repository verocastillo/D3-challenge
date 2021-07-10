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
// Import data from CSV
d3.csv("assets/data/data.csv").then(function (censusData) {
    // Parse the data
    censusData.forEach( function (data) {
        data.poverty = +data.poverty;
        data.age = +data.age;
        data.income = +data.income;
        data.healthcare = +data.healthcare;
        data.obesity = +data.obesity;
        data.smokes = +data.smokes;
    });
    // Add options to button 1
    d3.select("#selectButton1")
      .selectAll('myOptions')
     	.data(xvarOptions)
      .enter()
    	.append('option')
      .text(function (d) { return d; }) // text showed in the menu
      .attr("value", function (d) { return d; })
    // Add options to button 2
    d3.select("#selectButton2")
      .selectAll('myOptions')
     	.data(yvarOptions)
      .enter()
    	.append('option')
      .text(function (d) { return d; }) // text showed in the menu
      .attr("value", function (d) { return d; })
});