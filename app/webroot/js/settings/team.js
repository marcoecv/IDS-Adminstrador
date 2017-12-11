var tmp;
$(document).ready(function() {
	
	$(".btn-edit, .btn-cancel, .btn-save, #footer").hide();
	
	$("#removeTeam").click(function(){
		$("#deleteTeamModal").modal("toggle");
	});
	
        
        
	$("#addTeam").click(function(){
            var sport=$("#sportid").val();
            var subSport=$("#leagueid").val();
            
            if(sport===""||subSport===""||subSport==="*"){
                $("#messageSpan").text("Please select a Sport and League to continue");
                $("#defaultMsgModal").modal('toggle');
            }else{
                $("#createTeamModal").modal("toggle");
            }
		
	});

	$("#teamfrm input").click(function(){
		$("#playerDiv").slideDown('slow');
	});
	
	$("#saveTeam").click(function (){
            $("#createTeamModal").modal("toggle");
            var newTeam=$("#teamName").val();
            var sport=$("#sportid").val();
            var subSport=$("#leagueid").val();
            $.ajax({
               url: "insertteam",
               type: 'POST',
               data: {
                   "newTeam":newTeam,
                   "sport":sport,
                   "subSport":subSport
               },
               success: function (data) {
                   if (data > 0) {
                        $("#messageSpan").text("The Team has been created");
                        $("#defaultMsgModal").modal('toggle');
                    } else {
                        $("#messageSpan").text("The team has not been created due to an error");
                        $("#defaultMsgModal").modal('toggle');
                    }
                    loadTeams();
                    $("#teamName").val("");
                }
                
            });
        });
        
        
        $("#deleteTeam").click(function (){
            $("#deleteTeamModal").modal("toggle");
            var newTeam=getSelectedTeam();
            var sport=$("#sportid").val();
            var subSport=$("#leagueid").val();
            $.ajax({
                url: "deleteteam",
                type: 'POST',
                data: {
                   "newTeam":newTeam,
                   "sport":sport,
                   "subSport":subSport
               },
               success: function (data) {
                    var obj= $.parseJSON('' + data + '');
                    if(obj['error'].length>0&&obj['error'][0]!=="")
                       $("#messageSpan").text("Successfull deleted teams:"+obj['success'].length+" "+obj['success']+"\n Teams not deleted due to an error:"+obj['error'].length+" "+obj['error']);
                    else
                        $("#messageSpan").text("All teams was deleted succesfully");
                    
                    $("#defaultMsgModal").modal('toggle');
                   loadTeams();
                }
            });
        });
        
        
	$("#confirmationButton").click(function(){
		$(".modal:visible").modal("toggle");
	});

});

function getSelectedTeam(){
    var teams="";
    $.each($(".optionTable").find(":checked"),function (key, value){
        teams+=$(value).val().trim()+"|";
    });
    return teams;
}
function applyModal() {
	$(".modal:visible").modal("toggle");
	$("#confirmationModal").modal("toggle");
}



function loadLeagues(checkField){
    $.ajax({
        url: "loadleagues/"+$(checkField).val(),
        type: 'POST',
        success: function (data) {
            var obj = $.parseJSON(''+data+'');
            $('#leagueid').find('option').remove();
            var option=$("<option></option>");
                $("#leagueid").append(option);
                var option2=$("<option value='*'>Select All</option>");
                $("#leagueid").append(option2);
            $.each(obj, function(key, value) {
                var option=$("<option value='"+value['SportSubType']+"'>"+value['SportSubType']+"</option>");
                $("#leagueid").append(option);
            });
            
        }
    });
    
}

function loadTeams(){
    var sport=$("#sportid").val();
    var league=$("#leagueid").val();
    
    $.ajax({
        url: "loadteams",
        type: 'POST',
        data: {
            "sport":sport,
            "league":league
        },success: function (data) {
            var div=$("#teamsSeccion");
            var obj = $.parseJSON(''+data+'');
            $("#teamfrm tbody").html("");
            $.each(obj, function(key, value) {
            	var tr = $("<tr></tr>");
                var td1 = $("<td></td>").
                        attr({"style": "width: 40px; text-align: center;"});
                var td2 = $("<td></td>");
                var input = $("<input></input>").
                        attr({"id": value['TeamID'], "type": "checkbox", "name": "subsportid", "value": value['TeamID']});

                td1.append(input);
                td2.append(value['TeamID']);
                
                tr.append(td1);
                tr.append(td2);

                $("#teamfrm tbody").append(tr);
            	
                /*var input="<input type='radio' name='sportid'>&nbsp;&nbsp;"+value['TeamID']+"</input>\n\
                            <a href='#' title='Delete Sport'><span class='glyphicon glyphicon-remove'></span></a>\n\
                            <br />";
                
                
                div.append(input);*/
            });
        }
    });
}