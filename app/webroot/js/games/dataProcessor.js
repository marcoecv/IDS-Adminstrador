
function processData(valor, total) {
    var returnValue = "";
    if (valor === null || valor === 0 || valor === '0.0') {
        if ((valor === 0 || valor === '0.0') && total === 's')
            returnValue = "pk";
        else
            returnValue = "";
    } else {
        if (valor === '-0.5') {
            returnValue = "-&frac12;";
        } else if (valor === '0.5') {
            returnValue = "&frac12;";
        } else {
            if (valor.split("."))
                var array = valor.split(".");
            if (array[1] === '5') {
                returnValue = (array[0] === '0' ? "" : array[0]) + "&frac12;";
            } else if (array[1] === '25') {
                returnValue = (array[0] === '0' || array[0] === '-0' ? (total === 's' ? "pk" : "") : array[0]) + ", " + (array[0] === '0' || array[0] === '-0' ? (array[0] === '-0' ? "-" : "") : array[0]) + "&frac12;";
            } else if (array[1] === '75') {
                if (array[0] >= 0) {
                    var tmp = parseInt(array[0]) + 1;
                    returnValue = (array[0] === '0' || array[0] === '-0' ? "" : array[0]) + "&frac12;, " + tmp;
                } else {
                    var tmp = parseInt(array[0]) - 1;
                    returnValue = (array[0] === '0' ? "" : array[0]) + "&frac12;, " + tmp;
                }

            } else {
                returnValue = (array[0] === '0' ? "" : array[0]);
            }
        }
        if (valor >= 0 && total === 't') {
            if (returnValue === "") {
                returnValue = valor;
            } else {
                returnValue = "" + returnValue;
            }
        }
        if (valor > 0 && total !== 't') {
            if (returnValue === "") {
                returnValue = valor;
            } else {
                returnValue = "+" + returnValue;
            }
        }
    }
    return returnValue;
}



function processModalData(valor, total) {
    var returnValue = "";
    if (valor === null) {
        returnValue = "";
    } else if (valor === 0 || valor === "0.0") {
        returnValue = 0;
    } else {
        if (valor === '-0.5') {
            returnValue = "-½";
        } else if (valor === '0.5') {
            returnValue = "½";
        } else {
            if (valor.split("."))
                var array = valor.split(".");
            if (array[1] === '5') {
                returnValue = (array[0] === '0' || array[0] === '-0' ? "" : array[0]) + "½";
            } else if (array[1] === '25') {
                returnValue = (array[0] === '0' || array[0] === '-0' ? "0" : array[0]) + ", " + (array[0] === '0' || array[0] === '-0' ? (array[0] === '-0' ? "-" : "") : array[0]) + "½";
            } else if (array[1] === '75') {
                if (array[0] >= 0) {
                    var tmp = parseInt(array[0]) + 1;
                    returnValue = (array[0] === '0' || array[0] === '-0' ? "" : array[0]) + "½, " + tmp;
                } else {
                    var tmp = parseInt(array[0]) - 1;
                    returnValue = (array[0] === '0' || array[0] === '-0' ? "" : array[0]) + "½, " + tmp;
                }

            } else {
                returnValue = (array[0] === '0' ? "" : array[0]);
            }
        }
        if (valor >= 0 && total === 't') {
            if (returnValue === "") {
                returnValue = valor;
            } else {
                returnValue = "" + returnValue;
            }
        }
        if (valor > 0 && total !== 't') {
            if (returnValue === "") {
                returnValue = valor;
            } else {
                returnValue = "+" + returnValue;
            }
        }
    }
    if(total==='t'&&(returnValue===0||returnValue===0.0))
        returnValue="";
    return returnValue;
}


function processUpdaterData(valor, total) {
    var returnValue = "";
    if (valor === null || valor === 0 || valor === '0.0') {
        if ((valor === 0 || valor === '0.0') && total === 's')
            returnValue = "pk";
        else
            returnValue = "";
    } else {
        if (valor === '-0.5') {
            returnValue = "-½";
        } else if (valor === '0.5') {
            returnValue = "½";
        } else {
            if (valor.split("."))
                var array = valor.split(".");
            if (array[1] === '5') {
                returnValue = (array[0] === '0' ? "" : array[0]) + "½";
            } else if (array[1] === '25') {
                returnValue = (array[0] === '0' || array[0] === '-0' ? (total === 's' ? "pk" : "") : array[0]) + ", " + (array[0] === '0' || array[0] === '-0' ? (array[0] === '-0' ? "-" : "") : array[0]) + "½";
            } else if (array[1] === '75') {
                if (array[0] >= 0) {
                    var tmp = parseInt(array[0]) + 1;
                    returnValue = (array[0] === '0' || array[0] === '-0' ? "" : array[0]) + "½, " + tmp;
                } else {
                    var tmp = parseInt(array[0]) - 1;
                    returnValue = (array[0] === '0' ? "" : array[0]) + "½, " + tmp;
                }

            } else {
                returnValue = (array[0] === '0' ? "" : array[0]);
            }
        }
        if (valor <=0 && total === 't') {
            if (returnValue === "") {
                returnValue = valor;
            } else {
                returnValue = "" + returnValue;
            }
        }
        if (valor > 0 && total !== 't') {
            if (returnValue === "") {
                returnValue = valor;
            } else {
                returnValue = "+" + returnValue;
            }
        }
    }
    return returnValue;
}


function changeValues(field, type) {
    var value = $(field).val();
    var newValue = value.replace("/", '½');

    var lastChar = value.substring(value.length, value.length - 1);
    if (lastChar === '/') {
        var newValue = value.replace("/", '½');
    }
    if (lastChar === ',') {
        if (value.indexOf('½') > -1) {
            var tmp = value.substring(0, value.indexOf('½'));
            if (parseInt(tmp) < 0)
                var newNumber = parseInt(tmp) - 1;
            else
                var newNumber = parseInt(tmp) + 1;
            newValue = value.replace(",", ", " + newNumber);
        } else {
            var tmp = value.substring(0, value.indexOf(','));
            if (tmp === '0' || tmp === '-0') {
                var newNumber = '½';
                newValue = value.replace(",", ", " + newNumber);
            } else {
                var newNumber = tmp + '½';
                newValue = value.replace(",", ", " + newNumber);
            }
        }
    }
    if (type !== 't') {
        if (newValue.substring(0, 1) !== '-') {
            newValue = "-" + newValue;
        }
    }
    $(field).val(newValue);
}

function spreadinvert(opcion) {


    if (opcion == 1) {
        var valor = $("#spreadt2").val().length;
        if (valor > 1) {
            $("#spreadt1").val("");
        }



    } else {
        var valor = $("#spreadt1").val().length;
        if (valor > 1) {
            $("#spreadt2").val("");
        }

    }

}




function processDataOut(value, wagerType) {
    if (value.indexOf('½') < 0) {
        if(value<0&&wagerType==='T')
            return value*-1;
        else
            return value;
    } else {
        if (value.indexOf(',') < 0) {
            var stringPoints = value.substring(0, value.indexOf('½'));
            var points;
            if (stringPoints === '-'||stringPoints===""){
                points = 0;
            }else{
                points = parseInt(stringPoints);
            }
            if (points >= 0 && stringPoints !== "-"){
                return points + 0.5;
            }else{
                if(wagerType==='T')
                    return points*-1 +0.5;
                else
                    return points - 0.5;
            }
        } else {
            var splitted = value.split(", ");
            var points;
            if (splitted[0].indexOf('½') > -1) {
                points = parseInt(splitted[1]);
                if (points >= 0)
                    points = points - 0.25;
                else {
                    points = points + 0.25;
                }
            } else if (splitted[1].indexOf('½') > -1) {
                points = parseInt(splitted[0]);
                if (points >= 0)
                    points = points + 0.25;
                else {
                    points = points - 0.25;
                }
            }
            if(points < 0 && wagerType==='T')
                return points*-1;
            else
                return points;
        }
    }
}
