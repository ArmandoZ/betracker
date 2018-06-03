// This is the view of the nation data
function View3(Observer) {
    var view3 = {};

    var $bmDiv=$("#view3");
    var svgwidth=$bmDiv.width();
    var svgheight=$bmDiv.height();
    var margin = {top: 20, right: 10, bottom: 30, left: 80};
    var width = svgwidth - margin.left - margin.right;
    var height = svgheight - margin.top - margin.bottom;

    var svg;

    var g;


    var totalData = {};

    // pre-read the data
    function init_data_3(){
        d3.json("./json/tcp_info.json", function(error, record_root) {
            var record_data = record_root;
            for (date in record_data) {
                totalData[date] = 0;
                for (interval in record_data[date]) {
                    if (record_data[date][interval].length != 0) {
                        totalData[date] += record_data[date][interval].length;
                    }
                }
                // totalData[date].push(curVal);
            }
            console.log(totalData);
            drawView();
        });
    }

    function clearView() {
        d3.select('#view3')
        .selectAll('*')
        .remove();
    }

    function drawView() {
        svg=d3.select("#view3")
            .append("svg")
            .attr("width", svgwidth)
            .attr("height", svgheight);
        g = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var data = new Array();

        for (date in totalData) {
            var curRow = new Object();
            curRow["time"] = date.slice(5, 10);
            curRow["data"] = totalData[date];
            data.push(curRow)
        }

        console.log(data)

        var compare = function (x, y) {//比较函数
            if (x.time < y.time) {
                return -1;
            } else if (x.time > y.time) {
                return 1;
            } else {
                return 0;
            }
        }
        data = data.sort(compare)
        console.log(data);

        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var x = d3.scaleBand()
            .rangeRound([0, width]);

        var y = d3.scaleLinear()
            .rangeRound([height, 0]);

        x.domain(data.map(function(d) { return d.time; }));
        y.domain(d3.extent(data, function(d) { return d.data; }));

        console.log(data.map(function(d) { return d.time; }))

        console.log(x.domain());
        console.log(y.domain());

        var line = d3.line()
        .x(function(d) { return x(d.time); })
        .y(function(d) { return y(d.data); });

        console.log(d3.axisBottom(x).tickValues([10]))

        g.append("g")
        .attr("class", "axis")
        .attr("stroke", "#fff")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickValues(x.domain().filter(function(d,i){ console.log(i); return !(i%7)})))
        .attr("font-size", "4px");

        g.append("g")
            .call(d3.axisLeft(y))
            .attr("stroke", "#fff")
            .style("font-size", "8px")
          .append("text")
            .attr("fill", "#fff")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end");

        g.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "#00CED1")
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 1.5)
            .attr("transform", "translate(8,0)")
            .attr("d", line);
    }

    function reloadView() {
        clearView();
        drawView();
    }

    init_data_3();

    Observer.addView(view3);
    return view3;

}
