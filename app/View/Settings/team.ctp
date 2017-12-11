<?php
echo $this -> Html -> css('settings');
echo $this -> Html -> css('withoutfooter');
echo $this -> Html -> script('settings/team');
?>
<?php echo $this -> element('maintheader', array("pagename" => "Team Maintenance")); ?>
<?php echo $this -> element('settings/teammaintenance'); ?>
<?php echo $this -> element('defaultmsgmodal'); ?>
<?php echo $this -> element('confirmationmodal', array("message" => "Changes updated succesfully")); ?>
<form id="teamfrm" action="#" role="form" class="form-horizontal">
        <div id="mainContainer">
            <div class="inline-form containerSport">
                <label for="sportid">Sport:&nbsp;&nbsp;</label>
                <select id="sportid" name="sportid" class="form-control" onchange="loadLeagues(this)">
                    <option></option>
                    <?php foreach ($sports as $sport) { ?>
                        <option value="<?php echo $sport['SportType'] ?>"><?php echo $sport['SportType'] ?></option>
                        <?php
                    }
                    ?>
                </select>
            </div>
            <div class="inline-form containerSport right">
                <label for="leagueid">League:&nbsp;&nbsp;</label>
                <select id="leagueid" name="leagueid" class="form-control" onchange="loadTeams()">
                    <option value=""></option>
                    <option value="*">Select All</option>
                </select>
            </div>
			<br />
			<br />
            <label class="label-control adminTitle">Teams 
                <a href="#" title="Remove Team" id="removeTeam" onclick="return false" class="remove"><span class="glyphicon glyphicon-minus"></span></a>
                <a href="#" title="Add Team" id="addTeam" onclick="return false" class="add"><span class="glyphicon glyphicon-plus"></span></a>
            </label>
            
            <div id="teamsSeccion"class="inner_table center">
            	<table id="storesTableBody">
            		<tbody>
            			
            		</tbody>
            	</table>
            </div>
        </div>
</form>