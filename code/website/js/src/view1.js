function dateStrToSecs(dateSec) {
	var hour = parseInt(dateSec.slice(0, 2));
	var minute = parseInt(dateSec.slice(3, 5));
	var second = parseInt(dateSec.slice(6, 8));
	return hour * 3600 + minute * 60 + second;
}

function secsTodateStr(secs) {
	var hour = Math.round(secs / 3600).toString();
	var minute = Math.round((secs % 3600) / 60).toString();
	var second = Math.round(secs % 60).toString();
	if (hour.length == 1) {
		hour = "0" + hour;
	}
	if (minute.length == 1) {
		minute = "0" + minute;
	}
	if (second.length == 1) {
		second = "0" + second;
	}
	return hour + ":" + minute + ":" + second;
}

function View1(Observer, varName, fileName) {
	console.log("hah");
	var view1 = {};
	view1.onMessage = function(message, data, from) {
		console.log("view1::onMessage " + message);
		if (message == barMouseoverEvent) {
			highlightBar(data, true);
		} else if (message == barMouseoutEvent) {
			highlightBar(data, false);
		}
	}

	var separations = 30;
	
	var svg = d3.select("#view1_svg"),
    margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom;

	var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
		y = d3.scaleLinear().rangeRound([height, 0]);

	var g = svg.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	
	curDate = "01";

	d3.csv("../data/2017-11-" + curDate + "/" + fileName + ".csv", function(d) {
		d.frequency = +d.frequency;
		return d;
	}, function(error, data) {
		if (error) throw error;

		var tmpData = data;
		data = new Array();
		for (var i = 0; i < tmpData.length; i++) {
			if (tmpData[i][varName] != "0") {
				var curRow = new Object();
				curRow.id = tmpData[i].id
				curRow[varName] = dateStrToSecs(tmpData[i][varName].slice(11, tmpData[i][varName].length))
				data.push(curRow)
			}
		}
		var maxVal = data[data.length - 1][varName];
		var minVal = data[0][varName];
		var delta = (maxVal - minVal) / separations;

		// console.log(data);

		for (var i = 0; i < data.length; i++) {
			data[i][varName] -= minVal;
			data[i][varName] -= (data[i][varName] % delta);
			data[i][varName] += minVal;			
		}

		tmpData = data;
		data = new Array();
		var lastCheckin = 0;
		var curRow = null;		
		for (var i = 0; i < tmpData.length; i++) {
			if (lastCheckin != tmpData[i][varName]) {
				if (curRow != null) {
					data.push(curRow)
				}
				lastCheckin = tmpData[i][varName]
				curRow = new Object();
				curRow[varName] = secsTodateStr(tmpData[i][varName])
				curRow.frequency = 1;
				curRow.ids = new Array();
				curRow.ids.push(tmpData[i].id)
			} else {
				curRow.frequency += 1;
				curRow.ids.push(tmpData[i].id)				
			}
		}
		data.push(curRow)

		console.log(data)

		x.domain(data.map(function(d) { return d[varName]; }));
		y.domain([0, d3.max(data, function(d) { return d.frequency; })]);

		console.log("FUCK")
		g.append("g")
			.attr("class", "axis axis--x")
			.attr("stroke", "#fff")
			.attr("transform", "translate(0," + height + ")")
			.call(d3.axisBottom(x));

		g.append("g")
			.attr("class", "axis axis--y")
			.attr("stroke", "#fff")
			.call(d3.axisLeft(y))
			.append("text")
			.attr("transform", "rotate(-90)")
			.attr("y", 6)
			.attr("dy", "0.71em")
			.attr("text-anchor", "end")
			.text("Frequency");

		g.selectAll(".bar")
			.data(data)
			.enter().append("rect")
			.attr("class", "bar barBase")
			.attr("x", function(d) { return x(d[varName]); })
			.attr("y", function(d) { return y(d.frequency); })
			.attr("width", x.bandwidth())
			.attr("height", function(d) { return height - y(d.frequency); })
			.on("mouseover",function(d) {     
				// tooltip.style("opacity",0.0);
				// dots = svg.selectAll(".dot");
				Observer.fireEvent(barMouseoverEvent, 0, View1);
			})
			.on("mouseout",function(d) {     
				// tooltip.style("opacity",0.0);
				// dots = svg.selectAll(".dot");
				Observer.fireEvent(barMouseoutEvent, 0, View1);
			});
	});

	function selectBars(data, nodeList) {
		console.log(nodeList[0].__data__.ids)
		var res = new Array();
		for (var i = 0; i < nodeList.length; i++) {
			if (nodeList) {

			}
		}
		return res;
	}

	function highlightBar(data, ifHighlight) {
		bars = g.selectAll(".bar");
		var idxs = selectBars(data, bars._groups[0])
		for (var i = 0; i < idxs.length; i++) {
			curBar = bars._groups[0][idxs[i]];
			if (ifHighlight) {
				curBar.setAttribute("class", "bar barSelected");
			} else {
				curBar.setAttribute("class", "bar barBase");
			}
		}
	}

    Observer.addView(view1);
    return view1;

}