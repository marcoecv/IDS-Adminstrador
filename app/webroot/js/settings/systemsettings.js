$(document).ready(function () {
    $(".btn-edit").hide();
    
    $("#maxBet").click(function (){
        enableMaxBetFields();
    });
    
    
});

function enableMaxBetFields(){
    $.each($("#centralValues").find('input'),function (key, value){
        $(value).removeAttr('disabled');
    });
}