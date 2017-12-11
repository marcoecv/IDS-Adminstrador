var tmp;
$(document).ready(function (){
    $(".btn-edit, .btn-cancel, .btn-save, #footer").hide();
    $(document).ajaxStart(function () {
        $("#loadingModal").modal('toggle');
    });


    $(document).ajaxStop(function () {
        $("#loadingModal").modal('toggle');
    });
    
    $('#dateFrom').datetimepicker({
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0
    });

    $('#dateTo').datetimepicker({
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0
    });
    
    $('#dailyFigureDateProps').datetimepicker({
        weekStart: 1,
        todayBtn:  1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0
    });
    
    $("#sportGradeFilter1").change(function () {
        loadSubSports(1);
    });
    $("#sportGradeFilter2").change(function () {
        loadSubSports(2);
    });
    
    $("#input_dateFrom").change(function (){
        getGamesByDate();
    });
    
    $("#subsportGradeFilter1").change(function (){
        if($("#input_dateFrom").val()!=="")
            getGamesByDate();
    });
    $("#searchGameProps").click(function (){
       getPropsByCorrelation(); 
    });
    
    $("#searchFutureProps").click(function (){
       getFuturePropsBySubSport(); 
    });
    $("#searchExternalProps").click(function (){
       getExternalPropsByct1(); 
    });
    
    $("#SetDF").click(function (){
       setdailyfiguredate(); 
    });
    
    $("#setContestantStatus").click(function (){
        setMLContestantStatus(); 
    });
    
    $("#gradeMassiveProps").click(function (){
        var contestNumsArray=$("input[name='propsToGrade[]']:checked");
        contestNumsArray.each(function (){
            var contestNum=$(this).attr("id");
            var contestNumA=contestNum.split("_");
            alert(contestNumA);
            var type=$("#"+contestNumA[0]+"_type").val();
            gradeMassiveProps(contestNumA[0],type);
        });
        
    });
});

function gradeMassiveProps(contestNum,type){
    switch (type){
        case 'S':
            gradeSpreadProp(contestNum);
            break;
        case 'M':
            gradeMoneyLineProp(contestNum);
            break;
        case 'P':
            gradeTotalProp(contestNum);
            break;
    }
}

function openContestantList(contestNum){
    $("#contestantMLcontestNum").val(contestNum);
    var contestants=$("input[name='"+contestNum+"_contestants[]']");
    var cId=[];
    $.each(contestants, function (){
         cId.push($(this).attr("teamid"));
     });
    $("#contestantMLtable tr").remove();
    var table=$("#contestantMLtable");
    for(var i=0;i<cId.length;i++){
        table.append(addRowToContestantMLTable(cId[i],i,contestNum));
    } 
    $("#gradeMlPropContestants").modal("toggle");
}


function addRowToContestantMLTable(contestantName,cont){
    var tr=$("<tr></tr>");
    
    var td1=$("<td class='ctWidth'></td>");
    td1.append("<label class='label-control'>"+contestantName+"</label>");
    
    var td2=$("<td class='radioWidth'></td>");
    td2.append("<input type='radio' name='"+cont+"_c_status[]' id='"+cont+"_c_status_W' value='W' onclick='selectAsWinnerML("+cont+")'/>");
    var td3=$("<td class='radioWidth'></td>");
    td3.append("<input type='radio' name='"+cont+"_c_status[]' id='"+cont+"_c_status_T' value='T'/>");
    var td4=$("<td class='radioWidth'></td>");
    td4.append("<input type='radio' name='"+cont+"_c_status[]' id='"+cont+"_c_status_L' value='L'/>");
    var td5=$("<td class='radioWidth'></td>");
    td5.append("<input type='radio' name='"+cont+"_c_status[]' id='"+cont+"_c_status_S' value='S'/>");
    
    tr.append(td1);
    tr.append(td2);
    tr.append(td3);
    tr.append(td4);
    tr.append(td5);
    
    return tr;
}
    
function setdailyfiguredate(){
    var contestNum=$("#df_contestNum").val();
    var df=$("#input_dailyFigureProps").val();
    $("#"+contestNum+"_df").val(df);
}

function openDailyFigureDateModal(contestNum){
    $("#df_contestNum").val(contestNum);
    $("#figureDateModal").modal("toggle");
    $("#input_dailyFigureProps").focus();
    return false;
}

function loadSubSports(tab) {
    
    if(tab===1){
        var sportType = $("#sportGradeFilter1").val();
        $("#subsportGradeFilter1").find('option').remove();
        var select = $("#subsportGradeFilter1");
    }else if(tab===2){
        var sportType = $("#sportGradeFilter2").val();
        $("#subsportGradeFilter2").find('option').remove();
        var select = $("#subsportGradeFilter2");
    }
    $.ajax({
        url: "../games/loadleagues/" + sportType,
        success: function (data) {
            var obj = JSON.parse(data);
            $.each(obj, function (key, val) {
                var opt = new Option(val['SportSubType'].trim(), val['SportSubType'].trim());
                select.append(opt);
            });
            var opt = new Option("All Sub-Sports", "0");
            select.append(opt);
        }
    });
}

function getGamesByDate(){
    if($("#input_dateFrom").val()!==""&&$("#input_dateTo").val()!==""&&$("#sportGradeFilter1").val()!==""&&$("#subsportGradeFilter1").val()!==""){
        $.ajax({
        url: "../props/getgamesbydate",
        type: 'POST',
        data: {
            "sport": $("#sportGradeFilter1").val().trim(),
            "subsport": $("#subsportGradeFilter1").val().trim(),
            "dateFrom": $("#input_dateFrom").val(),
            "dateTo": $("#input_dateFrom").val()
        }, success: function (data) {
            var obj = JSON.parse(data);
            var select = $("#gamesToGradeFilter");
            $("#gamesToGradeFilter option").remove();
            $.each(obj, function (key, val) {
                var opt = new Option(val['Teams'].trim(),val['CorrelationID'].trim());
                select.append(opt);
            });
        }
    });
    }else{
        alert("Sport, Sub Sport, and Date are required to select a game");
    }
}


function getPropsByCorrelation(){
    var correlation=$("#gamesToGradeFilter").val();
    $.ajax({
        url: "../props/getpropsbycorrelation/"+correlation,
        success: function (data) {
            var obj=JSON.parse(data);
            $("#propsGradeTable tr").remove();
            var table=$("#propsGradeTable");
            $.each(obj,function (key,val){
                switch (val['ThresholdType']){
                    case 'S':
                        table.append(setSPRow(val));
                        break;
                    case 'M':
                        table.append(setMLRow(val));
                        break;
                    case 'P':
                        table.append(setTLRow(val));
                        break;
                }
            });
        }
    });
}

function getFuturePropsBySubSport(){
    var subsport=$("#subsportGradeFilter2").val();
    $.ajax({
        url: "../props/getFuturepropsbySubsport",
        type: 'POST',
        data: {
            "subsport":subsport
        },
        success: function (data) {
            var obj=JSON.parse(data);
            $("#futPropsGradeTable tr").remove();
            var table=$("#futPropsGradeTable");
            $.each(obj,function (key,val){
                switch (val['ThresholdType']){
                    case 'S':
                        table.append(setSPRow(val));
                        break;
                    case 'M':
                        table.append(setMLRow(val));
                        break;
                    case 'P':
                        table.append(setTLRow(val));
                        break;
                }
            });
        }
    });
}

function getExternalPropsByct1(){
    var contestType1=$("#gradeFPExternalFolderFilter").val();
    $.ajax({
        url: "../props/getGradepropsExternal",
        type: 'POST',
        data: {
            "contestType1":contestType1.trim()
        },
        success: function (data) {
            var obj=JSON.parse(data);
            $("#extPropsGradeTable tr").remove();
            var table=$("#extPropsGradeTable");
            $.each(obj,function (key,val){
                switch (val['ThresholdType']){
                    case 'S':
                        table.append(setSPRow(val));
                        break;
                    case 'M':
                        table.append(setMLRow(val));
                        break;
                    case 'P':
                        table.append(setTLRow(val));
                        break;
                }
            });
        }
    });
}

function setMLRow(row){
    var tr=$("<tr></tr>");
    
    var td1=$("<td class='selectTd2'></td>");
    td1.append("<input type='checkbox' name='propsToGrade[]' id='"+row['ContestNum']+"_cd' value='"+row['ContestDesc']+"'/>");
        td1.append("<input type='hidden' name='"+row['ContestNum']+"_ct1' id='"+row['ContestNum']+"_ct1' value='"+row['ContestType']+"'/>");
    td1.append("<input type='hidden' name='"+row['ContestNum']+"_ct2' id='"+row['ContestNum']+"_ct2' value='"+row['ContestType2']+"'/>");
    td1.append("<input type='hidden' name='"+row['ContestNum']+"_ct3' id='"+row['ContestNum']+"_ct3' value='"+row['ContestType3']+"'/>");
    var dateTime=row['WagerCutoff'].split(" ");
    var date=dateTime[0].split("-");
    var newDateFormat=date[1]+"-"+date[2]+"-"+date[0];
    td1.append("<input type='hidden' name='"+row['ContestNum']+"_df' id='"+row['ContestNum']+"_df' value='"+newDateFormat+"'/>");
    
    var td2=$("<td class='propContestDescTd'></td>");
    td2.append("<label class='label-control'>"+row['ContestDesc']+"</label>");
    
    var td3=$("<td class='propTypeTd'></td>");
    td3.append("<label class='label-control'>Money Line</label>");
    td3.append("<input type='hidden' name='"+row['ContestNum']+"_type' id='"+row['ContestNum']+"_type' value='"+row['ThresholdType']+"'/>");

    var td4=$("<td class='contestantsTd'></td>");
    var contestants=row["Contestant"].split(", ");
    if(contestants.length<3){
        td4.append(setInternMoneyLineTable(contestants[0],contestants[1],row['ContestNum']));
    }else{
        td4.append("<center><button type='button' onclick='openContestantList("+row['ContestNum']+")' class='btn btn-warning'><i class='glyphicon glyphicon-plus'></i></button></center>")
    }
    $.each(contestants,function (key,val){
        td4.append("<input type='hidden' teamId='"+val+"' name='"+row['ContestNum']+"_contestants[]' id='"+row['ContestNum']+"_"+val+"'value=''/>");
    });
    
    var td5=$("<td class='pointsTd'></td>");
//    td5.append("<input type='text' class='form-control' name='"+row['ContestNum']+"_pts' id='"+row['ContestNum']+"_pts' size='1'/>");
    
    var td6=$("<td class='ratioTd'></td>");
    td6.append("<input type='text' name='"+row['ContestNum']+"_ratio' readonly id='"+row['ContestNum']+"_ratio' class='form-control' size='1'/>&nbsp;or Push&nbsp;<input type='checkbox' name='"+row['ContestNum']+"_push' id='"+row['ContestNum']+"_push' readonly onclick='setPush("+row['ContestNum']+")'/>");
    
    var td7=$("<td class='selectTd2'></td>");
    td7.append("<input type='checkbox' name='"+row['ContestNum']+"_c' id='"+row['ContestNum']+"_c' value='"+row['ContestDesc']+"'/>");
    
    var td8=$("<td class='commentsTd'></td>");
    td8.append("<textarea class='form-control' name='"+row['ContestNum']+"_comments' id='"+row['ContestNum']+"_comments'></textarea>")
    
    var td9=$("<td class='fdTd'></td>");
    td9.append("<button type='button' class='btn btn-default' onclick='return openDailyFigureDateModal("+row['ContestNum']+")'><i class='glyphicon glyphicon-calendar'></i></button><input type='hidden' name='figureDate' value=''/>");
    
    var td10=$("<td class='gradeButtonTd'></td>");
    td10.append("<button type='button' class='btn btn-success' onclick='gradeMoneyLineProp("+row['ContestNum']+")'>Grade</button>");
    
    tr.append(td1);
    tr.append(td2);
    tr.append(td3);
    tr.append(td4);
    tr.append(td5);
    tr.append(td6);
    tr.append(td7);
    tr.append(td8);
    tr.append(td9);
    tr.append(td10);
    return tr;

}

function setSPRow(row){
    var tr;
    if(row["Status"]==="C")
        tr=$("<tr class='completedProp'></tr>");
    else
        tr=$("<tr></tr>");
    
    var td1=$("<td class='selectTd2'></td>");
    td1.append("<input type='checkbox' name='propsToGrade[]' id='"+row['ContestNum']+"_cd' value='"+row['ContestDesc']+"'/>");
        td1.append("<input type='hidden' name='"+row['ContestNum']+"_ct1' id='"+row['ContestNum']+"_ct1' value='"+row['ContestType']+"'/>");
    td1.append("<input type='hidden' name='"+row['ContestNum']+"_ct2' id='"+row['ContestNum']+"_ct2' value='"+row['ContestType2']+"'/>");
    td1.append("<input type='hidden' name='"+row['ContestNum']+"_ct3' id='"+row['ContestNum']+"_ct3' value='"+row['ContestType3']+"'/>");
    var dateTime=row['WagerCutoff'].split(" ");
    var date=dateTime[0].split("-");
    var newDateFormat=date[1]+"-"+date[2]+"-"+date[0];
    td1.append("<input type='hidden' name='"+row['ContestNum']+"_df' id='"+row['ContestNum']+"_df' value='"+newDateFormat+"'/>");
    
    var td2=$("<td class='propContestDescTd'></td>");
    td2.append("<label class='label-control'>"+row['ContestDesc']+"</label>");
    
    var td3=$("<td class='propTypeTd'></td>");
    td3.append("<label class='label-control'>Spread</label>");
    td3.append("<input type='hidden' name='"+row['ContestNum']+"_type' id='"+row['ContestNum']+"_type' value='"+row['ThresholdType']+"'/>");
    
    var td4=$("<td class='contestantsTd'></td>");
    var contestants=row["Contestant"].split(",");
    td4.append(setInternSpreadTable(contestants[0],contestants[1],row['ContestNum']));
    
    var td5=$("<td class='pointsTd'></td>");
    td5.append("<input type='text' class='form-control' name='"+row['ContestNum']+"_pts' id='"+row['ContestNum']+"_pts' size='1'/>");
    
    var td6=$("<td class='ratioTd'></td>");
//    td6.append("<input type='text' name='"+row['ContestNum']+"_ratio' id='"+row['ContestNum']+"_ratio' class='form-control' size='1'/>&nbsp;or Push&nbsp;<input type='checkbox' name='"+row['ContestNum']+"_ratio' id='"+row['ContestNum']+"_ratio'/>")
    
    var td7=$("<td class='selectTd2'></td>");
    td7.append("<input type='checkbox' name='"+row['ContestNum']+"_c' id='"+row['ContestNum']+"_c' value='"+row['ContestDesc']+"'/>");
    
    var td8=$("<td class='commentsTd'></td>");
    td8.append("<textarea class='form-control' name='"+row['ContestNum']+"_comments' id='"+row['ContestNum']+"_comments'></textarea>")
    
    var td9=$("<td class='fdTd'></td>");
    td9.append("<button type='button' class='btn btn-default' onclick='return openDailyFigureDateModal("+row['ContestNum']+")'><i class='glyphicon glyphicon-calendar'></i></button><input type='hidden' name='figureDate' value=''/>");
    
    var td10=$("<td class='gradeButtonTd'></td>");
    td10.append("<button type='button' class='btn btn-success' onclick='gradeSpreadProp("+row['ContestNum']+")'>Grade</button>");
    
    tr.append(td1);
    tr.append(td2);
    tr.append(td3);
    tr.append(td4);
    tr.append(td5);
    tr.append(td6);
    tr.append(td7);
    tr.append(td8);
    tr.append(td9);
    tr.append(td10);
    return tr;
}

function setInternSpreadTable(contestant1,contestant2,ContestNum){
    var tablescores=$("<table id='insTable2' class='internTable'></table>");
    var trscore=$("<tr></tr>");
    trscore.append("<th>Contestants</th>");
    trscore.append("<th>Win</th>");
    trscore.append("<th>Tie</th>");
    trscore.append("<th>Lost</th>");
    
    var trscore2=$("<tr></tr>");
    trscore2.append("<td>"+contestant1+"<input type='hidden' name='"+ContestNum+"_c1' id='"+ContestNum+"_c1' value='"+contestant1+"'/></td>");
    trscore2.append("<td><input type='radio' name='"+ContestNum+"_c1_status[]' id='"+ContestNum+"_c1_w' value='W' class='form-control' onclick='selectAsWinnerSP(1, "+ContestNum+")'/></td>");
    trscore2.append("<td><input type='radio' name='"+ContestNum+"_c1_status[]' id='"+ContestNum+"_c1_t' value='T' class='form-control'/></td>");
    trscore2.append("<td><input type='radio' name='"+ContestNum+"_c1_status[]' id='"+ContestNum+"_c1_l' value='L' class='form-control'/></td>");
    
    var trscore3=$("<tr></tr>");
    trscore3.append("<td>"+contestant2+"<input type='hidden' name='"+ContestNum+"_c2' id='"+ContestNum+"_c2' value='"+contestant2+"'/></td>");
    trscore3.append("<td><input type='radio' name='"+ContestNum+"_c2_status[]' id='"+ContestNum+"_c2_w' value='W' class='form-control' onclick='selectAsWinnerSP(2, "+ContestNum+")'/></td>");
    trscore3.append("<td><input type='radio' name='"+ContestNum+"_c2_status[]' id='"+ContestNum+"_c2_t' value='T' class='form-control'/></td>");
    trscore3.append("<td><input type='radio' name='"+ContestNum+"_c2_status[]' id='"+ContestNum+"_c2_l' value='L' class='form-control'/></td>");
    
    
    tablescores.append(trscore);
    tablescores.append(trscore2);
    tablescores.append(trscore3);
    return tablescores;
}
function setInternMoneyLineTable(contestant1,contestant2,ContestNum){
    var tablescores=$("<table id='insTable2' class='internTable'></table>");
    var trscore=$("<tr></tr>");
    trscore.append("<th>Contestants</th>");
    trscore.append("<th>Win</th>");
    trscore.append("<th>Tie</th>");
    trscore.append("<th>Lost</th>");
    trscore.append("<th>Scratch</th>");
    
    var trscore2=$("<tr></tr>");
    trscore2.append("<td>"+contestant1+"<input type='hidden' name='"+ContestNum+"_c1' id='"+ContestNum+"_c1' value='"+contestant1+"'/></td>");
    trscore2.append("<td><input type='radio' name='"+ContestNum+"_c1_status[]' id='"+ContestNum+"_c1_w' value='W' class='form-control' onclick='selectAsWinnerML2(1, "+ContestNum+",this.value)'/></td>");
    trscore2.append("<td><input type='radio' name='"+ContestNum+"_c1_status[]' id='"+ContestNum+"_c1_t' value='T' class='form-control' onclick='setValueToContestant(1, "+ContestNum+",this.value)'/></td>");
    trscore2.append("<td><input type='radio' name='"+ContestNum+"_c1_status[]' id='"+ContestNum+"_c1_l' value='L' class='form-control' onclick='setValueToContestant(1, "+ContestNum+",this.value)'/></td>");
    trscore2.append("<td><input type='radio' name='"+ContestNum+"_c1_status[]' id='"+ContestNum+"_c1_s' value='S' class='form-control' onclick='setValueToContestant(1, "+ContestNum+",this.value)'/></td>");
    
    var trscore3=$("<tr></tr>");
    trscore3.append("<td>"+contestant2+"<input type='hidden' name='"+ContestNum+"_c2' id='"+ContestNum+"_c2' value='"+contestant2+"'/></td>");
    trscore3.append("<td><input type='radio' name='"+ContestNum+"_c2_status[]' id='"+ContestNum+"_c2_w' value='W' class='form-control' onclick='selectAsWinnerML2(2, "+ContestNum+",this.value)'/></td>");
    trscore3.append("<td><input type='radio' name='"+ContestNum+"_c2_status[]' id='"+ContestNum+"_c2_t' value='T' class='form-control' onclick='setValueToContestant(2, "+ContestNum+",this.value)'/></td>");
    trscore3.append("<td><input type='radio' name='"+ContestNum+"_c2_status[]' id='"+ContestNum+"_c2_l' value='L' class='form-control' onclick='setValueToContestant(2, "+ContestNum+",this.value)'/></td>");
    trscore3.append("<td><input type='radio' name='"+ContestNum+"_c2_status[]' id='"+ContestNum+"_c2_s' value='S' class='form-control' onclick='setValueToContestant(2, "+ContestNum+",this.value)'/></td>");
    
    
    tablescores.append(trscore);
    tablescores.append(trscore2);
    tablescores.append(trscore3);
    return tablescores;
}
function selectAsWinnerSP(pos, ContestNum){
    if(pos===1){
        $("#"+ContestNum+"_c2_l").prop("checked",true);
    }else if(pos===2){
        $("#"+ContestNum+"_c1_l").prop("checked",true);
    }
}

function selectAsWinnerML2(pos, ContestNum,value){
    if(pos===1){
        if(value!==""){
            $("input[name='"+ContestNum+"_contestants[]']").eq(0).val(value);
            $("input[name='"+ContestNum+"_contestants[]']").eq(1).val("L");
        }
        $("#"+ContestNum+"_c2_l").prop("checked",true);
    }else if(pos===2){
        if(value!==""){
            $("input[name='"+ContestNum+"_contestants[]']").eq(1).val(value);
            $("input[name='"+ContestNum+"_contestants[]']").eq(0).val("L");
        }
        $("#"+ContestNum+"_c1_l").prop("checked",true);
    }
}

function selectAsWinnerML(pos){
    var cont=$("#contestantMLtable tr").length;
    for(var i=0;i<cont;i++){
        if(i!==pos){
            $("#"+i+"_c_status_L").prop("checked",true);
        }
    }
}

function setValueToContestant(pos, ContestNum,value){
    $("input[name='"+ContestNum+"_contestants[]']").eq(pos-1).val(value);
}

function setTLRow(row){
    var tr=$("<tr></tr>");
    
    var td1=$("<td class='selectTd2'></td>");
    td1.append("<input type='checkbox' name='propsToGrade[]' id='"+row['ContestNum']+"_cd' value='"+row['ContestDesc']+"'/>");
    td1.append("<input type='hidden' name='"+row['ContestNum']+"_ct1' id='"+row['ContestNum']+"_ct1' value='"+row['ContestType']+"'/>");
    td1.append("<input type='hidden' name='"+row['ContestNum']+"_ct2' id='"+row['ContestNum']+"_ct2' value='"+row['ContestType2']+"'/>");
    td1.append("<input type='hidden' name='"+row['ContestNum']+"_ct3' id='"+row['ContestNum']+"_ct3' value='"+row['ContestType3']+"'/>");
    var dateTime=row['WagerCutoff'].split(" ");
    var date=dateTime[0].split("-");
    var newDateFormat=date[1]+"-"+date[2]+"-"+date[0];
    td1.append("<input type='hidden' name='"+row['ContestNum']+"_df' id='"+row['ContestNum']+"_df' value='"+newDateFormat+"'/>");
    
    var td2=$("<td class='propContestDescTd'></td>");
    td2.append("<label class='label-control'>"+row['ContestDesc']+"</label>");
    
    var td3=$("<td class='propTypeTd'></td>");
    td3.append("<label class='label-control'>Total</label>");
    td3.append("<input type='hidden' name='"+row['ContestNum']+"_type' id='"+row['ContestNum']+"_type' value='"+row['ThresholdType']+"'/>");
    var td4=$("<td class='contestantsTd'></td>");
    
    var td5=$("<td class='pointsTd'></td>");
    td5.append("<input type='text' class='form-control' name='"+row['ContestNum']+"_pts' id='"+row['ContestNum']+"_pts' size='1'/>");
    
    var td6=$("<td class='ratioTd'></td>");
//    td6.append("<input type='text' name='"+row['ContestNum']+"_ratio' id='"+row['ContestNum']+"_ratio' class='form-control' size='1'/>&nbsp;or Push&nbsp;<input type='checkbox' name='"+row['ContestNum']+"_ratio' id='"+row['ContestNum']+"_ratio'/>")
    
    var td7=$("<td class='selectTd2'></td>");
    td7.append("<input type='checkbox' name='"+row['ContestNum']+"_c' id='"+row['ContestNum']+"_c' value='"+row['ContestDesc']+"'/>");
    
    var td8=$("<td class='commentsTd'></td>");
    td8.append("<textarea class='form-control' name='"+row['ContestNum']+"_comments' id='"+row['ContestNum']+"_comments'></textarea>")
    
    var td9=$("<td class='fdTd'></td>");
    td9.append("<button type='button' class='btn btn-default' onclick='return openDailyFigureDateModal("+row['ContestNum']+")'><i class='glyphicon glyphicon-calendar'></i></button><input type='hidden' name='figureDate' value=''/>");
    
    var td10=$("<td class='gradeButtonTd'></td>");
    td10.append("<button type='button' class='btn btn-success' onclick='gradeTotalProp("+row['ContestNum']+")'>Grade</button>");
    
    tr.append(td1);
    tr.append(td2);
    tr.append(td3);
    tr.append(td4);
    tr.append(td5);
    tr.append(td6);
    tr.append(td7);
    tr.append(td8);
    tr.append(td9);
    tr.append(td10);
    return tr;
}

function gradeTotalProp(contestNum){
    if(!$("#"+contestNum+"_c").is(":checked")&&$("#"+contestNum+"_pts").val()===""){
        alert("Points value is requeried");
    }else{
        var contestants;
        if($("#"+contestNum+"_c").is(":checked")){
            contestants=["Over;C","Under;C"];
        }else{
            contestants=["Over;w","Under;w"];
        }
        var cancel="A";
        if($("#"+contestNum+"_c").is(":checked")){
            cancel="C";
        }
        $.ajax({
            url: "greadeTLProps",
            type: 'POST',
            data: {
                "ct":$("#"+contestNum+"_ct1").val(),
                "ct2":$("#"+contestNum+"_ct2").val(),
                "ct3":$("#"+contestNum+"_ct3").val(),
                "cd":$("#"+contestNum+"_cd").val(),
                "comments":$("#"+contestNum+"_comments").val(),
                "contestants":contestants,
                "points":$("#"+contestNum+"_pts").val(),
                "df":$("#"+contestNum+"_df").val(),
                "status":cancel
            },success: function (data) {
                alert(data);
            }
        });
        return false;
    }
}

function gradeSpreadProp(contestNum){
    if(!$("#"+contestNum+"_c").is(":checked")&&($("input[name='"+contestNum+"_c1_status[]']:checked").length<1||
            $("input[name='"+contestNum+"_c2_status[]']:checked").length<1)){
        alert("You must select a result for the contestant");
    }else if(!$("#"+contestNum+"_c").is(":checked")&&$("#"+contestNum+"_pts").val()===""){
        alert("Points value is requeried");
    }else{
        var c1Name=$("#"+contestNum+"_c1").val();
        var c1Status;
        var c2Status;
        if($("#"+contestNum+"_c").is(":checked")){
            c1Status="C";
            c2Status="C";
        }else{
            c1Status=$("input[name='"+contestNum+"_c1_status[]']:checked").val();
            c2Status=$("input[name='"+contestNum+"_c2_status[]']:checked").val();
        }
        var c2Name=$("#"+contestNum+"_c2").val();
        var contestants=[c1Name+";"+c1Status,c2Name+";"+c2Status];
        var cancel="A";
        if($("#"+contestNum+"_c").is(":checked"))
            cancel="C";
        $.ajax({
            url: "greadeSPProps",
            type: 'POST',
            data: {
                "ct":$("#"+contestNum+"_ct1").val(),
                "ct2":$("#"+contestNum+"_ct2").val(),
                "ct3":$("#"+contestNum+"_ct3").val(),
                "cd":$("#"+contestNum+"_cd").val(),
                "contestants":contestants,
                "points":$("#"+contestNum+"_pts").val(),
                "df":$("#"+contestNum+"_df").val(),
                "comments":$("#"+contestNum+"_comments").val(),
                "status":cancel
            },success: function (data) {
                alert(data);
            }
        });
        return false;
    }
}

function gradeMoneyLineProp(contestNum){
    var contestantsHasValue=false;
    var contestantsArray=$("input[name='"+contestNum+"_contestants[]']");
    contestantsArray.each(function (){
        if($(this).val()===""&&!$("#"+contestNum+"_c").is(":checked")){
            contestantsHasValue=true;
        }
    });
    if(contestantsHasValue){
        alert("You must select a result for the contestant");
    }else{
        var contestants=[];
        $.each(contestantsArray, function (){
            var contStatus;
            if($("#"+contestNum+"_c").is(":checked")){
                contStatus="C";
            }else{
                contStatus=$(this).val();
            }
            var tmpCont=$(this).attr("teamid")+";"+contStatus;
            contestants.push(tmpCont);
        });
        var cancel="A";
        if($("#"+contestNum+"_c").is(":checked"))
            cancel="C";

        if($("#"+contestNum+"_push").is(":checked"))
            cancel="P";

        $.ajax({
            url: "greadeMLProps",
            type: 'POST',
            data: {
                "ct":$("#"+contestNum+"_ct1").val().trim(),
                "ct2":$("#"+contestNum+"_ct2").val().trim(),
                "ct3":$("#"+contestNum+"_ct3").val().trim(),
                "cd":$("#"+contestNum+"_cd").val().trim(),
                "contestants":contestants,
                "ratio":$("#"+contestNum+"_ratio").val(),
                "df":$("#"+contestNum+"_df").val(),
                "comments":$("#"+contestNum+"_comments").val(),
                "status":cancel
            },success: function (data) {
                alert(data);
            }
        });
        return false;
    }
}

function setMLContestantStatus(){
    var contestantCant=$('#contestantMLtable tr').length;
    var contestNum=$("#contestantMLcontestNum").val();
    for(var i=0;i<contestantCant;i++){
        var status=$("input[name='"+i+"_c_status[]']:checked").val();
        $("input[name='"+contestNum+"_contestants[]']").eq(i).val(status);
    }
    enableRatioPush(contestNum);
    $("#gradeMlPropContestants").modal("toggle");
}


function setPush(contestNum){
    if($("#"+contestNum+"_push").is(":checked"))
        $("#"+contestNum+"_ratio").prop("readonly",true);
    else
        $("#"+contestNum+"_ratio").prop("readonly",false);
}


function enableRatioPush(contestNum){
    $("#"+contestNum+"_push").prop("readonly",false);
    $("#"+contestNum+"_ratio").prop("readonly",false);
}