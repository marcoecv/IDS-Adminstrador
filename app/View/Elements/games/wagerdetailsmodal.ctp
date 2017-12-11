<!--BEGIN MODAL FADE-->
<div class="modal" id="wagerDetailsModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog modalWidth2">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="myModalLabel">Wager Details</h4>
            </div>
            <div class="modal-body" style="height: 600px">
                <form id="wd_form" action="" method="post" class="inline-form">
                    <label class="label-control">Ticket</label>
                    <div id="wd_ticketInfoDiv">
                        <label class="label-control">Posted:&nbsp;</label><input type="text" readonly size="15" id="wd_postedDateTime"/>
                        <label class="label-control">Ticket #:&nbsp;</label><input type="text" readonly size="9" id="wd_ticketNum"/>
                        <label class="label-control">Agent:&nbsp;</label><input type="text" readonly size="9" id="wd_agentID"/>
                        <label class="label-control">Written By:&nbsp;</label><input type="text" readonly size="25" id="wd_writtenBy"/>
                        <label class="label-control">Total Ticket:&nbsp;</label><input type="text" readonly size="6" id="wd_totalTicket"/>
                    </div>
                    <br/>
                    <label class="label-control">Wager</label>
                    <div id="wd_wagerDiv">
                        <table id="wd_wagerTable">
                            <tr>
                                <td colspan="2"><label class="label-control">Type:&nbsp;</label><input type="text" readonly size="40" id="wd_type"/></td>
                                <td><label class="label-control">Doc #:&nbsp;</label><input type="text" readonly size="10" id="wd_docNum"/></td>
                                <td><label class="label-control">Ties:&nbsp;</label><input type="text" readonly size="6" id="wd_ties"/></td>
                                <td><label class="label-control">Acct:&nbsp;</label><input type="text" readonly size="6" id="wd_acct"/></td>
                                <td><label class="label-control">Status:&nbsp;</label><input type="text" readonly size="8" id="wd_status"/></td>
                            </tr>
                            <tr>
                                <td><label class="label-control">Risk:&nbsp;</label><input type="text" readonly size="6" id="wd_risk"/></td>
                                <td><label class="label-control">To Win:&nbsp;</label><input type="text" readonly size="6" id="wd_toWin"/></td>
                                <td><label class="label-control">Win/Loss Ratio:&nbsp;</label><input type="text" readonly size="5" id="wd_ratio"/></td>
                                <td><label class="label-control">Paid:&nbsp;</label><input type="text" readonly size="6" id="wd_paid"/></td>
                                <td><label class="label-control">Lost:&nbsp;</label><input type="text" readonly size="6" id="wd_lost"/></td>
                                <td><label class="label-control">Won:&nbsp;</label><input type="text" readonly size="6" id="wd_won"/></td>
                            </tr>
                        </table>
                    </div>
                    <br/>
                </form>
                <div id="wd_tableDivHeader">
                    <table id="wd_listTableHeader">
                        <tr>
                            <th class="outcomeTd">Outcome</th>
                            <th class="gameDateTd">Game Date</th>
                            <th class="wagerTd">Wager</th>
                        </tr>
                    </table>
                </div>
                <div id="wd_table">
                    <table id="wd_listTable">
                    </table>
                </div>
                <br/>
                <table>
                    <tr>
                        <td style="vertical-align: text-top;"><label class="label-control">Game/Contest Outcome:</label></td>
                        <td><textarea cols="45" rows="4"id="wd_gcOutcome" readonly></textarea></td>
                    </tr>
                </table>
            </div>
            <div class="modal-footer">
                <button id="cancelButtonT" name="cancelButtonT" type="button" data-dismiss="modal" class="btn btn-danger">
                    Close
                </button>
            </div>
        </div>
    </div>
</div>
<!--END MODAL FADE-->