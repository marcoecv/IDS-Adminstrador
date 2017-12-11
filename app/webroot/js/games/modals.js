$(document).ready(function () {
    $('#wc_listTable2').DataTable({
        "bPaginate": false,
        "bFilter": false,
        "sScrollY": "150",
        "sScrollX": "100%",
        "sScrollXInner": "100%",
        "bScrollCollapse": true
    });
    //CLOSING MODAL EVENT
    $('#ajaxDeleteModal').on('hidden.bs.modal', function () {
        $(focusedElement).focus();
    });
    $('#confirmationModal').on('hidden.bs.modal', function () {
        $(focusedElement).focus();
    });
    $('#editGameModal').on('hidden.bs.modal', function () {
        $(focusedElement).focus();
    });
    $('#gameScoreModal').on('hidden.bs.modal', function () {
        $(focusedElement).focus();
    });
    $('#gradeResultModal').on('hidden.bs.modal', function () {
        $(focusedElement).focus();
    });
    $('#lineModal').on('hidden.bs.modal', function () {
        $(focusedElement).focus();
    });
    $('#moneyLineModal').on('hidden.bs.modal', function () {
        $(focusedElement).focus();
    });
    $('#spreadModal').on('hidden.bs.modal', function () {
        $(focusedElement).focus();
    });
    $('#teamTotalModal').on('hidden.bs.modal', function () {
        $(focusedElement).focus();
    });
    $('#totalModal').on('hidden.bs.modal', function () {
        $(focusedElement).focus();
    });
    $('#editLinePropModal').on('hidden.bs.modal', function () {
        $(focusedElement).focus();
    });
    $('#editPropModal').on('hidden.bs.modal', function () {
        $(focusedElement).focus();
    });
    $('#gradeGameModal').on('hidden.bs.modal', function () {
        $(focusedElement).focus();
    });
    $('#wagerCoverageModal').on('hidden.bs.modal', function () {
        $(focusedElement).focus();
    });


    //PROP MODAL
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

    $('#gamedate_prop_edit').datetimepicker({
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0
    });

    $('#gametime_prop_edit').datetimepicker({
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 1,
        minView: 0,
        maxView: 1,
        forceParse: 0
    });

    $('#wagertime_prop_edit').datetimepicker({
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 1,
        minView: 0,
        maxView: 1,
        forceParse: 0
    });


    $('#gamedate_propFP').datetimepicker({
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0
    });

    $('#gametime_propFP').datetimepicker({
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 1,
        minView: 0,
        maxView: 1,
        forceParse: 0
    });

    $('#wagertime_propFP').datetimepicker({
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 1,
        minView: 0,
        maxView: 1,
        forceParse: 0
    });

//EDIT GAME MODAL

    $('#gamedateModal').datetimepicker({
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0
    });

    $('#gametimeModal').datetimepicker({
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 1,
        minView: 0,
        maxView: 1,
        forceParse: 0
    });

    $('#wagercutoffModal').datetimepicker({
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 1,
        minView: 0,
        maxView: 1,
        forceParse: 0
    });



    $("#saveEditGame").click(function () {
        saveEditGameModal();
    });

    $("#gametimeval").change(function () {
        $("#wagercutoffval").val($("#gametimeval").val());
    });


    $("#input_gametime_prop").change(function () {
        $("#input_wagertime_prop").val($("#input_gametime_prop").val());
    });

    $("#input_gametime_propFP").change(function () {
        $("#input_wagertime_propFP").val($("#input_gametime_propFP").val());
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




    $("#spread_prop").click(function () {
        $("#units").removeAttr('disabled');
        $("#contestant option").remove();
        teamTotalPropSelected = false;
    });


    $("#over_under").click(function () {
        $("#units").removeAttr('disabled');
        teamTotalPropSelected = true;
    });

    $("#cont_number_edit").change(function () {
        if (teamTotalPropSelected) {
            if ($('#contestant_edit option').size() < 1) {
                $("#cont_name_edit").val("Over");
            } else {
                $("#cont_name_edit").val("Under");
            }
        }
    });

    $("#add_contestant_edit").click(function () {
        if (validateContestantCant("edit")) {
            return addContestants("edit");
        } else
            alert("Cant add more than 2 cotestant to this prop");
    });

    $("#cont_name_edit").keypress(function (e) {
        if (validateContestantCant("edit")) {
            var key = e.which;
            if (key === 13) {
                return addContestants("edit");
            }
        } else
            alert("Cant add more than 2 cotestant to this prop");
    });





    $("#cont_number").change(function () {
        if (teamTotalPropSelected) {
            if ($('#contestant option').size() < 1) {
                $("#cont_name").val("Over");
            } else {
                $("#cont_name").val("Under");
            }
        }
    });

    $("#add_contestant").click(function () {
        if (validateContestantCant("create")) {
            return addContestants("create");
        } else
            alert("Cant add more than 2 cotestant to this prop");
    });

    $("#cont_name").keypress(function (e) {
        if (validateContestantCant("create")) {
            var key = e.which;
            if (key === 13) {
                return addContestants("create");
            }
        } else
            alert("Cant add more than 2 cotestant to this prop");
    });


    $("#spread_propFP").click(function () {
        $("#unitsFP").removeAttr('disabled');
        $("#contestantFP option").remove();
        teamTotalPropSelected = false;
    });


    $("#over_underFP").click(function () {
        $("#unitsFP").removeAttr('disabled');
        teamTotalPropSelected = true;
    });

    $("#cont_numberFP").change(function () {
        if (teamTotalPropSelected) {
            if ($('#contestantFP option').size() < 1) {
                $("#cont_nameFP").val("Over");
            } else {
                $("#cont_nameFP").val("Under");
            }
        }
    });

    $("#add_contestantFP").click(function () {
        if (validateContestantCant("createFP")) {
            return addContestants("createFP");
        } else
            alert("Cant add more than 2 cotestant to this prop");
    });

    $("#cont_nameFP").keypress(function (e) {
        if (validateContestantCant("createFP")) {
            var key = e.which;
            if (key === 13) {
                return addContestants("createFP");
            }
        } else
            alert("Cant add more than 2 cotestant to this prop");
    });




    $("#oddProp").change(function () {
        var decimal = "" + calcDecimalValue($("#oddProp").val());
        var frac = ConvertDecimalFractional(calcDecimalValue($("#oddProp").val()));
        $("#convertedValues").text(decimal.substring(0, 4) + "  " + frac);
    });

    $("#savePropButton").click(function () {
        saveCreatePropModal()
    });
    $("#saveNextPropButton").click(function () {
        saveCreatePropModal(2);
    });

    $("#saveFuturePropButton").click(function () {
        saveCreateFuturePropModal();
    });
    $("#saveNextFuturePropButton").click(function () {
        saveCreateFuturePropModal(2);
    });

    $("#subSportTypeFP").change(function () {
        var folder1 = $("#subSportTypeFP").val() + "-FUTURES -" + $("#sportTypeFP").val() + "- " + $("#propFolderText").val();
        $("#level1FP").val(folder1);
    });

    $("#propFolderText").change(function () {
        var folder1 = $("#subSportTypeFP").val() + "-FUTURES -" + $("#sportTypeFP").val() + "- " + $("#propFolderText").val();
        $("#level1FP").val(folder1);
    });


//    Grade Game Modal
    $("#confirmScheduleGrade").click(function () {
        sendGradeGame();
    });

    $("#cancelGradeGameModal").click(function () {
        if ($("#cancelGradeGameModal").is(":checked")) {
            $("#gm_spread_na").prop("checked", true);
            $("#gm_spread_g").prop("checked", false);
            $("#gm_spread_na").prop("readonly", true);
            $("#gm_spread_g").prop("disabled", true);
            $("#gm_money_na").prop("checked", true);
            $("#gm_money_g").prop("checked", false);
            $("#gm_money_na").prop("readonly", true);
            $("#gm_money_g").prop("disabled", true);
            $("#gm_total_na").prop("checked", true);
            $("#gm_total_g").prop("checked", false);
            $("#gm_total_na").prop("readonly", true);
            $("#gm_total_g").prop("disabled", true);
        } else {
            $("#gm_spread_na").prop("checked", !true);
            $("#gm_spread_g").prop("checked", !false);
            $("#gm_spread_na").prop("readonly", !true);
            $("#gm_spread_g").prop("disabled", !true);
            $("#gm_money_na").prop("checked", !true);
            $("#gm_money_g").prop("checked", !false);
            $("#gm_money_na").prop("readonly", !true);
            $("#gm_money_g").prop("disabled", !true);
            $("#gm_total_na").prop("checked", !true);
            $("#gm_total_g").prop("checked", !false);
            $("#gm_total_na").prop("readonly", !true);
            $("#gm_total_g").prop("disabled", !true);
        }
    });


    $("#gotoPropsGrade").click(function () {
        redirectPropGrading();
    });

    $("#lh_spread").click(function () {
        $("#lh_spread").prop("class", "btn btn-info");
        $("#lh_moneyline").prop("class", "btn btn-default");
        $("#lh_total").prop("class", "btn btn-default");
    });

    $("#lh_moneyline").click(function () {
        $("#lh_spread").prop("class", "btn btn-default");
        $("#lh_moneyline").prop("class", "btn btn-info");
        $("#lh_total").prop("class", "btn btn-default");
    });

    $("#lh_total").click(function () {
        $("#lh_spread").prop("class", "btn btn-default");
        $("#lh_moneyline").prop("class", "btn btn-default");
        $("#lh_total").prop("class", "btn btn-info");
    });

    $("#wc_wagerDetailsButton").click(function () {
        openWagerDetailsModal();
    });

    $("#sp_addShade").click(function () {
        var listVal = $("#sp_shadesAll").val();
        $("#sp_shadesAll").find("option[value='" + listVal + "']").remove();
        if (listVal !== null) {
            var opt = new Option(listVal, listVal);
            $(opt).prop("selected", true);
            $("#sp_shades").append(opt);
            getLineInfoByCustProfile($("#gameNumSP").val(), ".", "SP");
            saveSpreadLine(true);
        }
    });
    $("#sp_removeShade").click(function () {
        var listVal = $("#sp_shades").val();
        $("#sp_shades").find("option[value='" + listVal + "']").remove();
        if (listVal !== null) {
            if (confirm("Are you sure you want to delete this shade?")) {
                var opt = new Option(listVal, listVal);
                $("#sp_shadesAll").append(opt);
                removeShadeFromGame($("#gameNumSP").val(), listVal, $("#lineFilterStore").val().trim());
                getLineInfoByCustProfile($("#gameNumSP").val(), ".", "SP");
            }
        }
    });

    $("#ml_addShade").click(function () {
        var listVal = $("#ml_shadesAll").val();
        $("#ml_shadesAll").find("option[value='" + listVal + "']").remove();
        if (listVal !== null) {
            var opt = new Option(listVal, listVal);
            $(opt).prop("selected", true);
            $("#ml_shades").append(opt);
            getLineInfoByCustProfile($("#gameNumML").val(), ".", "ML");
            saveMoneyLine(true);
        }
    });
    $("#ml_removeShade").click(function () {
        var listVal = $("#ml_shades").val();
        $("#ml_shades").find("option[value='" + listVal + "']").remove();
        if (listVal !== null) {
            if (confirm("Are you sure you want to delete this shade?")) {
                var opt = new Option(listVal, listVal);
                $("#ml_shadesAll").append(opt);
                removeShadeFromGame($("#gameNumML").val(), listVal, $("#lineFilterStore").val().trim());
                getLineInfoByCustProfile($("#gameNumML").val(), ".", "ML");
            }
        }
    });

    $("#tl_addShade").click(function () {
        var listVal = $("#tl_shadesAll").val();
        $("#tl_shadesAll").find("option[value='" + listVal + "']").remove();
        if (listVal !== null) {
            var opt = new Option(listVal, listVal);
            $(opt).prop("selected", true);
            $("#tl_shades").append(opt);
            getLineInfoByCustProfile($("#gameNumT").val(), ".", "TL");
            saveTotalLine(true);

        }
    });
    $("#tl_removeShade").click(function () {
        var listVal = $("#tl_shades").val();
        $("#tl_shades").find("option[value='" + listVal + "']").remove();
        if (listVal !== null) {
            if (confirm("Are you sure you want to delete this shade?")) {
                var opt = new Option(listVal, listVal);
                $("#tl_shadesAll").append(opt);
                removeShadeFromGame($("#gameNumT").val(), listVal, $("#lineFilterStore").val().trim());
                getLineInfoByCustProfile($("#gameNumT").val(), ".", "TL");
            }
        }
    });

    $("#tt_addShade").click(function () {
        var listVal = $("#tt_shadesAll").val();
        $("#tt_shadesAll").find("option[value='" + listVal + "']").remove();
        if (listVal !== null) {
            var opt = new Option(listVal, listVal);
            $(opt).prop("selected", true);
            $("#tt_shades").append(opt);
            getLineInfoByCustProfile($("#gameNumTT").val(), ".", "TT");
            saveTotalLine(true);
        }
    });
    $("#tt_removeShade").click(function () {
        var listVal = $("#tt_shades").val();
        $("#tt_shades").find("option[value='" + listVal + "']").remove();
        if (listVal !== null) {
            if (confirm("Are you sure you want to delete this shade?")) {
                var opt = new Option(listVal, listVal);
                $("#tt_shadesAll").append(opt);
                removeShadeFromGame($("#gameNumTT").val(), listVal, $("#lineFilterStore").val().trim());
                getLineInfoByCustProfile($("#gameNumTT").val(), ".", "TT");
            }
        }
    });

    $("#sp_shades").change(function () {
        getLineInfoByCustProfile($("#gameNumSP").val(), $(this).val(), "SP");
    });

    $("#ml_shades").change(function () {
        getLineInfoByCustProfile($("#gameNumML").val(), $(this).val(), "ML");
    });

    $("#tl_shades").change(function () {
        getLineInfoByCustProfile($("#gameNumT").val(), $(this).val(), "TL");
    });

    $("#tt_shades").change(function () {
        getLineInfoByCustProfile($("#gameNumTT").val(), $(this).val(), "TT");
    });

    $("#lockComback_sp").click(function (){
        setLockComebackStatus("SP",$("#lockComback_sp").attr("class").includes("default"));
    });

    $("#lockComback_ml").click(function (){
        setLockComebackStatus("ML",$("#lockComback_ml").attr("class").includes("default"));
    });
    
    $("#lockComback_tl").click(function (){
        setLockComebackStatus("TL",$("#lockComback_tl").attr("class").includes("default"));
    });
    
    $("#lockComback_tt").click(function (){
        setLockComebackStatus("TT",$("#lockComback_tt").attr("class").includes("default"));
    });
    
    
    $("#openPausesButton").click(function (){
        openPauseModal()
    });
});

function setLockComebackStatus(wagerType,status){
    switch (wagerType) {
        case "SP":
            if(status){
                $("#lockComback_sp").removeClass("btn-default");
                $("#lockComback_sp").addClass("btn-info");
            }else{
                $("#lockComback_sp").removeClass("btn-info");
                $("#lockComback_sp").addClass("btn-default");
            }
            lockComebackSP=status;
            break;
        case "ML":
            if(status){
                $("#lockComback_ml").removeClass("btn-default");
                $("#lockComback_ml").addClass("btn-info");
            }else{
                $("#lockComback_ml").removeClass("btn-info");
                $("#lockComback_ml").addClass("btn-default");
            }
            lockComebackML=status;
            break;    
        case "TL":
            if(status){
                $("#lockComback_tl").removeClass("btn-default");
                $("#lockComback_tl").addClass("btn-info");
            }else{
                $("#lockComback_tl").removeClass("btn-info");
                $("#lockComback_tl").addClass("btn-default");
            }
            lockComebackTL=status;
            break;
        case "TT":
            if(status){
                $("#lockComback_tt").removeClass("btn-default");
                $("#lockComback_tt").addClass("btn-info");
            }else{
                $("#lockComback_tt").removeClass("btn-info");
                $("#lockComback_tt").addClass("btn-default");
            }
            lockComebackTT=status;
            break;
    }
}

function redirectPropGrading() {
    $("#gm_form").prop("action", "grade/generalpropsgrading");
    $("#gm_form").submit();
//    window.location = "grade/generalpropsgrading/"+gameNum;
    return false;
}

function callOpenSpread(evt) {
    if (($("#moneyLineModal").data('bs.modal') || {}).isShown) {
        saveMoneyLine();
        openSpreadModal($("#gameNumML").val(), 3);
    } else if (($("#totalModal").data('bs.modal') || {}).isShown) {
        openSpreadModal($("#gameNumT").val(), 3);
        saveTotalLine();
    } else if (($("#teamTotalModal").data('bs.modal') || {}).isShown) {
        saveTeamTotalLine();
        openSpreadModal($("#gameNumTT").val(), 3);
    } else {
        openSpreadModal("", 2);
    }
    return false;
}
function callOpenMoneyLine(evt) {
    if (($("#spreadModal").data('bs.modal') || {}).isShown) {
        saveSpreadLine();
        openMoneyLineModal($("#gameNumSP").val(), 3);
    } else if (($("#totalModal").data('bs.modal') || {}).isShown) {
        saveTotalLine();
        openMoneyLineModal($("#gameNumT").val(), 3);
    } else if (($("#teamTotalModal").data('bs.modal') || {}).isShown) {
        saveTeamTotalLine();
        openMoneyLineModal($("#gameNumTT").val(), 3);
    } else {
        openMoneyLineModal("", 2);
    }
    return false;
}

function callOpenTotal(evt) {
    if (($("#spreadModal").data('bs.modal') || {}).isShown) {
        saveSpreadLine();
        openTotalModal($("#gameNumSP").val(), 3);
    } else if (($("#moneyLineModal").data('bs.modal') || {}).isShown) {
        saveMoneyLine();
        openTotalModal($("#gameNumML").val(), 3);
    } else if (($("#teamTotalModal").data('bs.modal') || {}).isShown) {
        saveTeamTotalLine();
        openTotalModal($("#gameNumTT").val(), 3);
    } else {
        openTotalModal("", 2);
    }
    return false;
}

function saveCurrentModal() {
    if (($("#spreadModal").data('bs.modal') || {}).isShown) {
        saveSpreadLine();
    } else if (($("#moneyLineModal").data('bs.modal') || {}).isShown) {
        saveMoneyLine();
    } else if (($("#teamTotalModal").data('bs.modal') || {}).isShown) {
        saveTeamTotalLine();
    } else if (($("#totalModal").data('bs.modal') || {}).isShown) {
        saveTotalLine();
    } else if (($("#editLinePropModal").data('bs.modal') || {}).isShown) {
        savePropLine();
    }
    return false;
}



function saveEditGameModal() {
    if ($("#gameEditfrm").validationEngine('validate')) {
        var preventbuying;
        if ($('#preventbuying').is(':checked')) {
            preventbuying = 'Y';
        } else {
            preventbuying = 'N';
        }
        $.ajax({
            url: "games/saveedit",
            type: 'POST',
            data: {
                'rotANumber': $('#rotANumberModal').val(),
                'broadcastid': $('#broadcastid').val(),
                'comments': $('#comments').val(),
                'gamedateval': $('#gamedateval').val(),
                'gametimeval': $('#gametimeval').val(),
                'wagercutoffval': $('#wagercutoffval').val(),
                'preventbuying': preventbuying,
                'restrictions': $('[name=restrictions]:checked').val(),
                'status': $("#status").val()
            },
            success: function (data) {
                if (data === -1) {
                    $("#messageSpan").text("The game was not saved due to an error");
                    $("#defaultMsgModal").modal('toggle');
                }
            }

        });

    }
    $("#editGameModal").modal("toggle");
}


function saveCreatePropModal(cleanType) {
    if ($("#propsfrm").validationEngine('validate')) {
        if (($("#over_under").is(":checked") || $("#spread_prop").is(":checked")) && $("#units").val() === "") {
            alert("Units field can not be empty");
        } else {
            var contestants = "";
            $("#contestant option").each(function () {
                contestants += $(this).val() + "/";
            });
            var type;
            if ($("#over_under").is(":checked"))
                type = $("#over_under").val();
            else if ($("#spread_prop").is(":checked"))
                type = $("#spread_prop").val();
            else
                type = "";
            $.ajax({
                url: "props/create",
                type: 'POST',
                data: {
                    "contestType": "." + $("#level1").val(),
                    "contestType2": $("#level2").val(),
                    "contestType3": $("#level3").val(),
                    "contestDesc": $("#prop_name").val(),
                    "contestDate": $("#input_gamedate_prop").val(),
                    "contestTime": $("#input_gametime_prop").val(),
                    "contestCutOff": $("#input_wagertime_prop").val(),
                    "comments": $("#comments_CP").val(),
                    "unit": $("#units").val(),
                    "contestants": contestants,
                    "type": type,
                    "correlationID": $("#correlational_id").val()
                }, success: function (data) {
                    if (data === '1') {
                        if (cleanType === 2) {
                            clearPropForm("create2");
                        } else {
                            $("#createPropModal").modal('toggle');
                        }
                    } else {
                        $("#createPropModal").modal('toggle');
                        alert("Error");
                    }
                }
            });
        }
    }
}


function saveCreateFuturePropModal(cleanType) {
    if ($("#propsfuturefrm").validationEngine('validate')) {
        if (($("#over_underFP").is(":checked") || $("#spread_propFP").is(":checked")) && $("#unitsFP").val() === "") {
            alert("Units field can not be empty");
        } else {
            var contestants = "";
            $("#contestantFP option").each(function () {
                contestants += $(this).val() + "/";
            });
            var type;
            if ($("#over_underFP").is(":checked"))
                type = $("#over_underFP").val();
            else if ($("#spread_propFP").is(":checked"))
                type = $("#spread_propFP").val();
            else
                type = "";
            $.ajax({
                url: "props/create",
                type: 'POST',
                data: {
                    "contestType": "." + $("#level1FP").val(),
                    "contestType2": $("#level2FP").val(),
                    "contestType3": $("#level3FP").val(),
                    "contestDesc": $("#prop_nameFP").val(),
                    "contestDate": $("#input_gamedate_propFP").val(),
                    "contestTime": $("#input_gametime_propFP").val(),
                    "contestCutOff": $("#input_wagertime_propFP").val(),
                    "comments": $("#comments_FP").val(),
                    "unit": $("#unitsFP").val(),
                    "contestants": contestants,
                    "type": type
                }, success: function (data) {
                    if (data === '1') {
                        if (cleanType === 2) {
                            clearPropForm("createFP");
                        } else {

                            $("#createFuturePropModal").modal('toggle');
                        }
                    } else {
                        $("#createFuturePropModal").modal('toggle');
                        alert("Error");
                    }
                }
            });
        }
    }
}
function selectAllContestants() {
    $("#contestant_edit option").each(function () {
        $(this).attr('selected', 'selected');
    });
}


function openEditPropModal(contestNum, correlation, inputPressed) {
    clearPropForm("edit");
    focusedElement = $(inputPressed).find("input:text");
    ;
    $.ajax({
        url: "Props/edit",
        type: 'POST',
        data: {
            "contestNum": contestNum,
            "correlation": correlation,
            "store": $("#lineFilterStore").val()
        },
        success: function (data) {
            var obj = JSON.parse(data);
            $("#level1_edit").val(obj["row1"]['ContestType'].trim());
            $("#level2_edit").val(obj["row1"]['ContestType2'].trim());
            $("#level3_edit").val(obj["row1"]['ContestType3'].trim());
            $("#level1_edit").attr("readonly", true);
            $("#level2_edit").attr("readonly", true);
            $("#level3_edit").attr("readonly", true);

            $("#spread_prop_edit").attr("readonly", true);
            $("#over_under_edit").attr("readonly", true);


            $.ajax({
                url: "Props/isPropBets",
                type: 'POST',
                data: {
                    "contestType": obj["row1"]['ContestType'].trim(),
                    "contestType2": obj["row1"]['ContestType2'].trim(),
                    "contestType3": obj["row1"]['ContestType3'].trim(),
                    "contestdesc": obj["row1"]['ContestDesc'].trim()
                },
                success: function (data) {
                    if (data > 0) {
                        $("#prop_name_edit").attr("readonly", true);
                        $("#correlational_id_edit").attr("readonly", true);
                        var select = $("#contestant_edit");
                        $.each(obj, function (key, val) {
                            var option = new Option(val['RotNum'] + " - " + val['ContestantName'], val['RotNum'] + "_" + val['ContestantName']);
                            select.append(option);
                        });
                    } else {
                        $("#prop_name_edit").attr("readonly", false);
                        $("#correlational_id_edit").attr("readonly", false);
                        var select = $("#contestant_edit");
                        $.each(obj, function (key, val) {
                            var option = new Option(val['RotNum'] + " - " + val['ContestantName'], val['RotNum'] + "_" + val['ContestantName']);
                            option.setAttribute("ondblclick", "removeOption(this.value,2)");
                            select.append(option);
                        });
                    }
                }
            });
            teamTotalPropSelected = false;
            if (obj["row1"]["ContestantName"].trim() === "Over") {
//                alert("Entro");
                $("#over_under_edit").attr("checked", true);
                teamTotalPropSelected = true;
            } else if (obj["row1"]['ThresholdUnits'] !== null) {
                $("#spread_prop_edit").attr("checked", true);
            }

            if (obj["row1"]['ThresholdUnits'] !== null)
                $("#units_edit").val(obj["row1"]['ThresholdUnits'].trim());
            $("#units_edit").attr("readonly", true);


            $("#prop_name_edit").val(obj["row1"]['ContestDesc']);
            $("#oldContestDesc_edit").val(obj["row1"]['ContestDesc']);


            var dateTimeArray = obj["row1"]['ContestDateTime'].split(" ");
            var wagerDateArray = obj["row1"]['WagerCutoff'].split(" ");
            var wagerTime = wagerDateArray[1].split(":");
            var gameTime = dateTimeArray[1].split(":");
            var gameDate = dateTimeArray[0].split("-")
            $("#input_gamedate_prop_edit").val(gameDate[1] + "-" + gameDate[2] + "-" + gameDate[0]);
            $("#input_gametime_prop_edit").val(gameTime[0] + ":" + gameTime[1]);
            $("#input_wagertime_prop_edit").val(wagerTime[0] + ":" + wagerTime[1]);

            if (correlation !== "" && correlation !== undefined && correlation !== null)
                getEditModalCorrelation(correlation);

            $("#comments_edit").val(obj["row1"]['Comments']);




        }
    });
    $("#editPropModal").modal("toggle");
}


function saveEditProp() {
    selectAllContestants();
    var contestants = "";
    $("#contestant_edit option").each(function () {
        contestants += $(this).val().trim() + "/";
    });
    var type;
    if ($("#over_under_edit").is(":checked"))
        type = $("#over_under_edit").val();
    else if ($("#spread_prop_edit").is(":checked"))
        type = $("#spread_prop_edit").val();
    else
        type = "";
    $.ajax({
        url: "Props/saveedit",
        type: 'POST',
        data: {
            "contestType": $("#level1_edit").val().trim(),
            "contestType2": $("#level2_edit").val().trim(),
            "contestType3": $("#level3_edit").val().trim(),
            "contestDesc": $("#prop_name_edit").val().trim(),
            "oldContestDesc": $("#oldContestDesc_edit").val().trim(),
            "contestDate": $("#input_gamedate_prop_edit").val(),
            "contestTime": $("#input_gametime_prop_edit").val(),
            "contestCutOff": $("#input_wagertime_prop_edit").val(),
            "units": $("#units_edit").val().trim(),
            "comments": $("#comments_edit").val().trim(),
            "contestants": contestants,
            "currentContestants": $("#currentContestants_edit").val(),
            "type": type,
            "correlationID": $("#correlational_id_edit").val().trim()
        }, success: function (data) {
            if (data === -1) {
                $("#messageSpan").text("The prop was not saved due to an error");
                $("#defaultMsgModal").modal('toggle');
            }
        }
    });
    $("#editPropModal").modal("toggle");
}

function getEditModalCorrelation(correlation) {
    $.ajax({
        url: "games/getCorrelacionIds",
        success: function (data) {
            var obj = JSON.parse(data);
            $.each(obj, function (key, value) {
                var option = new Option(value['CorrelationID'].trim(), escape(value['CorrelationID'].trim()));
                if (value['CorrelationID'].trim() === unescape(correlation.trim())) {
                    $(option).attr("selected", "selected");
                }
                $("#correlational_id_edit").append(option);
            });
        }

    });
}


function openinfoEditModal(contestNum, rotation, inputPressed) {
    focusedElement = $(inputPressed).find("input:text");
    clearPropEditLineModal();
    $.ajax({
        url: "games/getPropLine",
        type: 'POST',
        data: {
            "contestNum": contestNum,
            "store": $("#lineFilterStore").val()
        }, success: function (data) {
            var obj = JSON.parse(data);
//        focusedElement = $("#" + obj["row1"]['ContestantNum'] + "_price").find("input:text");
            $.each(obj, function (key, value) {
                if (value['RotNum'] === rotation) {
                    tmp = value['ThresholdUnits'];
                    if (value['ThresholdUnits'] === null) {
                        $("#lineProp").prop("disabled", true);
                        $("#propLineType").val("M");
                        $("#lineProp").val(value['ThresholdLine'] === null ? "" : processModalData(value['ThresholdLine']));
                        $("#lineProp").attr("class", "form-control inlineElement smallWidth");
                    } else if (value['ContestantName'].trim() === "Over" || value['ContestantName'].trim() === "Under") {
                        $("#propLineType").val("T");
                        $("#lineProp").prop("disabled", false);
                        $("#lineProp").val(value['ThresholdLine'] === null ? "" : processModalData(value['ThresholdLine'], 't'));
                        $("#lineProp").attr("onkeyup", "changeValues(this,'t')");
                        $("#lineProp").attr("class", "form-control inlineElement smallWidth");
                    } else {
                        $("#propLineType").val("S");
                        $("#lineProp").prop("disabled", false);
                        var ThresholdLine = "";
                        if (value['ThresholdLine'] === null) {
                            ThresholdLine = "";
                        } else {
                            ThresholdLine = processModalData(value['ThresholdLine'], 's');
                        }
                        $("#lineProp").val(ThresholdLine);
                        $("#lineProp").attr("onkeyup", "changeValues(this,'t')");
                        $("#lineProp").attr("class", "form-control inlineElement smallWidth");
                    }
                    var date = value['WagerCutoff'].split(".");
                    var store = (value['Store'] === null ? "" : value['Store']);
                    $("#contestDescProp").val(value['ContestDesc']);
                    $("#rotNProp1").val(value['RotNum']);
                    $("#contestType").val(value['ContestType'].trim());
                    $("#contestType2").val(value['ContestType2'].trim());
                    $("#contestType3").val(value['ContestType3'].trim());
                    $("#propLineDescription").val(store + "\n" + date[0] + "\n" + value['ContestDesc'] + "\n" + value['ContestantName']);
                    $("#comments").val();
                    if (value['Status'] === 'H') {
                        $("#offlineProp").prop("checked", true);
                    } else if (value['Status'] === 'I') {
                        $("#circledContestProp").prop("checked", true);
                    }
                    if (value['CircledMaxWager'] !== null && value['CircledMaxWager'] !== "0.0") {
                        $("#circledContestMaxWagerProp").val(value['CircledMaxWager']);
                    }
                    $("#contestMaxWagerProp").val(value['ContestantMaxWager'] === null || value['ContestantMaxWager'] === "0.0" ? "" : value['ContestantMaxWager']);
                    $("#propComments").val(value['Comments']);
                    $("#oddProp").val(value['MoneyLine'] === null ? "" : processData(value['MoneyLine']));
                    $("#convertedValues").text((value['DecimalODDS'] === null ? "" : value['DecimalODDS'].substring(0, 4)) + " " + (value['Numerator'] === null ? "" : value['Numerator']) + "/" + (value['Denominator'] === null ? "" : value['Denominator']));
                } else {
                    $("#rotNProp2").val(value['RotNum']);
                    $("#lineProp2").val(value['MoneyLine'] === null ? "" : value['MoneyLine']);
                }
            });
            $("#oddProp").select();
        }
    });
    $("#editLinePropModal").modal("toggle");
    $("#oddProp").focus();
    $("#oddProp").select();

}


function fillSpreadLineInfo(AmeFavValue, AmeValue, decFavValue, decValue, factFavValu, factValue, favTeam, type) {
    if (favTeam === 1) {
        if (type === 'A') {
            $("#comeBacksp1").text(Math.round(decFavValue * 100) / 100 + " " + factFavValu);
            $("#pricesp2").val(AmeValue >= 0 ? "+" + AmeValue : AmeValue);
            $("#comeBacksp2").text(Math.round(decValue * 100) / 100 + " " + factValue);
        } else {
            $("#comeBacksp1").text(AmeFavValue + " " + factFavValu);
            $("#pricesp2").val(Math.round(decValue * 100) / 100);
            $("#comeBacksp2").text(AmeValue + " " + factValue);

        }
        $("#americanPricesp1").val(AmeFavValue);
        $("#americanPricesp2").val(AmeValue);
    } else if (favTeam === 2) {
        if (type === 'A') {
            $("#pricesp1").val(AmeValue >= 0 ? "+" + AmeValue : AmeValue);
            $("#comeBacksp1").text(Math.round(decValue * 100) / 100 + " " + factValue);
            $("#comeBacksp2").text(Math.round(decFavValue * 100) / 100 + " " + factFavValu);
        } else {
            $("#pricesp1").val(Math.round(decValue * 100) / 100);
            $("#comeBacksp1").text(AmeValue + " " + factValue);
            $("#comeBacksp2").text(AmeFavValue + " " + factFavValu);
        }
        $("#americanPricesp1").val(AmeValue);
        $("#americanPricesp2").val(AmeFavValue);
    }
}

function fillmoneyLineLineInfo(AmeFavValue, AmeValue, decFavValue, decValue, factFavValu, factValue, favTeam, type) {
    if (favTeam === 1) {
        if (type === 'A') {

            $("#comeBackml1").text(Math.round(decFavValue * 100) / 100 + " " + factFavValu);
            $("#mlPricet2").val(AmeValue >= 0 ? "+" + AmeValue : AmeValue);
            $("#comeBackml2").text(Math.round(decValue * 100) / 100 + " " + factValue);
        } else {
            $("#comeBackml1").text(AmeFavValue + " " + factFavValu);
            $("#mlPricet2").val(Math.round(decValue * 100) / 100);
            $("#comeBackml2").text(AmeValue + " " + factValue);
        }
        $("#americanPriceml1").val(AmeFavValue);
        $("#americanPriceml2").val(AmeValue);
    } else if (favTeam === 2) {
        if (type === 'A') {
            $("#mlPricet1").val(AmeValue >= 0 ? "+" + AmeValue : AmeValue);
            $("#comeBackml1").text(Math.round(decValue * 100) / 100 + " " + factValue);
            $("#comeBackml2").text(Math.round(decFavValue * 100) / 100 + " " + factFavValu);
        } else {
            $("#mlPricet1").val(Math.round(decValue * 100) / 100);
            $("#comeBackml1").text(AmeValue + " " + factValue);
            $("#comeBackml2").text(AmeFavValue + " " + factFavValu);
        }
        $("#americanPriceml1").val(AmeValue);
        $("#americanPriceml2").val(AmeFavValue);
    }
}

function fillTotalLineInfo(AmeFavValue, AmeValue, decFavValue, decValue, factFavValu, factValue, favTeam, type) {
    if (favTeam === 1) {
        if (type === 'A') {
            $("#comeBackt1").text(Math.round(decFavValue * 100) / 100 + " " + factFavValu);
            $("#tPricet2").val(AmeValue >= 0 ? "+" + AmeValue : AmeValue);
            $("#comeBackt2").text(Math.round(decValue * 100) / 100 + " " + factValue);
        } else {
            $("#comeBackt1").text(AmeFavValue + " " + factFavValu);
            $("#tPricet2").val(Math.round(decValue * 100) / 100);
            $("#comeBackt2").text(AmeValue + " " + factValue);
        }
        $("#americanPricet1").val(AmeFavValue);
        $("#americanPricet2").val(AmeValue);
    } else if (favTeam === 2) {
        if (type === 'A') {
            $("#tPricet1").val(AmeValue >= 0 ? "+" + AmeValue : AmeValue);
            $("#comeBackt1").text(Math.round(decValue * 100) / 100 + " " + factValue);
            $("#comeBackt2").text(Math.round(decFavValue * 100) / 100 + " " + factFavValu);
        } else {
            $("#tPricet1").val(Math.round(decValue * 100) / 100);
            $("#comeBackt1").text(AmeValue + " " + factValue);
            $("#comeBackt2").text(AmeFavValue + " " + factFavValu);
        }
        $("#americanPricet1").val(AmeValue);
        $("#americanPricet2").val(AmeFavValue);
    }
}

function fillTeamTotalLineInfo(AmeFavValue, AmeValue, decFavValue, decValue, factFavValu, factValue, favTeam, type) {
    if (favTeam === 1) {
        if (type === 'A') {

            $("#comeBacktt1").text(Math.round(decFavValue * 100) / 100 + " " + factFavValu);
            $("#pricett2").val(AmeValue >= 0 ? "+" + AmeValue : AmeValue);
            $("#comeBacktt2").text(Math.round(decValue * 100) / 100 + " " + factValue);
        } else {
            $("#comeBackt1").text(AmeFavValue + " " + factFavValu);
            $("#pricett2").val(Math.round(decValue * 100) / 100);
            $("#comeBacktt2").text(AmeValue + " " + factValue);
        }
        $("#americanPricett1").val(AmeFavValue);
        $("#americanPricett2").val(AmeValue);
    } else if (favTeam === 2) {
        if (type === 'A') {
            $("#pricett1").val(AmeValue >= 0 ? "+" + AmeValue : AmeValue);
            $("#comeBacktt1").text(Math.round(decValue * 100) / 100 + " " + factValue);
            $("#comeBacktt2").text(Math.round(decFavValue * 100) / 100 + " " + factFavValu);
        } else {
            $("#pricett1").val(Math.round(decValue * 100) / 100);
            $("#comeBacktt1").text(AmeValue + " " + factValue);
            $("#comeBacktt2").text(AmeFavValue + " " + factFavValu);
        }
        $("#americanPricett1").val(AmeValue);
        $("#americanPricett2").val(AmeFavValue);
    }
}


function openSpreadModal(tdPressed, callerType) {
    clearLineEditModal('sp');
    $("#linkToMastersp").siblings('label').html('Link to Master Store');
    var gameID = "";
    if (callerType === 1) {
        var gid = $(tdPressed).parent().attr("id").split("_");
        focusedElement = $(tdPressed).find("input:text");
        gameID = gid[0];
    } else if (callerType === 2) {
        var tree = $("#scheduleTree").jstree(true);
        var nodeId = tree.get_selected();
        if ($("#" + nodeId).find("a").attr("isGame"))
            gameID = "" + nodeId;
        else
            alert("the selected node is not a game");
    } else if (callerType === 3) {
        gameID = tdPressed;

    }
    if (gameID !== "") {
        var period = $("#lineFilterPeriod").val();
        var lineas;
        $.ajax({
            url: "games/getgame",
            data: {
                "idGame": gameID,
                "periodID": period,
                "store": $("#lineFilterStore").val()
            },
            type: 'POST',
            success: function (data) {
                var obj = $.parseJSON('[' + data + ']');
                lineas = obj[0]['results']['row1'];
                getChart(lineas['SportType'], lineas['SportSubType'], "S");


                var date = lineas['GameDate'].split("/");
                var JSDate = new Date("20" + date[2], date[0], date[1]);

                var gameDate = date[0] + "-" + date[1] + "-20" + date[2];
                var time = lineas['GameTime'].split(":");
                $("#gamedatespread").val(gameDate);
                $("#gametimespread").val(time[0] + ":" + time[1]);
                $("#gameNumSP").val(lineas["GameNum"]);
                var desc = "Store: " + $("#lineFilterStore").val() + " * " + days[JSDate.getDay() - 1] + " - " + date[0] + "-" + date[1] + "-" + "20" + date[2] + " " + lineas['GameTime'] + " * " + lineas['Team1ID'] +
                        " vs " + lineas['Team2ID'] + " * Period: " + lineas['PeriodDescription'];
                $("#line_histButtonSP").attr("onclick", "openLineHistoryModal('spread','" + lineas["GameNum"] + "')");
                $("#lineDescriptionsp").text(desc);

                $("#sportSubTypesp").val(lineas['SportSubType']);
                $("#sporttypesp").val(lineas['SportType']);
                $("#team1").val(lineas['Team1ID']);
                $("#team2").val(lineas['Team2ID']);
                $("#rotANumbersp").val(lineas['Team1RotNum']);
                $("#rotHNumbersp").val(lineas['Team2RotNum']);

                if (lineas['FavoredTeamID'] === lineas['Team1ID']) {
                    $("#spreadt1").val(processModalData(lineas['Spread']));
                    $("#spreadt1").select();
                } else {
                    $("#spreadt2").val(processModalData(lineas['Spread']));
                    $("#spreadt2").select();
                }
                var price1 = lineas['SpreadAdj1'] === null || lineas['SpreadAdj1'] === "0" ? "-110" : processModalData(lineas['SpreadAdj1']);
                var price2 = lineas['SpreadAdj2'] === null || lineas['SpreadAdj2'] === "0" ? "-110" : processModalData(lineas['SpreadAdj2']);
                $("#pricesp1").val(price1);
                $("#pricesp2").val(price2);
                $("#americanPricesp1").val(processModalData(lineas['SpreadAdj1']));
                $("#americanPricesp2").val(processModalData(lineas['SpreadAdj2']));
                if ($.trim(lineas['Store']) === "Master" || $.trim(lineas['Store']) ==="") {
                    $("#linkToMastersp").prop('disabled', true);
                    $("#linkToMastersp").hide();
                    $("#labellinkToMastersp").hide();
                    $("#linkToMastersplb").prop('disabled', true);
                } else {
                    $("#linkToMastersp").show();
                    $("#labellinkToMastersp").show();
                    $("#linkToMastersp").prop('disabled', false);
                    $("#linkToMastersplb").prop('disabled', false);
                    if (lineas['LinkedToStoreFlag'] === 'Y') {
                        $("#linkToMastersp").prop("checked", true);
                    } else {
                        $("#linkToMastersp").prop("checked", false);
                    }
                    if (lineas['Status'] === 'H') {
                        $("#offlinesp").prop("checked", true);
                    } else if (lineas['Status'] === 'I') {
                        $("#checkCircledMaxWagersp").prop("checked", true);
                    } else {
                        $("#offlinesp").prop("checked", false);
                        $("#checkCircledMaxWagersp").prop("checked", false);
                    }

                }
                $.ajax({
                    url: "games/getGameInfoLine",
                    type: 'POST',
                    data: {
                        "gameNum": lineas['GameNum'].trim(),
                        "store": $("#lineFilterStore").val(),
                        "period": $("#lineFilterPeriod").val(),
                        "cusprofile": "."
                    }, complete: function () {
                        getShadesByStore("SP");
                    },
                    success: function (data2) {
                        var obj2 = $.parseJSON(data2);
                        var comments = obj2['row1']['Comments'] === null ? "" : obj2['row1']['Comments'];
                        $("#sp_shadesList").val(obj2['row1']['Shades']);
                        $("#commentssp").val(comments);
                        $("#minutessp").val(obj2['row1']['Min']);
                        if (obj2['row1']['Status'] === 'H') {
                            document.getElementById("offlinesp").checked = true;
                        } else if (obj2['row1']['Status'] === 'I') {
                            $("#checkCircledMaxWagersp").attr("checked", true);
                        }
                        if (obj2['row1']['CircledMaxWagerSpread'] !== null) {
                            $("#circledMaxWagersp").val(obj2['row1']['CircledMaxWagerSpread']);
                        }
                        var o;
                        o = "master" + obj2['row1']['Shades'];
                        setShadesList(o, "SP");
                    }
                });
            }
        });
        setLockComebackStatus("SP",lockComebackSP);
        $("#spreadModal").modal("toggle");
    }
//    $("#spreadt1").focus();
//    $("#spreadt1").select();
}


function openMoneyLineModal(tdPressed, callerType) {
    clearLineEditModal('ml');
    $("#linkToMasterml").siblings('label').html('Link to Master Store');
    var tree = $("#scheduleTree").jstree(true);
    var sel = tree.get_selected();
    var gameID = "";
    if (callerType === 1) {
        var gid = $(tdPressed).parent().attr("id").split("_");
        focusedElement = $(tdPressed).find("input:text");
        gameID = gid[0];
    } else if (callerType === 2) {
        var nodeId = tree.get_selected();
        if ($("#" + nodeId).find("a").attr("isGame"))
            gameID = "" + nodeId;
        else
            alert("the selected node is not a game");
    } else if (callerType === 3) {
        gameID = tdPressed;
    }
    if (gameID !== "") {
        var array = [];
        getParentLevels(array, sel);
        var sport = deepLevels[deepLevels.length - 1];
        deepLevels = [];
        clearLineEditModal('ml');
        var period = $("#lineFilterPeriod").val();
        var lineas;
        $.ajax({
            url: "games/getgame",
            data: {
                "idGame": gameID,
                "periodID": period,
                "store": $("#lineFilterStore").val()
            },
            type: 'POST',
            success: function (data) {
                var obj = $.parseJSON('[' + data + ']');
                var lineas = obj[0]['results']['row1'];
                getChart(lineas['SportType'], lineas['SportSubType'], "M");

                var date = lineas['GameDate'].split("/");
                var JSDate = new Date("20" + date[2], date[0], date[1]);

                var desc = "Store: " + $("#lineFilterStore").val() + " * " + days[JSDate.getDay() - 1] + " - " + date[0] + "-" + date[1] + "-" + "20" + date[2] + " " + lineas['GameTime'] + " * " + lineas['Team1ID'] +
                        " vs " + lineas['Team2ID'] + " * Period: " + lineas['PeriodDescription'];
                $("#lineDescriptionml").text(desc);

                var gameDate = date[0] + "-" + date[1] + "-20" + date[2];
                var time = lineas['GameTime'].split(":");

                $("#gamedateml").val(gameDate);
                $("#gametimeml").val(time[0] + ":" + time[1]);
                $("#gameNumML").val(lineas["GameNum"]);
                $("#line_histButtonML").attr("onclick", "openLineHistoryModal('moneyline','" + lineas["GameNum"] + "')");
                $("#sportSubTypeml").val(lineas['SportSubType']);
                $("#sporttypeml").val(lineas['SportType']);

                $("#sportSubTypeml").val(lineas['SportSubType']);
                $("#sporttypeml").val(lineas['SportType']);
                $("#rotANumberml").val(lineas['Team1RotNum']);
                $("#rotHNumberml").val(lineas['Team2RotNum']);
                $("#mlTeam1").val(lineas['Team1ID']);
                $("#mlTeam2").val(lineas['Team2ID']);
                $("#mlDraw").val("Draw");
                if (sport !== "Soccer") {
                    $("#mlPricet3").attr("disabled", "disabled");
                } else {
                    $("#mlPricet3").removeAttr("disabled");
                }
                $("#mlPricet1").val(processModalData(lineas['MoneyLine1']));
                $("#mlPricet2").val(processModalData(lineas['MoneyLine2']));
                $("#mlPricet3").val(processModalData(lineas['MoneyLineDraw']));
                $("#americanPriceml1").val(processModalData(lineas['MoneyLine1']));
                $("#americanPriceml2").val(processModalData(lineas['MoneyLine2']));
//                 if (lineas['FavoredTeamID'] === lineas['Team1ID']){
//                    $("#mlPricet1").select();
//                }
//                if (lineas['FavoredTeamID'] === lineas['Team2ID']){
//                    $("#mlPricet2").select();
//                }
                var priceML1 = parseInt($("#mlPricet1").val());
                var priceML2 = parseInt($("#mlPricet2").val());
                if (priceML1 < 0 && priceML2 < 0) {
                    if (priceML2 < priceML1) {
                        $("#mlPricet2").focus();
                        $("#mlPricet2").select();
                    } else {
                        $("#mlPricet1").focus();
                        $("#mlPricet1").select();
                    }

                } else if (priceML1 < 0) {
                    $("#mlPricet1").focus();
                    $("#mlPricet1").select();
                } else {
                    $("#mlPricet2").focus();
                    $("#mlPricet2").select();
                }
                 if ($.trim(lineas['Store']) === "Master" || $.trim(lineas['Store']) ==="") {
                    $("#linkToMasterml").hide();
                    $("#labellinkToMasterml").hide();
                    $("#linkToMasterml").prop('disabled', true);
                } else {
                    $("#linkToMasterml").show();
                    $("#labellinkToMasterml").show();
                    $("#linkToMasterml").prop('disabled', false);
                    if (lineas['LinkedToStoreFlag'] === 'Y') {
                        $("#linkToMasterml").prop("checked", true);
                    } else {
                        $("#linkToMasterml").prop("checked", false);
                    }
                }
                $.ajax({
                    url: "games/getGameInfoLine",
                    type: 'POST',
                    data: {
                        "gameNum": lineas['GameNum'].trim(),
                        "store": $("#lineFilterStore").val(),
                        "period": $("#lineFilterPeriod").val(),
                        "cusprofile": "."
                    }, complete: function () {
                        getShadesByStore("ML");
                    },
                    success: function (data2) {
                        var obj2 = $.parseJSON(data2);
                        var comments = obj2['row1']['Comments'] === null ? "" : obj2['row1']['Comments'];
                        $("#ml_shadesList").val(obj2['row1']['Shades']);
                        $("#commentsml").val(comments);
                        $("#minutesml").val(obj2['row1']['Min']);
                        if (obj2['row1']['Status'] === 'H') {
                            $("#offlineml").prop("checked", true);
                        } else if (obj2['row1']['Status'] === 'I') {
                            $("#checkCircledMaxWagerml").prop("checked", true);
                        } else {
                            $("#checkCircledMaxWagerml").prop("checked", false);
                            $("#offlineml").prop("checked", false);
                        }
                        if (obj2['row1']['CircledMaxWagerMoneyLine'] !== null) {
                            $("#circledMaxWagerml").val(obj2['row1']['CircledMaxWagerMoneyLine']);
                        }
                        var o;
                        o = "master" + obj2['row1']['Shades'];
                        setShadesList(o, "ML");
                        // setShadesList(obj2['row1']['Shades'], "ML");
                    }
                });
            }
        });
        setLockComebackStatus("ML",lockComebackML);
        $("#moneyLineModal").modal("toggle");
    }
}


function openTotalModal(tdPressed, callerType) {
    clearLineEditModal('t');
    $("#linkToMastert").siblings('label').html('Link to Master Store');
    var tree = $("#scheduleTree").jstree(true);
    var gameID = "";
    if (callerType === 1) {
        var gid = $(tdPressed).parent().attr("id").split("_");
        focusedElement = $(tdPressed).find("input:text");
        gameID = gid[0];
    } else if (callerType === 2) {
        var nodeId = tree.get_selected();
        if ($("#" + nodeId).find("a").attr("isGame"))
            gameID = "" + nodeId;
        else
            alert("the selected node is not a game");
    } else if (callerType === 3) {
        gameID = tdPressed;

    }
    if (gameID !== "") {
        var period = $("#lineFilterPeriod").val();
        var lineas;
        $.ajax({
            url: "games/getgame",
            data: {'idGame': gameID, "periodID": period, "store": $("#lineFilterStore").val()},
            type: 'POST',
            success: function (data) {
                var obj = $.parseJSON('[' + data + ']');
                var lineas = obj[0]['results']['row1'];

                getChart(lineas['SportType'], lineas['SportSubType'], "L");

                var date = lineas['GameDate'].split("/");
                var JSDate = new Date("20" + date[2], date[0], date[1]);

                var desc = "Store: " + $("#lineFilterStore").val() + " * " + days[JSDate.getDay() - 1] + " - " + date[0] + "-" + date[1] + "-" + "20" + date[2] + " " + lineas['GameTime'] + " * " + lineas['Team1ID'] +
                        " vs " + lineas['Team2ID'] + " * Period: " + lineas['PeriodDescription'];
                $("#lineDescriptiont").text(desc);

                var gameDate = date[0] + "-" + date[1] + "-20" + date[2];
                var time = lineas['GameTime'].split(":");

                $("#gamedatet").val(gameDate);
                $("#gametimet").val(time[0] + ":" + time[1]);
                $("#gameNumT").val(lineas["GameNum"]);
                $("#line_histButtonT").attr("onclick", "openLineHistoryModal('total','" + lineas["GameNum"] + "')");
                $("#sportSubTypet").val(lineas['SportSubType']);
                $("#sporttypet").val(lineas['SportType']);
                $("#rotANumbert").val(lineas['Team1RotNum']);
                $("#rotHNumbert").val(lineas['Team2RotNum']);
                $("#tTeam1").val(lineas['Team1ID']);
                $("#tTeam2").val(lineas['Team2ID']);
                $("#tPoints1").val(processModalData(lineas['TotalPoints'], "t"));

                var price1 = lineas['TtlPtsAdj1'] === null || lineas['TtlPtsAdj1'] === "0" ? "-110" : processModalData(lineas['TtlPtsAdj1']);
                var price2 = lineas['TtlPtsAdj2'] === null || lineas['TtlPtsAdj2'] === "0" ? "-110" : processModalData(lineas['TtlPtsAdj2']);
                $("#tPricet1").val(price1);
                $("#tPricet2").val(price2);

                $("#americanPricet1").val(processModalData(lineas['TtlPtsAdj1']));
                $("#americanPricet2").val(processModalData(lineas['TtlPtsAdj2']));
                if ($.trim(lineas['Store']) === "Master" || $.trim(lineas['Store']) ==="") {
                    $("#linkToMastert").hide();
                    $("#labellinkToMastert").hide();
                    $("#linkToMastert").prop('disabled', true);
                } else {
                    $("#linkToMastert").show();
                    $("#labellinkToMastert").show();
                    $("#linkToMastert").prop('disabled', false);
                    if (lineas['LinkedToStoreFlag'] === 'Y') {
                        $("#linkToMastert").prop("checked", true);
                    } else {
                        $("#linkToMastert").prop("checked", false);
                    }
                }
                $.ajax({
                    url: "games/getGameInfoLine",
                    type: 'POST',
                    data: {
                        "gameNum": lineas['GameNum'].trim(),
                        "store": $("#lineFilterStore").val(),
                        "period": $("#lineFilterPeriod").val(),
                        "cusprofile": "."
                    }, complete: function () {
                        getShadesByStore("TL");
                    },
                    success: function (data2) {
                        var obj2 = $.parseJSON(data2);
                        var comments = obj2['row1']['Comments'] === null ? "" : obj2['row1']['Comments'];
                        $("#tl_shadesList").val(obj2['row1']['Shades']);
                        $("#commentst").val(comments);
                        $("#minutest").val(obj2['row1']['Min']);
                        if (obj2['row1']['Status'] === 'H') {
                            $("#offlinet").prop("checked", true);
                        } else if (obj2['row1']['Status'] === 'I') {
                            document.getElementById("checkCircledMaxWagert").checked = true;
                        }else {
                            $("#offlinet").prop("checked", false);
                            $("#checkCircledMaxWagert").prop("checked", false);
                        }
                        if (obj2['row1']['CircledMaxWagerMoneyLine'] !== null) {
                            $("#checkCircledMaxWagert").prop("checked", true);
                        } 
                        var o;
                        o = "master" + obj2['row1']['Shades'];
                        setShadesList(o, "TL");
                    }
                });
                $("#tPoints1").select();
            }
        });
        setLockComebackStatus("TL",lockComebackTL);
        $("#totalModal").modal("toggle");
        $("#tPoints1").focus();
        $("#tPoints1").select();
    }
}


function openTeamTotalModal(team, tdPressed, callerType) {
    clearLineEditModal('tt');
    $("#linkToMastertt").siblings('label').html('Link to Master Store');
    var gameID = "";
    if (callerType === 1) {
        var gid = $(tdPressed).parent().attr("id").split("_");
        focusedElement = $(tdPressed).find("input:text");
        gameID = gid[0];
    } else if (callerType === 3) {
        gameID = tdPressed;
    }

    var period = $("#lineFilterPeriod").val();
    var lineas;
    $.ajax({
        url: "games/getgame",
        data: {'idGame': gameID, "periodID": period, "store": $("#lineFilterStore").val()},
        type: 'POST',
        success: function (data) {
            var obj = $.parseJSON('[' + data + ']');
            var lineas = obj[0]['results']['row1'];

            getChart(lineas['SportType'], lineas['SportSubType'], "E");

            var date = lineas['GameDate'].split("/");
            var JSDate = new Date("20" + date[2], date[0], date[1]);

            var desc = "Store: " + $("#lineFilterStore").val() + " * " + days[JSDate.getDay() - 1] + " " + date[0] + "-" + date[1] + "-" + "20" + date[2] + " " + lineas['GameTime'] + " * " + lineas['Team1ID'] +
                    " vs " + lineas['Team2ID'] + " * Period: " + lineas['PeriodDescription'];
            $("#lineDescriptiontt  ").text(desc);

            var gameDate = date[0] + "-" + date[1] + "-20" + date[2];
            var time = lineas['GameTime'].split(":");

            $("#gamedateteam").val(gameDate);
            $("#gametimeteam").val(time[0] + ":" + time[1]);
            $("#gameNumTT").val(lineas["GameNum"]);
            $("#sportSubTypett").val(lineas['SportSubType']);
            $("#sporttypett").val(lineas['SportType']);
            $("#rotANumbertt").val(lineas['Team1RotNum']);
            $("#rotHNumbertt").val(lineas['Team2RotNum']);
            $("#ttTeam1").val("OVER");
            $("#ttTeam2").val("UNDER");

            if (team === "away") {
                $("#pricett1").val(processModalData(lineas['Team1TtlPtsAdj1'], 't'));
                $("#pricett2").val(processModalData(lineas['Team1TtlPtsAdj2'], 't'));
                $("#pointstt1").val(processModalData(lineas['Team1TotalPoints'], 't'));
                $("#position").val("1");
                $("#americanPricett1").val(processModalData(lineas['Team1TtlPtsAdj1'], 't'));
                $("#americanPricett2").val(processModalData(lineas['Team1TtlPtsAdj2'], 't'));
            } else if (team === "home") {
                $("#pricett1").val(processModalData(lineas['Team2TtlPtsAdj1'], 't'));
                $("#pricett2").val(processModalData(lineas['Team2TtlPtsAdj2'], 't'));
                $("#pointstt1").val(processModalData(lineas['Team2TotalPoints'], 't'));
                $("#position").val("2");
                $("#americanPricett1").val(processModalData(lineas['Team2TtlPtsAdj1']));
                $("#americanPricett2").val(processModalData(lineas['Team2TtlPtsAdj2']));

            }
              if ($.trim(lineas['Store']) === "Master" || $.trim(lineas['Store']) ==="") {
                $("#linkToMastertt").hide();
                $("#labellinkToMastertt").hide();
                $("#linkToMastertt").prop('disabled', true);
            } else {
                $("#linkToMastertt").show();
                $("#labellinkToMastertt").show();
                $("#linkToMastertt").prop('disabled', false);
                if (lineas['LinkedToStoreFlag'] === 'Y') {
                    $("#linkToMastertt").prop("checked", true);
                } else {
                    $("#linkToMastertt").prop("checked", false);
                }
            }
            $.ajax({
                url: "games/getGameInfoLine",
                type: 'POST',
                data: {
                    "gameNum": lineas['GameNum'].trim(),
                    "store": $("#lineFilterStore").val(),
                    "period": $("#lineFilterPeriod").val(),
                    "cusprofile": "."
                }, complete: function () {
                    getShadesByStore("TT");
                },
                success: function (data2) {
                    var obj2 = $.parseJSON(data2);
                    $("#commentstt").val(obj2['row1']['Comments']);
                    $("#minutestt").val(obj2['row1']['Min']);
                    $("#tt_shadesList").val(obj2['row1']['Shades']);
                    if (obj2['row1']['Status'] === 'H') {
                        $("#offlinett").prop("checked", true);
                    } else if (obj2['row1']['Status'] === 'I') {
                        $("#checkCircledMaxWagertt").prop("checked", true);
                    }else {
                        $("#offlinett").prop("checked", false);
                        $("#checkCircledMaxWagertt").prop("checked", false);
                    }
                    if (obj2['row1']['CircledMaxWagerMoneyLine'] !== null) {
                        $("#circledMaxWagertt").val(obj2['row1']['CircledMaxWagerTeamTotal']);
                    } 
                    var o;
                    o = "master" + obj2['row1']['Shades'];
                    setShadesList(o, "TT");
                }
            });
            $("#pointstt1").select();
        }
    });
    setLockComebackStatus("TT",lockComebackTT);
    $("#teamTotalModal").modal("toggle");
    $("#pointstt1").focus();
    $("#pointstt1").select();
}

function openEditGameModal(GameIdTD, callerType, inputPressed) {
    var tree = $("#scheduleTree").jstree(true);
    focusedElement = $(inputPressed).find("input:text");
    var gameID = "";
    if (callerType === 1) {
        var nodeId = tree.get_selected();
        if ($("#" + nodeId).find("a").attr("isGame"))
            gameID = "" + nodeId;
        else
            alert("the selected node is not a game");
    } else if (callerType === 2) {
        gameID = GameIdTD;

    }
    if (gameID !== "") {
        $.ajax({
            url: "games/edit/" + gameID,
            success: function (data) {
                var obj = JSON.parse(data);
                if (obj['row1']['SportType'].trim() === "Baseball") {
                    $("#pitcherEditDiv1").css("display", "block");
                    $("#pitcherEditDiv2").css("display", "block");
                    $("#pitcher1Edit").val(obj['row1']['ListedPitcher1']);
                    $("#pitcher2Edit").val(obj['row1']['ListedPitcher2']);
                } else {
                    $("#pitcherEditDiv1").css("display", "none");
                    $("#pitcherEditDiv2").css("display", "none");
                }
                $("#sportid").val(obj['row1']['SportType']);
                $("#leagueid").val(obj['row1']['SportSubType']);
                $("#countryid").val(obj['row1']['ScheduleText']);
                $("#rotANumberModal").val(obj['row1']['Team1RotNum']);
                $("#teamAidModal").val(obj['row1']['Team1ID']);
                $("#rotHNumberModal").val(obj['row1']['Team2RotNum']);
                $("#teamHidModal").val(obj['row1']['Team2ID']);
                $("#broadcastid").val(obj['row1']['BroadcastInfo']);
                $("#comments").val(obj['row1']['Comments']);
                $("#status").val(obj['row1']['Status']);

                var dateTime = obj['row1']['GameDateTime'].split(" ");
                var date = dateTime[0].split("-");
                var time = dateTime[1].split(":");
                $("#gamedateval").val(date[1] + "-" + date[2] + "-" + date[0]);
                $("#gametimeval").val(time[0] + ":" + time[1]);

                var dateTimeC = obj['row1']['WagerCutoff'].split(" ");
                var timeC = dateTimeC[1].split(":");
                $("#wagercutoffval").val(timeC[0] + ":" + timeC[1]);

                if (obj['PreventPointBuyingFlag'] === 'Y') {
                    $("#preventbuying").attr("selected", "selected");
                }

                if (obj['row1']['ParlayRestriction'].trim() === "A")
                    $("#allow").attr("checked", "true");
                else if (obj['row1']['ParlayRestriction'].trim() === "S")
                    $("#same").attr("checked", "true");
                else if (obj['row1']['ParlayRestriction'].trim() === "D")
                    $("#deny").attr("checked", "true");

                $("#correlationid").val(obj['row1']['CorrelationID']);
            }
        });
        $("#editGameModal").modal("toggle");
    }
}


function openGradingModal() {
    $("#gradingModal").modal("toggle");
}


function openCreateFutureProp(sportType, contestType1, contestType2, contestType3) {
    clearPropForm("createFP2");
    if (contestType2 !== undefined && contestType3 === undefined) {
        $("#level1FP").val(unescape(contestType1));
        $("#level2FP").val(unescape(contestType2));
        $("#subSportTypeFP").prop("disabled", true);
        $("#propFolderText").prop("disabled", true);
        $("#level1FP").prop("readonly", true);
        $("#level2FP").prop("readonly", true);
    }
    if (contestType2 !== undefined && contestType3 !== undefined) {
        $("#level1FP").val(unescape(contestType1));
        $("#level2FP").val(unescape(contestType2));
        $("#level3FP").val(unescape(contestType3));
        $("#subSportTypeFP").prop("disabled", true);
        $("#propFolderText").prop("disabled", true);
        $("#level1FP").prop("readonly", true);
        $("#level2FP").prop("readonly", true);
        $("#level3FP").prop("readonly", true);
    }
    $("#subSportTypeFP").find('option').remove();
    $.ajax({
        url: "games/loadleagues/" + sportType,
        success: function (data) {
            var obj = JSON.parse(data);
            var select = $("#subSportTypeFP");
            $("#sportTypeFP").val(sportType);
            $("#sportFP").text(sportType);
            $.each(obj, function (key, val) {
                var opt = new Option(val['SportSubType'].trim(), val['SportSubType'].trim());
                select.append(opt);
            });
        }
    });



    $("#createFuturePropModal").modal("toggle");
}

function openGradeGameModal(gameId, tdPressed) {
    focusedElement = $(tdPressed).find("input:text");
    $.ajax({
        url: "grade/getgameinfo",
        type: 'POST',
        data: {
            "gameId": gameId,
            "period": $("#lineFilterPeriod").val()
        },
        success: function (data) {
            var obj = JSON.parse(data);
            $("#gameNumRedirect").val(obj['row1']['GameNum'])
            $("#gm_sport").text(obj["row1"]['SportType'].trim());
            $("#gm_subSport").text(obj["row1"]['SportSubType'].trim());
            var dateTime = obj["row1"]['GameDateTime'].split(" ");
            var date = dateTime[0].split("-");
            var time = dateTime[1].split(":");
            $("#gm_gameDateTime").text(date[2] + "/" + date[1] + "/" + date[0] + " " + time[0] + ":" + time[1]);
            $("#gm_teamA").text(obj["row1"]['Team1ID'].trim());
            $("#gm_teamH").text(obj["row1"]['Team2ID'].trim());
            $("#gm_rotNum").val(obj["row1"]['Team1RotNum']);
            $("#gm_periodNumber").val($("#lineFilterPeriod").val());
            var periodDesc = $("#lineFilterPeriod").find("option[value='" + $("#lineFilterPeriod").val() + "']").eq(0);
            $("#gm_periodDesc").text(periodDesc.text());
            $("#teamAgradeGame").text(obj["row1"]['Team1ID'].trim());
            $("#pitcherAgrade").text(obj["row1"]['ListedPitcher1'] !== null ? obj["row1"]['ListedPitcher1'].trim() : "");
            $("#teamHgradeGame").text(obj["row1"]['Team2ID'].trim());
            $("#pitcherHgrade").text(obj["row1"]['ListedPitcher2'] !== null ? obj["row1"]['ListedPitcher2'].trim() : "");

            if (obj["row1"]['SportSubType'].trim() === "MLB") {
                $("#gm_ajustLineA").prop("readonly", false);
                $("#gm_ajustLineH").prop("readonly", false);
            } else {
                $("#gm_ajustLineA").prop("readonly", true);
                $("#gm_ajustLineH").prop("readonly", true);
            }

            getGradeInfo(obj["row1"]['Team1RotNum'], obj["row1"]['GameDateTime'], $("#lineFilterPeriod").val());
            getGameScores($("#lineFilterPeriod").val(), obj["row1"]);
        }
    });

    $("#gradeGameModal").modal("toggle");
}

function getGradeInfo(rotNum, GameDate, PeriodNum) {
    $.ajax({
        url: "grade/getgradeinfo",
        type: 'POST',
        data: {
            "rotNum": rotNum,
            "gameDate": GameDate,
            "periodNum": PeriodNum
        },
        success: function (data) {
            var obj = JSON.parse(data);
            if (obj.length !== 0) {
                if (obj['row1']['CancelSpreadFlag'] === 'Y') {
                    $("#gm_spread_na").prop("checked", true);
                    $("#gm_spread_g").prop("checked", false);
                } else
                    $("#gm_spread_g").prop("checked", true);
                if (obj['row1']['CancelMoneyLineFlag'] === 'Y') {
                    $("#gm_money_na").prop("checked", true);
                    $("#gm_money_g").prop("checked", false);
                } else
                    $("#gm_money_g").prop("checked", true);
                if (obj['row1']['CancelTtlPtsFlag'] === 'Y') {
                    $("#gm_total_na").prop("checked", true);
                    $("#gm_total_g").prop("checked", false);
                } else
                    $("#gm_total_g").prop("checked", true);
                if (obj['row1']['GameCancelled'] === 'Y') {
                    $("#cancelGradeGameModal").prop("checked", true);
                }

                if (obj['row1']['DailyFigureDate'] !== null) {
                    var gameDate = obj['row1']['DailyFigureDate'].split(" ");
                    var date = gameDate[0].split("-");
                    $("#gm_input_dailyFigure").val(date[1] + "-" + date[2] + "-" + date[0]);
                }
            } else {
                $("#gm_spread_g").prop("checked", true);
                $("#gm_money_g").prop("checked", true);
                $("#gm_total_g").prop("checked", true);

                var today = new Date();
                var dd = today.getDate();
                var mm = today.getMonth() + 1;
                var yyyy = today.getFullYear();
                $("#gm_input_dailyFigure").val("0" + mm + "-" + "0" + dd + "-" + yyyy);
            }

        }
    });
}

function getGameScores(period, scoresArray) {
    var pointsA = "";
    var pointsH = "";
    var pointsToAddA = "";
    var pointsToAddH = "";
    var scoreA = "";
    var scoreH = "";
    if (scoresArray['SportSubType'].trim() === "NHL") {
        switch (period) {
            case '1':
                if (scoresArray["1-Team1Score"] !== undefined) {
                    pointsA = scoreA = scoresArray["1-Team1Score"];
                    pointsH = scoreH = scoresArray["1-Team2Score"];
                }
                break;
            case '2':
                if (scoresArray["1-Team1Score"] !== undefined) {
                    pointsToAddA = parseInt(scoresArray["1-Team1Score"]);
                    pointsToAddH = parseInt(scoresArray["1-Team2Score"]);
                    if (scoresArray["2-Team1Score"] !== undefined) {
                        pointsA = parseInt(scoresArray["2-Team1Score"]);
                        pointsH = parseInt(scoresArray["2-Team2Score"]);
                        scoreA = pointsToAddA + pointsA;
                        scoreH = pointsToAddH + pointsH;
                    }
                }
                break;
            case '3':
                if (scoresArray["1-Team1Score"] !== undefined && scoresArray["2-Team1Score"] !== undefined) {
                    pointsToAddA = parseInt(scoresArray["1-Team1Score"]) + parseInt(scoresArray["2-Team1Score"]);
                    pointsToAddH = parseInt(scoresArray["1-Team2Score"]) + parseInt(scoresArray["2-Team2Score"]);
                    if (scoresArray["3-Team1Score"] !== undefined) {
                        pointsA = parseInt(scoresArray["3-Team1Score"]);
                        pointsH = parseInt(scoresArray["3-Team2Score"]);
                        scoreA = pointsToAddA + pointsA;
                        scoreH = pointsToAddH + pointsH;
                    }
                }
                break;
            case '0':
                if (scoresArray["0-Team1Score"] !== undefined) {
                    pointsToAddA = pointsA = scoreA = scoresArray["0-Team1Score"];
                    pointsToAddH = pointsH = scoreH = scoresArray["0-Team1=2Score"];
                } else if (scoresArray["1-Team1Score"] !== undefined && scoresArray["2-Team1Score"] !== undefined && scoresArray["3-Team1Score"] !== undefined) {
                    pointsToAddA = parseInt(scoresArray["1-Team1Score"]) + parseInt(scoresArray["2-Team1Score"]) + parseInt(scoresArray["3-Team1Score"]);
                    pointsToAddH = parseInt(scoresArray["1-Team2Score"]) + parseInt(scoresArray["2-Team2Score"]) + parseInt(scoresArray["3-Team2Score"]);
                    pointsA = pointsToAddA;
                    pointsH = pointsToAddH;
                    scoreA = pointsToAddA;
                    scoreH = pointsToAddH;
                }
                break;
        }
    } else {
        switch (period) {
            case '3':
                if (scoresArray["3-Team1Score"] !== undefined && scoresArray["3-Team2Score"] !== undefined) {
                    pointsA = scoreA = scoresArray["3-Team1Score"];
                    pointsH = scoreH = scoresArray["3-Team2Score"];

                }
                break;
            case '4':
                if (scoresArray["4-Team1Score"] !== undefined && scoresArray["4-Team2Score"] !== undefined) {
                    pointsA = scoresArray["4-Team1Score"];
                    pointsH = scoresArray["4-Team2Score"];
                    scoreA = parseInt(pointsA) + parseInt(scoresArray["3-Team1Score"]);
                    scoreH = parseInt(pointsH) + parseInt(scoresArray["3-Team2Score"]);

                }
                if (scoresArray["3-Team1Score"] !== undefined && scoresArray["3-Team2Score"] !== undefined) {
                    pointsToAddA = scoresArray["3-Team1Score"];
                    pointsToAddH = scoresArray["3-Team2Score"];
                }
                break;
            case '1':
                if (scoresArray["1-Team1Score"] !== undefined && scoresArray["1-Team2Score"] !== undefined) {
                    pointsA = scoreA = pointsToAddA = scoresArray["1-Team1Score"];
                    pointsH = scoreH = pointsToAddH = scoresArray["1-Team2Score"];
                }
                if (scoresArray["3-Team1Score"] !== undefined && scoresArray["4-Team1Score"] !== undefined) {
                    scoreA = pointsA = pointsToAddA = parseInt(scoresArray["3-Team1Score"]) + parseInt(scoresArray["4-Team1Score"]);
                    scoreH = pointsH = pointsToAddH = parseInt(scoresArray["3-Team2Score"]) + parseInt(scoresArray["4-Team2Score"]);
                }
                break;
            case '5':
                if (scoresArray["5-Team1Score"] !== undefined && scoresArray["5-Team2Score"] !== undefined) {
                    pointsA = scoresArray["5-Team1Score"];
                    pointsH = scoresArray["5-Team2Score"];
                    scoreA = parseInt(scoresArray["3-Team1Score"]) + parseInt(scoresArray["4-Team1Score"]) + parseInt(pointsA);
                    scoreH = parseInt(scoresArray["3-Team2Score"]) + parseInt(scoresArray["4-Team2Score"]) + parseInt(pointsH);
                }
                if (scoresArray["1-Team1Score"] !== undefined && scoresArray["1-Team2Score"] !== undefined) {
                    pointsToAddA = scoresArray["1-Team1Score"];
                    pointsToAddH = scoresArray["1-Team2Score"];
                }
                break;
            case '6':
                if (scoresArray["6-Team1Score"] !== undefined && scoresArray["6-Team2Score"] !== undefined) {
                    pointsA = scoresArray["6-Team1Score"];
                    pointsH = scoresArray["6-Team2Score"];
                    scoreA = parseInt(scoresArray["3-Team1Score"]) + parseInt(scoresArray["4-Team1Score"]) + parseInt(scoresArray["5-Team1Score"]) + parseInt(pointsA);
                    scoreH = parseInt(scoresArray["3-Team2Score"]) + parseInt(scoresArray["4-Team2Score"]) + parseInt(scoresArray["5-Team2Score"]) + parseInt(pointsH);
                }
                if (scoresArray["1-Team1Score"] !== undefined && scoresArray["5-Team1Score"] !== undefined) {
                    pointsToAddA = parseInt(scoresArray["1-Team1Score"]) + parseInt(scoresArray["5-Team1Score"]);
                    pointsToAddH = parseInt(scoresArray["1-Team2Score"]) + parseInt(scoresArray["5-Team2Score"]);
                }
                break;
            case '2':
                if (scoresArray["2-Team1Score"] !== undefined && scoresArray["2-Team2Score"] !== undefined) {
                    pointsA = scoresArray["2-Team1Score"];
                    pointsH = scoresArray["2-Team2Score"];
                    scoreA = parseInt(scoresArray["1-Team1Score"]) + parseInt(pointsA);
                    scoreH = parseInt(scoresArray["1-Team2Score"]) + parseInt(pointsH);
                } else if (scoresArray["1-Team1Score"] !== undefined && scoresArray["5-Team1Score"] !== undefined && scoresArray["6-Team1Score"] !== undefined) {
                    scoreA = parseInt(scoresArray["1-Team1Score"]) + parseInt(scoresArray["5-Team1Score"]) + parseInt(scoresArray["6-Team1Score"]);
                    scoreH = parseInt(scoresArray["1-Team2Score"]) + parseInt(scoresArray["5-Team2Score"]) + parseInt(scoresArray["6-Team2Score"]);
                    pointsA = scoreA - pointsToAddA;
                    pointsH = scoreH - pointsToAddH;
                }
                pointsToAddA = scoresArray["1-Team1Score"];
                pointsToAddH = scoresArray["1-Team2Score"];
                break;
            case '0':
                if (scoresArray["0-Team1Score"] !== undefined && scoresArray["0-Team2Score"] !== undefined) {
                    scoreA = pointsA = scoresArray["0-Team1Score"];
                    scoreH = pointsH = scoresArray["0-Team2Score"];
                }
                if (scoresArray["1-Team1Score"] !== undefined && scoresArray["2-Team1Score"] !== undefined) {
                    pointsA = scoreA = pointsToAddA = parseInt(scoresArray["1-Team1Score"]) + parseInt(scoresArray["2-Team1Score"]);
                    pointsH = scoreH = pointsToAddH = parseInt(scoresArray["1-Team2Score"]) + parseInt(scoresArray["2-Team2Score"]);
                }
                break;
        }
    }
    $("#gm_ptsA").val(pointsToAddA);
    $("#gm_ptsH").val(pointsToAddH);
    $("#gm_scoreA").val(scoreA);
    $("#gm_pointsA").text(pointsA);
    $("#gm_scoreH").val(scoreH);
    $("#gm_pointsH").text(pointsH);
}


function openGradePropModal() {
    $("#gradePropModal").modal("toggle");
}


function calculateGamePoints(input, type) {
    if ($("#gm_subSport").text().trim() === "NHL") {
        switch ($("#gm_periodNumber").val()) {
            case '1':
                if (type === 'A')
                    $("#gm_pointsA").text($("#gm_scoreA").val());
                else if (type === "H")
                    $("#gm_pointsH").text($("#gm_scoreH").val());
                break;
            case '2':
                break;
            case '3':
                break;
            case '0':
                break;
        }
    } else {
        switch ($("#gm_periodNumber").val()) {
            case '3':
            case '1':
            case '0':
                if (type === 'A')
                    $("#gm_pointsA").text($("#gm_scoreA").val());
                else if (type === "H")
                    $("#gm_pointsH").text($("#gm_scoreH").val());
                break;
            case '4':
            case '5':
            case '6':
            case '2':
                if (type === 'A') {
                    var points = $("#gm_scoreA").val() - $("#gm_ptsA").val();
                    $("#gm_pointsA").text(points);
                } else if (type === "H") {
                    var points = $("#gm_scoreH").val() - $("#gm_ptsH").val();
                    $("#gm_pointsH").text(points);
                }
                break;
        }
    }
}


function sendGradeGame() {
    var pitcher1;
    var pitcher2;

    var sp = 'P';
    var ml = 'P';
    var tl = 'P';
    if ($("input[name='gm_spreadAction']:checked").val() !== undefined) {
        sp = $("input[name='gm_spreadAction']:checked").val();
    }
    if ($("input[name='gm_moneyAction']:checked").val() !== undefined) {
        ml = $("input[name='gm_moneyAction']:checked").val();
    }
    if ($("input[name='gm_totalAction']:checked").val() !== undefined) {
        tl = $("input[name='gm_totalAction']:checked").val();
    }
    if ($("#gm_subSport").text().trim() === "MLB") {
        pitcher1 = $("#pitcherAgrade").text();
        pitcher2 = $("#pitcherHgrade").text();
    }
    var gameDateTime = $("#gm_gameDateTime").text().split(" ");
    var date = gameDateTime[0].split("/");

    var scoreA = $("#gm_scoreA").val();
    var pointsA = $("#gm_pointsA").text();
    var scoreH = $("#gm_scoreH").val();
    var pointsH = $("#gm_pointsH").text();

    if ($("#cancelGradeGameModal").is(":checked")) {
        scoreA = 0;
        pointsA = 0;
        scoreH = 0;
        pointsH = 0;
    }

    $.ajax({
        url: "grade/gradeindividualgame",
        type: 'POST',
        data: {
            "sp": sp,
            "ml": ml,
            "tl": tl,
            "df": $("#gm_input_dailyFigure").val(),
            "team1": $("#teamAgradeGame").text(),
            "team2": $("#teamHgradeGame").text(),
            "period": $("#gm_periodNumber").val(),
            "periodname": $("#gm_periodDesc").text(),
            "rot": $("#gm_rotNum").val(),
            "gameDate": date[2] + "-" + date[1] + "-" + date[0] + " " + gameDateTime[1],
            "scoreAway": scoreA,
            "pointsAway": pointsA,
            "scoreHome": scoreH,
            "pointsHome": pointsH,
            "subSport": $("#gm_subSport").text(),
            "pitcher1": pitcher1,
            "pitcher2": pitcher2,
            "adjustlinehome": $("#ajustLineA").val(),
            "adjustlineaway": $("#ajustLineH").val(),
            "comments": $("#gradeComments").val()
        }, success: function (data) {
            alert(data);
        }
    });
}

function openLineHistoryModal(wagerType, gameNum) {
    $(".switches button").prop("class", "btn btn-default");
    $("#lh_" + wagerType).prop("class", "btn btn-info");
    setLineHistoryStores();
    setLineHistoryPeriods();
    $("#lh_historyView").prop("checked", true);
    $("#lh_gameNum").val(gameNum);
    $("#lh_wagerType").val(wagerType);
    getLineHistoryData("ALINE", gameNum, wagerType, 0, 2);
    $("#lineHistoryModal").modal("toggle");
}

function reloadLineHistoryParams() {
    var store = $("#lh_storeFilter").val();
    var gameNum = $("#lh_gameNum").val();
    var wagerType = $("#lh_wagerType").val();
    var periodNum = $("#lh_periodsFilter").val();
    var opt;
    if ($("#lh_historyView").is(":checked"))
        opt = 2;
    else
        opt = 1;
    getLineHistoryData(store, gameNum, wagerType, periodNum, opt);
}


function setwagerType(wagerType) {
    $("#lh_wagerType").val(wagerType);
    reloadLineHistoryParams();
}
function getLineHistoryData(store, gameNum, wagerType, periodNum, opt) {
    $.ajax({
        url: "games/getlinehistory",
        type: 'POST',
        data: {
            "store": store,
            "gamenum": gameNum,
            "wagertype": wagerType,
            "periodnum": periodNum,
            "option": opt
        }, success: function (data) {
            var obj = JSON.parse(data);
            var tableHeader = $("#lh_listTableHeader");
            var table = $("#lh_listTable");
            if (opt === 1) {
                $("#lh_listTableHeader tr").remove();
                $("#lh_listTable tr").remove();
                var trHeader = $("<tr></tr>");
                trHeader.append("<td class='posted'>Posted</td>");
                trHeader.append("<td class='custid'>Cust ID</td>");
                trHeader.append("<td class='wagertype'>Wager Type</td>");
                trHeader.append("<td class='volume'>Volume$</td>");
                trHeader.append("<td class='custprof'>Cust Profile</td>");
                trHeader.append("<td class='taken'>Taken By</td>");
                trHeader.append("<td class='agent'>Agent</td>");
                tableHeader.append(trHeader);
                $.each(obj, function (key, val) {
                    var tr = $("<tr></tr>");
                    var postedDateTime = val["PostedDateTime"].split(" ");
                    var postedDate = postedDateTime[1].split(":");
                    tr.append("<td class='posted'>" + postedDateTime[0] + " " + postedDate[0] + ":" + postedDate[1] + "</td>");
                    tr.append("<td class='custid'>" + val["CustomerID"].trim() + "</td>");
                    tr.append("<td class='wagertype'>" + val["WagerType"].trim() + "</td>");
                    tr.append("<td class='volume'>" + parseInt(val["Volume"].trim()) + "</td>");
                    tr.append("<td class='custprof'>" + val["CustProfile"].trim() + "</td>");
                    tr.append("<td class='taken'>" + val["Taken"].trim() + "</td>");
                    tr.append("<td class='agent'>" + val["AgentID"].trim() + "</td>");

                    table.append(tr);
                });
            } else if (opt === 2) {
                $("#lh_listTableHeader tr").remove();
                $("#lh_listTable tr").remove();
                var trHeader = $("<tr></tr>");
                trHeader.append("<td class='date'>Effective AS Of</td>");
                trHeader.append("<td class='link'>LS Group / Link</td>");
                trHeader.append("<td class='newline'>New Line</td>");
                trHeader.append("<td class='cutoff'>Wager CutOff</td>");
                trHeader.append("<td class='changed'>Changed By</td>");
                tableHeader.append(trHeader);
                $.each(obj, function (key, val) {
                    var tr = $("<tr></tr>");

                    var EffectiveASOf = val["EffectiveASOf"].split(" ");
                    var effasoTime = EffectiveASOf[1].split(":");

                    tr.append("<td class='date'>" + EffectiveASOf[0] + " " + effasoTime[0] + ":" + effasoTime[1] + "</td>");
                    tr.append("<td class='link'>" + val["LS Group/Link"] + "</td>");
                    tr.append("<td class='newline'>" + (val["NewLine"] === null ? "* No Line *" : val["NewLine"]) + "</td>");
                    var wagerco;
                    if (val["WagerCutoff"] !== null) {
                        var wagercutoff = val["WagerCutoff"].split(" ");
                        var wagercoTime = wagercutoff[1].split(":");
                        wagerco = wagercoTime[0] + ":" + wagercoTime[1];
                    } else {
                        wagerco = "";
                    }
                    tr.append("<td class='cutoff'>" + wagerco + "</td>");
                    tr.append("<td class='changed'>" + val["ChangedBy"].trim() + "</td>");

                    table.append(tr);
                });
            }

        }
    });
}

function setLineHistoryStores() {
    $.ajax({
        url: "games/getstores",
        success: function (data) {
            $("#lh_storeFilter option").remove();
            var obj = data.split(",");
            $.each(obj, function (key, val) {
                var opt = new Option(val.trim(), val.trim());
                $("#lh_storeFilter").append(opt);
            });
        }
    });
}

function setLineHistoryPeriods() {
    $.ajax({
        url: "games/getperiods",
        data: {
            "sport": selectedSport
        },
        success: function (data) {
            $("#lh_periodsFilter option").remove();
            var obj = JSON.parse(data);
            $.each(obj, function (key, val) {
                var opt = new Option(val["PeriodDescription"].trim(), val["PeriodNumber"].trim());
                $("#lh_periodsFilter").append(opt);
            });
        }
    });
}

function openWagerCovModal(wagerType, inputPress) {
    focusedElement = $(inputPress).find("input:text");
    var gameInfo = focusedElement.parent().parent().attr("id").split("_");
    $("#wc_totalPicks").removeClass("show");
    $("#wc_totalPicks").addClass("hide");
    var gameNum = gameInfo[0];
    var periodnum = $("#lineFilterPeriod").val();
    var store = $("#lineFilterStore").val();
    var wagertype1="S";
    var wagertype2;
    var chosenTeam="";
    var teamA = $("#" + gameNum + "_team_A").find("input").val().split("|");
    var teamH = $("#" + gameNum + "_team_H").find("input").val().split("|");

    teamA = teamA[0];
    teamH = teamH[0];
    switch (wagerType) {
        case "Spread":
            wagertype2 = "S";
            break;
        case "Moneyline":
            wagertype2 = "M";
            break;
        case "Total":
            wagertype2 = "L";
            break;
        case "TT Over":
        case "TT Under":
            wagertype2 = "E";
            if(gameInfo[1]==="A"){
                chosenTeam=teamA;
            }else{
                chosenTeam=teamH;
            }
            break;
    }
    var processType;
    if (wagertype2 === "s") {
        processType = 's';
    } else if (wagertype2 === "L") {
        processType = 't';
    }

    var request = getEliminateRifFilter();

    var teamA = $("#" + gameNum + "_team_A").find("input").val().split("|");
    var teamH = $("#" + gameNum + "_team_H").find("input").val().split("|");

    teamA = teamA[0];
    teamH = teamH[0];
    var rotA = $("#" + gameNum + "_A td").eq(1).find("input").val();
    var rotH = $("#" + gameNum + "_H td").eq(1).find("input").val();

    var date = $("#" + gameNum + "_A td").eq(0).find("input").val();
    var time = $("#" + gameNum + "_H td").eq(0).find("input").val();
    $("#wc_store").text(store);
    $("#wc_period").text($("#lineFilterPeriod").find("option[value='" + periodnum + "']").text());
    $("#wc_wagerType").text(wagerType);
    $("#wc_team1").text(teamA);
    $("#wc_team2").text(teamH);
    $("#wc_rot1").text(rotA);
    $("#wc_rot2").text(rotH);
    $("#wc_actionFilter").text();
    $("#wc_gameDateTime").text(date + " " + time);
    $("#wc_straight").prop("checked", true);
    $("#wc_gameNum").val(gameNum);
    $("#wc_wagerType1").val(wagertype2);

    getWagerCoverageByThreshold(gameNum, periodnum, store, wagertype1, wagertype2, chosenTeam,teamA,teamH);

    getWagerCoverageDetail(gameNum, periodnum, store, wagertype1, wagertype2, chosenTeam);
    $("#wagerCoverageModal").modal("toggle");
}

function getWagerCoverageDetail(gameNum, periodnum, store, wagertype1, wagertype2, chosenTeam) {
    $.ajax({
        url: "games/getWagerCoverageDetail",
        type: 'POST',
        data: {
            "GameNum": gameNum,
            "periodNumber": periodnum,
            "store": store,
            "WagerType": wagertype1,
            "DetailWager": wagertype2,
            "Team": chosenTeam
        }, success: function (data) {
            var obj = JSON.parse(data);
            var table = $('#wc_listTable2').DataTable();
            table.clear().draw();
            var wagerCount = 0;
            $.each(obj, function (key, val) {
                wagerCount++;
                var tr = $("<tr></tr>");
                var postedArray = val["PostedDateTime"].split(" ");
                var postedTime = postedArray[1].split(":");
                var line;
                switch (wagertype2) {
                    case "S":
                        line = (processUpdaterData(val["Line"], "'s'")) + " " + processData(val["Price"]);
                        break;
                    case "M":
                        line = processData(val["Line"]);
                        break;
                    case "L":
                    case "E":
                        line = processUpdaterData(val["Line"], "t") + " " + processData(val["Price"]);

                        break;
                }
                table.row.add([
                    postedArray[0] + " " + postedTime[0] + ":" + postedTime[1],
                    val["CustomerID"].trim(),
                    "<a href='#' onclick='return openWagerDetailsModal(" + val["TicketNumber"] + "," + val["WagerNumber"] + ")'>" + val["ChosenTeamID"].trim() + "</a>",
                    line,
                    parseInt(val["VolumeAmt"]),
                    val["AgentID"]
                ]).draw();
            });
        }
    });
}

function getWagerCoverageByThreshold(gameNum, periodnum, store, wagertype1, wagertype2, chosenTeam, teamA, teamH) {
    $.ajax({
        url: "games/getWagerCoverageByThreshold",
        type: 'POST',
        data: {
            "GameNum": gameNum,
            "periodNumber": periodnum,
            "store": store,
            "WagerType": wagertype1,
            "DetailWager": wagertype2,
            "Team": chosenTeam
        }, success: function (data) {
            var obj = JSON.parse(data);
            var table = $("#wc_listTable1");
            $("#wc_listTable1 tbody tr").remove();
            var wagerCount = 1;
            var team1 = $("#" + gameNum + "_team_A").find("input").val().split("|");
            var team2 = $("#" + gameNum + "_team_H").find("input").val().split("|");

            team1 = team1[0].trim().replace(/ /gi, "_");
            team2 = team2[0].trim().replace(/ /gi, "_");
            var team1Acum = 0;
            var team2Acum = 0;
            if (wagertype2 !== "E" && wagertype2 !== "L") {
                $("#wc_tableTeam1").text(teamA);
                $("#wc_tableTeam2").text(teamH);
                $("#wc_tableline1").text("Line");
                $("#wc_tableline2").text("Line");
                $.each(obj, function (key, val) {
                    wagerCount++;
                    var tr = $("<tr></tr>");
                    team1Acum += parseInt(val["Risk1"]);
                    team2Acum += parseInt(val["Risk2"]);
                    var teamLine1;
                    var teamLine2;
                    if (wagertype2 === "S") {
                        teamLine1 = processUpdaterData(val["Line1"], 's');
                        teamLine2 = processUpdaterData(val["Line2"], 's');
                    } else {
                        teamLine1 = processData(val["Line1"]);
                        teamLine2 = processData(val["Line2"]);
                    }
                    tr.append("<td class='teamTD'>" + parseFloat(val["Risk1"]) + "</td>");
                    tr.append("<td class='lineTD'>" + teamLine1 + "</td>");
                    tr.append("<td class='teamTD'>" + parseFloat(val["Risk2"]) + "</td>");
                    tr.append("<td class='lineTD'>" + teamLine2 + "</td>");
                    table.append(tr);
                });
            } else if (wagertype2 === "L"||wagertype2 === "E") {
                $("#wc_tableTeam1").text("Points");
                $("#wc_tableTeam2").text("Over");
                $("#wc_tableline1").text("Under");
                $("#wc_tableline2").text("");

                $.each(obj, function (key, val) {
                    wagerCount++;
                    var tr = $("<tr></tr>");
                    team1Acum += parseInt(val["Over"]);
                    team2Acum += parseInt(val["Under"]);
                    tr.append("<td class='teamTD'>" + processUpdaterData(val["Points"], 't') + "</td>");
                    tr.append("<td class='lineTD'>" + parseInt(val["Over"]) + "</td>");
                    tr.append("<td class='teamTD'>" + parseInt(val["Under"]) + "</td>");
                    tr.append("<td class='lineTD'></td>");
                    table.append(tr);
                });
            }

            $("#wc_total1").val(team1Acum);
            $("#wc_total2").val(team2Acum);
        }
    });
}

function changeWagerTypeFilters() {
    var wagertype1 = $("input[name='wc_wagerTypeFilter']:checked").val();
    if (wagertype1 === "P" || wagertype1 === "T") {
        $("#wc_totalPicks").removeClass("hide");
        $("#wc_totalPicks").addClass("show");
    } else {
        $("#wc_totalPicks").removeClass("show");
        $("#wc_totalPicks").addClass("hide");
    }

    var gameNum = $("#wc_gameNum").val();
    var teamA = $("#" + gameNum + "_team_A").find("input").val();
    var teamH = $("#" + gameNum + "_team_H").find("input").val();
    var periodnum = $("#lineFilterPeriod").val();
    var store = $("#lineFilterStore").val();
    var wagertype2 = $("#wc_wagerType1").val();
//    var totalpicks = $("#wc_totalPicks").val();
//    var request = getEliminateRifFilter();
    getWagerCoverageByThreshold(gameNum, periodnum, store, wagertype1, wagertype2, '');
    getWagerCoverageDetail(gameNum, periodnum, store, wagertype1, wagertype2, '', teamA, teamH);
}

function getEliminateRifFilter() {
    if ($("#wc_eliminateCancel").is(":checked") && $("#wc_includeRIF").is(":checked")) {
        return 1;
    } else if ($("#wc_eliminateCancel").is(":checked")) {
        return 2;
    } else if ($("#wc_includeRIF").is(":checked")) {
        return 3;
    } else {
        return 0;
    }
}


function openWagerDetailsModal(ticket, wager) {
    $.ajax({
        url: "games/getwagerdetail",
        type: 'POST',
        data: {
            "ticket": ticket,
            "wager": wager
        }, success: function (data) {
            var obj = JSON.parse(data);

            var postedArray = obj["row1"]["PostedDateTime"].split(" ");
            var postedTime = postedArray[1].split(":");

            $("#wd_postedDateTime").val(postedArray[0] + " " + postedTime[0] + ":" + postedTime[1]);
            $("#wd_ticketNum").val(obj["row1"]["TicketNumber"]);
            $("#wd_agentID").val(obj["row1"]["AgentID"]);
            $("#wd_writtenBy").val(obj["row1"]["TicketWriter"]);
            $("#wd_totalTicket").val(obj["row1"]["Total_Ticket"]);
            $("#wd_acct").val(obj["row1"]["Acct"]);
            $("#wd_type").val(obj["row1"]["BetType"]);
            $("#wd_docNum").val(obj["row1"]["DocumentNumber"]);
            $("#wd_ties").val(obj["row1"]["Ties"]);
            $("#wd_risk").val(obj["row1"]["Risk"]);
            $("#wd_toWin").val(obj["row1"]["ToWin"]);
            $("#wd_ratio").val(obj["row1"][""]);
            $("#wd_paid").val(obj["row1"]["Paid"]);
            $("#wd_status").val(obj["row1"]["Status"]);
            $("#wd_lost").val(obj["row1"]["Lost"]);
            $("#wd_won").val(obj["row1"]["Won"]);

            var table = $("#wd_listTable");
            $("#wd_listTable tr").remove();
            $.each(obj, function (key, val) {
                var gameDate = val["GameDateTime"].split(" ");
                var gameTime = gameDate[1].split(":");
                var tr = $("<tr></tr>");

                tr.append("<td class='outcomeTd'>" + val["Outcome"] + "</td>");
                tr.append("<td class='gameDateTd'>" + gameDate[0] + " " + gameTime[0] + ":" + gameTime[1] + "</td>");
                tr.append("<td class='wagerTd'>" + val["Description"] + "</td>");
                table.append(tr);
            });
        }
    });
    $("#wagerDetailsModal").modal("toggle");
    return false;
}


function getShadesByStore(wagerType) {
    var list;
    var shadeList;
    switch (wagerType) {
        case 'SP':
            list = $("#sp_shadesAll");
            shadeList = $("#sp_shadesList").val().split(",");
            break;
        case 'ML':
            list = $("#ml_shadesAll");
            shadeList = $("#ml_shadesList").val().split(",");
            break;
        case 'TL':
            list = $("#tl_shadesAll");
            shadeList = $("#tl_shadesList").val().split(",");
            break;
        case 'TT':
            list = $("#tt_shadesAll");
            shadeList = $("#tt_shadesList").val().split(",");
            break;
    }
    $.ajax({
        url: "games/getShadesByStore",
        type: 'POST',
        data: {
            "store": $("#lineFilterStore").val().trim()
        },
        success: function (data) {
            var obj = JSON.parse(data);
            list.find("option").remove();
            $.each(obj, function (key, val) {
                if (shadeList.indexOf(val["CustProfile"].trim()) === -1) {
                    var opt = new Option(val["CustProfile"].trim(), val["CustProfile"].trim());
                    list.append(opt);
                }
            });
        }
    });
}

function setShadesList(shades, wagerType) {
    var list;
    var shadeList = shades.split(",");
    switch (wagerType) {
        case 'SP':
            list = $("#sp_shades");
            break;
        case 'ML':
            list = $("#ml_shades");
            break;
        case 'TL':
            list = $("#tl_shades");
            break;
        case 'TT':
            list = $("#tt_shades");
            break;
    }
    list.find("option").remove();
    $.each(shadeList, function (key, val) {
        var opt = new Option(val.trim(), val.trim());
        list.append(opt);
    });
}

function getLineInfoByCustProfile(gameNum, custProfile, wagerType) {
    custProfile = custProfile.replace("master", "");
    $.ajax({
        url: "games/getInfolinebyCustProfile",
        type: 'POST',
        data: {
            "gamenum": gameNum,
            "store": $("#lineFilterStore").val(),
            "periodo": $("#lineFilterPeriod").val(),
            "cusprofile": custProfile
        }, success: function (data) {
            var obj = JSON.parse(data);

            switch (wagerType) {
                case "SP":
                    var sp_points = obj["row1"]["Spread"] === null ? "" : processModalData(obj["row1"]["Spread"], 's');
                    if (obj["row1"]["FavoredTeamID"] === $("#team1").val().trim()) {
                        $("#spreadt1").val(sp_points);
                    } else if (obj["row1"]["FavoredTeamID"] === $("#team2").val().trim()) {
                        $("#spreadt2").val(sp_points);
                    } else if (obj["row1"]["FavoredTeamID"] === null) {
                        $("#spreadt1").val("");
                        $("#spreadt2").val("");
                    }

                    var sp_price1 = obj["row1"]["SpreadAdj1"] === null || obj["row1"]["SpreadAdj1"] === "0" ? "-110" : processModalData(obj["row1"]["SpreadAdj1"]);
                    var sp_price2 = obj["row1"]["SpreadAdj2"] === null || obj["row1"]["SpreadAdj2"] === "0" ? "-110" : processModalData(obj["row1"]["SpreadAdj2"]);
                    $("#pricesp1").val(sp_price1);
                    $("#pricesp2").val(sp_price2);

                    if ($("#sp_shades").val().trim().replace("master", "") === ".") {
                        if (obj["row1"]["LinkedToStoreFlag"] === "Y") {
                            $("#linkToMastersp").prop("checked", true);
                            $("#linkToMastersp").val("Link to Master Store");
                            $("#linkToMastersp").siblings('label').html('Link to Master Store');
                        } else {
                            $("#linkToMastersp").prop("checked", false);
                            $("#linkToMastersp").val("Link to Master Store");
                            $("#linkToMastersp").siblings('label').html('Link to Master Store');
                        }
                    } else {
                        if (obj["row1"]["LinkedToStoreFlag"] === "Y") {
                            $("#linkToMastersp").prop("checked", true);
                            $("#linkToMastersp").siblings('label').html('Link to Store');
                        } else {
                            $("#linkToMastersp").prop("checked", false);

                            $("#linkToMastersp").siblings('label').html('Link to Store');
                        }
                    }
                    break;
                case "ML":

                    var ml_price1 = obj["row1"]["MoneyLine1"] === null ? "" : (obj["row1"]["MoneyLine1"]);
                    var ml_price2 = obj["row1"]["MoneyLine2"] === null ? "" : (obj["row1"]["MoneyLine2"]);
                    var ml_price3 = obj["row1"]["MoneyLineDraw"] === null ? "" : (obj["row1"]["MoneyLineDraw"]);
                    $("#mlPricet1").val(processModalData(ml_price1));
                    $("#mlPricet2").val(processModalData(ml_price2));
                    $("#mlPricet3").val(processModalData(ml_price3));
                    if ($("#ml_shades").val().trim().replace("master", "") === ".") {
                        if (obj["row1"]["LinkedToStoreFlag"] === "Y") {
                            $("#linkToMasterml").prop("checked", true);
                            $("#linkToMasterml").val("Link to Master Store");
                            $("#linkToMasterml").siblings('label').html('Link to Master Store');
                        } else {
                            $("#linkToMasterml").prop("checked", false);
                            $("#linkToMasterml").val("Link to Master Store");
                            $("#linkToMasterml").siblings('label').html('Link to Master Store');
                        }
                    } else {
                        if (obj["row1"]["LinkedToStoreFlag"] === "Y") {
                            $("#linkToMasterml").prop("checked", true);
                            $("#linkToMasterml").siblings('label').html('Link to Store');
                        } else {
                            $("#linkToMasterml").prop("checked", false);

                            $("#linkToMasterml").siblings('label').html('Link to Store');
                        }
                    }
                    break;
                case "TL":
                    var tl_price1 = obj["row1"]["TtlPtsAdj1"] === null ? "" : processModalData(obj["row1"]["TtlPtsAdj1"]);
                    var tl_price2 = obj["row1"]["TtlPtsAdj2"] === null ? "" : processModalData(obj["row1"]["TtlPtsAdj2"]);
                    var tl_tlPoints = obj["row1"]["TotalPoints"] === null ? "" : processModalData(obj["row1"]["TotalPoints"], 't');
                    $("#tPricet1").val(tl_price1);
                    $("#tPricet2").val(tl_price2);
                    $("#tPoints1").val(tl_tlPoints);
                    if ($("#tl_shades").val().trim().replace("master", "") === ".") {
                        if (obj["row1"]["LinkedToStoreFlag"] === "Y") {
                            $("#linkToMastert").prop("checked", true);
                            $("#linkToMastert").val("Link to Master Store");
                            $("#linkToMastert").siblings('label').html('Link to Master Store');
                        } else {
                            $("#linkToMasterml").prop("checked", false);
                            $("#linkToMasterml").val("Link to Master Store");
                            $("#linkToMasterml").siblings('label').html('Link to Master Store');
                        }
                    } else {
                        if (obj["row1"]["LinkedToStoreFlag"] === "Y") {
                            $("#linkToMastert").prop("checked", true);
                            $("#linkToMastert").siblings('label').html('Link to Store');
                        } else {
                            $("#linkToMastert").prop("checked", false);

                            $("#linkToMastert").siblings('label').html('Link to Store');
                        }
                    }
                case "TT":
                    if ($("#position").val() === "1") {
                        var tt1_price1 = obj["row1"]["Team1TtlPtsAdj1"] === null ? "" : processModalData(obj["row1"]["Team1TtlPtsAdj1"]);
                        var tt1_price2 = obj["row1"]["Team1TtlPtsAdj2"] === null ? "" : processModalData(obj["row1"]["Team1TtlPtsAdj2"]);
                        var tt1_tlPoints = obj["row1"]["Team1TotalPoints"] === null ? "" : processModalData(obj["row1"]["Team1TotalPoints"], 't');
                        $("#pointstt1").val(tt1_tlPoints);
                        $("#pricett1").val(tt1_price1);
                        $("#pricett2").val(tt1_price2);
                    } else {
                        var tt2_price1 = obj["row1"]["Team2TtlPtsAdj1"] === null ? "" : processModalData(obj["row1"]["Team2TtlPtsAdj1"]);
                        var tt2_price2 = obj["row1"]["Team2TtlPtsAdj2"] === null ? "" : processModalData(obj["row1"]["Team2TtlPtsAdj2"]);
                        var tt2_tlPoints = obj["row1"]["Team2TotalPoints"] === null ? "" : processModalData(obj["row1"]["Team2TotalPoints"], 't');
                        $("#pointstt1").val(tt2_tlPoints);
                        $("#pricett1").val(tt2_price1);
                        $("#pricett2").val(tt2_price2);
                    }
                    if ($("#tt_shades").val().trim().replace("master", "") === ".") {
                        if (obj["row1"]["LinkedToStoreFlag"] === "Y") {
                            $("#linkToMastertt").prop("checked", true);
                            $("#linkToMastertt").val("Link to Master Store");
                            $("#linkToMastertt").siblings('label').html('Link to Master Store');
                        } else {
                            $("#linkToMastertt").prop("checked", false);
                            $("#linkToMastertt").val("Link to Master Store");
                            $("#linkToMastertt").siblings('label').html('Link to Master Store');
                        }
                    } else {
                        if (obj["row1"]["LinkedToStoreFlag"] === "Y") {
                            $("#linkToMastertt").prop("checked", true);
                            $("#linkToMastertt").siblings('label').html('Link to Store');
                        } else {
                            $("#linkToMastertt").prop("checked", false);

                            $("#linkToMastertt").siblings('label').html('Link to Store');
                        }
                    }
                    break;
            }
        }
    });
}


function clearModalPrices(wagerType) {
    switch (wagerType) {
        case "S":
            $("#pricesp1").val("");
            $("#pricesp2").val("");
            $("#americanPricesp1").val("");
            $("#americanPricesp2").val("");
            break;
        case "M":
            $("#mlPricet1").val("");
            $("#mlPricet2").val("");
            $("#americanPriceml1").val("");
            $("#americanPriceml2").val("");
            break;
        case "T":
            $("#tPricet1").val("");
            $("#tPricet2").val("");
            $("#americanPricet1").val("");
            $("#americanPricet1").val("");
            break;
        case "TT":
            $("#pricett1").val("");
            $("#pricett2").val("");
            $("#americanPricett1").val("");
            $("#americanPricett2").val("");
            break;
    }

}
function removeShadeFromGame(GameNum, cusProfile, store) {
    $.ajax({
        url: "games/deleteShadeFromGame",
        type: 'POST',
        data: {
            "gamenum": GameNum,
            "cusprofile": cusProfile,
            "store": store
        }, success: function (data, textStatus, jqXHR) {

        }
    });
}



function openGamePausesModal(gameNum){
    var rot1=$("#"+gameNum+"_rotNum_A").find("input").val();
    var rot2=$("#"+gameNum+"_rotNum_H").find("input").val();
    var team1=$("#"+gameNum+"_team_A").find("input").val();
    var team2=$("#"+gameNum+"_team_H").find("input").val();
    var gameDate=$("#"+gameNum+"_gameDate").find("input").val();
    var gameTime=$("#"+gameNum+"_gameTime").find("input").val();
    $("#pauseRot1").text(rot1);
    $("#pauseTeam1").text(team1);
    $("#pauseRot2").text(rot2);
    $("#pauseTeam2").text(team2);
    $("#pauseGameDate").text(gameDate+" "+gameTime);
    
    var table=$("#pauseTable");
    $("#pauseTable tr").remove();
    $.each($("#lineFilterPeriod option"),function (){
        var opt=$(this);
        var tr=$("<tr></tr>");
        var td0=$("<td class='ps_periodTd'>"+opt.text()+"</td>");
        var td1=$("<td class='ps_spTd'></td>");
        var bpsp1=$('<button id="play_'+opt.val()+'_S" style="display:none" type="button" class="btn btn-success spplay" onclick="pauseLine('+rot1+','+opt.val()+',&#39;S&#39;,0)"><i class="glyphicon glyphicon-play"></i></button>');
        var bpsp2=$('<button id="pause_'+opt.val()+'_S" type="button" class="btn btn-danger sppause"  onclick="pauseLine('+rot1+','+opt.val()+',&#39;S&#39;,1)"><i class="glyphicon glyphicon-pause"></i></button>');
        td1.append(bpsp1);
        td1.append(bpsp2);

        var td2=$("<td class='ps_mlTd'></td>");
        var bpml1=$('<button id="play_'+opt.val()+'_M" style="display:none" type="button" class="btn btn-success mlplay" onclick="pauseLine('+rot1+','+opt.val()+',&#39;M&#39;,0)"><i class="glyphicon glyphicon-play"></i></button>');
        var bpml2=$('<button id="pause_'+opt.val()+'_M" type="button" class="btn btn-danger mlpause" onclick="pauseLine('+rot1+','+opt.val()+',&#39;M&#39;,1)"><i class="glyphicon glyphicon-pause"></i></button>');
        td2.append(bpml1);
        td2.append(bpml2);

        var td3=$("<td class='ps_tlTd'></td>");
        var bptl1=$('<button id="play_'+opt.val()+'_T" style="display:none" type="button" class="btn btn-success tlplay" onclick="pauseLine('+rot1+','+opt.val()+',&#39;T&#39;,0)"><i class="glyphicon glyphicon-play"></i></button>');
        var bptl2=$('<button id="pause_'+opt.val()+'_T" type="button" class="btn btn-danger tlpause" onclick="pauseLine('+rot1+','+opt.val()+',&#39;T&#39;,1)"><i class="glyphicon glyphicon-pause"></i></button>');
        td3.append(bptl1);
        td3.append(bptl2);

        var td4=$("<td class='ps_ttTd'></td>");
        var bptt1=$('<button id="play_'+opt.val()+'_L" style="display:none" type="button" class="btn btn-success ttplay" onclick="pauseLine('+rot1+','+opt.val()+',&#39;L&#39;,0)"><i class="glyphicon glyphicon-play"></i></button>');
        var bptt2=$('<button id="pause_'+opt.val()+'_L" type="button" class="btn btn-danger ttpause" onclick="pauseLine('+rot1+','+opt.val()+',&#39;L&#39;,1)"><i class="glyphicon glyphicon-pause"></i></button>');
        td4.append(bptt1);
        td4.append(bptt2);


        tr.append(td0);
        tr.append(td1);
        tr.append(td2);
        tr.append(td3);
        tr.append(td4);
        table.append(tr);
    });
    
    $.ajax({
        url: "games/loadPauses",
        type: 'POST',
        async: false,
        data: {
            "rotNum":rot1,
            "sport":null,
            "subSport":null
        },success: function (data) {
            var obj=JSON.parse(data);
            $.each(obj["results"],function (key,val){
                if(val["Period"]===null){
                    var classToShow="";
                    var classToHide="";
                    switch (val["LineType"]){
                        case 'S':
                            classToShow=".spplay";
                            classToHide=".sppause";
                            break;
                        case 'M':
                            classToShow=".mlplay";
                            classToHide=".mlpause";
                            break;
                        case 'T':
                            classToShow=".tlplay";
                            classToHide=".tlpause";
                            break;
                        case 'L':
                            classToShow=".ttplay";
                            classToHide=".ttpause";
                            break;
                    }
                    $.each($("#pauseTable tr"),function (){
                        $(this).find(classToShow).show();
                        $(this).find(classToHide).hide();
                    });
                }else{
                    $("#play_"+val["Period"]+"_"+val["LineType"]).show();
                    $("#pause_"+val["Period"]+"_"+val["LineType"]).hide();
                }
            });
        }
    });
    
    $("#gamePauseModal").modal("toggle");
}



function pauseLine(rot,period,type, option){
    if(option===1){
        $("#play_"+period+"_"+type).show();
        $("#pause_"+period+"_"+type).hide();
    }else{
        $("#play_"+period+"_"+type).hide();
        $("#pause_"+period+"_"+type).show();
    }
    $.ajax({
        url:"games/pauseLine",
        type: 'POST',
        data:{
            "rotNum":rot,
            "period":period,
            "lineType":type,
            "option":option
        },success: function (data) {
            
        }
    });
}


function pauseGame(option){
    var rot=$("#pauseRot1").text();
    $.ajax({
        url: "games/pauseGame",
        type: 'POST',
        data: {
            "rotNum":rot,
            "option":option
        },success: function (data) {
            if(option===1){
                hideAllPauseButtons();
            }else
                hideAllPlayButtons();
        }
    });
}


function hideAllPlayButtons(){
    $.each($("#pauseTable button"),function(){
        if($(this).attr("class").includes("play")){
            $(this).hide();
        }else{
            $(this).show();
        }
    })
}


function hideAllPauseButtons(){
    $.each($("#pauseTable button"),function(){
        if($(this).attr("class").includes("play")){
            $(this).show();
        }else{
            $(this).hide();
        }
    });
}


function openPauseModal(){
    $.ajax({
        url: "games/loadAllPauses",
        dataType: 'JSON',
        success: function (data){
            var table = $("#psm_table");
            $("#psm_table option").remove();
            $.each(data,function (key,val){
                var tr=$("<tr></tr>");
                
                var td1=$("<td>"+(val["SportType"]===null?"-":val["SportType"])+"</td>");
                tr.append(td1);
                var td2=$("<td>"+(val["SportSubType"]===null?"-":val["SportSubType"])+"</td>");
                tr.append(td2);
                var td3=$("<td>"+(val["RotNum"]===null?"-":val["RotNum"])+"</td>");
                tr.append(td3);
                var td4=$("<td>"+convertToPeriodDesc(val["Period"])+"</td>");
                tr.append(td4);
                var td5=$("<td>"+convertBetType(val["LineType"])+"</td>");
                tr.append(td5);
                table.append(tr);
            });
        }
    });
    $("#pauseModal").modal("toggle");
}


function convertToPeriodDesc(period){
    switch (period){
        case "0":
            return "Game";
        case "1":
            return "1st Half";
        case "2":
            return "2nd Half";
        case "3":
            return "1st Quarter";
        case "4":
            return "2st Quarter";
        case "5":
            return "3st Quarter";
        case "6":
            return "4st Quarter";
        
    }
}

function convertBetType(type){
    switch (type){
        case "S":
            return "Spread";
        case "M":
            return "Money Line";
        case "T":
            return "Total";
        case "L":
            return "Team Total";
    }
}