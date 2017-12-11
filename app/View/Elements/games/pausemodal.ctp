<!--BEGIN MODAL FADE-->
<div class="modal fade" id="pauseModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header" style="height: 80px">
                <h4 class="modal-title" id="myModalLabel">Current Pauses</h4>
            </div>
            <div class="modal-body" style="height:400px ">
                <div class="col-md-12" id="bodyContainer">
                    <div id="psm_tableHeaderDiv" class="col-md-12">
                        <table class="table table-striped" id="psm_TableHeader">
                            <tr>
                                <th class="psm_sport">Sport</th>
                                <th class="psm_subSport">SubSport</th>
                                <th class="psm_rot">Rotation</th>
                                <th class="psm_period">Period</th>
                                <th class="psm_linetype">Line Type</th>
                            </tr>
                        </table>
                    </div>
                    <div id="psm_TableDiv" class="col-md-12">
                        <table class="table table-striped" id="psm_table">
                        </table>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button id="psm_closeButton" data-dismiss="modal" name="scheduleButton" type="button" class="btn btn-danger">
                    close
                </button>
            </div>
        </div>
    </div>
</div>
<!--END MODAL FADE-->