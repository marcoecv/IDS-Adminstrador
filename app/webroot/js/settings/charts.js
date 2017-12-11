var tmp;

$(document).ajaxStart(function () {
    $("#loadingModal").modal('toggle');
});
$(document).ajaxStop(function () {
    $("#loadingModal").modal('toggle');
});

$(document).ready(function () {
    $(".btn-edit").hide();
    $('#chartsTable').dataTable();

    enableButtons(false);
    enableAddEndButton(false);
    $("#confirmationButton").click(function () {
        $("#defaultMsgModal").modal("toggle");
        reloadForm();
    });

    $("#confirmDeleteLineType").click(function () {
        $("#deleteLineTypeModal").modal('toggle');
        var lineType = $("#lineType").val();
        $.ajax({
            url: "deletelinetype",
            type: 'POST',
            data: {"lineType": lineType},
            success: function (data) {
                if (data === '0') {
                    $("#messageSpan").text("The line type has been deleted");
                    $("#defaultMsgModal").modal('toggle');
                } else {
                    $("#messageSpan").text("The line type has not been deleted due to an error");
                    $("#defaultMsgModal").modal('toggle');
                }
            }
        });

    });

    $("#addLineType").click(function () {
        $("#addLineTypeModal").modal('toggle');
    });
    $("#deleteLineType").click(function () {
        if ($("#lineType").val()) {
            $("#deleteLineTypeModal").modal('toggle');
        } else {
            $("#messageSpan").text("Please select a line type to delete");
            $("#defaultMsgModal").modal('toggle');
        }
    });


    $("#saveLineType").click(function () {
        $("#addLineTypeModal").modal('toggle');
        $.ajax({
            url: "createlinetype",
            type: 'POST',
            data: {
                "lineType": $("#lineDescription").val()
            },
            success: function (data) {
                if (data === '0') {
                    $("#messageSpan").text("The line type has been inserted");
                    $("#defaultMsgModal").modal('toggle');
                } else {
                    $("#messageSpan").text("The line type has not been inserted due to an error");
                    $("#defaultMsgModal").modal('toggle');
                }
            }
        });
    });
    $("#addLineEnd").click(function () {
        var table = $("#storesTableBody");
        var tr = $("<tr></tr>");
        var td0 = "<td style='width:50px;'><center><input type='radio' name='selectRow' onclick='enableButtons(true)'/></center></td>";
        var td1 = "<td><input style='width:100%' type='text'/></td>";
        var td2 = "<td><input style='width:100%' type='text'/></td>";
        var td3 = "<td><input style='width:100%' type='text'/></td>";

        tr.append(td0);
        tr.append(td1);
        tr.append(td2);
        tr.append(td3);
        table.append(tr);
        $(".inner_table").animate({scrollTop: $('.inner_table')[0].scrollHeight}, 1000);
    });
    $("#addNewLine").click(function () {
        if ($("#storesTableBody").find(":checked").length > 0) {
            var table = $("#storesTableBody");
            var tr = $("<tr></tr>");
            var td0 = "<td style='width:50px;'><center><input type='radio' name='selectRow' onclick='enableButtons(true)'/></center></td>";
            var td1 = "<td><input style='width:100%' type='text'/></td>";
            var td2 = "<td><input style='width:100%' type='text'/></td>";
            var td3 = "<td><input style='width:100%' type='text'/></td>";

            tr.append(td0);
            tr.append(td1);
            tr.append(td2);
            tr.append(td3);

            $("#storesTableBody").find(":checked").parent().parent().parent().before(tr);
        } else {
            $("#messageSpan").text("Please Select a Line to add above");
            $("#defaultMsgModal").modal('toggle');
        }
    });

    $("#deleteLine").click(function () {
        if ($("#storesTableBody").find(":checked").length > 0) {
            $("#storesTableBody").find(":checked").parent().parent().parent().remove();
        } else {
            $("#messageSpan").text("Please Select a Line to delete");
            $("#defaultMsgModal").modal('toggle');
        }
    });
});

function enableButtons(val) {
    if (val) {
        $("#deleteLine").removeAttr('disabled');
        $("#addNewLine").removeAttr('disabled');
    } else {
        $("#deleteLine").attr('disabled', 'false');
        $("#addNewLine").attr('disabled', 'false');
    }
}


function enableAddEndButton(val) {
    if (val)
        $("#addLineEnd").removeAttr('disabled');
    else {
        $("#addLineEnd").attr('disabled', 'disabled');
    }
}
function applyModal() {
    $(".modal:visible").modal("toggle");
    $("#confirmationModal").modal("toggle");
}

function deleteLine(id) {
    $("#deleteChartLineModal").modal('toggle');
}

function editChartLineF(start, end, diff, id) {
    $("#addChartLineModal").modal('toggle');
}


function getChartLines(value) {
    enableAddEndButton(true);
    $.ajax({
        url: "getchartlines/" + value,
        success: function (data) {
            var obj = $.parseJSON('' + data + '');
            var table = $("#storesTableBody");
            $("#storesTableBody tr").remove();
            $.each(obj, function (key, value) {
                var tr = $("<tr></tr>");
                var td0 = "<td style='width:50px;'><center><input type='radio' name='selectRow' onclick='enableButtons(true)'/></center></td>";
                var td1 = "<td style='width:104px'><input style='width:100%' type='text' onkeyup='selectToSave(this)' value='" + value['StartingPrice'] + "'/></td>";
                var td2 = "<td style='width:104px'><input style='width:100%' type='text' onkeyup='selectToSave(this)' value='" + value['EndingPrice'] + "'/></td>";
                var td3 = "<td style='width:104px'><input style='width:100%' type='text' onkeyup='selectToSave(this)' value='" + value['CentsDifference'] + "'/></td>";

                tr.append(td0);
                tr.append(td1);
                tr.append(td2);
                tr.append(td3);

                table.append(tr);
            });
        }
    });
}


function selectToSave(field) {
    field.parentNode.parentNode.setAttribute('class', 'selectedClass');
}


function saveAction() {
    var table = $("#storesTableBody tr");
    var array = "";
    $.each(table, function (key, value) {
        var inputs = $(value).find('input');
        array += $(inputs[1]).val() + ",";
        array += $(inputs[2]).val() + ",";
        array += $(inputs[3]).val() + ";";
    });
    $.ajax({
        url: "savechartlinetype",
        type: 'POST',
        data: {
            "array": array,
            "lineType": $("#lineType").val()
        },
        success: function (data) {
            if (data === '0') {
                $("#messageSpan").text("The rows has been saved");
                $("#defaultMsgModal").modal('toggle');
            } else {
                $("#messageSpan").text("The rows has not been saved due to an error");
                $("#defaultMsgModal").modal('toggle');
            }
        }
    });
}


function cancelAction() {
    window.location = "../games";
}

function reloadForm() {
    window.location = 'charts';
}