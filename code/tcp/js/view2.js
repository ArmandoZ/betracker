// This is the view of the nation data
function View2(Observer) {
    var view2 = {};

    var $bmDiv=$("#top-right-right");
    var svgwidth=$bmDiv.width();
    var svgheight=$bmDiv.height();
    var margin = {top: 20, right: 10, bottom: 30, left: 80};
    var width = svgwidth - margin.left - margin.right;
    var height = svgheight - margin.top - margin.bottom;

    var svg=d3.select("#view2")
            .append("svg")
            .attr("width", svgwidth)
            .attr("height", svgheight);

    var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scaleBand()
                .domain([2007,2008,2009,2010,2011,2012,2013,2014,2015,2016])
                .range([0, width]).padding(0.15);
    var y = d3.scaleLinear().rangeRound([height, 0]);

    var xAxis=d3.axisBottom(x);
    var yAxis=d3.axisLeft(y).ticks(10, "d");

    var xAxisg=g.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + height + ")");
    var yAxisg=g.append("g")
            .attr("class", "axis axis--y");

    var transition = d3.transition()
        .duration(750)
        .ease(d3.easeLinear);

    var addcnt=0;
    var detail = 0;

    var y_label = 0;

    var label = svg.append("text");

    // define the corresponding name of every province
    var area_name = {"1": "甘肃", "2": "青海", "3": "广西", "4": "贵州", "5": "重庆", "6": "北京", "7": "福建",
            "8": "安徽", "9": "广东", "10": "西藏", "11": "新疆", "12": "海南", "13": "宁夏", "14": "陕西", "15": "山西",
            "16": "湖北", "17": "湖南", "18": "四川", "19": "云南", "20": "河北", "21": "河南", "22": "辽宁", "23": "山东",
            "24": "天津", "25": "江西", "26": "江苏", "27": "上海", "28": "浙江", "29": "吉林", "30": "内蒙古", "31": "黑龙江"};

    // define the function to draw the charts
    function visualization(data_name, curr_id) {
    d3.csv("data/" + data_name, function(d) {
        return d;
    },function(error, data) {
        if (error) throw error;

        // define the unit used in the view
        var tmp_unit = "(亿元)";

        if (data_name == "private_job.csv"){
            tmp_unit = "(万人)";
        }
        if (data_name == "single_job.csv"){
            tmp_unit = "(万人)";
        }
        if (data_name == "money_average.csv"){
            tmp_unit = "(元)";
        }
        if (data_name == "in_out.csv"){
            tmp_unit = "(千美元)";
        }
        if (data_name == "in.csv"){
            tmp_unit = "(千美元)";
        }
        if (data_name == "out.csv"){
            tmp_unit = "(千美元)";
        }
        if (data_name == "resident_index.csv"){
            tmp_unit = "";
        }
        if (data_name == "good_index.csv"){
            tmp_unit = "";
        }

        // update the view according to the id of province
        function updatebars(area_id){
            var tmp_idx = 0;
            for (i = 0; i < data.length; i++){
                if (data[i].id == area_id){
                    tmp_idx = i;
                }
            }

            // get the max value among ten years
            var tmp_max = 0.0;
            if (parseFloat(data[tmp_idx].y2007) > tmp_max){
                tmp_max = parseFloat(data[tmp_idx].y2007);
            }
            if (parseFloat(data[tmp_idx].y2008) > tmp_max){
                tmp_max = parseFloat(data[tmp_idx].y2008);
            }
            if (parseFloat(data[tmp_idx].y2009) > tmp_max){
                tmp_max = parseFloat(data[tmp_idx].y2009);
            }
            if (parseFloat(data[tmp_idx].y2010) > tmp_max){
                tmp_max = parseFloat(data[tmp_idx].y2010);
            }
            if (parseFloat(data[tmp_idx].y2011) > tmp_max){
                tmp_max = parseFloat(data[tmp_idx].y2011);
            }
            if (parseFloat(data[tmp_idx].y2012) > tmp_max){
                tmp_max = parseFloat(data[tmp_idx].y2012);
            }
            if (parseFloat(data[tmp_idx].y2013) > tmp_max){
                tmp_max = parseFloat(data[tmp_idx].y2013);
            }
            if (parseFloat(data[tmp_idx].y2014) > tmp_max){
                tmp_max = parseFloat(data[tmp_idx].y2014);
            }
            if (parseFloat(data[tmp_idx].y2015) > tmp_max){
                tmp_max = parseFloat(data[tmp_idx].y2015);
            }
            if (parseFloat(data[tmp_idx].y2016) > tmp_max){
                tmp_max = parseFloat(data[tmp_idx].y2016);
            }

            y.domain([0, tmp_max]);

            if (data_name == "area_total_output.csv"){
                label.attr("x", width * 0.4)
                    .attr("y", height * 1 / 20)
                    .text(area_name[area_id] + "近十年地区生产总值")
                    .attr("fill", "black")
                    .attr("font-family", "楷体")
                    .attr("font-size", "18px")
                    .attr("font-weight", "bold");
            }

            if (data_name == "area_first_output.csv"){
                label.attr("x", width * 0.4)
                    .attr("y", height * 1 / 20)
                    .text(area_name[area_id] + "近十年第一产业增加值")
                    .attr("fill", "black")
                    .attr("font-family", "楷体")
                    .attr("font-size", "18px")
                    .attr("font-weight", "bold");
            }

            if (data_name == "area_second_output.csv"){
                label.attr("x", width * 0.4)
                    .attr("y", height * 1 / 20)
                    .text(area_name[area_id] + "近十年第二产业增加值")
                    .attr("fill", "black")
                    .attr("font-family", "楷体")
                    .attr("font-size", "18px")
                    .attr("font-weight", "bold");
            }

            if (data_name == "area_third_output.csv"){
                label.attr("x", width * 0.4)
                    .attr("y", height * 1 / 20)
                    .text(area_name[area_id] + "近十年第三产业增加值")
                    .attr("fill", "black")
                    .attr("font-family", "楷体")
                    .attr("font-size", "18px")
                    .attr("font-weight", "bold");
            }

            if (data_name == "society_solid.csv"){
                label.attr("x", width * 0.4)
                    .attr("y", height * 1 / 20)
                    .text(area_name[area_id] + "近十年全社会固定资产投资")
                    .attr("fill", "black")
                    .attr("font-family", "楷体")
                    .attr("font-size", "18px")
                    .attr("font-weight", "bold");
            }

            if (data_name == "town_solid.csv"){
                label.attr("x", width * 0.4)
                    .attr("y", height * 1 / 20)
                    .text(area_name[area_id] + "近十年城镇固定资产投资")
                    .attr("fill", "black")
                    .attr("font-family", "楷体")
                    .attr("font-size", "18px")
                    .attr("font-weight", "bold");
            }

            if (data_name == "build_develop.csv"){
                label.attr("x", width * 0.4)
                    .attr("y", height * 1 / 20)
                    .text(area_name[area_id] + "近十年房地产开发投资")
                    .attr("fill", "black")
                    .attr("font-family", "楷体")
                    .attr("font-size", "18px")
                    .attr("font-weight", "bold");
            }

            if (data_name == "private_job.csv"){
                label.attr("x", width * 0.4)
                    .attr("y", height * 1 / 20)
                    .text(area_name[area_id] + "近十年私营企业就业人数")
                    .attr("fill", "black")
                    .attr("font-family", "楷体")
                    .attr("font-size", "18px")
                    .attr("font-weight", "bold");
            }

            if (data_name == "single_job.csv"){
                label.attr("x", width * 0.4)
                    .attr("y", height * 1 / 20)
                    .text(area_name[area_id] + "近十年个体就业人数")
                    .attr("fill", "black")
                    .attr("font-family", "楷体")
                    .attr("font-size", "18px")
                    .attr("font-weight", "bold");
            }

            if (data_name == "money_total.csv"){
                label.attr("x", width * 0.35)
                    .attr("y", height * 1 / 20)
                    .text(area_name[area_id] + "近十年城镇单位就业人员工资总额")
                    .attr("fill", "black")
                    .attr("font-family", "楷体")
                    .attr("font-size", "18px")
                    .attr("font-weight", "bold");
            }

            if (data_name == "money_average.csv"){
                label.attr("x", width * 0.35)
                    .attr("y", height * 1 / 20)
                    .text(area_name[area_id] + "近十年城镇单位就业人员平均工资")
                    .attr("fill", "black")
                    .attr("font-family", "楷体")
                    .attr("font-size", "18px")
                    .attr("font-weight", "bold");
            }

            if (data_name == "income.csv"){
                label.attr("x", width * 0.35)
                    .attr("y", height * 1 / 20)
                    .text(area_name[area_id] + "近十年地方财政一般预算收入")
                    .attr("fill", "black")
                    .attr("font-family", "楷体")
                    .attr("font-size", "18px")
                    .attr("font-weight", "bold");
            }

            if (data_name == "output.csv"){
                label.attr("x", width * 0.35)
                    .attr("y", height * 1 / 20)
                    .text(area_name[area_id] + "近十年地方财政一般预算支出")
                    .attr("fill", "black")
                    .attr("font-family", "楷体")
                    .attr("font-size", "18px")
                    .attr("font-weight", "bold");
            }

            if (data_name == "in_out.csv"){
                label.attr("x", width * 0.35)
                    .attr("y", height * 1 / 20)
                    .text(area_name[area_id] + "近十年经营单位所在地进出口总额")
                    .attr("fill", "black")
                    .attr("font-family", "楷体")
                    .attr("font-size", "18px")
                    .attr("font-weight", "bold");
            }

            if (data_name == "out.csv"){
                label.attr("x", width * 0.35)
                    .attr("y", height * 1 / 20)
                    .text(area_name[area_id] + "近十年经营单位所在地出口总额")
                    .attr("fill", "black")
                    .attr("font-family", "楷体")
                    .attr("font-size", "18px")
                    .attr("font-weight", "bold");
            }

            if (data_name == "in.csv"){
                label.attr("x", width * 0.35)
                    .attr("y", height * 1 / 20)
                    .text(area_name[area_id] + "近十年经营单位所在地进口总额")
                    .attr("fill", "black")
                    .attr("font-family", "楷体")
                    .attr("font-size", "18px")
                    .attr("font-weight", "bold");
            }

            if (data_name == "resident_index.csv"){
                label.attr("x", width * 0.45)
                    .attr("y", height * 1 / 20)
                    .text(area_name[area_id] + "近十年居民消费价格指数")
                    .attr("fill", "black")
                    .attr("font-family", "楷体")
                    .attr("font-size", "18px")
                    .attr("font-weight", "bold");
            }

            if (data_name == "good_index.csv"){
                label.attr("x", width * 0.45)
                    .attr("y", height * 1 / 20)
                    .text(area_name[area_id] + "近十年商品零售价格指数")
                    .attr("fill", "black")
                    .attr("font-family", "楷体")
                    .attr("font-size", "18px")
                    .attr("font-weight", "bold");
            }

            if (data_name == "total_good.csv"){
                label.attr("x", width * 0.40)
                    .attr("y", height * 1 / 20)
                    .text(area_name[area_id] + "近十年社会消费品零售总额")
                    .attr("fill", "black")
                    .attr("font-family", "楷体")
                    .attr("font-size", "18px")
                    .attr("font-weight", "bold");
            }

            // remove the previous bars
            svg.selectAll("rect").remove();

            // update the bars for 2007
            var bars_1 = g.append("g")
                .append("rect")
                .attr("class", "bar");

            bars_1.transition(transition).delay(0)
                .attr("x", function(d) { return x(2007); })
            bars_1.attr("y", function(d) { return y(data[tmp_idx].y2007); })
                .attr("width", x.bandwidth())
                .attr("height", function(d) { return height - y(data[tmp_idx].y2007); })
                .attr("fill","#02CFEE")
                .on("mouseover",function(d,i){
                    bars_1.attr("fill", "yellow");
                })
                .on("mouseout",function(d,i){
                    bars_1.attr("fill", "#02CFEE");
                })
                .append("title")
                .text("2007: " + data[tmp_idx].y2007 +tmp_unit);

            // update the bars for 2008
            var bars_2 = g.append("g")
                .append("rect")
                .attr("class", "bar");

            bars_2.transition(transition).delay(30)
                .attr("x", function(d) { return x(2008); })
            bars_2.attr("y", function(d) { return y(data[tmp_idx].y2008); })
                .attr("width", x.bandwidth())
                .attr("height", function(d) { return height - y(data[tmp_idx].y2008); })
                .attr("fill","#02CFEE")
                .on("mouseover",function(d,i){
                    bars_2.attr("fill", "yellow");
                })
                .on("mouseout",function(d,i){
                    bars_2.attr("fill", "#02CFEE");
                })
                .append("title")
                .text("2008: " + data[tmp_idx].y2008 +tmp_unit);

            // update the bars for 2009
            var bars_3 = g.append("g")
                .append("rect")
                .attr("class", "bar");

            bars_3.transition(transition).delay(60)
                .attr("x", function(d) { return x(2009); })
            bars_3.attr("y", function(d) { return y(data[tmp_idx].y2009); })
                .attr("width", x.bandwidth())
                .attr("height", function(d) { return height - y(data[tmp_idx].y2009); })
                .attr("fill","#02CFEE")
                .on("mouseover",function(d,i){
                    bars_3.attr("fill", "yellow");
                })
                .on("mouseout",function(d,i){
                    bars_3.attr("fill", "#02CFEE");
                })
                .append("title")
                .text("2009: " + data[tmp_idx].y2009 +tmp_unit);

            // update the bars for 2010
            var bars_4 = g.append("g")
                .append("rect")
                .attr("class", "bar");

            bars_4.transition(transition).delay(90)
                .attr("x", function(d) { return x(2010); })
            bars_4.attr("y", function(d) { return y(data[tmp_idx].y2010); })
                .attr("width", x.bandwidth())
                .attr("height", function(d) { return height - y(data[tmp_idx].y2010); })
                .attr("fill","#02CFEE")
                .on("mouseover",function(d,i){
                    bars_4.attr("fill", "yellow");
                })
                .on("mouseout",function(d,i){
                    bars_4.attr("fill", "#02CFEE");
                })
                .append("title")
                .text("2010: " + data[tmp_idx].y2010 +tmp_unit);

            // update the bars for 2011
            var bars_5 = g.append("g")
                .append("rect")
                .attr("class", "bar");

            bars_5.transition(transition).delay(120)
                .attr("x", function(d) { return x(2011); })
            bars_5.attr("y", function(d) { return y(data[tmp_idx].y2011); })
                .attr("width", x.bandwidth())
                .attr("height", function(d) { return height - y(data[tmp_idx].y2011); })
                .attr("fill","#02CFEE")
                .on("mouseover",function(d,i){
                    bars_5.attr("fill", "yellow");
                })
                .on("mouseout",function(d,i){
                    bars_5.attr("fill", "#02CFEE");
                })
                .append("title")
                .text("2011: " + data[tmp_idx].y2011 +tmp_unit);

            // update the bars for 2012
            var bars_6 = g.append("g")
                .append("rect")
                .attr("class", "bar");

            bars_6.transition(transition).delay(150)
                .attr("x", function(d) { return x(2012); })
            bars_6.attr("y", function(d) { return y(data[tmp_idx].y2012); })
                .attr("width", x.bandwidth())
                .attr("height", function(d) { return height - y(data[tmp_idx].y2012); })
                .attr("fill","#02CFEE")
                .on("mouseover",function(d,i){
                    bars_6.attr("fill", "yellow");
                })
                .on("mouseout",function(d,i){
                    bars_6.attr("fill", "#02CFEE");
                })
                .append("title")
                .text("2012: " + data[tmp_idx].y2012 +tmp_unit);

            // update the bars for 2013
            var bars_7 = g.append("g")
                .append("rect")
                .attr("class", "bar");

            bars_7.transition(transition).delay(180)
                .attr("x", function(d) { return x(2013); })
            bars_7.attr("y", function(d) { return y(data[tmp_idx].y2013); })
                .attr("width", x.bandwidth())
                .attr("height", function(d) { return height - y(data[tmp_idx].y2013); })
                .attr("fill","#02CFEE")
                .on("mouseover",function(d,i){
                    bars_7.attr("fill", "yellow");
                })
                .on("mouseout",function(d,i){
                    bars_7.attr("fill", "#02CFEE");
                })
                .append("title")
                .text("2013: " + data[tmp_idx].y2013 +tmp_unit);

            // update the bars for 2014
            var bars_8 = g.append("g")
                .append("rect")
                .attr("class", "bar");

            bars_8.transition(transition).delay(210)
                .attr("x", function(d) { return x(2014); })
            bars_8.attr("y", function(d) { return y(data[tmp_idx].y2014); })
                .attr("width", x.bandwidth())
                .attr("height", function(d) { return height - y(data[tmp_idx].y2014); })
                .attr("fill","#02CFEE")
                .on("mouseover",function(d,i){
                    bars_8.attr("fill", "yellow");
                })
                .on("mouseout",function(d,i){
                    bars_8.attr("fill", "#02CFEE");
                })
                .append("title")
                .text("2014: " + data[tmp_idx].y2014 +tmp_unit);

            // update the bars for 2015
            var bars_9 = g.append("g")
                .append("rect")
                .attr("class", "bar");

            bars_9.transition(transition).delay(240)
                .attr("x", function(d) { return x(2015); })
            bars_9.attr("y", function(d) { return y(data[tmp_idx].y2015); })
                .attr("width", x.bandwidth())
                .attr("height", function(d) { return height - y(data[tmp_idx].y2015); })
                .attr("fill","#02CFEE")
                .on("mouseover",function(d,i){
                    bars_9.attr("fill", "yellow");
                })
                .on("mouseout",function(d,i){
                    bars_9.attr("fill", "#02CFEE");
                })
                .append("title")
                .text("2015: " + data[tmp_idx].y2015 +tmp_unit);

            // update the bars for 2016
            var bars_10 = g.append("g")
                .append("rect")
                .attr("class", "bar");

            bars_10.transition(transition).delay(270)
                .attr("x", function(d) { return x(2016); })
            bars_10.attr("y", function(d) { return y(data[tmp_idx].y2016); })
                .attr("width", x.bandwidth())
                .attr("height", function(d) { return height - y(data[tmp_idx].y2016); })
                .attr("fill","#02CFEE")
                .on("mouseover",function(d,i){
                    bars_10.attr("fill", "yellow");
                })
                .on("mouseout",function(d,i){
                    bars_10.attr("fill", "#02CFEE");
                })
                .append("title")
                .text("2016: " + data[tmp_idx].y2016 +tmp_unit);

            return tmp_max;

        }

        max_val = updatebars(curr_id);

        y.domain([0, max_val]);

        xAxisg.call(xAxis);
        yAxisg.call(yAxis);

        if (data_name == "area_total_output.csv"){
            y_label = yAxisg.append("text")
                .attr("transform", "translate(75,-20)")
                .attr("y", 6)
                .attr("dy", "0.71em")
                .attr("text-anchor", "end")
                .attr("font-weight", "bold")
                .text("地区生产总值(亿元)")
                .style("font-family", "楷体");
        }

        if (data_name == "area_first_output.csv"){
            y_label = yAxisg.append("text")
                .attr("transform", "translate(95,-20)")
                .attr("y", 6)
                .attr("dy", "0.71em")
                .attr("text-anchor", "end")
                .attr("font-weight", "bold")
                .text("第一产业增加值(亿元)")
                .style("font-family", "楷体");
        }

        if (data_name == "area_second_output.csv"){
            y_label = yAxisg.append("text")
                .attr("transform", "translate(95,-20)")
                .attr("y", 6)
                .attr("dy", "0.71em")
                .attr("text-anchor", "end")
                .attr("font-weight", "bold")
                .text("第二产业增加值(亿元)")
                .style("font-family", "楷体");
        }

        if(data_name == "area_third_output.csv"){
            y_label = yAxisg.append("text")
                .attr("transform", "translate(95,-20)")
                .attr("y", 6)
                .attr("dy", "0.71em")
                .attr("text-anchor", "end")
                .attr("font-weight", "bold")
                .text("第三产业增加值(亿元)")
                .style("font-family", "楷体");
        }

        if(data_name == "society_solid.csv"){
            y_label = yAxisg.append("text")
                .attr("transform", "translate(115,-20)")
                .attr("y", 6)
                .attr("dy", "0.71em")
                .attr("text-anchor", "end")
                .attr("font-weight", "bold")
                .text("全社会固定资产投资(亿元)")
                .style("font-family", "楷体");
        }

        if(data_name == "town_solid.csv"){
            y_label = yAxisg.append("text")
                .attr("transform", "translate(108,-20)")
                .attr("y", 6)
                .attr("dy", "0.71em")
                .attr("text-anchor", "end")
                .attr("font-weight", "bold")
                .text("城镇固定资产投资(亿元)")
                .style("font-family", "楷体");
        }

        if(data_name == "build_develop.csv"){
            y_label = yAxisg.append("text")
                .attr("transform", "translate(100,-20)")
                .attr("y", 6)
                .attr("dy", "0.71em")
                .attr("text-anchor", "end")
                .attr("font-weight", "bold")
                .text("房地产开发投资(亿元)")
                .style("font-family", "楷体");
        }

        if(data_name == "private_job.csv"){
            y_label = yAxisg.append("text")
                .attr("transform", "translate(110,-20)")
                .attr("y", 6)
                .attr("dy", "0.71em")
                .attr("text-anchor", "end")
                .attr("font-weight", "bold")
                .text("私营企业就业人数(万人)")
                .style("font-family", "楷体");
        }

        if(data_name == "single_job.csv"){
            y_label = yAxisg.append("text")
                .attr("transform", "translate(90,-20)")
                .attr("y", 6)
                .attr("dy", "0.71em")
                .attr("text-anchor", "end")
                .attr("font-weight", "bold")
                .text("个体就业人数(万人)")
                .style("font-family", "楷体");
        }

        if(data_name == "money_total.csv"){
            y_label = yAxisg.append("text")
                .attr("transform", "translate(50,-20)")
                .attr("y", 6)
                .attr("dy", "0.71em")
                .attr("text-anchor", "end")
                .attr("font-weight", "bold")
                .text("工资总额(亿元)")
                .style("font-family", "楷体");
        }

        if(data_name == "money_average.csv"){
            y_label = yAxisg.append("text")
                .attr("transform", "translate(50,-20)")
                .attr("y", 6)
                .attr("dy", "0.71em")
                .attr("text-anchor", "end")
                .attr("font-weight", "bold")
                .text("平均工资(元)")
                .style("font-family", "楷体");
        }

        if(data_name == "income.csv"){
            y_label = yAxisg.append("text")
                .attr("transform", "translate(50,-20)")
                .attr("y", 6)
                .attr("dy", "0.71em")
                .attr("text-anchor", "end")
                .attr("font-weight", "bold")
                .text("财政收入(亿元)")
                .style("font-family", "楷体");
        }

        if(data_name == "output.csv"){
            y_label = yAxisg.append("text")
                .attr("transform", "translate(50,-20)")
                .attr("y", 6)
                .attr("dy", "0.71em")
                .attr("text-anchor", "end")
                .attr("font-weight", "bold")
                .text("财政支出(亿元)")
                .style("font-family", "楷体");
        }

        if(data_name == "in_out.csv"){
            y_label = yAxisg.append("text")
                .attr("transform", "translate(65,-20)")
                .attr("y", 6)
                .attr("dy", "0.71em")
                .attr("text-anchor", "end")
                .attr("font-weight", "bold")
                .text("进出口总额(千美元)")
                .style("font-family", "楷体");
        }

        if(data_name == "out.csv"){
            y_label = yAxisg.append("text")
                .attr("transform", "translate(60,-20)")
                .attr("y", 6)
                .attr("dy", "0.71em")
                .attr("text-anchor", "end")
                .attr("font-weight", "bold")
                .text("出口总额(千美元)")
                .style("font-family", "楷体");
        }

        if(data_name == "in.csv"){
            y_label = yAxisg.append("text")
                .attr("transform", "translate(60,-20)")
                .attr("y", 6)
                .attr("dy", "0.71em")
                .attr("text-anchor", "end")
                .attr("font-weight", "bold")
                .text("进口总额(千美元)")
                .style("font-family", "楷体");
        }

        if(data_name == "resident_index.csv"){
            y_label = yAxisg.append("text")
                .attr("transform", "translate(60,-20)")
                .attr("y", 6)
                .attr("dy", "0.71em")
                .attr("text-anchor", "end")
                .attr("font-weight", "bold")
                .text("居民消费价格指数")
                .style("font-family", "楷体");
        }

        if(data_name == "good_index.csv"){
            y_label = yAxisg.append("text")
                .attr("transform", "translate(60,-20)")
                .attr("y", 6)
                .attr("dy", "0.71em")
                .attr("text-anchor", "end")
                .attr("font-weight", "bold")
                .text("商品零售价格指数")
                .style("font-family", "楷体");
        }

        if(data_name == "total_good.csv"){
            y_label = yAxisg.append("text")
                .attr("transform", "translate(60,-20)")
                .attr("y", 6)
                .attr("dy", "0.71em")
                .attr("text-anchor", "end")
                .attr("font-weight", "bold")
                .text("社会消费品零售总额")
                .style("font-family", "楷体");
        }

        document.getElementById('choose_area')
                .addEventListener('change',function(){
                    var val = this.value;

                    var tmp_id = val.split('_')[1];

                    if (data_name == "area_total_output.csv"){
                        label.text(area_name[tmp_id] + "近十年地区生产总值");
                    }

                    if (data_name == "area_first_output.csv"){
                        label.text(area_name[tmp_id] + "近十年第一产业增加值");
                    }

                    if (data_name == "area_second_output.csv"){
                        label.text(area_name[tmp_id] + "近十年第二产业增加值");
                    }

                    if (data_name == "area_third_output.csv"){
                        label.text(area_name[tmp_id] + "近十年第三产业增加值");
                    }

                    if (data_name == "society_solid.csv"){
                        label.text(area_name[tmp_id] + "近十年全社会固定资产投资");
                    }

                    if (data_name == "town_solid.csv"){
                        label.text(area_name[tmp_id] + "近十年城镇固定资产投资");
                    }

                    if (data_name == "build_develop.csv"){
                        label.text(area_name[tmp_id] + "近十年房地产开发投资");
                    }

                    if (data_name == "private_job.csv"){
                        label.text(area_name[tmp_id] + "近十年私营企业就业人数");
                    }

                    if (data_name == "single_job.csv"){
                        label.text(area_name[tmp_id] + "近十年个体就业人数");
                    }

                    if (data_name == "money_total.csv"){
                        label.text(area_name[tmp_id] + "近十年城镇单位就业人员工资总额");
                    }

                    if (data_name == "money_average.csv"){
                        label.text(area_name[tmp_id] + "近十年城镇单位就业人员平均工资");
                    }

                    if (data_name == "income.csv"){
                        label.text(area_name[tmp_id] + "近十年地方财政一般预算收入");
                    }

                    if (data_name == "output.csv"){
                        label.text(area_name[tmp_id] + "近十年地方财政一般预算支出");
                    }

                    if (data_name == "in_out.csv"){
                        label.text(area_name[tmp_id] + "近十年经营单位所在地进出口总额");
                    }

                    if (data_name == "out.csv"){
                        label.text(area_name[tmp_id] + "近十年经营单位所在地出口总额");
                    }

                    if (data_name == "in.csv"){
                        label.text(area_name[tmp_id] + "近十年经营单位所在地进口总额");
                    }

                    if (data_name == "resident_index.csv"){
                        label.text(area_name[tmp_id] + "近十年居民消费价格指数");
                    }

                    if (data_name == "good_index.csv"){
                        label.text(area_name[tmp_id] + "近十年商品零售价格指数");
                    }

                    if (data_name == "total_good.csv"){
                        label.text(area_name[tmp_id] + "近十年社会消费品零售总额");
                    }

                    svg.selectAll("rect").remove();
                    var tmp_max = updatebars(tmp_id);

                    y.domain([0, tmp_max]);

                    yAxisg.call(yAxis);
        })

    });

    }

    visualization("area_total_output.csv", "6");

    // when the total output is clicked
    $("#total_num").on("click", function() {
        var obj = document.getElementById("choose_area");
        var index = obj.selectedIndex;
        var value = obj.options[index].value;
        var curr_id = value.split("_")[1];
        y_label.remove();
        visualization("area_total_output.csv", curr_id);
    })

    // when the output of the first industry is clicked
    $("#first_num").on("click", function() {
        var obj = document.getElementById("choose_area");
        var index = obj.selectedIndex;
        var value = obj.options[index].value;
        var curr_id = value.split("_")[1];
        y_label.remove();
        visualization("area_first_output.csv", curr_id);
    })

    // when the output of the second industry is clicked
    $("#second_num").on("click", function() {
        var obj = document.getElementById("choose_area");
        var index = obj.selectedIndex;
        var value = obj.options[index].value;
        var curr_id = value.split("_")[1];
        y_label.remove();
        visualization("area_second_output.csv", curr_id);
    })

    // when the output of the third industry is clicked
    $("#third_num").on("click", function() {
        var obj = document.getElementById("choose_area");
        var index = obj.selectedIndex;
        var value = obj.options[index].value;
        var curr_id = value.split("_")[1];
        y_label.remove();
        visualization("area_third_output.csv", curr_id);
    })

    // when the society investment is clicked
    $("#society_solid").on("click", function() {
        var obj = document.getElementById("choose_area");
        var index = obj.selectedIndex;
        var value = obj.options[index].value;
        var curr_id = value.split("_")[1];
        y_label.remove();
        visualization("society_solid.csv", curr_id);
    })

    // when the society investment is clicked
    $("#town_solid").on("click", function() {
        var obj = document.getElementById("choose_area");
        var index = obj.selectedIndex;
        var value = obj.options[index].value;
        var curr_id = value.split("_")[1];
        y_label.remove();
        visualization("town_solid.csv", curr_id);
    })

    // when the real estate development is clicked
    $("#build_develop").on("click", function() {
        var obj = document.getElementById("choose_area");
        var index = obj.selectedIndex;
        var value = obj.options[index].value;
        var curr_id = value.split("_")[1];
        y_label.remove();
        visualization("build_develop.csv", curr_id);
    })

    // when the private company is clicked
    $("#private_job").on("click", function() {
        var obj = document.getElementById("choose_area");
        var index = obj.selectedIndex;
        var value = obj.options[index].value;
        var curr_id = value.split("_")[1];
        y_label.remove();
        visualization("private_job.csv", curr_id);
    })

    // when the single worker is clicked
    $("#single_job").on("click", function() {
        var obj = document.getElementById("choose_area");
        var index = obj.selectedIndex;
        var value = obj.options[index].value;
        var curr_id = value.split("_")[1];
        y_label.remove();
        visualization("single_job.csv", curr_id);
    })

    // when the total money is clicked
    $("#money_total").on("click", function() {
        var obj = document.getElementById("choose_area");
        var index = obj.selectedIndex;
        var value = obj.options[index].value;
        var curr_id = value.split("_")[1];
        y_label.remove();
        visualization("money_total.csv", curr_id);
    })

    // when the average money is clicked
    $("#money_average").on("click", function() {
        var obj = document.getElementById("choose_area");
        var index = obj.selectedIndex;
        var value = obj.options[index].value;
        var curr_id = value.split("_")[1];
        y_label.remove();
        visualization("money_average.csv", curr_id);
    })

    // when the income is clicked
    $("#income").on("click", function() {
        var obj = document.getElementById("choose_area");
        var index = obj.selectedIndex;
        var value = obj.options[index].value;
        var curr_id = value.split("_")[1];
        y_label.remove();
        visualization("income.csv", curr_id);
    })

    // when the output is clicked
    $("#output").on("click", function() {
        var obj = document.getElementById("choose_area");
        var index = obj.selectedIndex;
        var value = obj.options[index].value;
        var curr_id = value.split("_")[1];
        y_label.remove();
        visualization("output.csv", curr_id);
    })

    // when the total input and output is clicked
    $("#in_out").on("click", function() {
        var obj = document.getElementById("choose_area");
        var index = obj.selectedIndex;
        var value = obj.options[index].value;
        var curr_id = value.split("_")[1];
        y_label.remove();
        visualization("in_out.csv", curr_id);
    })

    // when the total output is clicked
    $("#out").on("click", function() {
        var obj = document.getElementById("choose_area");
        var index = obj.selectedIndex;
        var value = obj.options[index].value;
        var curr_id = value.split("_")[1];
        y_label.remove();
        visualization("out.csv", curr_id);
    })

    // when the total input is clicked
    $("#in").on("click", function() {
        var obj = document.getElementById("choose_area");
        var index = obj.selectedIndex;
        var value = obj.options[index].value;
        var curr_id = value.split("_")[1];
        y_label.remove();
        visualization("in.csv", curr_id);
    })

    // when the resident index is clicked
    $("#resident_index").on("click", function() {
        var obj = document.getElementById("choose_area");
        var index = obj.selectedIndex;
        var value = obj.options[index].value;
        var curr_id = value.split("_")[1];
        y_label.remove();
        visualization("resident_index.csv", curr_id);
    })

    // when the good index is clicked
    $("#good_index").on("click", function() {
        var obj = document.getElementById("choose_area");
        var index = obj.selectedIndex;
        var value = obj.options[index].value;
        var curr_id = value.split("_")[1];
        y_label.remove();
        visualization("good_index.csv", curr_id);
    })

    // when the total good is clicked
    $("#total_good").on("click", function() {
        var obj = document.getElementById("choose_area");
        var index = obj.selectedIndex;
        var value = obj.options[index].value;
        var curr_id = value.split("_")[1];
        y_label.remove();
        visualization("total_good.csv", curr_id);
    })

    Observer.addView(view2);
    return view2;

}
