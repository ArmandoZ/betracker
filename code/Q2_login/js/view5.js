// This is the view of the nation data
function View5(Observer) {
    var view5 = {};

    var $bmDiv=$("#bottom-age-div");
    var svgwidth=$bmDiv.width();
    var svgheight=$bmDiv.height();
    var margin = {top: 20, right: 80, bottom: 30, left: 80};
    var width = svgwidth - margin.left - margin.right;
    var height = svgheight - margin.top - margin.bottom;

    var svg=d3.select("#view5")
            .append("svg")
            .attr("width", svgwidth)
            .attr("height", svgheight);

    var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
    var y = d3.scaleLinear().rangeRound([height, 0]);

    var xAxis=d3.axisBottom(x);
    var yAxis=d3.axisLeft(y).ticks(10, "d");

    var xAxisg=g.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + height + ")");
    var yAxisg=g.append("g")
            .attr("class", "axis axis--y");

    var transition = d3.transition()
        .duration(750)
        .ease(d3.easeLinear);

    var addcnt=0;
    var detail = 0;

    d3.csv("data/Assignment3-hotel.csv", function(d) {
        return d;
    },function(error, data) {
        if (error) throw error;

        console.log(data);

        function updatebars(){
            // update the bars for people under 20
            bars_1.transition(transition).delay(function(d, i) { return i * 30; })
                .attr("x", function(d) { return x(d.month); })
            bars_1.attr("y", function(d) { return y(d.u20); })
                .attr("width", x.bandwidth())
                .attr("height", function(d) { return height - y(d.u20); })
                .attr("fill","rgb(230,20,0)")
                .on("click",function(d,i){
                    if (detail == 0){
                    bars_1.attr("fill","rgb(230,20,0)");
                    bars_2.transition()
                        .duration(500).attr("fill", "#FFFACD");
                    bars_3.transition()
                        .duration(500).attr("fill", "#FFFACD");
                    bars_4.transition()
                        .duration(500).attr("fill", "#FFFACD");
                    detail = 1;
                    }
                    // $(this).attr("fill","#B2DFEE");
                    Observer.fireEvent("selectbar",[d,i],View5);
                });

            // update the bars for people from 20 to 35
            bars_2.transition(transition).delay(function(d, i) { return i * 30; })
                .attr("x", function(d) { return x(d.month); })
            bars_2.attr("y", function(d) { return y(String(parseInt(d.u20) + parseInt(d.f20to35))); })
                .attr("width", x.bandwidth())
                .attr("height", function(d) { return y(d.u20) - y(String(parseInt(d.u20)
                    + parseInt(d.f20to35))); })
                .attr("fill", "rgb(255,70,0)")
                .on("click",function(d,i){
                    if (detail == 0){
                    bars_1.transition()
                        .duration(500).attr("fill","#FFFACD");
                    bars_2.attr("fill", "rgb(255,70,0)")
                        .transition()
                        .duration(1000)
                        .attr("y", function(d) { return y(d.f20to35); })
                        .attr("height", function(d) { return height - y(d.f20to35) });
                    bars_3.transition()
                        .duration(500).attr("fill", "#FFFACD");
                    bars_4.transition()
                        .duration(500).attr("fill", "#FFFACD");

                    detail = 1;
                    }
                    // $(this).attr("fill","#B2DFEE");
                    Observer.fireEvent("selectbar",[d,i],View5);
                })

            //update the bars for people from 35 to 55
            bars_3.transition(transition).delay(function(d, i) { return i * 30; })
                .attr("x", function(d) { return x(d.month); })
            bars_3.attr("y", function(d) { return y(String(parseInt(d.u20)
                        + parseInt(d.f20to35) + parseInt(d.f35to55))); })
                .attr("width", x.bandwidth())
                .attr("height", function(d) { return y(String(parseInt(d.u20) + parseInt(d.f20to35)))
                    - y(String(parseInt(d.u20) + parseInt(d.f20to35) + parseInt(d.f35to55))); })
                .attr("fill", "rgb(255,160,0)")
                .on("click",function(d,i){
                    if (detail == 0){
                    bars_1.transition()
                        .duration(500).attr("fill","#FFFACD");
                    bars_2.transition()
                        .duration(500).attr("fill", "#FFFACD");
                    bars_3.transition()
                        .duration(1000).attr("fill", "rgb(255,160,0)")
                        .attr("y", function(d) { return y(d.f35to55); })
                        .attr("height", function(d) { return height - y(d.f35to55) });
                    bars_4.transition()
                        .duration(500).attr("fill", "#FFFACD");
                    detail = 1;
                    }
                    // $(this).attr("fill","#B2DFEE");
                    Observer.fireEvent("selectbar",[d,i],View5);
                })

            //update the bars for people more than 55
            bars_4.transition(transition).delay(function(d, i) { return i * 30; })
                .attr("x", function(d) { return x(d.month); })
            bars_4.attr("y", function(d) { return y(String(parseInt(d.u20)
                        + parseInt(d.f20to35) + parseInt(d.f35to55) + parseInt(d.m55))); })
                .attr("width", x.bandwidth())
                .attr("height", function(d) { return y(String(parseInt(d.u20) + parseInt(d.f20to35) + parseInt(d.f35to55)))
                    - y(String(parseInt(d.u20) + parseInt(d.f20to35) + parseInt(d.f35to55) + parseInt(d.m55))); })
                .attr("fill", "rgb(220,190,0)")
                .on("click",function(d,i){
                    if (detail == 0){
                    bars_1.transition()
                        .duration(500).attr("fill","#FFFACD");
                    bars_2.transition()
                        .duration(500).attr("fill", "#FFFACD");
                    bars_3.transition()
                        .duration(500).attr("fill", "#FFFACD");
                    bars_4.transition()
                        .duration(1000).attr("fill", "rgb(220,190,0)")
                        .attr("y", function(d) { return y(d.m55); })
                        .attr("height", function(d) { return height - y(d.m55) });
                    detail = 1;
                    }
                    // $(this).attr("fill","#B2DFEE");
                    Observer.fireEvent("selectbar",[d,i],View5);
                })

        }

        x.domain(data.map(function(d) { return d.month; }));
        y.domain([0, 100]);

        xAxisg.call(xAxis);

        yAxisg.call(yAxis)
            .append("text")
            .attr("transform", "translate(35,-23)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end")
            .text("客户年龄(%)")
            .style("font-family", "楷体");


        var bars_1 = g.append("g")
            .selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar");
        bars_1.append("title")
            .text(function(d,i) {
                return "under 20: " + d.u20 + "%";
            })

        var bars_2 = g.append("g")
            .selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar");
        bars_2.append("title")
            .text(function(d,i) {
                return "from 20 to 35: " + d.f20to35 + "%";
            })

        var bars_3 = g.append("g")
            .selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar");
        bars_3.append("title")
            .text(function(d,i) {
                return "from 35 to 55: " + d.f35to55 + "%";
            })

        var bars_4 = g.append("g")
            .selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar");
        bars_4.append("title")
            .text(function(d,i) {
                return "more than 55: " + d.m55 + "%";
            })

        updatebars();

        // recover the overview
        $("#plusbtn_5").on("click", function(d) {
            detail = 0;
            updatebars();
        })

        $("#u20").on("click", function(d) {
            if (1){
                updatebars();
                bars_1.attr("fill","rgb(230,20,0)");
                bars_2.transition()
                    .duration(500).attr("fill", "#FFFACD");
                bars_3.transition()
                    .duration(500).attr("fill", "#FFFACD");
                bars_4.transition()
                    .duration(500).attr("fill", "#FFFACD");
                detail = 1;
            }
        })

        $("#20-35").on("click", function(d) {
            if (1){
                updatebars();
                bars_1.transition()
                    .duration(500).attr("fill","#FFFACD");
                bars_2.attr("fill", "rgb(255,70,0)")
                    .transition()
                    .duration(1000)
                    .attr("y", function(d) { return y(d.f20to35); })
                    .attr("height", function(d) { return height - y(d.f20to35) });
                bars_3.transition()
                    .duration(500).attr("fill", "#FFFACD");
                bars_4.transition()
                    .duration(500).attr("fill", "#FFFACD");
                detail = 1;
            }
        })

        $("#35-55").on("click", function(d) {
            if (1){
                updatebars();
                bars_1.transition()
                    .duration(500).attr("fill","#FFFACD");
                bars_2.transition()
                    .duration(500).attr("fill", "#FFFACD");
                bars_3.transition()
                    .duration(1000).attr("fill", "rgb(255,160,0)")
                    .attr("y", function(d) { return y(d.f35to55); })
                    .attr("height", function(d) { return height - y(d.f35to55) });
                bars_4.transition()
                    .duration(500).attr("fill", "#FFFACD");
                detail = 1;
            }
        })

        $("#m55").on("click", function(d) {
            if (1){
                updatebars();
                bars_1.transition()
                    .duration(500).attr("fill","#FFFACD");
                bars_2.transition()
                    .duration(500).attr("fill", "#FFFACD");
                bars_3.transition()
                    .duration(500).attr("fill", "#FFFACD");
                bars_4.transition()
                    .duration(1000).attr("fill", "rgb(220,190,0)")
                    .attr("y", function(d) { return y(d.m55); })
                    .attr("height", function(d) { return height - y(d.m55) });
                detail = 1;
            }
        })

    });

    Observer.addView(view5);
    return view5;

}
