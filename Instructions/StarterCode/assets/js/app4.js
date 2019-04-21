// set up SVG chart

var svgWidth = 900;

var svgHeight = 500;



// create margins 

var margin = {

    top: 20,

    right: 40,

    bottom: 60,

    left: 50

};

var width = svgWidth - margin.left - margin.right;

var height = svgHeight - margin.top - margin.bottom;



// create an SVG wrapper

// append svg group 

// shift by left and top margins

var svg = d3.select("#scatter")

    .append("svg")

    .attr("width", svgWidth)

    .attr("height", svgHeight);



var chartGroup = svg.append("g")

    .attr("transform", `translate(${margin.left}, ${margin.top})`);



// import CSV data

d3.csv("assets/data/data.csv")

    .then(function(censusData) {



    // parse data/cast as numbers

    censusData.forEach(function(data) {

        data.healthcare = +data.healthcare;

        data.poverty = +data.poverty;

    });



    // create scale functions

    var xLinearScale = d3.scaleLinear()

        .domain([8, d3.max(censusData, d => d.poverty)])

        .range([0, width]);



    var yLinearScale = d3.scaleLinear()

        .domain([0, d3.max(censusData, d => d.healthcare)])

        .range([height, 0]);



    // create axis functions

    var bottomAxis = d3.axisBottom(xLinearScale);

    var leftAxis = d3.axisLeft(yLinearScale);



    //append them to the chart

    chartGroup.append("g")

        .attr("transform", `translate(0, ${height})`)

        .call(bottomAxis);



    chartGroup.append("g")

        .call(leftAxis);



    // create circles

    var circlesGroup = chartGroup.selectAll("circle")

        .data(censusData)

        .enter()

        .append("circle")

        .attr("cx", d => xLinearScale(d.poverty))

        .attr("cy", d => yLinearScale(d.healthcare))

        .attr("r", "10")

        .attr("fill", "lightblue")

        .attr("opacity", ".5")



    //append US state labels to each data point

    chartGroup.selectAll(".label")

        .data(censusData)

        .enter()

        .append("text")

        .attr("class", "label")

        .text(function(d) {

            return d.abbr;

        })

        .attr("x", d => xLinearScale(d.poverty) - 7)

        .attr("y", d => yLinearScale(d.healthcare) + 3)

        .attr("font-size", "10px")

        .attr("fill", "white")

        .style("font-weight", "bold")

        .attr("font_family",  + "sans-serif");



    //create axes labels

    chartGroup.append("text")

        .attr("transform", "rotate(-90)")

        .attr("y", 0 - margin.left + 15)

        .attr("x", 0 - (height / 1.5))

        .attr("class", "axisText")

        .text("Lacks Healthcare (%)");



    chartGroup.append("text")

        .attr("transform", `translate(${width / 2}, ${height + margin.top + 25})`)

        .attr("class", "axisText")

        .text("In Poverty (%)");



});