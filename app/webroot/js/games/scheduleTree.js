
function loadSchedule() {
    $('#scheduleTree').jstree("destroy").empty();
    $.ajax({
        url: 'games/schedule',
        type: 'POST',
        data: {'operation': 1},
        success: function (msg) {
            var obj = $.parseJSON(msg);
            var scheduleData = [];
            $.each(obj, function (key, value) {
                var node = new Object();
                var id = value['SportType'].trim();
                node.id = id.replace(" ", "_");
                node.text = value['SportType'].trim();
                if (value['Type2'] === "Game") {
                    node.a_attr = {
                        "type": value['Type2'].trim(),
                        "issport":true,
                        "sport": (value['SportType'].trim().replace(" ", "_")),
                        "subSport": "",
                        "scheduleDateText": "",
                        "operacion": 1,
                        "onclick": "loadscheduleSubSport('" + id.replace(" ", "_") + "')"
                    };
                } else if (value['Type2'] === "Prop") {
                    node.a_attr = {
                        "type": value['Type2'].trim(),
                        "isPropExternalFolder": true,
                        "sport": (value['SportType'].trim()),
                        "ContestType": ("." + value['SportType'].trim()),
                        "subSport": "",
                        "scheduleDateText": "",
                        "operacion": 1,
                        "onclick": "loadExternalFuturePropsL2('" + id + "')"
                    };
                }
                scheduleData.push(node);
            });



            $('#scheduleTree').jstree({
                "core": {
                    "animation": 0,
                    "check_callback": true,
                    "themes": {
                        "stripes": true
                    },
                    'data': eval(scheduleData)
                },
                "types": {
                    "#": {
                        "max_depth": 8,
                        "valid_children": ["default"]
                    },
                    "default": {
                        "valid_children": ["default", "file"]
                    },
                    "file": {
                        "icon": "glyphicon glyphicon-play",
                        "valid_children": []
                    }
                },
                "contextmenu": {
                    "items": customMenu
                },
                "plugins": ["contextmenu", "dnd", "search", "state", "types", "wholerow"]
            });
        }
    });
    $('#scheduleTree').jstree('refresh');
}

function loadscheduleSubSport(id) {
    clearFocusedElement();
    enableStatusPeriod(true);
    selectedType = "isGame";
    var tree = $("#scheduleTree").jstree(true);
    tree.deselect_all(true);
    jQuery("#scheduleTree").jstree("select_node", $("#" + id));
    tree.open_node($("#" + id));
    var node = $('#scheduleTree #' + id).find("li");
    
    var container = $('#scheduleTree'),
    scrollTo = $('#'+id);
    container.animate({
        scrollTop: scrollTo.offset().top - container.offset().top + container.scrollTop()
    });
    
    var type = $('#scheduleTree #' + id).find("a").attr('type');
    $.each(node, function (key, value) {
        tree.delete_node($(value));
    });
    var newID = id.replace("_", " ");
    $.ajax({
        url: "games/schedule",
        type: 'POST',
        data: {"operation": 2, "sportType": newID},
        success: function (data) {
            var obj = $.parseJSON(data);
            $.each(obj, function (key, value) {
                var date=value['timestamp']===undefined?"0":value['timestamp'].trim();
                var node = new Object();
                node.id = id + "_"+value['SportSubType'].trim().replace(" ","_");
                node.text = value['SportSubType'].trim();
                node.a_attr = {
                    "issubsport": true,
                    "sport": (id.trim()),
                    "subSport": (value['SportSubType'].trim()),
                    "date":date,
                    "operacion": 2,
                    "scheduleDateText": '',
                    "onclick": 'loadscheduleLeague("' + id + "_"+value['SportSubType'].trim().replace(" ","_") + '")'
                };
                tree.create_node($("#" + id), node, "last");
            });
            addGameHeader();
            setGameLines(id.replace("_", " "), '', '', '', 1);
            setLinePeriodFilter();
            disconnectStomp();
            connectToStomp();
            if (type === 'Game') {
                var PropsNode = new Object();
                PropsNode.id = id + "_futureProps";
                PropsNode.text = "Futures Props";
                PropsNode.a_attr = {
                    "isFutureProps": true,
                    "sport": (id.trim()),
                    "operacion": 1,
                    "onclick": "loadFutureProps('" + (id + "_futureProps") + "')"
                };

                tree.create_node($("#" + id), PropsNode, "last");

                tree.open_node($("#" + id));
                tree.redraw(true);
            }
        }
    });
    setLinesTableFocus();
}


function loadFutureProps(id) {
    clearFocusedElement();
    enableStatusPeriod(false);
    selectedType = "isFutureProp";
    var tree = $("#scheduleTree").jstree(true);
    tree.open_node($("#" + id));
    jQuery("#scheduleTree").jstree("select_node", "#" + id);
    var node = $('#scheduleTree #' + id).find("li");
    $.each(node, function (key, value) {
        tree.delete_node($(value));
    });
    var sport = $("#" + id).find('a').attr('sport');
    $.ajax({
        url: "games/getFutureProps",
        type: 'POST',
        data:{
            "ct":"Futures -"+sport,
            "op":1,
            "store": $("#lineFilterStore").val()
            
        },
        success: function (data) {
            var obj = $.parseJSON(data);
            var cont=0;
            $.each(obj, function (key, value) {
                if (value['Type'].trim() === "P") {
                    var node = new Object();
                    node.id = value['ContestNum'];
                    node.text = "<b>" + value['ContestDesc'].trim() + "</b>";
                    node.a_attr = {
                        "sport": (sport.trim()),
                        "ContestType": (value['ContestType'].trim().replace(".","")),
                        "isProp": true,
                        "operacion": 2,
                        "onclick": "loadFuturePropFolderLine('"+sport.trim()+"',null,null,"+value['ContestNum']+")"
                    };
                    tree.create_node($("#" + id), node, "first");
                    tree.open_node($("#" + id));
                    tree.redraw(true);
                }else{
                    var PropsNode = new Object();
                    PropsNode.id = sport + "_fp_"+cont;
                    PropsNode.text = value['ContestType2'].trim();
                    PropsNode.a_attr = {
                        "isFutureProps": true,
                        "sport": (sport.trim()),
                        "ContestType": (value['ContestType'].trim().replace(".","")),
                        "ContestType2": (value['ContestType2'].trim()),
                        "operacion": 1,
                        "onclick": "loadFuturePropsL2('" + (sport + "_fp_"+cont) + "')"
                    };
                    tree.create_node($("#" + id), PropsNode, "last");
                    tree.open_node($("#" + id));
                    tree.redraw(true);
                    cont++;
                }
            });
        }
    });
    loadFuturePropFolderLine(sport,null,null,null);
}


function loadFuturePropsL2(id) {
    clearFocusedElement();
    enableStatusPeriod(false);
    selectedType = "isFutureProp";
    var tree = $("#scheduleTree").jstree(true);
    tree.open_node($("#" + id));
    jQuery("#scheduleTree").jstree("select_node", "#" + id);
    var node = $('#scheduleTree #' + id).find("li");
    $.each(node, function (key, value) {
        tree.delete_node($(value));
    });
    var sport = $("#" + id).find('a').attr('sport');
    var ct2 = $("#" + id).find('a').attr('contesttype2');
    $.ajax({
        url: "games/getFutureProps",
        type: 'POST',
        data:{
            "ct":"Futures -"+sport,
            "ct2":ct2,
            "op":2,
            "store": $("#lineFilterStore").val()
        },
        success: function (data) {
            var obj = $.parseJSON(data);
            var cont=0;
            $.each(obj, function (key, value) {
                if (value['Type'].trim() === "P") {
                    var node = new Object();
                    node.id = value['ContestNum'];
                    node.text = "<b>" + value['ContestDesc'].trim() + "</b>";
                    node.a_attr = {
                        "sport": (sport.trim()),
                        "ContestType": (value['ContestType'].trim().replace(".","")),
                        "ContestType2": (value['ContestType2'].trim()),
                        "isProp": true,
                        "operacion": 2,
                        "onclick": "loadFuturePropFolderLine('"+sport.trim()+"',null,null,"+value['ContestNum']+")"
                    };
                    tree.create_node($("#" + id), node, "first");
                    tree.open_node($("#" + id));
                    tree.redraw(true);
                }else{
                    var PropsNode = new Object();
                    PropsNode.id = id + "_"+cont;
                    PropsNode.text = value['ContestType3'].trim();
                    PropsNode.a_attr = {
                        "isFutureProps": true,
                        "sport": (sport.trim()),
                        "ContestType": (value['ContestType'].trim().replace(".","")),
                        "ContestType2": (value['ContestType2'].trim()),
                        "ContestType3": (value['ContestType3'].trim()),
                        "operacion": 1,
                        "onclick": "loadFuturePropsL3('" + (id + "_"+cont) + "')"
                    };
                    tree.create_node($("#" + id), PropsNode, "last");
                    tree.open_node($("#" + id));
                    tree.redraw(true);
                    cont++;
                }
            });
        }
    });
    loadFuturePropFolderLine(sport,ct2,null,null);
}


function loadFuturePropsL3(id) {
    clearFocusedElement();
    enableStatusPeriod(false);
    selectedType = "isFutureProp";
    var tree = $("#scheduleTree").jstree(true);
    tree.open_node($("#" + id));
    jQuery("#scheduleTree").jstree("select_node", "#" + id);
    var node = $('#scheduleTree #' + id).find("li");
    $.each(node, function (key, value) {
        tree.delete_node($(value));
    });
    var sport = $("#" + id).find('a').attr('sport');
    var ct2 = $("#" + id).find('a').attr('contesttype2');
    var ct3 = $("#" + id).find('a').attr('contesttype3');
    $.ajax({
        url: "games/getFutureProps",
        type: 'POST',
        data:{
            "ct":"Futures -"+sport,
            "ct2":ct2,
            "ct3":ct3,
            "op":3,
            "store": $("#lineFilterStore").val()
        },
        success: function (data) {
            var obj = $.parseJSON(data);
            $.each(obj, function (key, value) {
                var node = new Object();
                node.id = value['ContestNum'];
                node.text = "<b>" + value['ContestDesc'].trim() + "</b>";
                node.a_attr = {
                    "sport": (sport.trim()),
                    "ContestType": (value['ContestType'].trim().replace(".","")),
                    "ContestType2": (value['ContestType2'].trim()),
                    "ContestType3": (value['ContestType3'].trim()),
                    "isProp": true,
                    "operacion": 2,
                    "onclick": "loadFuturePropFolderLine('"+sport.trim()+"',null,null,"+value['ContestNum']+")"
                };
                tree.create_node($("#" + id), node, "first");
                tree.open_node($("#" + id));
                tree.redraw(true);
            });
        }
    });
    loadFuturePropFolderLine(sport,ct2,ct3,null);
}

function loadFuturePropFolderLine(sport,ct2,ct3,contestNum) {
    enableStatusPeriod(false);
    $.ajax({
        url: "games/getFuturePropLines",
        type: 'POST',
        data: {
            "ct": "Futures -"+sport,
            "ct2": ct2,
            "ct3": ct3,
            "contestNum": contestNum,
            "store": $("#lineFilterStore").val()
        },
        success: function (data) {
            var obj = JSON.parse(data);
            $("#scheduleLines tbody tr").remove();
            addPropHeader();
            var lastContestNum = "";
            $.each(obj, function (key, value) {
                addPropLine(value, lastContestNum);
                lastContestNum = value['ContestNum'];

            });
            setLinesTableFocus();
        }
    });
}

function loadscheduleLeague(parentNodeId) {
    clearFocusedElement();
    enableStatusPeriod(true);
    selectedType = "isGame";
    var tree = $("#scheduleTree").jstree(true);
    tree.deselect_all(true);
    jQuery("#scheduleTree").jstree("select_node", parentNodeId);
    tree.open_node(parentNodeId);
    var node = $('#scheduleTree #' + parentNodeId).find("li");
    $.each(node, function (key, value) {
        tree.delete_node($(value));
    });
    var sport = $("#" + parentNodeId).find('a').attr('sport');
    var subsport = $("#" + parentNodeId).find('a').attr('subsport');
    $.ajax({
        url: "games/schedule",
        type: 'POST',
        data: {"operation": 3, "sportType": sport.replace("_", " "), "subSport": subsport.replace("_", " ")},
        success: function (data) {
            var obj = $.parseJSON(data);
            var cont = 0;
            $.each(obj, function (key, value) {
                var node = new Object();
                var nodeID = parentNodeId +"_"+cont;
                node.id = nodeID;
                node.text = value['ScheduleText'].trim();
                node.a_attr = {
                    "none": true,
                    "sport": (sport.trim().replace("_", " ")),
                    "subSport": subsport,
                    "scheduleDateText": (value['ScheduleText'].trim()),
                    "operacion": 3,
                    "onclick": 'loadscheduleGames("' + nodeID+'"'+(sport.trim()==="Soccer"?",true":"")+ ')'};

                tree.create_node(parentNodeId, node, "last");
                cont++;
            });
            
            tree.open_node(parentNodeId);
            tree.redraw(true);
            addGameHeader();
            setLinePeriodFilter();
            disconnectStomp();
            connectToStomp();
            setGameLines(sport.replace("_", " "),subsport.replace("_", " "), null,null , 2);
        }
    });
}

function loadscheduleGames(parentNodeId) {
    clearFocusedElement();
    enableStatusPeriod(true);
    selectedType = "isGame";
    var tree = $("#scheduleTree").jstree(true);
    tree.deselect_all(true);
    jQuery("#scheduleTree").jstree("select_node", parentNodeId);
    tree.open_node($("#" + parentNodeId));
    var node = $('#scheduleTree #' + parentNodeId).find("li");
    $.each(node, function (key, value) {
        tree.delete_node($(value));
    });
    var sport = $("#" + parentNodeId).find('a').attr('sport');
    var scheduleDateText = $("#" + parentNodeId).find('a').attr('scheduleDateText');
    var subSport = $("#" + parentNodeId).find('a').attr('subSport');
    var scheduleText;
    var scheduleDate;

    var month = unescape(scheduleDateText);
    month = month.split(" ");
    if (months.indexOf(month[0]) > -1) {
        scheduleDate = scheduleDateText;
        scheduleText = null;
    } else {
        scheduleDate = null;
        scheduleText = scheduleDateText;
    }
    $.ajax({
        url: "games/schedule",
        type: 'POST',
        data: {
            "operation": 4,
            "sportType": sport,
            "subSport": subSport,
            "scheduleText": scheduleText,
            "scheduleDate":scheduleDate
        },
        success: function (data) {
            var obj = $.parseJSON(data);
            $.each(obj, function (key, value) {
                var gameTime = value['GameTime'].split(":");
                var node = new Object();
                node.id = value['GameNum'];
                node.text = "<span><b>(#" + value['Team1RotNum'] + ")    </b>" + value['Team1ID'] + "    vs    <b>(#" + value['Team2RotNum'] + ")</b>    " + value['Team2ID'] + "      " + value['GameDate'] + " " + gameTime[0] + ":" + gameTime[1] + "</span>";
                node.a_attr = {
                    "isgame": true,
                    "rotationNums": value['Team1RotNum'] + "_" + value['Team2RotNum'],
                    "sport": sport.trim().replace("_", " "),
                    "subSport": value['SportSubType'].trim(),
                    "scheduleDate": scheduleDate,
                    "scheduleText": scheduleText,
                    "GameDate":value["GameDate"],
                    "operacion": 4,
                    "correlation": (value['CorrelationID'].trim()),
                    "onclick": "createPropFolder('" + value['GameNum'] + "')"
                };
                tree.create_node($("#" + parentNodeId), node, "last");
            });

            tree.open_node($("#" + parentNodeId));
            tree.redraw(true);
            addGameHeader();
            setGameLines(sport, subSport, scheduleDate, scheduleText, 3);
            //setLinesTableFocus();
            setLinePeriodFilter();
            disconnectStomp();
            connectToStomp();
        }
    });
}

function createPropFolder(parentNodeId) {
    clearFocusedElement();
    enableStatusPeriod(true);
    selectedType = "isGame";
    var tree = $("#scheduleTree").jstree(true);
    tree.deselect_all(true);
    jQuery("#scheduleTree").jstree("select_node", parentNodeId);
    tree.open_node($("#" + parentNodeId));

    var correlation = $("#" + parentNodeId).find('a').attr('correlation');
    var gameDate = $("#" + parentNodeId).find('a').attr('gamedate');

    var node = $('#scheduleTree #' + parentNodeId).find("li");
    $.each(node, function (key, value) {
        tree.delete_node($(value));
    });

    var node = new Object();
    node.id = "props_" + parentNodeId;
    node.text = "Props";
    node.a_attr = {
        "isPropFolder": true,
        "operacion": 1,
        "correlation": correlation.trim(),
        "gamedate":gameDate,
        "onclick": "loadProps('" + "props_" + parentNodeId + "')"
    };
    tree.create_node($("#" + parentNodeId), node, "last");

    tree.open_node($("#" + parentNodeId));
    tree.redraw(true);
    addGameLine(parentNodeId);
}

function loadProps(id) {
    clearFocusedElement();
    enableStatusPeriod(false);
    selectedType = "isProp";
    var tree = $("#scheduleTree").jstree(true);
    tree.deselect_all(true);
    jQuery("#scheduleTree").jstree("select_node", id);
    tree.open_node($("#" + id));
    var node = $('#scheduleTree #' + id).find("li");
    $.each(node, function (key, value) {
        tree.delete_node($(value));
    });

    var correlation = unescape($("#" + id).find('a').attr('correlation'));
    var gamedate = $("#" + id).find('a').attr('gamedate');
    $.ajax({
        url: "games/getProps",
        type: 'POST',
        data: {
            "correlation": correlation.trim()
        },
        success: function (data) {
            var obj = $.parseJSON(data);
            var cont = 0;
            $.each(obj, function (key, value) {
                var node = new Object();
                if (value['ContestType2'].trim() === ".") {
                    node.id = value['ContestNum'];
                    node.text = "<b>" + value['ContestDesc'].trim() + "</b>";
                    node.a_attr = {
                        "isProp": true,
                        "ContestNum": value['ContestNum'],
                        "correlation": correlation.trim(),
                        "operacion": 4,
                        "gamedate":gamedate,
                        "ContestType": (value['ContestType'].trim()),
                        "ContestType2": (value['ContestType2'].trim()),
                        "onclick": 'loadPropLines("'+correlation.trim()+'",null,null,"'+value['ContestNum']+'","'+gamedate+'",null)'
                    };
                } else {
                    node.id = (id + "_" + cont);
                    node.text = value['ContestType2'].trim();
                    node.a_attr = {
                        "isPropFolder": true,
                        "ContestType": (value['ContestType'].trim()),
                        "ContestType2": (value['ContestType2'].trim()),
                        "gamedate":gamedate,
                        "operacion": 2,
                        "correlation": correlation,
                        "onclick": 'loadPropFolderL2("' + (id + "_" + cont) + '")'
                    };
                    cont++;
                }
                tree.create_node($("#" + id), node, "last");
            });
            tree.open_node($("#" + id));
            tree.redraw(true);
            loadPropLines(correlation.trim(), "", "", "",gamedate,"");
        }
    });
}

function loadPropFolderL2(parentIdNode){
    clearFocusedElement();
    enableStatusPeriod(false);
    selectedType = "isProp";
    var tree = $("#scheduleTree").jstree(true);
    tree.deselect_all(true);
    jQuery("#scheduleTree").jstree("select_node", parentIdNode);
    tree.open_node($("#" + parentIdNode));
    var node = $('#scheduleTree #' + parentIdNode).find("li");
    $.each(node, function (key, value) {
        tree.delete_node($(value));
    });

    var correlation = $("#" + parentIdNode).find('a').attr('correlation').trim();
    var contestType2 = $("#" + parentIdNode).find('a').attr('ContestType2').trim();
    var gamedate = $("#" + parentIdNode).find('a').attr('gamedate').trim();
    $.ajax({
        url: "games/getPropsFolderL2",
        type: 'POST',
        data: {
            "correlation": correlation,
            "ContestType2": contestType2
        },
        success: function (data) {
            var obj = $.parseJSON(data);
            var cont = 0;
            $.each(obj, function (key, value) {
                var node = new Object();
                if (value['ContestType3'].trim() === ".") {
                    node.id = value['ContestNum'];
                    node.text = "<b>" + value['ContestDesc'].trim() + "</b>";
                    node.a_attr = {
                        "isProp": true,
                        "ContestNum": value['ContestNum'],
                        "correlation": correlation,
                        "gamedate":gamedate,
                        "ContestType": (value['ContestType'].trim()),
                        "ContestType2": (value['ContestType2'].trim()),
                        "ContestType3": (value['ContestType3'].trim()),
                        "onclick": 'loadPropLines("'+correlation+'","' + value['ContestNum'].trim() + '","","","'+gamedate+'","")'
                    };
                } else {
                    node.id = escape(parentIdNode + "_" + cont);
                    node.text = value['ContestType3'].trim();
                    node.a_attr = {
                        "isPropFolder": true,
                        "ContestType": (value['ContestType'].trim()),
                        "ContestType2": (value['ContestType2'].trim()),
                        "ContestType3": (value['ContestType3'].trim()),
                        "gamedate":gamedate,
                        "operacion": 3,
                        "correlation": correlation,
                        "onclick": 'loadPropL3("' + escape(parentIdNode + "_" + cont) + '")'
                    };
                    cont++;
                }
                tree.create_node($("#" + parentIdNode), node, "last");
            });
            tree.open_node($("#" + parentIdNode));
            tree.redraw(true);
            loadPropLines(correlation.trim(), "", "", contestType2, gamedate,"");
        }
    });
}

function loadPropL3(parentIdNode) {
    clearFocusedElement();
    enableStatusPeriod(false);
    selectedType = "isProp";
    var tree = $("#scheduleTree").jstree(true);
    tree.deselect_all(true);
    jQuery("#scheduleTree").jstree("select_node", parentIdNode);
    tree.open_node($("#" + parentIdNode));
    var node = $('#scheduleTree #' + parentIdNode).find("li");
    $.each(node, function (key, value) {
        tree.delete_node($(value));
    });
    var correlation = $("#" + parentIdNode).find('a').attr('correlation');
    var contestType2 = $("#" + parentIdNode).find('a').attr('ContestType2');
    var contestType3 = $("#" + parentIdNode).find('a').attr('ContestType3');
    var gamedate = $("#" + parentIdNode).find('a').attr('gamedate');

    $.ajax({
        url: "games/getProps3L",
        type: 'POST',
        data: {
            "correlation": correlation,
            "ContestType2": contestType2,
            "ContestType3": contestType3,
            "gamedate":gamedate
        },
        success: function (data) {
            var obj = $.parseJSON(data);
            $.each(obj, function (key, value) {
                var node = new Object();
                node.id = value['ContestNum'];
                node.text = "<b>" + value['ContestDesc'].trim() + "</b>";
                node.a_attr = {
                    "isProp": true,
                    "ContestNum": value['ContestNum'].trim(),
                    "correlation": correlation,
                    "ContestType": (value['ContestType'].trim()),
                    "ContestType2": (contestType2),
                    "ContestType3": (contestType3),
                    "gamedate":gamedate,
                    "operacion": 4,
                    "onclick": 'loadPropLines("'+correlation+'","' + value['ContestNum'].trim() + '","","","'+gamedate+'","")'
                };
                tree.create_node($("#" + parentIdNode), node, "last");
            });
            tree.open_node($("#" + parentIdNode));
            tree.redraw(true);
            loadPropLines(correlation.trim(), "", contestType2, contestType3,gamedate,"");
        }
    });
}



function loadPropLines(correlation, contestNum, ContestType2, contestType3,gameDate,refresh) {
    enableStatusPeriod(false);
    var displayType = $("#displayTypeFilter").val();
    $.ajax({
        url: "games/getPropLine",
        type: 'POST',
        data: {
            "correlation": correlation,
            "contestNum": contestNum,
            "ContestType2": ContestType2,
            "contestType3": contestType3,
            "store": $("#lineFilterStore").val(),
            "gameDate":gameDate
        }, success: function (data) {
            addPropHeader();
            var lastContestNum = "001";
            if(!refresh){
                $("#scheduleLines tbody tr").remove();
                lastContestNum = "";
            }
            var obj = $.parseJSON(data);
            
            $.each(obj, function (key, value) {
                switch (displayType) {
                    case 'D':
                        addPropLineDecimal(value, lastContestNum);
                        break;
                    default :
                        addPropLine(value, lastContestNum);
                        break;
                }
                lastContestNum = value['ContestNum'];

            });
            setLinesTableFocus();
        }
    });
}



function loadExternalFuturePropsL2(parentNodeId) {
    enableStatusPeriod(false);
    selectedType = "isFutureProp";
    var tree = $("#scheduleTree").jstree(true);
    tree.open_node($("#" + parentNodeId));
    jQuery("#scheduleTree").jstree("select_node", "#" + parentNodeId);
    var node = $('#scheduleTree #' + parentNodeId).find("li");
    $.each(node, function (key, value) {
        tree.delete_node($(value));
    });
    var contesttype = $("#" + parentNodeId).find('a').attr('contesttype');
    $.ajax({
        url: "games/getFutureProps",
        type: 'POST',
        data:{
            "ct":contesttype,
            "op":1,
            "store": $("#lineFilterStore").val()
        }, success: function (data) {
            var cont = 0;
            var obj = JSON.parse(data);
            $.each(obj, function (key, value) {
                var node = new Object();
                if (value['ContestType2'].trim() === ".") {
                    node.id = value['ContestNum'];
                    node.text = "<b>" + value['ContestDesc'].trim() + "</b>";
                    node.a_attr = {
                        "isProp": true,
                        "ContestNum": value['ContestNum'],
                        "ContestType": ("." + parentNodeId),
                        "ContestType2": (value['ContestType2'].trim()),
                        "onclick": 'loadPropLines("","' + value['ContestNum'].trim() + '","","","")'
                    };
                } else {
                    node.id = escape(parentNodeId + "_" + cont);
                    node.text = value['ContestType2'].trim();
                    node.a_attr = {
                        "isPropExternalFolder": true,
                        "ContestType": (parentNodeId),
                        "ContestType2": (value['ContestType2'].trim()),
                        "operacion": 2,
                        "onclick": 'loadExternalFuturePropsL3("' + escape(parentNodeId + "_" + cont) + '")'
                    };
                }
                cont++;
                tree.create_node($("#" + parentNodeId), node, "last");
            });
            tree.open_node($("#" + parentNodeId));
            tree.redraw(true);
            loadExternalPropFolderLine(contesttype,null,null);
        }
    });
}

function loadExternalFuturePropsL3(parentNodeId) {
    clearFocusedElement();
    enableStatusPeriod(false);
    selectedType = "isFutureProp";
    var tree = $("#scheduleTree").jstree(true);
    tree.open_node($("#" + parentNodeId));
    jQuery("#scheduleTree").jstree("select_node", "#" + parentNodeId);
    var node = $('#scheduleTree #' + parentNodeId).find("li");
    $.each(node, function (key, value) {
        tree.delete_node($(value));
    });
    var ct = $("#" + parentNodeId).find('a').attr('contesttype');
    var ct2 = $("#" + parentNodeId).find('a').attr('contesttype2');
    $.ajax({
        url: "games/getFutureProps",
        type: 'POST',
        data:{
            "ct":ct,
            "ct2":ct2,
            "op":2,
            "store": $("#lineFilterStore").val()
        }, success: function (data) {
            var cont = 0;
            var obj = JSON.parse(data);
            $.each(obj, function (key, value) {
                var node = new Object();
                if (value['ContestType3'].trim() === ".") {
                    node.id = value['ContestNum'];
                    node.text = "<b>" + value['ContestDesc'].trim() + "</b>";
                    node.a_attr = {
                        "isProp": true,
                        "ContestNum": value['ContestNum'],
                        "ContestType": (ct),
                        "ContestType2": (value['ContestType2'].trim()),
                        "ContestType3": (value['ContestType3'].trim()),
                        "onclick": 'loadPropLines("4","","' + value['ContestNum'].trim() + '","","","")'
                    };
                } else {
                    node.id = escape(parentNodeId + "_" + cont);
                    node.text = value['ContestType3'].trim();
                    node.a_attr = {
                        "isPropExternalFolder": true,
                        "ContestType": (ct),
                        "ContestType2": (value['ContestType2'].trim()),
                        "ContestType3": (value['ContestType3'].trim()),
                        "operacion": 3,
                        "onclick": 'loadExternalFuturePropL4("' + escape(parentNodeId + "_" + cont) + '")'
                    };
                }
                cont++;
                tree.create_node($("#" + parentNodeId), node, "last");
            });
            tree.open_node($("#" + parentNodeId));
            tree.redraw(true);
            loadExternalPropFolderLine(ct,ct2,null);
        }
    });
}

function loadExternalFuturePropL4(parentIdNode) {
   clearFocusedElement();
    enableStatusPeriod(false);
    selectedType = "isFutureProp";
    var tree = $("#scheduleTree").jstree(true);
    tree.open_node($("#" + parentIdNode));
    jQuery("#scheduleTree").jstree("select_node", "#" + parentIdNode);
    var node = $('#scheduleTree #' + parentIdNode).find("li");
    $.each(node, function (key, value) {
        tree.delete_node($(value));
    });
    var ct = $("#" + parentIdNode).find('a').attr('contesttype');
    var ct2 = $("#" + parentIdNode).find('a').attr('contesttype2');
    var ct3 = $("#" + parentIdNode).find('a').attr('contesttype3');
    $.ajax({
        url: "games/getFutureProps",
        type: 'POST',
        data:{
            "ct":ct,
            "ct2":ct2,
            "ct3":ct3,
            "op":3,
            "store": $("#lineFilterStore").val()
        },
        success: function (data) {
            var obj = $.parseJSON(data);
            $.each(obj, function (key, value) {
                var node = new Object();
                node.id = value['ContestNum'];
                node.text = "<b>" + value['ContestDesc'].trim() + "</b>";
                node.a_attr = {
                    "isProp": true,
                    "ContestNum": value['ContestNum'].trim(),
                    "ContestType": (ct.trim()),
                    "ContestType2": (ct2.trim()),
                    "ContestType3": (ct3.trim()),
                    "onclick": 'loadPropLines("","' + value['ContestNum'].trim() + '","","","","")'
                };
                tree.create_node($("#" + parentIdNode), node, "last");
            });
            tree.open_node($("#" + parentIdNode));
            tree.redraw(true);
            loadExternalPropFolderLine(ct,ct2,ct3);
        }
    });
}

function loadExternalPropFolderLine(ct,ct2,ct3) {
    var op=1;
    if(ct2!==null){
        op=2;
    }
    if(ct3!==null){
        op=3;
    }
    enableStatusPeriod(false);
    $.ajax({
        url: "games/getFuturePropLines",
        type: 'POST',
        data: {
            "ct": ct,
            "ct2": ct2,
            "ct3": ct3,
            "op": op,
            "store": $("#lineFilterStore").val()
        },
        success: function (data) {
            var obj = JSON.parse(data);
            $("#scheduleLines tbody tr").remove();
            addPropHeader();
            var lastContestNum = "";
            $.each(obj, function (key, value) {
                addPropLine(value, lastContestNum);
                lastContestNum = value['ContestNum'];

            });
            setLinesTableFocus();
        }
    });
}

function customMenu(node) {
    var items = null;
    if (node.a_attr['isgame']) {
        items = {
            "Edit": {
                "label": "Edit",
                "action": function (obj) {
                    openEditGameModal("", 1);
//                    this.location = "games/edit/" + obj.reference.parent().attr("id");
                }
            },
            "Delete": {
                "label": "Delete",
                "action": function (obj) {
                    $.ajax({
                        url: "games/ajaxdelete",
                        data: {'idGame': obj.reference.parent().attr("id")},
                        type: 'POST',
                        success: function (data) {
                            var obj = $.parseJSON(data);
                            var date = obj['GameDateTime'];
                            var newdate = date.split(".");
                            $("#gameName").text(obj['Team1ID'] + " vs " + obj['Team2ID']);
                            $("#gameDateTime").text(newdate[0]);
                            $("#rotANumber").text(obj['Team1RotNum']);
                            $("#ajaxDeleteModal").modal("toggle");
                        }
                    });
                }
            }, "Grade": {
                "label": "Grade",
                "action": function (obj) {
                    var gameid=obj.reference.parent().attr("id");
                    openGradeGameModal(gameid);
                    
                }
            }, "GameScore": {
                "label": "Game Score",
                "action": function (obj) {
                    $("#gameScoreModal").modal("toggle");
                }
            }, "GradeResult": {
                "label": "Grade Results",
                "action": function (obj) {
                    $("#gradeResultModal").modal("toggle");
                }
            }
        };
    } else if (node.a_attr["isProp"]) {
        items = {
            "Delete": {
                "label": "Delete",
                "action": function (obj) {
                    if(confirm("Are you sure you want to delete this prop?")){
                        var array = [];
                        getParentLevels(array, obj.reference.parent().attr("id"));
                        var folderParentID = deepLevels[0];
                        var level1 = $("#" + folderParentID).find('a').attr('ContestType');
                        var level2 = $("#" + folderParentID).find('a').attr('ContestType2');
                        var level3 = $("#" + folderParentID).find('a').attr('contestType3');
                        var desc = obj.reference.parent().text();
                        if (level1 === undefined)
                            level1 = "";
                        if (level2 === undefined)
                            level2 = "";
                        if (level3 === undefined)
                            level3 = "";
                        $.ajax({
                            url: "props/delete",
                            type: 'POST',
                            data: {
                                "contestType": level1.trim(),
                                "contestType2": level2.trim(),
                                "contestType3": level3.trim(),
                                "contestDesc": desc.trim()
                            }, success: function (data) {
                                if (data === '-2') {
                                    $("#messageSpan").text("The contest can't be deleted because one or more wagers are present");
                                    $("#defaultMsgModal").modal("toggle");
                                } else if (data === '-3') {
                                    $("#messageSpan").text("Error in delete operation");
                                    $("#defaultMsgModal").modal("toggle");
                                }
                            }
                        });
                    }
                }
            },
            "Edit": {
                "label": "Edit",
                "action": function (obj) {
                    openEditPropModal(obj.reference.parent().attr("id"),obj.reference.attr("correlation"));
                }
            },"Grade":{
                "label": "Grade",
                "action": function (obj) {
                    openGradePropModal();
                }
            }
        };
    } else if (node.a_attr["isPropExternalFolder"]) {
        items = {
            "Create": {
                "label": "Create External Prop",
                "action": function (obj) {
                    clearPropForm("create");
                    var array = [];
                    cleanFolderInputs();
                    $("#correlational_id").attr("disabled", "disabled");
                    getParentLevels(array, obj.reference.parent().attr("id"));
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
                }
            }
            , "Grade": {
                "label": "Grade",
                "action": function (obj) {
                    this.location = "grade/gamecontest"
                }
            }
        };
    } else if (node.a_attr["isPropFolder"]) {
        items = {
            "Create": {
                "label": "Create Prop",
                "action": function (obj) {
                    clearPropForm("create");
                    var array = [];
                    cleanFolderInputs();
                    var selected;
                    $("#correlational_id").removeAttr("disabled");
                    getParentLevelsGameProp(array, obj.reference.parent().attr("id"));
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
                }
            }
        }
    } else if (node.a_attr["isFutureProps"]) {
        items = {
            "Create": {
                "label": "Create Future Prop",
                "action": function (obj) {
                    var sportType=$(obj.reference).attr("sport");
                    var contestType1=$(obj.reference).attr("contesttype");
                    var contestType2=$(obj.reference).attr("contesttype2");
                    var contestType3=$(obj.reference).attr("contesttype3");
                    openCreateFutureProp(sportType,contestType1,contestType2,contestType3);
                }
            }
        }
    } else if(node.a_attr["issport"]){
        items = {
//            "Pause": {
//                "label": "Pause Updates",
//                "action": function (obj) {
//                    var sportType=$(obj.reference).attr("sport");
//                    openPauseSportModal(sportType);
//                }
//            }
        };
    }else if(node.a_attr["issubsport"]){
        items = {
//            "Pause": {
//                "label": "Pause Updates",
//                "action": function (obj) {
//                    var sportType=$(obj.reference).attr("sport");
//                    var subSportType=$(obj.reference).attr("subsport");
//                    openPauseSubSportModal(sportType,subSportType);
//                }
//            }
        };
    }else if (node.a_attr["none"]) {
        items = {};
    }

    return items;
}