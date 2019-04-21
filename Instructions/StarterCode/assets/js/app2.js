    // set location variables
    console.log ("start js")
    
    var svgHeight = 800 ;
    var svgWidth = 800 ;

    var margin = { top: 50, right: 50, bottom: 50, left: 50 }
    var h = svgHeight - margin.top - margin.bottom
    var w = svgWidth - margin.left - margin.right
    // var formatPercent = d3.format('.2%')

    // append SVG
    console.log("entering build SVG")

    var svg = d3.select('#scatter')
        .append("svg")
        .attr('height', svgHeight)
        .attr('width', svgWidth)    

    var chart = svg.append('g')
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
    //  .tickFormat(formatPercent)
    //   .ticks(5)
    //   .orient('bottom')   

    // set y-axis
    var yAxis = d3.axisLeft()
        .scale(yScale) ;
    //  .tickFormat(formatPercent)
    //   .ticks(5)
    //   .orient('left')

    // X-axis
    console.log("entering x-axis")

    chart.append('g')
        .attr('class', 'xAxisClass')
        .attr('transform', 'translate(0,' + h + ')')
        .call(xAxis)
     .append('text') // X-axis Label
        .attr('class', 'xAxis_label')
        .style('text-anchor', 'middle') 
        .attr("transform","translate(" + (width/2) + " ," + (height + margin.top + 20) + ")")
        //.attr("transform", "translate(" + (width / 2) + " ," + (height - margin.bottom) + ")") 
        // .attr('y', 200)
        // .attr('x', w/2)
        .attr('fill', 'black')
        .attr('font-weight', 16)
        // .attr('dy', '.71em')
        .text('(%) Population Obese');

    // X-axis label
    // svg.append("text")             
    //   //.attr("transform","translate(" + (width/2) + " ," + (height + margin.top + 20) + ")")
    //   .style("text-anchor", "middle")
    //   .attr("transform", "translate("+ (width/2) +","+(height-(padding/3))+")") 
    //   .attr("class", "xAxis_label")
    //   .attr("fill", "black")
    //   .text('(%) Population Obese');

    // Add X-axis label
    // svg.selectAll(xAxis)
    //     .append("text")
    //     .attr("transform", `translate(${w / 2}, ${h + 50 + 25})`)
    //     // .attr("transform", `translate(-100` + w +`)`)
    //     .attr("class", "xAxis_label")
    //     .attr("fill", "black")
    //     .attr('font', 'black')
    //     .attr('font-weight')
    //     .text("(%) Population Obese")

    // Y-axis
    console.log("entering y-axis")

    chart.append('g')
        .attr('class', 'yAxisClass')
        .call(yAxis)
    //   .append('text') // y-axis Label
    //     .attr('class', 'yaxis_label')
    //     .attr('transform', 'rotate(-90)')
    //     .attr('x', 0 - (h / 1.5))
    //     .attr('y', 0 - margin.left + 15)
    //     // .attr('dy', '.71em')
    //     // .style('text-anchor', 'end')
    //     .text('(%) Population Smoke')

    // Y-axis label
    chart.append("text")
        .style("text-anchor", "middle")
        .attr("class", "yAxis_label")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 15)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .attr("fill", "black")
        .text('(%) Population Smoke');   

   // Circles
   console.log("entering circles")
   var circles = chart.selectAll('circle')
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
   chart.selectAll(".label")
       .data(data)    
       .enter()
       .append('text') // data point titles
       .attr("class", "circle_label")
       .text(function (d) {return d.abbr})
       .attr("x", d => xScale(d.obesity/100)-8)
       .attr("y", d => yScale(d.smokes/100)+3)
       .attr("font-size", "10px")
       .attr("fill", "white")
       .style("font-weight", "bold")
       .attr("font_family", "sans-serif");

});

       // .on('mouseover', function () {
        //     d3.select(this)
        //         .transition()
        //         .duration(500)
        //         .attr('r', 20)
        //         .attr('stroke-width', 3)
        // })
        // .on('mouseout', function () {
        //     d3.select(this)
        //         .transition()
        //         .duration(500)
        //         .attr('r', 10)
        //         .attr('stroke-width', 1)
        // })