var tmp;
var periods = [];
var selectedSport = "";
var selectedSubSport = "";
var negative2QFlag = false;
var negative3QFlag = false;
var negative4QFlag = false;
var negative1HFlag = false;
var negative2HFlag = false;
var negativeGFlag = false;

$(document).ready(function () {
    $(".btn-edit, .btn-cancel, .btn-save, #footer").hide();

    $('#dailyFigureDate').datetimepicker({
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0
    });

    $('#gg_gameDateDiv').datetimepicker({
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0
    });


    $(".score").keydown(function (e) {
        if (e.keyCode === 9) {
            $(this).next().next().next().focus();
            return false;
        }
    });

    $("#sportGradeFilter").change(function () {
        loadSubSports();
    });

    $("#getGamesButton").click(function () {
        getGamesforGrade();
        return false;
    });

    $("#setGradeInfoButon").click(function () {
        setAditionalGradeInfo();
    });

    $("#cancelGrade").click(function () {
        if ($(this).is(":checked")) {
            $("#spread_na").prop("checked", true);
            $("#money_na").prop("checked", true);
            $("#total_na").prop("checked", true);
            $("#spread_na").prop("readonly", true);
            $("#money_na").prop("readonly", true);
            $("#total_na").prop("readonly", true);
            $("#spread_g").prop("checked", false);
            $("#money_g").prop("checked", false);
            $("#total_g").prop("checked", false);
            $("#spread_g").prop("disabled", true);
            $("#money_g").prop("disabled", true);
            $("#total_g").prop("disabled", true);
        } else {
            $("#spread_na").prop("checked", false);
            $("#money_na").prop("checked", false);
            $("#total_na").prop("checked", false);
            $("#spread_g").prop("disabled", false);
            $("#money_g").prop("disabled", false);
            $("#total_g").prop("disabled", false);
            $("#spread_na").prop("readonly", false);
            $("#money_na").prop("readonly", false);
            $("#total_na").prop("readonly", false);
        }
    });
    
    $("#gradeMassiveGames").click(function (){
        var rotNumsArray=$("input[name='gamesToGrade[]']:checked");
        rotNumsArray.each(function (){
            gradeGame($(this).val()); 
        });
    });
});

function gradeNoactionSelection(fieldId) {
    var id = fieldId.split("_");
    if (id[1] === "g") {
        if ($("#" + fieldId).is(":checked")) {
            $("#" + id[0] + "_na").prop("checked", false);
        }
    } else if (id[1] === "na") {
        if ($("#" + fieldId).is(":checked")) {
            $("#" + id[0] + "_g").prop("checked", false);
        }
    }
}

function nosubmit(e) {
    if (e.keyCode === 13) {
        return false;
    }
}

function searchGradeTable(val) {
    var fc = $('label').filter(function () {
        return this.firstChild.nodeValue.trim() === val;
    });

    var container = $('#gradeGamesTableContainer'),
            scrollTo = $(fc.parent().parent());

//    container.scrollTop(
//        scrollTo.offset().top - container.offset().top + container.scrollTop()
//    );

    container.animate({
        scrollTop: scrollTo.offset().top - container.offset().top + container.scrollTop()
    });
    scrollTo.css("background-color", "#BFF0FF");
    var fun = function () {
        scrollTo.css("background-color", "#FFFFFF");
    };
    setTimeout(fun, 2000);

    return false;
}




function getGradeInfo(rotNum, GameDate, PeriodNum) {
    $.ajax({
        url: "grade/getgradeinfo",
        type: 'POST',
        data: {
            "rotNum": rotNum,
            "gameDate": GameDate,
            "periodNum": PeriodNum
        },
        success: function (data) {
            var obj = JSON.parse(data);
            if (obj.length !== 0) {
                if (obj['row1']['CancelSpreadFlag'] === 'Y') {
                    $("#spread_na").prop("checked", true);
                    $("#spread_g").prop("checked", false);
                }
                if (obj['row1']['CancelMoneyLineFlag'] === 'Y') {
                    $("#money_na").prop("checked", true);
                    $("#money_g").prop("checked", false);
                }
                if (obj['row1']['CancelTtlPtsFlag'] === 'Y') {
                    $("#total_na").prop("checked", true);
                    $("#total_g").prop("checked", false);
                }
                if (obj['row1']['GameCancelled'] === 'Y') {
                    $("#cancelGrade").prop("checked", true);
                }
                if (obj['row1']['DailyFigureDate'] !== null) {
                    var gameDate = obj['row1']['DailyFigureDate'].split(" ");
                    var date = gameDate[0].split("-");
                    $("#input_dailyFigure").val(date[1] + "-" + date[2] + "-" + date[0]);
                }
            } else {
                $("#spread_g").prop("checked", true);
                $("#money_g").prop("checked", true);
                $("#total_g").prop("checked", true);

                var today = new Date();
                var dd = today.getDate();
                var mm = today.getMonth() + 1;
                var yyyy = today.getFullYear();
                $("#input_dailyFigure").val((mm>9?"":"0") + mm + "-" + (dd>9?"":"0") + dd + "-" + yyyy);
            }


        }
    });
}

function openAditionalInfoModal(rot) {
    var PeriodNum = $("input[name='" + rot + "_periodo[]']:checked").eq(0).val();
    getGradeInfo(rot, $("#" + rot + "_gameDate").val(), PeriodNum);
    $("#alAway").val($("#" + rot + "alAway").val());
    $("#alHome").val($("#" + rot + "alHome").val());
    $("#input_dailyFigure").val();
    $("#gradeComments").val($("#" + rot + "comments").val());

    $("#gradeRotANum").val(rot);
    $("#gameGradeInfoModal").modal("toggle");
    return false;
}

function loadSubSports() {
    var sportType = $("#sportGradeFilter").val();
    $("#subsportGradeFilter").find('option').remove();
    $.ajax({
        url: "games/loadleagues/" + sportType,
        success: function (data) {
            var obj = JSON.parse(data);
            var select = $("#subsportGradeFilter");
            $.each(obj, function (key, val) {
                var opt = new Option(val['SportSubType'].trim(), val['SportSubType'].trim());
                select.append(opt);
            });
            var opt = new Option("All Sub-Sports", "0");
            select.append(opt);
        }
    });
}

function setFocusColor(field) {
    var inputs = $(field).parent().find(".score");
    if ($(field).is(":checked")) {
        inputs.each(function () {
            $(this).prop("class", "form-control score focusStyle");
            $(this).prop("readonly", false);
        });
    } else {
        inputs.each(function () {
            $(this).prop("class", "form-control score");
            $(this).prop("readonly", true);
        });
    }
}


function getGamesforGrade() {
    getPeriods($("#sportGradeFilter").val(), $("#subsportGradeFilter").val());
    $.ajax({
        url: "grade/getgamesforgrade",
        type: 'POST',
        data: {
            "sport": $("#sportGradeFilter").val().trim(),
            "subsport": $("#subsportGradeFilter").val().trim(),
            "gameDate": $("#gg_gameDate").val()
        }, success: function (data) {
            var obj = JSON.parse(data);
            var table = $("#gamesGradeTable");
            $("#gamesGradeTable tr").remove();
            $.each(obj, function (key, val) {
                table.append(createTableBodyTr(val));
            });
            setScoresinTable();
        }
    });
}

function setScoresinTable() {
    var rows = $("#gamesGradeTable tr");
    for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        var rot1 = $(row).find(".rotTeam:eq(0)").text();
        var rot2 = $(row).find(".rotTeam:eq(1)").text();
        var sum1 = 0;
        var sum2 = 0;

        for (var j = 0; j < 7; j++) {
            if (j > 2) {
                var val1 = parseInt($("#" + rot1 + "_" + j + "_pt").val());
                var val2 = parseInt($("#" + rot1 + "_" + j + "_pt2").val());
                if (isNaN(val1))
                    val1 = 0;
                if (isNaN(val2))
                    val2 = 0;

                sum1 = sum1 + val1;
                sum2 = sum2 + val2;
//                var scr1 = (sum1 === 0 && sum2 === 0) ? "" : sum1;
//                var scr2 = (sum1 === 0 && sum2 === 0) ? "" : sum2;
                var scr1 = sum1;
                var scr2 = sum2;
                if ($("#" + rot1 + "_" + j + "_pt").val() === "-" && $("#" + rot1 + "_" + j + "_pt2").val() === "-") {
                    scr1 = "";
                    scr2 = "";
                }


                $("#" + rot1 + "_" + j + "_sc").val(scr1);
                $("#" + rot1 + "_" + j + "_sc2").val(scr2);
            } else if (j === 2) {
                var pts1H1 = parseInt($("#" + rot1 + "_1_pt").val());
                var pts1H2 = parseInt($("#" + rot1 + "_1_pt2").val());
                var pts2H1 = parseInt($("#" + rot1 + "_" + j + "_pt").val());
                var pts2H2 = parseInt($("#" + rot1 + "_" + j + "_pt2").val());
                var sc2h1;
                var sc2h2;
                if ((isNaN(pts1H1) && isNaN(pts1H2)) || isNaN(pts2H1) && isNaN(pts2H2)) {
                    sc2h1 = "";
                    sc2h2 = "";
                } else {
                    if (isNaN(pts1H2))
                        pts1H2 = 0;
                    if (isNaN(pts1H1))
                        pts1H1 = 0;
                    if (isNaN(pts2H1))
                        pts2H1 = 0;
                    if (isNaN(pts2H2))
                        pts2H2 = 0;

                    sc2h1 = pts1H1 + pts2H1;
                    sc2h2 = pts1H2 + pts2H2;
                }
                $("#" + rot1 + "_" + j + "_sc").val(sc2h1);
                $("#" + rot1 + "_" + j + "_sc2").val(sc2h2);
            } else {
                var val1 = $("#" + rot1 + "_" + j + "_pt").val();
                var val2 = $("#" + rot1 + "_" + j + "_pt2").val()
                $("#" + rot1 + "_" + j + "_sc").val(val1 === "-" ? "" : val1);
                $("#" + rot1 + "_" + j + "_sc2").val(val2 === "-" ? "" : val2);
            }
        }
    }
}

function calculatePoints(rot, period, value, pos, e) {
    switch (period) {
        case 0:
            if (pos === 1) {
                $("#" + rot + "_" + period + "_l").text(value);
                $("#" + rot + "_" + period + "_pt").val(value);
            } else {
                $("#" + rot + "_" + period + "_l2").text(value);
                $("#" + rot + "_" + period + "_pt2").val(value);
            }
            break;
        case 1:
            if (pos === 1) {
                $("#" + rot + "_" + period + "_l").text(value);
                $("#" + rot + "_" + period + "_pt").val(value);
            } else {
                $("#" + rot + "_" + period + "_l2").text(value);
                $("#" + rot + "_" + period + "_pt2").val(value);
            }
            break;
        case 3:
            if (pos === 1) {
                $("#" + rot + "_" + period + "_l").text(value);
                $("#" + rot + "_" + period + "_pt").val(value);
            } else {
                $("#" + rot + "_" + period + "_l2").text(value);
                $("#" + rot + "_" + period + "_pt2").val(value);
            }
            break;
        case 2:
            setFocusColor($("#" + rot + "_0"));
            if (pos === 1) {
                var points1H = parseInt($("#" + rot + "_1_pt").val());
                var points2H = value - points1H;
                $("#" + rot + "_2_pt").val(points2H);
                $("#" + rot + "_2_l").text(points2H);
                //                set Points Game
                $("#" + rot + "_0_pt").val(value);
                $("#" + rot + "_0_l").text(value);
                $("#" + rot + "_0_sc").val(value);

            } else {
                var points1H = parseInt($("#" + rot + "_1_pt2").val());
                var points2H = value - points1H;
                $("#" + rot + "_2_pt2").val(points2H);
                $("#" + rot + "_2_l2").text(points2H);
                //                set Points Game
                $("#" + rot + "_0_pt2").val(value);
                $("#" + rot + "_0_l2").text(value);
                $("#" + rot + "_0_sc2").val(value);
            }
            break;
        case 4:
            setFocusColor($("#" + rot + "_1"));
            if (pos === 1) {
                var points1H = parseInt($("#" + rot + "_3_pt").val());
                var points2Q = value - points1H;
                $("#" + rot + "_" + period + "_l").text(points2Q);
                $("#" + rot + "_" + period + "_pt").val(points2Q);
                $("#" + rot + "_1_l").text(value);
                $("#" + rot + "_1_pt").val(value);
                $("#" + rot + "_1_sc").val(value);
            } else {
                var points1H = parseInt($("#" + rot + "_3_pt2").val());
                var points2Q = value - points1H;
                $("#" + rot + "_" + period + "_l2").text(points2Q);
                $("#" + rot + "_" + period + "_pt2").val(points2Q);

                $("#" + rot + "_1_l2").text(value);
                $("#" + rot + "_1_pt2").val(value);
                $("#" + rot + "_1_sc2").val(value);
            }
            break;
        case 5:
            if (pos === 1) {
                var points1H = parseInt($("#" + rot + "_1_pt").val());
                var points2Q = value - points1H;
                $("#" + rot + "_" + period + "_pt").val(points2Q);
                $("#" + rot + "_" + period + "_l").text(points2Q);
            } else {
                var points1H = parseInt($("#" + rot + "_1_pt2").val());
                var points2Q = value - points1H;
                $("#" + rot + "_" + period + "_pt2").val(points2Q);
                $("#" + rot + "_" + period + "_l2").text(points2Q);
            }
            break;
        case 6:
            if (pos === 1) {
                var points1Q = parseInt($("#" + rot + "_3_pt").val());
                var points2Q = parseInt($("#" + rot + "_4_pt").val());
                var points3Q = parseInt($("#" + rot + "_5_pt").val());
                var pints1H = parseInt($("#" + rot + "_1_pt").val());

                var points4Q = value - points1Q - points2Q - points3Q;
                var points2H = value - pints1H;
                //                set Points 4thQ
                $("#" + rot + "_" + period + "_pt").val(points4Q);
                $("#" + rot + "_" + period + "_l").text(points4Q);
                //                set points 2H
                $("#" + rot + "_2_pt").val(points2H);
                $("#" + rot + "_2_l").text(points2H);
                $("#" + rot + "_2_sc").val(value);

                //                set Points Game
                $("#" + rot + "_0_pt").val(value);
                $("#" + rot + "_0_l").text(value);
                $("#" + rot + "_0_sc").val(value);


            } else {
                var points1Q = parseInt($("#" + rot + "_3_pt2").val());
                var points2Q = parseInt($("#" + rot + "_4_pt2").val());
                var points3Q = parseInt($("#" + rot + "_5_pt2").val());
                var pints1H = parseInt($("#" + rot + "_1_pt2").val());

                var points4Q = value - points1Q - points2Q - points3Q;
                var points2H = value - pints1H;

                //                set Points 4thQ
                $("#" + rot + "_" + period + "_pt2").val(points4Q);
                $("#" + rot + "_" + period + "_l2").text(points4Q);
                //                set points 2H
                $("#" + rot + "_2_pt2").val(points2H);
                $("#" + rot + "_2_l2").text(points2H);
                $("#" + rot + "_2_sc2").val(value);

                //                set Points Game
                $("#" + rot + "_0_pt2").val(value);
                $("#" + rot + "_0_l2").text(value);
                $("#" + rot + "_0_sc2").val(value);
            }
            setFocusColor($("#" + rot + "_0"));
            setFocusColor($("#" + rot + "_2"));
            break;
    }
}

function calculatePointsNHL(rot, period, value, pos) {
    switch (period) {
        case 0:
        case 1:
            if (pos === 1) {
                $("#" + rot + "_" + period + "_l").text(value);
                $("#" + rot + "_" + period + "_pt").val(value);
            } else {
                $("#" + rot + "_" + period + "_l2").text(value);
                $("#" + rot + "_" + period + "_pt2").val(value);
            }
            break;
        case 2:
            if (pos === 1) {
                var points1P = parseInt($("#" + rot + "_1_pt").val());
                var points2P = value - points1P;
                $("#" + rot + "_2_pt").val(points2P);
                $("#" + rot + "_2_l").text(points2P);
            } else {
                var points1P = parseInt($("#" + rot + "_1_pt2").val());
                var points2P = value - points1P;
                $("#" + rot + "_2_pt2").val(points2P);
                $("#" + rot + "_2_l2").text(points2P);
            }
            break;
        case 3:
            $("#" + rot + "_0").prop("checked", true);
            setFocusColor($("#" + rot + "_0"));
            if (pos === 1) {
                var points1P = parseInt($("#" + rot + "_1_pt").val());
                var points2P = parseInt($("#" + rot + "_2_pt").val());
                var points3P = value - points2P - points1P;
                $("#" + rot + "_3_pt").val(points3P);
                $("#" + rot + "_3_l").text(points3P);
//                set Points Game
                $("#" + rot + "_0_pt").val(value);
                $("#" + rot + "_0_l").text(value);
                $("#" + rot + "_0_sc").val(value);
            } else {
                var points1P = parseInt($("#" + rot + "_1_pt2").val());
                var points2P = parseInt($("#" + rot + "_2_pt2").val());
                var points3P = value - points2P - points1P;
                $("#" + rot + "_3_pt2").val(points3P);
                $("#" + rot + "_3_l2").text(points3P);

                $("#" + rot + "_0_pt2").val(value);
                $("#" + rot + "_0_l2").text(value);
                $("#" + rot + "_0_sc2").val(value);

            }
            break;
    }
}
function getPeriods(sport, subsport) {
    selectedSport = sport.trim();
    selectedSubSport = subsport.trim();
    $.ajax({
        url: "grade/getorderedperiods",
        type: 'POST',
        data: {
            "sport": sport,
            "subSport": subsport
        }, success: function (data) {
            periods = [];
            var obj = JSON.parse(data);
            $.each(obj, function (key, val) {
                periods.push(val['PeriodNumber'].trim() + "_" + val['ShortDescription'].trim());
            });
            createHeader();
        }
    });
}

function createHeader() {
    $("#gamesGradeTableHeader tr").remove();
    var table = $("#gamesGradeTableHeader");
    var tr1 = $("<tr></tr>");
    var tr2 = $("<tr></tr>");
    var td1 = $("<td colspan='4'>Game Information</td>");
    var td2 = $("<td colspan='7'>Scores</td>");
    var td3 = $("<td colspan='7'>Points</td>");
    var td4 = $("<td></td>");

    tr1.append(td1);
    tr1.append(td2);
    tr1.append(td3);
    tr1.append(td4);

    var td5 = $('<td class="selectTh">Select</td>');
    var td6 = $('<td class="dateTh">Date/Time</td>');
    var td7 = $('<td class="selectTh">Rot #</td>');
    var td8 = $('<td class="gameInfoTh">Teams</td>');

    tr2.append(td5);
    tr2.append(td6);
    tr2.append(td7);
    tr2.append(td8);

    for (var i = 0; i < 7; i++) {
        if (periods[i] === undefined || periods[i] === "") {
            tr2.append('<td class="scoresTd">-</td>')
        } else {
            var period = periods[i].split("_");
            tr2.append('<td class="scoresTd">' + period[1] + '</td>');
        }
    }
    for (var i = 0; i < 7; i++) {
        if (periods[i] === undefined || periods[i] === "") {
            tr2.append('<td class="scoresTd">-</td>')
        } else {
            var period = periods[i].split("_");
            tr2.append('<td class="scoresTd">' + period[1] + '</td>');
        }
    }

    var td9 = $('<td class="tdCenter">More</td>');
    tr2.append(td9);

    table.append(tr1);
    table.append(tr2);

}


function getScoreBox(rot, idPeriodo) {
    var td1 = $("<td class='scoresTd'></td>");
    td1.append('<input id="' + rot + '_' + idPeriodo + '" name="' + rot + '_periodo" value="' + idPeriodo + '" class="form-control" onchange="setFocusColor(this)" type="checkbox"/><br/>');
    td1.append('<input id="' + rot + '_' + idPeriodo + '_sc" name="' + rot + '_' + idPeriodo + '_sc"class="form-control score" type="text" readonly size="2"/><br/>');
    td1.append('<input id="' + rot + '_' + idPeriodo + '_sc2" name="' + rot + '_' + idPeriodo + '_sc2" class="form-control" type="text" readonly size="2"/>');
    return td1;
}

function getPointsBox(rot, idPeriodo, pointsAway, pointsHome) {
    var td1 = $("<td class='pointsGTd'></td>");
    td1.append("<label class='pointsLabel'>" + pointsAway + "</label><br/>");
    td1.append('<input id="' + rot + '_' + idPeriodo + '_sc" name="' + rot + '_' + idPeriodo + '_sc" type="hidden"/>');
    td1.append("<label class='pointsLabel'>" + pointsHome + "</label><br/>");
    td1.append('<input id="' + rot + '_' + idPeriodo + '_sc2" name="' + rot + '_' + idPeriodo + '_sc2" type="hiden" />');
    return td1;
}

function createTableBodyTr(gameInfo) {
    var tr = $("<tr></tr>");

    var td1 = $('<td class="selectTd"></td>');
    td1.append('<input id="' + gameInfo["Team1RotNum"] + '" name="gamesToGrade[]" value="' + gameInfo["Team1RotNum"] + '" class="form-control" type="checkbox"/>');
    td1.append('<input type="hidden" value="A" id="' + gameInfo["Team1RotNum"] + '_sp"/>');
    td1.append('<input type="hidden" value="A" id="' + gameInfo["Team1RotNum"] + '_ml"/>');
    td1.append('<input type="hidden" value="A" id="' + gameInfo["Team1RotNum"] + '_tl"/>');
    td1.append('<input type="hidden" value="" id="' + gameInfo["Team1RotNum"] + '_cancel"/>');
    td1.append('<input type="hidden" value="" id="' + gameInfo["Team1RotNum"] + '_reopen"/>');
    td1.append('<input type="hidden" value="" id="' + gameInfo["Team1RotNum"] + '_comments"/>');
    td1.append('<input type="hidden" value="" id="' + gameInfo["Team1RotNum"] + '_alAway"/>');
    td1.append('<input type="hidden" value="" id="' + gameInfo["Team1RotNum"] + '_alHome"/>');
    td1.append('<input type="hidden" value="" id="' + gameInfo["Team1RotNum"] + '_df"/>');

    var td2 = $('<td class="dateTd"></td>');
    var dateTime = gameInfo["GameDateTime"].split(" ");
    var date = dateTime[0].split("-");
    var time = dateTime[1].split(":");
    td2.append('<label class="marginTeam">' + date[1] + "/" + date[2] + "/" + date[0] + '<br/>' + time[0] + ":" + time[1] + '</label>');
    td2.append('<input id="' + gameInfo["Team1RotNum"] + '_gameDate" type="hidden"value="' + gameInfo["GameDateTime"] + '"/>');

    var td3 = $('<td class="selectTd"></td>');
    td3.append('<label class="rotTeam">' + gameInfo["Team1RotNum"] + '</label>');
    td3.append('<label class="rotTeam">' + gameInfo["Team2RotNum"] + '</label>');

    var td4 = $('<td class="gameInfoTd"></td>');
    if (selectedSport === "Baseball") {
        td4.append('<label class="teamLabel">' + gameInfo["Team1ID"] + '</label>');
        td4.append('<input type="text" id="' + gameInfo["Team1RotNum"] + '_p1" class="form-control inlineElement" value="' + gameInfo['ListedPitcher1'] + '" readonly/><br/> ');
        td4.append('<label class="teamLabel">' + gameInfo["Team2ID"] + '</label>');
        td4.append('<input type="text" id="' + gameInfo["Team1RotNum"] + '_p2" class="form-control inlineElement" value="' + gameInfo['ListedPitcher2'] + '" readonly/><br/> ');
    } else {
        td4.append('<label class="teamLabel">' + gameInfo["Team1ID"] + '</label><br/>');
        td4.append('<label class="teamLabel">' + gameInfo["Team2ID"] + '</label>');
    }
    td4.append('<input type="hidden" id="' + gameInfo["Team1RotNum"] + '_t1" value="' + gameInfo["Team1ID"] + '"/>');
    td4.append('<input type="hidden" id="' + gameInfo["Team1RotNum"] + '_t2" value="' + gameInfo["Team2ID"] + '"/>');
    tr.append(td1);
    tr.append(td2);
    tr.append(td3);
    tr.append(td4);

    for (var i = 0; i < 7; i++) {
        var tmptr;
        if (periods[i] === undefined || periods[i] === "") {
            tmptr = $('<td class="scoresTd">-</td>');
        } else {
            var period = periods[i].split("_");
            var hockeyExcp = "";
            if (selectedSubSport.trim() === "NHL") {
                hockeyExcp = "NHL";
            }

            tmptr = $('<td class="scoresTd"></td>');
            tmptr.append('<input id="' + gameInfo["Team1RotNum"] + '_' + period[0] + '" name="' + gameInfo["Team1RotNum"] + '_periodo[]" value="' + period[0] + '" class="form-control" onchange="setFocusColor(this)" type="checkbox"/><br/>');
            tmptr.append('<input id="' + gameInfo["Team1RotNum"] + '_' + period[0] + '_sc" name="' + gameInfo["Team1RotNum"] + '_' + period[0] + '_sc"  class="form-control score" type="text" readonly size="2" onkeyup="calculatePoints' + hockeyExcp + '(' + gameInfo["Team1RotNum"] + ',' + period[0] + ',this.value,1,event)" onkeydown="return validateNumberScore(event)" onchange="validatePoints(this.value,'+gameInfo["Team1RotNum"]+','+period[0]+',1)"/>');
            tmptr.append('<input id="' + gameInfo["Team1RotNum"] + '_' + period[0] + '_sc2" name="' + gameInfo["Team1RotNum"] + '_' + period[0] + '_sc" class="form-control score" type="text" readonly size="2" onkeyup="calculatePoints' + hockeyExcp + '(' + gameInfo["Team1RotNum"] + ',' + period[0] + ',this.value,2,event)" onkeydown="return validateNumberScore(event)" onchange="validatePoints(this.value,'+gameInfo["Team1RotNum"]+','+period[0]+',2)"/>');
            tmptr.append('<input type="hidden" id="' + gameInfo["Team1RotNum"] + '_' + period[0] + '_per" value="' + period[1] + '" />');
        }
        tr.append(tmptr);
    }
    for (var i = 0; i < 7; i++) {
        var tmptr;
        if (periods[i] === undefined || periods[i] === "") {
            tmptr = $('<td class="pointsGTd">-</td>');
        } else {
            var period = periods[i].split("_");
            var scoreT1;
            var scoreT2;
            if (gameInfo[period[0] + '-Team2Score'] === undefined && gameInfo[period[0] + '-Team1Score'] === undefined) {
                scoreT1 = "-";
                scoreT2 = "-";
            } else {
                scoreT1 = gameInfo[period[0] + '-Team1Score'];
                scoreT2 = gameInfo[period[0] + '-Team2Score'];
            }
            var period = periods[i].split("_");
            tmptr = $('<td class="pointsGTd"></td>');
            tmptr.append('<label id="' + gameInfo["Team1RotNum"] + '_' + period[0] + '_l" class="pointsLabel">' + scoreT1 + '</label><br/>');
            tmptr.append('<input type="hidden" id="' + gameInfo["Team1RotNum"] + '_' + period[0] + '_pt" name="' + gameInfo["Team1RotNum"] + '_' + period[0] + '_pt" value="' + scoreT1 + '"/>');
            tmptr.append('<label id="' + gameInfo["Team1RotNum"] + '_' + period[0] + '_l2" class="pointsLabel">' + scoreT2 + '</label><br/>');
            tmptr.append('<input type="hidden" id="' + gameInfo["Team1RotNum"] + '_' + period[0] + '_pt2" name="' + gameInfo["Team1RotNum"] + '_' + period[0] + '_pt2" value="' + scoreT2 + '"/>');
        }
        tr.append(tmptr);
    }

    var td12 = $('<td class="tdCenter"></td>');
    td12.append('<button type="button" class="btn btn-default buttonWith" onclick=" return openAditionalInfoModal(\'' + gameInfo["Team1RotNum"] + '\')"><i class="glyphicon glyphicon-plus"></i></button><br/>');
    td12.append('<button type="button" class="btn btn-info buttonWith" onclick="return redirectPropGrading(' + gameInfo['GameNum'] + ')">Props</button><br/>');
    td12.append('<button type="button" class="btn btn-success buttonWith" onclick="gradeGame(\'' + gameInfo["Team1RotNum"] + '\')">Grade</button>');
    tr.append(td12);

    return tr;
}

function redirectPropGrading(gameNum) {
    $("#gameNumRedirect").val(gameNum);
    $("#gameGradeFiltersFrm").prop("action", "grade/generalpropsgrading");
    $("#gameGradeFiltersFrm").submit();
//    window.location = "grade/generalpropsgrading/"+gameNum;
    return false;
}
function setAditionalGradeInfo() {
    var rot = $("#gradeRotANum").val();
    var ckId = $("#gamesGradeTable").find("input[value='" + rot + "']");
    var tr = ckId.parent().parent();
    var sp;
    var ml;
    var tl;
    if ($("#spread_g").is(":checked")) {
        sp = "A";
    } else if ($("#spread_na").is(":checked")) {
        sp = "C";
    } else {
        sp = "P";
    }

    if ($("#money_g").is(":checked")) {
        ml = "A";
    } else if ($("#money_na").is(":checked")) {
        ml = "C";
    } else {
        ml = "P";
    }

    if ($("#total_g").is(":checked")) {
        tl = "A";
    } else if ($("#total_na").is(":checked")) {
        tl = "C";
    } else {
        tl = "P";
    }


    $('#' + rot + '_reopen');
    $('#' + rot + '_comments').val($("#gradeComments").val());
    $('#' + rot + '_alAway').val($("#alAway").val());
    $('#' + rot + '_alHome').val($("#alHome").val());


    $("#" + rot + "_sp").val(sp);
    $("#" + rot + "_ml").val(ml);
    $("#" + rot + "_tl").val(tl);
    
    if($("#reopenGame").is(":checked")){
        $("#" + rot + "_sp").val("RO");
        $("#" + rot + "_ml").val("RO");
        $("#" + rot + "_tl").val("RO");
    }
    $("#" + rot + "_df").val($("#input_dailyFigure").val());
    $("#gameGradeInfoModal").modal("toggle");

}

function gradeGame(rot) {
    if(sendGradeValidation()){
        alert("there is an incorrect score value")
    }else{
        if ($("input[name='" + rot + "_periodo[]']:checked").length === 0) {
            alert("Not period selected");
        } else {
            var sp = $("#" + rot + "_sp").val();
            var ml = $("#" + rot + "_ml").val();
            var tl = $("#" + rot + "_tl").val();
            var df = $("#" + rot + "_df").val();
            var team1 = $("#" + rot + "_t1").val();
            var team2 = $("#" + rot + "_t2").val();
            var gameDate = $("#" + rot + "_gameDate").val();
            var periodsChecked = $("#gradeGamesTableContainer").find("input[name='" + rot + "_periodo[]']:checked");

            var subSport = $("#subsportGradeFilter").val();
            if (periodsChecked.length === 1) {
                var pId = periodsChecked.val();
                var periodName = $("#" + rot + "_" + pId + "_per").val();
                sendPeriodsToGrade(sp, ml, tl, df, team1, team2, pId, periodName, rot, gameDate, subSport);
            } else {
                periodsChecked.each(function (key, val) {
                    var periodName = $("#" + rot + "_" + $(this).val() + "_per").val();
                    sendPeriodsToGrade(sp, ml, tl, df, team1, team2, $(this).val(), periodName, rot, gameDate, subSport)
                });
            }
        }
    }
}

function sendPeriodsToGrade(sp, ml, tl, df, t1, t2, period, periodName, rot, gameDate, subSport) {
    var scoreAway = 0;
    scoreAway=$("#" + rot + "_" + period + "_sc").val() === "" ? 0 : $("#" + rot + "_" + period + "_sc").val();
    var pointsAway = 0;
    pointsAway=$("#" + rot + "_" + period + "_pt").val() === ""||$("#" + rot + "_" + period + "_pt").val() === "-" ? 0 : $("#" + rot + "_" + period + "_pt").val();
    var scoreHome = 0;
    scoreHome=$("#" + rot + "_" + period + "_sc2").val() === "" ? 0 : $("#" + rot + "_" + period + "_sc2").val();
    var pointsHome = 0;
    pointsHome=$("#" + rot + "_" + period + "_pt2").val() === "" ||$("#" + rot + "_" + period + "_pt2").val() === "-"? 0 : $("#" + rot + "_" + period + "_pt2").val();

    var comments = $("#" + rot + "_comments").val();
    var alAway = $("#" + rot + "_alAway").val();
    var alHome = $("#" + rot + "_alHome").val();
    var pitcher1;
    var pitcher2;
    if (subSport.trim() === "MLB") {
        pitcher1 = $("#" + rot + "_p1").val();
        pitcher2 = $("#" + rot + "_p2").val();
    }
    if (pointsAway === "-")
        pointsAway = "";
    if (pointsHome === "-")
        pointsHome = "";

    if ($("#cancelGrade").is(":checked")) {
        scoreAway = 0;
        pointsAway = 0;
        scoreHome = 0;
        pointsHome = 0;
    }
    $.ajax({
        url: "grade/gradeindividualgame",
        type: 'POST',
        data: {
            "sp": sp,
            "ml": ml,
            "tl": tl,
            "df": df,
            "team1": t1,
            "team2": t2,
            "period": period,
            "periodname": periodName,
            "rot": rot,
            "gameDate": gameDate,
            "scoreAway": scoreAway,
            "pointsAway": pointsAway,
            "scoreHome": scoreHome,
            "pointsHome": pointsHome,
            "subSport": subSport,
            "pitcher1": pitcher1,
            "pitcher2": pitcher2,
            "adjustlinehome": alHome,
            "adjustlineaway": alAway,
            "comments": comments
        }, success: function (data) {
            alert(data);
        }
    })
}

function validateNumberScore(e) {
    if ((e.keyCode < 48 || e.keyCode > 57) && (e.keyCode !== 8) && (e.keyCode < 96 || e.keyCode > 105) && (e.keyCode !== 9)) {
        return false;
    }
}

function validatePointsNHL(value,rot,period,pos){
    switch (period){
        case 0:
            if(pos===1){
                var scoreA=$("#"+rot+"_3_sc").val();
                if(periods.length>1&&value<scoreA){
                    negativeGFlag=true;
                    alert("Error, the total score does not match");
                }else{
                    negativeGFlag=false;
                }
            }else if(pos===2){
                var scoreH=$("#"+rot+"_3_sc2").val();
                if(periods.length>1&&value<scoreH){
                    negativeGFlag=true;
                    alert("Error, the total score does not match");
                }else{
                    negativeGFlag=false;
                }
            }
            break;
        case 2:
            if(pos===1){
                var scoreA=$("#"+rot+"_1_sc").val();
                if(periods.length>1&&value<scoreA){
                    negativeGFlag=true;
                    alert("Error, the total score does not match");
                }else{
                    negativeGFlag=false;
                }
            }else if(pos===2){
                var scoreH=$("#"+rot+"_1_sc2").val();
                if(periods.length>1&&value<scoreH){
                    negativeGFlag=true;
                    alert("Error, the total score does not match");
                }else{
                    negativeGFlag=false;
                }
            }
            break;
        case 3:
            if(pos===1){
                var scoreA=$("#"+rot+"_2_sc").val();
                if(periods.length>1&&value<scoreA){
                    negativeGFlag=true;
                    alert("Error, the total score does not match");
                }else{
                    negativeGFlag=false;
                }
            }else if(pos===2){
                var scoreH=$("#"+rot+"_2_sc2").val();
                if(periods.length>1&&value<scoreH){
                    negativeGFlag=true;
                    alert("Error, the total score does not match");
                }else{
                    negativeGFlag=false;
                }
            }
            break;
    }
}
function validatePoints(value,rot,period,pos){
    switch (period){
        case 0:
            if(pos===1){
                var scoreA=$("#"+rot+"_2_sc").val();
                if(periods.length>1&&value<scoreA){
                    negativeGFlag=true;
                    alert("Error, the total score does not match");
                }else{
                    negativeGFlag=false;
                }
            }else if(pos===2){
                var scoreH=$("#"+rot+"_2_sc2").val();
                if(periods.length>1&&value<scoreH){
                    negativeGFlag=true;
                    alert("Error, the total score does not match");
                }else{
                    negativeGFlag=false;
                }
            }
            break;
        case 1:
            if(pos===1){
                var scoreA=$("#"+rot+"_4_sc").val();
                if(value<scoreA){
                    negative1HFlag=true;
                    alert("Error, the total score does not match");
                }else{
                    negative1HFlag=false;
                }
            }else if(pos===2){
                var scoreH=$("#"+rot+"_4_sc2").val();
                if(value<scoreH){
                    negative1HFlag=true;
                    alert("Error, the total score does not match");
                }else{
                    negative1HFlag=false;
                }
            }
            break;
        case 2:
            if(pos===1){
                var scoreA=$("#"+rot+"_6_sc").val();
                var scoreA2=$("#"+rot+"_1_sc").val();
                if(value<scoreA||value<scoreA2){
                    negative2HFlag=true;
                    alert("Error, the total score does not match");
                }else{
                    negative2HFlag=false;
                }
            }else if(pos===2){
                var scoreH=$("#"+rot+"_6_sc2").val();
                var scoreH2=$("#"+rot+"_1_sc2").val();
                if(value<scoreH||value<scoreH2){
                    negative2HFlag=true;
                    alert("Error, the total score does not match");
                }else{
                    negative2HFlag=false;
                }
            }
            break;
        case 4:
            if(pos===1){
                var scoreA=$("#"+rot+"_3_sc").val();
                if(value<scoreA){
                    negative2QFlag=true;
                    alert("Error, the total score does not match");
                }else{
                    negative2QFlag=false;
                }
            }else if(pos===2){
                var scoreH=$("#"+rot+"_3_sc2").val();
                if(value<scoreH){
                    negative2QFlag=true;
                    alert("Error, the total score does not match");
                }else{
                    negative2QFlag=false;
                }
            }
            break;
        case 5:
            if(pos===1){
                var scoreA=$("#"+rot+"_1_sc").val();
                if(value<scoreA){
                    negative3QFlag=true;
                    alert("Error, the total score does not match");
                }else{
                    negative3QFlag=false;
                }
            }else if(pos===2){
                var scoreH=$("#"+rot+"_1_sc2").val();
                if(value<scoreH){
                    negative3QFlag=true;
                    alert("Error, the total score does not match");
                }else{
                    negative3QFlag=false;
                }
            }
            break;
        case 6:
            if(pos===1){
                var scoreA=$("#"+rot+"_5_sc").val();
                if(value<scoreA){
                    negative4QFlag=true;
                    alert("Error, the total score does not match");
                }else{
                    negative4QFlag=false;
                }
            }else if(pos===2){
                var scoreH=$("#"+rot+"_5_sc2").val();
                if(value<scoreH){
                    negative4QFlag=true;
                    alert("Error, the total score does not match");
                }else{
                    negative4QFlag=false;
                }
            }
            break;
    }
}

function sendGradeValidation(){
    return (negative2QFlag||negative3QFlag||negative4QFlag||negative1HFlag||negative2HFlag||negativeGFlag)
}
