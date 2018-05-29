function View2(Observer, varName, fileName) {
	var view2 = {};

	var separations = 30;
	
	var svg = d3.select("#view2_svg"),
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

		// console.log(data)

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


		var tmpMinVal = 999999;
		var tmpMinIdx = -1;
		for (var i = 0; i < data.length; i++) {
			tmpMinVal = 999999;
			for (var j = i; j < data.length; j++) {
				if (data[j][varName] < tmpMinVal) {
					tmpMinIdx = j;
					tmpMinVal = data[j][varName]
				}
			}
			var tmp = data[i];
			data[i] = data[tmpMinIdx];
			data[tmpMinIdx] = tmp;
		}

		console.log(data)

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

		console.log(x.domain())

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
			.attr("class", "bar")
			.attr("x", function(d) { return x(d[varName]); })
			.attr("y", function(d) { return y(d.frequency); })
			.attr("width", x.bandwidth())
			.attr("height", function(d) { return height - y(d.frequency); });
	});

    Observer.addView(view2);
    return view2;

}