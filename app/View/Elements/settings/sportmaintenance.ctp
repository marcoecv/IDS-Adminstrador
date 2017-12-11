<!--BEGIN MODAL FADE CREATE SPORT-->
<div class="modal" id="createSportModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title" id="myModalLabel">Create Sport</h4>
			</div>
			<div class="modal-body">
				<label for="sportname" class="control-label">New Sport Name:</label>
				<input id="sportname" name="sportname" class="form-control" />
                                <label for="subsportname" class="control-label">New Sub-Sport Name:</label>
				<input id="subsportname" name="subsportname" class="form-control" />
			</div>
			<div class="modal-footer">
				<button id="cancelCreate" name="cancelCreate" 
					type="button" class="btn btn-danger" data-dismiss="modal">
					Cancel
				</button>
				<button id="saveSport" name="saveCreate" type="submit" class="btn btn-success">
					Save
				</button>
			</div>
		</div>
	</div>
</div>
<!--END MODAL FADE CREATE SPORT-->
<!--BEGIN MODAL FADE DELETE SPORT-->
<div class="modal" id="deleteSportModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title" id="myModalLabel">Delete Sport</h4>
			</div>
			<div class="modal-body">
				<label for="sportname" class="control-label">You want to delete this sport?</label>
			</div>
			<div class="modal-footer">
				<button id="cancelCreate" name="cancelCreate" 
					type="button" class="btn btn-danger" data-dismiss="modal">
					No
				</button>
				<button id="deleteSport" name="deleteSport" type="submit" class="btn btn-success">
					Yes
				</button>
			</div>
		</div>
	</div>
</div>
<!--END MODAL FADE DELETE SPORT-->
<!--BEGIN MODAL FADE DELETE SPORT-->
<div class="modal" id="alertDeleteSportModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title" id="myModalLabel">Delete Sport</h4>
			</div>
			<div class="modal-body">
				Message
			</div>
			<div class="modal-footer">
				<button id="alertDeleteSport" name="alertDeleteSport" type="submit" class="btn btn-success">
					OK
				</button>
			</div>
		</div>
	</div>
</div>
<!--END MODAL FADE DELETE SPORT-->