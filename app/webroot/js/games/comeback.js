
function findCent(value) {
    var cent = 0;
    var reference = value < 0 ? value : value * -1;
    var array = $.map(chart, function (value, index) {
        return [value];
    });
    for (var i = 0; i < array.length; i++) {
        if (reference <= parseInt(array[i].StartingPrice) && reference >= parseInt(array[i].EndingPrice)) {
            cent = parseInt(array[i].CentsDifference);
            break;
        }
    }

    if (value > 0 && cent !== 0) {
        for (var i = 0; i < array.length; i++) {
            if ((reference - cent) <= parseInt(array[i].StartingPrice) && (reference - cent) >= parseInt(array[i].EndingPrice)) {
                cent = parseInt(array[i].CentsDifference);
                break;
            }
        }
    }
    return cent;
}

function getComeBack(value) {
    var cent = findCent(value);
    var comeback = (parseInt(value) + cent) * -1;
    if (comeback < 100 && comeback > -100) {
        return ((100 - comeback) * 2 + comeback) * -1;
    }
    return comeback;
}


function float2frat(x) {
    var tolerance = 1.0E-2;
    var h1 = 1;
    var h2 = 0;
    var k1 = 0;
    var k2 = 1;
    var b = x;
    do {
        var a = Math.floor(b);
        var aux = h1;
        h1 = a * h1 + h2;
        h2 = aux;
        aux = k1;
        k1 = a * k1 + k2;
        k2 = aux;
        b = 1 / (b - a);
    } while (Math.abs(x - h1 / k1) > x * tolerance);
    var result;
    result = h1 + "/" + k1;
    return result;
}

function ConvertDecimalFractional(decimal) {
    return this.float2frat(decimal - 1);
}
function calcDecimalValue(price) {
    return (price < 0) ? (100 / Math.abs(price) + 1) : (Math.abs(price) / 100 + 1);
}

function ConvertDecimalAmerican(decimal) {
    return (decimal < 2) ? (100 / (decimal - 1)) : ((decimal - 1) * 100);
}

function calcComeBackAmerican(price, wagerType, favTeam) {
    var comebackAmerican = getComeBack(price);
    var comebackDecimal = calcDecimalValue(comebackAmerican);
    var comebackFrac = ConvertDecimalFractional(comebackDecimal);
    var favDecimal = calcDecimalValue(price);
    var favFrac = ConvertDecimalFractional(favDecimal);

    switch (wagerType) {
        case 'S':
            fillSpreadLineInfo(price, comebackAmerican, favDecimal, comebackDecimal, favFrac, comebackFrac, favTeam, "A");
            break;
        case 'M':
            fillmoneyLineLineInfo(price, comebackAmerican, favDecimal, comebackDecimal, favFrac, comebackFrac, favTeam, "A");
            break;
        case 'T':
            fillTotalLineInfo(price, comebackAmerican, favDecimal, comebackDecimal, favFrac, comebackFrac, favTeam, "A");
            break;
        case 'TT':
            fillTeamTotalLineInfo(price, comebackAmerican, favDecimal, comebackDecimal, favFrac, comebackFrac, favTeam, "A");
            break;
    }

}


function calcComeBackDecimal(price, wagerType, favTeam) {
    var americanPrice = ConvertDecimalAmerican(price);
    var comebackAmerican = getComeBack(americanPrice);
    var comebackDecimal = calcDecimalValue(comebackAmerican);
    var comebackFrac = ConvertDecimalFractional(comebackDecimal);

    var favDecimal = price;
    var favFrac = ConvertDecimalFractional(favDecimal);

    switch (wagerType) {
        case 'S':
            fillSpreadLineInfo(Math.round(americanPrice), Math.round(comebackAmerican), price, comebackDecimal, favFrac, comebackFrac, favTeam, "D");
            break;
        case 'M':
            fillmoneyLineLineInfo(Math.round(americanPrice), Math.round(comebackAmerican), price, comebackDecimal, favFrac, comebackFrac, favTeam, "D");
            break;
        case 'T':
            fillTotalLineInfo(Math.round(americanPrice), Math.round(comebackAmerican), price, comebackDecimal, favFrac, comebackFrac, favTeam, "D");
            break;
        case 'TT':
            fillTeamTotalLineInfo(Math.round(americanPrice), Math.round(comebackAmerican), price, comebackDecimal, favFrac, comebackFrac, favTeam, "D");
            break;
    }

}

function getChart(sport, league, wagetType) {
    $.ajax({
        url: "games/findPriceOffering",
        type: 'POST',
        data: {
            "store": $("#lineFilterStore").val(),
            "sportType": sport,
            "sportSubType": league,
            "periodNumber": $("#lineFilterPeriod").val(),
            "wagerType": wagetType,
        },
        success: function (data) {
            var obj = JSON.parse(data);
            findChart(obj['row1']['LineType'].trim());
        }
    });
}

function findChart(lineType){
    $.ajax({
        url: "settings/getchartlines/"+lineType,
        success: function (data) {
            var obj = JSON.parse(data);
            chart = obj;
        }
    });
}