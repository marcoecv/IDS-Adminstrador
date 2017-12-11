<?php
echo $this->Html->css('grade');
echo $this->Html->script('grade/generalpropsgrading');
echo $this->element('loadingajaxcallmodal');
?>
<?php echo $this->element('maintheader', array("pagename" => "Grade Props")); ?>
<?php echo $this->element('grade/figuredatemodal'); ?>
<?php echo $this->element('grade/moneylinecontestantlist'); ?>

<div class="mainConteiner center">
    <div class="tabbable"> 
        <ul class="nav nav-tabs radius">
            <li class="active tabStyle"><a href="#tab1" data-toggle="tab">Game Props</a></li>
            <li class="tabStyle" ><a href="#tab2" data-toggle="tab">Future Props</a></li>
            <li class="tabStyle" ><a href="#tab3" data-toggle="tab">External Props</a></li>
        </ul>
        <div class="tab-content">
            <div class="tab-pane active" id="tab1">
                <form id="gamePropGradeFiltersFrm" class="form-inline" action="#" role="form" method="post">
                    <center>
                        <div id="gamePropGradeFilters" class="form-group center">
                            <label for="sportGradeFilter1" class="control-label labelWidth">Sport:</label>
                            <select name="sportGradeFilter1" id="sportGradeFilter1" class="form-control inlineElement ">
                                <option value=""></option>
                                <?php foreach ($sports as $sport) { 
                                    if($sport['Type2']=="Game"){?>
                                    <option value="<?= $sport['SportType'] ?>"><?= $sport['SportType'] ?></option>
                                    <?php
                                    }
                                }
                                ?>
                            </select>
                            <label for="subsportGradeFilter1" class="control-label labelWidth">Sub Sport:</label>
                            <select name="subsportGradeFilter1" id="subsportGradeFilter1" class="form-control inlineElement">
                                <option value=""></option>
                            </select>
                            <label for="input_dateFrom" class="control-label labelWidth">Game Date:&nbsp;</label>
                            <div class="input-group date form_date elementSize" id='dateFrom' data-date="" data-date-format="mm-dd-yyyy" data-link-field="dtp_input2" data-link-format="yyyy-mm-dd">
                                <input class="form-control" id="input_dateFrom"size="10" type="text" value="" readonly required>
                                <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
                            </div>
                            <label class="label-control  labelWidth2" for="gamesToGradeFilter">Game:&nbsp;</label>
                            <select id="gamesToGradeFilter" name="gamesToGradeFilter" class="form-control" style="width: 300px;">
                                <option value="<?=$otionValue?>"><?=$optionText?></option>
                            </select>
                            <label class="label-control labelWidth2" for="gamePropsActiveFilter">Active&nbsp;</label>
                            <input type="checkbox" class="form-control" id="gamePropsActiveFilter" name="gamePropsActiveFilter"/>

                            <div class="rightButtonsDiv">
                                <button type="button" name="searchGameProps" id="searchGameProps" class="btn btn-info">Get Props</button>
                            </div>
                        </div>
                    </center>
                    <div id="gradeGamePropsTableHeaderContainer" class="center">
                        <table id="gamePropsGradeTableHeader" cellspacing="0" width="100%">
                            <tr>
                                <th class="selectTh">Select</th>
                                <th class="propContestDescTh">Contest Desc.</th>
                                <th class="propTypeTh">Prop Type</th>
                                <th class="contestantsTh">Contestants</th>
                                <th class="pointsTh">Points</th>
                                <th class="ratioTh">Tie Win/Lost ratio</th>
                                <th class="selectTh">Cancel</th>
                                <th class="commentsTh">Comments</th>
                                <th class="fdTh">Fig. Date</th>
                                <th class="gradeButtonTh">Grade</th>
                            </tr>
                        </table>
                    </div>
                    <div id="gradeGamePropsTableContainer" class="center">
                        <table id="propsGradeTable" class="" cellspacing="0" width="100%">
                        </table>
                    </div>
                    <br/>
                    <div class="buttonsDiv">
                        <button type="button" id="gradeMassiveProps" name="gradeMassiveProps" class="btn btn-danger">Grade Games Selected</button>
                    </div>
                </form>
            </div>
            <div class="tab-pane" id="tab2">
                <form id="futurePropGradeFiltersFrm" class="form-inline" action="#" role="form" method="post">
                    <center>
                        <div id="futurePropGradeFilters" class="form-group center">
                            <label for="sportGradeFilter2" class="control-label labelWidth">Sport:</label>
                            <select name="sportGradeFilter2" id="sportGradeFilter2" class="form-control inlineElement ">
                                <option value=""></option>
                                <?php foreach ($sports as $sport) { 
                                    if($sport['Type2']=="Game"){?>
                                    <option value="<?= $sport['SportType'] ?>"><?= $sport['SportType'] ?></option>
                                    <?php
                                    }
                                }
                                ?>
                            </select>
                            <label for="subsportGradeFilter2" class="control-label labelWidth">Sub Sport:</label>
                            <select name="subsportGradeFilter2" id="subsportGradeFilter2" class="form-control inlineElement">
                                <option value=""></option>
                            </select>
                            <label class="label-control labelWidth2" for="gamePropsActiveFilter">Active&nbsp;</label>
                            <input type="checkbox" class="form-control" id="gamePropsActiveFilter" name="gamePropsActiveFilter"/>

                            <div class="rightButtonsDiv">
                                <button type="button" name="searchFutureProps" id="searchFutureProps" class="btn btn-info">Get Props</button>
                            </div>
                        </div>
                    </center>
                    <div id="gradeFutPropsTableHeaderContainer" class="center">
                        <table id="futPropsGradeTableHeader" cellspacing="0" width="100%">
                            <tr>
                                <th class="selectTh">Select</th>
                                <th class="propContestDescTh">Contest Desc.</th>
                                <th class="propTypeTh">Prop Type</th>
                                <th class="contestantsTh">Contestants</th>
                                <th class="pointsTh">Points</th>
                                <th class="ratioTh">Tie Win/Lost ratio</th>
                                <th class="selectTh">Cancel</th>
                                <th class="commentsTh">Comments</th>
                                <th class="fdTh">Fig. Date</th>
                                <th class="gradeButtonTh">Grade</th>
                            </tr>
                        </table>
                    </div>
                    <div id="gradeFutPropsTableContainer" class="center">
                        <table id="futPropsGradeTable" class="" cellspacing="0" width="100%">
                        </table>
                    </div>
                    <br/>
                    <div class="buttonsDiv">
                        <button class="btn btn-danger">Grade Games Selected</button>
                    </div>
                </form>
            </div>
            <div class="tab-pane" id="tab3">
                <form id="gamePropGradeFiltersFrm" class="form-inline" action="#" role="form" method="post">
                    <center>
                        <div id="gamePropGradeFilters" class="form-group center">
                            <label class="label-control  labelWidth2" for="correlationPropGradeFilter">Folder Name:&nbsp;</label>
                            <select id="gradeFPExternalFolderFilter" name="gradeFPExternalFolderFilter" class="form-control" >
                                <option value=""></option>
                                <?php foreach ($sports as $sport) { 
                                    if($sport['Type2']=="Prop"){
                                    ?>
                                    <option value="<?= $sport['SportType'] ?>"><?= $sport['SportType'] ?></option>
                                    <?php
                                    }
                                }
                                ?>
                            </select>
                            <label class="label-control labelWidth2" for="gamePropsActiveFilter">Active&nbsp;</label>
                            <input type="checkbox" class="form-control" id="gamePropsActiveFilter" name="gamePropsActiveFilter"/>

                            <div class="rightButtonsDiv">
                                <button type="button" name="searchExternalProps" id="searchExternalProps" class="btn btn-info">Get Props</button>
                            </div>
                        </div>
                    </center>
                    <div id="gradeExtPropsTableHeaderContainer" class="center">
                        <table id="extPropsGradeTableHeader" cellspacing="0" width="100%">
                            <tr>
                                <th class="selectTh">Select</th>
                                <th class="propContestDescTh">Contest Desc.</th>
                                <th class="propTypeTh">Prop Type</th>
                                <th class="contestantsTh">Contestants</th>
                                <th class="pointsTh">Points</th>
                                <th class="ratioTh">Tie Win/Lost ratio</th>
                                <th class="selectTh">Cancel</th>
                                <th class="commentsTh">Comments</th>
                                <th class="fdTh">Fig. Date</th>
                                <th class="gradeButtonTh">Grade</th>
                            </tr>
                        </table>
                    </div>
                    <div id="gradeExtPropsTableContainer" class="center">
                        <table id="extPropsGradeTable" class="" cellspacing="0" width="100%">
                        </table>
                    </div>
                    <br/>
                    <div class="buttonsDiv">
                        <button class="btn btn-danger">Grade Games Selected</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>