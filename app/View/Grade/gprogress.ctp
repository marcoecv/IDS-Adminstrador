<?php
echo $this->Html->css('grade');
echo $this->Html->script('grade/gamecontest');
?>
<?php echo $this->element('maintheader', array("pagename" => "Grade Game / Contest")); ?>
<?php echo $this->element('grade/grademodal'); ?>
<?php echo $this->element('defaultmsgmodal'); ?>
<form id="manualPlaysFrm" action="#" role="form" class="form-horizontal">
    <div id="mainConteiner" class="mainConteiner center">
        <div class="bordered-div3 center" >
            <center>
                <label class="label-control">
                    Soccer Props Feb 7 2015 <br/>
                    Soccer<br/>
                    ATLETICO MADRID vs REAL MADRID<br/>
                    Team to Score next goal (Curren score 0:0)<br/>
                    07/07/2015 7:45 AM<br/>
                </label>
            </center>
        </div>
        <div class="checkDiv center">
            <input type="checkbox" name="enabReGrading" id="enabReGrading" value="1"/>
            <label class="label-control" for="enabReGrading">Enable Re-grading od graded contestants</label>
        </div>
        <div class="wrapGameContest center">
            <table id="gradingTable">
            </table>
        </div>
        <div class="inner_GameContestTable center">
            <table id="gradingTableBody">
            </table>
        </div>
        <div class="checkDiv center">
            <center>
                <div id="spread">
                    <label class="label-control">Winner Won by &nbsp;<input type="text" name="winbyGoal" id="winbyGoal" size="3"/>&nbsp; Goals</label>
                </div>
                <div id="total">
                    <label class="label-control">Total &nbsp;<input type="text" name="totalGoal" id="totalGoal" size="3"/>&nbsp;Goals</label>
                </div>
                <label class="label-control">Tie Win/Lose ratio &nbsp;<input type="text" size="3" disabled="disabled" value="1.0"/> or push <input type="checkbox"/></label><br/>
                <input type="checkbox"/> <label class="label-control">&nbsp;Adjust all wagers to final Odds</label><br/>
                <input type="checkbox"/><label class="label-control">&nbsp; Contest cancelled </label>
            </center>
            <br/>
            <div class="leftFloat2 bordered-divHalf center">
                <label class="label-control">Daily Figure Date:</label><br/>
                <div class="input-group date form_date" id='dfDate' data-date="" data-date-format="mm-dd-yyyy" data-link-field="dtp_input2" data-link-format="yyyy-mm-dd">
                    <input class="form-control" id="date" size="16" type="text" value="" readonly>
                    <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
                </div>
            </div>
            <div class="rightFloat2 bordered-divHalf center">
                <label class="label-control">Comments:</label><br/>
                <textarea name="comments" cols="20" id="comments"></textarea>
            </div>
        </div>

    </div>
</form>

