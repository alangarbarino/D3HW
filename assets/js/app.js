// set location variables
console.log ("start js")

var chart = d3.select('#scatter');
var margin = { top: 30, right: 50, bottom: 70, left: 70 }
var h = 600 - margin.top - margin.bottom
var w = 600 - margin.left - margin.right

// append SVG
console.log("entering build SVG")
var svg = chart.append('svg')
    .attr('height', h + margin.top + margin.bottom)
    .attr('width', w + margin.left + margin.right)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

// Get and parse source data from csv file
console.log("start get data");

d3.csv("assets/data/data.csv", function (error,data) {
    if (error) throw error;

    data.forEach(function(d) {
        d.poverty = +d.poverty;
        d.age = +d.age;
        d.income = +d.income;
        d.healthcare = +d.healthcare;
        d.obesity = +d.obesity;
        d.smokes = +d.smokes;
    });

    for (i = 0; i < data.length; i++){
        console.log(data[i].obesity);
        console.log(data[i].obesity);
    }    

    console.log("leaving data");

    // Set scales
    var colorScale = d3.schemeCategory20;
    var xScale = d3.scaleLinear()
        .domain([d3.min(data, d => (d.obesity/100 - .05)), d3.max(data, d => (d.obesity/100 + .05))])
            .range([0, w]) ;

    var yScale = d3.scaleLinear()
        .domain([d3.min(data, d => (d.smokes/100 - .05)), d3.max(data, d => (d.smokes/100 + .05))])
            .range([h, 0]) ;

    // set X-axis
    var xAxis = d3.axisBottom()
        .scale(xScale) ; 

    // set y-axis
    var yAxis = d3.axisLeft()
        .scale(yScale) ;

    // Circles
    console.log("entering circles")
    var circles = svg.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', function (d) { return xScale(d.obesity/100)})
        .attr('cy', function (d) { return yScale(d.smokes/100)})
        .attr('r', '18')
        .attr('stroke', 'black')
        .attr('stroke-width', 1)
        .attr('fill', "blue") 
        .attr('opacity', ".5");  
        
    // Add state labels
    svg.selectAll(".label")
        .data(data)    
        .enter()
        .append('text') // popup title?
        .attr("class", "circle_label")
        .text(function (d) {return d.abbr})
        .attr("x", d => xScale(d.obesity/100)-8)
        .attr("y", d => yScale(d.smokes/100)+3)
        .attr("font-size", "10px")
        .attr("fill", "white")
        .style("font-weight", "bold")
        .attr("font_family", "sans-serif");

    // X-axis
    console.log("entering x-axis")

    svg.append('g')
        .attr('class', 'xAxisClass')
        .attr('transform', 'translate(0,' + h + ')')
        .call(xAxis)
     .append('text')    // Consolidated axis/Label code
        .attr('class', 'xAxis_label')
        .style('text-anchor', 'middle') 
        .attr("transform","translate(" + (h/2) + " ," + (margin.left - 25) + ")")
        .attr('fill', 'black')
        .attr('font-weight', 16)
        .text('(%) Population Obese');

    // Y-axis
    console.log("entering y-axis")

    svg.append('g')
        .attr('class', 'yAxisClass')
        .call(yAxis);

    // Y-axis label
    svg.append("text") //Independant axis/label code
        .style("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left - 3)
        .attr("x",0 - (h / 2))
        .attr("dy", "1em")
        .attr("class", "yAxis_label")
        .attr("fill", "black")
        .text('(%) Population Smoke');   
});
