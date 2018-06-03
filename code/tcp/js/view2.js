// This is the view of the nation data
function View2(Observer) {
    var view2 = {};

    var $bmDiv=$("#view2");
    var svgwidth=$bmDiv.width();
    var svgheight=$bmDiv.height();
    var margin = {top: 20, right: 10, bottom: 30, left: 80};
    var width = svgwidth - margin.left - margin.right;
    var height = svgheight - margin.top - margin.bottom;

    var svg;

    var g;


    var totalData = {};

    // pre-read the data
    function init_data_2(){
        d3.json("./json/tcp_info.json", function(error, record_root) {
            var record_data = record_root;
            for (date in record_data) {
                totalData[date] = {}
                for (interval in record_data[date]) {
                    if (record_data[date][interval].length == 0) {
                        totalData[date][interval] = 0
                    } else {
                        totalData[date][interval] = 0;
                        for (i = 0; i < record_data[date][interval].length; i++){
                            totalData[date][interval] = record_data[date][interval].length;
                        }
                    }
                }
            }
            console.log(totalData);
            // DEBUG
            drawView("2017-11-01");
        });
    }

    function clearView() {
        d3.select('#view2')
        .selectAll('*')
        .remove();
    }

    function drawView(curr_day) {
        svg=d3.select("#view2")
            .append("svg")
            .attr("width", svgwidth)
            .attr("height", svgheight);
        g = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var data = new Array();

        for (interval in totalData[curr_day]) {
            var curRow = new Object();
            curRow["time"] = interval.slice(0, 5);
            curRow["data"] = totalData[curr_day][interval];
            data.push(curRow)
        }

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
        // x.domain(data.map(function(d) { return d.time; }));
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
        .call(d3.axisBottom(x).tickValues(x.domain().filter(function(d,i){ console.log(i); return !(i%3)})))
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

    function reloadView(curr_day) {
        clearView();
        drawView(curr_day);
    }

    init_data_2();

    document.getElementById('choose_day')
    .addEventListener('change',function(){
        curr_day = this.value;
        console.log(curr_day)
        reloadView(curr_day);
    });

    Observer.addView(view2);
    return view2;

}
