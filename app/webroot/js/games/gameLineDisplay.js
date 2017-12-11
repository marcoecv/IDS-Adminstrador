
function setGameLine(obj) {
//    var obj = $.parseJSON('[' + data + ']');
    var borderNotDraw = "";
    var borderDraw = "";
    if (obj['DrawRotNum'])
        borderDraw = "class='borderBottom'";
    else
        borderNotDraw = "class='borderBottom'";

    var spreadFavoriteHome = "";
    var spreadFavoriteAway = "";
    if (obj['FavoredTeamID'] === obj['Team1ID'] || obj['Spread'] === 0 || obj['Spread'] === '0.0') {
        spreadFavoriteAway = processUpdaterData(obj['Spread'], 's');
        spreadFavoriteHome = "";
    } else if (obj['FavoredTeamID'] === obj['Team2ID']) {
        spreadFavoriteHome = processUpdaterData(obj['Spread'], 's');
        spreadFavoriteAway = "";
    }

    if (obj['SpreadAdj1'] === '0' && obj['SpreadAdj2'] === '0') {
        spreadFavoriteHome = "";
        spreadFavoriteAway = "";
    }

    var status;
    switch (obj['Status']) {
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
    var table = $("#scheduleLines tbody");
    var tr1 = $("<tr></tr>");
    
    
    var filter=$("#wagerLineFilter").val();
    var wagerValues=setWagerValuesByFilter(filter,obj);
    
    var spreadAmountAway="";
    var spreadAmountHome="";
    var moneylineAmountAway="";
    var moneylineAmountHome="";
    var totalAmountOver="";
    var totalAmountUnder="";
    var teamTotalAmountOverAway="";
    var teamTotalAmountOverHome="";
    var teamTotalAmountUnderAway="";
    var teamTotalAmountUnderHome="";
    
    
    tr1.attr("id", obj['GameNum'] + "_A");
    tr1.append(createGamelineTD("5%", "opG focusedStyle","Open/Close_"+obj['Status'].trim() , obj['GameNum'], obj['GameNum'] + "_changeStatusA", 0));
    tr1.append(createGamelineTD("7%", "focusedStyle", obj['GameDate'], obj['GameNum'], obj['GameNum']+"_gameDate", 1));
    tr1.append(createGamelineTD("3%", "rot focusedStyle", obj['Team1RotNum'], obj['GameNum'], obj['GameNum']+"_rotNum_A", 2));
    tr1.append(createGamelineTD("17%", "teamLine focusedStyle", obj['Team1ID']+(obj['ListedPitcher1']!==null&&obj['ListedPitcher1']!==""?"  |  "+obj['ListedPitcher1'].trim():""), obj['GameNum'], obj['GameNum'] + "_team_A", 3));
    tr1.append(createGamelineTD("4%", "gr focusedStyle", status, obj['GameNum'], obj['GameNum'] + "_status", 4));
    tr1.append(createGamelineTD("6%", "sp focusedStyle", spreadFavoriteAway + " " + processData(compareValues(obj['SpreadAdj1'], obj['SpreadAdj2'])), obj['GameNum'], obj['GameNum'] + "_A_sp", 5));
    tr1.append(createGamelineTD("6%", "wsp focusedStyle",spreadAmountAway , obj['GameNum'], "", 6));
    tr1.append(createGamelineTD("6%", "ml focusedStyle", processData(obj['MoneyLine1']), obj['GameNum'], obj['GameNum'] + "_A_ml", 7));
    tr1.append(createGamelineTD("6%", "wml focusedStyle", moneylineAmountAway, obj['GameNum'], "", 8));
    tr1.append(createGamelineTD("5%", "tot focusedStyle", processModalData(obj['TotalPoints'], "t") + " " + processModalData(compareValues(obj['TtlPtsAdj1'], obj['TtlPtsAdj2']),""), obj['GameNum'], obj['GameNum'] + "_A_t", 9));
    tr1.append(createGamelineTD("6%", "wt focusedStyle", totalAmountOver, obj['GameNum'], "", 10));
    tr1.append(createGamelineTD("6%", "tta focusedStyle", processModalData(obj['Team1TotalPoints'], 't'), obj['GameNum'], obj['GameNum'] + "_A_tt", 11));
    tr1.append(createGamelineTD("6%", "focusedStyle", processData(obj['Team1TtlPtsAdj1']), obj['GameNum'], obj['GameNum'] + "_A_tto", 12));
    tr1.append(createGamelineTD("6%", "focusedStyle", processData(obj['Team1TtlPtsAdj2']), obj['GameNum'], obj['GameNum'] + "_A_ttu", 13));
    tr1.append(createGamelineTD("6%", "wtto focusedStyle", teamTotalAmountOverAway, obj['GameNum'], "", 14));
    tr1.append(createGamelineTD("6%", "wttu focusedStyle", teamTotalAmountUnderAway, obj['GameNum'], "", 15));
    
    var date = obj['GameTime'].split(":");
    var tr2 = $("<tr " + borderNotDraw + "></tr>");
    tr2.attr("id", obj['GameNum'] + "_H");
    tr2.append(createGamelineTD("5%", "opG focusedStyle",obj['Status'].trim(), obj['GameNum'], obj['GameNum'] + "_changeStatusH", 0));
    tr2.append(createGamelineTD("7%", "focusedStyle", date[0] + ":" + date[1], obj['GameNum'], obj['GameNum']+"_gameTime", 1));       //Date
    tr2.append(createGamelineTD("3%", "rot focusedStyle", obj['Team2RotNum'], obj['GameNum'], obj['GameNum']+"_rotNum_H", 2));    //#
    tr2.append(createGamelineTD("17%", "teamLine focusedStyle", obj['Team2ID']+(obj['ListedPitcher2']!==null&&obj['ListedPitcher2']!==""?"  |  "+obj['ListedPitcher2'].trim():""), obj['GameNum'], obj['GameNum'] + "_team_H", 3));//Teams
    tr2.append(createGamelineTD("4%", "gr focusedStyle", "", obj['GameNum'], obj['GameNum'] + "_status", 4));                                          //Status
    tr2.append(createGamelineTD("6%", "sp focusedStyle", spreadFavoriteHome + " " + processData(compareValues(obj['SpreadAdj2'], obj['SpreadAdj1'])), obj['GameNum'], obj['GameNum'] + "_H_sp", 5));     //Spread
    tr2.append(createGamelineTD("6%", "wsp focusedStyle", spreadAmountHome, obj['GameNum'], "", 6));                                         //$ Spread
    tr2.append(createGamelineTD("6%", "ml focusedStyle", processData(obj['MoneyLine2']), obj['GameNum'], obj['GameNum'] + "_H_ml", 7));     //MoneyLine
    tr2.append(createGamelineTD("6%", "wml focusedStyle", moneylineAmountHome, obj['GameNum'], "", 8));                                         //$ MoneyLine
    tr2.append(createGamelineTD("5%", "tot focusedStyle", processModalData(compareValues(obj['TtlPtsAdj2'], obj['TtlPtsAdj1'])), obj['GameNum'], obj['GameNum'] + "_H_t", 9));//Total
    tr2.append(createGamelineTD("6%", "wt focusedStyle", totalAmountUnder, obj['GameNum'], "", 10));                                         //$ Total
    tr2.append(createGamelineTD("6%", "tth focusedStyle", processModalData(obj['Team2TotalPoints'], 't'), obj['GameNum'], obj['GameNum'] + "_H_tt", 11));//Team T
    tr2.append(createGamelineTD("6%", "focusedStyle", processData(obj['Team2TtlPtsAdj1']), obj['GameNum'], obj['GameNum'] + "_H_tto", 12));//TT Over
    tr2.append(createGamelineTD("6%", "focusedStyle", processData(obj['Team2TtlPtsAdj2']), obj['GameNum'], obj['GameNum'] + "_H_ttu", 13));//TT Under
    tr2.append(createGamelineTD("6%", "wtto focusedStyle", teamTotalAmountOverHome, obj['GameNum'], "", 14));                                         //$ TTO
    tr2.append(createGamelineTD("6%", "wttu focusedStyle", teamTotalAmountUnderHome, obj['GameNum'], "", 15));                                         //$ TTU

    var tr3 = "";
    if (obj['DrawRotNum']) {
        var tr3 = $("<tr " + borderDraw + "></tr>");
        tr3.attr("id", obj['GameNum'] + "_D");
        tr3.append(createGamelineTD("5%", "opG focusedStyle", obj['Status'].trim(), obj['GameNum'], obj['GameNum'] + "_changeStatusD", 0));
        tr3.append(createGamelineTD("7%", "focusedStyle", '', obj['GameNum'], "", 1));       //Date
        tr3.append(createGamelineTD("3%", "focusedStyle", obj['DrawRotNum'], obj['GameNum'], "", 2));    //#
        tr3.append(createGamelineTD("17%", "teamLine focusedStyle", 'DRAW', obj['GameNum'], obj['GameNum'], obj['GameNum'] + "_team_D", "", 3));//Teams
        tr3.append(createGamelineTD("4%", "", "", obj['GameNum'], "", 4));                                          //Status
        tr3.append(createGamelineTD("6%", "sp focusedStyle", '', obj['GameNum'], "", 5));     //Spread
        tr3.append(createGamelineTD("6%", "focusedStyle", '', obj['GameNum'], "", 6));                                         //$ Spread
        tr3.append(createGamelineTD("6%", "ml focusedStyle", processData(obj['MoneyLineDraw']), obj['GameNum'], obj['GameNum'] + "_D_ml", "", 7));     //MoneyLine
        tr3.append(createGamelineTD("6%", "wml focusedStyle", '', obj['GameNum'], "", 8));                                         //$ MoneyLine
        tr3.append(createGamelineTD("5%", "focusedStyle", '', obj['GameNum'], "", 9));//Total
        tr3.append(createGamelineTD("6%", "focusedStyle", '', obj['GameNum'], "", 10));                                         //$ Total
        tr3.append(createGamelineTD("6%", "focusedStyle", '', obj['GameNum'], "", 11));//Team T
        tr3.append(createGamelineTD("6%", "focusedStyle", '', obj['GameNum'], "", 12));//TT Over
        tr3.append(createGamelineTD("6%", "focusedStyle", '', obj['GameNum'], "", 13));//TT Under
        tr3.append(createGamelineTD("6%", "focusedStyle", '', obj['GameNum'], "", 14));                                         //$ TTO
        tr3.append(createGamelineTD("6%", "focusedStyle", '', obj['GameNum'], "", 15));                                         //$ TTU
    }


    var dateArray = obj['GameDate'].split("/");
    var timeAray = obj['WagerCutOff'].split(":");
    var gameDate = new Date(dateArray[0] + "/" + dateArray[1] + "/20" + dateArray[2] + " " + timeAray[0] + ":" + timeAray[1] + ":" + timeAray[2]);
    var today = new Date();
    var tomorrowDate = new Date();
    tomorrowDate.setDate(today.getDate() + 1);
    if (gameDate < today) {
        tr1.addClass("graded");
        tr2.addClass("graded");
        if (obj['DrawRotNum'])
            tr3.addClass("graded");
    } else if (gameDate > tomorrowDate) {
        tr1.addClass("notstarted");
        tr2.addClass("notstarted");
        if (obj['DrawRotNum'])
            tr3.addClass("notstarted");
    }
    table.append(tr1);
    table.append(tr2);
    table.append(tr3);
    setLinesTableFocus();
}


function setGameLineDecimal(obj) {
//    var obj = $.parseJSON('[' + data + ']');
    var borderNotDraw = "";
    var borderDraw = "";
    if (obj['DrawRotNum'])
        borderDraw = "class='borderBottom'";
    else
        borderNotDraw = "class='borderBottom'";

    var spreadFavoriteHome = "";
    var spreadFavoriteAway = "";
    if (obj['FavoredTeamID'] === obj['Team1ID'] || obj['Spread'] === 0 || obj['Spread'] === '0.0') {
        spreadFavoriteAway = processModalData(obj['Spread'], 's');
        spreadFavoriteHome = "";
    } else if (obj['FavoredTeamID'] === obj['Team2ID']) {
        spreadFavoriteHome = processModalData(obj['Spread'], 's');
        spreadFavoriteAway = "";
    }

    if (obj['SpreadAdj1'] === '0' && obj['SpreadAdj2'] === '0') {
        spreadFavoriteHome = "";
        spreadFavoriteAway = "";
    }


    var status;
    switch (obj['Status']) {
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
    
    var spreadAmountAway="";
    var spreadAmountHome="";
    var moneylineAmountAway="";
    var moneylineAmountHome="";
    var totalAmountOver="";
    var totalAmountUnder="";
    var teamTotalAmountOverAway="";
    var teamTotalAmountOverHome="";
    var teamTotalAmountUnderAway="";
    var teamTotalAmountUnderHome="";
    
    
    
    
    var table = $("#scheduleLines tbody");
    var tr1 = $("<tr></tr>");
    tr1.attr("id", obj['GameNum'] + "_A");
    tr1.append(createGamelineTD("5%", "opG focusedStyle", "Open/Close_"+obj['Status'].trim(), obj['GameNum'], obj['GameNum'] + "_changeStatusA", 0));
    tr1.append(createGamelineTD("7%", "focusedStyle", obj['GameDate'], obj['GameNum'], 1));
    tr1.append(createGamelineTD("3%", "focusedStyle", obj['Team1RotNum'], obj['GameNum'], 2));
    tr1.append(createGamelineTD("17%", "teamLine focusedStyle", obj['Team1ID']+(obj['ListedPitcher1']!==null&&obj['ListedPitcher1']!==""?"  |  "+obj['ListedPitcher1'].trim():""), obj['GameNum'], 3));
    tr1.append(createGamelineTD("4%", "gr focusedStyle", status, obj['GameNum'], obj['GameNum'] + "_" + obj['Team1RotNum'] + "_status", 4));
    tr1.append(createGamelineTD("6%", "sp focusedStyle", spreadFavoriteAway + " " + (compareValues(obj['SpreadDecimal1'], obj['SpreadDecimal2']).substring(0, 4)), obj['GameNum'] + "_" + obj['Team1RotNum'] + "_sp", 5));
    tr1.append(createGamelineTD("6%", "wsp focusedStyle", spreadAmountAway, obj['GameNum'], 6));
    tr1.append(createGamelineTD("6%", "ml focusedStyle", (obj['MoneyLineDecimal1'] !== null ? obj['MoneyLineDecimal1'].substring(0, 4) : ""), obj['GameNum'] + "_" + obj['Team1RotNum'] + "_ml", 7));
    tr1.append(createGamelineTD("6%", "wml focusedStyle", moneylineAmountAway, obj['GameNum'], 8));
    tr1.append(createGamelineTD("5%", "tot focusedStyle", processModalData(obj['TotalPoints'], "t") + " " + (compareValues(obj['TtlPointsDecimal1'], obj['TtlPointsDecimal2']).substring(0, 4)), obj['GameNum'] + "_" + obj['Team1RotNum'] + "_tot", 9));
    tr1.append(createGamelineTD("6%", "wt focusedStyle", totalAmountOver, obj['GameNum'], 10));
    tr1.append(createGamelineTD("6%", "tta focusedStyle", processModalData(obj['Team1TotalPoints'], 't'), obj['GameNum'] + "_" + obj['Team1RotNum'] + "_tt", 11));
    tr1.append(createGamelineTD("6%", "focusedStyle", (obj['Team1TtlPtsDecimal1'] !== null ? obj['Team1TtlPtsDecimal1'].substring(0, 4) : ""), obj['GameNum'], obj['GameNum'] + "_A_tto", 12));
    tr1.append(createGamelineTD("6%", "focusedStyle", (obj['Team1TtlPtsDecimal2'] !== null ? obj['Team1TtlPtsDecimal2'].substring(0, 4) : ""), obj['GameNum'], obj['GameNum'] + "_A_ttu", 13));
    tr1.append(createGamelineTD("6%", "wtto focusedStyle", teamTotalAmountOverAway, obj['GameNum'], 14));
    tr1.append(createGamelineTD("6%", "wttu focusedStyle", teamTotalAmountUnderAway, obj['GameNum'], 15));

    var date = obj['GameTime'].split(":");
    var tr2 = $("<tr " + borderNotDraw + "></tr>");
    tr2.attr("id", obj['GameNum'] + "_H");
    tr2.append(createGamelineTD("5%", "opG focusedStyle", obj['Status'].trim(), obj['GameNum'], obj['GameNum'] + "_changeStatusH", 0));
    tr2.append(createGamelineTD("7%", "focusedStyle", date[0] + ":" + date[1], obj['GameNum'], "", 1));       //Date
    tr2.append(createGamelineTD("3%", "focusedStyle", obj['Team2RotNum'], obj['GameNum'], "", 2));    //#
    tr2.append(createGamelineTD("17%", "teamLine focusedStyle", obj['Team2ID']+(obj['ListedPitcher2']!==null&&obj['ListedPitcher2']!==""?"  |  "+obj['ListedPitcher2'].trim():""), obj['GameNum'], 3));//Teams
    tr2.append(createGamelineTD("4%", "", "", obj['GameNum'], obj['GameNum'] + "_" + obj['Team2RotNum'] + "_status", 4));//Status
    tr2.append(createGamelineTD("6%", "sp focusedStyle", spreadFavoriteHome + " " + (compareValues(obj['SpreadDecimal2'], obj['SpreadDecimal1']).substring(0, 4)), obj['GameNum'] + "_" + obj['Team2RotNum'] + "_spread", 5));     //Spread
    tr2.append(createGamelineTD("6%", "wsp focusedStyle", spreadAmountHome, obj['GameNum'], "", 6));                                         //$ Spread
    tr2.append(createGamelineTD("6%", "ml focusedStyle", (obj['MoneyLineDecimal2'] !== null ? obj['MoneyLineDecimal2'].substring(0, 4) : ""), obj['GameNum'] + "_" + obj['Team2RotNum'] + "_ml", 7));     //MoneyLine
    tr2.append(createGamelineTD("6%", "wml focusedStyle", moneylineAmountHome, obj['GameNum'], "", 8));                                         //$ MoneyLine
    tr2.append(createGamelineTD("5%", "tot focusedStyle", processModalData(compareValues(obj['TtlPointsDecimal2'], obj['TtlPointsDecimal1']).substring(0, 4)), obj['GameNum'] + "_" + obj['Team2RotNum'] + "_tot", 9));//Total
    tr2.append(createGamelineTD("6%", "wt focusedStyle", totalAmountUnder, obj['GameNum'], "", 10));                                         //$ Total
    tr2.append(createGamelineTD("6%", "tth focusedStyle", processModalData(obj['Team2TotalPoints'], 't'), obj['GameNum'] + "_" + obj['Team2RotNum'] + "_tt", 11));//Team T
    tr2.append(createGamelineTD("6%", "focusedStyle", (obj['Team2TtlPtsDecimal1'] !== null ? obj['Team2TtlPtsDecimal1'].substring(0, 4) : ""), obj['GameNum'], obj['GameNum'] + "_" + obj['Team2RotNum'] + "_tto", 12));//TT Over
    tr2.append(createGamelineTD("6%", "focusedStyle", (obj['Team2TtlPtsDecimal2'] !== null ? obj['Team2TtlPtsDecimal2'].substring(0, 4) : ""), obj['GameNum'], obj['GameNum'] + "_" + obj['Team2RotNum'] + "_ttu", 13));//TT Under
    tr2.append(createGamelineTD("6%", "wtto focusedStyle", teamTotalAmountOverHome, obj['GameNum'], "", 14));                                         //$ TTO
    tr2.append(createGamelineTD("6%", "wttu focusedStyle", teamTotalAmountUnderHome, obj['GameNum'], "", 15));                                         //$ TTU

    var tr3 = "";
    if (obj['DrawRotNum']) {
        var tr3 = $("<tr " + borderDraw + "></tr>");
        tr3.attr("id", obj['GameNum'] + "_D");
        tr3.append(createGamelineTD("5%", "opG focusedStyle", obj['Status'].trim(), obj['GameNum'], obj['GameNum'] + "_changeStatusD", 0));
        tr3.append(createGamelineTD("7%", "focusedStyle", '', obj['GameNum'], "", 1));       //Date
        tr3.append(createGamelineTD("3%", "focusedStyle", obj['DrawRotNum'] + "<input type='hidden' value='" + obj['GameNum'] + "'/>", obj['GameNum'], "", 2));    //#
        tr3.append(createGamelineTD("17%", "ed teamLine focusedStyle", 'DRAW', obj['GameNum'], "", 3));//Teams
        tr3.append(createGamelineTD("4%", "", "", obj['GameNum'], "", 4));                                          //Status
        tr3.append(createGamelineTD("6%", "focusedStyle", '', obj['GameNum'], "", 5));     //Spread
        tr3.append(createGamelineTD("6%", "focusedStyle", '', obj['GameNum'], "", 6));                                         //$ Spread
        tr3.append(createGamelineTD("6%", "ml focusedStyle", processData(obj['MoneyLineDecimalDraw']), "", 7));     //MoneyLine
        tr3.append(createGamelineTD("6%", "wml focusedStyle", '', obj['GameNum'], "", 8));                                         //$ MoneyLine
        tr3.append(createGamelineTD("5%", "focusedStyle", '', obj['GameNum'], "", 9));//Total
        tr3.append(createGamelineTD("6%", "focusedStyle", '', obj['GameNum'], "", 10));                                         //$ Total
        tr3.append(createGamelineTD("6%", "focusedStyle", '', obj['GameNum'], "", 11));//Team T
        tr3.append(createGamelineTD("6%", "focusedStyle", '', obj['GameNum'], "", 12));//TT Over
        tr3.append(createGamelineTD("6%", "focusedStyle", '', obj['GameNum'], "", 13));//TT Under
        tr3.append(createGamelineTD("6%", "focusedStyle", '', obj['GameNum'], "", 14));                                         //$ TTO
        tr3.append(createGamelineTD("6%", "focusedStyle", '', obj['GameNum'], "", 15));                                         //$ TTU
    }


    var dateArray = obj['GameDate'].split("/");
    var timeAray = obj['WagerCutOff'].split(":");
    var gameDate = new Date(dateArray[0] + "/" + dateArray[1] + "/20" + dateArray[2] + " " + timeAray[0] + ":" + timeAray[1] + ":" + timeAray[2]);
    var today = new Date();
    var tomorrowDate = new Date();
    tomorrowDate.setDate(today.getDate() + 1);
    if (gameDate < today) {
        tr1.addClass("graded");
        tr2.addClass("graded");
        if (obj['DrawRotNum'])
            tr3.addClass("graded");
    } else if (gameDate > tomorrowDate) {
        tr1.addClass("notstarted");
        tr2.addClass("notstarted");
        if (obj['DrawRotNum'])
            tr3.addClass("notstarted");
    }
    table.append(tr1);
    table.append(tr2);
    table.append(tr3);
    setLinesTableFocus();
}

function addGameHeader() {
    var table = $("#scheduleLines thead");
    $("#scheduleLines table").attr("style", "width:100%");
    $("#headerTable thead tr").remove();

    var tr = $("<tr></tr>");
    tr.append(createGamePropTH("5%", false, "", "<b>Open/Close</b>"));
    tr.append(createGamePropTH("7%", false, "", "<b>Date</b>"));
    tr.append(createGamePropTH("3%", false, "", "<b>#</b>"));
    tr.append(createGamePropTH("17%", false, "", "<b>Teams</b>"));
    tr.append(createGamePropTH("4%", false, "", "<b>Status</b>"));
    tr.append(createGamePropTH("6%", false, "", "<b>Spread</b>"));
    tr.append(createGamePropTH("6%", false, "", "<b>$ Spread</b>"));
    tr.append(createGamePropTH("6%", false, "", "<b>MoneyLine</b>"));
    tr.append(createGamePropTH("6%", false, "", "<b>$ MoneyLine</b>"));
    tr.append(createGamePropTH("5%", false, "", "<b>Total</b>"));
    tr.append(createGamePropTH("6%", false, "", "<b>$ Total</b>"));
    tr.append(createGamePropTH("6%", false, "", "<b>Team T</b>"));
    tr.append(createGamePropTH("6%", false, "", "<b>TT Over</b>"));
    tr.append(createGamePropTH("6%", false, "", "<b>TT Under</b>"));
    tr.append(createGamePropTH("6%", false, "", "<b>$ TTO</b>"));
    tr.append(createGamePropTH("6%", false, "", "<b>$ TTU</b>"));

    table.append(tr);
}

function setGameLineByPosition(obj,trId) {
//    var obj = $.parseJSON('[' + data + ']');
    var borderNotDraw = "";
    var borderDraw = "";
    if (obj['DrawRotNum'])
        borderDraw = "class='borderBottom'";
    else
        borderNotDraw = "class='borderBottom'";

    var spreadFavoriteHome = "";
    var spreadFavoriteAway = "";
    if (obj['FavoredTeamID'] === obj['Team1ID'] || obj['Spread'] === 0 || obj['Spread'] === '0.0') {
        spreadFavoriteAway = processModalData(obj['Spread'], 's');
        spreadFavoriteHome = "";
    } else if (obj['FavoredTeamID'] === obj['Team2ID']) {
        spreadFavoriteHome = processModalData(obj['Spread'], 's');
        spreadFavoriteAway = "";
    }

    if (obj['SpreadAdj1'] === '0' && obj['SpreadAdj2'] === '0') {
        spreadFavoriteHome = "";
        spreadFavoriteAway = "";
    }

    var status;
    switch (obj['Status']) {
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
    
    var spreadAmountAway="";
    var spreadAmountHome="";
    var moneylineAmountAway="";
    var moneylineAmountHome="";
    var totalAmountOver="";
    var totalAmountUnder="";
    var teamTotalAmountOverAway="";
    var teamTotalAmountOverHome="";
    var teamTotalAmountUnderAway="";
    var teamTotalAmountUnderHome="";
    
    var filter=$("#wagerLineFilter").val();
    
    var table = $("#scheduleLines tbody");
    var tr1 = $("<tr></tr>");
    tr1.attr("id", obj['GameNum'] + "_A");
    tr1.append(createGamelineTD("5%", "opG focusedStyle","Open/Close_"+obj['Status'].trim() , obj['GameNum'], obj['GameNum'] + "_changeStatusA", 0));
    tr1.append(createGamelineTD("7%", "focusedStyle", obj['GameDate'], obj['GameNum'], "", 1));
    tr1.append(createGamelineTD("3%", "focusedStyle", obj['Team1RotNum'], obj['GameNum'], "", 2));
    tr1.append(createGamelineTD("17%", "teamLine focusedStyle", obj['Team1ID']+(obj['ListedPitcher1']!==null&&obj['ListedPitcher1']!==""?"  |  "+obj['ListedPitcher1'].trim():""), obj['GameNum'], obj['GameNum'] + "_team_A", 3));
    tr1.append(createGamelineTD("4%", "gr focusedStyle", status, obj['GameNum'], obj['GameNum'] + "_status", 4));
    tr1.append(createGamelineTD("6%", "sp focusedStyle", spreadFavoriteAway + " " + processData(compareValues(obj['SpreadAdj1'], obj['SpreadAdj2'])), obj['GameNum'], obj['GameNum'] + "_A_sp", 5));
    tr1.append(createGamelineTD("6%", "wsp focusedStyle",spreadAmountAway , obj['GameNum'], "", 6));
    tr1.append(createGamelineTD("6%", "ml focusedStyle", processData(obj['MoneyLine1']), obj['GameNum'], obj['GameNum'] + "_A_ml", 7));
    tr1.append(createGamelineTD("6%", "wml focusedStyle", moneylineAmountAway, obj['GameNum'], "", 8));
    tr1.append(createGamelineTD("5%", "tot focusedStyle", processModalData(obj['TotalPoints'], "t") + " " + processModalData(compareValues(obj['TtlPtsAdj1'], obj['TtlPtsAdj2']),""), obj['GameNum'], obj['GameNum'] + "_A_t", 9));
    tr1.append(createGamelineTD("6%", "wt focusedStyle", totalAmountOver, obj['GameNum'], "", 10));
    tr1.append(createGamelineTD("6%", "tta focusedStyle", processModalData(obj['Team1TotalPoints'], 't'), obj['GameNum'], obj['GameNum'] + "_A_tt", 11));
    tr1.append(createGamelineTD("6%", "focusedStyle", processData(obj['Team1TtlPtsAdj1']), obj['GameNum'], obj['GameNum'] + "_A_tto", 12));
    tr1.append(createGamelineTD("6%", "focusedStyle", processData(obj['Team1TtlPtsAdj2']), obj['GameNum'], obj['GameNum'] + "_A_ttu", 13));
    tr1.append(createGamelineTD("6%", "wtto focusedStyle", teamTotalAmountOverAway, obj['GameNum'], "", 14));
    tr1.append(createGamelineTD("6%", "wttu focusedStyle", teamTotalAmountUnderAway, obj['GameNum'], "", 15));
    
    var date = obj['GameTime'].split(":");
    var tr2 = $("<tr " + borderNotDraw + "></tr>");
    tr2.attr("id", obj['GameNum'] + "_H");
    tr2.append(createGamelineTD("5%", "opG focusedStyle",obj['Status'].trim(), obj['GameNum'], obj['GameNum'] + "_changeStatusH", 0));
    tr2.append(createGamelineTD("7%", "focusedStyle", date[0] + ":" + date[1], obj['GameNum'], "", 1));       //Date
    tr2.append(createGamelineTD("3%", "focusedStyle", obj['Team2RotNum'], obj['GameNum'], "", 2));    //#
    tr2.append(createGamelineTD("17%", "teamLine focusedStyle", obj['Team2ID']+(obj['ListedPitcher2']!==null&&obj['ListedPitcher2']!==""?"  |  "+obj['ListedPitcher2'].trim():""), obj['GameNum'], obj['GameNum'] + "_team_H", 3));//Teams
    tr2.append(createGamelineTD("4%", "gr focusedStyle", "", obj['GameNum'], obj['GameNum'] + "_status", 4));                                          //Status
    tr2.append(createGamelineTD("6%", "sp focusedStyle", spreadFavoriteHome + " " + processData(compareValues(obj['SpreadAdj2'], obj['SpreadAdj1'])), obj['GameNum'], obj['GameNum'] + "_H_sp", 5));     //Spread
    tr2.append(createGamelineTD("6%", "wsp focusedStyle", spreadAmountHome, obj['GameNum'], "", 6));                                         //$ Spread
    tr2.append(createGamelineTD("6%", "ml focusedStyle", processData(obj['MoneyLine2']), obj['GameNum'], obj['GameNum'] + "_H_ml", 7));     //MoneyLine
    tr2.append(createGamelineTD("6%", "wml focusedStyle", moneylineAmountHome, obj['GameNum'], "", 8));                                         //$ MoneyLine
    tr2.append(createGamelineTD("5%", "tot focusedStyle", processModalData(compareValues(obj['TtlPtsAdj2'], obj['TtlPtsAdj1'])), obj['GameNum'], obj['GameNum'] + "_H_t", 9));//Total
    tr2.append(createGamelineTD("6%", "wt focusedStyle", totalAmountUnder, obj['GameNum'], "", 10));                                         //$ Total
    tr2.append(createGamelineTD("6%", "tth focusedStyle", processModalData(obj['Team2TotalPoints'], 't'), obj['GameNum'], obj['GameNum'] + "_H_tt", 11));//Team T
    tr2.append(createGamelineTD("6%", "focusedStyle", processData(obj['Team2TtlPtsAdj1']), obj['GameNum'], obj['GameNum'] + "_H_tto", 12));//TT Over
    tr2.append(createGamelineTD("6%", "focusedStyle", processData(obj['Team2TtlPtsAdj2']), obj['GameNum'], obj['GameNum'] + "_H_ttu", 13));//TT Under
    tr2.append(createGamelineTD("6%", "wtto focusedStyle", teamTotalAmountOverHome, obj['GameNum'], "", 14));                                         //$ TTO
    tr2.append(createGamelineTD("6%", "wttu focusedStyle", teamTotalAmountUnderHome, obj['GameNum'], "", 15));                                         //$ TTU

    var tr3 = "";
    if (obj['DrawRotNum']) {
        var tr3 = $("<tr " + borderDraw + "></tr>");
        tr3.attr("id", obj['GameNum'] + "_D");
        tr3.append(createGamelineTD("5%", "opG focusedStyle", obj['Status'].trim(), obj['GameNum'], obj['GameNum'] + "_changeStatusD", 0));
        tr3.append(createGamelineTD("7%", "focusedStyle", '', obj['GameNum'], "", 1));       //Date
        tr3.append(createGamelineTD("3%", "focusedStyle", obj['DrawRotNum'], obj['GameNum'], "", 2));    //#
        tr3.append(createGamelineTD("17%", "teamLine focusedStyle", 'DRAW', obj['GameNum'], obj['GameNum'], obj['GameNum'] + "_team_D", "", 3));//Teams
        tr3.append(createGamelineTD("4%", "", "", obj['GameNum'], "", 4));                                          //Status
        tr3.append(createGamelineTD("6%", "sp focusedStyle", '', obj['GameNum'], "", 5));     //Spread
        tr3.append(createGamelineTD("6%", "focusedStyle", '', obj['GameNum'], "", 6));                                         //$ Spread
        tr3.append(createGamelineTD("6%", "ml focusedStyle", processData(obj['MoneyLineDraw']), obj['GameNum'], obj['GameNum'] + "_D_ml", "", 7));     //MoneyLine
        tr3.append(createGamelineTD("6%", "wml focusedStyle", '', obj['GameNum'], "", 8));                                         //$ MoneyLine
        tr3.append(createGamelineTD("5%", "focusedStyle", '', obj['GameNum'], "", 9));//Total
        tr3.append(createGamelineTD("6%", "focusedStyle", '', obj['GameNum'], "", 10));                                         //$ Total
        tr3.append(createGamelineTD("6%", "focusedStyle", '', obj['GameNum'], "", 11));//Team T
        tr3.append(createGamelineTD("6%", "focusedStyle", '', obj['GameNum'], "", 12));//TT Over
        tr3.append(createGamelineTD("6%", "focusedStyle", '', obj['GameNum'], "", 13));//TT Under
        tr3.append(createGamelineTD("6%", "focusedStyle", '', obj['GameNum'], "", 14));                                         //$ TTO
        tr3.append(createGamelineTD("6%", "focusedStyle", '', obj['GameNum'], "", 15));                                          //$ TTU
    }


    var dateArray = obj['GameDate'].split("/");
    var timeAray = obj['WagerCutOff'].split(":");
    var gameDate = new Date(dateArray[0] + "/" + dateArray[1] + "/20" + dateArray[2] + " " + timeAray[0] + ":" + timeAray[1] + ":" + timeAray[2]);
    var today = new Date();
    var tomorrowDate = new Date();
    tomorrowDate.setDate(today.getDate() + 1);
    if (gameDate < today) {
        tr1.addClass("graded");
        tr2.addClass("graded");
        if (obj['DrawRotNum'])
            tr3.addClass("graded");
    } else if (gameDate > tomorrowDate) {
        tr1.addClass("notstarted");
        tr2.addClass("notstarted");
        if (obj['DrawRotNum'])
            tr3.addClass("notstarted");
    }
    if(trId===0){
        table.append(tr1);
        table.append(tr2);
        table.append(tr3);
    }else{
        $('#'+trId).before(tr1);
        $('#'+trId).before(tr2);
        $('#'+trId).before(tr3);
    }
    
    
}

function createGamelineTD(width, classInput, value, gameID, tdId, pos) {
    var td1 = $("<td></td>").attr({"width": width, "style": "padding: auto;text-align: center;"});
    td1.attr("id", tdId);
    var ci = classInput.split(" ");
    var team = "";
    var array;
    var val;
    var status;
    switch (ci[0]) {
        case 'sp':
            td1.attr("onclick", "openSpreadModal(this,1)");
            break;
        case 'ml':
            td1.attr("onclick", "openMoneyLineModal(this,1)");
            break;
        case 'tot':
            td1.attr("onclick", "openTotalModal(this,1)");
            break;
        case 'tta':
            td1.attr("onclick", "openTeamTotalModal('away',this,1)");
            team = "away";
            break;
        case 'tth':
            td1.attr("onclick", "openTeamTotalModal('home',this,1)");
            team = "home";
            break;
        case "gr":
            td1.attr("onclick", "openGradeGameModal(" + gameID + ",this)");
            break;
        case "teamLine":
            td1.attr("onclick", "openEditGameModal('" + gameID + "',2,this)");
            break
        case "wsp":
            td1.attr("onclick", "openWagerCovModal('Spread',this)");
            break;
        case "wml":
            td1.attr("onclick", "openWagerCovModal('Moneyline',this)");
            break;
        case "wt":
            td1.attr("onclick", "openWagerCovModal('Total',this)");
            break;
        case "wtto":
            td1.attr("onclick", "openWagerCovModal('TT Over',this)");
            break;
        case "wttu":
            td1.attr("onclick", "openWagerCovModal('TT Under',this)");
            break;
        case "opG":
            array=value.split("_");
            if(array.length>1){
                val=array[0];
                status=array[1];
            }else{
                val="";
                status=value;
            }
            td1.attr("onclick", "openGame("+gameID+")");
            break;
        case "rot":
            td1.attr("onclick", "openGamePausesModal("+gameID+")");
            break;
        default :
            break;
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
                "onkeypress": "inputLineTableEnterKey(event," + pos + "," + gameID + ",'" + team + "',this)"
            })); 
    }else if(ci[0]==="opG"){
       td1.append($("<input></input>").attr(
            {
                "type": "text", 
                "value": val, 
                "class": classInput,
                "readonly": true,
                "status":status,
                "position": pos, 
                "onkeypress": "inputLineTableEnterKey(event," + pos + "," + gameID + ",'" + team + "',this)"
            })); 
    }else{
        td1.append($("<input></input>").attr(
            {
                "type": "text", 
                "value": value, 
                "class": classInput, 
                "readonly": true, 
                "position": pos, 
                "onkeypress": "inputLineTableEnterKey(event," + pos + "," + gameID + ",'" + team + "',this)"
            }));
        }

    return td1;
}

function createGamePropTH(width, isInput, classInput, value) {
    var td1 = $("<th></th>").attr({"width": width});

    if (isInput) {
        td1.append($("<input></input>")
                .attr({"type": "text", "value": value, "class": classInput}));

    } else {
        td1.append($("<span></span>").append(value));
        td1.attr({"class": classInput});
    }

    return td1;
}


function setWagerValuesByFilter(filter,data){
    var values=[];
    var PayoutWageredSpread1=(data["PayoutWageredSpread1"]===null?0:parseInt(data["PayoutWageredSpread1"]));
        var PayoutWageredSpread2=(data["PayoutWageredSpread2"]===null?0:parseInt(data["PayoutWageredSpread2"]));
        var RiskWageredSpread1=(data["RiskWageredSpread1"]===null?0:parseInt(data["RiskWageredSpread1"]));
        var RiskWageredSpread2=(data["RiskWageredSpread2"]===null?0:parseInt(data["RiskWageredSpread2"]));
        var VolumeWageredSpread1=(data["VolumeWageredSpread1"]===null?0:parseInt(data["VolumeWageredSpread1"]));
        var VolumeWageredSpread2=(data["VolumeWageredSpread2"]===null?0:parseInt(data["VolumeWageredSpread2"]));

        var RiskWageredMoney1=(data["RiskWageredMoney1"]===null?0:parseInt(data["RiskWageredMoney1"]));
        var RiskWageredMoney2=(data["RiskWageredMoney2"]===null?0:parseInt(data["RiskWageredMoney2"]));
        var PayoutWageredMoney1=(data["PayoutWageredMoney1"]===null?0:parseInt(data["PayoutWageredMoney1"]));
        var PayoutWageredMoney2=(data["PayoutWageredMoney2"]===null?0:parseInt(data["PayoutWageredMoney2"]));
        var VolumeWageredMoney1=(data["VolumeWageredMoney1"]===null?0:parseInt(data["VolumeWageredMoney1"]));
        var VolumeWageredMoney2=(data["VolumeWageredMoney2"]===null?0:parseInt(data["VolumeWageredMoney2"]));
        

        var RiskWageredTotalO=(data["RiskWageredTotalO"]===null?0:parseInt(data["RiskWageredTotalO"]));
        var RiskWageredTotalU=(data["RiskWageredTotalU"]===null?0:parseInt(data["RiskWageredTotalU"]));
        var PayoutWageredTotalO=(data["PayoutWageredTotalO"]===null?0:parseInt(data["PayoutWageredTotalO"]));
        var PayoutWageredTotalU=(data["PayoutWageredTotalU"]===null?0:parseInt(data["PayoutWageredTotalU"]));
        var VolumeWageredTotalO=(data["VolumeWageredTotalO"]===null?0:parseInt(data["VolumeWageredTotalO"]));
        var VolumeWageredTotalU=(data["VolumeWageredTotalU"]===null?0:parseInt(data["VolumeWageredTotalU"]));
        
        var RiskWageredTeam1TotalO=(data["RiskWageredTeam1TotalO"]===null?0:parseInt(data["RiskWageredTeam1TotalO"]));
        var RiskWageredTeam2TotalO=(data["RiskWageredTeam2TotalO"]===null?0:parseInt(data["RiskWageredTeam2TotalO"]));
        var PayoutWageredTeam1TotalO=(data["PayoutWageredTeam1TotalO"]===null?0:parseInt(data["PayoutWageredTeam1TotalO"]));
        var PayoutWageredTeam2TotalO=(data["PayoutWageredTeam2TotalO"]===null?0:parseInt(data["PayoutWageredTeam2TotalO"]));
        var VolumeWageredTeam1TotalO=(data["VolumeWageredTeam1TotalO"]===null?0:parseInt(data["VolumeWageredTeam1TotalO"]));
        var VolumeWageredTeam2TotalO=(data["VolumeWageredTeam2TotalO"]===null?0:parseInt(data["VolumeWageredTeam2TotalO"])); 
        
        var RiskWageredTeam1TotalU=(data["RiskWageredTeam1TotalU"]===null?0:parseInt(data["RiskWageredTeam1TotalU"]));
        var RiskWageredTeam2TotalU=(data["RiskWageredTeam2TotalU"]===null?0:parseInt(data["RiskWageredTeam2TotalU"]));
        var PayoutWageredTeam1TotalU=(data["PayoutWageredTeam1TotalU"]===null?0:parseInt(data["PayoutWageredTeam1TotalU"]));
        var PayoutWageredTeam2TotalU=(data["PayoutWageredTeam2TotalU"]===null?0:parseInt(data["PayoutWageredTeam2TotalU"]));
        var VolumeWageredTeam1TotalU=(data["VolumeWageredTeam1TotalU"]===null?0:parseInt(data["VolumeWageredTeam1TotalU"]));
        var VolumeWageredTeam2TotalU=(data["VolumeWageredTeam2TotalU"]===null?0:parseInt(data["VolumeWageredTeam2TotalU"]));
        
        var RiskWageredMoney3=(data["RiskWageredMoneyDraw"]===null?0:parseInt(data["RiskWageredMoneyDraw"]));
        var PayoutWageredMoney3=(data["PayoutWageredMoneyDraw"]===null?0:parseInt(data["PayoutWageredMoneyDraw"]));
        var VolumeWageredMoney3=(data["VolumeWageredMoneyDraw"]===null?0:parseInt(data["VolumeWageredMoneyDraw"]));
        
    switch (filter){
        case "Profit":
            var toWinS1=0-(PayoutWageredSpread1-RiskWageredSpread1);
            var toWinS2=0-(PayoutWageredSpread2-RiskWageredSpread2);
            
            var toWinML1=0-(PayoutWageredMoney1-RiskWageredMoney1);
            var toWinML2=0-(PayoutWageredMoney2-RiskWageredMoney2);
            
            var toWinT1=0-(PayoutWageredTotalO-RiskWageredTotalO);
            var toWinT2=0-(PayoutWageredTotalU-RiskWageredTotalU);
            var toWinDraw=0-(PayoutWageredMoney3-RiskWageredMoney3);
            
            var toWinTTO1=0-(PayoutWageredTeam1TotalO-RiskWageredTeam1TotalO);
            var toWinTTO2=0-(PayoutWageredTeam2TotalO-RiskWageredTeam2TotalO);
            
            var toWinTTU1=0-(PayoutWageredTeam1TotalU-RiskWageredTeam1TotalU);
            var toWinTTU2=0-(PayoutWageredTeam2TotalU-RiskWageredTeam2TotalU);
            
            
            var profitS1=toWinS1+RiskWageredSpread2;
            var profitS2=toWinS2+RiskWageredSpread1;
            var profitML1=toWinML1+RiskWageredMoney2+RiskWageredMoney3;
            var profitML2=toWinML2+RiskWageredMoney1+RiskWageredMoney3;
            var profitMLDraw=toWinDraw+RiskWageredMoney2+RiskWageredMoney1;
            var profitT1=toWinT1+RiskWageredTotalU;
            var profitT2=toWinT2+RiskWageredTotalO;
            var profitTTO1=toWinTTO1+RiskWageredTeam2TotalO;
            var profitTTO2=toWinTTO2+RiskWageredTeam1TotalO;
            var profitTTU1=toWinTTU1+RiskWageredTeam2TotalU;
            var profitTTU2=toWinTTU2+RiskWageredTeam1TotalU;
            
            values.push((isNaN(profitS1)?"0":profitS1),(isNaN(profitS2)?"0":profitS2),(isNaN(profitML1)?"0":profitML1),(isNaN(profitML2)?"0":profitML2),(isNaN(profitMLDraw)?"0":profitMLDraw),(isNaN(profitT1)?"0":profitT1),(isNaN(profitT2)?"0":profitT2),(isNaN(profitTTO1)?"0":profitTTO1),(isNaN(profitTTO2)?"0":profitTTO2),(isNaN(profitTTU1)?"0":profitTTU1),(isNaN(profitTTU2)?"0":profitTTU2));
            break;
        case "Risk":
            values.push(RiskWageredSpread1,RiskWageredSpread2,RiskWageredMoney1,RiskWageredMoney2,RiskWageredMoney3,RiskWageredTotalO,RiskWageredTotalU,RiskWageredTeam1TotalO,RiskWageredTeam2TotalO,RiskWageredTeam1TotalU,RiskWageredTeam2TotalU);
            break;
        case "Payout":
            values.push(PayoutWageredSpread1,PayoutWageredSpread2,PayoutWageredMoney1,PayoutWageredMoney2,PayoutWageredMoney3,PayoutWageredTotalO,PayoutWageredTotalU,PayoutWageredTeam1TotalO,PayoutWageredTeam2TotalO,PayoutWageredTeam1TotalU,PayoutWageredTeam2TotalU);
            break;
        case "Volume":
            values.push(VolumeWageredSpread1,VolumeWageredSpread2,VolumeWageredMoney1,VolumeWageredMoney2,VolumeWageredMoney3,VolumeWageredTotalO,VolumeWageredTotalU,VolumeWageredTeam1TotalO,VolumeWageredTeam2TotalO,VolumeWageredTeam1TotalU,VolumeWageredTeam2TotalU);
            break;
        case "Count":
            values.push(parseInt(data["CountWageredSpread1"]),parseInt(data["CountWageredSpread2"]),parseInt(data["CountWageredMoney1"]),parseInt(data["CountWageredMoney2"]),parseInt(data["CountWageredMoneyDraw"]),parseInt(data["CountWageredTotalO"]),parseInt(data["CountWageredTotalU"]),parseInt(data["CountWageredTeam1TotalO"]),parseInt(data["CountWageredTeam2TotalO"]),parseInt(data["CountWageredTeam1TotalU"]),parseInt(data["CountWageredTeam2TotalU"]));
            break;
    }
    return values;
}


function openGame(gameNum){
    var status=$("#"+gameNum+"_changeStatusA").find("input").attr("status");
    var rotAway=$("#"+gameNum+"_A td").eq(2).find("input").val();
    var gameDate=$("#"+gameNum+"_A td").eq(1).find("input").val();
    var message;
    var newStatus;
    if(status.trim()==="O"){
        message="close";
        newStatus="H";
    }else{
        message="open";
        newStatus="O";
    }
    $.ajax({
        url: "games/openGame",
        type: 'POST',
        data:{
            "AwayRotNum":rotAway,
            "gameDate":gameDate,
            "status":newStatus,
            "sportType":"",
            "ScheduleDate":"",
            "ScheduleText":"",
            "SportSubType":"",
            "type":1
        },
        success: function (data) {

        }
    });
}

function openAllGames(){
    var selectedNodeId=$("#scheduleTree").jstree("get_selected");
    var sport=unescape($('#scheduleTree #' + selectedNodeId).find("a").attr('sport'));
    var scheduleDateText=unescape($('#scheduleTree #' + selectedNodeId).find("a").attr('scheduledatetext'));
    var subsport=unescape($('#scheduleTree #' + selectedNodeId).find("a").attr('subsport'));
    var rotationnums=$('#scheduleTree #' + selectedNodeId).find("a").attr('rotationnums');
    var type;
    var rotAway=""
    var gameDate="";
    var newStatus="";
    var sportType="";
    var ScheduleDate="";
    var ScheduleText="";
    var SportSubType="";
    if(rotationnums!==undefined&&rotationnums!==""){
        var id=$('#scheduleTree #' + selectedNodeId).find("a").attr('id').split("_");
        openGame(id[0]);
    }else{
        if(sport!==""&&subsport===""&&(scheduleDateText===""||scheduleDateText===undefined)){
            sportType=sport;
            type=2;
        }else if(sport!==""&&subsport===""&&(scheduleDateText!==""||scheduleDateText!==undefined)){
            sportType=sport;
            type=3;
            var scheDT=scheduleDateText.split(" ");
            if(months.indexOf(scheDT[0])===-1){
                ScheduleText=scheduleDateText;
            }else{
                ScheduleDate=scheduleDateText;
            }
        }else if(sport!==''&&subsport!==''&&(scheduleDateText!==""||scheduleDateText!==undefined)){
            sportType=sport;
            SportSubType=subsport;
            type=4;
            var scheDT=scheduleDateText.split(" ");
            if(months.indexOf(scheDT[0])===-1){
                ScheduleText=scheduleDateText;
            }else{
                ScheduleDate=scheduleDateText;
            }
        }
        $.ajax({
            url: "games/openGame",
            type: 'POST',
            data:{
                "AwayRotNum":rotAway,
                "gameDate":gameDate,
                "status":newStatus,
                "sportType":sportType,
                "ScheduleDate":ScheduleDate,
                "ScheduleText":ScheduleText,
                "SportSubType":SportSubType,
                "type":type
            },
            success: function (data) {

            }
        });
    }
}


function openAllProps(){
    var selectedNodeId=$("#scheduleTree").jstree("get_selected");
    
    var correlation=$('#scheduleTree #' + selectedNodeId).find("a").attr('correlation');
    var ct2=$('#scheduleTree #' + selectedNodeId).find("a").attr('contesttype2');
    var ct3=$('#scheduleTree #' + selectedNodeId).find("a").attr('contesttype3');
    if(ct2===undefined)
        ct2="";
    else
        ct2=unescape(ct2);
    if(ct3===undefined)
        ct3="";
    else
        ct3=unescape(ct3);
    var gamedate=$('#scheduleTree #' + selectedNodeId).find("a").attr('gamedate');
    $.ajax({
        url: "games/openAllProps",
        type: 'POST',
        data:{
           "correlation":unescape(correlation),
           "gamedate":gamedate,
           "ContestType2":unescape(ct2),
           "ContestType3":unescape(ct3),
           "Status":"O"
        },
        success: function (data) {

        }
    });
}

function openAllFutureProps(){
    var selectedNodeId=$("#scheduleTree").jstree("get_selected");
    var sport=$('#scheduleTree #' + selectedNodeId).find("a").attr('sport');
    var ct2=$('#scheduleTree #' + selectedNodeId).find("a").attr('contesttype2');
    var ct3=$('#scheduleTree #' + selectedNodeId).find("a").attr('contesttype3');
    $.ajax({
        url: "games/openAllFutureProps",
        type: 'POST',
        data:{
           "sport":sport,
           "ContestType2":ct2,
           "ContestType3":ct3,
           "Status":"O"
           
        },
        success: function (data) {

        }
    });
}