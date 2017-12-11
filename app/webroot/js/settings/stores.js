var tmp;
var lineTypeArray;

var lineTypeArray2 = [];


$(document).ajaxStart(function () {
    $("#loadingModal").modal('toggle');
});


$(document).ajaxStop(function () {
    $("#loadingModal").modal('toggle');
});


$(document).ready(function () {
    $(".btn-edit").hide();

    $("#editDescription").click(function () {
        var text = $("#description").text();
        $("#description").remove();
        $("#textField").append("<input type='text' size='50' name='description' id='description' value='" + text + "'/>");
        $("#confirmEdit").removeAttr('style');
        $("#editDescription").attr('style', 'display:none');
    });

    $("#confirmEdit").click(function () {
        var text = $("#description").val();
        $("#description").remove();
        $("#textField").append("<span id='description'> " + text + "</span>");
        $("#editDescription").removeAttr('style');
        $("#confirmEdit").attr('style', 'display:none');
        setToSave();
    });

    $("#addStore").click(function () {
        $("#addStoreModal").modal("toggle");
    });

    $("#saveAddStore").click(function () {
        $("#addStoreModal").modal("toggle");
        $.ajax({
            url: "addnewstore",
            type: 'POST',
            data: {"storeName": $("#storeName").val()},
            success: function (data) {
                if (data > 0) {
                    $("#messageSpan").text("The store has been inserted");
                    $("#defaultMsgModal").modal('toggle');
                } else {
                    $("#messageSpan").text("The store has not been inserted due to an error");
                    $("#defaultMsgModal").modal('toggle');
                }
            }
        });
    });

    $("#deleteStore").click(function () {
        if ($("#store").val()) {
            $("#deleteStoreModal").modal('toggle');
        } else {
            $("#messageSpan").text("Please select a store to delete");
            $("#defaultMsgModal").modal('toggle');
        }
    });


    $("#confirmDeleteStore").click(function () {
        $("#deleteStoreModal").modal('toggle');
        $.ajax({
            url: "deletestore",
            type: 'POST',
            data: {"storeName": $("#store").val()},
            success: function (data) {
                if (data >= 0) {
                    $("#messageSpan").text("The store has been deleted");
                    $("#defaultMsgModal").modal('toggle');
                } else {
                    $("#messageSpan").text("The store has not been deleted due to an error");
                    $("#defaultMsgModal").modal('toggle');
                }
            }
        });
    });

    $("#confirmationButton").click(function () {
        $("#defaultMsgModal").modal("toggle");
        reloadForm();
    });


    $("#followMaster").click(function () {
        setToSave();
    });
});


function saveAction() {
    var tr = $(".selectedClass");

    $.each(tr, function (key, value) {
        var inputs = $(value).find('input');
        var select = $(value).find('select');

        var sport = inputs.eq(0).val().trim();
        var subsport = inputs.eq(1).val().trim();
        var periodId = inputs.eq(2).val().trim();
        var wagerType = inputs.eq(3).val().trim();
        var linetype = select.val().trim();
        var cuMaxBet = inputs.eq(4).val().trim();
        var inetMaxBet = inputs.eq(5).val().trim();
        var dfltCircled = inputs.eq(6).val().trim();
        var followMaster = ($("#followMaster").is(":checked")) ? 'Y' : 'N';
        var description = $("#description").text();
        $.ajax({
            url: "editstoreline",
            type: 'POST',
            data: {
                "store": $("#store").val(),
                "sport": sport,
                "subsport": subsport,
                "periodId": periodId,
                "wagerType": wagerType,
                "linetype": linetype,
                "cuMaxBet": cuMaxBet,
                "inetMaxBet": inetMaxBet,
                "dfltCircled": dfltCircled,
                "followMaster": followMaster,
                "description": description
            },
            success: function (data) {
                if (data >= 0) {
                    $("#messageSpan").text("The changes has been saved");
                    $("#defaultMsgModal").modal('toggle');
                } else {
                    $("#messageSpan").text("The changes has not been saved due to an error");
                    $("#defaultMsgModal").modal('toggle');
                }

            }
        });



    });
}

function reloadForm() {
    window.location = 'stores';
}
function cancelAction() {
    window.location = '../games';
}

function editStoreLine(id) {
    $("#editStoreModal").modal("toggle");
}


function showStoreLines() {
    var store = $("#store").val();
    getLineTypes();
    $.ajax({
        url: "getstorelines/" + store,
        success: function (data) {
            var obj = $.parseJSON('' + data + '');
            addDescription(obj['row1']['Description']);
            var table = $("#storesTableBody");
            $("#storesTableBody tr").remove();
            $.each(obj, function (key, value) {
                if (value['FollowMasterFlag'] === 'Y') {
                    document.getElementById('followMaster').checked = true;
                } else {
                    document.getElementById('followMaster').checked = false;
                }
                var tr = $("<tr></tr>");
                var td1 = "<td style='width:104px'>" + value['SportType'] + "<input type='hidden' value='" + value['SportType'] + "'/></td>";
                var td2 = "<td style='width:104px'>" + value['SportSubType'] + "<input type='hidden' value='" + value['SportSubType'] + "'/></td>";
                var td3 = "<td style='width:104px'>" + value['PeriodDescription'] + "<input type='hidden' value='" + value['PeriodNumber'] + "'/></td>";
                var td4 = "<td style='width:104px'>" + value['WagerType'] + "<input type='hidden' value='" + value['WT'] + "'/></td>";
                var sel = "<select onchange='selectToSave(this)' style='width:100%'>" + setOptions(value['LineType']) + "</select>";
                var td5 = "<td style='width:104px'>" + sel + "</td>";
                var td6 = "<td style='width:104px'><input style='width:100%' type='text' onkeyup='selectToSave(this)' value='" + value['MaximumWager'] + "'/></td>";
                var td7 = "<td style='width:104px'><input style='width:100%' type='text' onkeyup='selectToSave(this)' value='" + value['InetMaximumWager'] + "'/></td>";
                var td8 = "<td style='width:104px'><input style='width:100%' type='text' onkeyup='selectToSave(this)' value='" + value['MaximumCircled'] + "'/></td>";

                tr.append(td1);
                tr.append(td2);
                tr.append(td3);
                tr.append(td4);
                tr.append(td5);
                tr.append(td6);
                tr.append(td7);
                tr.append(td8);

                table.append(tr);
            });
        }
    });
}

function addDescription(value) {
    $("#description").text(value);
}
function setOptions(value) {
    var options = "";
    for (var i = 0; i < lineTypeArray2.length; i++) {
        if (lineTypeArray2[i] === value.trim()) {
            options += "<option selected='selected' value='" + lineTypeArray2[i].trim() + "'>" + lineTypeArray2[i].trim() + "</option>";
        } else {
            options += "<option value='" + lineTypeArray2[i].trim() + "'>" + lineTypeArray2[i].trim() + "</option>";
        }
    }
    return options;
}
function getLineTypes() {
    $.ajax({
        url: "getLineType",
        success: function (data) {
            var obj = $.parseJSON('' + data + '');
            $.each(obj, function (key, value) {
                lineTypeArray2.push(value['LineType'].trim());
//                lineTypeArray+="<option id='"+value['LineType'].trim()+"' value='"+value['LineType'].trim()+"'>"+value['LineType'].trim()+"</option>"
            });
        }
    });
}

function selectToSave(field) {
    field.parentNode.parentNode.setAttribute('class', 'selectedClass');
}

function setToSave() {
    $($("#storesTableBody tr")[0]).attr('class', 'selectedClass');
}
