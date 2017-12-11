function addPropLine(array, lastContestNum) {
    var table = $("#scheduleLines tbody");

    var tr = $("<tr></tr>");
    var status;
    switch (array['Status']) {
        case 'H':
            status = "Offline";
            break;
        case 'I':
            status = "Circled";
            break;
        default :
            status = "";
            break;
    }
    var Type;
    if (array['ThresholdLine'] === null || array['ThresholdLine'] === "") {
        Type = "";
    } else if (array['ContestantName'].trim() === "Over" || array['ContestantName'].trim() === "Under") {
        Type = "t";
    } else {
        Type = "s";
    }
    var desc = "";
    var dispStatus = "";
    
    if (lastContestNum !== "" && lastContestNum !== array['ContestNum']) {
        tr.attr('style', 'border-top:solid #000000 2px');
    }
    if (lastContestNum !== array['ContestNum']) {
        desc = array['ContestDesc'];
        dispStatus = status;
    }
    tr.attr("id", array['ContestantNum']);
    tr.attr("name",array['ContestNum']);
    tr.append(createProplineTD("14%", true, "focusedStyle", desc, false, true, array['RotNum'], array['ContestNum'], "", 1));
    tr.append(createProplineTD("4%", false, "gr focusedStyle", dispStatus, false, false, array['RotNum'], array['ContestNum'], array['ContestantNum'] + "_status", 2));
    tr.append(createProplineTD("4%", true, "focusedStyle", array['RotNum'], false, false, array['RotNum'], array['ContestNum'], "", 3));
    tr.append(createProplineTD("10%", true, "focusedStyle", array['ContestantName'].trim() + " " + (array['ThresholdLine'] === null ? "" : processUpdaterData(array['ThresholdLine'], Type)) + " " + (array['ThresholdUnits'] === null ? "" : array['ThresholdUnits'].trim()), false, false, array['RotNum'], array['ContestNum'], array['ContestantNum'] + "_line", 4));
    tr.append(createProplineTD("6%", true, "focusedStyle", processData(array['MoneyLine']), true, false, array['RotNum'], array['ContestNum'], array['ContestantNum'] + "_price", 5));
    tr.append(createProplineTD("6%", true, "focusedStyle", 0, false, false, array['RotNum'], array['ContestNum'], "", 6));

    var WagerDate = array['WagerCutoff'].split(" ");
    var dateArray = WagerDate[0].split("-");
    var timeArray = WagerDate[1].split(":");
    var gameDate = new Date(dateArray[0], dateArray[1] - 1, dateArray[2], timeArray[0], timeArray[1], timeArray[2]);
    var today = new Date();
    var tomorrowDate = new Date();
    tomorrowDate.setDate(today.getDate() + 1);
    if (gameDate < today) {
        tr.addClass("graded");
    }
//    COLOR ROJO PARA FUTUROS
//    else if(gameDate>tomorrowDate){
//        alert("N");
//        tr.addClass("notstarted");
//    }
    table.append(tr);
}

function addPropLineDecimal(array, lastContestNum) {

    var table = $("#scheduleLines tbody");

    var tr = $("<tr></tr>");
    var status;
    switch (array['Status']) {
        case 'H':
            status = "<p style='color:red;font-weight:bold margin:0px,padding:0px'>Offline</p>";
            break;
        case 'I':
            status = "<p style='color:green;font-weight:bold margin:0px,padding:0px'>Circled</p>";
            break;
        default :
            status = "";
            break;
    }
    var Type;
    if (array['ThresholdLine'] === null || array['ThresholdLine'] === "") {
        Type = "";
    } else if (array['ContestantName'].trim() === "Over" || array['ContestantName'].trim() === "Under") {
        Type = "t";
    } else {
        Type = "s";
    }
    var desc = "";
    var dispStatus = "";
    if (lastContestNum !== "" && lastContestNum !== array['ContestNum']) {
        tr.attr('style', 'border-top:solid #000000 2px');
    }
    if (lastContestNum !== array['ContestNum']) {
        desc = array['ContestDesc'];
        dispStatus = status;
    }

    tr.attr("id", array['ContestantNum']);
    tr.attr("name",array['ContestNum']);
    tr.append(createProplineTD("14%", true, "focusedStyle", desc, false, true, array['RotNum'], array['ContestNum'], "", 1));
    tr.append(createProplineTD("4%", false, "", dispStatus, false, false, "", "", array['ContestantNum'] + "_status", 2));
    tr.append(createProplineTD("4%", true, "focusedStyle", array['RotNum'], false, false, "", "", "", "", 3));
    tr.append(createProplineTD("10%", true, "focusedStyle", array['ContestantName'] + " " + array['ThresholdLine'] === null ? "" : processData(array['ThresholdLine'], Type) + " " + array['ThresholdUnits'] === null ? "" : array['ThresholdUnits'].trim(), false, false, array['RotNum'], array['ContestNum'], array['ContestantNum'] + "_line", 4));
    tr.append(createProplineTD("6%", true, "focusedStyle", array['DecimalODDS'].substring(0, 4), true, false, array['RotNum'], array['ContestNum'], array['ContestantNum'] + "_price", 5));
    tr.append(createProplineTD("6%", true, "focusedStyle", 0, false, false, array['RotNum'], array['ContestNum'], "", 6));

    var WagerDate = array['WagerCutoff'].split(" ");
    var dateArray = WagerDate[0].split("-");
    var timeArray = WagerDate[1].split(":");
    var gameDate = new Date(dateArray[0], dateArray[1] - 1, dateArray[2], timeArray[0], timeArray[1], timeArray[2]);
    var today = new Date();
    var tomorrowDate = new Date();
    tomorrowDate.setDate(today.getDate() + 1);
    if (gameDate < today) {
        tr.addClass("graded");
    }
//    COLOR ROJO PARA FUTUROS
//    else if(gameDate>tomorrowDate){
//        alert("N");
//        tr.addClass("notstarted");
//    }
    table.append(tr);
}



function addPropHeader() {
    var table = $("#scheduleLines thead");
    $("#scheduleLines table").attr("style", "width:60%");
    $("#bodytable").attr("class", "table table-bordered");
    $("#headerTable thead tr").remove();

    var tr = $("<tr></tr>");
    tr.append(createGamePropTH("14%", false, "", "<b>Contest</b>", false, false));
    tr.append(createGamePropTH("4%", false, "", "<b>Status</b>", false, false));
    tr.append(createGamePropTH("4%", false, "", "<b>Rotation</b>", false, false));
    tr.append(createGamePropTH("10%", false, "", "<b>Contestant</b>", false, false));
    tr.append(createGamePropTH("6%", false, "", "<b>Odds</b>", false, false));
    tr.append(createGamePropTH("6%", false, "", "<b>Odds $</b>", false, false));

    table.append(tr);
}

function createProplineTD(width, isInput, classInput, value, openEditModal, linkToEdit, rotation, contestNum, idTd, pos) {
    var td1 = $("<td></td>").attr({"width": width});
    td1.attr("id", idTd);
    var rotORCorrelation="";
    var ci = classInput.split(" ");
    if (openEditModal) {
        $("#odds").val(value);
        $("#line").attr("disabled", "disabled");
        td1.attr("onclick", "openinfoEditModal('" + contestNum + "','" + rotation + "',this)");
        rotORCorrelation=rotation;
    } else if (linkToEdit) {
        var tree = $("#scheduleTree").jstree(true);
        var sel = tree.get_selected();
        var correlation=$("#"+sel).find("a").attr("correlation");
        td1.attr("onclick", "openEditPropModal('" + contestNum + "','" + correlation + "',this)");
        rotORCorrelation=correlation;
    }
    
    if(ci[0]==="gr"){
        td1.append($("<input></input>").attr(
            {
                "type": "text",
                "value": value,
                "class": classInput,
                "style":value==='Circled'?"color:green;font-weight:bold":"color:red;font-weight:bold",
                "readonly": true,
                "position": pos,
                "onkeypress": "inputLinePropTableEnterKey(event," + pos + ",'" + contestNum + "','" + rotORCorrelation + "',this)"
            }
        ));
    } else {
        td1.append($("<input></input>").attr(
            {
                "type": "text",
                "value": value,
                "class": classInput,
                "readonly": true,
                "position": pos,
                "onkeypress": "inputLinePropTableEnterKey(event," + pos + ",'" + contestNum + "','" + rotORCorrelation + "',this)"
            }
        ));
    }

    return td1;
}