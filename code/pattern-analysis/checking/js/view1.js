function View1(Observer) {
    var view1 = {};
	view1.onMessage = function(message, data, from) {
        console.log("view1::onMessage " + message);
        // if (message == "onUserCheckChanged") {
        //     // onCheckChanged(data);
        // }
	}
    var curData;

    var curUserId;

    function drawView() {
        d3.select("#table1").selectAll("*").remove();
        var container = d3.select("#table1")

            .selectAll("tr")
                .data(curData).enter()
                .append("tr")
                .on("mouseover",function(d,i) {
                    curUserId = d[0]
                    Observer.fireEvent("onUserCheckChanged", curUserId, View1);
                })
                .on("mouseout",function(d,i) {
                    curUserId = d[0]
                })

            .selectAll("td")
                .data(function(d) { return d; }).enter()
                .append("td")
                .text(function(d) { return d; });
        Observer.fireEvent("onUserCheckChanged", curUserId, View1);
    }

    function onCheckChanged(dayId) {
        d3.json("../output_person_checking.json", function(error, data) {
            if (error) throw error;
            console.log(data)
            curData = new Array();
            // curData.push(["userId", "type", "checkin", "checkout"])
            for (var i = 0; i < data.length; i++) {
                var curRow = new Array();
                if (data[i]["checkin"][dayId] == '0' || data[i]["checkout"][dayId] == "0") {
                    data[i].checkin[dayId] = "无"
                    data[i].checkout[dayId] = "无"
                }
                curRow.push(data[i].id)
                curRow.push(data[i].type)
                curRow.push(data[i].checkin[dayId])
                curRow.push(data[i].checkout[dayId])
                curData.push(curRow)
            }
            drawView()            
        });
    }

    onCheckChanged(1);

    document.getElementById('choose_day')
        .addEventListener('change',function(){
            var curr_day = this.value;
            onCheckChanged(parseInt(curr_day.slice(8, 10)))
    });

    Observer.addView(view1);
    return view1;
}
