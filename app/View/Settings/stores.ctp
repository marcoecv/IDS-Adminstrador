<?php
echo $this->Html->css('settings');
echo $this->Html->script('settings/stores');
?>
<?php echo $this->element('maintheader', array("pagename" => "Store Maintenance")); ?>
<?php echo $this->element('settings/sportmaintenance'); ?>
<?php echo $this->element('settings/sportsubtypemaintenance'); ?>
<?php echo $this->element('settings/storeseditmodal'); ?>
<?php echo $this->element('loadingajaxcallmodal'); ?>
<?php echo $this->element('defaultmsgmodal'); ?>
<div id="mainConteinerStore" class="center">
    <form id="storeFrm" action="#" role="form" class="">
        <div class="headerDiv center">
            <div class="leftFloat row">
                <div  class="col-lg-7">
                    <label class="label-control" >Store:</label>
                <select class="form-control selectStores" name="store" id="store" onchange="showStoreLines()">
                    <option></option>
                    <?php foreach ($stores as $store) { ?>
                        <option value="<?php echo $store['Store'] ?>"><?php echo $store['Store'] ?></option>
                        <?php
                    }
                    ?>            
                </select>
                    
                </div>
                <div class="input-group col-lg-4">
                    <span class="input-group-addon">
                        <input id="followMaster" type="checkbox" name="followMaster" class="cheked bloquear" value="" >
                    </span>
                    <input class="form-control" type="text"  style="width: 170px"readonly="" value="Follow Master Store"  >
                </div>

            </div>
            <div class="rightFloat">
                <button class="btn btn-info"type="button" name="addStore" id="addStore">Add</button>
                <button class="btn btn-info"type="button" name="deleteStore" id="deleteStore">Remove</button>

            </div>
        </div>
        <br/><br/>
        <div class="headerDiv center">
                <label class="control-label">Description: &nbsp;<span id="description"></span></label>
                <div id="textField" class="inlineDiv2">&nbsp;</div>
                <a href="#" id="editDescription" class="inlineDiv2" onclick="return false"><i class="glyphicon glyphicon-pencil"></i></a>
                <a href="#" id="confirmEdit" class="inlineDiv2" style="display: none" onclick="return false"><i class="glyphicon glyphicon-ok"></i></a>
        </div>
        <br/><br/>
        <div class="wrapStore center">
            <table id="storesTable">
                <tr>
                    <td>Sport</td>
                    <td>Sub Type</td>
                    <td>Period</td>
                    <td>Wager Type</td>
                    <td>Line Type</td>
                    <td>CU Max Bet</td>
                    <td>Inet Max Bet</td>
                    <td>Dflt Circled</td>
                </tr>
            </table>
        </div>
        <div class="inner_tableStore center">
            <table id="storesTableBody">

            </table>
        </div>
    </form>
</div>