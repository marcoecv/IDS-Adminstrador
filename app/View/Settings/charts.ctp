<?php
echo $this->Html->css('settings');
echo $this->Html->script('settings/charts');
?>
<?php echo $this->element('maintheader', array("pagename" => "Chart Maintenance")); ?>
<?php echo $this->element('settings/chartlinemodal'); ?>
<?php echo $this->element('settings/linetypemodal'); ?>
<?php echo $this->element('loadingajaxcallmodal'); ?>
<?php echo $this->element('defaultmsgmodal'); ?>
<div  id="mainConteiner" class="center">
    <form id="chartsFrm" action="#" role="form" class="form-horizontal">
        <div id="headerDiv">
            <div id="chartBordered">
                <label class="label-control">Line Type: </label>
                <select style="width: 150px" name="lineType" id="lineType" onchange="getChartLines(this.value)">
                    <option></option>
                    <?php foreach ($lineTypes as $lineType) { ?>
                        <option value="<?php echo $lineType['LineType'] ?>"><?php echo $lineType['LineType'] ?></option>
                        <?php
                    }
                    ?>
                </select>
            </div>
            <button class="btn btn-info"type="button" name="addLineType" id="addLineType">New</button>
            <button class="btn btn-info"type="button" name="deleteLineType" id="deleteLineType">Delete</button>
            <div class="inlineDiv">&nbsp;</div>
            <button  class="btn btn-info"type="button" name="addNewLine" id="addNewLine">Add New Line</button>
            <button  class="btn btn-info"type="button" name="deleteLine" id="deleteLine">Remove Line</button>
            <button  class="btn btn-info"type="button" name="addLineEnd" id="addLineEnd">Add Line End</button>
        </div>
        <br/><br/>
        <div class="wrap center">
            <table id="storesTable">
                <tr>
                    <td class="halfColumn">Select</td>
                    <td>Starting Price</td>
                    <td>Ending Price</td>
                    <td>Difference in Cents</td>
                </tr>
            </table>
        </div>
        <div class="inner_table center" >
            <table id="storesTableBody">

            </table>
        </div>
    </form>
</div>