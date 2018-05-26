function Sidebar(Observer) {
    var sidebar = {};

    var conventionList = new Array();

    // Read convention list
	d3.csv("../data/data.csv", type, function(error, data) {
		if (error) throw error;

        for (var i = 0; i < data.length; i++) {
			conventionList.push(data[i]["conventions"] == 1);
		}
	});

	function type(d, i, columns) {
		for (i = 1, t = 0; i < columns.length; ++i) t += d[columns[i]] = +d[columns[i]];
		d.total = t;
		return d;
    }
    // Read month state button list
    monthIds = new Array();
    monthIds.push("checkbox-jan");
    monthIds.push("checkbox-feb");
    monthIds.push("checkbox-mar");
    monthIds.push("checkbox-apr");
    monthIds.push("checkbox-may");
    monthIds.push("checkbox-jun");
    monthIds.push("checkbox-jul");
    monthIds.push("checkbox-aug");
    monthIds.push("checkbox-sep");
    monthIds.push("checkbox-oct");
    monthIds.push("checkbox-nov");
    monthIds.push("checkbox-dec");
    monthStates = new Array();
    for (var i = 0; i < 12; i++) {
        monthStates.push(true);
    }

    var ifHighlightConvention = false;
        
    // Set onClick
    $(".menu-chekbox").on("click", function(d) {
        monthStates[monthIds.indexOf(d.currentTarget.id)] = d.currentTarget.checked;
        Observer.fireEvent("onMonthCheckedStateChanged", monthStates, Sidebar);        
    })
    $("#clear-all").on("click", function(d) {
        for (var i = 0; i < 12; i++) {
            $("#" + monthIds[i])[0].checked = false;
            monthStates[i] = false;
        }
        Observer.fireEvent("onMonthCheckedStateChanged", monthStates, Sidebar);
    })
    $("#select-all").on("click", function(d) {
        for (var i = 0; i < 12; i++) {
            $("#" + monthIds[i])[0].checked = true;
            monthStates[i] = true;
        }
        Observer.fireEvent("onMonthCheckedStateChanged", monthStates, Sidebar);
    })

    $("#clear-convention").on("click", function(d) {
        for (var i = 0; i < 12; i++) {
            if (!conventionList[i]) {
                $("#" + monthIds[i])[0].checked = true;
                monthStates[i] = true;
            } else {
                $("#" + monthIds[i])[0].checked = false;
                monthStates[i] = false;
            }
        }
        Observer.fireEvent("onMonthCheckedStateChanged", monthStates, Sidebar);
    })
    $("#select-convention").on("click", function(d) {
        for (var i = 0; i < 12; i++) {
            if (conventionList[i]) {
                $("#" + monthIds[i])[0].checked = true;
                monthStates[i] = true;
            } else {
                $("#" + monthIds[i])[0].checked = false;
                monthStates[i] = false;
            }
        }
        Observer.fireEvent("onMonthCheckedStateChanged", monthStates, Sidebar);
    })
    $("#toggle-bright-convention").on("click", function(d) {
        if (d.currentTarget.text == "高亮大会月份：开") {
            d.currentTarget.innerText = "高亮大会月份：关";
            ifHighlightConvention = false;
        } else {
            d.currentTarget.innerText = "高亮大会月份：开";
            ifHighlightConvention = true;
        }
        Observer.fireEvent("onConvHighlightStateChanged", ifHighlightConvention, Sidebar);
    })
	
    Observer.addView(sidebar);
    return sidebar;

}