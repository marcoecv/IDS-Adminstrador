<!--BEGIN MODAL FADE-->
<div class="modal fade" id="sportPauseModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header" style="height: 55px">
                <h4 class="modal-title" id="myModalLabel"><span>Pause</span>&nbsp;<span id="pauseSport"></span></h4>
            </div>
            <div class="modal-body" style="height:130px ">
                <div class="col-md-12" id="bodyContainer">
                    <table class="table table-striped" id="pauseSportTable">
                        <thead>
                            <tr>
                                <th class="psport_spTd">SP</th>
                                <th class="psport_mlTd">ML</th>
                                <th class="psport_tlTd">TL</th>
                                <th class="psport_ttTd">TT</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="psport_spTd">
                                    <button id="play_Sport_S" style="display:none" type="button" class="btn btn-success spplay" onclick="pauseSport('S',0)"><i class="glyphicon glyphicon-play"></i></button>
                                    <button id="pause_Sport_S" type="button" class="btn btn-danger sppause" onclick="pauseSport('S',1)"><i class="glyphicon glyphicon-pause"></i></button>
                                </td>
                                <td class="psport_mlTd">
                                    <button id="play_Sport_M" style="display:none" type="button" class="btn btn-success mlplay" onclick="pauseSport('M',0)"><i class="glyphicon glyphicon-play"></i></button>
                                    <button id="pause_Sport_M" type="button" class="btn btn-danger mlpause" onclick="pauseSport('M',1)"><i class="glyphicon glyphicon-pause"></i></button>
                                </td>
                                <td class="psport_tlTd">
                                    <button id="play_Sport_T" style="display:none" type="button" class="btn btn-success tlplay" onclick="pauseSport('T',0)"><i class="glyphicon glyphicon-play"></i></button>
                                    <button id="pause_Sport_T" type="button" class="btn btn-danger tlpause" onclick="pauseSport('T',1)"><i class="glyphicon glyphicon-pause"></i></button>
                                </td>
                                <td class="psport_ttTd">
                                    <button id="play_Sport_L" style="display:none" type="button" class="btn btn-success ttplay" onclick="pauseSport('L',0)"><i class="glyphicon glyphicon-play"></i></button>
                                    <button id="pause_Sport_L" type="button" class="btn btn-danger ttpause" onclick="pauseSport('L',1)"><i class="glyphicon glyphicon-pause"></i></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="modal-footer">
                <button id="cancelPauseSportButton" data-dismiss="modal" name="scheduleButton" type="button" class="btn btn-danger">
                    close
                </button>
            </div>
        </div>
    </div>
</div>
<!--END MODAL FADE-->