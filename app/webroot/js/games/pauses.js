$(document).ready(function () {
    $(".btn-edit, .btn-cancel, .btn-save, #footer").hide();
    
    $("#ps_sport").change(function (){
        getSubSports();
    });
    
    
    $("#b_setPause").click(function (){
        var rotNum=$("#ps_rot").val();
        var sport=$("#ps_sport").val();
        var subSport=$("#ps_subSport").val();
        var period  =$("#ps_period").val();
        var lineType=$("#ps_lineType").val();
        actionPause(rotNum,sport,subSport,period,lineType,1);
    });
    
    
});


function getSubSports(){
    $.ajax({
        url: "/games/loadleagues/"+$("#ps_sport").val(),
        dataType: 'JSON',
        success: function (data) {
            var select=$("#ps_subSport");
            $("#ps_subSport option").remove();
            $.each(data,function (key,val){
                select.append(new Option(val["SportSubType"],val["SportSubType"]));
            });
        }
    })
}

function getperiods(){
    $.ajax({
        url: "/games/getperiods",
        type: 'POST',
        dataType: 'JSON',
        data:{
            "sport":$("#ps_sport").val(),
            "subSport":$("#ps_subSport").val()
        },success: function (data) {
            var select=$("#ps_period");
            $("#ps_period option").remove();
            select.append(new Option("ANY",""));
            $.each(data,function (key,val){
                select.append(new Option(val["PeriodDescription"],val["PeriodNumber"]));
            });
        }
    })
}

function actionPause(rotNum,sport,subSport,period,lineType,option){
    var dbs="";
    $.each($(".ps_db"),function (){
        if($(this).is(":checked"))
            dbs+=$(this).val()+",";
    })
    dbs=dbs.substr(0,dbs.length-1);
    $.ajax({
        url: "/games/actionPause",
        type: 'POST',
        data:{
            "rotNum":rotNum,
            "sport":sport,
            "subSport":subSport,
            "period":period,
            "lineType":lineType,
            "option":option,
            "dbs":dbs
        },success: function (data) {
            window.location.reload();
        }
    })
}