function View4(Observer) {
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
        .rangeRound([height, 0]);

    var colorPlain = ["#bf6c00", "#8b7898", "#889bb5"];
    var colorHighlight = ["#ffa640", "#c7a9f5", "#aaeafc"];

    var deptState = [true, true, true]

    var z = d3.scaleOrdinal()
        .range(colorPlain);
    
    var croppedData4 = new Array();
    for (var i = 0; i < 24; i++) {
        croppedData4.push({"engineering": 0});
    }
    // console.log(croppedData4)

    var legend;
        
    var keys = ["engineering", "finance", "hr"];
    // var keys = ["engineering", "finance", "hr"];

    var tooltip = d3.select("body").append("div")
        .attr("class","tooltip") //用于css设置类样式  
        .attr("opacity",0.0);  

    function clear() {
        svg.selectAll('*').remove();
    }

    function updatebars(){
        clear();
        if (croppedData4.length == 0) {
            return;
        }
        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var tooltip = d3.select("body").append("div")
                    .attr("class","tooltip") //用于css设置类样式  
                    .attr("opacity",0.0); 

        y.domain(d3.extent(croppedData4, function(d) { return 1.1 * Math.max(d.engineering, d.finance, d.hr); }));
        x0.domain(croppedData4.map(function(d) { return d.time; }));
        x1.domain(keys).rangeRound([0, x0.bandwidth()]);

        // console.log(x0.domain())
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
            .attr("fill", function(d) { return z(d.key); })
            .on("mouseover",function(d) {     
                //设置tooltip文字  
                var str = ""
                var dept = ""
                if (d.key == "engineering") {
                    dept = "研发部"
                } else if (d.key == "finance") {
                    dept = "财务部"
                } else {
                    dept = "人力资源部"
                }
                str += "<p>部门: " + dept + "</p>";
                str += "<p>打卡人次: " + d.value + "</p>";
                tooltip.html(str)
                //设置tooltip的位置(left,top 相对于页面的距离)   
                        .style("left",(d3.event.pageX)+"px")  
                        .style("top",(d3.event.pageY+20)+"px")  
                        .style("opacity",1.0); 
            })
            .on("mouseout",function(d) {     
                tooltip.style("opacity",0.0);
            });

        g.append("g")
            .attr("class", "axis")
            .attr("stroke", "#bba")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x0));
        
        if (y.domain()[1] < 10) {
            g.append("g")
            .attr("class", "axis")
            .attr("stroke", "#bba")
            .call(d3.axisLeft(y).ticks(y.domain()[1]))
        } else {
            g.append("g")
                .attr("class", "axis")
                .attr("stroke", "#bba")
                .call(d3.axisLeft(y).ticks(10))
        }

        legend = g.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .attr("fill", "#bba")
            .attr("text-anchor", "end")
            .selectAll("g")
            .data(["研发", 
            "财务", 
            "人事"])
            .enter().append("g")
            .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

        legend.append("rect")
            .attr("x", width - 19)
            .attr("width", 19)
            .attr("height", 19)
            .attr("fill", z);

        legend.append("text")
            .attr("x", width - 24)
            .attr("fill", "#bba")
            .attr("y", 9.5)
            .attr("dy", "0.32em")
            .text(function(d) { return d; });
    }

    var curDay = 1;


    function onCheckChanged(day) {
        curDay = day;
        d3.json("../output_checkin_days.json", function(error, data) {
            if (error) throw error;
            console.log(data)
            
            for (var i=0; i<data[day].length; i++) {
                if (data[day][i]["engineering"] >= croppedData4[i]["engineering"]) {
                    croppedData4[i] = data[day][i];
                    // if (!deptState[0]) {
                    //     croppedData4[i] = 0
                    // }
                }
            }
            updatebars();
        });
    
        d3.json("../output_checkout_days.json", function(error, data) {
            if (error) throw error;
            // console.log(data)
            
            for (var i=0; i<data[day].length; i++) {
                if (data[day][i]["engineering"] >= croppedData4[i]["engineering"]) {
                    croppedData4[i] = data[day][i];
                }
            }
            updatebars();
        });
    }

    onCheckChanged(1);

    document.getElementById('choose_day')
        .addEventListener('change',function(){
            var curr_day = this.value;
            croppedData4 = new Array();
            console.log(croppedData4)
            for (var i = 0; i < 24; i++) {
                croppedData4.push({"engineering": 0});
            }
            console.log(croppedData4)
            onCheckChanged(parseInt(curr_day.slice(8, 10)) - 1)
    });


    // document.getElementById('choose_day')
    //     .addEventListener('change',function(){
    //         curr_day = this.value;

    //         draw_box(curr_day, curr_interval);
    // });
    Observer.addView(view4);	
    return view4;
}
