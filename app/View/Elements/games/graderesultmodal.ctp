<!--BEGIN MODAL FADE-->
<div class="modal" id="gradeResultModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog" style="width: 1000px">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="myModalLabel">Grade Results</h4>
            </div>
            <div class="modal-body" style="height: 700px">
                <div id="headerDivGradeResults" class="center">
                    <center>
                        <div class="bordered-div4 inlineDiv2">
                            1 Edmonton Oilers / 2 New Jersey Devils 02/09/2015
                        </div>
                        <div class="inlineDiv2">
                            &nbsp;<input type="checkbox" name="applyPB" id="applyPB"/><label class="label-control" for="applyPB">&nbsp;Apply Percent Book</label>
                        </div>
                        <br/><br/>
                        <div class="center">
                            <label class="label-control">Period: </label>
                            <select class="form-control inlineDiv2" style="width: 150px" name="period" id="period" onchange="">
                                <option></option>
                                <?php foreach ($stores as $store) { ?>
                                    <option value="<?php echo $store['Store'] ?>"><?php echo $store['Store'] ?></option>
                                    <?php
                                }
                                ?>
                            </select>&nbsp;&nbsp;&nbsp;&nbsp;
                            <label class="label-control">Store: </label>
                            <select class="form-control inlineDiv2" style="width: 150px" name="store" id="store" onchange="">
                                <option></option>
                                <?php foreach ($stores as $store) { ?>
                                    <option value="<?php echo $store['Store'] ?>"><?php echo $store['Store'] ?></option>
                                    <?php
                                }
                                ?>
                            </select>&nbsp;&nbsp;&nbsp;&nbsp;
                            <label class="label-control">Agent: </label>
                            <select class="form-control inlineDiv2" style="width: 150px" name="agent" id="agent" onchange="">
                                <option></option>
                                <option value="1">Agent 1</option>
                                <option value="2">Agent 2</option>
                                <option value="3">Agent 3</option>
                                <option value="4">Agent 4</option>
                            </select>&nbsp;&nbsp;&nbsp;&nbsp;
                            <label class="label-control">Game: </label>
                            <select class="form-control inlineDiv2" style="width: 150px" name="agent" id="agent" onchange="">
                                <option></option>
                                <option value="1">Agent 1</option>
                                <option value="2">Agent 2</option>
                                <option value="3">Agent 3</option>
                                <option value="4">Agent 4</option>
                            </select>
                        </div>
                    </center>
                </div>
                <br/><br/>
                <div class="wrapgradeResult center">
                    <table id="gradeResultTable">
                        <tr>
                            <td>Request</td>
                            <td>Result</td>
                            <td>Duration</td>
                            <td>BD</td>
                        </tr>
                    </table>
                </div>
                <div class="inner_gradeResultTable center" >
                    <table id="gradeResultTableBody">
                        <tr>
                            <td>Total Customer win/lost</td>
                            <td>0</td>
                            <td>< 1 sec.</td>
                            <td>BD</td>
                        </tr>
                        <tr>
                            <td>Straigh Bet win/lost</td>
                            <td>0</td>
                            <td>< 1 sec.</td>
                            <td>BD</td>
                        </tr>
                        <tr>
                            <td>Spread win/lose</td>
                            <td>0</td>
                            <td>< 1 sec.</td>
                            <td>BD</td>
                        </tr>
                        <tr>
                            <td>Team Total win Lost</td>
                            <td>On Request</td>
                            <td></td>
                            <td>BD</td>
                        </tr>
                        <tr>
                            <td>Total Customer win/lost</td>
                            <td>0</td>
                            <td>< 1 sec.</td>
                            <td>BD</td>
                        </tr>
                        <tr>
                            <td>Straigh Bet win/lost</td>
                            <td>0</td>
                            <td>< 1 sec.</td>
                            <td>BD</td>
                        </tr>
                        <tr>
                            <td>Spread win/lose</td>
                            <td>0</td>
                            <td>< 1 sec.</td>
                            <td>BD</td>
                        </tr>
                        <tr>
                            <td>Team Total win Lost</td>
                            <td>On Request</td>
                            <td></td>
                            <td>BD</td>
                        </tr>
                        <tr>
                            <td>Total Customer win/lost</td>
                            <td>0</td>
                            <td>< 1 sec.</td>
                            <td>BD</td>
                        </tr>
                        <tr>
                            <td>Straigh Bet win/lost</td>
                            <td>0</td>
                            <td>< 1 sec.</td>
                            <td>BD</td>
                        </tr>
                        <tr>
                            <td>Spread win/lose</td>
                            <td>0</td>
                            <td>< 1 sec.</td>
                            <td>BD</td>
                        </tr>
                        <tr>
                            <td>Team Total win Lost</td>
                            <td>On Request</td>
                            <td></td>
                            <td>BD</td>
                        </tr>
                    </table>
                </div>
                <br/>
                <br/>
                <div class="center checkDiv">
                    <center>
                        <table>
                            <tr>
                                <td>
                                    <textarea name="retrieveSelectedTA" id="retrieveSelectedTA" rows=1" cols="40"></textarea>
                                </td>
                                <td>
                                    <input type="button" name="retrieveSelected" id="retrieveSelected" value="Retrieve Selected" class="btn btn-default"/>
                                </td>
                            </tr>
                        </table>
                    </center>
                </div>
            </div>
            <div class="modal-footer">
                <button id="cancelManualButton" name="cancelManualButton" type="button" class="btn btn-danger" data-dismiss="modal">
                    Cancel
                </button>
                <button id="confirmationManualButton" name="confirmationManualButton" type="button" class="btn btn-success">
                    OK
                </button>
            </div>
        </div>
    </div>
</div>