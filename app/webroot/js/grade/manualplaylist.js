$(document).ready(function() {
    $(".btn-edit, .btn-cancel, .btn-save, #footer").hide();
    
    $('#mpg_dfDiv').datetimepicker({
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0
    });
    $("#confirmationButton").click(function (){
        $("#defaultMsgModal").modal('toggle');
    });
    
    $("#confirmationManualButton").click(function (){
        $("#gradeModal").modal("toggle");
        $("#messageSpan").text("Grade Complete");
        $("#defaultMsgModal").modal('toggle');
    });
    
    $("#grade").click(function (){
       openGradeManualPlayModal();
    });
    
    $("#searchByDays").click(function (){
        searchByDays();
    });
    
    $("#showAllFuture").click(function (){
        if($(this).is(":checked"))
            searchFuture();
    });
    
    $("#mpg_grade").click(function (){
        gradeManualPlay();
    });
});


function saveAction() {
	
}

function cancelAction() {
	window.location = "/administrator/index.php/games";
}


function searchByDays(){
    $("#manualPlaysTableBody tr").remove();
    $.ajax({
        url: "getManualPlaysList",
        type: 'POST',
        data: {
            "days":$("#days").val(),
            "action":2
        },success: function (data) {
            var obj=JSON.parse(data);
            setManualPlaysTr(obj)
        }
    })
}
function searchFuture(){
    $("#manualPlaysTableBody tr").remove();
    $.ajax({
        url: "getManualPlaysList",
        type: 'POST',
        data: {
            "days":null,
            "action":3
        },success: function (data) {
            var obj=JSON.parse(data);
            setManualPlaysTr(obj);
        }
    });
}

function setManualPlaysTr(array){
    var table=$("#manualPlaysTableBody");
    $.each(array,function (key,val){
        var tr=$("<tr id='"+val["TicketNumber"]+"_"+val["WagerNumber"]+"'></tr>");
        
        var td=$("<td class='selecttd'></td>");
        td.append("<input type='radio' name='selectedToGrade[]' value='"+val["TicketNumber"]+"_"+val["WagerNumber"]+"'/>")
        td.append("<input type='hidden' id='"+val["TicketNumber"]+"_"+val["WagerNumber"]+"_AmountWagered' value='"+val["AmountWagered"]+"'/>");
        td.append("<input type='hidden' id='"+val["TicketNumber"]+"_"+val["WagerNumber"]+"_TicketWriter' value='"+val["TicketWriter"]+"'/>");
        td.append("<input type='hidden' id='"+val["TicketNumber"]+"_"+val["WagerNumber"]+"_PostedDateTime' value='"+val["PostedDateTime"]+"'/>");
        td.append("<input type='hidden' id='"+val["TicketNumber"]+"_"+val["WagerNumber"]+"_ToWinAmount' value='"+val["ToWinAmount"]+"'/>");
        td.append("<input type='hidden' id='"+val["TicketNumber"]+"_"+val["WagerNumber"]+"_Outcome' value='"+val["Outcome"]+"'/>");
        td.append("<input type='hidden' id='"+val["TicketNumber"]+"_"+val["WagerNumber"]+"_Description' value='"+val["Description"]+"'/>");
        tr.append(td);
        
        tr.append("<td class='datetd'>"+val["Date"]+"</td>");
        tr.append("<td class='customertd'>"+val["CustomerID"]+"</td>");
        tr.append("<td class='desctd'>"+val["Description"]+"</td>");
        tr.append("<td class='statustd'>"+val["Outcome"]+"</td>");
        table.append(tr);
    });
}


function openGradeManualPlayModal(){
    var id=$("input[name='selectedToGrade[]']:checked").val();
    if(id===""||id===undefined){
        alert("There's no play selected");
    }else{
        $("#mpg_id").val(id);
        $("#mpg_ticketDateTime").text($("#"+id+"_PostedDateTime").val());
        $("#mpg_user").text($("#"+id+"_TicketWriter").val());
        $("#mpg_description").val($("#"+id+"_Description").val());
        $("#mpg_risk").val($("#"+id+"_AmountWagered").val());
        var dateArray=$("#"+id+"_PostedDateTime").val().split(" ");
        var date=dateArray[0].split("-");
        var gradeDate=date[1]+"/"+date[2]+"/"+date[0];
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        if(dd<10) {
            dd='0'+dd
        } 
        if(mm<10) {
            mm='0'+mm
        } 
        var figureDate = mm+'-'+dd+'-'+yyyy;
        
        $("#mpg_df").val(figureDate);
        $("#mpg_gradeDate").val(gradeDate);
        var outcome=$("#"+id+"_Outcome").val();
        switch (outcome){
            case "W":
                $("#mpg_win").prop("checked",true);
                $("#mpg_lose").prop("checked",false);
                $("#mpg_cancel").prop("checked",false);
                
                break;
            case "L":
                $("#mpg_win").prop("checked",false);
                $("#mpg_lose").prop("checked",true);
                $("#mpg_cancel").prop("checked",false);
                break;
            case "C":
                $("#mpg_win").prop("checked",false);
                $("#mpg_lose").prop("checked",false);
                $("#mpg_cancel").prop("checked",true);
                break;
        }
        $("#mpg_ticketDateTime").text();
        $("#manualPlaysGradingModal").modal("toggle");
    }
}

function setWinLostValue(input,outcome){
    if($(input).is(":checked")){
        var id=$("#mpg_id").val();
        if(outcome==="W"){
            $("#mpg_towin").val($("#"+id+"_ToWinAmount").val());
            $("#mpg_lose").prop("checked",false);
            $("#mpg_cancel").prop("checked",false);
        }else if(outcome==="L"){
            $("#mpg_win").prop("checked",false);
            $("#mpg_towin").val($("#"+id+"_AmountWagered").val());
            $("#mpg_cancel").prop("checked",false);
        }else if(outcome==="C"){
            $("#mpg_win").prop("checked",false);
            $("#mpg_lose").prop("checked",false);
            $("#mpg_towin").val("");
        }
    }
}

function gradeManualPlay(){
    if(validateGradeManualPlays()){
        var id=$("#mpg_id").val().split("_");
        var TicketNumber=id[0];
        var WagerNumber=id[1];
        var Outcome=$("input[name='mpg_outcome[]']:checked").val();
        var AmountLost;
        var AmountWon;
        switch (Outcome){
            case "W":
                AmountLost=0;
                AmountWon=$("#mpg_towin").val();
                break;
            case "L":
                AmountLost=$("#mpg_towin").val();
                AmountWon=0;
                break;
            case "C":
                AmountLost=0;
                AmountWon=0;
                break;
        }

        $.ajax({
            url: "gradeManualPlay",
            type: 'POST',
            data: {
                "TicketNumber":TicketNumber,
                "WagerNumber":WagerNumber,
                "Outcome":Outcome,
                "DailyFigureDate":$("#mpg_df").val(),
                "AmountWagered":$("#mpg_risk").val(),
                "AmountLost":AmountLost,
                "AmountWon":AmountWon
            },success: function (data, textStatus, jqXHR) {
                $("#manualPlaysGradingModal").modal("toggle");
            }
        });
    }
}

function validateGradeManualPlays(){
    var Outcome=$("input[name='mpg_outcome[]']:checked").val();
    var risk=parseInt($("#mpg_risk").val());
    var value=parseInt($("#mpg_towin").val());
    if(Outcome===""||Outcome===undefined){
        alert("There's no Outcome value selected");
        return false;
    }else if($("#mpg_description")===""){
        alert("Description field can not be empty");
        return false;
    }else if(Outcome!=="C" && $("#mpg_towin").val()===""){
        alert("There's no win/lost value");
        return false;
    }else if(Outcome==="L" && value>risk){
        alert("Lost value can not be higher than risk amount");
        return false;
    }else{
        return true;
    }
}