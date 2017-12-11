$(document).ready(function() {
        $(".btn-edit, .btn-cancel, .btn-save, #footer").hide();
        $('table.cell-border').DataTable({
        "bPaginate": false,
        "bFilter": true,
        "sScrollY": "500",
        "sScrollX": "100",
        "sScrollXInner": "100%",
        "bScrollCollapse": true
    });
    $(".row").eq(2).attr("style","display:none");
    $(".row").eq(0).attr("style","display:none");
    $(".row").eq(4).attr("style","display:none");
    
    
    $('#searchTable1').keyup(function(){
          $("#1s").DataTable().search($(this).val()).draw() ;
    }); 
    $('#searchTable2').keyup(function(){
          $("#2s").DataTable().search($(this).val()).draw() ;
    }); 

    $('#searchTable3').keyup(function(){
          $("#3s").DataTable().search($(this).val()).draw() ;
    }); 
    
});


function addProp(field,type){
    if($(field).is(":checked")){
        $("#propsToCreate").val($("#propsToCreate").val()+$(field).val()+"%"+type+"|");
    }
}