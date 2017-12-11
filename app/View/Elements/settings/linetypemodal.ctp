<!--BEGIN MODAL FADE CREATE SPORT-->
<div class="modal" id="addLineTypeModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title" id="myModalLabel">New Line Type</h4>
			</div>
			<div class="modal-body">
				<label for="lineDescription" class="control-label">Line Type Description:</label>
                                <input type="text" id="lineDescription" name="lineDescription" class="form-control" />
			</div>
			<div class="modal-footer">
				<button id="cancelInsertLineType" name="cancelInsertCharLine" 
					type="button" class="btn btn-danger" data-dismiss="modal">
					Cancel
				</button>
				<button id="saveLineType" name="saveChartLine" type="submit" class="btn btn-success">
					Save
				</button>
			</div>
		</div>
	</div>
</div>
<!--END MODAL FADE CREATE SPORT-->
<!--BEGIN MODAL FADE DELETE SPORT-->
<div class="modal" id="deleteLineTypeModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title" id="myModalLabel">Delete Chart Line</h4>
			</div>
			<div class="modal-body">
				<label for="sportname" class="control-label">Do you want to delete this line?</label>
			</div>
			<div class="modal-footer">
				<button id="cancelDeleteLineType" name="cancelDeleteLineType" type="button" class="btn btn-danger" data-dismiss="modal">
					No
				</button>
				<button id="confirmDeleteLineType" name="confirmDeleteChartLine" type="submit" class="btn btn-success">
					Yes
				</button>
			</div>
		</div>
	</div>
</div>
<!--END MODAL FADE DELETE SPORT-->