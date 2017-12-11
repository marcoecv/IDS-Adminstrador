<?php
echo $this->Html->css('settings');
echo $this->Html->script('settings/systemsettings');
?>
<?php echo $this->element('maintheader', array("pagename" => "System Settings")); ?>
<?php echo $this->element("settings/shadegroupsmodal"); ?>
<?php echo $this->element('loadingajaxcallmodal'); ?>
<?php echo $this->element('defaultmsgmodal'); ?>
<?php echo $this->element('settings/maxbetmodal'); ?>

<div id="lineShadeMainContainer" class="center">
    <form id="lineShadeGroupsFrm" action="#" role="form" class="form-horizontal">
        <div class="headerDiv2 center">
            <div id="leftDiv" class="leftFloat3 bordered-div3">
                <label class="label-control">Minimum Waget $: &nbsp;</label> <input type="text" size="3" name="minWager" id="minWager" value="2"/> &nbsp;
                <input class="btn btn-default"type="button" name="maxBet" id="maxBet" value="Max Bet"/><br/>
                <label class="label-control">Archive Data Older than (days):  &nbsp;</label><input type="text" name="archiveData" id="archiveData" size="3" value="91" disabled="disabled"/>
                <br/>
                <input type="checkbox" name="includeCents" id="includeCents"/><label class="label-control" for="includeCents"> &nbsp; Include Cents</label><br/>
                <input type="checkbox" name="truncate" id="truncate"/><label class="label-control" for="truncate"> &nbsp; Truncate in Bank Favor</label><br/>
                <label class="label-control">Weekly Figure Starts:  &nbsp;</label>
                <select name="figureStartsDay" id="figureStartsDay">
                    <option>Monday</option>
                    <option>Tuesday</option>
                    <option>Wenesday</option>
                    <option>Thursday</option>
                    <option>Friday</option>
                    <option>Saturday</option>
                    <option>Sunday</option>
                </select>
            </div>
            <div id="rightDiv" class="rightFloat3 bordered-div3">
                <label class="label-control">Seconds to update ticket writer lines: &nbsp;</label><input type="tex" size="7" name="" id=""/><br/>
                <label class="label-control">Seconds to update administrador action: &nbsp;</label><input type="tex" size="7" name="" id=""/><br/>
                <label class="label-control">Days to show completed game in admin: &nbsp;</label><input type="tex" size="7" name="" id=""/><br/>
                <label class="label-control">Default wager cutoff minutes following game time: &nbsp;</label><input type="tex" size="7" name="" id=""/><br/>
                <label class="label-control">Minutes to keep period open: &nbsp;</label><input type="tex" size="7" name="" id=""/><br/>
                <label class="label-control">Post time lead minutes needed for horse wager: &nbsp;</label><input type="tex" size="7" name="" id=""/><br/>
                <label class="label-control">Local time zone: &nbsp;</label>
                <select name="timeZone" id="timeZone">
                    <option>Eastern</option>
                    <option>Central</option>
                </select>
            </div>
            <div id="notAdmin" class="bordered-div3">
                <label class="label-control">Notify Administrator</label><br/>
                <div class="leftFloat3">
                    <label class="label-control">Admin ID: &nbsp;</label><input type="text" name="adminId" id="adminId"/>
                </div>
                <div class="rightFloat">
                    <input type="checkbox" name="" id=""/><label class="label-control" for=""> &nbsp;To Exceed Wager Maximum</label><br/>
                    <input type="checkbox" name="" id=""/><label class="label-control" for=""> &nbsp;Insuficent Funds</label><br/>
                    <input type="checkbox" name="" id=""/>
                    <label class="label-control" for="">To Acept Wagers &nbsp;<input type="text" name="" id="" size="3"/> &nbsp; Minutes following Cutoff</label><br/>
                </div>
            </div>
            <br/>
            <div id="centralValues">
                <div class="center modalDiv bordered-div3">
                    <label class="label-control marginElement">Parley</label><br/>
                    <label class="label-control marginElement">Max. Call Unit Bet: &nbsp;</label>
                    <input class="marginElement" type="text" size="3"name="parley_mcub" id="parley_mcub" disabled="disabled"/>
                    <label class="label-control marginElement">Max. Internet Bet: &nbsp;</label>
                    <input class="marginElement" type="text" size="3"name="parley_mib" id="parley_mib" disabled="disabled"/>
                    <label class="label-control marginElement">Max Payout: &nbsp;</label>
                    <input class="marginElement" type="text" size="3"name="parley_mpo" id="parley_mpo" disabled="disabled"/>
                </div>
                <div class="center modalDiv bordered-div3">
                    <label class="label-control marginElement">Teaser</label><br/>
                    <label class="label-control marginElement">Max. Call Unit Bet: &nbsp;</label>
                    <input class="marginElement" type="text" size="3"name="teaser_mcub" id="parley_mcub" disabled="disabled"/>
                    <label class="label-control marginElement">Max. Internet Bet: &nbsp;</label>
                    <input class="marginElement" type="text" size="3"name="teaser_mib" id="parley_mib" disabled="disabled"/>
                </div>
                <div class="center modalDiv bordered-div3">
                    <label class="label-control marginElement">Contest</label><br/>
                    <label class="label-control marginElement">Max. Call Unit Bet: &nbsp;</label>
                    <input class="marginElement" type="text" size="3"name="contest_mcub" id="parley_mcub" disabled="disabled"/>
                    <label class="label-control marginElement">Max. Internet Bet: &nbsp;</label>
                    <input class="marginElement" type="text" size="3"name="contest_mib" id="parley_mib" disabled="disabled"/>
                    </table>
                </div>
            </div>
        </div>
    </form>
</div>