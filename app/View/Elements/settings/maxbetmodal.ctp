<!--BEGIN MODAL FADE CREATE SPORT-->
<div class="modal" id="maxBetModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title" id="myModalLabel">Max. Bet</h4>
			</div>
                    <div id="modalBody"class="modal-body">
                        <div class="center modalDiv">
                                <div class="leftFloat2 bordered-div3">
                                    <label class="label-control">Parley</label>
                                    <table>
                                        <tr>
                                            <td><label class="label-control">Max. Call Unit Bet: &nbsp;</label></td>
                                            <td><input type="text" size="3"name="parley_mcub" id="parley_mcub"/></td>
                                        </tr>
                                        <tr>
                                            <td><label class="label-control">Max Payout: &nbsp;</label></td>
                                            <td><input type="text" size="3"name="parley_mpo" id="parley_mpo"/></td>
                                        </tr>
                                        <tr>
                                            <td><label class="label-control">Max. Internet Bet: &nbsp;</label></td>
                                            <td><input type="text" size="3"name="parley_mib" id="parley_mib"/></td>
                                        </tr>
                                    </table>
                                </div>
                                <div class="rightFloat2 bordered-div3">
                                    <label class="label-control">horse</label>
                                    <table>
                                        <tr>
                                            <td><label class="label-control">Max. Call Unit Bet: &nbsp;</label></td>
                                            <td><input type="text" size="3"name="horse_mcub" id="parley_mcub"/></td>
                                        </tr>
                                        <tr>
                                            <td><label class="label-control">Max Payout: &nbsp;</label></td>
                                            <td><input type="text" size="3"name="horse_mpo" id="parley_mpo"/></td>
                                        </tr>
                                        <tr>
                                            <td><label class="label-control">Max. Internet Bet: &nbsp;</label></td>
                                            <td><input type="text" size="3"name="horse_mib" id="parley_mib"/></td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                         <div class="center modalDiv">
                                <div class="leftFloat2 bordered-div3">
                                    <label class="label-control">Teaser</label>
                                    <table>
                                        <tr>
                                            <td><label class="label-control">Max. Call Unit Bet: &nbsp;</label></td>
                                            <td><input type="text" size="3"name="teaser_mcub" id="parley_mcub"/></td>
                                        </tr>
                                        <tr>
                                            <td><label class="label-control">Max. Internet Bet: &nbsp;</label></td>
                                            <td><input type="text" size="3"name="teaser_mib" id="parley_mib"/></td>
                                        </tr>
                                    </table>
                                </div>
                                <div class="rightFloat2 bordered-div3">
                                    <label class="label-control">Contest</label>
                                    <table>
                                        <tr>
                                            <td><label class="label-control">Max. Call Unit Bet: &nbsp;</label></td>
                                            <td><input type="text" size="3"name="contest_mcub" id="parley_mcub"/></td>
                                        </tr>
                                        <tr>
                                            <td><label class="label-control">Max. Internet Bet: &nbsp;</label></td>
                                            <td><input type="text" size="3"name="contest_mib" id="parley_mib"/></td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
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