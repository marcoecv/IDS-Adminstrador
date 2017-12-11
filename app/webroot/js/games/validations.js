$(document).ready(function () {
    $("#oddProp").change(function () {
        if (!validatePropPrice())
            alert("Invalid price value");
        else
            priceLineValidationFlag = true;
    });

    $("#pricesp1").change(function () {
        if ($("#displayTypeFilter").val() === "A") {
            if (!validateSPPrice("A"))
                alert("Invalid Spread price value");
        } else {
            priceLineValidationFlag = true;
        }
    });

    $("#pricesp2").change(function () {
        if ($("#displayTypeFilter").val() === "A") {
            if (!validateSPPrice("H"))
                alert("Invalid Spread price value");
        } else {
            priceLineValidationFlag = true;
        }
    });

    $("#mlPricet1").change(function () {
        if ($("#displayTypeFilter").val() === "A") {
            if (!validateMLPrice("A"))
                alert("Invalid Money Line price value");
        } else {
            priceLineValidationFlag = true;
        }
    });

    $("#mlPricet2").change(function () {
        if ($("#displayTypeFilter").val() === "A") {
            if (!validateMLPrice("H"))
                alert("Invalid Money Line price value");
        } else {
            priceLineValidationFlag = true;
        }
    });

    $("#mlPricet3").change(function () {
        if ($("#displayTypeFilter").val() === "A") {
            if (!validateMLPrice("D"))
                alert("Invalid Money Line price value");
        } else {
            priceLineValidationFlag = true;
        }
    });

    $("#tPricet1").change(function () {
        if ($("#displayTypeFilter").val() === "A") {
            if (!validateTPrice("A"))
                alert("Invalid Total price value");
        } else {
            priceLineValidationFlag = true;
        }
    });

    $("#tPricet2").change(function () {
        if ($("#displayTypeFilter").val() === "A") {
            if (!validateTPrice("H"))
                alert("Invalid Total price value");
        } else {
            priceLineValidationFlag = true;
        }
    });

    $("#pricett1").change(function () {
        if ($("#displayTypeFilter").val() === "A") {
            if (!validateTTPrice("A"))
                alert("Invalid Team Total price value");
        } else {
            priceLineValidationFlag = true;
        }
    });

    $("#pricett2").change(function () {
        if ($("#displayTypeFilter").val() === "A") {
            if (!validateTTPrice("H"))
                alert("Invalid Team Total price value");
        } else {
            priceLineValidationFlag = true;
        }
    });

    $("#gameEditfrm").validationEngine({
        ajaxFormValidation: true,
        onAjaxFormComplete: ajaxValidationCallbackEdit,
        scroll: false
    });

    $("#spreadModalFrm").validationEngine({
        ajaxFormValidation: true,
        onAjaxFormComplete: ajaxValidationCallbackSP,
        scroll: false
    });

    $("#moneyLineModalFmr").validationEngine({
        ajaxFormValidation: true,
        onAjaxFormComplete: ajaxValidationCallbackML,
        scroll: false
    });

    $("#totalModalFrm").validationEngine({
        ajaxFormValidation: true,
        onAjaxFormComplete: ajaxValidationCallbackT,
        scroll: false
    });

    $("#teamTotalModalFrm").validationEngine({
        ajaxFormValidation: true,
        onAjaxFormComplete: ajaxValidationCallbackT,
        scroll: false
    });

    $("#editPropLineFrm").validationEngine({
        ajaxFormValidation: true,
        onAjaxFormComplete: ajaxValidationCallbackPROP,
        scroll: false
    });

    $("#propsfrm").validationEngine({
        ajaxFormValidation: true,
        onAjaxFormComplete: ajaxValidationCallbackPropCreate,
        scroll: false
    });


});

function validateContestantCant(form) {
    if(form==="create"){
        if ($("#over_under").is(":checked") || $("#spread_prop").is(":checked")) {
            if ($("#contestant").find("option").length > 1)
                return false;
            else
                return true;
        } else {
            return true;
        }
    }else if(form==="edit"){
        if ($("#over_under_edit").is(":checked") || $("#spread_prop_edit").is(":checked")) {
            if ($("#contestant_edit").find("option").length > 1)
                return false;
            else
                return true;
        } else {
            return true;
        }
    }else if(form==="createFP"){
        if ($("#over_underFP").is(":checked") || $("#spread_propFP").is(":checked")) {
            if ($("#contestantFP").find("option").length > 1)
                return false;
            else
                return true;
        } else {
            return true;
        }
    }
}

function validateSPPrice(team) {
    if (team === "A") {
        var p1 = $("#pricesp1").val();
        if (p1 !== "" && (p1 > -100 && p1 < 100)) {
            priceLineValidationFlag = false;
            return false;
        } else {
            priceLineValidationFlag = true;
            return true;
        }
    } else if (team === "H") {
        var p2 = $("#pricesp2").val();
        if (p2 !== "" && (p2 > -100 && p2 < 100)) {
            priceLineValidationFlag = false;
            return false;
        } else {
            priceLineValidationFlag = true;
            return true;
        }
    }
}
function validateMLPrice(team) {
    if (team === "A") {
        var p1 = $("#mlPricet1").val();
        if (p1 !== "" && (p1 > -100 && p1 < 100)) {
            priceLineValidationFlag = false;
            return false;
        } else {
            priceLineValidationFlag = true;
            return true;
        }
    } else if (team === "H") {
        var p2 = $("#mlPricet2").val();
        if (p2 !== "" && (p2 > -100 && p2 < 100)) {
            priceLineValidationFlag = false;
            return false;
        } else {
            priceLineValidationFlag = true;
            return true;
        }
    } else if (team === "D") {
        var p3 = $("#mlPricet3").val();
        if (p3 !== "" && (p3 > -100 && p3 < 100)) {
            priceLineValidationFlag = false;
            return false;
        } else {
            priceLineValidationFlag = true;
            return true;
        }
    }
}
function validateTPrice(team) {
    if (team === "A") {
        var p1 = $("#tPricet1").val();
        if (p1 !== "" && (p1 > -100 && p1 < 100)) {
            priceLineValidationFlag = false;
            return false;
        } else {
            priceLineValidationFlag = true;
            return true;
        }
    } else if (team === "H") {
        var p2 = $("#tPricet2").val();
        if (p2 !== "" && (p2 > -100 && p2 < 100)) {
            priceLineValidationFlag = false;
            return false;
        } else {
            priceLineValidationFlag = true;
            return true;
        }
    }
}
function validateTTPrice(team) {
    if (team === "A") {
        var p1 = $("#pricett1").val();
        if (p1 !== "" && (p1 > -100 && p1 < 100)) {
            priceLineValidationFlag = false;
            return false;
        } else {
            priceLineValidationFlag = true;
            return true;
        }
    } else if (team === "H") {
        var p2 = $("#pricett2").val();
        if (p2 !== "" && (p2 > -100 && p2 < 100)) {
            priceLineValidationFlag = false;
            return false;
        } else {
            priceLineValidationFlag = true;
            return true;
        }
    }
}

function validatePropPrice() {
    var p1 = $("#oddProp").val();
    if (p1 !== "" && (p1 > -100 && p1 < 100)) {
        priceLineValidationFlag = false;
        return false;
    } else {
        priceLineValidationFlag = true;
        return true;
    }
}

function ajaxValidationCallbackEdit(status, form, json, options) {
    if (status === true) {
        $(':input', '#gameEditfrm').not(':button, :submit, :reset, :hidden').val('').removeAttr('checked').removeAttr('selected');
        $("#message_sent").slideDown(400).delay(3000).slideUp(400);
    }
}

function ajaxValidationCallbackSP(status, form, json, options) {
    if (status === true) {
        $(':input', '#spreadModalFrm').not(':button, :submit, :reset, :hidden').val('').removeAttr('checked').removeAttr('selected');
        $("#message_sent").slideDown(400).delay(3000).slideUp(400);
    }
}

function ajaxValidationCallbackML(status, form, json, options) {
    if (status === true) {
        $(':input', '#moneyLineModalFmr').not(':button, :submit, :reset, :hidden').val('').removeAttr('checked').removeAttr('selected');
        $("#message_sent").slideDown(400).delay(3000).slideUp(400);
    }
}

function ajaxValidationCallbackT(status, form, json, options) {
    if (status === true) {
        $(':input', '#totalModalFrm').not(':button, :submit, :reset, :hidden').val('').removeAttr('checked').removeAttr('selected');
        $("#message_sent").slideDown(400).delay(3000).slideUp(400);
    }
}

function ajaxValidationCallbackTT(status, form, json, options) {
    if (status === true) {
        $(':input', '#teamTotalModalFrm').not(':button, :submit, :reset, :hidden').val('').removeAttr('checked').removeAttr('selected');
        $("#message_sent").slideDown(400).delay(3000).slideUp(400);
    }
}

function ajaxValidationCallbackPROP(status, form, json, options) {
    if (status === true) {
        $(':input', '#editPropLineFrm').not(':button, :submit, :reset, :hidden').val('').removeAttr('checked').removeAttr('selected');
        $("#message_sent").slideDown(400).delay(3000).slideUp(400);
    }
}

function ajaxValidationCallbackPropCreate(status, form, json, options) {
    if (status === true) {
        $(':input', '#propsfrm').not(':button, :submit, :reset, :hidden').val('').removeAttr('checked').removeAttr('selected');
        $("#message_sent").slideDown(400).delay(3000).slideUp(400);
    }
}


function validateNumberScore(e){
//    alert(e.keyCode)
    if((e.keyCode<48||e.keyCode>57)&&(e.keyCode!==8)&&(e.keyCode<96||e.keyCode>105)&&(e.keyCode!==9)){
        return false;
    }
}