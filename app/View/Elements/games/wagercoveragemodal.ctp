<!--BEGIN MODAL FADE-->
<div class="modal" id="wagerCoverageModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog modalWidth2" >
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="myModalLabel">Wager Coverage</h4>
            </div>
            <div class="modal-body" style="height: 660px">
                <div id="wc_gameInfo" class="bordered-div3">
                    <label class="label-control">Store:&nbsp;</label><span id="wc_store"></span>
                    <label class="label-control">Game Period:&nbsp;</label><span id="wc_period"></span>
                    <label class="label-control">Waget Type:&nbsp;</label><span id="wc_wagerType"></span><br/>
                    <span id="wc_rot1"></span>&nbsp;<span id="wc_team1"></span>&nbsp;vs&nbsp;<span id="wc_rot2"></span>&nbsp;<span id="wc_team2"></span>
                    <span id="wc_actionFilter">&nbsp;*** ALL PLAYERS ***&nbsp;</span>
                    <span id="wc_gameDateTime"></span>
                </div>
                <form id="wc_form" action="" method="post" class="inline-form">
                    <div id="wc_wagerTypeDiv">
                        <div id="WagerTypeFilterDiv" class="leftFloat center">
                            <center>
                                <input type="radio" id="wc_straight" name="wc_wagerTypeFilter" value="S" onclick="changeWagerTypeFilters()"/>
                                <label for="wc_straight" class="label-control">Straight Bets</label>
                                <input type="radio" id="wc_parlays" name="wc_wagerTypeFilter" value="P" onclick="changeWagerTypeFilters()"/>
                                <label for="wc_parlays" class="label-control">Parlays</label>
                                <input type="radio" id="wc_if_bets" name="wc_wagerTypeFilter" value="I" onclick="changeWagerTypeFilters()"/>
                                <label for="wc_if_bets" class="label-control">If-Bets</label>
                                <input type="radio" id="wc_teaser" name="wc_wagerTypeFilter" value="T" onclick="changeWagerTypeFilters()"/>
                                <label for="wc_teaser" class="label-control">Teasers</label>
                                <select name="wc_totalPicks" id="wc_totalPicks" class="form-control inlineElement hide" onchange="changeWagerTypeFilters()">
                                    <option value="0">All</option>
                                    <?php for ($i = 1; $i < 26; $i++) { ?>
                                        <option value="<?= $i ?>"><?= $i ?> Team(s)</option>
                                    <?php } ?>
                                </select>
                            </center>
                        </div>
                        <div id="wc_moreFiltersDiv" class="rightFloat">
                            <input type="checkbox" id="wc_eliminateCancel" value="1" onclick="changeWagerTypeFilters()"/>
                            <label for="wc_eliminateCancel" class="label-control">Eliminate Lost and Cancelled Wagers</label><br/>
                            <input type="checkbox" id="wc_includeRIF" value="2" onclick="changeWagerTypeFilters()"/>
                            <label for="wc_includeRIF" class="label-control">Include RIF Wagers</label>
                        </div>
                    </div>
                </form>
                <label class="label-control">Accumulated Volume Amounts at Lines</label>
                <div id="wc_tableDiv1Header">
                    <table id="wc_listTable1Header">
                        <tr>
                            <th class="teamTD"><span id="wc_tableTeam1"></span></th>
                            <th class="lineTD"><span id="wc_tableline1"></span></th>
                            <th class="teamTD"><span id="wc_tableTeam2"></span></th>
                            <th class="lineTD"><span id="wc_tableline2"></span></th>
                        </tr>
                    </table>
                </div>
                <div id="wc_tableDiv1">
                    <table id="wc_listTable1">
                        <tbody>
                        <td class="teamTD">&nbsp;</td>
                        <td class="lineTD">&nbsp;</td>
                        <td class="teamTD">&nbsp;</td>
                        <td class="lineTD">&nbsp;</td>
                        </tbody>
                    </table>
                </div>
                <div id="wc_tableDiv1Foot">
                    <table id="wc_listTable1Foot">
                        <tbody>
                            <tr>
                                <td class="teamTD"><center><input type="text" class="form-control" id="wc_total1" style="width: 100px;" readonly/></center></td>
                        <td class="lineTD"><center><- Total -></center></td>
                        <td class="teamTD"><center><input type="text" class="form-control" id="wc_total2" style="width: 100px" readonly/></center></td>
                        <td class="lineTD"></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <br/>
                <label class="label-control">Individual Wagers</label>
                <div id="wc_tableDiv2">
                    <table id="wc_listTable2" class="hover listTable2Class" cellspacing="0" width="100%">
                        <thead>
                            <tr>
                                <th>
                                    Posted
                                </th>
                                <th>
                                    Customer ID
                                </th>
                                <th>
                                    Choice
                                </th>
                                <th>
                                    Line
                                </th>
                                <th>
                                    Volume Amt
                                </th>
                                <th>
                                    Agent
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            
                        </tbody>
                    </table>
                </div>
            </div>
            <input type="hidden" name="wc_gameNum" id="wc_gameNum" value=""/>
            <input type="hidden" name="wc_wagerType1" id="wc_wagerType1" value=""/>
            <div class="modal-footer">
                <button id="wc_cancelButton" name="wc_cancelButton" type="button" data-dismiss="modal" class="btn btn-danger">
                    Close
                </button>
            </div>
        </div>
    </div>
</div>
<!--END MODAL FADE-->