$(document).ready(function () {
    $(".btn-edit, .btn-cancel, .btn-save, #footer").hide();
    $('.sortable').sortable();
    $('.handles').sortable({
        handle: 'span'
    });
    $('.connected').sortable({
        connectWith: '.connected'
    });
    $('.exclude').sortable({
        items: ':not(.disabled)'
    });
    
    $('table.cell-border').DataTable({
        "bPaginate": false,
        "bFilter": false,
        "sScrollY": "500",
        "sScrollX": "100",
        "sScrollXInner": "100%",
        "bScrollCollapse": true
    });
    
    $(".dataTables_scrollHeadInner").css("width","100%");
    $(".resultsInsertionTable").css("width","100%");
    
    $("#orderPropsSend").click(function (){
        return displayRightDiv();
    });
});


function displayRightDiv(){
    if($("#proptype").val()==="Game"){
        $("#playersEditionDiv").css("display","none");
        $("#insertionResults").css("display","block");
        saveGameProps();
        return false;
    }else if($("#proptype").val()==="Player"){
        $("#propsInsertionOrderFrm").prop("action","playersedition");
        $("#propsInsertionOrderFrm").submit();
        return true;
    }
}



function saveGameProps(){
    var propsOrder="";
    $("input[name='props[]']").each(function (){
        propsOrder+=$(this).val()+"|";
    });
    $.ajax({
        url: "savegameprops",
        type: 'POST',
        data: {
            "gamesInfo":$("#gamesInfo").val(),
            "propsList":$("#propsList").val(),
            "props":propsOrder,
            "proptype":$("#proptype").val()
        },success: function (data) {
            
        }
    })
}
