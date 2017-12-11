$(document).ready(function() {
        $(".btn-edit, .btn-cancel, .btn-save, #footer").hide();
        
        $("#savePlayerPropButton").click(function (){
           savePlayerProps(); 
        });
});

function addPlayersToList(selectId,inp1Id,inp2Id){
    var player1=$("#"+inp1Id).val();
    var player2=$("#"+inp2Id).val();
    
    var opt=new Option(player1+"-"+player2,player1+"-"+player2);
    $(opt).attr("selected","selected");
    $(opt).attr("ondblclick","removeOption('"+selectId+"','"+player1+"-"+player2+"')");
    $("#"+selectId).append(opt);
    
    $("#"+inp1Id).val("");
    $("#"+inp2Id).val("");
}

function addPlayerToList(selectId,inp1Id){
    var player1=$("#"+inp1Id).val();
    var opt=new Option(player1,player1);
    $(opt).attr("selected","selected");
    $(opt).attr("ondblclick","removeOption('"+selectId+"','"+player1+"')");
    $("#"+selectId).append(opt);
    $("#"+inp1Id).val("");
}


function removeOption(selectId,optValue){
    $("#"+selectId+" option[value='" + optValue + "']").each(function () {
            $(this).remove();
        });
}


function savePlayerProps(){
    var playersSelects=document.getElementsByName("players[]");
    var propInputs=document.getElementsByName("propInfo[]");
    
    var playersArray=[];
    var propsInfoArray=[];
    
    $(playersSelects).each(function (key,val){
        var players="";
        $(this).find("option").each(function (key2,val2){
            players+=$(this).val()+",";
        });
        playersArray.push(players);
    });
    
    $(propInputs).each(function (key,val){
        propsInfoArray.push($(this).val());
    });
    
    $.ajax({
        url: "savePlayerProps",
        type: 'POST',
        data: {
            "players":playersArray,
            "propsInfo":propsInfoArray
        },success: function (data) {
            alert(data);
        }
    });
}