<?php
echo $this->Html->css('props');
echo $this->Html->script('props/edit');
?>
<?php echo $this->element('maintheader', array("pagename" => "Edit Props")); ?>
<?php echo $this->element('games/confirmationmodal', array("message" => "Prop created successfully")); ?>
<form id="propsfrm" action="#" role="form" class="form-inline" method="post">
    <div id="mainContainer" class="center">
        <div class="left">
            <div id="foldersDiv">
                <div class="form-group controlWith">
                    <label class="label-control ">Folder 1:</label><br/>
                    <input type="text" name="level1" id="level1" size="43" readonly value="<?php echo $results['ContestType']?>"/>
                </div><br/>
                <div class="form-group controlWith">
                    <label class="label-control ">Folder 2:</label><br/>
                    <input type="text" name="level2" id="level2" size="43" readonly value="<?php echo $results['ContestType2']?>"/>
                </div><br/>
                <div class="form-group controlWith">
                    <label class="label-control ">Folder 3:</label><br/>
                    <input type="text" name="level3" id="level3" size="43" readonly value="<?php echo $results['ContestType3']?>"/>
                </div>
            </div>
            <span class="separator"></span>
            <div>
                <label for="" class="control-label inlineDiv3" >Prop / Future Name</label><br/>
                <input type="text" name="prop_name" size="43" id="prop_name" <?php echo $block?> value="<?php echo $results['ContestDesc']?>"/>
                <input type="hidden" name="oldContestDesc" id="oldContestDesc" value="<?php echo $results['ContestDesc']?>"/>
            </div>
            <span class="separator"></span>
            <div class="bordered-div">
                <label for="spread_prop" class="control-label">Spread <br/>(Two Contestants)</label>
                <input type="radio" name="type" id="spread_prop"value="S" readonly <?php echo $spreadType?>/><br/><br/>
                <label for="over_under" class="control-label">Over/Under</label>
                <input type="radio" name="type" id="over_under"value="T" readonly <?php echo $totalType?>/><br/><br/>
                <label for="units" class="control-label">Units</label>
                <input type="tex" name="units" size="12" readonly id="units" value="<?php echo $results['ThresholdUnits']?>"/>
            </div>
            <span class="separator"></span>
            <label for="gamedate_prop" class="control-label">Game Date: </label>
            <div class="input-group date form_date col-md-5" id='gamedate_prop' data-date="" data-date-format="mm-dd-yyyy" data-link-field="dtp_input2" data-link-format="yyyy-mm-dd">
                <input class="form-control" id="input_gamedate_prop"size="16" type="text" value="<?php echo $date?>" readonly required>
                <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
            </div>
            <br/><br/>
            <label for="gametime_prop" class="control-label">Game Time: </label>
            <div class="input-group date form_time col-md-5" id="gametime_prop" data-date="" data-date-format="hh:ii" data-link-field="dtp_input3" data-link-format="hh:ii">
                <input class="form-control" size="16" type="text" value="<?php echo $time?>" id="input_gametime_prop"readonly/>
                <span class="input-group-addon"><span class="glyphicon glyphicon-time"></span></span>
            </div>
            <br/><br/>
            <label for="wagertime_prop" class="control-label">Wager CutOff: </label>
            <div class="input-group date form_time col-md-5" id="wagertime_prop" data-date="" data-date-format="hh:ii" data-link-field="dtp_input3" data-link-format="hh:ii">
                <input class="form-control" size="16" type="text" value="<?php echo $cutOff?>" id="input_wagertime_prop" readonly/>
                <span class="input-group-addon"><span class="glyphicon glyphicon-time"></span></span>
            </div>
        </div>
        <div class="right">
            <div>
                <label for="correlational_id" class="control-label inlineDiv3">Correlational Id:&nbsp;</label><br/>
                <select name="correlational_id" id="correlational_id" <?php echo $disabled?> class="form-control inlineDiv3" style="width: 360px">
                    <option value=""></option>
                    <?php 
                    foreach ($correlations2 as $value) { 
                        $selected="";
                        if(trim($value['CorrelationID'])==trim($correlation)){
                            $selected="selected='selected'";
                        }
                            ?>
                        <option value="<?php echo $value['CorrelationID']?>" <?php echo $selected?>><?php echo $value['CorrelationID']?></option>
                        <?php } ?>
                    </select>
                <?php echo $correlationHidden?>
                </div>
                <span class="separator"></span>
                <div class="bordered-div">
                    <label class="control-label">Contestants</label> <br/>
                    <input type="text" class="form-control" size="5"name="cont_number" id="cont_number"/>
                    <input type="text" class="form-control" name="cont_name" id="cont_name"/>
                    <input type="button" name="add_contestant" id="add_contestant" value="Add"/><br/>
                    <input type="hidden" name="currentContestants" id="currentContestants" value="<?php echo $contestantsString ?>"
                    <br/>
                    <select multiple style="width: 325px"name="contestants" id="contestant" class="form-control" size="13">
                        <?php foreach ($contestants as $contestan) { ?>
                            <option value="<?php echo $contestan[0]."_".$contestan[1] ?>" ondblclick="removeOption(this.value)"><?php echo $contestan[0]." - ".$contestan[1] ?></option>
                        <?php }
                        ?>
                </select>
            </div>
            <span class="separator"></span>
            <div class="inline-form">
                <label class="label-control" for="comments">Comments</label>
                <textarea class="form-control" rows=3 cols="48"name="comments" id="comments"><?php echo $results['Comments']?></textarea>
            </div>
        </div>
    </div>
</form>