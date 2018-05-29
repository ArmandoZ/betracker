function View4() {
    var view4 = {};

    var svg = d3.select("#view4_svg"),
    margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom;

    var g;

    var x0 = d3.scaleBand()
        .rangeRound([0, width])
        .paddingInner(0.1);

    var x1 = d3.scaleBand()
        .padding(0.05);

    var y = d3.scaleLinear()
        .domain([0,1]) 
        .rangeRound([height, 0]);

    var colorPlain = ["#bf6c00", "#8b7898", "#889bb5"];
    var colorHighlight = ["#ffa640", "#c7a9f5", "#aaeafc"];

    var z = d3.scaleOrdinal()
        .range(colorPlain);

    d3.json("../output_checkin.json", function(error, data) {
        if (error) throw error;
        console.log(data)
        croppedData4 = new Array();
		for (var i=1; i<data.length; i++) {
			croppedData4.push(data[i]);
        }

        console.log(croppedData4)
        
        var legend;
        
        var keys = ["engineering", "finance", "hr"];

        function updatebars(){
            if (croppedData4.length == 0) {
                return;
            }
            g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            var tooltip = d3.select("body").append("div")
                        .attr("class","tooltip") //用于css设置类样式  
                        .attr("opacity",0.0); 

            x0.domain(croppedData4.map(function(d) { return d.time; }));
            x1.domain(keys).rangeRound([0, x0.bandwidth()]);

            console.log(x0.domain())
            g.append("g")
                .selectAll("g")
                .data(croppedData4)
                .enter().append("g")
                .attr("transform", function(d) { return "translate(" + x0(d.time) + ",0)"; })
                .selectAll("rect")
                .data(function(d) { return keys.map(function(key) { return {key: key, value: d[key]}; }); })
                .enter().append("rect")
                .attr("x", function(d) { return x1(d.key); })
                .attr("y", function(d) { return y(d.value); })
                .attr("width", x1.bandwidth())
                .attr("height", function(d) { return height - y(d.value); })
                .attr("fill", function(d) { return z(d.key); });

            g.append("g")
                .attr("class", "axis")
                .attr("stroke", "#fff")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x0));

            g.append("g")
                .attr("class", "axis")
                .attr("stroke", "#fff")
                .call(d3.axisLeft(y).ticks(null, "%"))

            legend = g.append("g")
                .attr("font-family", "sans-serif")
                .attr("font-size", 10)
                .attr("fill", "#fff")
                .attr("text-anchor", "end")
                .selectAll("g")
                .data(["研发-平均 " + data[0].eng_mean, "财务-平均 " + data[0].finance_mean, "人事-平均 " + data[0].hr_mean])
                .enter().append("g")
                .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

            legend.append("rect")
                .attr("x", width - 19)
                .attr("width", 19)
                .attr("height", 19)
                .attr("fill", z);

            legend.append("text")
                .attr("x", width - 24)
                .attr("fill", "#fff")
                .attr("y", 9.5)
                .attr("dy", "0.32em")
                .text(function(d) { return d; });
        }


        updatebars();
    });
	
    return view4;
}

view4 = new View4();