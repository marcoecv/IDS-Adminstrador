<!--BEGIN MODAL FADE CREATE PLAYER-->
<div class="modal" id="createPlayerModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title" id="myModalLabel">Create Player</h4>
			</div>
			<div class="modal-body">
				<label for="playername" class="control-label">Player Name:</label>
				<input id="playername" name="sportname" class="form-control" />
				<br />
				<label for="position" class="control-label">Position:</label>
				<select id="position" name="position" class="form-control">
					<option value="pitcher">Pitcher</option>
				</select>
			</div>
			<div class="modal-footer">
				<button id="cancelCreate" name="cancelCreate" 
					type="button" class="btn btn-danger" data-dismiss="modal">
					Cancel
				</button>
				<button id="savePlayer" name="saveCreate" type="submit" class="btn btn-success">
					Save
				</button>
			</div>
		</div>
	</div>
</div>
<!--END MODAL FADE CREATE PLAYER-->
<!--BEGIN MODAL FADE DELETE PLAYER-->
<div class="modal" id="deletePlayerModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title" id="myModalLabel">Delete Player</h4>
			</div>
			<div class="modal-body">
				<label for="sportname" class="control-label">You want to delete this player?</label>
			</div>
			<div class="modal-footer">
				<button id="cancelCreate" name="cancelCreate" 
					type="button" class="btn btn-danger" data-dismiss="modal">
					No
				</button>
				<button id="deletePlayer" name="saveCreate" type="submit" class="btn btn-success">
					Yes
				</button>
			</div>
		</div>
	</div>
</div>
<!--END MODAL FADE DELETE PLAYER-->
<!--BEGIN MODAL FADE TEAM-->
<div class="modal" id="createTeamModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title" id="myModalLabel">Create Team</h4>
			</div>
			<div class="modal-body">
				<label for="teamName" class="control-label">Team Name:</label>
				<input id="teamName" name="teamName" class="form-control" />
				<br />
			</div>
			<div class="modal-footer">
				<button id="cancelCreate" name="cancelCreate" 
					type="button" class="btn btn-danger" data-dismiss="modal">
					Cancel
				</button>
				<button id="saveTeam" name="saveCreate" type="submit" class="btn btn-success">
					Save
				</button>
			</div>
		</div>
	</div>
</div>
<!--END MODAL FADE TEAM-->
<!--BEGIN MODAL FADE DELETE TEAM-->
<div class="modal" id="deleteTeamModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title" id="myModalLabel">Delete Team</h4>
			</div>
			<div class="modal-body">
				<label for="sportname" class="control-label">You want to delete this team(s)?</label>
			</div>
			<div class="modal-footer">
				<button id="cancelCreate" name="cancelCreate" 
					type="button" class="btn btn-danger" data-dismiss="modal">
					No
				</button>
				<button id="deleteTeam" name="saveCreate" type="submit" class="btn btn-success">
					Yes
				</button>
			</div>
		</div>
	</div>
</div>
<!--END MODAL FADE DELETE TEAM-->