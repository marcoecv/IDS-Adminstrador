var selectedStore="ALINE";
var selectedPeriod=0;
var scheduleMonths = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "", "", "", "", ""];
var client;
var loadDate=getEastertDateTime();


$(document).ready(function () {
    /***********************************************STOMP*************************************************************************/
    if (window.WebSocket) {
        connectToStomp();
    }

    /***********************************************STOMP*************************************************************************/
    
});

function connectToStomp(){
        var dbName=$("#dataBases").val().replace("_","")==="Master"?"CASABLANCA":$("#dataBases").val().replace("_","");
        gameLinesQueue = "/topic/lines."+dbName+"."+selectedSport+"."+selectedStore+"."+selectedPeriod;
        profitQueue = "/topic/profit."+dbName+"."+selectedStore+"."+selectedPeriod;
        gamesQueue = "/topic/"+dbName+"schedule";
        propsQueue = "/topic/"+dbName+"schedule_props";
        propLinesQueue = "/topic/"+dbName+"lines_Props";
        deleteQueue = "/topic/"+dbName+"schedule_delete";
        pausesQueue = "/topic/pauses."+dbName;
        client = Stomp.client(url);

        client.debug = function (str) {
            $("#debug").append(document.createTextNode(str + "\n"));
        };
        client.heartbeat.outgoing = 0;
        client.heartbeat.incoming = 0;
        
        client.connect(login, passcode, function (frame) {
            client.debug("connected to Stomp");
            $('#connect').fadeOut({duration: 'fast'});
            $('#connected').fadeIn();
            
        client.subscribe(deleteQueue, function (message) {
            if(message.body!=="Heartbeat"){
                deletegp(message.body);
            }
        });
            
        client.subscribe(gamesQueue, function (message) {
            if(message.body!=="Heartbeat"){
                updaterGame(message.body);
            }
        });

        client.subscribe(propsQueue, function (message) {
            if(message.body!=="Heartbeat"){
                updateProps(message.body);
            }
        });

        client.subscribe(gameLinesQueue, function (message) {
            if(message.body!=="Heartbeat"){
                updateGameLines(message.body);
            }
        });

        client.subscribe(profitQueue, function (message) {
            if(message.body!=="Heartbeat"){
                updateProfit(message.body);
            }
        });

        client.subscribe(propLinesQueue, function (message) {
            if(message.body!=="Heartbeat"){
                updatePropLine(message.body);
            }
        });
        
        client.subscribe(pausesQueue, function (message) {
            if(message.body!=="Heartbeat"){
                pausesProcessor(message.body);
            }
        });
        
    });
    setInterval(function() {
        client.send(gameLinesQueue, {timeToLive:10000}, "Heartbeat");
        client.send(profitQueue, {timeToLive:10000}, "Heartbeat");
        client.send(gamesQueue, {timeToLive:10000}, "Heartbeat");
        client.send(propsQueue, {timeToLive:10000}, "Heartbeat");
        client.send(propLinesQueue, {timeToLive:10000}, "Heartbeat");
        client.send(deleteQueue, {timeToLive:10000}, "Heartbeat");
        client.send(pausesQueue, {timeToLive:10000}, "Heartbeat");
    }, 30000); 
    
}



function disconnectStomp(){
    client.disconnect();
}


function getEastertDateTime(){
    var d = new Date();
    var now = new Date(); 
    var now_utc = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),  now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
    return now_utc.setHours(d.getHours() - 5);
}

function validateUpdateDate(stringDate){
    return (new Date(stringDate.replace(' ', 'T')).getTime()>loadDate);
}
function updateGameLines(message){
    var obj = JSON.parse(message);
    $.each(obj['results'], function (key, val) {
//        if($("#"+val['Gamenum']+"_A").length>0&&validateUpdateDate(val["LineChangeDateTime"])){
            updateGameLine(val);
//        }
    });
}

function updateGamesInfo(message){
    var obj = JSON.parse(message);
    $.each(obj['results'], function (key, val) {
        if(validateUpdateDate(val["LineChangeDateTime"])){
            updateGame(val);
        }
    });
}
function updaterDataProcess(message) {
    var obj = JSON.parse(message);
    $.each(obj['results'], function (key, val) {
        if (val['WagerType'] === "P"&&validateUpdateDate(val["LineChangeDateTime"])) {
            updateProp(val);
        } else if (val['WagerType'] === "C"&&validateUpdateDate(val["LineChangeDateTime"])) {
            updatePropLine(val);
        } 
    });
}

function updateProfit(message){
    var obj = JSON.parse(message);
    $.each(obj['results'], function (key, val) {
        if(val["AgentID"]!==null&&val["AgentID"]!==""&&val["AgentID"].trim()===$("#lineActionFilter").val().trim()){
            updateProfitGameLines(val);
        }
    });
}

function pausesProcessor(message){
    var obj = JSON.parse(message);
    $.each(obj['results'], function (key, val) {
        updatePauses(val);
    });
}

function updaterGame(message){
    var obj = JSON.parse(message);
    $.each(obj['results'], function (key, val) {
        if(validateUpdateDate(val["lastDateChange"])){
            updateGame(val);
        }
    });
}

function updateProps(message){
    var obj = JSON.parse(message);
    $.each(obj['results'], function (key, val) {
        if(validateUpdateDate(val["lastDateChange"])){
            updateProp(val);
        }
    });
}
function deletegp(message){
    var obj = JSON.parse(message);
    $.each(obj['results'], function (key, val) {
        if(validateUpdateDate(val["LastDateChange"])){
            deleteGameProps(val);
        }
    });
}
function deleteGameProps(val){
    if(val["WagerType"]==="G"){
        var leagueLen = $("#" + val["EventNum"]).parent().parent().find("> ul > li").length;
        var league = $("#" + val["EventNum"]).parent().parent().attr("id");
        var scheduleDateLen = $("#" + league).parent().parent().find("> ul > li").length;
        var scheduleDate = $("#" + league).parent().parent().attr("id");
        $("#scheduleTree").jstree().delete_node("#" + val["EventNum"]);
        if (leagueLen === 1) {
            $("#scheduleTree").jstree().delete_node("#" + league);
        }
        if (scheduleDateLen === 1) {
            $("#scheduleTree").jstree().delete_node("#" + scheduleDate);
        }
        var trAway = $(".scrollabletbody #" + val["EventNum"] + "_A");
        var trHome = $(".scrollabletbody #" + val["EventNum"] + "_H");
        var trDraw = $(".scrollabletbody #" + val["EventNum"] + "_D");
        if (trAway !== undefined)
            $(trAway).remove();
        if (trHome !== undefined)
            $(trHome).remove();
        if (trDraw !== undefined)
            $(trDraw).remove();
    }else if(val["WagerType"]==="P"&&val["Type"]==="C"){
        $("#scheduleTree").jstree().delete_node("#" + val["EventNum"]);
        $('tr[name=' + val["EventNum"] + ']').remove();
    }
}
function updateGame(val) {
    var tree = $("#scheduleTree").jstree(true);
    var sel = tree.get_selected();
    var selId = "" + sel;
    var selectNewNode = selId === val["GameNum"];
    switch (val['CreateStatus']) {
        case "C":
            createNewScheduleGame(val, selectNewNode);
            break;
        case "U":
            $("#scheduleTree").jstree().delete_node(val["GameNum"]);
            if (!selectNewNode) {
                $(".scrollabletbody #" + val["GameNum"] + "_A").remove();
                $(".scrollabletbody #" + val["GameNum"] + "_H").remove();
                $(".scrollabletbody #" + val["GameNum"] + "_D").remove();
            }
            createNewScheduleGame(val, selectNewNode);
            break;
        case "S":
            updateGameStatus2(val["GameNum"],val["Status"]);
            break;
    }
}

function updatePauses(val){
    if(val["Period"]===null){
        updatePauseWithoutPeriod(val);
    }else{
        updatePauseWithPeriod(val);
    }
}

function updatePauseWithoutPeriod(val){
    var trA=$("input[value='"+val["RotNum"]+"']").parent().parent();
    var trH=trA.next();
    
    trA.find(".sp").attr("style","background-color:#ff8484");
    trA.find(".ml").attr("style","background-color:#ff8484");
    trA.find(".tot").attr("style","background-color:#ff8484");
    trA.find(".tta").attr("style","background-color:#ff8484");
    
    trH.find(".sp").attr("style","background-color:#ff8484");
    trH.find(".ml").attr("style","background-color:#ff8484");
    trH.find(".tot").attr("style","background-color:#ff8484");
    trH.find(".tth").attr("style","background-color:#ff8484");
}

function updatePauseWithPeriod(val){
    
}

function updateProp(val) {
    var tree = $("#scheduleTree").jstree(true);
    var sel = tree.get_selected();
    var selId = "" + sel;
    var selectNewNode = selId === val["ContestNum"];
    switch (val['CreateStatus']) {
        case "C":
//            tree.delete_node("#" + val["ContestNum"]);
//            $('tr[name=' + val["ContestNum"] + ']').remove();
            createNewProp(val, selectNewNode);
            break;
        case "U":
//             $("#scheduleTree").jstree().delete_node("#" + val["ContestNum"]);
//            $('tr[name=' + val["ContestNum"] + ']').remove();
            createNewProp(val, selectNewNode);
            break;
    }
}

function updatePropLine(message) {
    var obj = JSON.parse(message);
    $.each(obj['results'], function (key, val) {
        if (val['Store'].trim() === $("#lineFilterStore").val().trim()) {
            var description = $("#" + val['ContestantNum'] + "_line input").val();
            if(description!==undefined){
                switch (val['Status']) {
                    case "I":
                        $("#" + val['ContestantNum'] + "_status").html("<span style='color:green;font-weight:bold'>Circled</span>");
                        break;
                    case 'H':
                        $("#" + val['ContestantNum'] + "_status").html("<span style='color:red;font-weight:bold'>Offline</span>");
                        break;
                    default :
                        $("#" + val['ContestantNum'] + "_status").html("");
                        break;
                }
                var contestanName=val['ContestantName'].trim();
                var ThresholdUnits=val['ThresholdUnits']===null?"":val['ThresholdUnits'].trim();
                var line=processUpdaterData(val['Line'], 't');
                $("#" + val['ContestantNum'] + "_line input").val(contestanName + " " + line + " " + ThresholdUnits);
                $("#" + val['ContestantNum'] + "_price input").val(processData(val['Money1']));
            }
        }
    });
}


function updateGameLine(val) {
    if($("#" + val['Gamenum'] + "_team_A input").val()!==undefined){
        var team1 = $("#" + val['Gamenum'] + "_team_A input").val().trim();
        var team2 = $("#" + val['Gamenum'] + "_team_H input").val().trim();
    //    updateGameStatus(val['Gamenum'],val["Status"]);
        switch (val['WagerType']) {
            case "S":
                if (val["Line"] === null) {
                    $("#" + val['Gamenum'] + "_A_sp input").val("");
                    $("#" + val['Gamenum'] + "_H_sp input").val("");
                } else {
                    var team1Base=team1.split("|");
                    var team2Base=team2.split("|");
                    if(team1Base.length>1||team2Base.length>1){
                        team1=team1Base[0].trim();
                        team2=team2Base[0].trim();
                    }
                    if (team1!==undefined&&team1 === val['FavoredTeamID'].trim()) {
                        $("#" + val['Gamenum'] + "_A_sp input").val(processUpdaterData(val['Line'], 's') + " " + processData(compareValues(val['Money1'], val['Money2'])));
                        $("#" + val['Gamenum'] + "_H_sp input").val(processData(compareValues(val['Money2'], val['Money1'])));
                    } else if (team2!==undefined&&team2.trim() === val['FavoredTeamID'].trim()) {
                        $("#" + val['Gamenum'] + "_A_sp input").val(processData(compareValues(val['Money1'], val['Money2'])));
                        $("#" + val['Gamenum'] + "_H_sp input").val(processUpdaterData(val['Line']) + " " + processData(compareValues(val['Money2'], val['Money1'])));
                    }
                }
                break;
            case "M":
                if (val["Money1"] === val["Money2"] === null) {
                    $("#" + val['Gamenum'] + "_A_ml input").val("");
                    $("#" + val['Gamenum'] + "_H_ml input").val("");
                    $("#" + val['Gamenum'] + "_D_ml input").val("");
                } else {
                    $("#" + val['Gamenum'] + "_A_ml input").val(processData(val['Money1']));
                    $("#" + val['Gamenum'] + "_H_ml input").val(processData(val['Money2']));
                    $("#" + val['Gamenum'] + "_D_ml input").val(processData(val['MoneyDraw']));
                }
                break;
            case "L":
                if (val['Line'] === null) {
                    $("#" + val['Gamenum'] + "_A_t input").val("");
                    $("#" + val['Gamenum'] + "_H_t input").val("");
                } else {
                    $("#" + val['Gamenum'] + "_A_t input").val(processUpdaterData(val['Line'], 't') + " " + processData(val['Money1']));
                    $("#" + val['Gamenum'] + "_H_t input").val(processData(val['Money2']));
                }
                break;
            case "E":
                if (val['Line'] === null) {
                    $("#" + val['Gamenum'] + "_A_tt input").val("");
                    $("#" + val['Gamenum'] + "_A_tto input").val("");
                    $("#" + val['Gamenum'] + "_A_ttu input").val("");
                    $("#" + val['Gamenum'] + "_H_tt input").val("");
                    $("#" + val['Gamenum'] + "_H_tto input").val("");
                    $("#" + val['Gamenum'] + "_H_ttu input").val("");
                } else {
                    if ("1" === val['TeamActionLinePos'].trim()) {
                        $("#" + val['Gamenum'] + "_A_tt input").val(processUpdaterData(val['Line'], 't'));
                        $("#" + val['Gamenum'] + "_A_tto input").val(processData(val['Money1']));
                        $("#" + val['Gamenum'] + "_A_ttu input").val(processData(val['Money2']));
                    } else if ("2" === val['TeamActionLinePos'].trim()) {
                        $("#" + val['Gamenum'] + "_H_tt input").val(processUpdaterData(val['Line'], 't'));
                        $("#" + val['Gamenum'] + "_H_tto input").val(processData(val['Money1']));
                        $("#" + val['Gamenum'] + "_H_ttu input").val(processData(val['Money2']));
                    }
                }
                break;
        }
    }
}

function updateGameStatus2(GameNum,Status){
    switch (Status) {
        case "I":
            $("#" + GameNum + "_status").find("input").remove();
            $("#" + GameNum + "_status").append($("<input></input>").attr(
            {
                "type": "text", 
                "value": "Circled", 
                "class": "gr focusedStyle",
                "style":"color:green;font-weight:bold",
                "readonly": true, 
                "position": 4, 
                "onkeypress": "inputLineTableEnterKey('',''," + GameNum + ",'',this)"
            })); 
            break;
        case 'H':
            $("#" + GameNum + "_changeStatusA").find("input").attr("status",Status);
            $("#" + GameNum + "_changeStatusH").find("input").attr("status",Status);
            $("#" + GameNum + "_changeStatusD").find("input").attr("status",Status);
            $("#" + GameNum + "_status").find("input").remove();
            $("#" + GameNum + "_status").append($("<input></input>").attr(
            {
                "type": "text", 
                "value": "Offline", 
                "class": "gr focusedStyle",
                "style":"color:red;font-weight:bold",
                "readonly": true, 
                "position": 4, 
                "onkeypress":  "inputLineTableEnterKey('',''," + GameNum + ",'',this)"
            })); 
            break;
        default :
            $("#" + GameNum + "_changeStatusA").find("input").attr("status",Status);
            $("#" + GameNum + "_changeStatusH").find("input").attr("status",Status);
            $("#" + GameNum + "_changeStatusD").find("input").attr("status",Status);
            $("#" + GameNum + "_status").find("input").remove();
            $("#" + GameNum + "_status").append($("<input></input>").attr(
            {
                "type": "text", 
                "value": "", 
                "class": "gr focusedStyle",
                "style":"",
                "readonly": true, 
                "position": 4, 
                "onkeypress":  "inputLineTableEnterKey('',''," + GameNum + ",'',this)"
            })); 
            break;
    }
}
function createNewScheduleGame(val, nodeIsSelected) {
    var tree = $("#scheduleTree").jstree(true);
    var openNodes = $('.jstree-open');
    $.each(openNodes, function (key, val2) {//por cada nodo abierto en el arbol
        if ($(val2).attr("id").trim() === val["SportType"].trim().replace(" ", "_")) {//pregunta si el nodo actual es el nodo que tiene el deporte al que pertenece la actualizacion
            var SportSubType = val["SportSubType"]; //setea variable SportSubType
            var dateNode = $("#" + val["SportType"].trim().replace(" ", "_") + ".jstree-open").find("[subsport='" + escape(SportSubType.trim()) + "']");//busca si en los nodos abiertos esta el subdeporte al que pertenece el update
            if ($(dateNode).attr("id") !== undefined) {//si existe el subdeporte de la actualizacion y esta abierto
                var nodeId = $(dateNode).parent().attr("id");//saca id del padre
                var scheduleTextDate = "";
                if (val['ScheduleText'] === null) {
                    scheduleTextDate = (val['ScheduleDate'].trim());
                } else {
                    scheduleTextDate = (val['ScheduleText'].trim());
                }
                var leagueNode = $(".jstree-open").find("[scheduledatetext='"+scheduleTextDate+"']");//busca si dentro de los nodos abiertos esta la liga del update
                
                if ($(leagueNode).attr("id") !== undefined) {//si la liga ya existe y esta abierta
                    var sel = $("#scheduleTree").jstree().get_selected();//selected se usa para saber si se deben recargar las lineas de la matriz abajo
                    var DateArray = val["GameDateTime"].split(" ");
                    var gameTime = DateArray[1].split(":");
                    var gameDate = DateArray[0].split("-");
                    var scheduleDate = val["ScheduleDate"] === null ? "" : val["ScheduleDate"].trim();
                    var scheduleText = val["ScheduleText"] === null ? "" : val["ScheduleText"].trim();
                    var node = new Object();
                    node.id = val['GameNum'];
                    node.text = "<span><b>(#" + val['Team1RotNum'] + ")    </b>" + val['Team1ID'] + "    vs    <b>(#" + val['Team2RotNum'] + ")</b>    " + val['Team2ID'] + "      " + gameDate[1] + "/" + gameDate[2] + "/" + gameDate[0].replace("20", "") + " " + gameTime[0] + ":" + gameTime[1] + "</span>";
                    node.a_attr = {
                        "isgame": true,
                        "rotationNums": val['Team1RotNum'] + "_" + val['Team2RotNum'],
                        "sport": val["SportType"].trim().replace("_", " "),
                        "subSport": val['SportSubType'].trim(),
                        "scheduleDate": (scheduleDate),
                        "scheduleText": (scheduleText),
                        "operacion": 4,
                        "correlation": (val['CorrelationID'].trim()),
                        "onclick": "createPropFolder('" + val['GameNum'] + "')"
                    };//Crea el nodo

                    tree.create_node($(leagueNode), node, getGemeOrderPosition(leagueNode, val['Team1RotNum']));//inserta el nodo en el arbol

                    if ($("#" + sel).find("a").attr("none") === "true") {//si la liga esta seleccionada agrega el juego a la matriz de lineas
                        var tr = getRowPositionToInsert(val["Team1RotNum"]);//inserta el juego ordenado por rotation
                        addGameLine(val["GameNum"], "N", true, tr, true); //agrega lineas
                    } else if (nodeIsSelected) {//si es un cambio de fecha en el juego
                        var tmpDate = val["GameDateTime"].split(" ");
                        var myDate = tmpDate[0];
                        myDate = myDate.split("-");
                        var time = tmpDate[1].split(":");
                        var newDate = myDate[1] + "/" + myDate[2] + "/" + myDate[0].replace("20", "");
                        $("#" + val["GameNum"] + "_A").find("input").eq(1).val(newDate);
                        $("#" + val["GameNum"] + "_H").find("input").eq(1).val(time[0] + ":" + time[1]);
                        var updateAway=val["SportSubType"].trim()==="MLB"?val["Team1ID"]+"  +  "+val["ListedPitcher1"]:val["Team1ID"];
                        var updateHome=val["SportSubType"].trim()==="MLB"?val["Team2ID"]+"  +  "+val["ListedPitcher2"]:val["Team2ID"];
                        $("#" + val["GameNum"] + "_A").find("input").eq(3).val(updateAway);
                        $("#" + val["GameNum"] + "_H").find("input").eq(3).val(updateHome);
                        updateGameStatus2(val['Gamenum'],val["Status"]);
                        
                        jQuery("#scheduleTree").jstree("select_node", $("#" + val["GameNum"]));
                    }
                } else {//si la liga del update no existe
                    var cont = $("#"+val['SportType'].trim().replace(" ", "_")+" .jstree-node").find("[subsport='" + val['SportSubType'].trim().replace(" ", "_") + "']").length - 2;
                    var node = new Object();
                    var nodeID = nodeId + "_" + val['SportSubType'].trim().replace(" ", "_")+"_"+cont;
                    node.id = nodeID;
                    node.text = (scheduleTextDate)
                    node.a_attr = {
                        "issport": true,
                        "sport": (val['SportType'].trim()),
                        "subSport": (val['SportSubType'].trim()),
                        "scheduleDateText": scheduleTextDate,
                        "operacion": 3,
                        "onclick": 'loadscheduleGames("' + nodeID + '")'
                    };

                    tree.create_node("#" + nodeId, node, "last");
                    var sel = tree.get_selected();
                    if ("#" + sel === "#" + val["SportType"].trim()) {
                    }
                    //AGREGADO DE NUEVAS LINEAS
                }
            } else {//Si el subdeporte no existe
                var tmpDate = val["GameDateTime"].split(" ");
                var myDate = tmpDate[0];
                myDate = myDate.split("-");
                var newDate = myDate[1] + "/" + myDate[2] + "/" + myDate[0];
                var ts = new Date(newDate).getTime();
                var parentID=$("#"+val['SportType'].trim().replace(" ", "_"));
                var id = val['SportType'].trim().replace(" ", "_")+"_"+val["SportSubType"].trim().replace(" ", "_");
                var node = new Object();
                node.id = id;
                node.text = val["SportSubType"].trim();
                node.a_attr = {
                    "issubsport": true,
                    "sport": val['SportType'].trim(),
                    "subSport": val["SportSubType"].trim(),
                    "date": "",
                    "operacion": 2,
                    "scheduleDateText":"",
                    "onclick": 'loadscheduleLeague("' + id + '")'
                };
                tree.create_node(parentID, node,0);
            }
        }
    });
}


function getGemeOrderPosition(leagueNode, rotAwayNum) {
    var childNodesArray = $(leagueNode).find(".jstree-leaf");
    for (var i = 0; i < childNodesArray.length; i++) {
        var rotNums = $(childNodesArray[i]).find("a").attr("rotationnums").split("_");
        var rotAway = rotNums[0];
        if (parseInt(rotAway) > parseInt(rotAwayNum)) {
            return i;
        }
    }
    return childNodesArray.length;
}

function getSelFocusNodePos(correlation) {
    var foldersArray = $(".jstree-node:not(.jstree-leaf) > [correlation='" + correlation + "']");
    var sel = $("#scheduleTree").jstree().get_selected();
    var pos = -1;
    for (var i = 0; i < foldersArray.length; i++) {
        if ("" + sel === foldersArray.eq(i).parent().attr("id")) {
            pos = i;
        }
    }
    return pos;
}


function createNewProp(val, select) {
    var tree = $("#scheduleTree").jstree(true);
    var sel = $("#scheduleTree").jstree().get_selected();
    if (val["CorrelationID"] !== null) {
        var principalNode = $(".jstree-open").find("[correlation='" + escape(val["CorrelationID"].trim()) + "']").parent().eq(1).attr("id");
        if (val["ContestType2"].trim() === ".") {
            var node = new Object();
            node.id = val['ContestNum'];
            node.text = "<b>" + val['ContestDesc'].trim() + "</b>";
            node.a_attr = {
                "isProp": true,
                "ContestNum": val['ContestNum'],
                "correlation": escape(val["CorrelationID"].trim()),
                "operacion": 4,
                "ContestType": escape(val['ContestType'].trim()),
                "ContestType2": escape(val['ContestType2'].trim()),
                "ContestType3": escape(val['ContestType3'].trim()),
                "onclick": 'loadPropLines("4","","' + val['ContestNum'].trim() + '","","","")'
            };
            tree.create_node("#" + principalNode, node, "first");

            var selectedNodePos = getSelFocusNodePos(escape(val["CorrelationID"].trim()));

            if (selectedNodePos === 1)
                loadPropLines(4, "", val["ContestNum"].trim(), "", "", "", true);


        } else {
            var nodesArray = ($(".jstree-open").find("[correlation='" + escape(val["CorrelationID"].trim()) + "']"));
            var broNodes = 0;
            var parentNode = "";
            if (val["ContestType3"].trim() === ".") {
                for (var i = 0; i < nodesArray.length; i++) {
                    if ($(nodesArray).eq(i).attr("ispropfolder") === "true" && $(nodesArray).eq(i).attr("contesttype2") !== undefined) {
                        broNodes++;
                    }
                    if ($(nodesArray).eq(i).attr("ispropfolder") === "true" && $(nodesArray).eq(i).attr("contesttype2") === escape(val['ContestType2'].trim()) && $(nodesArray).eq(i).attr("contesttype3") === undefined) {
                        parentNode = $(nodesArray[i]).parent().attr("id");
                    }
                }
                if (parentNode === "") {
                    if ($("#" + principalNode).attr("aria-expanded") !== undefined && $("#" + principalNode).attr("aria-expanded") === "true") {
                        var node = new Object();
                        node.id = escape(principalNode + "_" + broNodes);
                        node.text = val['ContestType2'].trim();
                        node.a_attr = {
                            "isPropFolder": true,
                            "ContestType": escape(val['ContestType'].trim()),
                            "ContestType2": escape(val['ContestType2'].trim()),
                            "operacion": 2,
                            "correlation": escape(val["CorrelationID"].trim()),
                            "onclick": 'loadPropFolderL2("' + escape(principalNode + "_" + broNodes) + '")'
                        };
                        tree.create_node("#" + principalNode, node, "last");
                    }
                    var selectedNodePos = getSelFocusNodePos(escape(val["CorrelationID"].trim()));
                    if (selectedNodePos === 1 || selectedNodePos === 2)
                        loadPropLines(4, "", val["ContestNum"].trim(), "", "", "", true);
                } else {
                    var node = new Object();
                    node.id = val['ContestNum'];
                    node.text = "<b>" + val['ContestDesc'].trim() + "</b>";
                    node.a_attr = {
                        "isProp": true,
                        "ContestNum": val['ContestNum'],
                        "correlation": escape(val["CorrelationID"].trim()),
                        "operacion": 4,
                        "ContestType": escape(val['ContestType'].trim()),
                        "ContestType2": escape(val['ContestType2'].trim()),
                        "ContestType3": escape(val['ContestType3'].trim()),
                        "onclick": 'loadPropLines("4","","' + val['ContestNum'].trim() + '","","","")'
                    };
                    tree.create_node("#" + parentNode, node, "first");
                    var selectedNodePos = getSelFocusNodePos(escape(val["CorrelationID"].trim()));
                    if (selectedNodePos === 1 || selectedNodePos === 2)
                        loadPropLines(4, "", val["ContestNum"].trim(), "", "", "", true);
                }
            } else {
                for (var i = 0; i < nodesArray.length; i++) {
                    if ($(nodesArray).eq(i).attr("ispropfolder") === "true" && $(nodesArray).eq(i).attr("contesttype2") === escape(val['ContestType2'].trim()) && $(nodesArray).eq(i).attr("contesttype3") === escape(val['ContestType3'].trim())) {
                        parentNode = $(nodesArray[i]).parent().attr("id");
                    }
                }
                if (parentNode === "") {
                    var parentIdNode;
                    for (var i = 0; i < nodesArray.length; i++) {
                        if ($(nodesArray).eq(i).attr("ispropfolder") === "true" && $(nodesArray).eq(i).attr("contesttype2") === escape(val['ContestType2'].trim())) {
                            broNodes++;
                        }
                    }
                    for (var i = 0; i < nodesArray.length; i++) {
                        if ($(nodesArray).eq(i).attr("ispropfolder") === "true" && $(nodesArray).eq(i).attr("contesttype2") === escape(val['ContestType2'].trim()) && $(nodesArray).eq(i).attr("contesttype3") === undefined) {
                            parentIdNode = $(nodesArray[i]).parent().attr("id");
                        }
                    }
                    if ($("#" + parentIdNode).attr("aria-expanded") !== undefined && $("#" + parentIdNode).attr("aria-expanded") === "true") {
                        var node = new Object();
                        node.id = escape(parentIdNode + "_" + broNodes);
                        node.text = val['ContestType3'].trim();
                        node.a_attr = {
                            "isPropFolder": true,
                            "ContestType": escape(val['ContestType'].trim()),
                            "ContestType2": escape(val['ContestType2'].trim()),
                            "ContestType3": escape(val['ContestType3'].trim()),
                            "operacion": 3,
                            "correlation": escape(val["CorrelationID"].trim()),
                            "onclick": 'loadPropL3("' + escape(parentIdNode + "_" + broNodes) + '")'
                        };

                        tree.create_node("#" + parentIdNode, node, "last");
                    }
                    var selectedNodePos = getSelFocusNodePos(escape(val["CorrelationID"].trim()));
                    if (selectedNodePos === 1 || selectedNodePos === 2 || selectedNodePos === 3)
                        loadPropLines(4, "", val["ContestNum"].trim(), "", "", "", true);
                } else {
                    var node = new Object();
                    node.id = val['ContestNum'];
                    node.text = "<b>" + val['ContestDesc'].trim() + "</b>";
                    node.a_attr = {
                        "isProp": true,
                        "ContestNum": val['ContestNum'],
                        "correlation": escape(val["CorrelationID"].trim()),
                        "operacion": 4,
                        "ContestType": escape(val['ContestType'].trim()),
                        "ContestType2": escape(val['ContestType2'].trim()),
                        "ContestType3": escape(val['ContestType3'].trim()),
                        "onclick": 'loadPropLines("4","","' + val['ContestNum'].trim() + '","","","")'
                    };
                    tree.create_node("#" + parentNode, node, "first");
                    if (select) {
                        jQuery("#scheduleTree").jstree("select_node", $("#" + val["ContestNum"]));
                    }
                    var selectedNodePos = getSelFocusNodePos(escape(val["CorrelationID"].trim()));
                    if (selectedNodePos === 1 || selectedNodePos === 2 || selectedNodePos === 3)
                        loadPropLines(4, "", val["ContestNum"].trim(), "", "", "", true);
                }
            }
        }
    } else {
        var arrayContestType = val["ContestType"].split("-");
        if (arrayContestType.length > 1 && arrayContestType[1].trim() === "FUTURES") {//SI EL PROP ES FUTURE
            var sportType = arrayContestType[2].trim();
            var expanded = $("#" + sportType + "_futureProps").attr("aria-expanded");
            var selected = $("#" + sportType + "_futureProps").attr("aria-selected");

            if (expanded === "true" || selected === "true") {
                updateFutureProp(val,sportType)
            }
        } else {//ES EXTERNAL PROP
            updateExternalProp(val);
        }
    }
}


function getExternalPropsFolders(contestType, contestType2, contestType3) {
    var contestTypeArray = $(".jstree-node").find("[contesttype='" + contestType + "']");
    for (var i = 0; i < contestTypeArray.length; i++) {
        var ct2 = $(contestTypeArray.eq(i)).attr("contesttype2");
        var ct3 = $(contestTypeArray.eq(i)).attr("contesttype3");
        if (contestType3 === "") {
            if (unescape(ct2) === contestType2 && ct3 === undefined) {
                return $(contestTypeArray.eq(i)).parent().attr("id");
            }
        } else {
            if (unescape(ct2) === contestType2.trim() && unescape(ct3) === contestType3.trim()) {
                return $(contestTypeArray.eq(i)).parent().attr("id");
            }
        }
    }
}


function getFuturePropsFolders(contestType, contestType2, contestType3) {
    var contestTypeArray = $("#"+contestType+" .jstree-node").find("a");
    for (var i = 0; i < contestTypeArray.length; i++) {
        var ct2 = $(contestTypeArray.eq(i)).attr("contesttype2");
        var ct3 = $(contestTypeArray.eq(i)).attr("contesttype3");
        if (contestType3 === "") {
            if (unescape(ct2) === contestType2 && ct3 === undefined) {
                return $(contestTypeArray.eq(i)).parent().attr("id");
            }
        } else {
            if (unescape(ct2) === contestType2.trim() && unescape(ct3) === contestType3.trim()) {
                return $(contestTypeArray.eq(i)).parent().attr("id");
            }
        }
    }
}
function updateExternalProp(val) {
    var tree = $("#scheduleTree").jstree(true);
    var contestType = val["ContestType"].trim().replace(".", "");
    var parentNodeId = $("#" + contestType);
    if (parentNodeId.attr('id') !== undefined) {//Existe carpeta con contesttype1
        var expanded = $("#" + contestType).attr("aria-expanded");
        var selected = $("#" + contestType).attr("aria-selected");
        if (expanded === "true" || selected === "true") {
            var contestType2 = val["ContestType2"].trim();
            if (contestType2 !== ".") {
                var level2NodeId = getExternalPropsFolders(contestType, val['ContestType2'].trim(), "");
                if (level2NodeId !== undefined) {//Existe carpeta con contesttype2
                    var expanded2 = $("#" + level2NodeId).attr("aria-expanded");
                    var selected2 = $("#" + level2NodeId).attr("aria-selected");
                    if (expanded2 === "true" || selected2 === "true") {
                        var contestType3 = val["ContestType3"].trim();
                        if (contestType3 !== ".") {
                            var level3NodeId = getExternalPropsFolders(contestType, val['ContestType2'].trim(), val['ContestType3'].trim())
                            if (level3NodeId !== undefined) {//Existe carpeta con contesttype 3
                                var expanded3 = $("#" + level3NodeId).attr("aria-expanded");
                                var selected3 = $("#" + level3NodeId).attr("aria-selected");
                                if (expanded3 === "true" || selected3 === "true") {
                                    var node = new Object();
                                    node.id = val['ContestNum'];
                                    node.text = "<b>" + val['ContestDesc'].trim() + "</b>";
                                    node.a_attr = {
                                        "isProp": true,
                                        "ContestNum": val['ContestNum'],
                                        "operacion": 4,
                                        "ContestType": escape(val['ContestType'].trim()),
                                        "ContestType2": escape(val['ContestType2'].trim()),
                                        "ContestType3": escape(val['ContestType3'].trim()),
                                        "onclick": 'loadPropLines("4","","' + val['ContestNum'].trim() + '","","","")'
                                    };
                                    tree.create_node("#" + level3NodeId, node, "last");
                                }
                            } else {
                                var node = new Object();
                                node.id = escape(contestType + "_" + contestType2);
                                node.text = contestType3.trim();
                                node.a_attr = {
                                    "ispropexternalfolder": true,
                                    "sport": escape(contestType.trim()),
                                    "ContestType": escape(contestType.trim()),
                                    "ContestType2": escape(contestType2.trim()),
                                    "ContestType3": escape(contestType3.trim()),
                                    "operacion": 3,
                                    "onclick": 'loadExternalFuturePropL4("' + level3NodeId + '")'
                                };
                                tree.create_node("#" + level2NodeId, node, "last");
                            }
                        } else {
                            var node = new Object();
                            node.id = val['ContestNum'];
                            node.text = "<b>" + val['ContestDesc'].trim() + "</b>";
                            node.a_attr = {
                                "isProp": true,
                                "ContestNum": val['ContestNum'],
                                "operacion": 4,
                                "ContestType": escape(val['ContestType'].trim()),
                                "ContestType2": escape(val['ContestType2'].trim()),
                                "ContestType3": escape(val['ContestType3'].trim()),
                                "onclick": 'loadPropLines("4","","' + val['ContestNum'].trim() + '","","","")'
                            };
                            tree.create_node("#" + level2NodeId, node, "first");
                        }
                    }
                } else {
                    var node = new Object();
                    node.id = escape(contestType + "_" + contestType2);
                    node.text = contestType2.trim();
                    node.a_attr = {
                        "ispropexternalfolder": true,
                        "sport": escape(contestType.trim()),
                        "ContestType": escape(contestType.trim()),
                        "ContestType2": escape(contestType2.trim()),
                        "operacion": 2,
                        "onclick": 'loadExternalFuturePropsL3("' + level2NodeId + '")'
                    };

                    tree.create_node(parentNodeId, node, "last");
                }
            } else {
                var node = new Object();
                node.id = val['ContestNum'];
                node.text = "<b>" + val['ContestDesc'].trim() + "</b>";
                node.a_attr = {
                    "isProp": true,
                    "ContestNum": val['ContestNum'],
                    "operacion": 4,
                    "ContestType": escape(val['ContestType'].trim()),
                    "ContestType2": escape(val['ContestType2'].trim()),
                    "ContestType3": escape(val['ContestType3'].trim()),
                    "onclick": 'loadPropLines("4","","' + val['ContestNum'].trim() + '","","","")'
                };
                tree.create_node(parentNodeId, node, "first");
            }
        }
    } else {
        var node = new Object();
        node.id = escape(contestType);
        node.text = contestType.trim();
        node.a_attr = {
            "ispropexternalfolder": true,
            "sport": escape(contestType.trim()),
            "ContestType": escape(contestType.trim()),
            "operacion": 1,
            "onclick": 'loadExternalFuturePropsL2("' + escape(contestType.trim()) + '")'
        };
        $("#scheduleTree").jstree('create_node', "#", node, "last");
    }
}


function updateFutureProp(val,sportType) {
    var tree = $("#scheduleTree").jstree(true);
    var contestType = sportType.trim()+"_futureProps";
    var parentNodeId = $("#" + sportType+"_futureProps");
    if (parentNodeId.attr('id') !== undefined) {//Existe carpeta con contesttype1
        var expanded = $("#" + contestType).attr("aria-expanded");
        var selected = $("#" + contestType).attr("aria-selected");
        if (expanded === "true" || selected === "true") {
            var contestType2 = val["ContestType2"].trim();
            if (contestType2 !== ".") {
                var level2NodeId = getFuturePropsFolders(contestType, val['ContestType2'].trim(), "");
                if (level2NodeId !== undefined) {//Existe carpeta con contesttype2
                    var expanded2 = $("#" + level2NodeId).attr("aria-expanded");
                    var selected2 = $("#" + level2NodeId).attr("aria-selected");
                    if (expanded2 === "true" || selected2 === "true") {
                        var contestType3 = val["ContestType3"].trim();
                        if (contestType3 !== ".") {
                            var level3NodeId = getFuturePropsFolders(contestType, val['ContestType2'].trim(), val['ContestType3'].trim());
                            if (level3NodeId !== undefined) {//Existe carpeta con contesttype 3
                                var expanded3 = $("#" + level3NodeId).attr("aria-expanded");
                                var selected3 = $("#" + level3NodeId).attr("aria-selected");
                                if (expanded3 === "true" || selected3 === "true") {
                                    var node = new Object();
                                    node.id = val['ContestNum'];
                                    node.text = "<b>" + val['ContestDesc'].trim() + "</b>";
                                    node.a_attr = {
                                        "isProp": true,
                                        "ContestNum": val['ContestNum'],
                                        "operacion": 4,
                                        "ContestType": escape(val['ContestType'].trim()),
                                        "ContestType2": escape(val['ContestType2'].trim()),
                                        "ContestType3": escape(val['ContestType3'].trim()),
                                        "onclick": 'loadPropLines("4","","' + val['ContestNum'].trim() + '","","","")'
                                    };
                                    tree.create_node("#" + level3NodeId, node, "last");
                                }
                            } else {
                                var node = new Object();
                                node.id = contestType + "_"+$("#"+contestType+" .jstree-node").length;
                                node.text = contestType3.trim();
                                node.a_attr = {
                                    "isFutureProps": true,
                                    "sport": escape(sportType.trim()),
                                    "ContestType": escape(contestType.trim()),
                                    "ContestType2": escape(contestType2.trim()),
                                    "ContestType3": escape(contestType3.trim()),
                                    "operacion": 3,
                                    "onclick": 'loadFuturePropsL3("' + contestType + "_"+$("#"+contestType+" .jstree-node").length + '")'
                                };
                                tree.create_node("#" + level2NodeId, node, "last");
                            }
                        } else {
                            var node = new Object();
                            node.id = val['ContestNum'];
                            node.text = "<b>" + val['ContestDesc'].trim() + "</b>";
                            node.a_attr = {
                                "isProp": true,
                                "ContestNum": val['ContestNum'],
                                "operacion": 4,
                                "ContestType": escape(val['ContestType'].trim()),
                                "ContestType2": escape(val['ContestType2'].trim()),
                                "ContestType3": escape(val['ContestType3'].trim()),
                                "onclick": 'loadPropLines("4","","' + val['ContestNum'].trim() + '","","","")'
                            };
                            tree.create_node("#" + level2NodeId, node, "first");
                        }
                    }
                } else {
                    var node = new Object();
                    node.id = contestType+"_"+$("#"+contestType+" .jstree-node").length;
                    node.text = contestType2.trim();
                    node.a_attr = {
                        "isFutureProps": true,
                        "sport": escape(sportType.trim()),
                        "ContestType": escape(contestType.trim()),
                        "ContestType2": escape(contestType2.trim()),
                        "operacion": 2,
                        "onclick": 'loadFuturePropsL2("' + contestType+"_"+$("#"+contestType+" .jstree-node").length + '")'
                    };

                    tree.create_node(parentNodeId, node, "last");
                }
            } else {
                var node = new Object();
                node.id = val['ContestNum'];
                node.text = "<b>" + val['ContestDesc'].trim() + "</b>";
                node.a_attr = {
                    "isProp": true,
                    "ContestNum": val['ContestNum'],
                    "operacion": 4,
                    "ContestType": escape(val['ContestType'].trim()),
                    "ContestType2": escape(val['ContestType2'].trim()),
                    "ContestType3": escape(val['ContestType3'].trim()),
                    "onclick": 'loadPropLines("4","","' + val['ContestNum'].trim() + '","","","")'
                };
                tree.create_node(parentNodeId, node, "first");
            }
        }
    } else {
        var node = new Object();
        node.id = escape(contestType);
        node.text = contestType.trim();
        node.a_attr = {
            "ispropexternalfolder": true,
            "sport": escape(sportType.trim()),
            "ContestType": escape(contestType.trim()),
            "operacion": 1,
            "onclick": 'loadFutureProps("' + escape(contestType.trim()) + '")'
        };
        $("#scheduleTree").jstree('create_node', "#", node, "last");
    }
}


