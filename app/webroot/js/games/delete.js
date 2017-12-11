$(document).ready(function () {
    $('#gamedate').datetimepicker({
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0
    });

    $('#gametime').datetimepicker({
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 1,
        minView: 0,
        maxView: 1,
        forceParse: 0
    });
    
    $(".btn-edit").hide();

    $("#confirmationButton").click(function () {
        $("#confirmationModal").modal("toggle");
        window.location = "/games";
    });
    $("#gamefrm").validationEngine({
        ajaxFormValidation: true,
        onAjaxFormComplete: ajaxValidationCallback,
        scroll: false
    });
    $('#cancelDelete').click(function () {
        window.location = "../../games";
    });
    $('#confirmDelete').click(function () {
        $.ajax({
            url: "../dodelete",
            data: {'gamedate': $('#gamedateval').val(), 'gametime': $('#gametimeval').val(), 'rotANumber': $('#rotANumber').val()},
            type: "POST",
            dataType: "json",
            success: function (data) {
                if (data.results > 0) {
                    alert("Game deleted successfully");

                }
                else {
                    alert("The game was not deleted due to an error");
                }
                window.location = "../../games";
            }
        });
    });
});
function cleanRotNumbers() {
    $('#rotANumber').val("");
    $('#rotHNumber').val("");
    $('#rotANumber').attr("readonly", false);
    $('#rotHNumber').attr("readonly", false);
}
function saveAction() {
    if ($("#gamefrm").validationEngine('validate')) {
        $("#deleteGameModal").modal("toggle");
    }
}

function cancelAction() {
    window.location = "../../games";
}

function editAction() {
    return true;
}

function ajaxValidationCallback(status, form, json, options) {
    if (status === true) {
        $(':input', '#gamefrm').not(':button, :submit, :reset, :hidden').val('').removeAttr('checked').removeAttr('selected');
        $("#message_sent").slideDown(400).delay(3000).slideUp(400);
    }
}