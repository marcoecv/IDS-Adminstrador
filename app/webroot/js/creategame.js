$(document).ready(function () {

   if( typeof  $('#gamedateModalCreate').datetimepicker !== 'undefined' && jQuery.isFunction(  $('#gamedateModalCreate').datetimepicker ) ) {
    $('#gamedateModalCreate').datetimepicker({
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0
    });
    }

    $('#gametimeModalCreate').datetimepicker({
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 1,
        minView: 0,
        maxView: 1,
        forceParse: 0
    });

    $('#wagercutoffModalCreate').datetimepicker({
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 1,
        minView: 0,
        maxView: 1,
        forceParse: 0
    });

    $("#gamefrm").validationEngine({
        ajaxFormValidation: true,
        onAjaxFormComplete: ajaxValidationCallback,
        scroll: false
    });

    $("#gametimevalCreate").change(function () {
        $("#wagercutoffvalCreate").val($("#gametimevalCreate").val());
    });

    $("#sportidCreate").change(function () {
        hidePitcher($("#sportidCreate").val().trim());
        loadLeagues($("#sportidCreate").val().trim());
    });

    $("#leagueidCreate").change(function (evt) {
        if ($("#leagueidCreate :checked").attr("hasdraw") === "true") {
            $("#drawGroup").show();
        } else {
            $("#drawGroup").hide();
        }
    });

    $("#nextCreateGame").click(function (){
        saveGame();
        formReset();
    });
    $("#saveCreateGame").click(function (){
        saveGame();
        formReset();
        $("#createGameModal").modal("toggle");
    });
});



function openCreateGameModal(){
    $.ajax({
        url: "games/getSports",
        success: function (data) {
            var obj=JSON.parse(data);
            var select=$('#sportidCreate');
            $.each(obj,function (key,val){
                var opt=new Option(val["SportType"],val["SportType"]);
                select.append(opt);
            });
            
        }
    })
    
    $('#createGameModal').modal('toggle')
}

function formReset() {
	$("#rotANumberCreate").val("");
	$("#rotHNumberCreate").val("");
	$("#teamAidCreate").val("");
	$("#teamHidCreate").val("");
	$("#broadcastidCreate").val("");
	$("#commentsCreate").val("");
	$("#gametimevalCreate").val("");
	$("#wagercutoffvalCreate").val("");
	$("#correlationidCreate").val("");
	$("#drawRotNumberCreate").val("");
}

function upper(){
    var value=$("#countryid").val();
    value=value.toUpperCase();
    $("#countryid").val(value);
}
function saveGame() {
    if($("#gamefrm").validationEngine('validate') ){
        var preventbuying;
        if($('#preventbuyingCreate:checked')){
            preventbuying='Y';
        }else{
            preventbuying='N';
        }
        $.ajax({
            url: "games/insertgame",
            type: 'POST',
            data: {
                'sportid':$('#sportidCreate').val(),
                'leagueid':$('#leagueidCreate').val(),
                'countryid':$('#scheduleTextCreate').val(),
                'rotANumber':$('#rotANumberModalCreate').val(),
                'teamAid':$('#teamAidModalCreate').val(),
                'pitcher1':$('#pitcher1Create').val(),
                'rotHNumber':$('#rotHNumberModalCreate').val(),
                'teamHid':$('#teamHidModalCreate').val(),
                'pitcher2':$('#pitcher2Create').val(),
                'drawRotNumber':$('#drawRotNumberCreate').val(),
                'broadcastid':$('#broadcastidCreate').val(),
                'comments':$('#commentsCreate').val(),
                'gamedateval':$('#gamedatevalCreate').val(),
                'gametimeval':$('#gametimevalCreate').val(),
                'wagercutoffval':$('#wagercutoffvalCreate').val(),
                'preventbuying':preventbuying,
                'restrictions':$('[name=restrictionsCreate]:checked').val(),
                'correlationid':$('#correlationidCreate').val(),
            },
            success: function (data) {
            }         
        });
    }
   
	
}

function ajaxValidationCallback(status, form, json, options) {
    if(status === true) {
        $(':input', '#gamefrm').not(':button, :submit, :reset, :hidden').val('').removeAttr('checked').removeAttr('selected');
        $("#message_sent").slideDown(400).delay(3000).slideUp(400);
    }
}

function enableDraw(value){
    if(!value)
        $("#drawRotNumberCreate").attr('disabled','disabled');
    else
         $("#drawRotNumberCreate").attr('disabled','');   
}
    
function hidePitcher(value){
    if(value==="Baseball"){
        $("#pitcherDiv1").attr("style","display:block");
        $("#pitcherDiv2").attr("style","display:block");
    }else{
        $("#pitcherDiv1").attr("style","display:none");
        $("#pitcherDiv2").attr("style","display:none");
    }
}


function setCorrelationalId(){
    var Team1=$("#teamAidModalCreate").val();
    var Team2=$("#teamHidModalCreate").val();
    var sport=$("#sportidCreate").val();
    var subSport=$("#leagueidCreate").val();
    var d=$("#gamedatevalCreate").val();
    var date=d.substring(0,2)+d.substring(3,5)+"-";
    $("#correlationidCreate").val(date+sport.substring(0,4)+"-"+subSport.substring(0,6)+" "+Team1.substring(0,11)+"@"+Team2.substring(0,11));
}   

function loadLeagues(sportid) {
    $.ajax({
        url: "games/loadleagues/" + sportid,
        type: 'POST',
        dataType: "json",
        success: function (data) {
            var i = 1;
            $("#leagueidCreate").html("");
            while (data['row' + i] != undefined) {
                $("#leagueidCreate").append("<option value='" + data['row' + i]['SportSubType'].trim() + "' hasdraw='" + (data['row' + i]['DrawFlag'] == 'Y') + "'>"
                        + data['row' + i]['SportSubType'].trim() + "</option>");
                i++;
            }

            $("#leagueid").change();
        }
    });
}
