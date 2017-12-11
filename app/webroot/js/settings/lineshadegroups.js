var tmp;
$(document).ready(function () {
    $('table.cell-border').DataTable({
        "bPaginate": false,
        "bFilter": true,
        "sScrollY": "300",
        "sScrollX": "100",
        "sScrollXInner": "100%",
        "bScrollCollapse": true
    });
    $(".row").eq(2).attr("style","display:none");
    $(".row").eq(0).attr("style","display:none");
   
    
    
    $('#searchTable1').keyup(function(){
          $("#1s").DataTable().search($(this).val()).draw() ;
    }); 
    $('#searchTable2').keyup(function(){
          $("#2s").DataTable().search($(this).val()).draw() ;
    }); 
    
    
    
    $(".btn-edit").hide();

    $(".middle .glyphicon-plus.addSport").click(function () {
        $("#createSportModal").modal("toggle");
    });

    $(".middle .glyphicon-minus.addSport").click(function () {
        $("#deleteSportModal").modal("toggle");
    });

    $("#saveSport").click(function () {
        var sport = $("#sportname").val().trim();
        var subSport = $("#subsportname").val().trim();
        saveCategory(sport, subSport, 'N', 'Halves and Quarters');
        $("#createSportModal").modal("toggle");
        formReset();
    });

    $("#deleteSport").click(function () {
        deleteCategory();
    });

    $("#confirmationButton, #alertDeleteSport").click(function () {
        $(".modal:visible").modal("toggle");
    });
    $("#newShade").click(function () {
        $("#newShadeGroup").modal("toggle");
    });
    $("#editShade").click(function () {
        $("#newShadeGroup").modal("toggle");
    });
    $("#deleteShade").click(function () {
        $("#deleteShadeGroupModal").modal("toggle");
    });
    $("#saveShadeGroup").click(function () {
        $("#newShadeGroup").modal("toggle");
        $("#messageSpan").text("The shade Group has been inserted");
        $("#defaultMsgModal").modal('toggle');
    });
    $("#confirmDeleteShadeGroup").click(function () {
        $("#deleteShadeGroupModal").modal("toggle");
        $("#messageSpan").text("The shade Group has been deleted");
        $("#defaultMsgModal").modal('toggle');
    });
});

function formReset() {
    $(".left .bordercontrol").find(":checked").removeAttr('checked');
    $(".middle .bordercontrol").find(":checked").removeAttr('checked');
    $(".right .bordercontrol").find(":checked").removeAttr('checked');
    $("#sportname").val("");
    $("#subsportname").val("");
    $("#drawallowed").removeAttr('checked');
}

function clearForm() {
    $("#drawallowed").removeAttr('checked');
    $(".middle tbody").html("");
    $(".right .bordercontrol").find(":checked").removeAttr('checked');
    $.ajax({
        url: "getsports",
        type: 'POST',
        success: function (data) {
            $(".left tbody").html("");
            var obj = $.parseJSON('' + data + '');
            $.each(obj, function (key, value) {
                var tr = $("<tr></tr>");
                var td1 = $("<td></td>").attr({
                    "style": "width: 40px; text-align: center;"
                });
                var td2 = $("<td></td>");
                var input = $("<input></input>").attr({
                    "id": value['SportType'].trim(),
                    "type": "radio",
                    "name": "sportid",
                    "value": value['SportType'].trim(),
                    "onclick": 'loadLeagues(this,"' + value['DrawFlag'].trim() + '")',
                    "class": 'sportsRadio',
                });

                td1.append(input);
                td2.append(value['SportType']);

                tr.append(td1);
                tr.append(td2);

                $(".left tbody").append(tr);
            });
        }
    });
}

function saveCategory(sport, subsport, allowDraw, periodType) {
    $.ajax({
        url: "savecategory",
        type: 'POST',
        data: {
            "sport": sport,
            "subSport": subsport,
            "period": periodType,
            "allowDraw": allowDraw
        },
        success: function (data) {
            var msj = '';
            clearForm();
            applyModal();
        }
    });
}

function deleteCategory() {

    if ($("[name=sportid]:checked").length > 0 &&
            $("[name=subsportid]:checked").length > 0) {

        var sport = $("[name=sportid]:checked").val().trim();
        var subsport = $("[name=subsportid]:checked").val().trim();

        $.ajax({
            url: "deletecategory",
            type: 'POST',
            data: {
                "sport": sport,
                "subSport": subsport
            },
            success: function (data) {
                var msj = '';
                clearForm();
                $(".modal:visible").modal("toggle");
                $("#alertDeleteSportModal .modal-body").html("Changes applied successfully");
                $("#alertDeleteSportModal").modal("toggle");
            }
        });

    } else {
        $(".modal:visible").modal("toggle");
        $("#alertDeleteSportModal .modal-body").html("Please select the sport and subsport, in order to delete it");
        $("#alertDeleteSportModal").modal("toggle");
    }

}

function applyModal() {
    //$(".modal:visible").modal("toggle");
    $("#confirmationModal").modal("toggle");
}

function loadLeagues(checkField, checkDraw) {
    if (checkDraw === 'Y') {
        document.getElementById("drawallowed").checked = true;
    } else {
        document.getElementById("drawallowed").checked = false;
    }
    var i = 0;
    $(".middle tbody").html("");

    $.ajax({
        url: "loadleagues/" + $(checkField).val(),
        type: 'POST',
        success: function (data) {
            var obj = $.parseJSON('' + data + '');
            $(".middle .bordercontrol").find(":checked").removeAttr('checked');
            $.each(obj, function (key, value) {
                var tr = $("<tr></tr>");
                var td1 = $("<td></td>").attr({
                    "style": "width: 40px; text-align: center;"
                });
                var td2 = $("<td></td>");
                var input = $("<input></input>").attr({
                    "id": value['SportSubType'],
                    "type": "radio",
                    "name": "subsportid",
                    "value": value['SportSubType'],
                    "onclick": 'loadPeriodType()'
                });

                td1.append(input);
                td2.append(value['SportSubType']);

                tr.append(td1);
                tr.append(td2);

                $(".middle tbody").append(tr);

            });

        }
    });

    $(".middle .add").click(function () {
        $("#createLeagueModal").modal("toggle");
    });

    $(".middle .delete").click(function () {
        $("#deleteLeagueModal").modal("toggle");
    });

}

function saveAction() {
    var sport = $(".left .bordercontrol").find(":checked").val().trim();
    var subSport = $(".middle .bordercontrol").find(":checked").val().trim();
    var period = $(".right .bordercontrol").find(":checked").val().trim();
    var allowDraw = ($("#drawallowed").is(":checked")) ? 'Y' : 'N';
    saveCategory(sport, subSport, allowDraw, period);
    formReset();
}

function cancelAction() {
    window.location = "../games";
}

function loadPeriodType() {
    var sport = $(".left .bordercontrol").find(":checked").val().trim();
    var subSport = $(".middle .bordercontrol").find(":checked").val().trim();
    $.ajax({
        url: "loadperiodtypebysport",
        type: 'POST',
        data: {
            'sport': sport,
            'subSport': subSport
        },
        success: function (data) {
            document.getElementById(data.trim()).checked = true;
        }
    });
}