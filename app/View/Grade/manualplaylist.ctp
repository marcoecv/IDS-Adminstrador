<?php
echo $this->Html->css('grade');
echo $this->Html->script('grade/manualplaylist');
?>
<?php echo $this->element('maintheader', array("pagename" => "Manual Play List")); ?>
<?php echo $this->element('grade/manualplaysgradingmodal'); ?>
<form id="manualPlaysFrm" action="#" role="form" class="form-horizontal">
    <div id="mainConteiner" class="mainConteiner center">
        <center>
            <div class="bordered-div" >
                <label for="showPerDays">&nbsp;Show Wagers for grading whithin&nbsp; <input type="text" name="days" id="days" size="3"/> &nbsp;days</label>
                <button type="button" id="searchByDays" class="btn btn-info" style="float: right" name="searchByDays">Search</button>
            </div>
            <div class="bordered-div ">
                &nbsp;<input id="showAllFuture" type="checkbox" name="showAll" class="cheked bloquear" value="" >
                <label for="showAll">&nbsp;Show all future Manual Plays&nbsp;</label>
            </div>
        </center>
        <br/>
        <div class="wrapGrading center">
            <table id="manualPlaysTable">
                <tr>
                    <td class="selecttd">Select</td>
                    <td class="datetd">Date</td>
                    <td class="customertd">Customer ID</td>
                    <td class="desctd">Description</td>
                    <td class="statustd">Status</td>
                </tr>
            </table>
        </div>
        <div class="inner_manualPlaysTableBody center">
            <table id="manualPlaysTableBody">
                <?php
                foreach ($manualPlaysList as $manualPlay) {?>
                <tr id="<?=$manualPlay["TicketNumber"]."_".$manualPlay["WagerNumber"]?>">
                    <td class="selecttd">
                        <input type="radio" name='selectedToGrade[]' value='<?=$manualPlay["TicketNumber"]."_".$manualPlay["WagerNumber"]?>'/>
                        <input type="hidden" id='<?=$manualPlay["TicketNumber"]."_".$manualPlay["WagerNumber"]."_AmountWagered"?>' value='<?=$manualPlay["AmountWagered"]?>'/>
                        <input type="hidden" id='<?=$manualPlay["TicketNumber"]."_".$manualPlay["WagerNumber"]."_TicketWriter"?>' value='<?=$manualPlay["TicketWriter"]?>'/>
                        <input type="hidden" id='<?=$manualPlay["TicketNumber"]."_".$manualPlay["WagerNumber"]."_PostedDateTime"?>' value='<?=$manualPlay["PostedDateTime"]?>'/>
                        <input type="hidden" id='<?=$manualPlay["TicketNumber"]."_".$manualPlay["WagerNumber"]."_ToWinAmount"?>' value='<?=$manualPlay["ToWinAmount"]?>'/>
                        <input type="hidden" id='<?=$manualPlay["TicketNumber"]."_".$manualPlay["WagerNumber"]."_Outcome"?>' value='<?=$manualPlay["Outcome"]?>'/>
                        <input type="hidden" id='<?=$manualPlay["TicketNumber"]."_".$manualPlay["WagerNumber"]."_Description"?>' value='<?=$manualPlay["Description"]?>'/>
                    </td>
                    <td class="datetd"><?=$manualPlay["Date"]?></td>
                    <td class="customertd"><?=$manualPlay["CustomerID"]?></td>
                    <td class="desctd"><?=$manualPlay["Description"]?></td>
                    <td class="statustd"><?=$manualPlay["Outcome"]?></td>
                </tr>
                
                
                <?php
                }
                
                ?>
                
            </table>
        </div>
        <br/>
        <center>
            <button class="btn btn-success"type="button" name="grade" id="grade">Grade</button>
        </center>
    </div>
</form>

