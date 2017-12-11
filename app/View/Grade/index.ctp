<?php
echo $this->Html->css('grade');
echo $this->Html->script('grade/index');
echo $this->Html->script('games/comeback');
?>
<?php echo $this->element('maintheader', array("pagename" => "Grade Game / Contest")); ?>
<?php echo $this->element('grade/propgradingmodal'); ?>
<?php echo $this->element('grade/gamegradeaditionaiInfo'); ?>

<div class="mainConteiner center">
    <form id="gameGradeFiltersFrm" action="#" role="form" class="form-inline" method="post">
        <center>
            <div id="gameGradeFilters" class="form-group center">
                <label for="sportGradeFilter" class="control-label labelWidth">Sport:</label>
                <select name="sportGradeFilter" id="sportGradeFilter" class="form-control inlineElement ">
                    <option value=""></option>
                    <?php foreach ($sports as $sport) { ?>
                        <option value="<?= $sport['SportType'] ?>"><?= $sport['SportType'] ?></option>
                        <?php
                    }
                    ?>
                </select>
                <label for="subsportGradeFilter" class="control-label labelWidth">Sub Sport:</label>
                <select name="subsportGradeFilter" id="subsportGradeFilter" class="form-control inlineElement">
                    <option value=""></option>
                </select>
                <label for="gradeActiveGameFilter" class="control-label labelWidth">Active</label>
                <input class="form-control" type="checkbox" id="gradeActiveGameFilter"/>
                <label for="input_dateFrom" class="control-label labelWidth">Game Date: </label>
                <div class="input-group date form_date elementSize" id='gg_gameDateDiv' data-date="" data-date-format="mm-dd-yyyy" data-link-field="dtp_input2" data-link-format="yyyy-mm-dd">
                    <input class="form-control" id="gg_gameDate"size="10" type="text" value="" readonly required>
                    <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
                </div>
                <button type="button" class="btn btn-info" name="getGamesButton" id="getGamesButton">Games List</button>
                <div class="rightButtonsDiv">
                    <label for="searchIngradeTable" class="label-control">Search</label>
                    <input type="text" class="form-control" name="searchIngradeTable"  id="searchIngradeTable" onkeypress="return nosubmit(event)" onkeyup="searchGradeTable(this.value)"/>
                </div>
            </div>
        </center>
        <div id="gradeGamesTableHeaderContainer">
            <table id="gamesGradeTableHeader" cellspacing="0">
            </table>
        </div>
        <div id="gradeGamesTableContainer">
            <table id="gamesGradeTable" cellspacing="0" width="100%">
            </table>
        </div>
            <input type="hidden" name="gameNumRedirect" id="gameNumRedirect" value=""/>
        <br/>
        <div class="rightButtonsDiv">
            <button type="button" id="gradeMassiveGames" name="gradeMassiveGames" class="btn btn-danger">Grade Games Selected</button>
        </div>
    </form>
</div>