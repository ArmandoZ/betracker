// Draw the china map for view 1
function View1(Observer) {

    var $bmDiv=$("#bottom-div");
    var svgwidth=$bmDiv.width();
    var svgheight=$bmDiv.height();
    var margin = {top: 10, right: 20, bottom: 10, left: 20};
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

            draw_box(curr_day, curr_interval);
    });

    Observer.addView(view1);
    return view1;

}

