<!--BEGIN MODAL FADE CREATE SPORT-->
<div class="modal" id="newShadeGroup" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title" id="myModalLabel">New Shade Group</h4>
			</div>
			<div class="modal-body">
				<label for="start" class="control-label">Store:</label>
                                <input type="text" id="start" name="start" class="form-control" />
                                <label for="end" class="control-label">Profile:</label>
                                <input type="text" id="end" name="end" class="form-control" />
                                <label for="diff" class="control-label">Description:</label>
                                <textarea id="diff" name="diff"></textarea>
			</div>
			<div class="modal-footer">
				<button id="cancelInsertShadeGroup" name="cancelInsertShadeGroup" 
					type="button" class="btn btn-danger" data-dismiss="modal">
					Cancel
				</button>
				<button id="saveShadeGroup" name="saveShadeGroup" type="submit" class="btn btn-success">
					Save
				</button>
			</div>
		</div>
	</div>
</div>
<!--END MODAL FADE CREATE SPORT-->
<!--BEGIN MODAL FADE DELETE SPORT-->
<div class="modal" id="deleteShadeGroupModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title" id="myModalLabel">Delete Shade Group</h4>
			</div>
			<div class="modal-body">
				<label for="sportname" class="control-label">You want to delete this line?</label>
			</div>
			<div class="modal-footer">
				<button id="cancelDeleteShadeGroup" name="cancelDeleteShadeGroup" type="button" class="btn btn-danger" data-dismiss="modal">
					No
				</button>
				<button id="confirmDeleteShadeGroup" name="confirmDeleteShadeGroup" type="submit" class="btn btn-success">
					Yes
				</button>
			</div>
		</div>
	</div>
</div>
<!--END MODAL FADE DELETE SPORT-->