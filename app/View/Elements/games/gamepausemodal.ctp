<!--BEGIN MODAL FADE-->
<div class="modal fade" id="gamePauseModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header" style="height: 80px">
                <h4 class="modal-title" id="myModalLabel">Pause Game</h4>
                <div class="col-md-12">
                    <span id="pauseRot1"></span>&nbsp;<span id="pauseTeam1"></span>&nbsp;vs&nbsp;<span id="pauseRot2"></span>&nbsp;<span id="pauseTeam2"></span>
                    <span id="pauseGameDate"></span>
                </div>
            </div>
            <div class="modal-body" style="height:400px ">
                <div class="col-md-12" id="bodyContainer">
                    <div class="col-md-12">
                        <div class="col-sm-4" style="padding-bottom: 15px">
                            <label class="control-label" style="line-height: 29px">Full Game:</label>
                        </div>
                        <div class="col-sm-4">
                            <button id="play_all" type="button" class="btn btn-success" onclick="pauseGame(0)"><i class="glyphicon glyphicon-play"></i></button>
                        </div>
                        <div class="col-sm-4">
                            <button id="pause_all" type="button" class="btn btn-danger" onclick="pauseGame(1)"><i class="glyphicon glyphicon-pause"></i></button>
                        </div>
                    </div>
                    <div id="pauseTableHeaderDiv" class="col-md-12">
                        <table class="table table-striped" id="pauseTableHeader">
                            <tr>
                                <th class="ps_periodTd">Period</th>
                                <th class="ps_spTd">SP</th>
                                <th class="ps_mlTd">ML</th>
                                <th class="ps_tlTd">TL</th>
                                <th class="ps_ttTd">TT</th>
                            </tr>
                        </table>
                    </div>
                    <div id="pauseTableDiv" class="col-md-12">
                        <table class="table table-striped" id="pauseTable">
                        </table>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button id="cancelPauseButton" data-dismiss="modal" name="scheduleButton" type="button" class="btn btn-danger">
                    close
                </button>
            </div>
        </div>
    </div>
</div>
<!--END MODAL FADE-->