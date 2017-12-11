<!--BEGIN MODAL FADE CREATE SPORT-->
<div class="modal" id="editStoreModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title" id="myModalLabel">Edit Store</h4>
			</div>
			<div class="modal-body">
                            <label for="lineType" class="control-label">Starting Price:</label>
                            <select class="form-control" name="lineType" id="lineType">
                                <option value="1">20 Cents</option>
                                <option value="2">30 Cents</option>
                                <option value="3">40 Cents</option>
                            </select>
                            <label for="cuMaxBet" class="control-label">CU Max Bet:</label>
                            <input type="text" id="cuMaxBet" name="cuMaxBet" class="form-control" />
                            <label for="inetMaxBet" class="control-label">Inet Max Bet:</label>
                            <input type="text" id="inetMaxBet" name="inetMaxBet" class="form-control" />
                            <label for="dfltCricled" class="control-label">Dflt Circled</label>
                            <input type="text" id="dfltCricled" name="dfltCricled" class="form-control" />
			</div>
			<div class="modal-footer">
				<button id="cancelEditStore" name="cancelEditStore" 
					type="button" class="btn btn-danger" data-dismiss="modal">
					Cancel
				</button>
				<button id="saveEditStore" name="saveEditStore" type="submit" class="btn btn-success">
					Save
				</button>
			</div>
		</div>
	</div>
</div>

<div class="modal" id="addStoreModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title" id="myModalLabel">New Store</h4>
			</div>
			<div class="modal-body">
                            <label for="storeName" class="control-label">Store Name:</label>
                            <input type="text" id="storeName" name="storeName" class="form-control" />
			</div>
			<div class="modal-footer">
				<button id="cancelAddStore" name="cancelAddStore" 
					type="button" class="btn btn-danger" data-dismiss="modal">
					Cancel
				</button>
				<button id="saveAddStore" name="saveAddStore" type="submit" class="btn btn-success">
					Save
				</button>
			</div>
		</div>
	</div>
</div>

<!--BEGIN MODAL FADE DELETE SPORT-->
<div class="modal" id="deleteStoreModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title" id="myModalLabel">Delete Store</h4>
			</div>
			<div class="modal-body">
				<label for="sportname" class="control-label">Do you want to delete this store?</label>
			</div>
			<div class="modal-footer">
				<button id="cancelDeleteStore" name="cancelDeleteStore" type="button" class="btn btn-danger" data-dismiss="modal">
					No
				</button>
				<button id="confirmDeleteStore" name="confirmDeleteStore" type="submit" class="btn btn-success">
					Yes
				</button>
			</div>
		</div>
	</div>
</div>
<!--END MODAL FADE DELETE SPORT-->