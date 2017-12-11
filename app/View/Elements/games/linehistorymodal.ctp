<!--BEGIN MODAL FADE-->
<div class="modal" id="lineHistoryModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog modalWidth2">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="myModalLabel">Line History</h4>
            </div>
            <div class="modal-body">
                <form id="lh_form" action="" method="post" class="inline-form">
                    <div id="lh_paramsDiv">
                        <div id="lh_leftDiv">
                            <label class="label-control">Store:</label>
                            <select id="lh_storeFilter" name="lh_storeFilter" onchange="reloadLineHistoryParams()" style="width: 150px" class="form-control inlineElement selectSize">

                            </select>
                            <label class="label-control">Game Period:</label>
                            <select id="lh_periodsFilter" name="lh_periodsFilter"  onchange="reloadLineHistoryParams()" style="width: 150px" class="form-control inlineElement selectSize">

                            </select>
                            <br/><br/>
                            <div class="col-lg-3 switches">
                                <button class="btn btn-default" id="lh_spread"type="button" name="lh_spread" onclick="setwagerType('spread')">Spread</button>
                            </div>
                            <div class="col-lg-3 switches">
                                <button class="btn btn-default" id="lh_moneyline"type="button" name="lh_moneyline" onclick="setwagerType('moneyline')">Money Line</button>
                            </div>
                            <div class="col-lg-3 switches">
                                <button class="btn btn-default" id="lh_total"type="button" name="lh_total" onclick="setwagerType('total')">Total</button>
                            </div>
                        </div>
                        <div id="lh_rightDiv">
                            <div id="lh_viewsDiv" class="bordered-div3">
                                <input type="radio" id="lh_historyView"  onclick="reloadLineHistoryParams()" name="lh_View"/><label for="lh_historyView" class="label-control">Line History View</label><br/><br/>
                                <input type="radio" id="lh_wagerListView"  onclick="reloadLineHistoryParams()" name="lh_View"/><label for="lh_wagerListView" class="label-control">Wager List View</label>
                            </div>
                        </div>
                    </div>
                </form>
                <div id="lh_tableDivHeader">
                    <table id="lh_listTableHeader">
                    </table>
                </div>
                <div id="lh_tableDiv">
                    <table id="lh_listTable">
                    </table>
                </div>
            </div>
            <input type="hidden" name="lh_gameNum" id="lh_gameNum" value=""/>
            <input type="hidden" name="lh_wagerType" id="lh_wagerType" value=""/>
            <div class="modal-footer">
                <button id="cancelButtonT" name="cancelButtonT" type="button" data-dismiss="modal" class="btn btn-danger">
                    Cancel
                </button>
            </div>
        </div>
    </div>
</div>
<!--END MODAL FADE-->