<!--BEGIN MODAL FADE-->
<div class="modal" id="lineModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title" id="lineChangeTitle">Attention</h4>
			</div>
			<div class="modal-body">
				<form class="form-horizontal">
					<div class="form-group">
						<label for="inputValue" class="col-sm-2 control-label">Value: </label>
						<div class="col-sm-10">
							<input type="number" class="form-control" id="inputValue" name="inputValue">
						</div>
					</div>
					<div class="form-group">
						<label for="inputLine" class="col-sm-2 control-label">Line: </label>
						<div class="col-sm-10">
							<input type="number" class="form-control" id="inputLine" name="inputLine">
						</div>
					</div>
				</form>
			</div>
			<div class="modal-footer">
				<button id="cancelLineButton" name="cancelLineButton" type="button" class="btn btn-danger">
					No
				</button>
				<button id="saveLineButton" name="saveLineButton" type="button" class="btn btn-success">
					Yes
				</button>
			</div>
		</div>
	</div>
</div>
<!--END MODAL FADE-->