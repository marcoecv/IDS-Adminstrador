<!--BEGIN MODAL FADE-->
<div class="modal" id="editGameModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog" style="width: 815px">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="myModalLabel">Attention</h4>
            </div>
            <div class="modal-body" style="height: 650px">
                <form id="gameEditfrm" action="#" role="form" class="form-inline" method="post">
                    <div class="left">
                        <div>
                            <label for="sportid" class="control-label editGameLabelWith">Sport:&nbsp;&nbsp;</label>
                            <input type="text" id="sportid" name="sportid" class="form-control inlineElement" value="" readonly />
                        </div><br/>
                        <div>
                            <label for="leagueid" class="control-label editGameLabelWith">League:&nbsp;&nbsp;</label>
                            <input type="text" id="leagueid" name="leagueid" class="form-control inlineElement" value="" readonly/>
                        </div><br/>
                        <div class="">
                            <label for="countryid" class="control-label editGameLabelWith">Country:&nbsp;&nbsp;</label>
                            <input type="text" id="countryid" name="countryid" class="form-control inlineElement" value="" readonly/>
                        </div><br/>
                        <span class="separator"></span>
                        <label for="teamAidModal" class="control-label">Visitor: </label><br/>
                        
                        <div class="input-group rotationDiv">
                            <span class="input-group-addon"><b>#</b></span>
                            <input type="number" step="1" class="form-control" id="rotANumberModal" name="rotANumberModal" readonly/>
                        </div>
                        <input id="teamAidModal" name="teamAidModal" value="" class="form-control inlineElement" disabled="disabled"/><br />
                        <br />
                         <div class="form-group editor" id="pitcherEditDiv1">
                            <label for="pitcher1Edit" class="control-label" style="width: 108px">Pitcher: </label>
                            <input type="text" id="pitcher1Edit" name="pitcher1Edit" class="form-control" />
                        </div>
                        <br>
                        <label for="teamHidModal" class="control-label">Home: </label><br/>
                        <div class="input-group rotationDiv">
                            <span class="input-group-addon"><b>#</b></span>
                            <input type="number" step="1" class="form-control" id="rotHNumberModal" name="rotHNumberModal" readonly/>
                        </div>
                        <input id="teamHidModal" name="teamHidModal" value="" class="form-control inlineElement" readonly/><br /><br />
                        <div class="form-group editor" id="pitcherEditDiv2">
                            <label for="pitcher2Edit" class="control-label" style="width: 108px">Pitcher: </label>
                            <input type="text" id="pitcher2Edit" name="pitcher2Edit" class="form-control"/>
                        </div>
                        <span class="separator"></span>
                        <label for="broadcastid"  class="control-label editGameLabelWith">Broadcast: </label>
                        <input type="text" id="broadcastid" value="" name="broadcastid" class="form-control" />
                        <br />
                        <br />
                        <label for="comments" class="control-label editGameLabelWith">Comments: </label>
                        <textarea id="comments" name="comments" class="form-control" rows="3"></textarea>
                    </div>
                    <div class="right">
                        <label for="gamedate" class="control-label editGameLabelWith">Game Date: </label>
                        <div class="input-group date form_date col-md-5" id='gamedateModal' data-date="" data-date-format="mm-dd-yyyy" data-link-field="dtp_input2" data-link-format="yyyy-mm-dd">
                            <input class="form-control validate[required]" name="gamedateval" id="gamedateval" size="16" type="text" value="" readonly required>
                            <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
                        </div>
                        <br />
                        <br />
                        <label for="gametime" class="control-label editGameLabelWith">Game Time: </label>
                        <div class="input-group date form_time col-md-5" id="gametimeModal" data-date="" data-date-format="hh:ii" data-link-field="dtp_input3" data-link-format="hh:ii">
                            <input class="form-control validate[required]" name="gametimeval" id="gametimeval" size="16" type="text" value="" readonly required>
                            <span class="input-group-addon"><span class="glyphicon glyphicon-time"></span></span>
                        </div>
                        <br />
                        <br />
                        <label for="wagercutoff" class="control-label editGameLabelWith">Wager Cutoff: </label>
                        <div class="input-group date form_time col-md-5" id="wagercutoffModal" data-date="" data-date-format="hh:ii" data-link-field="dtp_input3" data-link-format="hh:ii">
                            <input class="form-control" size="16" name="wagercutoffval" id="wagercutoffval" type="text" value="" readonly required>
                            <span class="input-group-addon"><span class="glyphicon glyphicon-time"></span></span>
                        </div>
                        <span class="separator"></span>
                        <span class="preventbuying">
                            <input type="checkbox" id="preventbuying" name="preventbuying">
                            Prevent buying points
                            </input>
                        </span>
                        <fieldset class="fieldset-restrictions">
                            <legend class="legend-fieldset-restrictions">
                                Parlay's, If's & Teaser's
                            </legend>
                            <div>
                                <input type="radio" id="allow" name="restrictions" value="A">
                                Allow
                                </input>
                                <br />
                                <input type="radio" id="same" name="restrictions"  value="S">
                                Deny Same Game
                                </input>
                                <br />
                                <input type="radio" id="deny" name="restrictions" value="D">
                                Deny All
                                </input>
                                <br />
                            </div>
                        </fieldset>
                        <span class="separator"></span>
                        <label for="correlationid" class="control-label">CorrelationID: </label>
                        <input id="correlationid" name="correlationid'"readonly class="form-control" value="" />
                        <input type="hidden" value="" name="idGame" id="idGame"/>
                        <input type="hidden" value="" name="status" id="status"/>   
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button id="cancelEditGame" name="scheduleButton" type="button" data-dismiss="modal" class="btn btn-danger">
                    Cancel
                </button>
                <button id="saveEditGame" name="saveEditGame" type="button" class="btn btn-success">
                    Save
                </button>
            </div>
        </div>
    </div>
</div>
<!--END MODAL FADE-->