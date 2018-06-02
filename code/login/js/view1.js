// Draw the china map for view 1
function View1(Observer) {

    var $bmDiv=$("#bottom-div");
    var svgwidth=$bmDiv.width();
    var svgheight=$bmDiv.height();
    var margin = {top: 10, right: 20, bottom: 20, left: 50};
    var width = svgwidth - margin.left - margin.right;
    var height = svgheight - margin.top - margin.bottom;

    var svg=d3.select("#view1")
            .append("svg")
            .attr("width", svgwidth)
            .attr("height", svgheight)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var num_x = 269;
    var num_y = 32;
    var rects = new Array();

    var record_data = {};
    var ip_data = {};

    var tooltip = d3.select("body").append("div")
    .attr("class","tooltip") //用于css设置类样式
    .attr("opacity",0.0);


    // initialize the boxes as rectangle
    function init(){
        for (var i = 0; i < num_y; i++){
            rects[i] = new Array();
            for (var j = 0; j < num_x; j++){
                rects[i][j] = svg.append("rect");
            }
        }
    }

    // pre-read the data
    function init_data(){
        d3.json("./json/login_record.json", function(error, record_root) {
            record_data = record_root;
        });

        d3.json("./json/login_ip.json", function(error, ip_root) {
            ip_data = ip_root;
        });
    }

    function init_box(){
        var interval_x = 5;
        var interval_y = 8;

        var start_x = width / 2.0 - interval_x * num_x / 2.0;
        var start_y = height / 2.0 - interval_y * num_y / 2.0;
        var side_width = parseInt(width * 2.0 / 3.0);

        for (var i = 0; i < num_y; i++){
            for (var j = 0; j < num_x; j++){
                rects[i][j].attr("x", start_x + j * interval_x)
                    .attr("y", start_y + i * interval_y)
                    .attr("width", interval_x)
                    .attr("height", interval_y)
                    .attr("fill", "#575750")
                    .attr("stroke", "#252522")
                    .data([i * 10000 + j])
                    .on("mouseover",function(d,idx) {
                        var a = d3.select(this)
                        var title = a._groups[0][0].childNodes[0].textContent
                        console.log(title)
                        var col = a._groups[0][0].__data__ % 10000
                        var row = a._groups[0][0].__data__ / 10000
                        var str = "<p>" + title + '</p>';
                        tooltip.html(str)
                        //设置tooltip的位置(left,top 相对于页面的距离)
                                .style("left",(d3.event.pageX)+"px")
                                .style("top",(d3.event.pageY+20)+"px")
                                .style("opacity",1.0);
                    })
                    .on("mouseout", function(d, idx) {
                        tooltip.style("opacity",0.0);
                    })
                    .append("title")
                    ;
            }
        }

        // append labels for two directions
        /*svg.append("text")
            .attr("x", interval_x * num_x / 2.0 + margin.left)
            .attr("y", height / 2.0 + interval_y * num_y / 2.0 + 25)
            .text("Source IP")
            .attr("font-size", "20px")
            .attr("font-weight", "bold");

        svg.append("text")
            .attr("x", margin.left - 30)
            .attr("y", start_y + interval_y * num_y / 2.0)
            .text("Target IP")
            .attr("font-size", "20px")
            .attr("font-weight", "bold");*/
    }

    function draw_box(day, interval){
        svg.selectAll("g").remove();
        svg.selectAll("circle").remove();
        // recover the boxes
        for (var i = 0; i < num_y; i++){
            for (var j = 0; j < num_x; j++){
                rects[i][j].attr("fill", "#575750");
                rects[i][j].select("title")
                        .text("");
            }
        }

        // visualize logins in this interval
        var tmp_data = record_data[day][interval];
        var source_set = ip_data['source']
        var target_set = ip_data['target']

        for (i = 0; i < tmp_data.length; i++){
            var tmp_source = tmp_data[i][0];
            var tmp_target = tmp_data[i][1];
            var tmp_state = tmp_data[i][2];
            var tmp_user = tmp_data[i][3];
            var tmp_time = tmp_data[i][4];

            var source_id = source_set[tmp_source]
            var target_id = target_set[tmp_target]

            if (tmp_state == "success"){
                rects[target_id][source_id].transition().duration(1000).attr("fill", "#7CFC00");
                rects[target_id][source_id].select("title")
                                        .text("source ip:" + tmp_source + "\ntarget ip:" +
                                            tmp_target + "\nstate:" + tmp_state + "\nuser:"
                                            + tmp_user + "\ntime:" + tmp_time);
            }
            else{
                rects[target_id][source_id].transition().duration(1000).attr("fill", "#EE2C2C");
                rects[target_id][source_id].select("title")
                                        .text("source ip:" + tmp_source + "\ntarget ip:" +
                                            tmp_target + "\nstate:" + tmp_state + "\nuser:"
                                            + tmp_user + "\ntime:" + tmp_time);
            }
        }

    }

    function draw_person(person_id){

        svg.selectAll("rect").remove();
        svg.selectAll("circle").remove();

        var person_data = {};
        for (date in record_data) {
            person_data[date] = {}
            for (interval in record_data[date]) {
                person_data[date][interval] = new Array();
                if (record_data[date][interval].length != 0) {
                    for (i = 0; i < record_data[date][interval].length; i++){
                        var item = record_data[date][interval][i];
                        if (item[3] == person_id){
                            var tmp_tunple = [item[0], item[1], item[2], item[4]];
                            person_data[date][interval].push(tmp_tunple);
                        }
                    }
                }
            }
        }

        console.log(1);

        var data = new Array();

        for (date in person_data) {
            var curRow = new Object();
            curRow["time"] = date.slice(5, 10);
            curRow["data"] = new Array();
            for (interval in person_data[date]){
                var tmp_interval = {};
                tmp_interval["interval"] = interval;
                tmp_interval["interval_data"] = person_data[date][interval];
                curRow["data"].push(tmp_interval);
            }
            data.push(curRow)
        }

        var compare_date = function (x, y) {//比较函数
            if (x.time < y.time) {
                return -1;
            } else if (x.time > y.time) {
                return 1;
            } else {
                return 0;
            }
        }

        data = data.sort(compare_date);

        var compare_interval = function(x, y){
            if (x.interval.slice(0, 5) < y.interval.slice(0, 5)) {
                return -1;
            } else if (x.interval.slice(0, 5) > y.interval.slice(0, 5)) {
                return 1;
            } else {
                return 0;
            }
        }

        for (i = 0; i < data.length; i++){
            var tmp_data = data[i]["data"];
            var sorted_data = tmp_data.sort(compare_interval);
            data[i]["data"] = sorted_data;
        }

        var x = d3.scaleBand()
            .rangeRound([0, width]);

        var y = d3.scaleBand()
            .rangeRound([height, 0]);

        x.domain(data.map(function(d) { return d.time; }));
        y.domain(data[0]["data"].map(function(d) { return d.interval.slice(0, 5); }));

        var g = svg.append("g");

        g.append("g")
        .attr("class", "axis")
        .attr("stroke", "#fff")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickValues(x.domain().filter(function(d,i){ return !(i%3)})))
        .attr("font-size", "4px");

        g.append("g")
            .attr("class", "axis")
            .attr("stroke", "#fff")
            .call(d3.axisLeft(y).tickValues(y.domain().filter(function(d,i){ return !(i%6)})))
            .attr("font-size", "4px");

        for (i = 0; i < data.length; i++){
            var tmp_data = data[i]["data"];
            var tmp_date = data[i]["time"];
            for (j = 0; j <tmp_data.length; j++){
                var tmp_item = tmp_data[j];
                if (tmp_item["interval_data"].length == 0){
                    continue;
                }
                svg.append("circle")
                    .attr("cx", 20 + x(tmp_date))
                    .attr("cy", y(tmp_item["interval"].slice(0, 5)))
                    .attr("r", 2)
                    .attr("fill", "#00CED1")
                    .append("title")
                    .text(tmp_item["interval"] + ": " + tmp_item["interval_data"].length + "次");
            }
        }


    }

    init();
    init_data();
    init_box();

    var curr_day = "2017-11-01";
    var curr_interval = "00:00-00:30";
    // draw_box(curr_day, curr_interval);

    console.oldLog = console.log;
    console.log = function(str) {
        console.oldLog(str);
        var tmp_str = str;
        if (tmp_str == undefined) {
            return;
        }
        if (tmp_str.length == 5 && tmp_str[2] == ":"){
            var tmp_hour = parseInt(tmp_str.substring(0,2));
            var tmp_min = parseInt(tmp_str.substring(3,5));
            if (tmp_min < 30){
                var obj = document.getElementById("choose_day");
                var index = obj.selectedIndex;
                curr_day = obj.options[index].value;
                curr_interval = tmp_str.substring(0,2) + ":00-" + tmp_str.substring(0,2) + ":30";

                draw_box(curr_day, curr_interval);
            }
            else {
                var new_hour = tmp_hour + 1;
                var obj = document.getElementById("choose_day");
                var index = obj.selectedIndex;
                curr_day = obj.options[index].value;

                if (new_hour < 10){
                    curr_interval = tmp_str.substring(0,2) + ":30-0" + new_hour.toString() + ":00";
                    draw_box(curr_day, curr_interval);
                }
                else {
                    curr_interval = tmp_str.substring(0,2) + ":30-" + new_hour.toString() + ":00";
                    draw_box(curr_day, curr_interval);
                }
            }
        }
    }

    // add the event listener for the choice of day
    document.getElementById('choose_day')
        .addEventListener('change',function(){
            curr_day = this.value;
            init();
            init_box();
            draw_box(curr_day, curr_interval);
    });

    // add the event listener for search button
    document.getElementById('search_button')
        .addEventListener('click',function(){
            var obj = document.getElementById("searchbox");
            var tmp_id = obj.value;
            console.log(tmp_id);
            draw_person(tmp_id);
    });

    Observer.addView(view1);
    return view1;

}

