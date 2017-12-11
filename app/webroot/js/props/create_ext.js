$(document).ready(function () {
    $(".btn-edit").hide();
    $('#gamedate_prop').datetimepicker({
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0
    });

    $('#gametime_prop').datetimepicker({
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 1,
        minView: 0,
        maxView: 1,
        forceParse: 0
    });

    $('#wagertime_prop').datetimepicker({
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 1,
        minView: 0,
        maxView: 1,
        forceParse: 0
    });

    $("#scheduleButton").click(function () {
        $("#confirmationModal").modal("toggle");
        window.location = "/games";
    });

    $("#nextButton").click(function () {
        $("#confirmationModal").modal("toggle");
        formReset();
        $("#rotANumber").select();
    });

    $("#sportid").select();

    $("#spread_prop").click(function (){
            $("#units").removeAttr('disabled');
            $("#contestant option").remove();
            teamTotalPropSelected=false;
        });
        
        
        $("#over_under").click(function (){
            $("#units").removeAttr('disabled');
            teamTotalPropSelected=true;
        });
        $("#cont_number").change(function (){
            if(teamTotalPropSelected){
                if($('#contestant option').size()<1){
                    $("#cont_name").val("Over");
                }else{
                    $("#cont_name").val("Under");
                }
            }
        });
        
        $("#add_contestant").click(function (){
            $("#cont_number").focus();
            var number=document.getElementById('cont_number').value;
            var name=document.getElementById('cont_name').value;
            if(number===""||name===""){
                alert("Contestant number or Name field is empty");
                return false;
            }else{
                var opt=new Option(number+" - "+name,number+"_"+name);
                opt.setAttribute("ondblclick", "removeOption(this.value)");
                $("#contestant").append(opt);
                document.getElementById('cont_number').value="";
                document.getElementById('cont_name').value="";
            }
            return false;
        });
        
        $("#cont_name").keypress(function (e){
            var key = e.which;
            if(key === 13){
                $("#cont_number").focus();
                var number=document.getElementById('cont_number').value;
                var name=document.getElementById('cont_name').value;
                if(number===""||name===""){
                    alert("Contestant number or Name field is empty");
                    return false;
                }else{
                    var opt=new Option(number+" - "+name,number+"_"+name);
                    opt.setAttribute("ondblclick", "removeOption(this.value)");
                    $("#contestant").append(opt);
                    document.getElementById('cont_number').value="";
                    document.getElementById('cont_name').value="";
                }
                return false;
            }
        });


});



function removeOption(value) {
    $("#contestant option[value='" + value + "']").each(function () {
        $(this).remove();
    });
}
function saveAction() {
    var contestants = "";
    $("#contestant option").each(function () {
        contestants += $(this).val() + "/";
    });
    var type;
    if($("#over_under").is(":checked"))
        type=$("#over_under").val();
    else if($("#spread_prop").is(":checked"))
        type=$("#spread_prop").val()
    else
        type="";
    $.ajax({
        url: "create",
        type: 'POST',
        data: {
            "contestType": "." + $("#level1").val(),
            "contestType2": $("#level2").val(),
            "contestType3": $("#level3").val(),
            "contestDesc": $("#prop_name").val(),
            "contestDate": $("#input_gamedate_prop").val(),
            "contestTime": $("#input_gametime_prop").val(),
            "contestCutOff": $("#input_wagertime_prop").val(),
            "comments": $("#comments").val(),
            "unit": $("#units").val(),
            "contestants": contestants,
            "type": type,
            "correlationID": $("#correlational_id").val()
        }, success: function (data) {
            if (data === '-1')
                alert("Error");
            else
                window.location = "games";
        }
    });
}

function cancelAction() {
    window.location = "games";
}

function selectAllContestants() {
    $("#contestant option").each(function () {
        $(this).attr('selected', 'selected')
    });
}

function editAction() {
    return true;
}


function customMenu(node) {
    items = {};
    return items;
}
