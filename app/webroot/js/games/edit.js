$(document).ready(function() {

	$(".btn-edit").hide();

	$('#gamedate').datetimepicker({
        weekStart: 1,
        todayBtn:  1,
		autoclose: 1,
		todayHighlight: 1,
		startView: 2,
		minView: 2,
		forceParse: 0
    });

	$('#gametime').datetimepicker({
        weekStart: 1,
        todayBtn:  1,
		autoclose: 1,
		todayHighlight: 1,
		startView: 1,
		minView: 0,
		maxView: 1,
		forceParse: 0
    });

	$('#wagercutoff').datetimepicker({
        weekStart: 1,
        todayBtn:  1,
		autoclose: 1,
		todayHighlight: 1,
		startView: 1,
		minView: 0,
		maxView: 1,
		forceParse: 0
    });

	$("#confirmationButton").click(function (){
		$("#confirmationModal").modal("toggle");
                 window.location = "/administrator/index.php/games";
	});
        
    $("gameEditfrm").validationEngine({
        ajaxFormValidation : true,
        onAjaxFormComplete : ajaxValidationCallback,
        scroll : false
    });

}); 

function ajaxValidationCallback(status, form, json, options) {
    if(status === true) {
        $(':input', '#gameEditfrm').not(':button, :submit, :reset, :hidden').val('').removeAttr('checked').removeAttr('selected');
        $("#message_sent").slideDown(400).delay(3000).slideUp(400);
    }
}

function saveAction() {
    if($("#gameEditfrm").validationEngine('validate') ){
        var preventbuying;
        if($('#preventbuying').is(':checked')){
            preventbuying='Y';
        }else{
            preventbuying='N';
        }
         $.ajax({
            url: "../saveedit",
            type: 'POST',
            data: {
                'rotANumber':$('#rotANumber').val(),
                'broadcastid':$('#broadcastid').val(),
                'comments':$('#comments').val(),
                'gamedateval':$('#gamedateval').val(),
                'gametimeval':$('#gametimeval').val(),
                'wagercutoffval':$('#wagercutoffval').val(),
                'preventbuying':preventbuying,
                'restrictions':$('[name=restrictions]:checked').val()
            },
            success: function (data) {
                $("#confirmationModal").modal("toggle");
            }  
            
        });
       
    }
}

function cancelAction() {
	window.location = "/games";
}

function editAction() {
	return true;
}
