$(document).ready(function() {
        $(".btn-edit").hide();
	$('#gamedate_prop').datetimepicker({
        weekStart: 1,
        todayBtn:  1,
		autoclose: 1,
		todayHighlight: 1,
		startView: 2,
		minView: 2,
		forceParse: 0
    });

	$('#gametime_prop').datetimepicker({
        weekStart: 1,
        todayBtn:  1,
		autoclose: 1,
		todayHighlight: 1,
		startView: 1,
		minView: 0,
		maxView: 1,
		forceParse: 0
    });

	$('#wagertime_prop').datetimepicker({
        weekStart: 1,
        todayBtn:  1,
		autoclose: 1,
		todayHighlight: 1,
		startView: 1,
		minView: 0,
		maxView: 1,
		forceParse: 0
    });

	$("#scheduleButton").click(function (){
		$("#confirmationModal").modal("toggle");
		window.location = "/games";
	});
	
	$("#nextButton").click(function (){
		$("#confirmationModal").modal("toggle");
		formReset();
		$("#rotANumber").select();
	});
        
	$("#sportid").select();
        
        $("#spread").click(function (){
            $("#units").attr('disabled','disabled');
        });
        $("#over_under").click(function (){
                $("#units").removeAttr('disabled');;
        });
        $("#add_contestant").click(function () {
            $("#cont_number").focus();
        var number = document.getElementById('cont_number').value;
        var name = document.getElementById('cont_name').value;
        if (number === "" || name === "") {
            alert("Contestant number or Name field is empty");
            return false;
        } else {
            var opt = new Option(number + " - " + name, number + "_" + name);
            opt.setAttribute("ondblclick", "removeOption(this.value)");
            $("#contestant").append(opt);
            document.getElementById('cont_number').value = "";
            document.getElementById('cont_name').value = "";
        }
        return false;
    });

    $("#cont_name").keypress(function (e) {
        var key = e.which;
        if (key === 13) {
            $("#cont_number").focus();
            var number = document.getElementById('cont_number').value;
            var name = document.getElementById('cont_name').value;
            if (number === "" || name === "") {
                alert("Contestant number or Name field is empty");
                return false;
            } else {
                var opt = new Option(number + " - " + name, number + "_" + name);
                opt.setAttribute("ondblclick", "removeOption(this.value)");
                $("#contestant").append(opt);
                document.getElementById('cont_number').value = "";
                document.getElementById('cont_name').value = "";
            }
            return false;
        }
    });
    
    
        $("#addCategory").click(function (){
            $("#newCategoryModal").modal("toggle");
        });
        
        $("#saveButton").click(function (){
		$("#newCategoryModal").modal("toggle");
		var id;
                var name=$("#category").val();
                $.ajax({
                   type: 'GET' ,
                   url:'ajaxcall',
                   success: function (data, textStatus, jqXHR) {
                       id=data;
                       $("#scheduleTree").jstree('create_node', '#', { 'attr' : { 'id' : id } , 'text' : name}, 'last');
                    }
                });
                $("#category").val("");
                
	});
        
        
         $("#cancelButton").click(function (){
		$("#newCategoryModal").modal("toggle");
                 $(this).dialog('close');
        });
});



function removeOption(value){
    $("#contestant option[value='"+value+"']").each(function(){
        $(this).remove();
    });
}
function saveAction() {
    selectAllContestants();
    var contestants = "";
        $("#contestant option").each(function () {
            contestants += $(this).val().trim() + "/";
        });
    var type;
        if ($("#over_under").is(":checked"))
            type = $("#over_under").val();
        else if ($("#spread_prop").is(":checked"))
            type = $("#spread_prop").val();
        else
            type = "";
    $.ajax({
        url: "../../../Props/saveedit",
        type: 'POST',
        data: {
            "contestType":$("#level1").val().trim(),
            "contestType2":$("#level2").val().trim(),
            "contestType3":$("#level3").val().trim(),
            "contestDesc":$("#prop_name").val().trim(),
            "oldContestDesc":$("#oldContestDesc").val().trim(),
            "contestDate":$("#input_gamedate_prop").val(),
            "contestTime":$("#input_gametime_prop").val(),
            "contestCutOff":$("#input_wagertime_prop").val(),
            "units":$("#units").val().trim(),
            "comments":$("#comments").val().trim(),
            "contestants":contestants,
            "currentContestants":$("#currentContestants").val(),
            "type":type,
            "correlationID":$("#correlational_id").val().trim()
        },success: function (data) {
            
        }
    });
    window.location = "../../../games";
}

function cancelAction() {
	window.location = "../../../games";
}



function editAction() {
	return true;
}
