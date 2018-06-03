// Draw the china map for view 1
function View1(Observer) {

    var $bmDiv=$("#bottom-left");
    var svgwidth=$bmDiv.width();
    var svgheight=$bmDiv.height();
    var margin = {top: 47, right: 40, bottom: 47, left: 40};
    var width = svgwidth - margin.left - margin.right;
    var height = svgheight - margin.top - margin.bottom;

    var svg=d3.select("#view1")
            .append("svg")
            .attr("width", svgwidth)
            .attr("height", svgheight)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var record_data = {};
    var fraction_data= {};
    var up_data = {};
    var down_data = {};

    // pre-read the data
    function init_data(){

        d3.json("./json/tcp_info.json", function(error, record_root) {
            record_data = record_root;
        });

    }

    function get_fraction(){
        for (date in record_data){
            fraction_data[date] = new Array();
            for (interval in record_data[date]){
                for (i = 0; i < record_data[date][interval].length; i++){
                    var item = record_data[date][interval][i];
                    var tmp_source = item[2];
                    var tmp_up = parseInt(item[4]);
                    var tmp_down = parseInt(item[5]);

                    if (tmp_source in fraction_data[date]){
                        fraction_data[date][tmp_source][0] += tmp_up;
                        fraction_data[date][tmp_source][1] += tmp_down;
                    }
                    else{
                        fraction_data[date][tmp_source] = new Array(2);
                        fraction_data[date][tmp_source][0] = tmp_up;
                        fraction_data[date][tmp_source][1] = tmp_down;
                    }
                }
            }
        }

        var compare_up = function (x, y) {
            if (parseInt(x[0]) < parseInt(y[0])) {
                return 1;
            } else if (parseInt(x[0]) > parseInt(y[0])) {
                return -1;
            } else {
                return 0;
            }
        }

        var compare_down = function (x, y) {
            if (parseInt(x[1]) < parseInt(y[1])) {
                return 1;
            } else if (parseInt(x[1]) > parseInt(y[1])) {
                return -1;
            } else {
                return 0;
            }
        }

        for (date in fraction_data){
            up_data[date] = fraction_data[date].sort(compare_up);
            down_data[date] = fraction_data[date].sort(compare_down);
        }

        return;
    }

    // get the data for chord graph
    function get_data(day, interval){
        var tmp_data = record_data[day][interval];

        if (tmp_data.length == 0){
            return [];
        }

        // define the comparison function for up-link
        var compare_up = function (x, y) {
            if (parseInt(x[4]) < parseInt(y[4])) {
                return 1;
            } else if (parseInt(x[4]) > parseInt(y[4])) {
                return -1;
            } else {
                return 0;
            }
        }

        // define the comparison function for down-link
        var compare_down = function (x, y) {
            if (parseInt(x[5]) < parseInt(y[5])) {
                return 1;
            } else if (parseInt(x[5]) > parseInt(y[5])) {
                return -1;
            } else {
                return 0;
            }
        }

        var ip_dict = {};
        var ip_name_list = new Array();
        var ip_cnt = 0;

        // choose the 100 biggest ones for up-link and down-link
        var thr = (tmp_data.length >= 50)?50:tmp_data.length;
        var up_list = tmp_data.sort(compare_up);
        var down_list = tmp_data.sort(compare_down)

        // get the maximum and minimum
        var tmp_max = 0;
        var tmp_min = parseInt(tmp_data[0][4]);

        for (i = 0; i < thr; i++){
            if (parseInt(up_list[i][4]) > tmp_max){
                tmp_max = parseInt(up_list[i][4]);
            }
            if (parseInt(up_list[i][4]) < tmp_min){
                tmp_min = parseInt(up_list[i][4]);
            }
            if (parseInt(down_list[i][5]) > tmp_max){
                tmp_max = parseInt(down_list[i][5]);
            }
            if (parseInt(down_list[i][5]) < tmp_min){
                tmp_min = parseInt(down_list[i][5]);
            }
        }

        // get the dict for source and target ip
        for (i = 0; i < thr; i++){
            var tmp_source_up = up_list[i][2];
            var tmp_target_up = up_list[i][3];
            var tmp_source_down = down_list[i][2];
            var tmp_target_down = down_list[i][3];

            if (!(tmp_source_up in ip_dict)){
                ip_dict[tmp_source_up] = ip_cnt;
                ip_name_list.push(tmp_source_up);
                ip_cnt += 1;
            }

            if (!(tmp_target_up in ip_dict)){
                ip_dict[tmp_target_up] = ip_cnt;
                ip_name_list.push(tmp_target_up);
                ip_cnt += 1;
            }

            if (!(tmp_source_down in ip_dict)){
                ip_dict[tmp_source_down] = ip_cnt;
                ip_name_list.push(tmp_source_down);
                ip_cnt += 1;
            }

            if (!(tmp_target_down in ip_dict)){
                ip_dict[tmp_target_down] = ip_cnt;
                ip_name_list.push(tmp_target_down);
                ip_cnt += 1;
            }
        }

        // get the matrix for chord graph
        var data_list = new Array(ip_cnt);
        for(var x = 0; x < ip_cnt; x++){
              data_list[x] = new Array(ip_cnt);
              for(var y = 0; y < ip_cnt; y++){
                   data_list[x][y] = 0;
              }
        }

        for (i = 0; i < thr; i++){
            var tmp_source = up_list[i][2];
            var tmp_target = up_list[i][3];
            var tmp_up = up_list[i][4];
            var tmp_down = up_list[i][5];
            var tmp_weight_up = 100 + 900 * (parseFloat(tmp_up) - tmp_min) / (tmp_max - tmp_min);
            var tmp_weight_down = 100 + 900 * (parseFloat(tmp_down) - tmp_min) / (tmp_max - tmp_min);

            data_list[ip_dict[tmp_source]][ip_dict[tmp_target]] = tmp_weight_up;
            data_list[ip_dict[tmp_target]][ip_dict[tmp_source]] = tmp_weight_down;
        }

        for (i = 0; i < thr; i++){
            var tmp_source = down_list[i][2];
            var tmp_target = down_list[i][3];
            var tmp_up = down_list[i][4];
            var tmp_down = down_list[i][5];
            var tmp_weight_up = 100 + 900 * (parseFloat(tmp_up) - tmp_min) / (tmp_max - tmp_min);
            var tmp_weight_down = 100 + 900 * (parseFloat(tmp_down) - tmp_min) / (tmp_max - tmp_min);

            data_list[ip_dict[tmp_source]][ip_dict[tmp_target]] = tmp_weight_up;
            data_list[ip_dict[tmp_target]][ip_dict[tmp_source]] = tmp_weight_down;
        }

        return [data_list, ip_name_list];
    }

    function draw_chord(day, interval){
        // remove the former graph
        svg.selectAll("g").remove();
        svg.selectAll("circle").remove();
        svg.selectAll("line").remove();

        var result = get_data(day, interval);
        if (result.length == 0){
            return;
        }
        var matrix = result[0];
        var ip_name_list = result[1];

        var outerRadius = Math.min(width, height) * 0.5 - 40;
        var innerRadius = outerRadius - 30;

        var formatValue = d3.formatPrefix(",.0", 1e3);

        var chord = d3.chord()
            .padAngle(0.05)
            .sortSubgroups(d3.descending);

        var arc = d3.arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius);

        var ribbon = d3.ribbon()
            .radius(innerRadius);

        var color = d3.scaleOrdinal()
            .domain(d3.range(4))
            .range(["#787878", "#FFDD89", "#957244", "#F26223"]);

        var g = svg.append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
            .datum(chord(matrix));

        var group = g.append("g")
            .attr("class", "groups")
          .selectAll("g")
          .data(function(chords) { return chords.groups; })
          .enter().append("g");

        group.append("path")
            .style("fill", function(d) { return color(d.index % 4); })
            .style("stroke", function(d) { return d3.rgb(color(d.index % 4)).darker(); })
            .attr("d", arc);

        var groupTick = group.selectAll(".group-tick")
          .data(function(d,i) { return groupTicks(d, d.value / 2.0,i); })
          .enter().append("g")
            .attr("class", "group-tick")
            .attr("transform", function(d) { return "rotate(" + (d.angle * 180 / Math.PI - 90) + ") translate(" + outerRadius + ",0)"; });

        groupTick.append("line")
            .attr("x2", 6);

        groupTick
          .filter(function(d) { return d.half === 0.5; })
          .append("text")
            .attr("x", 8)
            .attr("dy", ".35em")
            .attr("transform", function(d) { return d.angle > Math.PI ? "rotate(180) translate(-16)" : null; })
            .style("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
            .text(function(d) { return ip_name_list[d.id]; })
            .attr("font-size", "10px")
            .attr("fill", "#FFFFFF");

        g.append("g")
            .attr("class", "ribbons")
          .selectAll("path")
          .data(function(chords) { return chords; })
          .enter().append("path")
            .attr("d", ribbon)
            .style("fill", function(d) { return color(d.target.index % 4); })
            .style("stroke", function(d) { return d3.rgb(color(d.target.index % 4)).darker(); });

        // Returns an array of tick angles and values for a given group and step.
        function groupTicks(d, step, tmp_id) {
          var k = (d.endAngle - d.startAngle) / d.value;
          return d3.range(0, d.value, step).map(function(value) {
            return {value: value, angle: value * k + d.startAngle, id:tmp_id, half: value / d.value};
          });
        }
    }

    function draw_ip(tmp_ip, state){
        svg.selectAll("g").remove();
        svg.selectAll("circle").remove();
        svg.selectAll("line").remove();

        var x = d3.scaleBand()
            .rangeRound([0, width]);

        var y = d3.scaleLinear()
            .rangeRound([height, 0]);

        var keys = new Array();
        console.log(fraction_data);
        for (var p in fraction_data){
            keys.push(p.slice(5,10));
        }

        var compare_date = function (x, y) {//比较函数
            if (x < y) {
                return -1;
            } else if (x > y) {
                return 1;
            } else {
                return 0;
            }
        }

        keys = keys.sort(compare_date);

        console.log(keys);

        x.domain(keys.map(function(d) { return d; }));
        y.domain([0, 1]);

        var g = svg.append("g");

        g.append("g")
        .attr("class", "axis")
        .attr("stroke", "#fff")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickValues(x.domain().filter(function(d,i){ return !(i%3)})))
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

        var up_date = {};
        var down_date = {};

        if (state == "uplink"){
            for (date in up_data){
                var tmp_date = date.slice(5, 10);

                var ip_set_up = new Array();
                for (p in up_data[date]){
                    ip_set_up.push(p);
                }

                var tmp_y_up = 1.0;
                var tmp_rank = ip_set_up.length;

                if (ip_set_up.indexOf(tmp_ip) >= 0){
                    tmp_y_up = (ip_set_up.indexOf(tmp_ip) + 1.0) / ip_set_up.length;
                    tmp_rank = ip_set_up.indexOf(tmp_ip) + 1;
                }

                svg.append("circle")
                        .attr("cx", 12 + x(tmp_date))
                        .attr("cy", y(tmp_y_up))
                        .attr("r", 4)
                        .attr("fill", "#00CED1")
                        .append("title")
                        .text(tmp_date + " uplink rank: " + tmp_rank);

                up_date[tmp_date] = tmp_y_up;
            }

            for (i = 0; i < keys.length; i++){
                if (i != 0){
                    svg.append("line")
                        .attr("x1", 12 + x(keys[i - 1]))
                        .attr("y1", y(up_date[keys[i - 1]]))
                        .attr("x2", 12 + x(keys[i]))
                        .attr("y2", y(up_date[keys[i]]))
                        .attr("fill", "#00CED1")
                        .attr("stroke", "#00CED1");
                }
            }
        }

        if (state == "downlink"){
            for (date in down_data){
                var tmp_date = date.slice(5, 10);

                var ip_set_down = new Array();
                for (q in down_data[date]){
                    ip_set_down.push(q);
                }

                var tmp_y_down = 1.0;
                var tmp_rank = ip_set_down.length;

                if (ip_set_down.indexOf(tmp_ip) >= 0){
                    tmp_y_down = (ip_set_down.indexOf(tmp_ip) + 1.0) / ip_set_down.length;
                    tmp_rank = ip_set_down.indexOf(tmp_ip) + 1;
                }

                svg.append("circle")
                        .attr("cx", 12 + x(tmp_date))
                        .attr("cy", y(tmp_y_down))
                        .attr("r", 4)
                        .attr("fill", "#B3EE3A")
                        .append("title")
                        .text(tmp_date + " downlink rank: " + tmp_rank);

                down_date[tmp_date] = tmp_y_down;
            }

            for (i = 0; i < keys.length; i++){
                if (i != 0){
                    svg.append("line")
                        .attr("x1", 12 + x(keys[i - 1]))
                        .attr("y1", y(down_date[keys[i - 1]]))
                        .attr("x2", 12 + x(keys[i]))
                        .attr("y2", y(down_date[keys[i]]))
                        .attr("fill", "#B3EE3A")
                        .attr("stroke", "#B3EE3A");
                }
            }
        }

    }

    init_data();

    var curr_day = "2017-11-01";
    var curr_interval = "08:00-08:30";
    var curr_state = "downlink";
    var curr_ip = 0;
    var i=0;
    setTimeout(function(){ get_fraction(); draw_chord(curr_day, curr_interval);}, 6000);

    console.oldLog = console.log;
    console.log = function(str) {
        console.oldLog(str);
        var tmp_str = str;
        if (tmp_str.length == 5 && tmp_str[2] == ":"){
            var tmp_hour = parseInt(tmp_str.substring(0,2));
            var tmp_min = parseInt(tmp_str.substring(3,5));
            if (tmp_min < 30){
                var obj = document.getElementById("choose_day");
                var index = obj.selectedIndex;
                curr_day = obj.options[index].value;
                curr_interval = tmp_str.substring(0,2) + ":00-" + tmp_str.substring(0,2) + ":30";

                draw_chord(curr_day, curr_interval);
            }
            else {
                var new_hour = tmp_hour + 1;
                var obj = document.getElementById("choose_day");
                var index = obj.selectedIndex;
                curr_day = obj.options[index].value;

                if (new_hour < 10){
                    curr_interval = tmp_str.substring(0,2) + ":30-0" + new_hour.toString() + ":00";
                    draw_chord(curr_day, curr_interval);
                }
                else {
                    curr_interval = tmp_str.substring(0,2) + ":30-" + new_hour.toString() + ":00";
                    draw_chord(curr_day, curr_interval);
                }
            }
        }
    }

    // add the event listener for the choice of day
    document.getElementById('choose_day')
        .addEventListener('change',function(){
            curr_day = this.value;
            draw_chord(curr_day, curr_interval);
    });

    // add the event listener for the choice of up and down
    document.getElementById('choose_up_down')
        .addEventListener('change',function(){
            curr_state = this.value;
            draw_ip(curr_ip, curr_state);
    });

    // add the event listener for search button
    document.getElementById('search_button')
        .addEventListener('click',function(){
            var obj = document.getElementById("searchbox");
            curr_ip = obj.value;
            draw_ip(curr_ip, curr_state);
    });

    Observer.addView(view1);
    return view1;

}

