<?php
echo $this -> Html -> css('games');
echo $this -> Html -> script('games/index');
echo $this -> Html -> script('games/hotkeys');
echo $this -> Html -> script('games/scheduleTree');
echo $this -> Html -> script('games/validations');
echo $this -> Html -> script('games/modals');
echo $this -> Html -> script('games/lines');
echo $this -> Html -> script('games/dataProcessor');
echo $this -> Html -> script('games/gameLineDisplay');
echo $this -> Html -> script('games/propLineDisplay');
echo $this -> Html -> script('games/comeback');
echo $this -> Html -> script('games/updater');
echo $this -> Html -> script('games/profitLines');
?>
<?php echo $this -> element('games/filter', array('sports' => $sports)); ?>
<?php echo $this -> element('confirmationmodal', array("message" => "Please select a game before trying to edit it")); ?>
<?php echo $this -> element('games/gamepausemodal'); ?>
<?php echo $this -> element('games/pausemodal'); ?>
<?php echo $this -> element('games/spreadmodal'); ?>
<?php echo $this -> element('games/moneylinemodal'); ?>
<?php echo $this -> element('games/totalmodal'); ?>
<?php echo $this -> element('games/teamtotalmodal'); ?>
<?php echo $this -> element('games/newcategorymodal'); ?>
<?php echo $this -> element('games/ajaxdeletemodal'); ?>
<?php echo $this -> element('games/linehistorymodal'); ?>
<?php echo $this -> element('games/editgamemodal'); ?>
<?php echo $this -> element('games/wagercoveragemodal'); ?>
<?php echo $this -> element('games/wagerdetailsmodal'); ?>
<?php echo $this -> element('Props/createfutureprop'); ?>
<?php echo $this->element('grade/gradepropsmodal'); ?>
<?php echo $this->element('grade/gradegamesmodal'); ?>
<?php echo $this->element('defaultmsgmodal'); ?>
<?php echo $this->element('Props/createprop'); ?>
<?php echo $this->element('games/gamescoremodal'); ?>
<?php echo $this->element('games/graderesultmodal'); ?>
<?php echo $this->element('defaultmsgmodal'); ?>
<?php echo $this->element('Props/lineedit'); ?>
<?php echo $this->element('Props/editprop'); ?>
<?php echo $this->element('loadingajaxcallmodal'); ?>

<div id="gamesContainer">
    <div id="scheduleTree">
    </div>
	<div id="scheduleLines">
            <?php echo $this -> element('games/linesfilter'); ?>
            <div id="headerTable" class="stickythead">
                    <table class="table">
                            <thead>
                            </thead>
                    </table>
            </div>
            <div class="scrollabletbody">
                <table id="bodytable" class="table table-bordered center">
                        <tbody>		
                        </tbody>
                </table>
            </div>
	</div>
</div>