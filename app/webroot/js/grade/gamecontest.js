var tmp=[];
$(document).ready(function() {
    hideSpreadTotal();
    setContestGrading();
//    setTotalGrading();
//    setSpreadGrading()
    $(".btn-edit").hide();
    
    $('#dfDate').datetimepicker({
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0
    });
});


function saveAction() {
	
}

function setLoseContestant(current){
//    cleanRadios();
    $(current).attr('checked','true');
    tmp=current;
    $.each($("#gradingTableBody").find('tr'),function (key,value){
        var win=$($(value).find('td')[1]).find('input');
        var lose=$($(value).find('td')[3]).find('input');
        if(!($(win).is(":checked"))){
            $(lose).attr('checked', true);
        }
    });
}


function cleanRadios(){
    $.each(($("#gradingTableBody").find('tr').find('td')).find('input'),function (key,value){
            $(value).attr('checked',false);
    });
}
function cancelAction() {
	window.location = "/administrator/index.php/games";
}

function setTotalGrading(){
    $("#spread").attr('style','display:block');
    var header=$("#gradingTable");
    var table=$("#gradingTableBody");
    
    
    var trHeader=$("<tr></tr>");
    var tdHeader1="<td>Contestant</td>";
    trHeader.append(tdHeader1);
    header.append(trHeader);
    
    var trTable=$("<tr></tr>");
    var trTable2=$("<tr></tr>");
    var td1="<td>Over</td>";
    trTable.append(td1);
    table.append(trTable);
    
    var td1="<td>Under</td>";
    trTable2.append(td1);
    table.append(trTable2);
}

function setSpreadGrading(){
    $("#total").attr('style','display:block');
    var header=$("#gradingTable");
    var table=$("#gradingTableBody");
    
    var trHeader=$("<tr></tr>");
    
    var tdHeader1="<td>Contestant</td>";
    var tdHeader2="<td>Win</td>";
    var tdHeader3="<td>Tie</td>";
    var tdHeader4="<td>Lose</td>";
    
    trHeader.append(tdHeader1);
    trHeader.append(tdHeader2);
    trHeader.append(tdHeader3);
    trHeader.append(tdHeader4);

    header.append(trHeader);
    
    
    for(var i=0;i<2;i++){
        var trTable=$("<tr></tr>");
        var td1="<td>Team #"+i+"</td>";
        var td2="<td><input type='radio' name='res' value='w' onchange='setLoseContestant(this)'/></td>";
        var td3="<td><input type='radio' name='res' value='t'/></td>";
        var td4="<td><input type='radio' name='res' value='l'/></td>";
        trTable.append(td1);
        trTable.append(td2);
        trTable.append(td3);
        trTable.append(td4);
        
        table.append(trTable);
    }
    
    
    var trTable=$("<tr></tr>");
}

function setContestGrading(){
    hideSpreadTotal();
    var header=$("#gradingTable");
    var table=$("#gradingTableBody");
    
    var trHeader=$("<tr></tr>");
    
    var tdHeader1="<td>Contestant</td>";
    var tdHeader2="<td>Win</td>";
    var tdHeader3="<td>Tie</td>";
    var tdHeader4="<td>Lose</td>";
    var tdHeader5="<td>Scrath</td>";
    
    trHeader.append(tdHeader1);
    trHeader.append(tdHeader2);
    trHeader.append(tdHeader3);
    trHeader.append(tdHeader4);
    trHeader.append(tdHeader5);

    header.append(trHeader);
    
    for(var i=0;i<10;i++){
        var trTable=$("<tr></tr>");
        var td1="<td>Contest #"+i+"</td>";
        var td2="<td><input type='radio' name='res' value='w' onchange='setLoseContestant(this)'/></td>";
        var td3="<td><input type='radio' name='res' value='t'/></td>";
        var td4="<td><input type='radio' name='res' value='l'/></td>";
        var td5="<td><input type='radio' name='res' value='s'/></td>";
        trTable.append(td1);
        trTable.append(td2);
        trTable.append(td3);
        trTable.append(td4);
        trTable.append(td5);
        
        table.append(trTable);
    }
}
function hideSpreadTotal(){
    $("#spread").attr('style','display:none');
    $("#total").attr('style','display:none');
}