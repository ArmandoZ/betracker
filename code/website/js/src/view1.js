function View1(Observer) {
	var view1 = {};
	
	var svg = d3.select("#view1_svg"),
    margin = {top: 20, right: 60, bottom: 30, left: 40},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom;
    var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	var x = d3.scaleBand()
		.rangeRound([0, width])
		.padding(0.1)
		.align(0.1);

	var y = d3.scaleLinear()
		.rangeRound([height, 0]);
	
	var colorPlain = ["#889bb5", "#8b7898", "#a05d56","#bf6c00"];
	var colorHighlight = ["#aaeafc", "#c7a9f5", "#ff877e","#ffa640"];

	var z = d3.scaleOrdinal()
	.range(colorPlain);

	var stack = d3.stack()
		.offset(d3.stackOffsetExpand);

	d3.csv("../data/data.csv", type, function(error, data) {
		if (error) throw error;

		croppedData1 = new Array();
		conventionDataOrg1 = new Array();
		for (var i=0; i<data.length; i++) {
			var curRow = new Object();
			curRow.month = parseInt(data[i].month);
			curRow["u20"] = data[i]["u20"];
			curRow["20to35"] = data[i]["20to35"];
			curRow["35to55"] = data[i]["35to55"];
			curRow["m55"] = data[i]["m55"];
			conventionDataOrg1.push(data[i]["conventions"] == 1);
			croppedData1.push(curRow);
		}

		conventionData1 = $.extend(true, [], conventionDataOrg1);

		croppedData1.sort(function(a, b) { return a.month - b.month; });
		croppedDataOrg1 = $.extend(true, [], croppedData1);

		var serie;
		var rect;
		var legend;
		var highlightBars1 = false;

		var zDomain = ["u20", "20to35", "35to55", "m55"];
		z.domain(zDomain);

		function updatebars(){
			if (croppedData1.length == 0) {
				return;
			}
			g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

			var xAxisg=g.append("g")
				.attr("class", "axis axis--x")
				.attr("stroke", "#fff")
				.attr("transform", "translate(0," + height + ")");
			var yAxisg=g.append("g")
				.attr("stroke", "#fff")
				.attr("class", "axis axis--y");	

			yAxisg.call(d3.axisLeft(y).ticks(10, "%"));

			serie = g.selectAll(".serie")
				.data(stack.keys(zDomain)(croppedData1))
				.enter().append("g");

			x.domain(croppedData1.map(function(d) { return d.month; }));
			xAxisg.call(d3.axisBottom(x));
			
			serie.attr("class", "serie")
				.attr("fill", function(d) { return z(d.key); });

			rects = serie.selectAll("rect");

			rectUpdate = rects.data(function(d) { return d; });
			exit = rectUpdate.exit();
			rect = rectUpdate.enter();

			exit.remove();

			var tooltip = d3.select("body").append("div")
                        .attr("class","tooltip") //用于css设置类样式  
                        .attr("opacity",0.0);  

			rectUpdate.attr("x", function(d) { return x(d.data.month); })
				.attr("y", function(d) { return y(d[1]); })
				.attr("height", function(d) { return y(d[0]) - y(d[1]); })
				.attr("width", x.bandwidth());
			
			rect.append("rect")
			    .attr("x", function(d) { return x(d.data.month); })
				.attr("y", function(d) { return y(d[1]); })
				.attr("height", function(d) { return y(d[0]) - y(d[1]); })
				.attr("width", x.bandwidth())
				.on("mouseover",function(d) {     
					//设置tooltip文字  
					var str = ""
					str += "<p>&gt;55岁: " + d.data["m55"] + "%</p>";
					str += "<p>35~55岁: " + d.data["35to55"] + "%</p>";
					str += "<p>20~35岁: " + d.data["20to35"] + "%</p>";
					str += "<p>&lt;20岁: " + d.data.u20 + "%</p>";
					tooltip.html(str)
					//设置tooltip的位置(left,top 相对于页面的距离)   
							.style("left",(d3.event.pageX)+"px")  
							.style("top",(d3.event.pageY+20)+"px")  
							.style("opacity",1.0); 
				})
				.on("mouseout",function(d) {     
					tooltip.style("opacity",0.0);
				});

			legend = serie.append("g")
				.attr("class", "legend")
				.attr("transform", function(d) { var d = d[d.length - 1]; return "translate(" + (x(d.data.month) + x.bandwidth()) + "," + ((y(d[0]) + y(d[1])) / 2) + ")"; });
	
			legend.append("line")
				.attr("x1", -6)
				.attr("x2", 6)
				.attr("stroke", "#fff");
	
			legend.append("text")
				.attr("x", 9)
				.attr("dy", "0.35em")
				.attr("fill", "#fff")
				.style("font", "10px sans-serif")
				.text(function(d) { 
					if (d.key == "m55") {
						return ">55岁";
					} else if (d.key == "35to55") {
						return "35~55岁";
					} else if (d.key == "20to35") {
						return "20~35岁";
					} else if (d.key == "u20") {
						return "<20岁";
					}
					return d.key; 
				});
		}

		function updateHighlightBars() {
			console.log("view1::updateHighlightBars()");
			if (croppedData1.length == 0) {
				return;
			}
			allRects = serie.selectAll("rect");
			for (var j = 0; j < 4; j++) {
				for (var i = 0; i < croppedData1.length; i++) {
					if (conventionData1[i]) {
						if (highlightBars1) {
							allRects._groups[j][i].setAttribute("style", "fill: " + colorHighlight[j]);
						} else {
							allRects._groups[j][i].setAttribute("style", "fill: " + colorPlain[j]);
						}
					}
				}
			}
		}
		updatebars();
		
		view1.onMessage = function(message, data, from) {
			console.log("view1::onMessage " + message);
			if (message == "onMonthCheckedStateChanged") {
				conventionData1 = new Array();
				croppedData1 = new Array();
				for (var i = 0; i < 12; i++) {
					if (data[i]) {
						croppedData1.push(croppedDataOrg1[i]);
						conventionData1.push(conventionDataOrg1[i]);
					}
				}
				d3.select('#view1_svg')
				.selectAll('*')
				.remove(); 
				updatebars();
				updateHighlightBars();
			} else if (message == "onConvHighlightStateChanged") {
				highlightBars1 = data;
				updateHighlightBars();
            }
		}
	});

	function type(d, i, columns) {
		for (i = 1, t = 0; i < columns.length; ++i) t += d[columns[i]] = +d[columns[i]];
		d.total = t;
		return d;
	}

    Observer.addView(view1);
    return view1;

}