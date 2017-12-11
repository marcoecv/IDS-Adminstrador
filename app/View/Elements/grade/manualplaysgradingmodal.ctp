<!--BEGIN MODAL FADE-->
<div class="modal" id="manualPlaysGradingModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="myModalLabel">Aditional Info for Grading</h4>
            </div>
            <div class="modal-body" style="height: 400px">
                <div class="mpg_leftFloat">
                    <label class="label-control">Description:</label>
                    <textarea class="form-control" name="mpg_description" id="mpg_description" rows="7" ></textarea>
                </div>
                <div class="mpg_rightFloat">
                    <br/>
                    <label class="label-control">Accepted:&nbsp;</label><span class="" id="mpg_ticketDateTime"></span><br/>
                    <label class="label-control">By&nbsp;</label><span class="" id="mpg_user"></span><br/>
                </div>
                <div class="mpg_leftFloat bordered-div">
                    <label class="mpg_labelLeftDiv">Grade Date:&nbsp;</label>
                    <input type="text" class="form-control mpg_inputLeftDiv" id="mpg_gradeDate" disabled/>
                    <br/>
                    <label class="mpg_labelLeftDiv">Odds:&nbsp;</label>
                    <input type="text" class="form-control mpg_inputLeftDiv" id="mpg_odds"/>
                    <label class="mpg_labelLeftDiv">Risk Amount:&nbsp;</label>
                    <input type="text" class="form-control mpg_inputLeftDiv" id="mpg_risk" disabled/>
                    <label class="mpg_labelLeftDiv">&nbsp;</label>
                    <input type="text" class="form-control mpg_inputLeftDiv" id="mpg_towin"/>
                </div>
                <div class="mpg_rightFloat bordered-div">
                    <label class="label-control">Outcome</label><br/>
                    <input type="checkbox" id="mpg_win"  name="mpg_outcome[]" class="mpg_checkboxRight" value="W" onclick="setWinLostValue(this,this.value)"/><label class="mpg_checkboxLabelRight" for="mpg_win">Win</label><br/>
                    <input type="checkbox" id="mpg_lose" name="mpg_outcome[]" class="mpg_checkboxRight" value="L" onclick="setWinLostValue(this,this.value)"/><label class="mpg_checkboxLabelRight" for="mpg_lose">Lose</label><br/>
                    <input type="checkbox" id="mpg_cancel" name="mpg_outcome[]" class="mpg_checkboxRight" value="C" onclick="setWinLostValue(this,this.value)"/><label class="mpg_checkboxLabelRight" for="mpg_cancel">Cancel</label><br/>
                    <label>Daily Figure Date:</label>
                    <div class="input-group date form_date " id='mpg_dfDiv' data-date="" data-date-format="mm-dd-yyyy" data-link-field="dtp_input2" data-link-format="yyyy-mm-dd">
                        <input class="form-control" id="mpg_df" type="text" value="" readonly required>
                        <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
                    </div>
                    
                </div>
                <input type="hidden" id="mpg_id" value=""/>
            </div>
            <div class="modal-footer">
                <button id="mpg_cancelGrade" name="mpg_cancelGrade" type="button" class="btn btn-danger" data-dismiss="modal">
                    Cancel
                </button>
                <button id="mpg_grade" name="mpg_grade" type="button" class="btn btn-success">
                    Grade
                </button>
            </div>
        </div>
    </div>
</div>
<!--END MODAL FADE-->