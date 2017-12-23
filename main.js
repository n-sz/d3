var graphColor = ["#e6bbad", "#b3e5fc", "#bbade6", "#d8e6ad"];
var setGraphColor = 0;

$(function () {

    var row = 3;
    for (i = 1; i <= row; i++) {
        $("#record_0").clone(true).attr("id", "record_" + i).appendTo("#input");
        $("#record_" + i + " #key").text("data" + i);
    }

    $("#record_1 #val1").val(15);
    $("#record_1 #val2").val(4);
    $("#record_2 #val1").val(20);
    $("#record_2 #val2").val(4);
    $("#record_3 #val1").val(25);
    $("#record_3 #val2").val(6);

    $('#set').click(function () {
        setGraphColor = 0;
        var totalVal1 = 0,
            totalVal2 = 0,
            dataCircle1 = [],
            dataCircle2 = [],
            dataLine = [];
        for (var i = 0; i <= row; i++) {
            var key = $("#record_" + i + " #key").text(),
                val1 = $("#record_" + i + " #val1").val(),
                val2 = $("#record_" + i + " #val2").val();

            if (isNaN(val1) || val1 === "") {
                $("#err").text(key + "の値1が数値形式で入力されていません");
                return false;
            }

            if (isNaN(val2) || val2 === "") {
                $("#err").text(key + "の値2が数値形式で入力されていません");
                return false;
            }

            totalVal1 += parseInt(val1);
            totalVal2 += parseInt(val2);
            color = setColor();
            dataCircle1.push({ graphKey: key, graphValue: val1, graphColor: color });
            dataCircle2.push({ graphKey: key, graphValue: val2, graphColor: color });
            dataLine.push({ graphKey: key, y1Val: val1, y2Val: val2, graphColor: color });
        }

        //グラフの再作成
        $("#circleChart1").remove();
        cleateCircle(dataCircle1, totalVal1, "circleChart1", 1);

        //グラフの再作成
        $("#circleChart2").remove();
        cleateCircle(dataCircle2, totalVal2, "circleChart2", 2);

        //グラフの再作成
        $("#lineGraph").remove();
        cleateLine(dataLine);
    });

});

function setColor() {

    if (setGraphColor > graphColor.length - 1) {
        setGraphColor = 1;
    }
    color = graphColor[setGraphColor];
    setGraphColor++;
    return color;
}