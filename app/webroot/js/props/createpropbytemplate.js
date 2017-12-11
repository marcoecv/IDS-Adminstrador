var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
$(document).ready(function() {
        $(".btn-edit, .btn-cancel, .btn-save, #footer").hide();
        loadSports();
	$('#dateFrom').datetimepicker({
        weekStart: 1,
        todayBtn:  1,
		autoclose: 1,
		todayHighlight: 1,
		startView: 2,
		minView: 2,
		forceParse: 0
    });

	$('#dateTo').datetimepicker({
        weekStart: 1,
        todayBtn:  1,
		autoclose: 1,
		todayHighlight: 1,
		startView: 2,
		minView: 2,
		forceParse: 0
    });

    $("#sporttype").change(function (){
        loadSubSports($("#sporttype").val());
    });
    
    $('table.cell-border').DataTable({
        "bPaginate": false,
        "bFilter": true,
        "sScrollY": "250",
        "sScrollX": "100",
        "sScrollXInner": "100%",
        "bScrollCollapse": true
    });
    
    $("#spreadPropTable_filter").attr("style","display:none");
    $("#moneyLinePropTable_filter").attr("style","display:none");
    $("#totalPropTable_filter").attr("style","display:none");
    $("#gamesTable_filter").attr("style","display:none");
    
    $('#searchGamesTable').keyup(function(){
          $("#gamesTable").DataTable().search($(this).val()).draw() ;
    }); 
    
    $('#searchSpreadTable').keyup(function(){
          $("#spreadPropTable").DataTable().search($(this).val()).draw() ;
    }); 
    $('#searchMoneLineTable').keyup(function(){
          $("#moneyLinePropTable").DataTable().search($(this).val()).draw() ;
    }); 

    $('#searchTotalTable').keyup(function(){
          $("#totalPropTable").DataTable().search($(this).val()).draw() ;
    }); 
    
    $("#selectAll").click(function (){
        if($("#selectAll").is(":checked")){
            $("#gamesTable").find("input[type='checkbox']").each(function (){
                $(this).prop("checked",true);
            });
        }else{
           $("#gamesTable").find("input[type='checkbox']").each(function (){
                $(this).prop("checked",false);
            }); 
        }
    });
    
    $("#spreadSelectAll").click(function (){
        if($("#spreadSelectAll").is(":checked")){
            $("#spreadPropTable").find("input[type='checkbox']").each(function (){
                $(this).prop("checked",true);
            });
        }else{
           $("#spreadPropTable").find("input[type='checkbox']").each(function (){
                $(this).prop("checked",false);
            }); 
        }
    });
    
    $("#moneylineSelectAll").click(function (){
        if($("#moneylineSelectAll").is(":checked")){
            $("#moneyLinePropTable").find("input[type='checkbox']").each(function (){
                $(this).prop("checked",true);
            });
        }else{
           $("#moneyLinePropTable").find("input[type='checkbox']").each(function (){
                $(this).prop("checked",false);
            }); 
        }
    });
    
    $("#totalSelectAll").click(function (){
        if($("#totalSelectAll").is(":checked")){
            $("#totalPropTable").find("input[type='checkbox']").each(function (){
                $(this).prop("checked",true);
            });
        }else{
           $("#totalPropTable").find("input[type='checkbox']").each(function (){
                $(this).prop("checked",false);
            }); 
        }
    });
    
    
    
    $("#getGamesButton").click(function (){
        $("#sendPlayerPropList").prop("disabled",false);
        loadGames();
        return false;
    });

});

function validateGamesAndTemplates(){
    var gamesCheckbox=$("input[name='games[]']");
    var gamesSelected=0;
    var templatesSelected=0;
    $(gamesCheckbox).each(function (){
        if($(this).is(":checked"))
            gamesSelected++;
    });
    if(gamesSelected===0){
        $("#messageSpan").text("There is no Games Selected");
        $("#defaultMsgModal").modal("toggle");
        return false;
    }
    $("input[name='spreadProps[]']").each(function (){
        if($(this).is(":checked"))
            templatesSelected++;
    });
    $("input[name='moneylineProps[]']").each(function (){
        if($(this).is(":checked"))
            templatesSelected++;
    });
    $("input[name='totalProp[]']").each(function (){
        if($(this).is(":checked"))
            templatesSelected++;
    });
    
    if(templatesSelected===0){
        $("#messageSpan").text("There is no prop templates selected");
        $("#defaultMsgModal").modal("toggle");
        return false;
    }
    return true;
}

function removeOption(value){
    $("#contestant option[value='"+value+"']").each(function(){
        $(this).remove();
    });
}


function loadSubSports(sportType){
    $("#subsporttype").find('option').remove();
    $.ajax({
        url: "../games/loadleagues/"+sportType,
        success: function (data) {
            var obj= JSON.parse(data);
            var select=$("#subsporttype");
            $("#sportTypeFP").val(sportType);
            $("#sportFP").text(sportType);
            $.each(obj,function(key,val){
                var opt=new Option(val['SportSubType'].trim(),val['SportSubType'].trim());
                select.append(opt);
            });
            var opt=new Option("All Sub-Sports","");
                select.append(opt);
        }
    });
}

function loadSports(){
    $.ajax({
        url: "../games/getSports",
        success: function (data) {
            var obj= JSON.parse(data);
            var select=$("#sporttype");
            $.each(obj,function(key,val){
                var opt=new Option(val['SportType'].trim(),val['SportType'].trim());
                select.append(opt);
            });
        }
    });
}

function loadGames(){
    var t = $('#gamesTable').DataTable();
    t.clear().draw();
    $.ajax({
        url: "getgamesbydate",
        type: 'POST',
        data: {
            "dateFrom":$("#input_dateFrom").val(),
            "dateTo":$("#input_dateTo").val(),
            "sport":$("#sporttype").val(),
            "subsport":$("#subsporttype").val()
        },success: function (data) {
            var obj=JSON.parse(data);
            $.each(obj,function (key,val){
                var dateTime=val["GameDateTime"].split(" ");
                var date=dateTime[0].split("-");
                var time=dateTime[1].split(":");
                var date= months[date[1]-1]+" "+date[2]+", "+time[0]+":"+time[1];
                t.row.add( [
                    "<center><input type='checkbox' class='form-control' name='games[]' value='"+val["GameNum"]+"'   /></center>",
                    val["Team1ID"],
                    val["Team2ID"],
                    date
                ] ).draw();

            });
        }
    });
    loadPropsByType();
}

function loadPropsByType(){
    var t1 = $('#spreadPropTable').DataTable();
    var t2 = $('#moneyLinePropTable').DataTable();
    var t3 = $('#totalPropTable').DataTable();
    t1.clear().draw();
    t2.clear().draw();
    t3.clear().draw();
    var proptype="";
    if($("#gameProps").is(":checked")){
        proptype="Game";
    }else if($("#playerProps").is(":checked")){
        proptype="Player";
    }
        $.ajax({
            url: "loadpropslist",
            type: 'POST',
            data: {
                "sporttype":$("#sporttype").val(),
                "subsporttype":$("#subsporttype").val(),
                "propType":proptype
            },
            success: function (data) {
                var obj=JSON.parse(data);
                $.each(obj,function (key,val){
                    var description=val["PropDescri"].replace("<","&lt;");
                    var description2= description.replace(">", "&gt;");
                    switch(val["PropSubType"]){
                        case "Spread":
                            t1.row.add( [
                                "<center><input type='checkbox' class='form-control' name='spreadProps[]' value='"+val["PropDescri"]+"%"+val["Unit"]+"%S%"+btoa(val["WagerInfoLink"])+"%"+val["PropID"]+"%"+val["PropWithTeams"]+"%"+val["PropWithPlayers"]+"'/></center>",
                                description2
                            ] ).draw();
                            break;
                        case "MoneyLine":
                            t2.row.add( [
                                "<center><input type='checkbox' class='form-control' name='moneylineProps[]' value='"+val["PropDescri"]+"%"+val["Unit"]+"%M%"+btoa(val["WagerInfoLink"])+"%"+val["PropID"]+"%"+val["PropWithTeams"]+"%"+val["PropWithPlayers"]+"'/></center>",
                                description2
                            ] ).draw();
                            break;
                        case "Total":
                            t3.row.add( [
                                "<center><input type='checkbox' class='form-control' name='totalProp[]' value='"+val["PropDescri"]+"%"+val["Unit"]+"%T%"+btoa(val["WagerInfoLink"])+"%"+val["PropID"]+"%"+val["PropWithTeams"]+"%"+val["PropWithPlayers"]+"'/></center>",
                                description2
                            ] ).draw();
                            break
                    }
                });
            }
        });
}


