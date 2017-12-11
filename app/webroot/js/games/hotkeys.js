var specialChar=[40,41,42,43,45,46,61,63,64,33,34,35,36,37,38,39,91,92,93,94,123,124,125];
var specialCharPrice=[40,41,42,43,46,61,63,64,33,34,35,36,37,38,39,91,92,93,94,123,124,125];
var lockComebackSP=false;
var lockComebackML=false;
var lockComebackTL=false;
var lockComebackTT=false;
$(document).ready(function () {
/***********************************************HOT KEYS*************************************************************************/
    jQuery(document).bind('keydown', 'Meta+o', callGameEdition);//open game to edit
    jQuery(document).bind('keydown', 'Ctrl+o', callGameEdition);

    jQuery(document).bind('keydown', 'Meta+l', callLineHistoryRep);//open line history
    jQuery(document).bind('keydown', 'Ctrl+l', callLineHistoryRep);

    jQuery(document).bind('keydown', 'Meta+u', algoMas);//open maintenance
    jQuery(document).bind('keydown', 'Ctrl+u', algoMas);

    jQuery(document).bind('keydown', 'Meta+r', algoMas);//open reports
    jQuery(document).bind('keydown', 'Ctrl+r', algoMas);

    jQuery(document).bind('keydown', 'Meta+g', callGameCreation);//new game
    jQuery(document).bind('keydown', 'Ctrl+g', callGameCreation);

    jQuery(document).bind('keydown', 'Meta+c', callPropCreation);//new contest
    jQuery(document).bind('keydown', 'Ctrl+c', callPropCreation);
    
    jQuery(document).bind('keydown', 'h', callopenHockey);//total

    jQuery(document).bind('keydown', 'k', callOpenBasketball);//total

    jQuery(document).bind('keydown', 'f', callOpenFootball);//total

    jQuery(document).bind('keydown', 'b', callOpenBaseball);//total

    jQuery(document).bind('keydown', 'i', callOpenSoccer);//total

    jQuery(document).bind('keydown', 'o', callOpenOtherSports);//total

    jQuery(document).bind('keydown', 'r', searchFocus);//total
    
    document.onkeydown=checkKeys
    function checkKeys(e) {
        switch (e.keyCode) {
            case 112:
            case 113:
            case 114:
            case 115:
            case 116:
            case 117:
            case 118:
            case 119:
            case 120:
            case 121:
            case 122:
            case 123:
                e.keyCode=0;
                return false;
                break;
            default:
                break;
        }
    }

    jQuery(document).bind('keydown', 'F11', algoMas);

    jQuery(document).bind('keydown', 'F5', selectStoreDown);//Stores
    jQuery(document).bind('keydown', 'F6', selectStoreUp);

    jQuery(document).bind('keydown', 'F7', selectPeriodDown);//periods
    jQuery(document).bind('keydown', 'F8', selectPeriodUp);

    jQuery(document).bind('keydown', 'F9', changeDisplayStatus);//active

    jQuery(document).bind('keydown', 'F4', changeDisplayPriceType);//price type

    jQuery(document).bind('keydown', 'F2', algoMas);//shaded

    jQuery(document).bind('keydown', 'return', saveCurrentModal);

    jQuery(document).bind('keydown', 's', callOpenSpread);//spreads
    $("#spreadModalFrm input").bind('keydown', 'm', callOpenMoneyLine);
    $("#spreadModalFrm input").bind('keydown', 't', callOpenTotal);
    
    $("#spreadModalFrm input").bind('keydown', 'F5', selectStoreDown);
    $("#spreadModalFrm input").bind('keydown', 'F6', selectStoreUp);
    $("#spreadModalFrm input").bind('keydown', 'F7', selectPeriodDown);
    $("#spreadModalFrm input").bind('keydown', 'F8', selectPeriodUp);

    $("#pricesp1").bind('keydown', 'return', saveCurrentModal);
    $("#pricesp2").bind('keydown', 'return', saveCurrentModal);
    $("#spreadt1").bind('keydown', 'return', saveCurrentModal);
    $("#spreadt2").bind('keydown', 'return', saveCurrentModal);
    $("#offlinesp").bind('keydown', 'return', saveCurrentModal);
    $("#spreadt1").keypress(function (key) {
        if ((key.charCode > 64 && key.charCode > 91) || (key.charCode > 96 && key.charCode > 123)||
                specialChar.indexOf(key.charCode)!==-1)
            key.preventDefault();
    });
    $("#spreadt2").keypress(function (key) {
        if ((key.charCode > 64 && key.charCode > 91) || (key.charCode > 96 && key.charCode > 123)||
                specialChar.indexOf(key.charCode)!==-1)
            key.preventDefault();
    });
    $("#pricesp1").keypress(function (key) {
        if ((key.charCode > 64 && key.charCode > 91) || (key.charCode > 96 && key.charCode > 123)||
                specialCharPrice.indexOf(key.charCode)!==-1)
            key.preventDefault();
    });
    $("#pricesp1").keypress(function (key) {
        if ((key.charCode > 64 && key.charCode > 91) || (key.charCode > 96 && key.charCode > 123)||
                specialCharPrice.indexOf(key.charCode)!==-1)
            key.preventDefault();
    });
//    ***********************COMEBACK Spread************************
    $("#pricesp1").keyup(function (key) {
        if(!lockComebackSP)
            linesKeyUpLauncher($("#pricesp1").val(), "S", 1);
    });

    $("#pricesp2").keyup(function (key) {
        if(!lockComebackSP)
            linesKeyUpLauncher($("#pricesp2").val(), "S", 2);
    });
//    ***********************COMEBACK Spread************************
    jQuery(document).bind('keydown', 'm', callOpenMoneyLine);// money Lines
    $("#moneyLineModal input").bind('keydown', 's', callOpenSpread);
    $("#moneyLineModal input").bind('keydown', 't', callOpenTotal);
    
    $("#moneyLineModal input").bind('keydown', 'F5', selectStoreDown);
    $("#moneyLineModal input").bind('keydown', 'F6', selectStoreUp);
    $("#moneyLineModal input").bind('keydown', 'F7', selectPeriodDown);
    $("#moneyLineModal input").bind('keydown', 'F8', selectPeriodUp);

    $("#mlPricet1").bind('keydown', 'return', saveCurrentModal);
    $("#mlPricet2").bind('keydown', 'return', saveCurrentModal);
    $("#mlPricet3").bind('keydown', 'return', saveCurrentModal);
    $("#offlineml").bind('keydown', 'return', saveCurrentModal);
    $("#moneyLineModal input").keypress(function (key) {
        if ((key.charCode > 64 && key.charCode > 91) || (key.charCode > 96 && key.charCode > 123)||
                specialCharPrice.indexOf(key.charCode)!==-1)
            key.preventDefault();
    });

    //    ***********************COMEBACK Money Line************************
    $("#mlPricet1").keyup(function (key) {
        if(!$("#mlPricet3").prop("disabled")){
            
        }else{
            if(!lockComebackML)
                linesKeyUpLauncher($("#mlPricet1").val(), "M", 1);  
        }
    });

    $("#mlPricet2").keyup(function (key) {
        if(!$("#mlPricet3").prop("disabled")){
            
        }else{
            if(!lockComebackML)
                linesKeyUpLauncher($("#mlPricet2").val(), "M", 2);
        }
    });
    //    ***********************COMEBACK Money Line************************
    

    jQuery(document).bind('keydown', 't', callOpenTotal);//total
    $("#totalModal input").bind('keydown', 's', callOpenSpread);//total
    $("#totalModal input").bind('keydown', 'm', callOpenMoneyLine);
    
    $("#totalModal input").bind('keydown', 'F5', selectStoreDown);
    $("#totalModal input").bind('keydown', 'F6', selectStoreUp);
    $("#totalModal input").bind('keydown', 'F7', selectPeriodDown);
    $("#totalModal input").bind('keydown', 'F8', selectPeriodUp);

    $("#tPoints1").bind('keydown', 'return', saveCurrentModal);
    $("#tPricet1").bind('keydown', 'return', saveCurrentModal);
    $("#tPricet2").bind('keydown', 'return', saveCurrentModal);
    $("#offlinet").bind('keydown', 'return', saveCurrentModal);
    $("#tPoints1").keypress(function (key) {
        if ((key.charCode > 64 && key.charCode > 91) || (key.charCode > 96 && key.charCode > 123)||
                specialChar.indexOf(key.charCode)!==-1)
            key.preventDefault();
    });
    $("#tPricet1").keypress(function (key) {
        if ((key.charCode > 64 && key.charCode > 91) || (key.charCode > 96 && key.charCode > 123)||
                specialCharPrice.indexOf(key.charCode)!==-1)
            key.preventDefault();
    });
    $("#tPricet2").keypress(function (key) {
        if ((key.charCode > 64 && key.charCode > 91) || (key.charCode > 96 && key.charCode > 123)||
                specialCharPrice.indexOf(key.charCode)!==-1)
            key.preventDefault();
    });
    
    //    ***********************COMEBACK Total************************
    $("#tPricet1").keyup(function (key) {
        if(!lockComebackTL)
            linesKeyUpLauncher($("#tPricet1").val(), "T", 1);
    });

    $("#tPricet2").keyup(function (key) {
        if(!lockComebackTL)
            linesKeyUpLauncher($("#tPricet2").val(), "T", 2);
    });
    //    ***********************COMEBACK Total************************


    $("#teamTotalModal input").bind('keydown', 's', callOpenSpread);//total
    $("#teamTotalModal input").bind('keydown', 'm', callOpenMoneyLine);
    $("#teamTotalModal input").bind('keydown', 't', callOpenTotal);
    
    $("#teamTotalModal input").bind('keydown', 'F5', selectStoreDown);
    $("#teamTotalModal input").bind('keydown', 'F6', selectStoreUp);
    $("#teamTotalModal input").bind('keydown', 'F7', selectPeriodDown);
    $("#teamTotalModal input").bind('keydown', 'F8', selectPeriodUp);

    $("#pointstt1").bind('keydown', 'return', saveCurrentModal);
    $("#pricett1").bind('keydown', 'return', saveCurrentModal);
    $("#pricett2").bind('keydown', 'return', saveCurrentModal);
    $("#offlinett").bind('keydown', 'return', saveCurrentModal);
    $("#pointstt1").keypress(function (key) {
        if ((key.charCode > 64 && key.charCode > 91) || (key.charCode > 96 && key.charCode > 123)||
                specialChar.indexOf(key.charCode)!==-1)
            key.preventDefault();
    });
    $("#pricett1").keypress(function (key) {
        if ((key.charCode > 64 && key.charCode > 91) || (key.charCode > 96 && key.charCode > 123)||
                specialCharPrice.indexOf(key.charCode)!==-1)
            key.preventDefault();
    });
    $("#pricett2").keypress(function (key) {
        if ((key.charCode > 64 && key.charCode > 91) || (key.charCode > 96 && key.charCode > 123)||
                specialCharPrice.indexOf(key.charCode)!==-1)
            key.preventDefault();
    });


    //    ***********************COMEBACK Team Total************************
    $("#pricett1").keyup(function (key) {
        if(!lockComebackTT)
            linesKeyUpLauncher($("#pricett1").val(), "TT", 1);
    });

    $("#pricett2").keyup(function (key) {
        if(!lockComebackTT)
            linesKeyUpLauncher($("#pricett2").val(), "TT", 2);
    });
    //    ***********************COMEBACK Total************************


    $("#oddProp").bind('keydown', 'return', saveCurrentModal);
    $("#lineProp").bind('keydown', 'return', saveCurrentModal);

    $("#searchBox").keypress(function (e){
        if(e.keyCode === 13){
            var rot=$("#searchBox").val();
            var input=$('input[value="'+rot+'"]').parent().next().find("input:text");;
            if(input!==undefined){
                focusedElement=input;
                $(input).focus();
            }
            return false;
        }
    });
    
    $("#bodytable").keydown(
            function (e) {
//                alert(e.keyCode);
                if (e.keyCode === 39) {
                    if (selectedType === "isGame") {
                        var t;
                        t = $("input:focus").parent().next().find("input:text").focus();
                        $(t).focus();
                        focusedElement = t;
                    } else if (selectedType === "isFutureExtProp" || selectedType === "isProp" || selectedType === "isFutureProp") {
                        var t;
                        t = $("input:focus").parent().next().find("input:text");
                        $(t).focus();
                        focusedElement = t;
                    }
                    return false;
                }
                if (e.keyCode === 37) {
                    if (selectedType === "isGame") {
                        var t;
                        t = $("input:focus").parent().prev().find("input:text").focus();

                        focusedElement = t;
                        $(t).focus();
                    } else if (selectedType === "isFutureExtProp" || selectedType === "isProp" || selectedType === "isFutureProp") {
                        var t;
                        t = $("input:focus").parent().prev().find("input:text").focus();
                        focusedElement = t;
                        $(t).focus();
                    }
                    return false;
                }
                if (e.keyCode === 38) {
                    var pos = $("input:focus").attr("position");
                    var tr = $("input:focus").parent().parent().prev();
                    var input = $(tr).find("input:text[position='" + pos + "']");
                    focusedElement = input;
                    $(input).focus();
                    return false;
                }
                if (e.keyCode === 40) {
                    var pos = $("input:focus").attr("position");
                    var tr = $("input:focus").parent().parent().next();
                    var input = $(tr).find("input:text[position='" + pos + "']");
                    focusedElement = input;
                    $(input).focus();
                    return false;
                }
                if (e.keyCode === 9) {
                    if (e.shiftKey) {
                        if (selectedType === "isGame") {
                            var t;
                            t = $("input:focus").parent().prev().find("input:text").focus();
                            focusedElement = t;
                            $(t).focus();
                        } else if (selectedType === "isFutureExtProp" || selectedType === "isProp" || selectedType === "isFutureProp") {
                            var t;
                            t = $("input:focus").parent().prev().find("input:text").focus();
                            focusedElement = t;
                            $(t).focus();
                        }
                    } else {
                        if (selectedType === "isGame") {
                            var t;
                            t = $("input:focus").parent().next().find("input:text").focus();
                            $(t).focus();
                            focusedElement = t;
                        } else if (selectedType === "isFutureExtProp" || selectedType === "isProp" || selectedType === "isFutureProp") {
                            var t;
                            t = $("input:focus").parent().next().find("input:text");
                            $(t).focus();
                            focusedElement = t;
                        }
                    }
                    return false;
                }
                if(e.keyCode===70){
                    return callOpenFootball();
                }
                if(e.keyCode===72){
                    return callopenHockey();
                }
                if(e.keyCode===75){
                    return callOpenBasketball();
                }
                if(e.keyCode===66){
                    return callOpenBaseball();
                }
                if(e.keyCode===73){
                    return callOpenSoccer();
                }
                if(e.keyCode===79){
                    return callOpenOtherSports()();
                }
                if(e.keyCode===116){
                    return selectStoreDown();
                }
                if(e.keyCode===117){
                    return selectStoreUp();
                }
                if(e.keyCode===118){
                    return selectPeriodDown();
                }
                if(e.keyCode===119){
                    return selectPeriodUp();
                }
                if(e.keyCode===115){
                    return changeDisplayPriceType();
                }
                if(e.keyCode===120){
                    return changeDisplayStatus();
                }
                if(e.keyCode===82){
                    return searchFocus();
                }
                if (e.keyCode === 71 && e.ctrlKey) {
                    return callGameCreation();
                }
                if (e.keyCode === 79 && e.ctrlKey) {
                    return callGameEdition();
                }
                if (e.ctrlKey&&e.keyCode === 67) {
                    return callPropCreation();
                }
                if (e.keyCode === 68) {
                    alert(countBroNodes("Baseball_futureProps","Folder1",""));
                    return false;
                }
            }
    );

    /***********************************************HOT KEYS*************************************************************************/
    });
    
function  searchFocus(){
    $("#searchBox").focus();
    return false;
}
function callopenHockey() {
    loadscheduleSubSport('Hockey');
}

function callOpenBasketball() {
    loadscheduleSubSport('Basketball');
}

function callOpenFootball() {
    loadscheduleSubSport('Football');
}

function callOpenBaseball() {
    loadscheduleSubSport('Baseball');
}
function callOpenSoccer() {
    loadscheduleSubSport('Soccer');
}

function callOpenOtherSports() {
    loadscheduleSubSport('Other_Sports');
}
function callGameCreation(evt) {
    openCreateGameModal();
    return false;
}

function callLineHistoryRep(evt) {
    $("#lineHistoryModal").modal("toggle")
    return false;
}

function callGameEdition() {
    var tree = $("#scheduleTree").jstree(true);
    var sel = tree.get_selected();
    if($("#"+sel).find("a").attr("isGame")==="true"){
        openEditGameModal(sel,2);
    }else{
        alert("There is no Game Selected");
    }
    return false;
}
function algoMas(evt) {
    return false;
}

function saveFocusedElement() {
    var t = $("input:focus");
    focusedElement = t;
}



function selectStoreUp() {
    var store = $("#lineFilterStore").val();
    var selectedIndex = document.getElementById("lineFilterStore").selectedIndex;
    removeSelection("lineFilterStore");
    var optionsCant = $("#lineFilterStore").find("option").length;
    if (selectedIndex === optionsCant)
        selectedIndex = 0;
    var option = $("#lineFilterStore").find("option").eq(selectedIndex + 1);
    $(option).prop("selected", true);
    changeLinePerStore();
    return false;
}

function selectStoreDown() {
    var store = $("#lineFilterStore").val();
    var selectedIndex = document.getElementById("lineFilterStore").selectedIndex;
    removeSelection("lineFilterStore");
    var optionsCant = $("#lineFilterStore").find("option").length;
    if (selectedIndex === optionsCant)
        selectedIndex = 0;
    var option = $("#lineFilterStore").find("option").eq(selectedIndex - 1);
    $(option).prop("selected", true);
    changeLinePerStore();
    return false;
}

function selectPeriodUp() {
    var store = $("#lineFilterPeriod").val();
    var selectedIndex = document.getElementById("lineFilterPeriod").selectedIndex;
    removeSelection("lineFilterPeriod");
    var optionsCant = $("#lineFilterPeriod").find("option").length;
    if (selectedIndex === optionsCant)
        selectedIndex = 0;
    var option = $("#lineFilterPeriod").find("option").eq(selectedIndex + 1);
    $(option).prop("selected", true);
    changeLinePerStore();
    return false;
}

function selectPeriodDown() {
    var store = $("#lineFilterPeriod").val();
    var selectedIndex = document.getElementById("lineFilterPeriod").selectedIndex;
    removeSelection("lineFilterPeriod");
    var optionsCant = $("#lineFilterPeriod").find("option").length;
    if (selectedIndex === optionsCant)
        selectedIndex = 0;
    var option = $("#lineFilterPeriod").find("option").eq(selectedIndex - 1);
    $(option).prop("selected", true);
    changeLinePerStore();
    return false;
}

function changeDisplayPriceType() {
    var store = $("#displayTypeFilter").val();
    var selectedIndex = document.getElementById("displayTypeFilter").selectedIndex;
    removeSelection("displayTypeFilter");
    var optionsCant = $("#displayTypeFilter").find("option").length;
    if (selectedIndex === optionsCant)
        selectedIndex = 0;
    var option = $("#displayTypeFilter").find("option").eq(selectedIndex - 1);
    $(option).prop("selected", true);
    changeDisplayValues();
    return false;
}

function changeDisplayStatus() {
    var store = $("#lineFilterStatus").val();
    var selectedIndex = document.getElementById("lineFilterStatus").selectedIndex;
    removeSelection("lineFilterStatus");
    var optionsCant = $("#lineFilterStatus").find("option").length;
    if (selectedIndex === optionsCant)
        selectedIndex = 0;
    var option = $("#lineFilterStatus").find("option").eq(selectedIndex - 1);
    $(option).prop("selected", true);
    return false;
}



function inputLineTableEnterKey(e, pos, gameID, team,inputPress) {
    if (e.keyCode === 13) {
        switch (pos) {
            case 0:
                var status=$(inputPress).attr("status");
                openGame(gameID,status);
                break;
            case 2:
                openGamePausesModal(gameID);
                break;
            case 3:
                openEditGameModal(gameID,2,$(inputPress).parent());
                break;
            case 4:
                openGradeGameModal(gameID,$(inputPress).parent());
                break;
            case 5:
                openSpreadModal(gameID, 3);
                break;
            case 6:
                openWagerCovModal("Spread",$(inputPress).parent());
                break;
            case 7:
                openMoneyLineModal(gameID, 3);
                break;
                case 8:
                openWagerCovModal("Moneyline",$(inputPress).parent());
                break;
            case 9:
                openTotalModal(gameID, 3);
                break;
            case 10:
                openWagerCovModal("Total",$(inputPress).parent());
                break;
            case 11:
                openTeamTotalModal(team, gameID, 3);
                break;
            case 14:
                openWagerCovModal("Total",$(inputPress).parent());
                break;
            case 15:
                openWagerCovModal("Total",$(inputPress).parent());
                break;
            default:
                break;
        }
    }
}

function inputLinePropTableEnterKey(e, pos, contestNum, rotORcorrelation,inputPress) {
    if (e.keyCode === 13) {
        switch (pos) {
            case 1:
                openEditPropModal(contestNum,rotORcorrelation,$(inputPress).parent());
                break;
            case 5:
                openinfoEditModal(contestNum, rotORcorrelation,$(inputPress).parent());
                break;
            default:
                break;
        }
    }
}

function setLinesTableFocus() {
    if(focusedElement===undefined||focusedElement===null||focusedElement===""){
        var field = $("#bodytable").find("input:text").eq(0);
        $(field).focus();
    }else{
        var pos = $(focusedElement).attr("position");
        var trID=$(focusedElement).parent().parent().attr("id");
        var field=$("#"+trID).find("input:text[position='" + pos + "']");
        $(field).focus();
    }
}


function clearFocusedElement(){
   focusedElement=undefined; 
}

function enterToSaveLine(e, lineType) {
    if (e.keyCode === 13) {
        switch (lineType) {
            case 'S':
                saveSpreadLine();
                break;
            case 'M':
                saveMoneyLine();
                break;
            case 'T':
                saveTotalLine();
                break;
            case 'TT':
                saveTeamTotalLine();
                break;
        }
    }
}

function linesKeyUpLauncher(value, lineType, pos) {
    if (value.indexOf(".") === -1) {
        if(value===""){
            clearModalPrices(lineType);
        }else if (!(value < 100 && value > -100)) {
            calcComeBackAmerican(value, lineType, pos);
        }
    } else {
        if(value===""){
            clearModalPrices(lineType);
        }else
            calcComeBackDecimal(value, lineType, pos);
    }
}

function updownTable(e) {
    var searchClass = $(e.target).attr("class");

    switch (e.keyCode) {
        case 38:
            $(e.target).closest('tr').prev().find('.' + searchClass).select();
            break;
        case 40:
            $(e.target).closest('tr').next().find('.' + searchClass).select();
            break;
    }

}


function callPropCreation() {
    clearPropForm("create");
    var tree = $("#scheduleTree").jstree(true);
    var sel = tree.get_selected();
    var type = $("#" + sel).find("a").attr("isfutureprops");
    var type2 = $("#" + sel).find("a").attr("ispropfolder");
    var type3 = $("#" + sel).find("a").attr("isPropExternalFolder");
    if (type) {
        $("#correlational_id").attr("disabled", "disabled");
        $("#level2").attr("readonly", true);
        $("#level3").attr("readonly", true);
        $("#createPropModal").modal("toggle");
    } else if (type2) {
        var array = [];
        cleanFolderInputs();
        var selected;
        $("#correlational_id").removeAttr("disabled");
        getParentLevelsGameProp(array, sel);
        switch (deepLevels.length) {
            case 1:
                gameID = deepLevels[0].split("_");
                selected = gameID[1];
                $("#level1").val("Props");
                $("#level1").attr("readonly", true);
                break;
            case 2:
                gameID = deepLevels[1].split("_");
                selected = gameID[1];
                $("#level1").val("Props");
                $("#level2").val(unescape($("#" + deepLevels[0]).find('a').attr('ContestType2')));
                $("#level1").attr("readonly", true);
                $("#level2").attr("readonly", true);
                break;
            case 3:
                gameID = deepLevels[2].split("_");
                selected = gameID[1];
                $("#level1").val("Props");
                $("#level2").val(unescape($("#" + deepLevels[1]).find('a').attr('contesttype2')));
                $("#level3").val(unescape($("#" + deepLevels[0]).find('a').attr('contesttype3')));
                $("#level1").attr("readonly", true);
                $("#level2").attr("readonly", true);
                $("#level3").attr("readonly", true);
                break;
        }
        getCorrelations(selected.trim())
        $("#createPropModal").modal("toggle");
    } else if (type3) {
        var array = [];
        cleanFolderInputs();
        $("#correlational_id").attr("disabled", "disabled");
        getParentLevels(array, sel);
        switch (deepLevels.length) {
            case 1:
                $("#level1").val(deepLevels[0]);
                $("#level1").attr("readonly", true);
                break;
            case 2:
                $("#level1").val(deepLevels[1]);
                $("#level2").val(unescape($("#" + deepLevels[0]).find('a').attr('ContestType2')));
                $("#level1").attr("readonly", true);
                $("#level2").attr("readonly", true);
                break;
            case 3:
                $("#level1").val(deepLevels[2]);
                $("#level2").val(unescape($("#" + deepLevels[1]).find('a').attr('contesttype2')));
                $("#level3").val(unescape($("#" + deepLevels[0]).find('a').attr('contesttype3')));
                $("#level1").attr("readonly", true);
                $("#level2").attr("readonly", true);
                $("#level3").attr("readonly", true);
                break;
        }
        $("#createPropModal").modal("toggle");
    }else{
        this.location="props/create_ext";
    }
}