<?php
echo $this->Html->css('reports');
echo $this->Html->script('reports/graderesults');
?>
<?php echo $this->element('maintheader', array("pagename" => "Grade Results")); ?>
<?php echo $this->element('loadingajaxcallmodal'); ?>
<?php echo $this->element('defaultmsgmodal'); ?>

<div class="mainConteiner center">
    <form id="gradeResultFrm" action="#" role="form" class="form-horizontal">
        <div id="headerDivGradeResults" class="center">
            <center>
                <div class="bordered-div3 inlineDiv2">
                    1 Edmonton Oilers / 2 New Jersey Devils 02/09/2015
                </div>
                <div class="inlineDiv2">
                    <input type="checkbox" name="applyPB" id="applyPB"/><label class="label-control" for="applyPB">Apply Percent Book</label>
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
                    </select>
                </div>
            </center>
        </div>
        <br/><br/>
        <div class="wraplinehistory center">
            <table id="linehistoryTable">
                <tr>
                    <td>Request</td>
                    <td>Result</td>
                    <td>Duration</td>
                </tr>
            </table>
        </div>
        <div class="inner_LineHistoryTable center" >
            <table id="linehistoryTableBody">
                <tr>
                    <td>Total Customer win/lost</td>
                    <td>0</td>
                    <td>< 1 sec.</td>
                </tr>
                <tr>
                    <td>Straigh Bet win/lost</td>
                    <td>0</td>
                    <td>< 1 sec.</td>
                </tr>
                <tr>
                    <td>Spread win/lose</td>
                    <td>0</td>
                    <td>< 1 sec.</td>
                </tr>
                <tr>
                    <td>Team Total win Lost</td>
                    <td>On Request</td>
                    <td></td>
                </tr>
                <tr>
                    <td>Total Customer win/lost</td>
                    <td>0</td>
                    <td>< 1 sec.</td>
                </tr>
                <tr>
                    <td>Straigh Bet win/lost</td>
                    <td>0</td>
                    <td>< 1 sec.</td>
                </tr>
                <tr>
                    <td>Spread win/lose</td>
                    <td>0</td>
                    <td>< 1 sec.</td>
                </tr>
                <tr>
                    <td>Team Total win Lost</td>
                    <td>On Request</td>
                    <td></td>
                </tr>
                <tr>
                    <td>Total Customer win/lost</td>
                    <td>0</td>
                    <td>< 1 sec.</td>
                </tr>
                <tr>
                    <td>Straigh Bet win/lost</td>
                    <td>0</td>
                    <td>< 1 sec.</td>
                </tr>
                <tr>
                    <td>Spread win/lose</td>
                    <td>0</td>
                    <td>< 1 sec.</td>
                </tr>
                <tr>
                    <td>Team Total win Lost</td>
                    <td>On Request</td>
                    <td></td>
                </tr>
            </table>
        </div>

        <div class="center checkDiv">
            <center>
                <input type="button" name="retrieveSelected" id="retrieveSelected" value="Retrieve Selected" class="btn btn-default"/>
                <textarea name="retrieveSelectedTA" id="retrieveSelectedTA" rows=3" cols="60"></textarea>
            </center>
        </div>
    </form>

</div>