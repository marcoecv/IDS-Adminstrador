<!--BEGIN MODAL FADE-->
<div class="modal fade" id="subSportPauseModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header" style="height: 80px">
                <h4 class="modal-title" id="myModalLabel"><span>Pause</span>&nbsp;<span id="pauseSubSport"></span></h4>
            </div>
            <div class="modal-body" style="height:400px ">
                <div class="col-md-12" id="bodyContainer">
                    <div id="pauseTableSSHeaderDiv" class="col-md-12">
                        <table class="table table-striped" id="pauseSSTableHeader">
                            <tr>
                                <th class="pss_periodTd">Period</th>
                                <th class="pss_spTd">SP</th>
                                <th class="pss_mlTd">ML</th>
                                <th class="pss_tlTd">TL</th>
                                <th class="pss_ttTd">TT</th>
                            </tr>
                        </table>
                    </div>
                    <div id="pauseTableSSDiv" class="col-md-12">
                        <table class="table table-striped" id="pauseTableSS">
                        </table>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button id="cancelPauseSSButton" data-dismiss="modal" name="scheduleButton" type="button" class="btn btn-danger">
                    close
                </button>
            </div>
        </div>
    </div>
</div>
<!--END MODAL FADE-->