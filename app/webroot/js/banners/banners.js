$(document).ready(function() { 
    assignEvents();       
});

function assignSports(){
    var sports = arraySports;
    var options = "<option value='Select' selected>Select</option>";
    $.each(sports,function(index){
        options += "<option value='"+index+"'>"+index+"</option>";
    });
    $("#sports").html(options);
}

function onChangeSport(){
    var sportSelected = $("#sports").val();
    var leagues = arraySports[sportSelected];

    if (typeof leagues != 'undefined'){
        var options = "<option value='' selected>Selected Sub Sport</option>";    
        $.each(leagues,function(index,content){
            options += "<option value='"+content+"'>"+content+"</option>";
        });
        $("#subSports").html(options);       
    }
}

function searchGames(){  
    $('#loadingModal').modal("toggle");
    var parameters = {
       sport: $("#sports").val(),
       subSport: $("#subSports").val(),
       initialDate: $("#initialDate").val(),
       endDate: $("#endDate").val(),
    };

    $.ajax({
        url: "/Banners/searchGames",
        type: 'POST',
        data: parameters,
        cache: false
    })
    .done(function(data){
        $('#loadingModal').modal("hide");
        $('#resultGames').html(data);
        $('#tlbGames').DataTable( {
            "order": [[ 1, "asc" ]],                
            "lengthMenu": [100,200],                
            "columns": [{'orderable': false }, null, null, null, null, null, {'orderable': false }, {'orderable': false }]
        });         
        markGamesCheckbox();        
    })
    .error(function(err){
        console.log(err);
        $('#loadingModal').modal("hide");
    });
}

function saveBanner(){

    if ($("#bannerDescription").val() == ''){
        
       $("#errorNoBanner").removeClass("error_hide").addClass("error_show_red"); 
       
    }else{       
       $("#errorNoBanner").removeClass("error_show_red").addClass("error_hide"); 
       
        var parameters = {
            banner: $("#bannerDescription").val()       
        };

        $.ajax({
             url: "/Banners/saveBanner",
             type: 'POST',
             data: parameters,
             cache: false,
             async : false
        })
        .done(function(data){
             if (data == 1){
                 $("#saveChangeSucces").modal("toggle");
             }   
        })
        .error(function(err){
             console.log(err);
        });
    }  

}

function deleteBanner(){
    var parameters = {
       idBanner: $("#bannerDelete").val()       
    };

    $.ajax({
        url: "/Banners/deleteBanner",
        type: 'POST',
        data: parameters,
        cache: false,
        async: false
    })
    .done(function(data){
        if (data == 1){
            $("#saveChangeSucces").modal("toggle");
        }   
    })
    .error(function(err){
        console.log(err);
    });
}


function assignEvents(){
    
    $("#sports").change(function (){        
         onChangeSport();
    }); 
    
    $("#btnCreateBanner").click(function (){        
        loadBanners();       
    }); 
    
    $('#btn_save').unbind('click');
    $('#btn_save').bind('click', function(){
        saveBanner();
    });
    
    $('.glyphicon-trash').unbind('click');
    $('.glyphicon-trash').bind('click', function(){
        deleteBanner();
    });
          
    $('#tlbGames .selectionGame').unbind('click');
    $('#tlbGames .selectionGame').bind("click",function(e){
        e.stopPropagation();
    });
        
    $('#initialDateBanner').datetimepicker({
       weekStart: 1,
       todayBtn: 1,
       autoclose: 1,
       todayHighlight: 1,
       startView: 2,
       minView: 2,
       forceParse: 0
    });
    
    $('#endDateBanner').datetimepicker({
       weekStart: 1,
       todayBtn: 1,
       autoclose: 1,
       todayHighlight: 1,
       startView: 2,
       minView: 2,
       forceParse: 0
    });
    

}

function loadBanners(){
   $.ajax({
        url: "/Banners/searchAllBanners",
        type: 'POST',
        dataType: 'json',
        cache: false
    })
    .done(function(data){
        var options = "<option value='' selected>Select Banner</option>";
        $.each(data,function(index,content){
            if ($.trim(content.ID) !=='')
                options += "<option value='"+$.trim(content.ID)+"'>"+$.trim(content.BannerName)+"</option>";
        });
        $("#bannerDelete").html(options);         
        $("#createBanner").modal("toggle");
    })
    .error(function(err){
        console.log(err);
    });
  
}

function closeMessage(){
    loadBanners();
    $("#saveChangeSucces").modal("hide");
    $("#bannerDescription").val('');
    $("#createBanner").modal("toggle");
}

function closeMessage2(){
    $("#saveChangeSucces2").modal("hide");
    searchGames();
}


function markGamesCheckbox(){
    //select all checkboxs
    $('.selectAll').unbind('click');
    $('.selectAll').bind('click', function(){        
        if ($(this).prop('checked') === true){
            $('.game').prop('checked', true);
        }
        else{
            $('.game').prop('checked', false);
        }
    });
}

function unmarkEventCheckbox(){    
    $('.game').prop('checked', false);
       
}

function searchGamesSelected(){
    var arrayGames = new Array();
    var elements = $('#resultGames').find('.selectedGame input[type=checkbox]');

    $.each($(elements), function(i, item){
        if ($(item).is(':checked')) {
            var gamenum = $(item).attr('gamenum');
            var scheduleText = $(item).attr('scheduletext');
            var sportType = $(item).attr('sporttype');
            var sportSubtype = $(item).attr('sportsubtype');
            var team1RotNum = $(item).attr('team1rotnum');
            var team1Id = $(item).attr('team1id');
            var team2RotNum = $(item).attr('team2rotnum');
            var team2Id = $(item).attr('team2id');
            var gameDate = $(item).attr('gameDate');

            var parameters = {
               gamenum : gamenum,
               scheduleText : scheduleText,
               sportType : sportType,
               sportSubtype : sportSubtype,
               team1RotNum : team1RotNum,
               team1Id : team1Id,
               team2RotNum : team2RotNum,
               team2Id : team2Id,
               gameDate: gameDate,
               banner : $("#assignBannerSelector").val(),
               database : $("#database").val()
            };
            arrayGames.push(parameters);
        }
    }); 
  
    var games = JSON.stringify(arrayGames);

    if (arrayGames.length > 0)
        assignBanner(games);  
    else
       $("#selectAgame").modal("toggle");
}

function assignBanner(games){    
    var parameters = {
       games: games       
    };
    $('#loadingModal').modal("toggle");
    $.ajax({
        url: "/Banners/assignBanner",
        type: 'POST',
        data: parameters,
        cache: false,
        async : true
    })
    .done(function(data){
       if (data === '1'){
            $('#loadingModal').modal("hide");
            $("#saveChangeSucces2").modal("toggle");
            return false;
       }else{
          $('#loadingModal').modal("hide");
       }    
    })
    .error(function(err){
        console.log(err);
        $('#loadingModal').modal("hide");
    });
    return false;
}

function saveAction(){
     var element=$("#assignBannerSelector");
    if ($("#assignBannerSelector").val() === ''){ 
       var error_element=$("span", element.parent());
       error_element.removeClass("error_hide").addClass("error_show_white"); 
    }else if ($("#database").val() === ''){ 
        $("#error_databases").removeClass("error_hide").addClass("error_show_white");         
        
    }else{
       var error_element=$("span", element.parent());
       error_element.removeClass("error_show_white").addClass("error_hide"); 
        $("#error_databases").removeClass("error_show_white").addClass("error_hide");         
       searchGamesSelected();
    }  
    return false;
}

function cancelAction(){
    
}

