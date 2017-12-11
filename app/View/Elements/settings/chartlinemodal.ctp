<!--BEGIN MODAL FADE CREATE SPORT-->
<div class="modal" id="addChartLineModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title" id="myModalLabel">New Chart Line</h4>
			</div>
			<div class="modal-body">
				<label for="start" class="control-label">Starting Price:</label>
                                <input type="text" id="start" name="start" class="form-control" />
                                <label for="end" class="control-label">Ending Price:</label>
                                <input type="text" id="end" name="end" class="form-control" />
                                <label for="diff" class="control-label">Difference in Cents:</label>
                                <input type="text" id="diff" name="diff" class="form-control" />
			</div>
			<div class="modal-footer">
				<button id="cancelInsertCharLine" name="cancelInsertCharLine" 
					type="button" class="btn btn-danger" data-dismiss="modal">
					Cancel
				</button>
				<button id="saveChartLine" name="saveChartLine" type="submit" class="btn btn-success">
					Save
				</button>
			</div>
		</div>
	</div>
</div>
<!--END MODAL FADE CREATE SPORT-->
<!--BEGIN MODAL FADE DELETE SPORT-->
<div class="modal" id="deleteChartLineModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title" id="myModalLabel">Delete Chart Line</h4>
			</div>
			<div class="modal-body">
				<label for="sportname" class="control-label">You want to delete this line?</label>
			</div>
			<div class="modal-footer">
				<button id="cancelDeleteCharLine" name="cancelCreate" type="button" class="btn btn-danger" data-dismiss="modal">
					No
				</button>
				<button id=confirmDeleteChartLine" name="confirmDeleteChartLine" type="submit" class="btn btn-success">
					Yes
				</button>
			</div>
		</div>
	</div>
</div>
<!--END MODAL FADE DELETE SPORT-->