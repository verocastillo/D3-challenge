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

// Add options to button 1
d3.select("#selectButton1")
    .selectAll('myOptions')
    .data(xvarOptions)
    .enter()
    .append('option')
    .text(function (d) { return d; }) 
    .attr("value", function (d) { return d; })
// Add options to button 2
d3.select("#selectButton2")
    .selectAll('myOptions')
    .data(yvarOptions)
    .enter()
    .append('option')
    .text(function (d) { return d; })
    .attr("value", function (d) { return d; })

// Functions that turn options into csv variables
function xVarsCsv() {
    var buttonx = d3.select("selectButton1").property("value").text()
    if (buttonx === "Poverty") {
        xAxisSelect === "poverty"
    }
    else if (buttonx === "Age") {
        xAxisSelect === "age"
    }
    else 
        xAxisSelect === "income"
    console.log(xAxisSelect)
}
function yVarsCsv() {
    var buttony = d3.select("selectButton2").property("value")
    if (buttony === "Obesity") {
        yAxisSelect === "obesity"
    }
    else if (buttony === "Smoking") {
        yAxisSelect === "smokes"
    }
    else 
        yAxisSelect === "healthcare"
    console.log(yAxisSelect)
}
// Initial axes
var xAxisSelect = "poverty";
var yAxisSelect = "healthcare";

// Import data from CSV
d3.csv("assets/data/data.csv").then(function (usdata) {
    // Parse the data
    usdata.forEach( function (data) {
        data.poverty = +data.poverty;
        data.age = +data.age;
        data.income = +data.income;
        data.healthcare = +data.healthcare;
        data.obesity = +data.obesity;
        data.smokes = +data.smokes;
    });
    // Create initial scale functions
    var xLinearScale = xScale(usdata, xAxisSelect);
    var yLinearScale = yScale(usdata, yAxisSelect);
    // Create axis function and append
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);
    chartGroup.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(bottomAxis);
    chartGroup.append("g")
    .call(leftAxis);
    // Create circles with text
    var circlesGroup = chartGroup.selectAll("circle")
    .data(usdata)
    .enter()
    .append("circle")
    .classed("circle", true)
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("r", "10")
    .attr("fill", "blue")
    .attr("opacity", ".8");
    var text = chartGroup.append("g").selectAll("text")
    .data(usdata)
    .enter()
    .append("text")
    .classed('text', true)
    .attr("x", d => xLinearScale(d.poverty))
    .attr("y", d => yLinearScale(d.healthcare))
    .text(d => d.abbr)
    .attr("text-anchor", "middle")
    .attr("font-family", "sans-serif")
    .attr("font-size", "10px")
    .attr("fill", "white")
    .attr("font-weight", "700");
    // Create a label group for x and y abels    
    var labelsGroup = chartGroup.append("g")
    .attr("transform", `translate(${width / 2}, ${height + 20 })`);
    // Create x label variable
    var xLabel = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 20)
    .text("In Poverty (%) ")
    .style("font-weight", "bold")
    // Create y label variable
    chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", 0 - (height/2))
    .attr("y", 0 - margin.left)
    .attr("dy", "1em")
    .text("Lacks Healthcare (%)")
    .style("font-weight", "bold")    
    })
    .catch(function(error){
    console.log(error);
    });

// When the buttons are changed, run the update functions
d3.select("#selectButton1").on("change", function(d) {
    var selectedOption = d3.select(this).property("value")
    xVarsCsv(selectedOption)
    })
d3.select("#selectButton2").on("change", function(d) {
    var selectedOption = d3.select(this).property("value")
    yVarsCsv(selectedOption)
    })
