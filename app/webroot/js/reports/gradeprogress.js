$(document).ready(function () {
    $(".btn-edit, .btn-cancel, .btn-save, #footer").hide();
    
    $('table.cell-border').DataTable({
        "bPaginate": false,
        "bFilter": true,
        "sScrollY": "400",
        "sScrollX": "100",
        "sScrollXInner": "100%",
        "bScrollCollapse": true
    });

});
