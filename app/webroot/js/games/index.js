var arraySports = [];
var arrayLeagues = [];
var sport;
var league;
var country;
var gameDate;
var selectedSport;
var selectedType;
var deepLevels;
var teamTotalPropSelected;
var focusedElement;
var chart = [];
var tmp;
var priceLineValidationFlag = true;
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
var selectedNode;

//$(document).keydown(function (e){
//        alert(e.keyCode) 
//});
$(document).ready(function () {

    $("#searchBox").focusin(function (){
        $("#searchBox").val("")
        $("#searchBoxSpan").attr("class","searchBoxFocus");
    });
   $("#searchBox").focusout(function (){
        $("#searchBoxSpan").attr("class","searchBox");
    });
    
    /************************************************BEGIN MODIFIED GAME LINE VALUES FLAG **************************************************/
    //    SPREAD


    $("#offlinesp").change(function () {
        if ($("#offlinesp").is(":checked")) {
            $("#checkCircledMaxWagersp").removeAttr("checked");
        }
    });

    $("#checkCircledMaxWagersp").change(function () {
        if ($("#checkCircledMaxWagersp").is(":checked")) {
            $("#offlinesp").removeAttr("checked");
        }
    });

    //    MONEY LINE

    $("#offlineml").change(function () {
        if ($("#offlineml").is(":checked")) {
            $("#checkCircledMaxWagerml").removeAttr("checked");
        }
    });

    $("#checkCircledMaxWagerml").change(function () {
        if ($("#checkCircledMaxWagerml").is(":checked")) {
            $("#offlineml").removeAttr("checked");
        }
    });

    //    TOTAL

    $("#offlinet").change(function () {
        if ($("#offlinet").is(":checked")) {
            $("#checkCircledMaxWagert").removeAttr("checked");
        }
    });

    $("#checkCircledMaxWagert").change(function () {
        if ($("#checkCircledMaxWagert").is(":checked")) {
            $("#offlinet").removeAttr("checked");
        }
    });

    //    TEAM TOTAL

    $("#offlinett").change(function () {
        if ($("#offlinett").is(":checked")) {
            $("#checkCircledMaxWagertt").removeAttr("checked");
        }
    });

    $("#checkCircledMaxWagertt").change(function () {
        if ($("#checkCircledMaxWagertt").is(":checked")) {
            $("#offlinett").removeAttr("checked");
        }
    });

    //      PROP
    $("#offlineProp").change(function () {
        if ($("#offlineProp").is(":checked")) {
            $("#circledContestProp").removeAttr("checked");
        }
    });

    $("#circledContestProp").change(function () {
        if ($("#circledContestProp").is(":checked")) {
            $("#offlineProp").removeAttr("checked");
        }
    });
    /************************************************END MODIFIED GAME LINE VALUES FLAG *****************************************************/



    /************************************************BEGIN GRADE RESULTS ***********************************************************/

    $('table.cell-border').DataTable({
        "bPaginate": false,
        "bFilter": true,
        "sScrollY": "400",
        "sScrollX": "100",
        "sScrollXInner": "100%",
        "bScrollCollapse": true
    });




    /************************************************END GRADE RESULTS ***********************************************************/
//    GRADING MODAL

    hideSpreadTotal();
    setContestGrading();
//    setTotalGrading();
//    setSpreadGrading()
    $(".btn-edit").hide();

    $('#dfDate').datetimepicker({
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0
    });
    
    $('#gm_dailyFigureDate').datetimepicker({
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0
    });

//    END GRADING MODAL

    setLineStoresFilters();

    $("#sportid").select();

    $("#saveButton").click(function () {
        $("#newCategoryModal").modal("toggle");
        var id;
        var name = $("#category").val();
        $.ajax({
            type: 'GET',
            url: 'ajaxcall',
            success: function (data, textStatus, jqXHR) {
                id = data;
                $("#scheduleTree").jstree('create_node', '#', {'attr': {'id': id}, 'text': name}, 'last');
            }
        });
        $("#category").val("");

    });


    $("#cancelButton").click(function () {
        $("#newCategoryModal").modal("toggle");
        $(this).dialog('close');
    });

//        END PROP MODAL

//        BEGIN PROP LINE MODAL ACTION
    $("#savePropLineButton").click(function () {
        savePropLine();
    });


    $(".btn-edit, .btn-cancel, .btn-save, #footer").hide();

    $(window).resize(function () {
        changeTableHeight();
    });

    loadSchedule();
    changeTableHeight();

    $("#gamesContainer").split({orientation: 'horizontal', limit: 10,position:'30%'});

    $(".hsplitter").mouseout(function () {
        changeTableHeight();
    });

    $('#startfilter').datetimepicker({
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0
    });

    $('#endfilter').datetimepicker({
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0
    });




    $("#confirmationButton").click(function () {
        $("#confirmationModal").modal("toggle");
    });

    
    $("#saveButton").click(function () {
        $("#addInfoModal").modal("toggle");
        alert("Prop Information saved");
        $(this).dialog('close');
    });

//    SALVAR MODAL SPREAD

    $("#saveButtonSP").click(function () {
        saveSpreadLine();
    });

//    SALVAR MODAL MONEY LINE

    $("#saveButtonML").click(function () {
        saveMoneyLine();
    });


//    SALVAR TOTAL MODAL

    $("#saveButtonT").click(function () {
        saveTotalLine();
    });

//    SALVAR TEAM TOTAL MODAL
    $("#saveButtonTT").click(function () {
        saveTeamTotalLine();
    });
    changeTableHeight();

    $("#saveButtonCat").click(function () {
        $("#newCategoryModal").modal("toggle");

        var name1 = $("#newCategory").val();
        var tree = $("#scheduleTree").jstree(true);
        var sel = tree.get_selected();
        var att = $("#" + sel).parent().parent().parent().parent().parent().parent().attr('id') + "_anchor";
//                alert($("#" + att).attr("isfutureassignable")+"=="+$("#" + att).attr("isprop"));
        if ($("#" + att).attr("isfutureassignable") || $("#" + att).attr("isprop")) {
            alert("Unable to create more levels");
        } else {
            var node = new Object();
            node.parent = sel;
            node.text = name1;
            node.a_attr = {'isPropFolder': 'true', 'onclick': 'openpropslines(this);'};
            tree.create_node(sel, node, "last");
        }
        $("#newCategory").val("");
    });


    $("#cancelButtonCat").click(function () {
        $("#newCategoryModal").modal("toggle");
        $(this).dialog('close');
    });


    $("#cancelDeleteButton").click(function () {
        $("#ajaxDeleteModal").modal("toggle");
        $(this).dialog('close');
    });

    $("#savePropButton_edit").click(function (){
        saveEditProp();
    });

    $("#confirmDeleteButton").click(function () {
        $("#ajaxDeleteModal").modal("toggle");
        var date = $('#gameDateTime').text();
        var newDate = date.split(" ");
        var date = newDate[0].split("-");
        var time = newDate[1].split(":");
        $.ajax({
            url: "games/dodelete",
            data: {'gamedate': date[1] + "-" + date[2] + "-" + date[0], 'gametime': time[0] + ":" + time[1], 'rotANumber': $('#rotANumber').text()},
            type: 'POST',
            success: function (data) {
                var obj = $.parseJSON(data);
                if (obj['results'] > 0) {
                    alert("Game deleted successfully");
                }
                else {
                    alert("The game was not deleted due to an error");
                }
            }
        });
    });
    
//    loadActionFilterContent();
    
    
    $("#openAllButton").click(function (){
        if(selectedType==="isGame"){
            openAllGames();
        }else if(selectedType==="isProp"){
            openAllProps();
        }else if(selectedType==="isFutureProp"){
            openAllFutureProps();
        }else if(selectedType==="isFutureExtProp"){
            
        }
        
    });
});


function addContestants(form) {
    if(form==="create"){
        $("#cont_number").focus();
        var number = document.getElementById('cont_number').value;
        var name = document.getElementById('cont_name').value;
        if (number === "" || name === "") {
            alert("Contestant number or Name field is empty");
            return false;
        } else {
            var opt = new Option(number + " - " + name, number + "_" + name);
            opt.setAttribute("ondblclick", "removeOption(this.value,1)");
            $("#contestant").append(opt);
            document.getElementById('cont_number').value = "";
            document.getElementById('cont_name').value = "";
        }
        return false;
    }else if(form==="createFP"){
        $("#cont_numberFP").focus();
        var number = document.getElementById('cont_numberFP').value;
        var name = document.getElementById('cont_nameFP').value;
        if (number === "" || name === "") {
            alert("Contestant number or Name field is empty");
            return false;
        } else {
            var opt = new Option(number + " - " + name, number + "_" + name);
            opt.setAttribute("ondblclick", "removeOption(this.value,1)");
            $("#contestantFP").append(opt);
            document.getElementById('cont_numberFP').value = "";
            document.getElementById('cont_nameFP').value = "";
        }
        return false;
    }else{
        $("#cont_number_edit").focus();
        var number = document.getElementById('cont_number_edit').value;
        var name = document.getElementById('cont_name_edit').value;
        if (number === "" || name === "") {
            alert("Contestant number or Name field is empty");
            return false;
        } else {
            var opt = new Option(number + " - " + name, number + "_" + name);
            opt.setAttribute("ondblclick", "removeOption(this.value,2)");
            $("#contestant_edit").append(opt);
            document.getElementById('cont_number_edit').value = "";
            document.getElementById('cont_name_edit').value = "";
        }
        return false;
    }
}

function removeSelection(selectId) {
    $("#" + selectId + " option").each(function (key, value) {
        $(value).prop("selected", false);
    });
}

function clearLineEditModal(type) {
    switch (type) {
        case "sp":
            $("#team1").val("");
            $("#team2").val("");
            $("#spreadt1").val("");
            $("#pricesp1").val("");
            $("#spreadt2").val("");
            $("#pricesp2").val("");
            $("#commentssp").val("");
            $("#minutessp").val("");
            $("#offlinesp").prop('checked',false);
            $("#circledMaxWagersp").val("");
            $("#checkCircledMaxWagersp").prop('checked',false);
            break;
        case "ml":
            $("#mlTeam1").val("");
            $("#mlTeam2").val("");
            $("#mlDraw").val("");
            $("#mlPricet1").val("");
            $("#mlPricet2").val("");
            $("#mlPricet3").val("");
            $("#mlPricet3").prop("disabled", true)
            $("#commentsml").val("");
            $("#minutesml").val("");
            $("#offlineml").prop('checked',false);
            $("#checkCircledMaxWagerml").val("");
            $("#circledMaxWagerml").prop('checked',false);
            break;
        case "t":
            $("#tTeam1").val("");
            $("#tTeam2").val("");
            $("#tPoints1").val("");
            $("#tPricet1").val("");
            $("#tPricet2").val("");
            $("#commentst").val("");
            $("#minutest").val("");
            $("#offlinet").prop('checked',false);
            $("#checkCircledMaxWagert").val("");
            $("#circledMaxWagert").prop('checked',false);
            break;
        case "tt":
            $("#ttTeam1").val("");
            $("#ttTeam2").val("");
            $("#pointstt1").val("");
            $("#pricett1").val("");
            $("#pricett2").val("");
            $("#commentstt").val("");
            $("#minutestt").val("");
            $("#offlinett").prop('checked',false);
            $("#checkCircledMaxWagertt").val("");
            $("#circledMaxWagertt").prop('checked',false);
            break;
    }
}


function clearPropEditLineModal() {
    $("#propLineDescription").val("");
    $("#oddProp").val("");
    $("#lineProp").val("");
    $("#lineProp").attr("disabled","disabled");
    $("#commentstt").val("");
    $("#offlineProp").removeAttr('checked');
    $("#circledContestProp").removeAttr('checked');
    $("#circledContestMaxWagerProp").val("");
    $("#contestMaxWagerProp").val("");
}


function addCategory() {
    $("#newCategoryModal").modal("toggle");
}

function saveAction() {
}

function editAction() {
}

function cancelAction() {
}

function changeTableHeight() {
    $(".scrollabletbody").css("height", $("#scheduleLines").outerHeight() - 68);
}

function showLineMaintenance(title) {
    $("#lineChangeTitle").html(title);
    $("#lineModal").modal("toggle");
}

function getScheduleFilterSportsParams(campo) {
    if (campo.checked) {
        arraySports.push(campo.value.trim());
    } else {
        var index = arraySports.indexOf(campo.value.trim());
        if (index > -1) {
            arraySports.splice(index, 1);
            arrayLeagues = [];
        }
    }
    var sportsArray = $('[name=sport]:checked');
    var filter = '';

    for (var i = 0; i < sportsArray.length; i++) {
        filter += sportsArray.eq(i).val().trim() + ',';
    }

    $.ajax({
        url: "games/loadleagues/" + filter,
        type: 'POST',
        dataType: "json",
        success: function (data) {
            var i = 1;
            $("#leagueGroupD").html("");
            while (data['row' + i] != undefined) {
                $("#leagueGroupD").append(
                        "<li><input type='checkbox' name='league' id='" + data['row' + i]['SportSubType'].trim() +
                        "' value='" + data['row' + i]['SportSubType'].trim() + "' onclick='getScheduleFilterLeagueParams(this)'>" +
                        "&nbsp;&nbsp;" + data['row' + i]['SportSubType'].trim() + "</input></li>");
                i++;
            }
            loadSchedule();
        }
    });

}

function getScheduleFilterLeagueParams(campo) {
    if (campo.checked) {
        arrayLeagues.push(campo.value.trim());
    } else {
        var index = arrayLeagues.indexOf(campo.value.trim());
        if (index > -1) {
            arrayLeagues.splice(index, 1);
        }
    }

    var sportsArray = $('[name=sport]:checked');
    var filterSport = '';

    for (var i = 0; i < sportsArray.length; i++) {
        filterSport += sportsArray.eq(i).val().trim() + ',';
    }

    var subSportsArray = $('[name=league]:checked');
    var filterSubSport = '';

    for (var i = 0; i < subSportsArray.length; i++) {
        filterSubSport += subSportsArray.eq(i).val().trim() + ',';
    }

    $.ajax({
        url: "games/loadcountries/" + filterSport + "/" + filterSubSport,
        type: 'POST',
        dataType: "json",
        success: function (data) {
            var i = 1;
            $("#countryGroupD").html("");
            while (data['row' + i] != undefined) {
                $("#countryGroupD").append(
                        "<li><input type='checkbox' name='country' id='" + data['row' + i]['ScheduleText'].trim() +
                        "' value='" + data['row' + i]['ScheduleText'].trim() + "'>" +
                        "&nbsp;&nbsp;" + data['row' + i]['ScheduleText'].trim() + "</input></li>");
                i++;
            }
            loadSchedule();
        }
    });
}

function convertSportsToString(array) {
    var string = "";
    if (array.length > 0) {
        for (var i = 0; i < array.length; i++) {
            string = string.concat(array[i] + ",");
        }
        return string;
    }
}

function enableStatusPeriod(value) {
    if (value) {
        $("#lineFilterStatus").removeAttr("disabled");
        $("#lineFilterPeriod").removeAttr("disabled");
    } else {
        $("#lineFilterStatus").attr("disabled", "dissabled");
        $("#lineFilterPeriod").attr("disabled", "dissabled");
    }
}


function clearPropForm(form) {
    if(form==="create"){
        $("#propsfrm").get(0).reset();
        $("#units").prop("disabled",true);
        $("#contestant").find('option').remove();
        teamTotalPropSelected=false;
    }else if(form==="create2"){
        $("#prop_name").val("");
        $("#units").val("");
        $("#comments_CP").val("");
        $("#units").prop("disabled",true);
        $("#spread_prop").prop("checked",false);
        $("#over_under").prop("checked",false);
        $("#contestant").find('option').remove();
        teamTotalPropSelected=false;
    }else if(form==="edit"){
        teamTotalPropSelected=false;
        $("#spread_prop_edit").attr("checked",false);
        $("#over_under_edit").attr("checked",false);
        $("#propsEditfrm").get(0).reset();
        $("#contestant_edit").find('option').remove();
    }else if(form==="createFP"){
        $("#prop_nameFP").val("");
        $("#propFolderText").val("");
        $("#unitsFP").val("");
        $("#comments_FP").val("");
        $("#unitsFP").prop("disabled",true);
        $("#spread_propFP").prop("checked",false);
        $("#over_underFP").prop("checked",false);
        $("#contestantFP").find('option').remove();
        teamTotalPropSelected=false;
    }else if(form==="createFP2"){
        $("#futurepropsfrm").get(0).reset();
        $("#unitsFP").prop("disabled",true);
        $("#contestantFP").find('option').remove();
    }
    
}


function getCorrelations(selected) {
    var selectedCorrelation;
    $.ajax({
        url: "games/getGameCorrelation/" + selected,
        success: function (data) {
            selectedCorrelation = data.trim();
        }
    });

    $.ajax({
        url: "games/getCorrelacionIds",
        success: function (data) {
            var obj = JSON.parse(data);
            $.each(obj, function (key, value) {
                var option = new Option(value['CorrelationID'].trim(), escape(value['CorrelationID'].trim()));
                if ('"' + value['CorrelationID'].trim() + '"' === selectedCorrelation.trim()) {
                    $(option).attr("selected", "selected");
                }
                $("#correlational_id").append(option);
            });
        }

    });
}
function cleanFolderInputs() {
    deepLevels = [];
    $("#level1").removeAttr('readonly');
    $("#level2").removeAttr('readonly');
    $("#level3").removeAttr('readonly');
}
function getParentLevelsGameProp(array, nodeId) {
    var node = $("#" + nodeId);
    array.push(node.attr('id'));
    if (node.parent().parent().find('a').attr('isGame') === 'true' || node.parent().find('a').attr('isGame') === 'true') {
        deepLevels = array;
    } else {
        getParentLevelsGameProp(array, node.parent().parent().attr('id'));
    }
}


function getParentLevels(array, nodeId) {
    var node = $("#" + nodeId);
    array.push(node.attr('id'));
    if (node.parent().parent().attr('id') === "scheduleTree" || node.parent().attr('id') === "scheduleTree") {
        deepLevels = array;
    } else {
        getParentLevels(array, node.parent().parent().attr('id'));
    }
}
//GAMES

function search(array, node) {
    if (node.parent().parent().parent().attr('id') === "scheduleTree") {
        array.push(node.text().trim());
        return array;
    } else {
        array.push(node.text().trim());
        return search(array, node.parent().parent().parent().find('>a'));
    }
}


function compareValues(v1, v2) {
    if (v1 === v2)
        return "";
    else
        return v1;
}

function changeLinePerStore() {
    selectedStore=$("#lineFilterStore").val().replace(" ","");
    selectedPeriod=$("#lineFilterPeriod").val();
    disconnectStomp();
    connectToStomp();
    var tree = $("#scheduleTree").jstree(true);
    var nodeId = tree.get_selected();
    if (selectedType === "isGame") {
        var sport = $("#" + nodeId).find('a').attr('sport');
        var league = $("#" + nodeId).find('a').attr('subsport');
        var operacion = $("#" + nodeId).find('a').attr('operacion');
        var scheduleDateText = $("#" + nodeId).find('a').attr('scheduleDateText');
        var scheduleText;
        var scheduleDate;

        var month = unescape(scheduleDateText);
        month = month.split(" ");
        if (months.indexOf(month[0]) > -1) {
            scheduleDate = scheduleDateText;
            scheduleText = "";
        } else {
            scheduleDate = "";
            scheduleText = scheduleDateText;
        }
        if (operacion === '4') {
            addGameLine($("#" + nodeId).attr('id').trim(), "N");
        } else {
            setGameLines(sport, league, scheduleDate, scheduleText, operacion);
        }
    } else if (selectedType === "isProp") {
        var correlation = $("#" + nodeId).find('a').attr('correlation');
        var level2 = $("#" + nodeId).find('a').attr('ContestType2');
        var level3 = $("#" + nodeId).find('a').attr('ContestType3');
        var operacion = $("#" + nodeId).find('a').attr('operacion');
        if (operacion === '4') {
            loadPropLines(operacion, "", $("#" + nodeId).attr('id').trim(), "", "", "");
        } else {
            loadPropLines(operacion, correlation, "", "", level2, level3);
        }
    } else if (selectedType === "isFutureProp") {
        var operacion = $("#" + nodeId).find('a').attr('operacion');
        if (operacion === '1') {
            var sport = $("#" + nodeId).find('a').attr('sport');
            loadFuturePropFolderLine(sport);
        } else if (operacion === '2') {
            var contestNum = $("#" + nodeId).attr('id').trim();
            loadPropLines(4, '', contestNum, '', '', '');
        }
    } else if (selectedType === "isFutureExtProp") {
        var operacion = $("#" + nodeId).find('a').attr('operacion');
        var level1 = $("#" + nodeId).find('a').attr('ContestType');
        var level2 = $("#" + nodeId).find('a').attr('ContestType2');
        var level3 = $("#" + nodeId).find('a').attr('ContestType3');
        if (operacion === '1') {
            loadPropLines(5, "", "", level1, "", "");
        } else if (operacion === '2') {
            loadPropLines(6, "", "", level1, level2, "");
        } else if (operacion === '3') {
            loadPropLines(7, "", "", level1, level2, level3);
        } else if (operacion === '4') {
            var contestNum = $("#" + nodeId).attr('id').trim();
            loadPropLines(4, '', contestNum, '', '', '');
        }
    }
}

function changeWagerFilter() {
    var tree = $("#scheduleTree").jstree(true);
    var nodeId = tree.get_selected();
    if (selectedType === "isGame") {
        var sport = $("#" + nodeId).find('a').attr('sport');
        var league = $("#" + nodeId).find('a').attr('subsport');
        var operacion = $("#" + nodeId).find('a').attr('operacion');
        var scheduleDateText = $("#" + nodeId).find('a').attr('scheduleDateText');
        var scheduleText;
        var scheduleDate;

        var month = unescape(scheduleDateText);
        month = month.split(" ");
        if (months.indexOf(month[0]) > -1) {
            scheduleDate = scheduleDateText;
            scheduleText = "";
        } else {
            scheduleDate = "";
            scheduleText = scheduleDateText;
        }
        if (operacion === '4') {
            addGameLine($("#" + nodeId).attr('id').trim(), "N");
        } else {
            setGameLines(sport, league, scheduleDate, scheduleText, operacion);
        }
    } else if (selectedType === "isProp") {
        var correlation = $("#" + nodeId).find('a').attr('correlation');
        var level2 = $("#" + nodeId).find('a').attr('ContestType2');
        var level3 = $("#" + nodeId).find('a').attr('ContestType3');
        var operacion = $("#" + nodeId).find('a').attr('operacion');
        if (operacion === '4') {
            loadPropLines(operacion, "", $("#" + nodeId).attr('id').trim(), "", "", "");
        } else {
            loadPropLines(operacion, correlation, "", "", level2, level3);
        }
    } else if (selectedType === "isFutureProp") {
        var operacion = $("#" + nodeId).find('a').attr('operacion');
        if (operacion === '1') {
            var sport = $("#" + nodeId).find('a').attr('sport');
            loadFuturePropFolderLine(sport);
        } else if (operacion === '2') {
            var contestNum = $("#" + nodeId).attr('id').trim();
            loadPropLines(4, '', contestNum, '', '', '');
        }
    } else if (selectedType === "isFutureExtProp") {
        var operacion = $("#" + nodeId).find('a').attr('operacion');
        var level1 = $("#" + nodeId).find('a').attr('ContestType');
        var level2 = $("#" + nodeId).find('a').attr('ContestType2');
        var level3 = $("#" + nodeId).find('a').attr('ContestType3');
        if (operacion === '1') {
            loadPropLines(5, "", "", level1, "", "");
        } else if (operacion === '2') {
            loadPropLines(6, "", "", level1, level2, "");
        } else if (operacion === '3') {
            loadPropLines(7, "", "", level1, level2, level3);
        } else if (operacion === '4') {
            var contestNum = $("#" + nodeId).attr('id').trim();
            loadPropLines(4, '', contestNum, '', '', '');
        }
    }
}

function changeDisplayValues() {
    var tree = $("#scheduleTree").jstree(true);
    var nodeId = tree.get_selected();
    if (selectedType === "isGame") {
        var sport = $("#" + nodeId).find('a').attr('sport');
        var league = $("#" + nodeId).find('a').attr('subsport');
        var operacion = $("#" + nodeId).find('a').attr('operacion');
        var scheduleDateText = $("#" + nodeId).find('a').attr('scheduleDateText');
        var scheduleText;
        var scheduleDate;

        var month = unescape(scheduleDateText);
        month = month.split(" ");
        if (months.indexOf(month[0]) > -1) {
            scheduleDate = scheduleDateText;
            scheduleText = "";
        } else {
            scheduleDate = "";
            scheduleText = scheduleDateText;
        }

        if (operacion === '4') {
            addGameLine($("#" + nodeId).attr('id').trim());
        } else {
            setGameLines(sport, league, scheduleDate, scheduleText, operacion);
        }
    } else if (selectedType === "isProp") {
        var correlation = $("#" + nodeId).find('a').attr('correlation');
        var level2 = $("#" + nodeId).find('a').attr('ContestType2');
        var level3 = $("#" + nodeId).find('a').attr('ContestType3');
        var operacion = $("#" + nodeId).find('a').attr('operacion');
        if (operacion === '4') {
            loadPropLines(operacion, "", $("#" + nodeId).attr('id').trim(), "", "", "");
        } else {
            loadPropLines(operacion, correlation, "", "", level2, level3);
        }
    }
}



function emptyFilters(selectID) {
    $('#' + selectID)
            .find('option')
            .remove()
            .end();
}
function setLineStoresFilters() {
    $.ajax({
        url: "games/getstores",
        complete: function () {
            $('#lineFilterStore > option[value="Master"]').prop("selected", true);
        },
        success: function (data) {
            emptyFilters("lineFilterStore");
            var array = data.split(',');
            var size = array.length;
            for (var i = 0; i < size; i++) {
                var opt = new Option(array[i].trim(), array[i].trim());
                $('#lineFilterStore').append(opt);
            }
        }
    });


}


function setLinePeriodFilter() {
    var tree = $("#scheduleTree").jstree(true);
    var nodeId;
    var sport;
    var league;
    if (tree) {
        nodeId = tree.get_selected();
        sport = $("#" + nodeId).find('a').attr('sport');
        league = $("#" + nodeId).find('a').attr('subsport');
    }
    if (sport !== selectedSport) {
        selectedSport = sport;
        $.ajax({
            url: "games/getperiods",
            data: {'sport': sport, "subSport": league},
            type: 'POST',
            success: function (data) {
                var obj = JSON.parse(data);
                emptyFilters("lineFilterPeriod");
                $.each(obj, function (k, v) {
                    var opt = new Option(v['PeriodDescription'].trim(), v['PeriodNumber'].trim());
                    $('#lineFilterPeriod').append(opt);
                });
            }
        });
    }
}





function setFilterParams(node) {
    league = "";
    gameDate = "";
    country = "";
    var array = search([], $('#' + node.getAttribute('id')));
    if (array.length === 4) {
        league = array[1];
        gameDate = array[2];
        country = array[2];
    } else if (array.length === 3) {
        var month = array[0].split(" ");
        var index = months.indexOf(month[0]);
        if (index > -1) {
            league = "";
            gameDate = array[0];
            country = array[1];
        } else {
            league = array[0];
            gameDate = array[1];
            country = "";
        }
    } else if (array.length === 2) {
        league = "";
        var month = array[0].split(" ");
        var index = months.indexOf(month[0]);
        if (index > -1) {
            gameDate = array[0];
            country = "";
        } else {
            gameDate = "";
            country = array[0];
        }
    } else {
        league = "";
        gameDate = array[1];
    }
    sport = array[array.length - 1];
}




//PROPS AND FUTURES
function openpropslines(node) {
    $(".scrollabletbody tbody").html("");
    loadExamplePropLines();
}


/*****************************************************END INDEX****************************************************************/

/**************************************************BEGIN GRADING MODAL*********************************************************/
function setLoseContestant(current) {
//    cleanRadios();
    $(current).attr('checked', 'true');
    $.each($("#gradingTableBody").find('tr'), function (key, value) {
        var win = $($(value).find('td')[1]).find('input');
        var lose = $($(value).find('td')[3]).find('input');
        if (!($(win).is(":checked"))) {
            $(lose).attr('checked', true);
        }
    });
}


function cleanRadios() {
    $.each(($("#gradingTableBody").find('tr').find('td')).find('input'), function (key, value) {
        $(value).attr('checked', false);
    });
}

function setTotalGrading() {
    $("#spread").attr('style', 'display:block');
    var header = $("#gradingTable");
    var table = $("#gradingTableBody");


    var trHeader = $("<tr></tr>");
    var tdHeader1 = "<td>Contestant</td>";
    trHeader.append(tdHeader1);
    header.append(trHeader);

    var trTable = $("<tr></tr>");
    var trTable2 = $("<tr></tr>");
    var td1 = "<td>Over</td>";
    trTable.append(td1);
    table.append(trTable);

    var td1 = "<td>Under</td>";
    trTable2.append(td1);
    table.append(trTable2);
}

function setSpreadGrading() {
    $("#total").attr('style', 'display:block');
    var header = $("#gradingTable");
    var table = $("#gradingTableBody");

    var trHeader = $("<tr></tr>");

    var tdHeader1 = "<td>Contestant</td>";
    var tdHeader2 = "<td>Win</td>";
    var tdHeader3 = "<td>Tie</td>";
    var tdHeader4 = "<td>Lose</td>";

    trHeader.append(tdHeader1);
    trHeader.append(tdHeader2);
    trHeader.append(tdHeader3);
    trHeader.append(tdHeader4);

    header.append(trHeader);


    for (var i = 0; i < 2; i++) {
        var trTable = $("<tr></tr>");
        var td1 = "<td>Team #" + i + "</td>";
        var td2 = "<td><input type='radio' name='res" + i + "' value='w' onchange='setLoseContestant(this)'/></td>";
        var td3 = "<td><input type='radio' name='res" + i + "' value='t'/></td>";
        var td4 = "<td><input type='radio' name='res" + i + "' value='l'/></td>";
        trTable.append(td1);
        trTable.append(td2);
        trTable.append(td3);
        trTable.append(td4);

        table.append(trTable);
    }


    var trTable = $("<tr></tr>");
}

function setContestGrading() {
    hideSpreadTotal();
    var header = $("#gradingTable");
    var table = $("#gradingTableBody");

    var trHeader = $("<tr></tr>");

    var tdHeader1 = "<td>Contestant</td>";
    var tdHeader2 = "<td>Win</td>";
    var tdHeader3 = "<td>Tie</td>";
    var tdHeader4 = "<td>Lose</td>";
    var tdHeader5 = "<td>Scrath</td>";

    trHeader.append(tdHeader1);
    trHeader.append(tdHeader2);
    trHeader.append(tdHeader3);
    trHeader.append(tdHeader4);
    trHeader.append(tdHeader5);

    header.append(trHeader);

    for (var i = 0; i < 10; i++) {
        var trTable = $("<tr></tr>");
        var td1 = "<td>Contest #" + i + "</td>";
        var td2 = "<td><input type='radio' name='res" + i + "' value='w' onchange='setLoseContestant(this)'/></td>";
        var td3 = "<td><input type='radio' name='res" + i + "' value='t'/></td>";
        var td4 = "<td><input type='radio' name='res" + i + "' value='l'/></td>";
        var td5 = "<td><input type='radio' name='res" + i + "' value='s'/></td>";
        trTable.append(td1);
        trTable.append(td2);
        trTable.append(td3);
        trTable.append(td4);
        trTable.append(td5);

        table.append(trTable);
    }
}
function hideSpreadTotal() {
    $("#spread").attr('style', 'display:none');
    $("#total").attr('style', 'display:none');
}

/**************************************************END GRADING MODAL*********************************************************/

/**************************************************BEGIN PROP MODAL*********************************************************/


function removeOption(value,form) {
    if(form===1){
        $("#contestant option[value='" + value + "']").each(function () {
            $(this).remove();
        });
    }else if(form===2){
        $("#contestant_edit option[value='" + value + "']").each(function () {
            var values=$(this).text().split(" - ");
            $("#cont_number_edit").val(values[0]);
            $("#cont_name_edit").val(values[1]);
            $(this).remove();
        });
    }
}
function selectAllContestants() {
    $("#contestant option").each(function () {
        $(this).attr('selected', 'selected');
    });
}

function loadActionFilterContent(){
    $.ajax({
        url: "settings/getAgents",
        success: function (data) {
            var obj=JSON.parse(data);
            $.each(obj,function (key,val){
                var opt=new Option(val["AgentID"],val["AgentID"]);
                $("#lineActionFilter").append(opt);
            });
        }
    });
}