function View2(Observer) {
    var view2 = {};

	view2.onMessage = function(message, data, from) {
        console.log("view2::onMessage " + message);
        if (message == "onUserCheckChanged") {
            onCheckChanged(data);
        }
	}

    var curData;
    var svg;
    var parseTime = d3.timeParse("%H:%M:%S");

	function clearView() {
		d3.select('#view2_svg')
		.selectAll('*')
		.remove(); 
	}

	function drawView(userId) {
        // console.log(curData)
        svg = d3.select("#view2_svg"),
        margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom,
        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        
        var x = d3.scaleLinear()
            .rangeRound([0, width]);
        
        var y = d3.scaleTime()
            .rangeRound([height, 0]);
        
        var line = d3.line()
            .x(function(d) { return x(d.date); })
            .y(function(d) { return y(d.time); });
    
        x.domain([1, 31]);
        y.domain(d3.extent(curData, function(d) { return d.time; }));

        // console.log(y.domain());

        var xAxis = d3.axisBottom(x);
        
        var yAxis = d3.axisLeft(y);
      
        g.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .attr("stroke", "#fff")
            .style("font-size", "14px")
            .append("text")
            .attr("fill", "#fff")
            .attr("transform", "translate(" + width / 2 + ", -180)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end")
            .text("" + userId)
          .select(".domain")
            .remove();
      
        g.append("g")
            .call(yAxis)
            .attr("stroke", "#fff")
            .style("font-size", "8px");
      
        g.append("path")
            .datum(curData)
            .attr("fill", "none")
            .attr("stroke", "#00CED1")
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 1.5)
            .attr("d", line);
	}

	function reloadView(userId) {
		clearView();
		drawView(userId);
    }

    function onCheckChanged(userId) {
        d3.json("../output_person_checking.json", function(error, data) {
            if (error) throw error;
            // console.log(data)
            curData = new Array();
            var idx = -1;
            for (var i = 0; i < data.length; i++) {
                if (data[i].id == userId) {
                    idx = i;
                    break;
                }
            }
            if (idx == -1) return;
            var checkinList = data[i].checkin;
            for (var i = 0; i < checkinList.length; i++) {
                curRow = new Object();
                curRow["date"] = i + 1;
                if (checkinList[i] == '0') {
                    continue  
                } else {
                    curRow["time"] = parseTime(checkinList[i]);
                }
                curData.push(curRow);
            }
            reloadView(userId)            
        });
    }

    onCheckChanged(1149)
    Observer.addView(view2);
    return view2;
}
