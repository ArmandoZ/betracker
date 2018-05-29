// This is the view of the female data
function View4(Observer) {
    var view4 = {};

    var $bmDiv=$("#bottom-right-div");
    var svgwidth=$bmDiv.width();
    var svgheight=$bmDiv.height();
    var margin = {top: 0, right: 50, bottom: 0, left: 70};
    var width = svgwidth - margin.left - margin.right;
    var height = svgheight - margin.top - margin.bottom;

    var svg=d3.select("#view4")
            .append("svg")
            .attr("width", svgwidth)
            .attr("height", svgheight);

    var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // define the corresponding name of every province
    var area_name = {"1": "甘肃", "2": "青海", "3": "广西", "4": "贵州", "5": "重庆", "6": "北京", "7": "福建",
            "8": "安徽", "9": "广东", "10": "西藏", "11": "新疆", "12": "海南", "13": "宁夏", "14": "陕西", "15": "山西",
            "16": "湖北", "17": "湖南", "18": "四川", "19": "云南", "20": "河北", "21": "河南", "22": "辽宁", "23": "山东",
            "24": "天津", "25": "江西", "26": "江苏", "27": "上海", "28": "浙江", "29": "吉林", "30": "内蒙古", "31": "黑龙江"};

    var tmp_arcs = 0;
    var y_label = 0;

    // draw the charts
    function visualization(data_name, id){

    d3.csv("data/" + data_name, function(d) {
        return d;
    },function(error, data) {
        if (error) throw error;

        // define the unit used in the view
        var tmp_unit = "亿元";

        if (data_name == "private_job.csv"){
            tmp_unit = "万人";
        }
        if (data_name == "single_job.csv"){
            tmp_unit = "万人";
        }
        if (data_name == "money_average.csv"){
            tmp_unit = "元";
        }
        if (data_name == "in_out.csv"){
            tmp_unit = "千美元";
        }
        if (data_name == "in.csv"){
            tmp_unit = "千美元";
        }
        if (data_name == "out.csv"){
            tmp_unit = "千美元";
        }
        if (data_name == "resident_index.csv"){
            tmp_unit = "";
        }
        if (data_name == "good_index.csv"){
            tmp_unit = "";
        }

        // build the pie chart
        var pie=d3.layout.pie();

        pie.value(function(d){
            return d;
        });

        // define the inner and outer radius
        var outerRadius = height * 0.4;
        var innerRadius = 0;

        var arc = d3.svg.arc()
                .innerRadius(innerRadius)
                .outerRadius(outerRadius);
        var color_scale = d3.scale.category20();

        // draw the pie
        function updatepie(area_id){
            var tmp_idx = 0;
            for (i = 0; i < data.length; i++){
                if (data[i].id == area_id){
                    tmp_idx = i;
                }
            }

            var tmp_data = data[tmp_idx];
            var dataset = new Array(10);
            var sum = 0;

            for (var tmp_key in tmp_data){
                if (tmp_key != "id"){
                    dataset[parseInt(tmp_key.substring(1)) - 2007] = tmp_data[tmp_key];
                    sum = sum + parseFloat(tmp_data[tmp_key]);
                }
            }

            var piedata = pie(dataset);

            var arcs = g.selectAll("g")
                .data(piedata)
                .enter()
                .append("g")
                .attr("transform","translate("+(width * 0.6)+","+(height * 0.5)+")")
                .on("mouseover", function(d,i){
                    $(this).attr("opacity", 0.7);
                })
                .on("mouseout",function(d,i){
                    $(this).attr("opacity", 1.0);
                });

            arcs.append("path")
                .attr("fill",function(d,i){
                    return color_scale(i);
                })
                .attr("d",function(d){
                    return arc(d);
                });

            arcs.append("line")
                .attr("stroke","black")
                .attr("x1",function(d){
                    return arc.centroid(d)[0]*2;
                })
                .attr("y1",function(d){
                    return arc.centroid(d)[1]*2;
                })
                .attr("x2",function(d){
                    return arc.centroid(d)[0]*2.2;
                })
                .attr("y2",function(d){
                    return arc.centroid(d)[1]*2.2;
                });

            var fontsize=14;
            arcs.append("line")
                .style("stroke","black")
                .each(function(d){
                    d.textLine = {x1:0, y1:0, x2:0, y2:0};
                })
                .attr("x1",function(d){
                    d.textLine.x1 = arc.centroid(d)[0]*2.2;
                    return d.textLine.x1;
                })
                .attr("y1",function(d){
                    d.textLine.y1 = arc.centroid(d)[1]*2.2;
                    return d.textLine.y1;
                })
                .attr("x2",function(d, i){
                    var strLen = 2 * fontsize * 1.5;
                    var bx = arc.centroid(d)[0] * 2.2;
                    d.textLine.x2 = bx>=0 ? bx+strLen : bx-strLen;
                    return d.textLine.x2;
                })
                .attr("y2",function(d){
                    d.textLine.y2 = arc.centroid(d)[1]*2.2;
                    return d.textLine.y2;
                });

            arcs.append("text")
                .attr("transform",function(d){
                    var x = 0;
                    var y = 0;
                    x = d.textLine.x2 > d.textLine.x1 ? d.textLine.x2 + fontsize * 1.8 : d.textLine.x2 - fontsize * 1.8;
                    y = d.textLine.y1 + fontsize * 0.3;
                    // y=y > 0 ? y + fontsize * 1.1 : y - fontsize * 0.4;
                    return "translate("+x+","+y+")";
                })
                .style("text-anchor","middle")
                .style("font-size",fontsize)
                .text(function(d, i){
                    return (i+2007) + "年";
                });

            arcs.append("title")
                .text(function(d, i){
                    var tmp_result = Math.round(parseFloat(dataset[i]) / sum * 10000) / 100;
                    return area_name[area_id] + " " + (i+2007) + "年: " + dataset[i] + tmp_unit +  "(" + tmp_result + "%)";
                });

            return arcs;
        }

        tmp_arcs = updatepie(id);

        if (data_name == "area_total_output.csv"){
            var tmp_name = area_name[id] + "近十年地区生产总值";

            y_label = svg.append("text")
                .attr("x", width * 0.09)
                .attr("y", height * 0.5 - 9 * tmp_name.length)
                .attr("font-size", 18)
                .attr("font-weight", "bold")
                .style("font-family", "楷体");

            for (j = 0; j < tmp_name.length; j++){
                y_label.append("tspan")
                    .attr("x", y_label.attr("x"))
                    .attr("y", parseFloat(y_label.attr("y")) + 18 * j)
                    .attr("dy", "1em")
                    .text(tmp_name[j]);
            }

        }

        if (data_name == "area_first_output.csv"){
            var tmp_name = area_name[id] + "近十年第一产业增加值";

            y_label = svg.append("text")
                .attr("x", width * 0.09)
                .attr("y", height * 0.5 - 9 * tmp_name.length)
                .attr("font-size", 18)
                .attr("font-weight", "bold")
                .style("font-family", "楷体");

            for (j = 0; j < tmp_name.length; j++){
                y_label.append("tspan")
                    .attr("x", y_label.attr("x"))
                    .attr("y", parseFloat(y_label.attr("y")) + 18 * j)
                    .attr("dy", "1em")
                    .text(tmp_name[j]);
            }

        }

        if (data_name == "area_second_output.csv"){
            var tmp_name = area_name[id] + "近十年第二产业增加值";

            y_label = svg.append("text")
                .attr("x", width * 0.09)
                .attr("y", height * 0.5 - 9 * tmp_name.length)
                .attr("font-size", 18)
                .attr("font-weight", "bold")
                .style("font-family", "楷体");

            for (j = 0; j < tmp_name.length; j++){
                y_label.append("tspan")
                    .attr("x", y_label.attr("x"))
                    .attr("y", parseFloat(y_label.attr("y")) + 18 * j)
                    .attr("dy", "1em")
                    .text(tmp_name[j]);
            }

        }

        if (data_name == "area_third_output.csv"){
            var tmp_name = area_name[id] + "近十年第三产业增加值";

            y_label = svg.append("text")
                .attr("x", width * 0.09)
                .attr("y", height * 0.5 - 9 * tmp_name.length)
                .attr("font-size", 18)
                .attr("font-weight", "bold")
                .style("font-family", "楷体");

            for (j = 0; j < tmp_name.length; j++){
                y_label.append("tspan")
                    .attr("x", y_label.attr("x"))
                    .attr("y", parseFloat(y_label.attr("y")) + 18 * j)
                    .attr("dy", "1em")
                    .text(tmp_name[j]);
            }

        }

        if (data_name == "society_solid.csv"){
            var tmp_name = area_name[id] + "近十年全社会固定资产投资";

            y_label = svg.append("text")
                .attr("x", width * 0.09)
                .attr("y", height * 0.5 - 9 * tmp_name.length)
                .attr("font-size", 18)
                .attr("font-weight", "bold")
                .style("font-family", "楷体");

            for (j = 0; j < tmp_name.length; j++){
                y_label.append("tspan")
                    .attr("x", y_label.attr("x"))
                    .attr("y", parseFloat(y_label.attr("y")) + 18 * j)
                    .attr("dy", "1em")
                    .text(tmp_name[j]);
            }

        }

        if (data_name == "town_solid.csv"){
            var tmp_name = area_name[id] + "近十年城镇固定资产投资";

            y_label = svg.append("text")
                .attr("x", width * 0.09)
                .attr("y", height * 0.5 - 9 * tmp_name.length)
                .attr("font-size", 18)
                .attr("font-weight", "bold")
                .style("font-family", "楷体");

            for (j = 0; j < tmp_name.length; j++){
                y_label.append("tspan")
                    .attr("x", y_label.attr("x"))
                    .attr("y", parseFloat(y_label.attr("y")) + 18 * j)
                    .attr("dy", "1em")
                    .text(tmp_name[j]);
            }

        }

        if (data_name == "build_develop.csv"){
            var tmp_name = area_name[id] + "近十年房地产开发投资";

            y_label = svg.append("text")
                .attr("x", width * 0.09)
                .attr("y", height * 0.5 - 9 * tmp_name.length)
                .attr("font-size", 18)
                .attr("font-weight", "bold")
                .style("font-family", "楷体");

            for (j = 0; j < tmp_name.length; j++){
                y_label.append("tspan")
                    .attr("x", y_label.attr("x"))
                    .attr("y", parseFloat(y_label.attr("y")) + 18 * j)
                    .attr("dy", "1em")
                    .text(tmp_name[j]);
            }

        }

        if (data_name == "private_job.csv"){
            var tmp_name = area_name[id] + "近十年私营企业就业人数";

            y_label = svg.append("text")
                .attr("x", width * 0.09)
                .attr("y", height * 0.5 - 9 * tmp_name.length)
                .attr("font-size", 18)
                .attr("font-weight", "bold")
                .style("font-family", "楷体");

            for (j = 0; j < tmp_name.length; j++){
                y_label.append("tspan")
                    .attr("x", y_label.attr("x"))
                    .attr("y", parseFloat(y_label.attr("y")) + 18 * j)
                    .attr("dy", "1em")
                    .text(tmp_name[j]);
            }

        }

        if (data_name == "single_job.csv"){
            var tmp_name = area_name[id] + "近十年个体就业人数";

            y_label = svg.append("text")
                .attr("x", width * 0.09)
                .attr("y", height * 0.5 - 9 * tmp_name.length)
                .attr("font-size", 18)
                .attr("font-weight", "bold")
                .style("font-family", "楷体");

            for (j = 0; j < tmp_name.length; j++){
                y_label.append("tspan")
                    .attr("x", y_label.attr("x"))
                    .attr("y", parseFloat(y_label.attr("y")) + 18 * j)
                    .attr("dy", "1em")
                    .text(tmp_name[j]);
            }

        }

        if (data_name == "money_total.csv"){
            var tmp_name = area_name[id] + "近十年城镇单位就业人员工资总额";

            y_label = svg.append("text")
                .attr("x", width * 0.09)
                .attr("y", height * 0.5 - 9 * tmp_name.length)
                .attr("font-size", 18)
                .attr("font-weight", "bold")
                .style("font-family", "楷体");

            for (j = 0; j < tmp_name.length; j++){
                y_label.append("tspan")
                    .attr("x", y_label.attr("x"))
                    .attr("y", parseFloat(y_label.attr("y")) + 18 * j)
                    .attr("dy", "1em")
                    .text(tmp_name[j]);
            }

        }

        if (data_name == "money_average.csv"){
            var tmp_name = area_name[id] + "近十年城镇单位就业人员平均工资";

            y_label = svg.append("text")
                .attr("x", width * 0.09)
                .attr("y", height * 0.5 - 9 * tmp_name.length)
                .attr("font-size", 18)
                .attr("font-weight", "bold")
                .style("font-family", "楷体");

            for (j = 0; j < tmp_name.length; j++){
                y_label.append("tspan")
                    .attr("x", y_label.attr("x"))
                    .attr("y", parseFloat(y_label.attr("y")) + 18 * j)
                    .attr("dy", "1em")
                    .text(tmp_name[j]);
            }

        }

        if (data_name == "income.csv"){
            var tmp_name = area_name[id] + "近十年地方财政一般预算收入";

            y_label = svg.append("text")
                .attr("x", width * 0.09)
                .attr("y", height * 0.5 - 9 * tmp_name.length)
                .attr("font-size", 18)
                .attr("font-weight", "bold")
                .style("font-family", "楷体");

            for (j = 0; j < tmp_name.length; j++){
                y_label.append("tspan")
                    .attr("x", y_label.attr("x"))
                    .attr("y", parseFloat(y_label.attr("y")) + 18 * j)
                    .attr("dy", "1em")
                    .text(tmp_name[j]);
            }

        }

        if (data_name == "output.csv"){
            var tmp_name = area_name[id] + "近十年地方财政一般预算支出";

            y_label = svg.append("text")
                .attr("x", width * 0.09)
                .attr("y", height * 0.5 - 9 * tmp_name.length)
                .attr("font-size", 18)
                .attr("font-weight", "bold")
                .style("font-family", "楷体");

            for (j = 0; j < tmp_name.length; j++){
                y_label.append("tspan")
                    .attr("x", y_label.attr("x"))
                    .attr("y", parseFloat(y_label.attr("y")) + 18 * j)
                    .attr("dy", "1em")
                    .text(tmp_name[j]);
            }

        }

        if (data_name == "in_out.csv"){
            var tmp_name = area_name[id] + "近十年经营单位所在地进出口总额";

            y_label = svg.append("text")
                .attr("x", width * 0.09)
                .attr("y", height * 0.5 - 9 * tmp_name.length)
                .attr("font-size", 18)
                .attr("font-weight", "bold")
                .style("font-family", "楷体");

            for (j = 0; j < tmp_name.length; j++){
                y_label.append("tspan")
                    .attr("x", y_label.attr("x"))
                    .attr("y", parseFloat(y_label.attr("y")) + 18 * j)
                    .attr("dy", "1em")
                    .text(tmp_name[j]);
            }

        }

        if (data_name == "out.csv"){
            var tmp_name = area_name[id] + "近十年经营单位所在地出口总额";

            y_label = svg.append("text")
                .attr("x", width * 0.09)
                .attr("y", height * 0.5 - 9 * tmp_name.length)
                .attr("font-size", 18)
                .attr("font-weight", "bold")
                .style("font-family", "楷体");

            for (j = 0; j < tmp_name.length; j++){
                y_label.append("tspan")
                    .attr("x", y_label.attr("x"))
                    .attr("y", parseFloat(y_label.attr("y")) + 18 * j)
                    .attr("dy", "1em")
                    .text(tmp_name[j]);
            }

        }

        if (data_name == "in.csv"){
            var tmp_name = area_name[id] + "近十年经营单位所在地进口总额";

            y_label = svg.append("text")
                .attr("x", width * 0.09)
                .attr("y", height * 0.5 - 9 * tmp_name.length)
                .attr("font-size", 18)
                .attr("font-weight", "bold")
                .style("font-family", "楷体");

            for (j = 0; j < tmp_name.length; j++){
                y_label.append("tspan")
                    .attr("x", y_label.attr("x"))
                    .attr("y", parseFloat(y_label.attr("y")) + 18 * j)
                    .attr("dy", "1em")
                    .text(tmp_name[j]);
            }

        }

        if (data_name == "resident_index.csv"){
            var tmp_name = area_name[id] + "近十年居民消费价格指数";

            y_label = svg.append("text")
                .attr("x", width * 0.09)
                .attr("y", height * 0.5 - 9 * tmp_name.length)
                .attr("font-size", 18)
                .attr("font-weight", "bold")
                .style("font-family", "楷体");

            for (j = 0; j < tmp_name.length; j++){
                y_label.append("tspan")
                    .attr("x", y_label.attr("x"))
                    .attr("y", parseFloat(y_label.attr("y")) + 18 * j)
                    .attr("dy", "1em")
                    .text(tmp_name[j]);
            }

        }

        if (data_name == "good_index.csv"){
            var tmp_name = area_name[id] + "近十年商品零售价格指数";

            y_label = svg.append("text")
                .attr("x", width * 0.09)
                .attr("y", height * 0.5 - 9 * tmp_name.length)
                .attr("font-size", 18)
                .attr("font-weight", "bold")
                .style("font-family", "楷体");

            for (j = 0; j < tmp_name.length; j++){
                y_label.append("tspan")
                    .attr("x", y_label.attr("x"))
                    .attr("y", parseFloat(y_label.attr("y")) + 18 * j)
                    .attr("dy", "1em")
                    .text(tmp_name[j]);
            }

        }

        if (data_name == "total_good.csv"){
            var tmp_name = area_name[id] + "近十年社会消费品零售总额";

            y_label = svg.append("text")
                .attr("x", width * 0.09)
                .attr("y", height * 0.5 - 9 * tmp_name.length)
                .attr("font-size", 18)
                .attr("font-weight", "bold")
                .style("font-family", "楷体");

            for (j = 0; j < tmp_name.length; j++){
                y_label.append("tspan")
                    .attr("x", y_label.attr("x"))
                    .attr("y", parseFloat(y_label.attr("y")) + 18 * j)
                    .attr("dy", "1em")
                    .text(tmp_name[j]);
            }

        }

        document.getElementById('choose_area')
                .addEventListener('change',function(){
            var val = this.value;
            var tmp_id = val.split('_')[1];

            tmp_arcs.remove();
            tmp_arcs = updatepie(tmp_id);

            if (data_name == "area_total_output.csv"){
                var tmp_name = area_name[tmp_id] + "近十年地区生产总值";

                y_label.remove();
                y_label = svg.append("text")
                    .attr("x", width * 0.08)
                    .attr("y", height * 0.5 - 9 * tmp_name.length)
                    .attr("font-size", 18)
                    .attr("font-weight", "bold")
                    .style("font-family", "楷体");

                for (j = 0; j < tmp_name.length; j++){
                    y_label.append("tspan")
                        .attr("x", y_label.attr("x"))
                        .attr("y", parseFloat(y_label.attr("y")) + 18 * j)
                        .attr("dy", "1em")
                        .text(tmp_name[j]);
                }
            }

            if (data_name == "area_first_output.csv"){
                var tmp_name = area_name[tmp_id] + "近十年第一产业增加值";

                y_label.remove();
                y_label = svg.append("text")
                    .attr("x", width * 0.09)
                    .attr("y", height * 0.5 - 9 * tmp_name.length)
                    .attr("font-size", 18)
                    .attr("font-weight", "bold")
                    .style("font-family", "楷体");

                for (j = 0; j < tmp_name.length; j++){
                    y_label.append("tspan")
                        .attr("x", y_label.attr("x"))
                        .attr("y", parseFloat(y_label.attr("y")) + 18 * j)
                        .attr("dy", "1em")
                        .text(tmp_name[j]);
                }
            }

            if (data_name == "area_second_output.csv"){
                var tmp_name = area_name[tmp_id] + "近十年第二产业增加值";

                y_label.remove();
                y_label = svg.append("text")
                    .attr("x", width * 0.09)
                    .attr("y", height * 0.5 - 9 * tmp_name.length)
                    .attr("font-size", 18)
                    .attr("font-weight", "bold")
                    .style("font-family", "楷体");

                for (j = 0; j < tmp_name.length; j++){
                    y_label.append("tspan")
                        .attr("x", y_label.attr("x"))
                        .attr("y", parseFloat(y_label.attr("y")) + 18 * j)
                        .attr("dy", "1em")
                        .text(tmp_name[j]);
                }
            }

            if (data_name == "area_third_output.csv"){
                var tmp_name = area_name[tmp_id] + "近十年第三产业增加值";

                y_label.remove();
                y_label = svg.append("text")
                    .attr("x", width * 0.09)
                    .attr("y", height * 0.5 - 9 * tmp_name.length)
                    .attr("font-size", 18)
                    .attr("font-weight", "bold")
                    .style("font-family", "楷体");

                for (j = 0; j < tmp_name.length; j++){
                    y_label.append("tspan")
                        .attr("x", y_label.attr("x"))
                        .attr("y", parseFloat(y_label.attr("y")) + 18 * j)
                        .attr("dy", "1em")
                        .text(tmp_name[j]);
                }
            }

            if (data_name == "society_solid.csv"){
                var tmp_name = area_name[tmp_id] + "近十年全社会固定资产投资";

                y_label.remove();
                y_label = svg.append("text")
                    .attr("x", width * 0.09)
                    .attr("y", height * 0.5 - 9 * tmp_name.length)
                    .attr("font-size", 18)
                    .attr("font-weight", "bold")
                    .style("font-family", "楷体");

                for (j = 0; j < tmp_name.length; j++){
                    y_label.append("tspan")
                        .attr("x", y_label.attr("x"))
                        .attr("y", parseFloat(y_label.attr("y")) + 18 * j)
                        .attr("dy", "1em")
                        .text(tmp_name[j]);
                }
            }

            if (data_name == "town_solid.csv"){
                var tmp_name = area_name[tmp_id] + "近十年城镇固定资产投资";

                y_label.remove();
                y_label = svg.append("text")
                    .attr("x", width * 0.09)
                    .attr("y", height * 0.5 - 9 * tmp_name.length)
                    .attr("font-size", 18)
                    .attr("font-weight", "bold")
                    .style("font-family", "楷体");

                for (j = 0; j < tmp_name.length; j++){
                    y_label.append("tspan")
                        .attr("x", y_label.attr("x"))
                        .attr("y", parseFloat(y_label.attr("y")) + 18 * j)
                        .attr("dy", "1em")
                        .text(tmp_name[j]);
                }
            }

            if (data_name == "build_develop.csv"){
                var tmp_name = area_name[tmp_id] + "近十年房地产开发投资";

                y_label.remove();
                y_label = svg.append("text")
                    .attr("x", width * 0.09)
                    .attr("y", height * 0.5 - 9 * tmp_name.length)
                    .attr("font-size", 18)
                    .attr("font-weight", "bold")
                    .style("font-family", "楷体");

                for (j = 0; j < tmp_name.length; j++){
                    y_label.append("tspan")
                        .attr("x", y_label.attr("x"))
                        .attr("y", parseFloat(y_label.attr("y")) + 18 * j)
                        .attr("dy", "1em")
                        .text(tmp_name[j]);
                }
            }

            if (data_name == "private_job.csv"){
                var tmp_name = area_name[tmp_id] + "近十年私营企业就业人数";

                y_label.remove();
                y_label = svg.append("text")
                    .attr("x", width * 0.09)
                    .attr("y", height * 0.5 - 9 * tmp_name.length)
                    .attr("font-size", 18)
                    .attr("font-weight", "bold")
                    .style("font-family", "楷体");

                for (j = 0; j < tmp_name.length; j++){
                    y_label.append("tspan")
                        .attr("x", y_label.attr("x"))
                        .attr("y", parseFloat(y_label.attr("y")) + 18 * j)
                        .attr("dy", "1em")
                        .text(tmp_name[j]);
                }
            }

            if (data_name == "single_job.csv"){
                var tmp_name = area_name[tmp_id] + "近十年个体就业人数";

                y_label.remove();
                y_label = svg.append("text")
                    .attr("x", width * 0.09)
                    .attr("y", height * 0.5 - 9 * tmp_name.length)
                    .attr("font-size", 18)
                    .attr("font-weight", "bold")
                    .style("font-family", "楷体");

                for (j = 0; j < tmp_name.length; j++){
                    y_label.append("tspan")
                        .attr("x", y_label.attr("x"))
                        .attr("y", parseFloat(y_label.attr("y")) + 18 * j)
                        .attr("dy", "1em")
                        .text(tmp_name[j]);
                }
            }

            if (data_name == "money_total.csv"){
                var tmp_name = area_name[tmp_id] + "近十年城镇单位就业人员工资总额";

                y_label.remove();
                y_label = svg.append("text")
                    .attr("x", width * 0.09)
                    .attr("y", height * 0.5 - 9 * tmp_name.length)
                    .attr("font-size", 18)
                    .attr("font-weight", "bold")
                    .style("font-family", "楷体");

                for (j = 0; j < tmp_name.length; j++){
                    y_label.append("tspan")
                        .attr("x", y_label.attr("x"))
                        .attr("y", parseFloat(y_label.attr("y")) + 18 * j)
                        .attr("dy", "1em")
                        .text(tmp_name[j]);
                }
            }

            if (data_name == "money_average.csv"){
                var tmp_name = area_name[tmp_id] + "近十年城镇单位就业人员平均工资";

                y_label.remove();
                y_label = svg.append("text")
                    .attr("x", width * 0.09)
                    .attr("y", height * 0.5 - 9 * tmp_name.length)
                    .attr("font-size", 18)
                    .attr("font-weight", "bold")
                    .style("font-family", "楷体");

                for (j = 0; j < tmp_name.length; j++){
                    y_label.append("tspan")
                        .attr("x", y_label.attr("x"))
                        .attr("y", parseFloat(y_label.attr("y")) + 18 * j)
                        .attr("dy", "1em")
                        .text(tmp_name[j]);
                }
            }

            if (data_name == "income.csv"){
                var tmp_name = area_name[tmp_id] + "近十年地方财政一般预算收入";

                y_label.remove();
                y_label = svg.append("text")
                    .attr("x", width * 0.09)
                    .attr("y", height * 0.5 - 9 * tmp_name.length)
                    .attr("font-size", 18)
                    .attr("font-weight", "bold")
                    .style("font-family", "楷体");

                for (j = 0; j < tmp_name.length; j++){
                    y_label.append("tspan")
                        .attr("x", y_label.attr("x"))
                        .attr("y", parseFloat(y_label.attr("y")) + 18 * j)
                        .attr("dy", "1em")
                        .text(tmp_name[j]);
                }
            }

            if (data_name == "output.csv"){
                var tmp_name = area_name[tmp_id] + "近十年地方财政一般预算支出";

                y_label.remove();
                y_label = svg.append("text")
                    .attr("x", width * 0.09)
                    .attr("y", height * 0.5 - 9 * tmp_name.length)
                    .attr("font-size", 18)
                    .attr("font-weight", "bold")
                    .style("font-family", "楷体");

                for (j = 0; j < tmp_name.length; j++){
                    y_label.append("tspan")
                        .attr("x", y_label.attr("x"))
                        .attr("y", parseFloat(y_label.attr("y")) + 18 * j)
                        .attr("dy", "1em")
                        .text(tmp_name[j]);
                }
            }

            if (data_name == "in_out.csv"){
                var tmp_name = area_name[tmp_id] + "近十年经营单位所在地进出口总额";

                y_label.remove();
                y_label = svg.append("text")
                    .attr("x", width * 0.09)
                    .attr("y", height * 0.5 - 9 * tmp_name.length)
                    .attr("font-size", 18)
                    .attr("font-weight", "bold")
                    .style("font-family", "楷体");

                for (j = 0; j < tmp_name.length; j++){
                    y_label.append("tspan")
                        .attr("x", y_label.attr("x"))
                        .attr("y", parseFloat(y_label.attr("y")) + 18 * j)
                        .attr("dy", "1em")
                        .text(tmp_name[j]);
                }
            }

            if (data_name == "out.csv"){
                var tmp_name = area_name[tmp_id] + "近十年经营单位所在地出口总额";

                y_label.remove();
                y_label = svg.append("text")
                    .attr("x", width * 0.09)
                    .attr("y", height * 0.5 - 9 * tmp_name.length)
                    .attr("font-size", 18)
                    .attr("font-weight", "bold")
                    .style("font-family", "楷体");

                for (j = 0; j < tmp_name.length; j++){
                    y_label.append("tspan")
                        .attr("x", y_label.attr("x"))
                        .attr("y", parseFloat(y_label.attr("y")) + 18 * j)
                        .attr("dy", "1em")
                        .text(tmp_name[j]);
                }
            }

            if (data_name == "in.csv"){
                var tmp_name = area_name[tmp_id] + "近十年经营单位所在地进口总额";

                y_label.remove();
                y_label = svg.append("text")
                    .attr("x", width * 0.09)
                    .attr("y", height * 0.5 - 9 * tmp_name.length)
                    .attr("font-size", 18)
                    .attr("font-weight", "bold")
                    .style("font-family", "楷体");

                for (j = 0; j < tmp_name.length; j++){
                    y_label.append("tspan")
                        .attr("x", y_label.attr("x"))
                        .attr("y", parseFloat(y_label.attr("y")) + 18 * j)
                        .attr("dy", "1em")
                        .text(tmp_name[j]);
                }
            }

            if (data_name == "resident_index.csv"){
                var tmp_name = area_name[tmp_id] + "近十年居民消费价格指数";

                y_label.remove();
                y_label = svg.append("text")
                    .attr("x", width * 0.09)
                    .attr("y", height * 0.5 - 9 * tmp_name.length)
                    .attr("font-size", 18)
                    .attr("font-weight", "bold")
                    .style("font-family", "楷体");

                for (j = 0; j < tmp_name.length; j++){
                    y_label.append("tspan")
                        .attr("x", y_label.attr("x"))
                        .attr("y", parseFloat(y_label.attr("y")) + 18 * j)
                        .attr("dy", "1em")
                        .text(tmp_name[j]);
                }
            }

            if (data_name == "good_index.csv"){
                var tmp_name = area_name[tmp_id] + "近十年商品零售价格指数";

                y_label.remove();
                y_label = svg.append("text")
                    .attr("x", width * 0.09)
                    .attr("y", height * 0.5 - 9 * tmp_name.length)
                    .attr("font-size", 18)
                    .attr("font-weight", "bold")
                    .style("font-family", "楷体");

                for (j = 0; j < tmp_name.length; j++){
                    y_label.append("tspan")
                        .attr("x", y_label.attr("x"))
                        .attr("y", parseFloat(y_label.attr("y")) + 18 * j)
                        .attr("dy", "1em")
                        .text(tmp_name[j]);
                }
            }

            if (data_name == "total_good.csv"){
                var tmp_name = area_name[tmp_id] + "近十年社会消费品零售总额";

                y_label.remove();
                y_label = svg.append("text")
                    .attr("x", width * 0.09)
                    .attr("y", height * 0.5 - 9 * tmp_name.length)
                    .attr("font-size", 18)
                    .attr("font-weight", "bold")
                    .style("font-family", "楷体");

                for (j = 0; j < tmp_name.length; j++){
                    y_label.append("tspan")
                        .attr("x", y_label.attr("x"))
                        .attr("y", parseFloat(y_label.attr("y")) + 18 * j)
                        .attr("dy", "1em")
                        .text(tmp_name[j]);
                }
            }
        })

    })

    }

    // give the initial view
    visualization("area_total_output.csv", "6");

    // when the total output is clicked
    $("#total_num").on("click", function() {
        var obj = document.getElementById("choose_area");
        var index = obj.selectedIndex;
        var value = obj.options[index].value;
        var curr_id = value.split("_")[1];
        y_label.remove();
        tmp_arcs.remove();
        visualization("area_total_output.csv", curr_id);
    })

    // when the output of the first industry is clicked
    $("#first_num").on("click", function() {
        var obj = document.getElementById("choose_area");
        var index = obj.selectedIndex;
        var value = obj.options[index].value;
        var curr_id = value.split("_")[1];
        console.log(curr_id);
        y_label.remove();
        tmp_arcs.remove();
        visualization("area_first_output.csv", curr_id);
    })

    // when the output of the second industry is clicked
    $("#second_num").on("click", function() {
        var obj = document.getElementById("choose_area");
        var index = obj.selectedIndex;
        var value = obj.options[index].value;
        var curr_id = value.split("_")[1];
        y_label.remove();
        tmp_arcs.remove();
        visualization("area_second_output.csv", curr_id);
    })

    // when the output of the third industry is clicked
    $("#third_num").on("click", function() {
        var obj = document.getElementById("choose_area");
        var index = obj.selectedIndex;
        var value = obj.options[index].value;
        var curr_id = value.split("_")[1];
        y_label.remove();
        tmp_arcs.remove();
        visualization("area_third_output.csv", curr_id);
    })

    // when the society investment is clicked
    $("#society_solid").on("click", function() {
        var obj = document.getElementById("choose_area");
        var index = obj.selectedIndex;
        var value = obj.options[index].value;
        var curr_id = value.split("_")[1];
        y_label.remove();
        tmp_arcs.remove();
        visualization("society_solid.csv", curr_id);
    })

    // when the town investment is clicked
    $("#town_solid").on("click", function() {
        var obj = document.getElementById("choose_area");
        var index = obj.selectedIndex;
        var value = obj.options[index].value;
        var curr_id = value.split("_")[1];
        y_label.remove();
        tmp_arcs.remove();
        visualization("town_solid.csv", curr_id);
    })

    // when the real estate development is clicked
    $("#build_develop").on("click", function() {
        var obj = document.getElementById("choose_area");
        var index = obj.selectedIndex;
        var value = obj.options[index].value;
        var curr_id = value.split("_")[1];
        y_label.remove();
        tmp_arcs.remove();
        visualization("build_develop.csv", curr_id);
    })

    // when the private company is clicked
    $("#private_job").on("click", function() {
        var obj = document.getElementById("choose_area");
        var index = obj.selectedIndex;
        var value = obj.options[index].value;
        var curr_id = value.split("_")[1];
        y_label.remove();
        tmp_arcs.remove();
        visualization("private_job.csv", curr_id);
    })

    // when the single worker is clicked
    $("#single_job").on("click", function() {
        var obj = document.getElementById("choose_area");
        var index = obj.selectedIndex;
        var value = obj.options[index].value;
        var curr_id = value.split("_")[1];
        y_label.remove();
        tmp_arcs.remove();
        visualization("single_job.csv", curr_id);
    })

    // when the total money is clicked
    $("#money_total").on("click", function() {
        var obj = document.getElementById("choose_area");
        var index = obj.selectedIndex;
        var value = obj.options[index].value;
        var curr_id = value.split("_")[1];
        y_label.remove();
        tmp_arcs.remove();
        visualization("money_total.csv", curr_id);
    })

    // when the average money is clicked
    $("#money_average").on("click", function() {
        var obj = document.getElementById("choose_area");
        var index = obj.selectedIndex;
        var value = obj.options[index].value;
        var curr_id = value.split("_")[1];
        y_label.remove();
        tmp_arcs.remove();
        visualization("money_average.csv", curr_id);
    })

    // when the income is clicked
    $("#income").on("click", function() {
        var obj = document.getElementById("choose_area");
        var index = obj.selectedIndex;
        var value = obj.options[index].value;
        var curr_id = value.split("_")[1];
        y_label.remove();
        tmp_arcs.remove();
        visualization("income.csv", curr_id);
    })

    // when the output is clicked
    $("#output").on("click", function() {
        var obj = document.getElementById("choose_area");
        var index = obj.selectedIndex;
        var value = obj.options[index].value;
        var curr_id = value.split("_")[1];
        y_label.remove();
        tmp_arcs.remove();
        visualization("output.csv", curr_id);
    })

    // when the total input and output is clicked
    $("#in_out").on("click", function() {
        var obj = document.getElementById("choose_area");
        var index = obj.selectedIndex;
        var value = obj.options[index].value;
        var curr_id = value.split("_")[1];
        y_label.remove();
        tmp_arcs.remove();
        visualization("in_out.csv", curr_id);
    })

    // when the total output is clicked
    $("#out").on("click", function() {
        var obj = document.getElementById("choose_area");
        var index = obj.selectedIndex;
        var value = obj.options[index].value;
        var curr_id = value.split("_")[1];
        y_label.remove();
        tmp_arcs.remove();
        visualization("out.csv", curr_id);
    })

    // when the total input is clicked
    $("#in").on("click", function() {
        var obj = document.getElementById("choose_area");
        var index = obj.selectedIndex;
        var value = obj.options[index].value;
        var curr_id = value.split("_")[1];
        y_label.remove();
        tmp_arcs.remove();
        visualization("in.csv", curr_id);
    })

    // when the resident index is clicked
    $("#resident_index").on("click", function() {
        var obj = document.getElementById("choose_area");
        var index = obj.selectedIndex;
        var value = obj.options[index].value;
        var curr_id = value.split("_")[1];
        y_label.remove();
        tmp_arcs.remove();
        visualization("resident_index.csv", curr_id);
    })

    // when the good index is clicked
    $("#good_index").on("click", function() {
        var obj = document.getElementById("choose_area");
        var index = obj.selectedIndex;
        var value = obj.options[index].value;
        var curr_id = value.split("_")[1];
        y_label.remove();
        tmp_arcs.remove();
        visualization("good_index.csv", curr_id);
    })

    // when the total good is clicked
    $("#total_good").on("click", function() {
        var obj = document.getElementById("choose_area");
        var index = obj.selectedIndex;
        var value = obj.options[index].value;
        var curr_id = value.split("_")[1];
        y_label.remove();
        tmp_arcs.remove();
        visualization("total_good.csv", curr_id);
    })

    Observer.addView(view4);
    return view4;

}
