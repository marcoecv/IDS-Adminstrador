<!--BEGIN MODAL FADE-->
<div class="modal" id="createFuturePropModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog" style="width: 815px">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="myModalLabel">New &nbsp;<span id="sportFP"></span>&nbsp; Future Props</h4>
            </div>
            <div class="modal-body" style="height: 650px;">
                <form id="futurepropsfrm" action="#" role="form" class="form-inline" method="post">
                    <div class="left">
                        <div id="foldersDiv">
                            <div class="form-group folderDivs">
                                <label class="label-control controlWith">Sub Sport Type:</label>
                                <select class="form-control inlineElement" name="subSportTypeFP" id="subSportTypeFP" style="width: 68%">
                                    <option value=""></option>
                                </select>
                            </div><br/>
                            <div class="form-group folderDivs">
                                <label class="label-control controlWith">Text:</label>
                                <input class="form-control inlineElement" type="text" name="propFolderText" id="propFolderText" size="26"/>
                            </div><br/>
                            <div class="form-group folderDivs">
                                <label class="label-control controlWith">Folder 1:</label>
                                <input class="form-control nlineElement" type="text" name="level1FP" id="level1FP" readonly size="26"/>
                            </div><br/>
                            <div class="form-group folderDivs">
                                <label class="label-control controlWith">Folder 2:</label>
                                <input class="form-control inlineElement" type="text" name="level2FP" id="level2FP" size="26"/>
                            </div><br/>
                            <div class="form-group folderDivs">
                                <label class="label-control controlWith">Folder 3:</label>
                                <input class="form-control inlineElement" type="text" name="level3FP" id="level3FP" size="26"/>
                            </div>
                        </div>
                        <span class="separator"></span>
                        <div>
                            <label for="" class="control-label inlineDiv3FP" >Prop / Future Name</label><br/>
                            <input type="text" class="validate[required]" name="prop_nameFP" size="43" id="prop_nameFP"/>
                        </div>
                        <span class="separator"></span>
                        <div class="bordered-div">
                            <label for="spread_propFP" class="control-label controlLWith">Spread <br/>(Two Contestants)</label>
                            <input class="inlineElement" type="radio" name="type" id="spread_propFP"value="S"/><br/>
                            <label for="over_underFP" class="control-label controlLWith">Over/Under</label>
                            <input class="inlineElement" type="radio" name="type" id="over_underFP"value="P"/><br/>
                            <label for="unitsFP" class="control-label controlLWith">Units</label>
                            <input class="inlineElement" type="tex" name="unitsFP" size="12" disabled id="unitsFP"/>
                        </div>
                        <span class="separator"></span>
                        <div class="form-group folderDivs">
                            <label for="gamedate_prop" class="control-label controlWith">Game Date: </label>
                            <div class="input-group date form_date col-md-5 inlineElement" id='gamedate_propFP' data-date="" data-date-format="mm-dd-yyyy" data-link-field="dtp_input2" data-link-format="yyyy-mm-dd">
                                <input class="form-control" id="input_gamedate_propFP"size="16" type="text" value="" readonly required>
                                <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
                            </div>
                        </div>
                        <div class="form-group folderDivs">
                            <label for="gametime_prop" class="control-label controlWith">Game Time: </label>
                            <div class="input-group date form_time col-md-5 inlineElement" id="gametime_propFP" data-date="" data-date-format="hh:ii" data-link-field="dtp_input3" data-link-format="hh:ii">
                                <input class="form-control" size="16" type="text" value="" id="input_gametime_propFP"readonly required>
                                <span class="input-group-addon"><span class="glyphicon glyphicon-time"></span></span>
                            </div>
                        </div>
                        <div class="form-group folderDivs">
                            <label for="wagertime_prop" class="control-label controlWith">Wager CutOff: </label>
                            <div class="input-group date form_time col-md-5 inlineElement" id="wagertime_propFP" data-date="" data-date-format="hh:ii" data-link-field="dtp_input3" data-link-format="hh:ii">
                                <input class="form-control" size="16" type="text" value="" id="input_wagertime_propFP" required>
                                <span class="input-group-addon"><span class="glyphicon glyphicon-time"></span></span>
                            </div>
                        </div>
                    </div>

                    <div class="right">
                        <div class="bordered-div">
                            <label class="control-label">Contestants</label> <br/>
                            <input type="text" class="form-control" size="5"name="cont_numberFP" id="cont_numberFP"/>
                            <input type="text" class="form-control" name="cont_nameFP" id="cont_nameFP"/>
                            <input type="button" name="add_contestantFP" id="add_contestantFP" value="Add"/><br/>
                            <br/>
                            <select multiple style="width: 325px"name="contestantsFP" id="contestantFP" class="form-control" size="13"></select>
                        </div>
                        <span class="separator"></span>
                        <div class="inline-form">
                            <label class="label-control" for="commentsFP">Comments</label>
                            <textarea class="form-control" rows=3 cols="39"name="comments_FP" id="comments_FP"></textarea>
                        </div>
                    </div>
                    <input type="hidden" name="sportTypeFP" id="sportTypeFP" value=""/>


                </form>
            </div>
            <div class="modal-footer">
                <button id="saveNextFuturePropButton" name="saveNextFuturePropButton" type="button" class="btn btn-info">
                    Next
                </button>
                <button id="saveFuturePropButton" name="saveFuturePropButton" type="button" class="btn btn-success">
                    Save
                </button>
                <button id="cancelFuturePropButton" name="cancelFuturePropButton" type="button" class="btn btn-danger" data-dismiss="modal">
                    Cancel
                </button>
            </div>
        </div>
    </div>
</div>
<!--END MODAL FADE-->