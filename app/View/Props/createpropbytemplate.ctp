<?php
echo $this->Html->css('props');
echo $this->Html->script('props/createpropbytemplate');
?>
<?php echo $this->element('maintheader', array("pagename" => "Create Props")); ?>
<?php echo $this->element('defaultmsgmodal'); ?>
<div class="mainConteiner center">
    <form id="gamesSeleccion" action="propinsertionorder"role="form" class="form-inline" method="post">
        <div id="gameFilters" class="form-group bordered-div">
            <label for="input_dateFrom" class="control-label labelWidth">From: </label>
            <div class="input-group date form_date elementSize" id='dateFrom' data-date="" data-date-format="mm-dd-yyyy" data-link-field="dtp_input2" data-link-format="yyyy-mm-dd">
                <input class="form-control" id="input_dateFrom"size="16" type="text" value="" readonly required>
                <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
            </div>
            <label for="input_dateTo" class="control-label labelWidth">To: </label>
            <div class="input-group date form_date inlineElement elementSize" id='dateTo' data-date="" data-date-format="mm-dd-yyyy" data-link-field="dtp_input2" data-link-format="yyyy-mm-dd">
                <input class="form-control" id="input_dateTo"size="16" type="text" value="" readonly required>
                <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
            </div>
            <label for="sporttype" class="control-label labelWidth">Sport:</label>
            <select name="sporttype" id="sporttype" class="form-control inlineElement elementSize">
                <option value=""></option>
            </select>
            <label for="subsporttype" class="control-label labelWidth">Sub Sport:</label>
            <select name="subsporttype" id="subsporttype" class="form-control inlineElement elementSize">
                <option value=""></option>
            </select>
            <label class="label-control labelWidth" for="gameProps">Game</label>
            <input class="" type="radio" name="propType" id="gameProps" value="G"/>
            <label class="label-control labelWidth" for="playerProps">Player</label>
            <input class="" type="radio" name="propType" id="playerProps" value="P"/>
            <div class="rightButtonsDiv">
                <button class="btn btn-info" name="getGamesButton" id="getGamesButton">Games List</button>
                <button class="btn btn-success" name="sendPlayerPropList" onclick="return validateGamesAndTemplates()" id="sendPlayerPropList" disabled="disabled">Send</button>
            </div>
            
        </div>
        <br/> <br/>
        <div id="tableContainer" class="center">
            <table id="gamesTable" class="cell-border hover gameSelectionTable" cellspacing="0" width="100%">
                <thead>
                    <tr>
                        <th>
                <center><input type="checkbox" class="form-control" name="selectAll" id="selectAll"/></center> 
                </th>
                <th>
                    Visitor
                </th>
                <th>
                    Home
                </th>
                <th>
                    Date (Time)
                    <span class="searchSpan" style="float:right">Search:&nbsp;<input style="color: black"type="text" id="searchGamesTable"/></span>
                </th>
                </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
            <div id="tablesContainer">
                <div id="left">
                    <center>
                        <h3>Spread</h3>
                    </center>
                    <table id="spreadPropTable"class="cell-border hover playerPropListTable" cellspacing="0" width="100%">
                        <thead>
                            <tr>
                                <th colspan="2">
                                    <span class="searchSpan">Search:&nbsp;<input style="color: black"type="text" id="searchSpreadTable"/></span>
                                </th>
                            </tr>
                            <tr>
                                <th>
                                    <center>
                                        <input type="checkbox" name="spreadSelectAll" id="spreadSelectAll"class="form-control"/>
                                    </center>
                                </th>
                                <th>
                                    Prop Name
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
                <div id="center">
                    <center>
                        <h3>Money Line</h3>
                    </center>
                    <table id="moneyLinePropTable"class="cell-border hover playerPropListTable" cellspacing="0" width="100%">
                        <thead>
                            <tr>
                                <th colspan="2">
                                    <span class="searchSpan">Search:&nbsp;<input style="color: black"type="text" id="searchMoneLineTable"/></span>
                                </th>
                            </tr>
                            <tr>
                                <th>
                                    <center>
                                        <input type="checkbox" name="moneylineSelectAll" id="moneylineSelectAll"class="form-control">
                                    </center>
                                </th>
                                <th>
                                    Prop Name
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
                <div id="right">
                    <center>
                        <h3>Total</h3>
                    </center>
                    <table id="totalPropTable"class="cell-border hover playerPropListTable" cellspacing="0" width="100%">
                        <thead>
                            <tr>
                                <th colspan="2">
                                    <span class="searchSpan">Search:&nbsp;<input style="color: black"type="text" id="searchTotalTable"/></span>
                                </th>
                            </tr>
                            <tr>
                                <th>
                                    <center>
                                        <input type="checkbox" name="totalSelectAll" id="totalSelectAll" class="form-control"/>
                                    </center>
                                </th>
                                <th>
                                    Prop Name
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
                <input type="hidden" name="propsToCreate" id="propsToCreate" value=""/>
            </div>
        </div>
    </form>
</div>