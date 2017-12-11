<!--BEGIN MODAL FADE-->
<div class="modal" id="createGameModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog" style="width: 815px">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="myModalLabel">Attention</h4>
            </div>
            <div class="modal-body" style="height: 650px">
                <form id="gameEditfrm" action="#" role="form" class="form-inline" method="post">
                    <div class="left">
                        <div>
                            <label for="sportidCreate" class="control-label editGameLabelWith_cg">Sport:&nbsp;&nbsp;</label>
                            <select id="sportidCreate" name="sportidCreate" class="form-control inlineElement" onchange="setCorrelationalId()">
                                <option value=""></option>
                            </select>
                        </div><br/>
                        <div>
                            <label for="leagueidCreate" class="control-label editGameLabelWith_cg">League:&nbsp;&nbsp;</label>
                            <select id="leagueidCreate" name="leagueidCreate" class="form-control inlineElement" onchange="setCorrelationalId()">
                                <option value=""></option>
                            </select>
                        </div><br/>
                        <div class="">
                            <label for="countryidCreate" class="control-label editGameLabelWith_cg">Country:&nbsp;&nbsp;</label>
                            <input type="text" id="countryidCreate" name="countryidCreate" class="form-control inlineElement" value="" onkeyup="upper()"/>
                        </div><br/>
                        <span class="separator"></span>
                        <label for="teamAidModal" class="control-label">Visitor: </label><br/>
                        
                        <div class="input-group rotationDiv">
                            <span class="input-group-addon"><b>#</b></span>
                            <input type="number" step="1" class="form-control" id="rotANumberModalCreate" name="rotANumberModalCreate"/>
                        </div>
                        
                        <input id="teamAidModalCreate" name="teamAidModalCreate" value="" class="form-control inlineElement" onkeyup="setCorrelationalId()"/><br /><br />
                        <div class="form-group editor" id="pitcherDiv1">
                            <label for="pitcher1Create" class="control-label" style="width: 108px">Pitcher: </label>
                            <input type="text" id="pitcher1Create" name="pitcher1Create" class="form-control" />
                        </div>
                        <br />
                        <br />
                        <label for="teamHidModalCreate" class="control-label">Home: </label><br/>
                        <div class="input-group rotationDiv">
                            <span class="input-group-addon"><b>#</b></span>
                            <input type="number" step="1" class="form-control" id="rotHNumberModalCreate" name="rotHNumberModalCreate"/>
                        </div>
                        <input id="teamHidModalCreate" name="teamHidModalCreate" value="" class="form-control inlineElement" onkeyup="setCorrelationalId()"/><br /><br />

                        <div class="form-group editor" id="pitcherDiv2">
                            <label for="pitcher2Create" class="control-label" style="width: 108px">Pitcher: </label>
                            <input type="text" id="pitcher2Create" name="pitcher2Create" class="form-control"/>
                        </div>
                        
                        <br />
                        <br />
                        <div class="form-group editor" id="drawGroup">
                            <label for="drawRotNumberCreate" class="control-label">Draw: </label><br/>
                            <div class="input-group rotationDiv">
                                <span class="input-group-addon"><b>#</b></span>
                                <input type="number" step="1" class="form-control validate[custom[integer]]" id="drawRotNumberCreate" name="drawRotNumberCreate" min="0"/>
                            </div>
                        </div>

                        <span class="separator"></span>
                        <label for="broadcastidCreate"  class="control-label editGameLabelWith_cg">Broadcast: </label>
                        <input type="text" id="broadcastidCreate" value="" name="broadcastidCreate" class="form-control" />
                        <br />
                        <br />
                        
                    </div>
                    <div class="right">
                        <label for="commentsCreate" class="control-label editGameLabelWith_cg">Comments: </label>
                        <textarea id="commentsCreate" name="commentsCreate" class="form-control" rows="3"></textarea>
                        <br />
                        <span class="separator"></span>
                        <label for="gamedatevalCreate" class="control-label editGameLabelWith_cg">Game Date: </label>
                        <div class="input-group date form_date col-md-5" id='gamedateModalCreate' data-date="" data-date-format="mm-dd-yyyy" data-link-field="dtp_input2" data-link-format="yyyy-mm-dd">
                            <input class="form-control validate[required]"onchange="setCorrelationalId()" name="gamedatevalCreate" id="gamedatevalCreate" size="16" type="text" value="" readonly required>
                            <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
                        </div>
                        <br />
                        <br />
                        <label for="gametimevalCreate" class="control-label editGameLabelWith_cg">Game Time: </label>
                        <div class="input-group date form_time col-md-5" id="gametimeModalCreate" data-date="" data-date-format="hh:ii" data-link-field="dtp_input3" data-link-format="hh:ii">
                            <input class="form-control validate[required]" name="gametimevalCreate" id="gametimevalCreate" size="16" type="text" value="" readonly required>
                            <span class="input-group-addon"><span class="glyphicon glyphicon-time"></span></span>
                        </div>
                        <br />
                        <br />
                        <label for="wagercutoffvalCreate" class="control-label editGameLabelWith_cg">Wager Cutoff: </label>
                        <div class="input-group date form_time col-md-5" id="wagercutoffModalCreate" data-date="" data-date-format="hh:ii" data-link-field="dtp_input3" data-link-format="hh:ii">
                            <input class="form-control" size="16" name="wagercutoffvalCreate" id="wagercutoffvalCreate" type="text" value="" readonly required>
                            <span class="input-group-addon"><span class="glyphicon glyphicon-time"></span></span>
                        </div>
                        <span class="separator"></span>
                        <span class="preventbuying">
                            <input type="checkbox" id="preventbuyingCreate" name="preventbuyingCreate">
                            Prevent buying points
                            </input>
                        </span>
                        <br /><br />
                        <fieldset class="fieldset-restrictions">
                            <legend class="legend-fieldset-restrictions">
                                Parlay's, If's & Teaser's
                            </legend>
                            <div>
                                <input type="radio" id="allowCreate" name="restrictionsCreate" value="A">
                                Allow
                                </input>
                                <br />
                                <input type="radio" id="sameCreate" name="restrictionsCreate"  value="S">
                                Deny Same Game
                                </input>
                                <br />
                                <input type="radio" id="denyCreate" name="restrictionsCreate" value="D">
                                Deny All
                                </input>
                                <br />
                            </div>
                        </fieldset>
                        <br />
                        <span class="separator"></span>
                        <label for="correlationidCreate" class="control-label">CorrelationID: </label>
                        <input id="correlationidCreate" name="correlationidCreate'"readonly class="form-control" value="" />
                        <input type="hidden" value="" name="idGameCreate" id="idGameCreate"/>
                        <input type="hidden" value="" name="statusCreate" id="statusCreate"/>   
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button id="nextCreateGame" name="nextCreateGame" type="button" class="btn btn-info">
                    Next
                </button>
                <button id="saveCreateGame" name="saveEditGame" type="button" class="btn btn-success">
                    Save
                </button>
                <button id="cancelCreateGame" name="scheduleButton" type="button" data-dismiss="modal" class="btn btn-danger">
                    Cancel
                </button>
            </div>
        </div>
    </div>
</div>
<!--END MODAL FADE-->