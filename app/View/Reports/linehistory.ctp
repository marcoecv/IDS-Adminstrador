<?php
echo $this->Html->css('reports');
echo $this->Html->script('reports/linehistory');
?>
<?php echo $this->element('maintheader', array("pagename" => "Line History")); ?>
<?php echo $this->element('loadingajaxcallmodal'); ?>
<?php echo $this->element('defaultmsgmodal'); ?>
<div id="mainConteiner" class="center">
    <form id="lineHistoryFrm" action="#" role="form" class="form-horizontal">
        <div id="headerDiv" class="center">
            <div class="selectDiv">
                <div class="marginStyle">
                    <label class="labelWidth">Store: </label>
                    <select class="form-control selectStyle" name="store" id="store" onchange="">
                        <option></option>
                        <?php foreach ($stores as $store) { ?>
                            <option value="<?php echo $store['Store'] ?>"><?php echo $store['Store'] ?></option>
                            <?php
                        }
                        ?>
                    </select>
                </div>
                <div class="marginStyle">
                    <label class="labelWidth">Contestant: </label>
                    <select class="form-control selectStyle" name="store" id="store" onchange="">
                        <option></option>
                        <option value="1">Contestant 1</option>
                        <option value="2">Contestant 2</option>
                        <option value="3">Contestant 3</option>
                        <?php //foreach ($stores as $store) { ?>
                            <!--<option value="<?php //echo $store['Store']     ?>"><?php //echo $store['Store']     ?></option>-->
                        <?php
                        //}
                        ?>
                    </select>
                </div>
                <div class="bordered-div2"></div>
            </div>
            <div id="rightDiv"class="bordered-div">
                <input type="radio" name="view" id="lhView"/><label for="lhView" class="label-control">&nbsp;&nbsp;Line History View</label><br/><br/>
                <input type="radio" name="view" id="wlView"/><label for="wlView" class="label-control">&nbsp;&nbsp;Wager List View</label>
            </div>



        </div>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/>
        <div class="wraplinehistory center">
            <table id="linehistoryTable">
                <tr>
                    <td>Date / Time</td>
                    <td>Contestant</td>
                    <td>New Line</td>
                    <td>Risk $</td>
                    <td>Wager Count</td>
                </tr>
            </table>
        </div>
        <div class="inner_LineHistoryTable center" >
            <table id="linehistoryTableBody">
                <tr>
                    <td>01/01/2015</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td> 
                </tr>
                <tr>
                    <td>01/01/2015</td>
                    <td>2</td>
                    <td>2</td>
                    <td>2</td>
                    <td>2</td> 
                </tr>
                <tr>
                    <td>01/01/2015</td>
                    <td>3</td>
                    <td>3</td>
                    <td>3</td>
                    <td>3</td> 
                </tr>
                <tr>
                    <td>01/01/2015</td>
                    <td>4</td>
                    <td>4</td>
                    <td>4</td>
                    <td>4</td> 
                </tr>
                <tr>
                    <td>01/01/2015</td>
                    <td>5</td>
                    <td>5</td>
                    <td>5</td>
                    <td>5</td> 
                </tr>
                <tr>
                    <td>01/01/2015</td>
                    <td>6</td>
                    <td>6</td>
                    <td>6</td>
                    <td>6</td> 
                </tr>
            </table>
        </div>
    </form>
</div>