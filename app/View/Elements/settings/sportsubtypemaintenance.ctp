<!--BEGIN MODAL FADE CREATE SUBTYPE SPORT-->
<div class="modal" id="createLeagueModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title" id="myModalLabel">Create League</h4>
			</div>
			<div class="modal-body">
				<label for="sportname" class="control-label">New League Name:</label>
				<input id="sportname" name="sportname" class="form-control" />
			</div>
			<div class="modal-body">
				<label for="countryleague" class="control-label">Country:&nbsp;&nbsp;</label>
				<select id="countryleague" name="countryleague" class="form-control">
					
				</select>
			</div>
			<div class="modal-footer">
				<button id="cancelCreate" name="cancelCreate"
				type="button" class="btn btn-danger" data-dismiss="modal">
					Cancel
				</button>
				<button id="saveLeague" name="saveCreate" type="submit" class="btn btn-success">
					Save
				</button>
			</div>
		</div>
	</div>
</div>
<!--END MODAL FADE CREATE SUBTYPE SPORT-->
<!--BEGIN MODAL FADE DELETE SUBTYPE SPORT-->
<div class="modal" id="deleteLeagueModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title" id="myModalLabel">Delete League</h4>
			</div>
			<div class="modal-body">
				<label for="sportname" class="control-label">You want to delete this league?</label>
			</div>
			<div class="modal-footer">
				<button id="cancelDelete" name="cancelCreate"
				type="button" class="btn btn-danger" data-dismiss="modal">
					No
				</button>
				<button id="deleteLeague" name="saveCreate" type="submit" class="btn btn-success">
					Yes
				</button>
			</div>
		</div>
	</div>
</div>
<!--END MODAL FADE DELETE SUBTYPE SPORT-->