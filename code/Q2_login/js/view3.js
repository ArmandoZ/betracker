// This is the view of the nation data
function View3(Observer) {
    var view3 = {};

    var $bmDiv=$("#bottom-left-div");
    var svgwidth=$bmDiv.width();
    var svgheight=$bmDiv.height();
    var margin = {top: 50, right: 10, bottom: 10, left: 70};
    var width = svgwidth - margin.left - margin.right;
    var height = svgheight - margin.top - margin.bottom;

    var svg=d3.select("#view3")
            .append("svg")
            .attr("width", svgwidth)
            .attr("height", svgheight);

    var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scaleBand()
                .domain([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31])
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

    // add the title
    var label = svg.append("text");

    // define the corresponding color of every province
    var color_dict = {"1": "#FFC0CB", "2": "#C6E2FF", "3":"#CD69C9", "4": "#C0FF3E", "5": "#6495ED",
            "6": "#EEA9B8", "7": "#DDA0DD", "8": "#C5C1AA", "9": "#CD661D", "10": "#ADFF2F", "11": "#9ACD32",
            "12": "#7EC0EE", "13": "#515151", "14": "#CD2626", "15": "#FF7F24", "16": "#E066FF", "17": "#CDAF95",
            "18": "#CD6839", "19": "#9BCD9B", "20": "#AAAAAA", "21": "#8B5742", "22": "#87CEFF", "23": "#7FFF00",
            "24": "#4876FF", "25": "#458B00", "26": "#458B00", "27": "#EE7942", "28": "#EEA2AD", "29": "#B0C4DE",
            "30": "#9B30FF", "31": "#8B7765"};

    // define the corresponding name of every province
    var area_name = {"1": "甘肃", "2": "青海", "3": "广西", "4": "贵州", "5": "重庆", "6": "北京", "7": "福建",
            "8": "安徽", "9": "广东", "10": "西藏", "11": "新疆", "12": "海南", "13": "宁夏", "14": "陕西", "15": "山西",
            "16": "湖北", "17": "湖南", "18": "四川", "19": "云南", "20": "河北", "21": "河南", "22": "辽宁", "23": "山东",
            "24": "天津", "25": "江西", "26": "江苏", "27": "上海", "28": "浙江", "29": "吉林", "30": "内蒙古", "31": "黑龙江"};

    // draw the charts
    function visualization(data_name, curr_year){

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

        var tmp_max = {"2007": 0.0, "2008": 0.0, "2009": 0.0, "2010": 0.0, "2011": 0.0, "2012": 0.0,
                        "2013": 0.0, "2014": 0.0, "2015": 0.0, "2016": 0.0};

        for (i = 0; i < data.length; i++){
            if (parseFloat(data[i].y2007) > tmp_max["2007"]){
                tmp_max["2007"] = parseFloat(data[i].y2007);
            }
        }

        for (i = 0; i < data.length; i++){
            if (parseFloat(data[i].y2008) > tmp_max["2008"]){
                tmp_max["2008"] = parseFloat(data[i].y2008);
            }
        }

        for (i = 0; i < data.length; i++){
            if (parseFloat(data[i].y2009) > tmp_max["2009"]){
                tmp_max["2009"] = parseFloat(data[i].y2009);
            }
        }

        for (i = 0; i < data.length; i++){
            if (parseFloat(data[i].y2010) > tmp_max["2010"]){
                tmp_max["2010"] = parseFloat(data[i].y2010);
            }
        }

        for (i = 0; i < data.length; i++){
            if (parseFloat(data[i].y2011) > tmp_max["2011"]){
                tmp_max["2011"] = parseFloat(data[i].y2011);
            }
        }

        for (i = 0; i < data.length; i++){
            if (parseFloat(data[i].y2012) > tmp_max["2012"]){
                tmp_max["2012"] = parseFloat(data[i].y2012);
            }
        }

        for (i = 0; i < data.length; i++){
            if (parseFloat(data[i].y2013) > tmp_max["2013"]){
                tmp_max["2013"] = parseFloat(data[i].y2013);
            }
        }

        for (i = 0; i < data.length; i++){
            if (parseFloat(data[i].y2014) > tmp_max["2014"]){
                tmp_max["2014"] = parseFloat(data[i].y2014);
            }
        }

        for (i = 0; i < data.length; i++){
            if (parseFloat(data[i].y2015) > tmp_max["2015"]){
                tmp_max["2015"] = parseFloat(data[i].y2015);
            }
        }

        for (i = 0; i < data.length; i++){
            if (parseFloat(data[i].y2016) > tmp_max["2016"]){
                tmp_max["2016"] = parseFloat(data[i].y2016);
            }
        }

        if (data_name == "resident_index.csv" || data_name == "good_index.csv"){
            tmp_max["2007"] = 120;
            tmp_max["2008"] = 120;
            tmp_max["2009"] = 120;
            tmp_max["2010"] = 120;
            tmp_max["2011"] = 120;
            tmp_max["2012"] = 120;
            tmp_max["2013"] = 120;
            tmp_max["2014"] = 120;
            tmp_max["2015"] = 120;
            tmp_max["2016"] = 120;
        }

        if (data_name == "area_total_output.csv"){
            label.attr("x", width * 0.44)
                .attr("y", height * 1 / 20)
                .text(curr_year + "年地区生产总值")
                .attr("fill", "black")
                .attr("font-family", "楷体")
                .attr("font-size", "18px")
                .attr("font-weight", "bold");
        }

        if (data_name == "area_first_output.csv"){
            label.attr("x", width * 0.44)
                .attr("y", height * 1 / 20)
                .text(curr_year + "年第一产业增加值")
                .attr("fill", "black")
                .attr("font-family", "楷体")
                .attr("font-size", "18px")
                .attr("font-weight", "bold");
        }

        if (data_name == "area_second_output.csv"){
            label.attr("x", width * 0.44)
                .attr("y", height * 1 / 20)
                .text(curr_year + "年第二产业增加值")
                .attr("fill", "black")
                .attr("font-family", "楷体")
                .attr("font-size", "18px")
                .attr("font-weight", "bold");
        }

        if (data_name == "area_third_output.csv"){
            label.attr("x", width * 0.44)
                .attr("y", height * 1 / 20)
                .text(curr_year + "年第三产业增加值")
                .attr("fill", "black")
                .attr("font-family", "楷体")
                .attr("font-size", "18px")
                .attr("font-weight", "bold");
        }

        if (data_name == "society_solid.csv"){
            label.attr("x", width * 0.44)
                .attr("y", height * 1 / 20)
                .text(curr_year + "年全社会固定资产投资")
                .attr("fill", "black")
                .attr("font-family", "楷体")
                .attr("font-size", "18px")
                .attr("font-weight", "bold");
        }

        if (data_name == "town_solid.csv"){
            label.attr("x", width * 0.44)
                .attr("y", height * 1 / 20)
                .text(curr_year + "年城镇固定资产投资")
                .attr("fill", "black")
                .attr("font-family", "楷体")
                .attr("font-size", "18px")
                .attr("font-weight", "bold");
        }

        if (data_name == "build_develop.csv"){
            label.attr("x", width * 0.44)
                .attr("y", height * 1 / 20)
                .text(curr_year + "年房地产开发投资")
                .attr("fill", "black")
                .attr("font-family", "楷体")
                .attr("font-size", "18px")
                .attr("font-weight", "bold");
        }

        if (data_name == "private_job.csv"){
            label.attr("x", width * 0.44)
                .attr("y", height * 1 / 20)
                .text(curr_year + "年私营企业就业人数")
                .attr("fill", "black")
                .attr("font-family", "楷体")
                .attr("font-size", "18px")
                .attr("font-weight", "bold");
        }

        if (data_name == "single_job.csv"){
            label.attr("x", width * 0.44)
                .attr("y", height * 1 / 20)
                .text(curr_year + "年个体就业人数")
                .attr("fill", "black")
                .attr("font-family", "楷体")
                .attr("font-size", "18px")
                .attr("font-weight", "bold");
        }

        if (data_name == "money_total.csv"){
            label.attr("x", width * 0.44)
                .attr("y", height * 1 / 20)
                .text(curr_year + "年城镇单位就业人员工资总额")
                .attr("fill", "black")
                .attr("font-family", "楷体")
                .attr("font-size", "18px")
                .attr("font-weight", "bold");
        }

        if (data_name == "money_average.csv"){
            label.attr("x", width * 0.44)
                .attr("y", height * 1 / 20)
                .text(curr_year + "年城镇单位就业人员平均工资")
                .attr("fill", "black")
                .attr("font-family", "楷体")
                .attr("font-size", "18px")
                .attr("font-weight", "bold");
        }

        if (data_name == "income.csv"){
            label.attr("x", width * 0.42)
                .attr("y", height * 1 / 20)
                .text(curr_year + "年地方财政一般预算收入")
                .attr("fill", "black")
                .attr("font-family", "楷体")
                .attr("font-size", "18px")
                .attr("font-weight", "bold");
        }

        if (data_name == "output.csv"){
            label.attr("x", width * 0.42)
                .attr("y", height * 1 / 20)
                .text(curr_year + "年地方财政一般预算支出")
                .attr("fill", "black")
                .attr("font-family", "楷体")
                .attr("font-size", "18px")
                .attr("font-weight", "bold");
        }

        if (data_name == "in_out.csv"){
            label.attr("x", width * 0.42)
                .attr("y", height * 1 / 20)
                .text(curr_year + "年经营单位所在地进出口总额")
                .attr("fill", "black")
                .attr("font-family", "楷体")
                .attr("font-size", "18px")
                .attr("font-weight", "bold");
        }

        if (data_name == "out.csv"){
            label.attr("x", width * 0.42)
                .attr("y", height * 1 / 20)
                .text(curr_year + "年经营单位所在地出口总额")
                .attr("fill", "black")
                .attr("font-family", "楷体")
                .attr("font-size", "18px")
                .attr("font-weight", "bold");
        }

        if (data_name == "in.csv"){
            label.attr("x", width * 0.42)
                .attr("y", height * 1 / 20)
                .text(curr_year + "年经营单位所在地进口总额")
                .attr("fill", "black")
                .attr("font-family", "楷体")
                .attr("font-size", "18px")
                .attr("font-weight", "bold");
        }

        if (data_name == "resident_index.csv"){
            label.attr("x", width * 0.45)
                .attr("y", height * 1 / 20)
                .text(curr_year + "年居民消费价格指数")
                .attr("fill", "black")
                .attr("font-family", "楷体")
                .attr("font-size", "18px")
                .attr("font-weight", "bold");
        }

        if (data_name == "good_index.csv"){
            label.attr("x", width * 0.45)
                .attr("y", height * 1 / 20)
                .text(curr_year + "年商品零售价格指数")
                .attr("fill", "black")
                .attr("font-family", "楷体")
                .attr("font-size", "18px")
                .attr("font-weight", "bold");
        }

        if (data_name == "total_good.csv"){
            label.attr("x", width * 0.45)
                .attr("y", height * 1 / 20)
                .text(curr_year + "年社会消费品零售总额")
                .attr("fill", "black")
                .attr("font-family", "楷体")
                .attr("font-size", "18px")
                .attr("font-weight", "bold");
        }

        function updatebars(){
            // If the year is 2007
            if (curr_year == "2007"){
                bars.transition(transition).delay(function(d) {
                        return 200;
                    })
                    .attr("x", function(d) { return x(d.id); })

                bars.attr("y", function(d) { return y(d.y2007); })
                    .attr("width", x.bandwidth())
                    .attr("height", function(d) { return height - y(d.y2007); })
                    .attr("fill",function(d){
                        return color_dict[d.id];
                    })
                    .on("mouseover", function(d,i){
                        $(this).attr("opacity", 0.5);
                    })
                    .on("mouseout",function(d,i){
                        $(this).attr("opacity", 1.0);
                    });
            }

            //If the year is 2008
            if (curr_year == "2008"){
                bars.transition(transition).delay(function(d) {
                        return 200;
                    })
                    .attr("x", function(d) { return x(d.id); })

                bars.attr("y", function(d) { return y(d.y2008); })
                    .attr("width", x.bandwidth())
                    .attr("height", function(d) { return height - y(d.y2008); })
                    .attr("fill",function(d){
                        return color_dict[d.id];
                    })
                    .on("mouseover", function(d,i){
                        $(this).attr("opacity", 0.5);
                    })
                    .on("mouseout",function(d,i){
                        $(this).attr("opacity", 1.0);
                    });
            }

            // If the year is 2009
            if (curr_year == "2009"){
                bars.transition(transition).delay(function(d) {
                        return 200;
                    })
                    .attr("x", function(d) { return x(d.id); })

                bars.attr("y", function(d) { return y(d.y2009); })
                    .attr("width", x.bandwidth())
                    .attr("height", function(d) { return height - y(d.y2009); })
                    .attr("fill",function(d){
                        return color_dict[d.id];
                    })
                    .on("mouseover", function(d,i){
                        $(this).attr("opacity", 0.5);
                    })
                    .on("mouseout",function(d,i){
                        $(this).attr("opacity", 1.0);
                    });
            }

            // If the year is 2010
            if (curr_year == "2010"){
                bars.transition(transition).delay(function(d) {
                        return 200;
                    })
                    .attr("x", function(d) { return x(d.id); })

                bars.attr("y", function(d) { return y(d.y2010); })
                    .attr("width", x.bandwidth())
                    .attr("height", function(d) { return height - y(d.y2010); })
                    .attr("fill",function(d){
                        return color_dict[d.id];
                    })
                    .on("mouseover", function(d,i){
                        $(this).attr("opacity", 0.5);
                    })
                    .on("mouseout",function(d,i){
                        $(this).attr("opacity", 1.0);
                    });
            }

            // If the year is 2011
            if (curr_year == "2011"){
                bars.transition(transition).delay(function(d) {
                        return 200;
                    })
                    .attr("x", function(d) { return x(d.id); })

                bars.attr("y", function(d) { return y(d.y2011); })
                    .attr("width", x.bandwidth())
                    .attr("height", function(d) { return height - y(d.y2011); })
                    .attr("fill",function(d){
                        return color_dict[d.id];
                    })
                    .on("mouseover", function(d,i){
                        $(this).attr("opacity", 0.5);
                    })
                    .on("mouseout",function(d,i){
                        $(this).attr("opacity", 1.0);
                    });
            }

            // If the year is 2012
            if (curr_year == "2012"){
                bars.transition(transition).delay(function(d) {
                        return 200;
                    })
                    .attr("x", function(d) { return x(d.id); })

                bars.attr("y", function(d) { return y(d.y2012); })
                    .attr("width", x.bandwidth())
                    .attr("height", function(d) { return height - y(d.y2012); })
                    .attr("fill",function(d){
                        return color_dict[d.id];
                    })
                    .on("mouseover", function(d,i){
                        $(this).attr("opacity", 0.5);
                    })
                    .on("mouseout",function(d,i){
                        $(this).attr("opacity", 1.0);
                    });
            }

            // If the year is 2013
            if (curr_year == "2013"){
                bars.transition(transition).delay(function(d) {
                        return 200;
                    })
                    .attr("x", function(d) { return x(d.id); })

                bars.attr("y", function(d) { return y(d.y2013); })
                    .attr("width", x.bandwidth())
                    .attr("height", function(d) { return height - y(d.y2013); })
                    .attr("fill",function(d){
                        return color_dict[d.id];
                    })
                    .on("mouseover", function(d,i){
                        $(this).attr("opacity", 0.5);
                    })
                    .on("mouseout",function(d,i){
                        $(this).attr("opacity", 1.0);
                    });
            }

            // If the year is 2014
            if (curr_year == "2014"){
                bars.transition(transition).delay(function(d) {
                        return 200;
                    })
                    .attr("x", function(d) { return x(d.id); })

                bars.attr("y", function(d) { return y(d.y2014); })
                    .attr("width", x.bandwidth())
                    .attr("height", function(d) { return height - y(d.y2014); })
                    .attr("fill",function(d){
                        return color_dict[d.id];
                    })
                    .on("mouseover", function(d,i){
                        $(this).attr("opacity", 0.5);
                    })
                    .on("mouseout",function(d,i){
                        $(this).attr("opacity", 1.0);
                    });
            }

            // If the year is 2015
            if (curr_year == "2015"){
                bars.transition(transition).delay(function(d) {
                        return 200;
                    })
                    .attr("x", function(d) { return x(d.id); })

                bars.attr("y", function(d) { return y(d.y2015); })
                    .attr("width", x.bandwidth())
                    .attr("height", function(d) { return height - y(d.y2015); })
                    .attr("fill",function(d){
                        return color_dict[d.id];
                    })
                    .on("mouseover", function(d,i){
                        $(this).attr("opacity", 0.5);
                    })
                    .on("mouseout",function(d,i){
                        $(this).attr("opacity", 1.0);
                    });
            }

            // If the year is 2016
            if (curr_year == "2016"){
                bars.transition(transition).delay(function(d) {
                        return 200;
                    })
                    .attr("x", function(d) { return x(d.id); })

                bars.attr("y", function(d) { return y(d.y2016); })
                    .attr("width", x.bandwidth())
                    .attr("height", function(d) { return height - y(d.y2016); })
                    .attr("fill",function(d){
                        return color_dict[d.id];
                    })
                    .on("mouseover", function(d,i){
                        $(this).attr("opacity", 0.5);
                    })
                    .on("mouseout",function(d,i){
                        $(this).attr("opacity", 1.0);
                    });
            }
        }

        y.domain([0, tmp_max[curr_year]]);

        // delete the previous line
        svg.select("line").remove();

        // draw the axises
        svg.append("line")
            .attr("x1", margin.left)
            .attr("y1", margin.top + height)
            .attr("x2", margin.left + width)
            .attr("y2", margin.top + height)
            .attr("stroke", "black");

        yAxisg.call(yAxis);

        // append labels
        if (data_name == "area_total_output.csv"){
            y_label = yAxisg.append("text")
                        .attr("transform", "translate(70,-23)")
                        .attr("y", 6)
                        .attr("dy", "0.71em")
                        .attr("text-anchor", "end")
                        .attr("font-weight", "bold")
                        .text("地区生产总值(亿元)")
                        .style("font-family", "楷体");
        }

        if (data_name == "area_first_output.csv"){
            y_label = yAxisg.append("text")
                        .attr("transform", "translate(85,-23)")
                        .attr("y", 6)
                        .attr("dy", "0.71em")
                        .attr("text-anchor", "end")
                        .attr("font-weight", "bold")
                        .text("第一产业增加值(亿元)")
                        .style("font-family", "楷体");
        }

        if (data_name == "area_second_output.csv"){
            y_label = yAxisg.append("text")
                        .attr("transform", "translate(85,-23)")
                        .attr("y", 6)
                        .attr("dy", "0.71em")
                        .attr("text-anchor", "end")
                        .attr("font-weight", "bold")
                        .text("第二产业增加值(亿元)")
                        .style("font-family", "楷体");
        }

        if (data_name == "area_third_output.csv"){
            y_label = yAxisg.append("text")
                        .attr("transform", "translate(85,-23)")
                        .attr("y", 6)
                        .attr("dy", "0.71em")
                        .attr("text-anchor", "end")
                        .attr("font-weight", "bold")
                        .text("第三产业增加值(亿元)")
                        .style("font-family", "楷体");
        }

        if (data_name == "society_solid.csv"){
            y_label = yAxisg.append("text")
                        .attr("transform", "translate(110,-23)")
                        .attr("y", 6)
                        .attr("dy", "0.71em")
                        .attr("text-anchor", "end")
                        .attr("font-weight", "bold")
                        .text("全社会固定资产投资(亿元)")
                        .style("font-family", "楷体");
        }

        if (data_name == "town_solid.csv"){
            y_label = yAxisg.append("text")
                        .attr("transform", "translate(100,-23)")
                        .attr("y", 6)
                        .attr("dy", "0.71em")
                        .attr("text-anchor", "end")
                        .attr("font-weight", "bold")
                        .text("城镇固定资产投资(亿元)")
                        .style("font-family", "楷体");
        }

        if (data_name == "build_develop.csv"){
            y_label = yAxisg.append("text")
                        .attr("transform", "translate(85,-23)")
                        .attr("y", 6)
                        .attr("dy", "0.71em")
                        .attr("text-anchor", "end")
                        .attr("font-weight", "bold")
                        .text("房地产开发投资(亿元)")
                        .style("font-family", "楷体");
        }

        if (data_name == "private_job.csv"){
            y_label = yAxisg.append("text")
                        .attr("transform", "translate(95,-23)")
                        .attr("y", 6)
                        .attr("dy", "0.71em")
                        .attr("text-anchor", "end")
                        .attr("font-weight", "bold")
                        .text("私营企业就业人数(万人)")
                        .style("font-family", "楷体");
        }

        if (data_name == "single_job.csv"){
            y_label = yAxisg.append("text")
                        .attr("transform", "translate(85,-23)")
                        .attr("y", 6)
                        .attr("dy", "0.71em")
                        .attr("text-anchor", "end")
                        .attr("font-weight", "bold")
                        .text("个体就业人数(万人)")
                        .style("font-family", "楷体");
        }

        if (data_name == "money_total.csv"){
            y_label = yAxisg.append("text")
                        .attr("transform", "translate(40,-23)")
                        .attr("y", 6)
                        .attr("dy", "0.71em")
                        .attr("text-anchor", "end")
                        .attr("font-weight", "bold")
                        .text("工资总额(亿元)")
                        .style("font-family", "楷体");
        }

        if (data_name == "money_average.csv"){
            y_label = yAxisg.append("text")
                        .attr("transform", "translate(40,-23)")
                        .attr("y", 6)
                        .attr("dy", "0.71em")
                        .attr("text-anchor", "end")
                        .attr("font-weight", "bold")
                        .text("平均工资(元)")
                        .style("font-family", "楷体");
        }

        if (data_name == "income.csv"){
            y_label = yAxisg.append("text")
                        .attr("transform", "translate(40,-23)")
                        .attr("y", 6)
                        .attr("dy", "0.71em")
                        .attr("text-anchor", "end")
                        .attr("font-weight", "bold")
                        .text("财政收入(亿元)")
                        .style("font-family", "楷体");
        }

        if (data_name == "output.csv"){
            y_label = yAxisg.append("text")
                        .attr("transform", "translate(40,-23)")
                        .attr("y", 6)
                        .attr("dy", "0.71em")
                        .attr("text-anchor", "end")
                        .attr("font-weight", "bold")
                        .text("财政支出(亿元)")
                        .style("font-family", "楷体");
        }

        if (data_name == "in_out.csv"){
            y_label = yAxisg.append("text")
                        .attr("transform", "translate(55,-23)")
                        .attr("y", 6)
                        .attr("dy", "0.71em")
                        .attr("text-anchor", "end")
                        .attr("font-weight", "bold")
                        .text("进出口总额(千美元)")
                        .style("font-family", "楷体");
        }

        if (data_name == "out.csv"){
            y_label = yAxisg.append("text")
                        .attr("transform", "translate(40,-23)")
                        .attr("y", 6)
                        .attr("dy", "0.71em")
                        .attr("text-anchor", "end")
                        .attr("font-weight", "bold")
                        .text("出口总额(千美元)")
                        .style("font-family", "楷体");
        }

        if (data_name == "in.csv"){
            y_label = yAxisg.append("text")
                        .attr("transform", "translate(40,-23)")
                        .attr("y", 6)
                        .attr("dy", "0.71em")
                        .attr("text-anchor", "end")
                        .attr("font-weight", "bold")
                        .text("进口总额(千美元)")
                        .style("font-family", "楷体");
        }

        if (data_name == "resident_index.csv"){
            y_label = yAxisg.append("text")
                        .attr("transform", "translate(40,-23)")
                        .attr("y", 6)
                        .attr("dy", "0.71em")
                        .attr("text-anchor", "end")
                        .attr("font-weight", "bold")
                        .text("居民消费价格指数")
                        .style("font-family", "楷体");
        }

        if (data_name == "good_index.csv"){
            y_label = yAxisg.append("text")
                        .attr("transform", "translate(40,-23)")
                        .attr("y", 6)
                        .attr("dy", "0.71em")
                        .attr("text-anchor", "end")
                        .attr("font-weight", "bold")
                        .text("商品零售价格指数")
                        .style("font-family", "楷体");
        }

        if (data_name == "total_good.csv"){
            y_label = yAxisg.append("text")
                        .attr("transform", "translate(55,-23)")
                        .attr("y", 6)
                        .attr("dy", "0.71em")
                        .attr("text-anchor", "end")
                        .attr("font-weight", "bold")
                        .text("社会消费品零售总额")
                        .style("font-family", "楷体");
        }

        // delete the previous bars
        svg.selectAll("rect").remove();

        // draw the new bars
        var bars = g.append("g")
            .selectAll(".bar")
            .data(data)
            .enter()
            .append("rect")
            .attr("class", "bar");

        updatebars();

        // add the name of provinces to bars
        function add_names(the_year){
            for (i = 0; i < data.length; i++){
                var tmp_name = area_name[data[i].id];
                var texts = svg.append("text")
                                .attr("font-family", "楷体")
                                .attr("font-weight", "bold")
                                .attr("x", function(d){
                                    return margin.left + x(data[i].id);
                                })
                                .attr("y", function(d){
                                    if (the_year == "2007"){
                                        return parseFloat(y(data[i].y2007));
                                    }
                                    if (the_year == "2008"){
                                        return parseFloat(y(data[i].y2008));
                                    }
                                    if (the_year == "2009"){
                                        return parseFloat(y(data[i].y2009));
                                    }
                                    if (the_year == "2010"){
                                        return parseFloat(y(data[i].y2010));
                                    }
                                    if (the_year == "2011"){
                                        return parseFloat(y(data[i].y2011));
                                    }
                                    if (the_year == "2012"){
                                        return parseFloat(y(data[i].y2012));
                                    }
                                    if (the_year == "2013"){
                                        return parseFloat(y(data[i].y2013));
                                    }
                                    if (the_year == "2014"){
                                        return parseFloat(y(data[i].y2014));
                                    }
                                    if (the_year == "2015"){
                                        return parseFloat(y(data[i].y2015));
                                    }
                                    if (the_year == "2016"){
                                        return parseFloat(y(data[i].y2016));
                                    }
                                });
                for (j = 0; j < tmp_name.length; j++){
                    texts.append("tspan")
                        .attr("x", texts.attr("x"))
                        .attr("y", parseFloat(texts.attr("y")) + (3 - tmp_name.length) * 18 + 15 * j)
                        .attr("dy", "1em")
                        .text(tmp_name[j]);
                }
            }
        }

        svg.selectAll("tspan").remove();
        add_names(curr_year);

        // append titles to bars according to the chosen year
        if (curr_year == "2007"){
            bars.append("title")
                .text(function(d){
                    return area_name[d.id] + ": " + d.y2007 + tmp_unit;
                })
        }

        if (curr_year == "2008"){
            bars.append("title")
                .text(function(d){
                    return area_name[d.id] + ": " + d.y2008 + tmp_unit;
                })
        }

        if (curr_year == "2009"){
            bars.append("title")
                .text(function(d){
                    return area_name[d.id] + ": " + d.y2009 + tmp_unit;
                })
        }

        if (curr_year == "2010"){
            bars.append("title")
                .text(function(d){
                    return area_name[d.id] + ": " + d.y2010 + tmp_unit;
                })
        }

        if (curr_year == "2011"){
            bars.append("title")
                .text(function(d){
                    return area_name[d.id] + ": " + d.y2011 + tmp_unit;
                })
        }

        if (curr_year == "2012"){
            bars.append("title")
                .text(function(d){
                    return area_name[d.id] + ": " + d.y2012 + tmp_unit;
                })
        }

        if (curr_year == "2013"){
            bars.append("title")
                .text(function(d){
                    return area_name[d.id] + ": " + d.y2013 + tmp_unit;
                })
        }

        if (curr_year == "2014"){
            bars.append("title")
                .text(function(d){
                    return area_name[d.id] + ": " + d.y2014 + tmp_unit;
                })
        }

        if (curr_year == "2015"){
            bars.append("title")
                .text(function(d){
                    return area_name[d.id] + ": " + d.y2015 + tmp_unit;
                })
        }

        if (curr_year == "2016"){
            bars.append("title")
                .text(function(d){
                    return area_name[d.id] + ": " + d.y2016 + tmp_unit;
                })
        }

        // add the event listener for the choice of year
        document.getElementById('choose_year')
            .addEventListener('change',function(){
                var val = this.value;
                var chosen_year = val.split("_")[0];
                console.log(val);

                if (data_name == "area_total_output.csv"){
                    label.text(chosen_year + "年地区生产总值");
                }

                if (data_name == "area_first_output.csv"){
                    label.text(chosen_year + "年第一产业增加值");
                }

                if (data_name == "area_second_output.csv"){
                    label.text(chosen_year + "年第二产业增加值");
                }

                if (data_name == "area_second_output.csv"){
                    label.text(chosen_year + "年第三产业增加值");
                }

                if (data_name == "society_solid.csv"){
                    label.text(chosen_year + "年全社会固定资产投资");
                }

                if (data_name == "town_solid.csv"){
                    label.text(chosen_year + "年城镇固定资产投资");
                }

                if (data_name == "build_develop.csv"){
                    label.text(chosen_year + "年房地产开发投资");
                }

                if (data_name == "private_job.csv"){
                    label.text(chosen_year + "年私营企业就业人数");
                }

                if (data_name == "single_job.csv"){
                    label.text(chosen_year + "年个体就业人数");
                }

                if (data_name == "money_total.csv"){
                    label.text(chosen_year + "年城镇单位就业人员工资总额");
                }

                if (data_name == "money_average.csv"){
                    label.text(chosen_year + "年城镇单位就业人员平均工资");
                }

                if (data_name == "income.csv"){
                    label.text(chosen_year + "年地方财政一般预算收入");
                }

                if (data_name == "output.csv"){
                    label.text(chosen_year + "年地方财政一般预算支出");
                }

                if (data_name == "in_out.csv"){
                    label.text(chosen_year + "年经营单位所在地进出口总额");
                }

                if (data_name == "out.csv"){
                    label.text(chosen_year + "年经营单位所在地出口总额");
                }

                if (data_name == "in.csv"){
                    label.text(chosen_year + "年经营单位所在地进口总额");
                }

                if (data_name == "resident_index.csv"){
                    label.text(chosen_year + "年居民消费价格指数");
                }

                if (data_name == "good_index.csv"){
                    label.text(chosen_year + "年商品零售价格指数");
                }

                if (data_name == "total_good.csv"){
                    label.text(chosen_year + "年社会消费品零售总额");
                }

                y.domain([0, tmp_max[chosen_year]]);

                yAxisg.call(yAxis);

                svg.selectAll("tspan").remove();
                add_names(chosen_year);

                // when 2007 is selected
                if (val == "2007_1"){
                    bars.transition(transition).delay(function(d) {
                            return 200;
                        })
                        .attr("x", function(d) { return x(d.id); })

                    bars.attr("y", function(d) { return y(d.y2007); })
                        .attr("width", x.bandwidth())
                        .attr("height", function(d) { return height - y(d.y2007); })
                        .attr("fill",function(d){
                            return color_dict[d.id];
                        })
                        .on("mouseover", function(d,i){
                            $(this).attr("opacity", 0.5);
                        })
                        .on("mouseout",function(d,i){
                            $(this).attr("opacity", 1.0);
                        });

                    bars.select("title")
                        .text(function(d){
                            return area_name[d.id] + ": " + d.y2007 + tmp_unit;
                        });
                }

                // when 2008 is selected
                if (val == "2008_1"){
                    bars.transition(transition).delay(function(d) {
                            return 200;
                        })
                        .attr("x", function(d) { return x(d.id); })

                    bars.attr("y", function(d) { return y(d.y2008); })
                        .attr("width", x.bandwidth())
                        .attr("height", function(d) { return height - y(d.y2008); })
                        .attr("fill",function(d){
                            return color_dict[d.id];
                        })
                        .on("mouseover", function(d,i){
                            $(this).attr("opacity", 0.5);
                        })
                        .on("mouseout",function(d,i){
                            $(this).attr("opacity", 1.0);
                        });

                    bars.select("title")
                        .text(function(d){
                            return area_name[d.id] + ": " + d.y2008 + tmp_unit;
                        });
                }

                // when 2009 is selected
                if (val == "2009_1"){
                    bars.transition(transition).delay(function(d) {
                            return 200;
                        })
                        .attr("x", function(d) { return x(d.id); })

                    bars.attr("y", function(d) { return y(d.y2009); })
                        .attr("width", x.bandwidth())
                        .attr("height", function(d) { return height - y(d.y2009); })
                        .attr("fill",function(d){
                            return color_dict[d.id];
                        })
                        .on("mouseover", function(d,i){
                            $(this).attr("opacity", 0.5);
                        })
                        .on("mouseout",function(d,i){
                            $(this).attr("opacity", 1.0);
                        });

                    bars.select("title")
                        .text(function(d){
                            return area_name[d.id] + ": " + d.y2009 + tmp_unit;
                        });
                }

                // when 2010 is selected
                if (val == "2010_1"){
                    bars.transition(transition).delay(function(d) {
                            return 200;
                        })
                        .attr("x", function(d) { return x(d.id); })

                    bars.attr("y", function(d) { return y(d.y2010); })
                        .attr("width", x.bandwidth())
                        .attr("height", function(d) { return height - y(d.y2010); })
                        .attr("fill",function(d){
                            return color_dict[d.id];
                        })
                        .on("mouseover", function(d,i){
                            $(this).attr("opacity", 0.5);
                        })
                        .on("mouseout",function(d,i){
                            $(this).attr("opacity", 1.0);
                        });

                    bars.select("title")
                        .text(function(d){
                            return area_name[d.id] + ": " + d.y2010 + tmp_unit;
                        });
                }

                // when 2011 is selected
                if (val == "2011_1"){
                    bars.transition(transition).delay(function(d) {
                            return 200;
                        })
                        .attr("x", function(d) { return x(d.id); })

                    bars.attr("y", function(d) { return y(d.y2011); })
                        .attr("width", x.bandwidth())
                        .attr("height", function(d) { return height - y(d.y2011); })
                        .attr("fill",function(d){
                            return color_dict[d.id];
                        })
                        .on("mouseover", function(d,i){
                            $(this).attr("opacity", 0.5);
                        })
                        .on("mouseout",function(d,i){
                            $(this).attr("opacity", 1.0);
                        });

                    bars.select("title")
                        .text(function(d){
                            return area_name[d.id] + ": " + d.y2011 + tmp_unit;
                        });
                }

                // when 2012 is selected
                if (val == "2012_1"){
                    bars.transition(transition).delay(function(d) {
                            return 200;
                        })
                        .attr("x", function(d) { return x(d.id); })

                    bars.attr("y", function(d) { return y(d.y2012); })
                        .attr("width", x.bandwidth())
                        .attr("height", function(d) { return height - y(d.y2012); })
                        .attr("fill",function(d){
                            return color_dict[d.id];
                        })
                        .on("mouseover", function(d,i){
                            $(this).attr("opacity", 0.5);
                        })
                        .on("mouseout",function(d,i){
                            $(this).attr("opacity", 1.0);
                        });

                    bars.select("title")
                        .text(function(d){
                            return area_name[d.id] + ": " + d.y2012 + tmp_unit;
                        });
                }

                // when 2013 is selected
                if (val == "2013_1"){
                    bars.transition(transition).delay(function(d) {
                            return 200;
                        })
                        .attr("x", function(d) { return x(d.id); })

                    bars.attr("y", function(d) { return y(d.y2013); })
                        .attr("width", x.bandwidth())
                        .attr("height", function(d) { return height - y(d.y2013); })
                        .attr("fill",function(d){
                            return color_dict[d.id];
                        })
                        .on("mouseover", function(d,i){
                            $(this).attr("opacity", 0.5);
                        })
                        .on("mouseout",function(d,i){
                            $(this).attr("opacity", 1.0);
                        });

                    bars.select("title")
                        .text(function(d){
                            return area_name[d.id] + ": " + d.y2013 + tmp_unit;
                        });
                }

                // when 2014 is selected
                if (val == "2014_1"){
                    bars.transition(transition).delay(function(d) {
                            return 200;
                        })
                        .attr("x", function(d) { return x(d.id); })

                    bars.attr("y", function(d) { return y(d.y2014); })
                        .attr("width", x.bandwidth())
                        .attr("height", function(d) { return height - y(d.y2014); })
                        .attr("fill",function(d){
                            return color_dict[d.id];
                        })
                        .on("mouseover", function(d,i){
                            $(this).attr("opacity", 0.5);
                        })
                        .on("mouseout",function(d,i){
                            $(this).attr("opacity", 1.0);
                        });

                    bars.select("title")
                        .text(function(d){
                            return area_name[d.id] + ": " + d.y2014 + tmp_unit;
                        });
                }

                // when 2015 is selected
                if (val == "2015_1"){
                    bars.transition(transition).delay(function(d) {
                            return 200;
                        })
                        .attr("x", function(d) { return x(d.id); })

                    bars.attr("y", function(d) { return y(d.y2015); })
                        .attr("width", x.bandwidth())
                        .attr("height", function(d) { return height - y(d.y2015); })
                        .attr("fill",function(d){
                            return color_dict[d.id];
                        })
                        .on("mouseover", function(d,i){
                            $(this).attr("opacity", 0.5);
                        })
                        .on("mouseout",function(d,i){
                            $(this).attr("opacity", 1.0);
                        });

                    bars.select("title")
                        .text(function(d){
                            return area_name[d.id] + ": " + d.y2015 + tmp_unit;
                        });
                }

                // when 2016 is selected
                if (val == "2016_1"){
                    bars.transition(transition).delay(function(d) {
                            return 200;
                        })
                        .attr("x", function(d) { return x(d.id); })

                    bars.attr("y", function(d) { return y(d.y2016); })
                        .attr("width", x.bandwidth())
                        .attr("height", function(d) { return height - y(d.y2016); })
                        .attr("fill",function(d){
                            return color_dict[d.id];
                        })
                        .on("mouseover", function(d,i){
                            $(this).attr("opacity", 0.5);
                        })
                        .on("mouseout",function(d,i){
                            $(this).attr("opacity", 1.0);
                        });

                    bars.select("title")
                        .text(function(d){
                            return area_name[d.id] + ": " + d.y2016 + tmp_unit;
                        });
                }
        })

    });

    }

    // give the initial view
    visualization("area_total_output.csv", "2007");

    // when the total output is clicked
    $("#total_num").on("click", function() {
        var obj = document.getElementById("choose_year");
        var index = obj.selectedIndex;
        var value = obj.options[index].value;
        var curr_year = value.split("_")[0];
        y_label.remove();
        visualization("area_total_output.csv", curr_year);
    })

    // when the output of the first industry is clicked
    $("#first_num").on("click", function() {
        var obj = document.getElementById("choose_year");
        var index = obj.selectedIndex;
        var value = obj.options[index].value;
        var curr_year = value.split("_")[0];
        y_label.remove();
        visualization("area_first_output.csv", curr_year);
    })

    // when the output of the second industry is clicked
    $("#second_num").on("click", function() {
        var obj = document.getElementById("choose_year");
        var index = obj.selectedIndex;
        var value = obj.options[index].value;
        var curr_year = value.split("_")[0];
        y_label.remove();
        visualization("area_second_output.csv", curr_year);
    })

    // when the output of the third industry is clicked
    $("#third_num").on("click", function() {
        var obj = document.getElementById("choose_year");
        var index = obj.selectedIndex;
        var value = obj.options[index].value;
        var curr_year = value.split("_")[0];
        y_label.remove();
        visualization("area_third_output.csv", curr_year);
    })

    // when the society investment is clicked
    $("#society_solid").on("click", function() {
        var obj = document.getElementById("choose_year");
        var index = obj.selectedIndex;
        var value = obj.options[index].value;
        var curr_year = value.split("_")[0];
        y_label.remove();
        visualization("society_solid.csv", curr_year);
    })

    // when the town investment is clicked
    $("#town_solid").on("click", function() {
        var obj = document.getElementById("choose_year");
        var index = obj.selectedIndex;
        var value = obj.options[index].value;
        var curr_year = value.split("_")[0];
        y_label.remove();
        visualization("town_solid.csv", curr_year);
    })

    // when the real estate development is clicked
    $("#build_develop").on("click", function() {
        var obj = document.getElementById("choose_year");
        var index = obj.selectedIndex;
        var value = obj.options[index].value;
        var curr_year = value.split("_")[0];
        y_label.remove();
        visualization("build_develop.csv", curr_year);
    })

    // when the private company is clicked
    $("#private_job").on("click", function() {
        var obj = document.getElementById("choose_year");
        var index = obj.selectedIndex;
        var value = obj.options[index].value;
        var curr_year = value.split("_")[0];
        y_label.remove();
        visualization("private_job.csv", curr_year);
    })

    // when the single worker is clicked
    $("#single_job").on("click", function() {
        var obj = document.getElementById("choose_year");
        var index = obj.selectedIndex;
        var value = obj.options[index].value;
        var curr_year = value.split("_")[0];
        y_label.remove();
        visualization("single_job.csv", curr_year);
    })

    // when the total money is clicked
    $("#money_total").on("click", function() {
        var obj = document.getElementById("choose_year");
        var index = obj.selectedIndex;
        var value = obj.options[index].value;
        var curr_year = value.split("_")[0];
        y_label.remove();
        visualization("money_total.csv", curr_year);
    })

    // when the average money is clicked
    $("#money_average").on("click", function() {
        var obj = document.getElementById("choose_year");
        var index = obj.selectedIndex;
        var value = obj.options[index].value;
        var curr_year = value.split("_")[0];
        y_label.remove();
        visualization("money_average.csv", curr_year);
    })

    // when the income is clicked
    $("#income").on("click", function() {
        var obj = document.getElementById("choose_year");
        var index = obj.selectedIndex;
        var value = obj.options[index].value;
        var curr_year = value.split("_")[0];
        y_label.remove();
        visualization("income.csv", curr_year);
    })

    // when the output is clicked
    $("#output").on("click", function() {
        var obj = document.getElementById("choose_year");
        var index = obj.selectedIndex;
        var value = obj.options[index].value;
        var curr_year = value.split("_")[0];
        y_label.remove();
        visualization("output.csv", curr_year);
    })

    // when the total input and output is clicked
    $("#in_out").on("click", function() {
        var obj = document.getElementById("choose_year");
        var index = obj.selectedIndex;
        var value = obj.options[index].value;
        var curr_year = value.split("_")[0];
        y_label.remove();
        visualization("in_out.csv", curr_year);
    })

    // when the total output is clicked
    $("#out").on("click", function() {
        var obj = document.getElementById("choose_year");
        var index = obj.selectedIndex;
        var value = obj.options[index].value;
        var curr_year = value.split("_")[0];
        y_label.remove();
        visualization("out.csv", curr_year);
    })

    // when the total input is clicked
    $("#in").on("click", function() {
        var obj = document.getElementById("choose_year");
        var index = obj.selectedIndex;
        var value = obj.options[index].value;
        var curr_year = value.split("_")[0];
        y_label.remove();
        visualization("in.csv", curr_year);
    })

    // when the resident index is clicked
    $("#resident_index").on("click", function() {
        var obj = document.getElementById("choose_year");
        var index = obj.selectedIndex;
        var value = obj.options[index].value;
        var curr_year = value.split("_")[0];
        y_label.remove();
        visualization("resident_index.csv", curr_year);
    })

    // when the good index is clicked
    $("#good_index").on("click", function() {
        var obj = document.getElementById("choose_year");
        var index = obj.selectedIndex;
        var value = obj.options[index].value;
        var curr_year = value.split("_")[0];
        y_label.remove();
        visualization("good_index.csv", curr_year);
    })

    // when the total good is clicked
    $("#total_good").on("click", function() {
        var obj = document.getElementById("choose_year");
        var index = obj.selectedIndex;
        var value = obj.options[index].value;
        var curr_year = value.split("_")[0];
        y_label.remove();
        visualization("total_good.csv", curr_year);
    })

    Observer.addView(view3);
    return view3;

}
