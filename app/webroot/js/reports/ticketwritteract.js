var tmp;


$(document).ajaxStart(function () {
    $("#loadingModal").modal('toggle');
});


$(document).ajaxStop(function () {
    $("#loadingModal").modal('toggle');
});


$(document).ready(function () {
    $(".btn-edit, .btn-cancel, .btn-save, #footer").hide();
    for(i=0;i<25;i++){
        addRow(1,2,3,4,5);
    }
    
    $("#resetID").click(function (){
        $("#msgConfirmationSpan").text("Do you Really want to reset this ID?")
        $("#defaultMsgConfModal").modal("toggle");
    });
});


function addRow(val1,val2,val3,val4,val5){
    var table=$("#linehistoryTableBody");
    var tr=$("<tr></tr>");
    
    var td1="<td class='halfColumn'><input type='radio' name='selectToReset'/></td>";
    var td2="<td>"+val1+"</td>";
    var td3="<td>"+val2+"</td>";
    var td4="<td>"+val3+"</td>";
    var td5="<td>"+val4+"</td>";
    var td6="<td>"+val5+"</td>";
    
    tr.append(td1);
    tr.append(td2);
    tr.append(td3);
    tr.append(td4);
    tr.append(td5);
    tr.append(td6);
    
    table.append(tr);
}