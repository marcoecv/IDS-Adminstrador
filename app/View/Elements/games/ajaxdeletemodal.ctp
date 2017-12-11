<!--BEGIN MODAL FADE-->
<div class="modal fade" id="ajaxDeleteModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title" id="myModalLabel">Attention</h4>
			</div>
			<div class="modal-body">
                            <label class="label-control">Are you sure you want to delete the game:</label> <br/>
                            <span id="gameName"></span><br/>
                            <span id="gameDateTime"></span><br/>
                            <label class="label-control">Rotation Away Number:</label> <span id="rotANumber"></span><br/>
                            
			</div>
			<div class="modal-footer">
				<button id="cancelDeleteButton" name="scheduleButton" type="button" class="btn btn-danger">
					Cancel
				</button>
				<button id="confirmDeleteButton" name="nextButton" type="button" class="btn btn-success">
					Confirm
				</button>
			</div>
		</div>
	</div>
</div>
<!--END MODAL FADE-->