function savePropLine() {
    if (($("#propLineType").val() === "T" || $("#propLineType").val() === "S") && $("#lineProp").val() === "") {
        alert("Line value is required");
        $("#lineProp").focus();
        $("#lineProp").select();
    } else if ($("#propLineType").val() === "T" && $("#lineProp").val() === "0") {
        alert("Line can be Zero on total props");
        $("#lineProp").focus();
        $("#lineProp").select();
    } else if ($("#editPropLineFrm").validationEngine('validate') && priceLineValidationFlag) {
        var status;
        if ($("#offlineProp").is(":checked")) {
            status = "H";
        } else if ($("#circledContestProp").is(":checked")) {
            status = "I";
        } else {
            status = "O";
        }

        $.ajax({
            url: "games/setPropLine",
            type: 'POST',
            data: {
                "contestType": $("#contestType").val(),
                "contestType2": $("#contestType2").val(),
                "contestType3": $("#contestType3").val(),
                "contestDesc": $("#contestDescProp").val(),
                "profile": ".",
                "rot1": $("#rotNProp1").val(),
                "store": $("#lineFilterStore").val(),
                "odds": $("#oddProp").val(),
                "line": processDataOut($("#lineProp").val(), $("#propLineType").val()),
                "status": status,
                "circle": $("#circledContestMaxWagerProp").val(),
                "maxwayer": $("#contestMaxWagerProp").val(),
                "type": $("#propLineType").val(),
                "rot2": $("#rotNProp2").val(),
                "odd2": $("#lineProp2").val()

            }, success: function (data) {
//                alert(data);
            }
        });
        $("#editLinePropModal").modal("toggle");
    }
}
function validateSpreadPoints(points1,points2){
    var p=/^-?\d{1,3}½?\,?-?\d|^-?\d{1,3}½?|^-?\d{1,3}\,?-?\d½$/g;
    if(points1===""){
        return p.test(points2);
    }else{
        return p.test(points1);
    }
}
function saveSpreadLine(shadeCreation) {
    if ($("#spreadModalFrm").validationEngine('validate') && priceLineValidationFlag) {
        var link;
        if ($("#linkToMastersp").prop('disabled')) {
            link = "L";
        } else {
            if ($("#linkToMastersp").is(":checked")) {
                link = "Y";
            } else {
                link = "N";
            }
        }
        var status;
        if ($("#offlinesp").is(":checked"))
            status = 'H';
        else
            status = 'O';
        var cusProfile = ".";
        if ($("#sp_shades").val() !== "" && $("#sp_shades").val() !== null) {
            cusProfile = $("#sp_shades").val().trim();
            if(cusProfile ==="master."){
                cusProfile = cusProfile.replace("master", ""); 
            }
        }
        
        var awayPrice=(lockComebackSP?$("#pricesp1").val():$("#americanPricesp1").val());
        var homePrice=(lockComebackSP?$("#pricesp2").val():$("#americanPricesp2").val());
        $.ajax({
            url: "games/saveSpread",
            type: 'POST',
            data: {
                "periodNum": $("#lineFilterPeriod").val(),
                "store": $("#lineFilterStore").val(),
                "rotationHome": $("#rotHNumbersp").val(),
                "rotationAway": $("#rotANumbersp").val(),
                "homePoints": processDataOut($("#spreadt2").val()),
                "homePrice": homePrice,
                "awayPoints": processDataOut($("#spreadt1").val()),
                "awayPrice": awayPrice,
                "gamedatespread": $("#gamedatespread").val(),
                "gametimespread": $("#gametimespread").val(),
                "link": link,
                "cusprofile": cusProfile
            },
            success: function (data) {
                if (data < 0) {
                    $("#messageSpan").text("The value was not saved due to an error");
                    $("#defaultMsgModal").modal('toggle');
                } else {
                    if (!shadeCreation) {
                        saveKeepOpen('S');
                    }
                }
            }
        });
        setLockComebackStatus("SP",lockComebackSP);
        $("#spreadModal").modal("toggle");
    }
}

function saveMoneyLine(shadeCreation) {
    if ($("#moneyLineModalFmr").validationEngine('validate') && priceLineValidationFlag) {
        var link;
          if ($("#linkToMasterml").prop('disabled')) {
            link = "L";
        } else {
        if ($("#linkToMasterml").is(":checked")) {
            link = "Y";
        } else {
            link = "N";
        }
    }
        if (!$("#mlPricet3").prop("disabled")) {
            $("#americanPriceml1").val($("#mlPricet1").val());
            $("#americanPriceml2").val($("#mlPricet2").val());
        }
        var cusProfile = ".";
        if ($("#ml_shades").val() !== "" && $("#ml_shades").val() !== null) {
            cusProfile = $("#ml_shades").val().trim();
            if(cusProfile ==="master."){
                cusProfile =  cusProfile.replace("master", "");
            }
        }
        var awayPrice=(lockComebackML?$("#mlPricet1").val():$("#americanPriceml1").val());
        var homePrice=(lockComebackML?$("#mlPricet2").val():$("#americanPriceml2").val());
        $.ajax({
            url: "games/saveMoneyLine",
            type: 'POST',
            data: {
                "periodNum": $("#lineFilterPeriod").val(),
                "store": $("#lineFilterStore").val(),
                "rotationHome": $("#rotHNumberml").val(),
                "rotationAway": $("#rotANumberml").val(),
                "home": homePrice,
                "away": awayPrice,
                "draw": $("#mlPricet3").val(),
                "gamedateml": $("#gamedateml").val(),
                "gametimeml": $("#gametimeml").val(),
                "link": link,
                "cusprofile": cusProfile
            },
            success: function (data) {
                if (data < 0) {
                    $("#messageSpan").text("The value was not saved due to an error");
                    $("#defaultMsgModal").modal('toggle');
                } else {
                    if (!shadeCreation) {
                        saveKeepOpen('M');
                    }
                }
            }
        });
        $("#moneyLineModal").modal("toggle");
        setLockComebackStatus("ML",lockComebackML);
    }
}

function saveTotalLine(shadeCreation) {
    if ($("#totalModalFrm").validationEngine('validate') && priceLineValidationFlag) {
        var link;
         if ($("#linkToMastert").prop('disabled')) {
            link = "L";
        } else {
        if ($("#linkToMastert").is(":checked")) {
            link = "Y";
        } else {
            link = "N";
        }
    }
        var cusProfile = ".";
        if ($("#tl_shades").val() !== "" && $("#tl_shades").val() !== null) {
            cusProfile = $("#tl_shades").val().trim();
             if(cusProfile ==="master."){
                cusProfile = cusProfile.replace("master", ""); 
            }
        }
        var overPrice=(lockComebackTL?$("#tPricet1").val():$("#americanPricet1").val());
        var underPrice=(lockComebackTL?$("#tPricet2").val():$("#americanPricet2").val());
        $.ajax({
            url: "games/saveTotal",
            type: 'POST',
            data: {
                "periodNum": $("#lineFilterPeriod").val(),
                "store": $("#lineFilterStore").val(),
                "rotationHome": $("#rotHNumbert").val(),
                "rotationAway": $("#rotANumbert").val(),
                "totalPoints": processDataOut($("#tPoints1").val(), 'T'),
                "totalPriceOver": overPrice,
                "totalPriceUnder": underPrice,
                "gamedatet": $("#gamedatet").val(),
                "gametimet": $("#gametimet").val(),
                "link": link,
                "cusprofile": cusProfile
            },
            success: function (data) {
                if (data < 0) {
                    $("#messageSpan").text("The value was not saved due to an error");
                    $("#defaultMsgModal").modal('toggle');
                } else {
                    if (!shadeCreation) {
                        saveKeepOpen('T');
                    }
                }
            }
        });
        setLockComebackStatus("TL",lockComebackTL);
        $("#totalModal").modal("toggle");
    }
}

function saveTeamTotalLine(shadeCreation) {
    if ($("#teamTotalModalFrm").validationEngine('validate') && priceLineValidationFlag) {
        var link;
        if ($("#linkToMastertt").prop('disabled')) {
            link = "L";
        } else {
        if ($("#linkToMastertt").is(":checked")) {
            link = "Y";
        } else {
            link = "N";
        }
    }
        var cusProfile = ".";
        if ($("#tt_shades").val() !== "" && $("#tt_shades").val() !== null) {
            cusProfile = $("#tt_shades").val().trim();
            if(cusProfile ==="master."){
                cusProfile = cusProfile.replace("master", ""); 
            }
        }
        var overPrice=(lockComebackTT?$("#pricett1").val():$("#americanPricett1").val());
        var underPrice=(lockComebackTT?$("#pricett2").val():$("#americanPricett2").val());
        $.ajax({
            url: "games/saveTeamTotal",
            type: 'POST',
            data: {
                "periodNum": $("#lineFilterPeriod").val(),
                "store": $("#lineFilterStore").val(),
                "rotationHome": $("#rotHNumbertt").val(),
                "rotationAway": $("#rotANumbertt").val(),
                "totalPoints": processDataOut($("#pointstt1").val(), 'T'),
                "totalPriceOver": overPrice,
                "totalPriceUnder": underPrice,
                "pos": $("#position").val(),
                "gamedateteam": $("#gamedateteam").val(),
                "gametimeteam": $("#gametimeteam").val(),
                "link": link,
                "cusprofile": cusProfile
            },
            success: function (data) {
                if (data < 0) {
                    $("#messageSpan").text("The value was not saved due to an error");
                    $("#defaultMsgModal").modal('toggle');
                } else {
                    if (!shadeCreation) {
                        saveKeepOpen('TT');
                    }
                }
            }
        });
        $("#teamTotalModal").modal("toggle");
        setLockComebackStatus("TT",lockComebackTT);
    }
}


function saveKeepOpen(type) {
    switch (type) {
        case 'S':
            $.ajax({
                url: "games/updatekeepopen",
                type: 'POST',
                complete: function () {
                    updateGameStatus('S');
                },
                data: {
                    "rotationNumber": $("#rotANumbersp").val(),
                    "minute": $("#minutessp").val(),
                    "periodNum":$("#lineFilterPeriod").val()
                }, success: function (data) {
//                    alert(data);
                }
            });
            break;
        case 'M':
            $.ajax({
                url: "games/updatekeepopen",
                type: 'POST',
                complete: function () {
                    updateGameStatus('M');
                },
                data: {
                    "rotationNumber": $("#rotANumberml").val(),
                    "minute": $("#minutesml").val(),
                    "periodNum":$("#lineFilterPeriod").val()
                }, success: function (data) {
//                    alert(data);
                }
            });
            break;
        case 'T':
            $.ajax({
                url: "games/updatekeepopen",
                type: 'POST',
                complete: function () {
                    updateGameStatus('T');
                },
                data: {
                    "rotationNumber": $("#rotANumbert").val(),
                    "minute": $("#minutest").val(),
                    "periodNum":$("#lineFilterPeriod").val()
                }, success: function (data) {
//                    alert(data);
                }
            });
            break;
        case 'TT':
            $.ajax({
                url: "games/updatekeepopen",
                type: 'POST',
                complete: function () {
                    updateGameStatus('TT');
                },
                data: {
                    "rotationNumber": $("#rotANumbertt").val(),
                    "minute": $("#minutestt").val(),
                    "periodNum":$("#lineFilterPeriod").val()
                }, success: function (data) {
//                    alert(data);
                }
            });
            break;
    }

}

function updateGameStatus(type) {
    switch (type) {
        case 'S':
            var status;
            if ($("#offlinesp").is(":checked")) {
                status = "H";
            } else if ($("#checkCircledMaxWagersp").is(":checked")) {
                status = "I";
            } else {
                status = "O";
            }
            $.ajax({
                url: "games/updategamestatus",
                type: 'POST',
                complete: function () {
                    clearLineEditModal("sp");
                },
                data: {
                    "rot1": $("#rotANumbersp").val(),
                    "status": status,
                    "circle": $("#circledMaxWagersp").val(),
                    "type": "S",
                    "comments": $("#commentssp").val(),
                    "contestDate": $("#gamedatespread").val(),
                    "contestTime": $("#gametimespread").val()
                }, success: function (data) {
                }
            });
            break;

        case 'M':
            var status;
            if ($("#offlineml").is(":checked")) {
                status = "H";
            } else if ($("#checkCircledMaxWagerml").is(":checked")) {
                status = "I";
            } else {
                status = "O";
            }
            $.ajax({
                url: "games/updategamestatus",
                type: 'POST',
                complete: function () {
                    clearLineEditModal("ml");
                },
                data: {
                    "rot1": $("#rotANumberml").val(),
                    "status": status,
                    "circle": $("#circledMaxWagerml").val(),
                    "type": "M",
                    "comments": $("#commentsml").val(),
                    "contestDate": $("#gamedateml").val(),
                    "contestTime": $("#gametimeml").val()
                }, success: function (data) {
//                    alert(data);
                }
            });
            break;
        case 'T':
            var status;
            if ($("#offlinet").is(":checked")) {
                status = "H";
            } else if ($("#checkCircledMaxWagert").is(":checked")) {
                status = "I";
            } else {
                status = "O";
            }
            $.ajax({
                url: "games/updategamestatus",
                type: 'POST',
                complete: function () {
                    clearLineEditModal("t");
                },
                data: {
                    "rot1": $("#rotANumbert").val(),
                    "status": status,
                    "circle": $("#circledMaxWagert").val(),
                    "type": "L",
                    "comments": $("#commentst").val(),
                    "contestDate": $("#gamedatet").val(),
                    "contestTime": $("#gametimet").val()
                }, success: function (data) {
//                    alert(data);
                }
            });
            break;

        case 'TT':
            var status;
            if ($("#offlinett").is(":checked")) {
                status = "H";
            } else if ($("#checkCircledMaxWagertt").is(":checked")) {
                status = "I";
            } else {
                status = "O";
            }
            $.ajax({
                url: "games/updategamestatus",
                type: 'POST',
                complete: function () {
                    clearLineEditModal("tt");
                },
                data: {
                    "rot1": $("#rotANumbertt").val(),
                    "status": status,
                    "circle": $("#circledMaxWagertt").val(),
                    "type": "E",
                    "comments": $("#commentstt").val(),
                    "contestDate": $("#gamedateteam").val(),
                    "contestTime": $("#gametimeteam").val()
                }, success: function (data) {
//                    alert(data);
                }
            });
            break;
    }

}

function saveGameDataLineModal() {
    $.ajax({
        url: "games/saveedit",
        type: 'POST',
        data: {
            "rotANumber": "",
            "comments": "",
        }, success: function (data) {

        }
    });
}



function setGameLines(sport, league, gameDate, country, operacion) {
    var displayType = $("#displayTypeFilter").val();
    $("#scheduleLines tbody tr").remove();
    $.ajax({
        url: "games/getgamelines",
        data: {
            'operacion': operacion,
            'sport': sport,
            'subsport': league,
            'date': gameDate,
            'country': country,
            'store': $('#lineFilterStore').val(),
            'period': $('#lineFilterPeriod').val(),
            'status': $('#lineFilterStatus').val()
        },
        type: 'POST',
        success: function (data) {
            var obj = $.parseJSON('[' + data + ']');
            $.each(obj, function (key, value) {
                $.each(value, function (k, v) {
                    $.each(v, function (k1, v1) {
                        switch (displayType) {
                            case 'D':
                                setGameLineDecimal(v1);
                                break;
                            default :
                                setGameLine(v1);
                                break;
                        }

                    });


                });

            });
            setLinesTableFocus();
        }
    });
}

function openlines(node) {
    addGameHeader();
    setFilterParams(node);
    setLineStoresFilters();
    setGameLines();

}

function addGameLine(gameId, setPeriods, refresh, trId, keepFocusPos) {
    var displayType = $("#displayTypeFilter").val();
    addGameHeader();
    if (setPeriods === 'N') {

    } else {
        setLinePeriodFilter();
    }
    if (!refresh)
        $("#scheduleLines tbody tr").remove();

    $.ajax({
        url: "games/getgame",
        data: {
            'idGame': gameId,
            'store': $('#lineFilterStore').val(),
            'periodID': $('#lineFilterPeriod').val()
        },
        type: 'POST',
        success: function (data) {
            var obj = $.parseJSON('[' + data + ']');
            lineas = obj;
            if (refresh) {
                setGameLineByPosition(obj[0]["results"]["row1"], trId);
            } else {
                $.each(obj[0]["results"], function (key, value) {
                    switch (displayType) {
                        case 'D':
                            setGameLineDecimal(value);
                            break;
                        default :
                            setGameLine(value);
                            break;
                    }
                });
            }
        }
    });
    if (!keepFocusPos)
        setLinesTableFocus();
}

function getRowPositionToInsert(rotANumber) {
    var ret = 0;
    $("#bodytable tbody tr").each(function () {
        var td = $(this).find("td").eq(2);
        var rotNumber = $(td).find("input:text").val();
        if (parseInt(rotNumber) > parseInt(rotANumber)) {
            ret = $(this).attr("id");
            return false;
        }
    });
    return ret;
}