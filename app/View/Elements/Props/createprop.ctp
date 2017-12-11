    <!--BEGIN MODAL FADE-->
<div class="modal" id="createPropModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog" style="width: 815px">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="myModalLabel">Add Prop </h4>
            </div>
            <div class="modal-body" style="height: 700px;">
                <form id="propsfrm" action="#" role="form" class="form-inline" method="post">
                    <div class="left">
                        <div id="foldersDiv">
                            <div class="form-group controlWith">
                                <label class="label-control ">Folder 1:</label><br/>
                                <input type="text" name="level1" id="level1" size="43"/>
                            </div><br/>
                            <div class="form-group controlWith">
                                <label class="label-control ">Folder 2:</label><br/>
                                <input type="text" name="level2" id="level2" size="43"/>
                            </div><br/>
                            <div class="form-group controlWith">
                                <label class="label-control ">Folder 3:</label><br/>
                                <input type="text" name="level3" id="level3" size="43"/>
                            </div>
                        </div>
                        <span class="separator"></span>
                        <div>
                            <label for="" class="control-label inlineDiv3" >Prop / Future Name</label><br/>
                            <input type="text" class="validate[required]" name="prop_name" size="43" id="prop_name"/>
                        </div>
                        <span class="separator"></span>
                        <div class="bordered-div">
                            <label for="spread_prop" class="control-label">Spread <br/>(Two Contestants)</label>
                            <input type="radio" name="type" id="spread_prop"value="S"/><br/><br/>
                            <label for="over_under" class="control-label">Over/Under</label>
                            <input type="radio" name="type" id="over_under"value="P"/><br/><br/>
                            <label for="units" class="control-label">Units</label>
                            <input type="tex" name="units" size="12" disabled id="units"/>
                        </div>
                        <span class="separator"></span>
                        <label for="gamedate_prop" class="control-label">Game Date: </label>
                        <div class="input-group date form_date col-md-5" id='gamedate_prop' data-date="" data-date-format="mm-dd-yyyy" data-link-field="dtp_input2" data-link-format="yyyy-mm-dd">
                            <input class="form-control" id="input_gamedate_prop"size="16" type="text" value="" readonly required>
                            <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
                        </div>
                        <br />
                        <label for="gametime_prop" class="control-label">Game Time: </label>
                        <div class="input-group date form_time col-md-5" id="gametime_prop" data-date="" data-date-format="hh:ii" data-link-field="dtp_input3" data-link-format="hh:ii">
                            <input class="form-control" size="16" type="text" value="" id="input_gametime_prop"readonly required>
                            <span class="input-group-addon"><span class="glyphicon glyphicon-time"></span></span>
                        </div>
                        <br/>
                        <label for="wagertime_prop" class="control-label">Wager CutOff: </label>
                        <div class="input-group date form_time col-md-5" id="wagertime_prop" data-date="" data-date-format="hh:ii" data-link-field="dtp_input3" data-link-format="hh:ii">
                            <input class="form-control" size="16" type="text" value="" id="input_wagertime_prop" required>
                            <span class="input-group-addon"><span class="glyphicon glyphicon-time"></span></span>
                        </div>
                    </div>
                    <div class="right">
                        <div>
                            <label for="correlational_id" class="control-label inlineDiv3">Correlational Id:&nbsp;</label><br/>
                            <select name="correlational_id" id="correlational_id" class="form-control inlineDiv3" style="width: 360px">
                                <option value=""></option>
                            </select>
                        </div>
                        <span class="separator"></span>
                        <div class="bordered-div">
                            <label class="control-label">Contestants</label> <br/>
                            <input type="text" class="form-control" size="5"name="cont_number" id="cont_number"/>
                            <input type="text" class="form-control" name="cont_name" id="cont_name"/>
                            <input type="button" name="add_contestant" id="add_contestant" value="Add"/><br/>
                            <br/>
                            <select multiple style="width: 325px"name="contestants" id="contestant" class="form-control" size="13"></select>
                        </div>
                        <span class="separator"></span>
                        <div class="inline-form">
                            <label class="label-control" for="comments">Comments</label>
                            <textarea class="form-control" rows=3 cols="48"name="comments_CP" id="comments_CP"></textarea>
                        </div>
                    </div>



                </form>
            </div>
            <div class="modal-footer">
                <button id="saveNextPropButton" name="saveNextPropButton" type="button" class="btn btn-info">
                    Next
                </button>
                <button id="savePropButton" name="savePropButton" type="button" class="btn btn-success">
                    Save
                </button>
                <button id="cancelPropButton" name="cancelPropButton" type="button" class="btn btn-danger" data-dismiss="modal">
                    Cancel
                </button>
            </div>
        </div>
    </div>
</div>
<!--END MODAL FADE-->