// Set dimensions and margins
var svgWidth = 960;
var svgHeight = 700;
var margin = {
 top: 20,
 right: 40,
 bottom: 100,
 left: 110
}
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

function chart1(){
// Create SVG, axes and append
var svg = d3.select("#scatter1")
 .append("svg")
 .attr("width", svgWidth)
 .attr("height", svgHeight);
var chartGroup = svg.append("g")
 .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Import csv
    d3.csv("assets/data/data.csv").then(function(USdata) {

    // X and Y values
    var selectedX = "poverty";
    var selectedY = "healthcare";
 
    // Parse data
    USdata.forEach(function(data) {
      data.poverty = +data.poverty;
      data.healthcare = +data.healthcare;
      data.age = +data.age;
      data.income = +data.income;
      data.obesity = +data.obesity;
      data.smokes = +data.smokes;
    });
  
     // Scaling
     var xLinearScale = funcXscale(USdata, selectedX);
     var yLinearScale = funcYscale(USdata, selectedY);
  
     // Axis and appending axes
     var bottomAxis = d3.axisBottom(xLinearScale);
     var leftAxis = d3.axisLeft(yLinearScale);
     var xAxis = chartGroup.append("g")
     .classed("x-axis", true)
     .attr("transform", `translate(0, ${height})`)
     .call(bottomAxis);
     var yAxis = chartGroup.append("g")
     .call(leftAxis);
  
    // Circles and text
    var circleGroup = chartGroup.selectAll("circle")
    .data(USdata)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d[selectedX]))
    .attr("cy", d => yLinearScale(d[selectedY]))
    .attr("r", "10")
    .attr("fill", "blue")
    .attr("opacity", ".88");
    var statesGroup = chartGroup.append("g").selectAll("text")
    .data(USdata)
    .enter()
    .append("text")
    .text(d => d.abbr)
    .attr("x", d => xLinearScale(d[selectedX]))
    .attr("y", d => yLinearScale(d[selectedY]))
    .attr("dy", ".4em")
    .attr("fill", "white")
    .attr("text-anchor", "middle")  
    .style("font-size", "10px")
    .style("font-weight", "bold");
  
  
    // X labels
     var xLabelsGroup = chartGroup.append("g")
     .attr("transform", `translate(${width / 2}, ${height + 25})`);
     var xLabel = xLabelsGroup.append("text")
     .attr("x", 0)
     .attr("y", 25)
     .attr("value", "poverty")
     .classed("active", true)
     .text("People Living In Poverty (%)");
   
     // Create group for y-axis labels
     var yLabelsGroup = chartGroup.append("g")
     var yLabel = yLabelsGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left+45)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .attr("value", "healthcare")
    .classed("active", true)
    .text("Lack of Access to Healthcare (%)");
 });
}

function chart2() {
// Create SVG, axes and append
var svg = d3.select("#scatter2")
.append("svg")
.attr("width", svgWidth)
.attr("height", svgHeight);
var chartGroup = svg.append("g")
.attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Import csv
    d3.csv("assets/data/data.csv").then(function(USdata) {

    // X and Y values
    var selectedX = "income";
    var selectedY = "obesity";
 
    // Parse data
    USdata.forEach(function(data) {
      data.poverty = +data.poverty;
      data.healthcare = +data.healthcare;
      data.age = +data.age;
      data.income = +data.income;
      data.obesity = +data.obesity;
      data.smokes = +data.smokes;
    });
  
     // Scaling
     var xLinearScale = funcXscale(USdata, selectedX);
     var yLinearScale = funcYscale(USdata, selectedY);
  
     // Axis and appending axes
     var bottomAxis = d3.axisBottom(xLinearScale);
     var leftAxis = d3.axisLeft(yLinearScale);
     var xAxis = chartGroup.append("g")
     .classed("x-axis", true)
     .attr("transform", `translate(0, ${height})`)
     .call(bottomAxis);
     var yAxis = chartGroup.append("g")
     .call(leftAxis);
  
    // Circles and text
    var circleGroup = chartGroup.selectAll("circle")
    .data(USdata)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d[selectedX]))
    .attr("cy", d => yLinearScale(d[selectedY]))
    .attr("r", "10")
    .attr("fill", "blue")
    .attr("opacity", ".88");
    var statesGroup = chartGroup.append("g").selectAll("text")
    .data(USdata)
    .enter()
    .append("text")
    .text(d => d.abbr)
    .attr("x", d => xLinearScale(d[selectedX]))
    .attr("y", d => yLinearScale(d[selectedY]))
    .attr("dy", ".4em")
    .attr("fill", "white")
    .attr("text-anchor", "middle")  
    .style("font-size", "10px")
    .style("font-weight", "bold");
  
  
    // X labels
     var xLabelsGroup = chartGroup.append("g")
     .attr("transform", `translate(${width / 2}, ${height + 25})`);
     var xLabel = xLabelsGroup.append("text")
     .attr("x", 0)
     .attr("y", 25)
     .attr("value", "poverty")
     .classed("active", true)
     .text("Household Income (Median)");
   
     // Create group for y-axis labels
     var yLabelsGroup = chartGroup.append("g")
     var yLabel = yLabelsGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left+45)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .attr("value", "healthcare")
    .classed("active", true)
    .text("People With Obesity (%)");
 });
}

 // Scaling functions
 function funcXscale(USdata, selectedX) {
    var xLinearScale = d3.scaleLinear()
      .domain([d3.min(USdata, d => d[selectedX]) * 0.90,
        d3.max(USdata, d => d[selectedX]) * 1])
      .range([0, width]);
    return xLinearScale;
   }
   function funcYscale(USdata, selectedY) {
    var yLinearScale = d3.scaleLinear()
      .domain([d3.min(USdata, d => d[selectedY]) * 0.85,
        d3.max(USdata, d => d[selectedY]) * 1])
      .range([height, 0]);
    return yLinearScale;
   }

chart1()
chart2()