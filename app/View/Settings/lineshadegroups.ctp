<?php
echo $this->Html->css('settings');
echo $this->Html->script('settings/lineshadegroups');
?>
<?php echo $this->element('maintheader', array("pagename" => "Line Shade Groups")); ?>
<?php echo $this->element("settings/shadegroupsmodal"); ?>
<?php echo $this->element('loadingajaxcallmodal'); ?>
<?php echo $this->element('defaultmsgmodal'); ?>

<div id="lineShadeMainContainer" class="center">
    <form id="lineShadeGroupsFrm" action="#" role="form" class="form-horizontal">
        <div class="leftFloat bordered-div">
            <label class="label-control">Profiles</label><br/><br/>
            <label class="label-control" fo >Store:</label>
            <select class="form-control selectWidth inlineDiv2" name="store" id="store">
                <option></option>
                <?php foreach ($stores as $store) { ?>
                    <option value="<?php echo $store['Store'] ?>"><?php echo $store['Store'] ?></option>
                    <?php
                }
                ?>            
            </select>
            <br/><br/><br/>
            <table id="1s"class="cell-border hover lineShadeTable" cellspacing="0" width="100%">
                <thead>
                    <tr>
                        <th>
                            Contestant
                            <span class="searchSpan">Search:&nbsp;<input style="color: black"type="text" id="searchTable1"/></span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            ...000 World Series
                        </td>
                    </tr>
                    <tr>
                        <td>
                            .000 Black Sun Night
                        </td>
                    </tr>
                    <tr>
                        <td>
                            .01 BK SUCKER
                        </td>
                    </tr>
                    <tr>
                        <td>
                            .02 NO LIVE BETING
                        </td>
                    </tr>
                    <tr>
                        <td>
                            ...000 World Series
                        </td>
                    </tr>
                    <tr>
                        <td>
                            .000 Black Sun Night
                        </td>
                    </tr>
                    <tr>
                        <td>
                            .01 BK SUCKER
                        </td>
                    </tr>
                    <tr>
                        <td>
                            .02 NO LIVE BETING
                        </td>
                    </tr>
                    <tr>
                        <td>
                            ...000 World Series
                        </td>
                    </tr>
                    <tr>
                        <td>
                            .000 Black Sun Night
                        </td>
                    </tr>
                    <tr>
                        <td>
                            .01 BK SUCKER
                        </td>
                    </tr>
                    <tr>
                        <td>
                            .02 NO LIVE BETING
                        </td>
                    </tr>
                    <tr>
                        <td>
                            ...000 World Series
                        </td>
                    </tr>
                    <tr>
                        <td>
                            .000 Black Sun Night
                        </td>
                    </tr>
                    <tr>
                        <td>
                            .01 BK SUCKER
                        </td>
                    </tr>
                    <tr>
                        <td>
                            .02 NO LIVE BETING
                        </td>
                    </tr>
                    <tr>
                        <td>
                            ...000 World Series
                        </td>
                    </tr>
                    <tr>
                        <td>
                            .000 Black Sun Night
                        </td>
                    </tr>
                    <tr>
                        <td>
                            .01 BK SUCKER
                        </td>
                    </tr>
                    <tr>
                        <td>
                            .02 NO LIVE BETING
                        </td>
                    </tr>
                    <tr>
                        <td>
                            ...000 World Series
                        </td>
                    </tr>
                    <tr>
                        <td>
                            .000 Black Sun Night
                        </td>
                    </tr>
                    <tr>
                        <td>
                            .01 BK SUCKER
                        </td>
                    </tr>
                    <tr>
                        <td>
                            .02 NO LIVE BETING
                        </td>
                    </tr>
                </tbody>
            </table>
            <br/>
            <div class="bordered-div2">
                <span id="shadeInfo">Shade Group Information</span>
            </div>
            <br/>
            <center>
                <input type="button" class="btn btn-default" name="newShade" id="newShade" value="New"/>
                <input type="button" class="btn btn-default" name="editShade" id="editShade" value="Edit"/>
                <input type="button" class="btn btn-default" name="deleteShade" id="deleteShade" value="Delete"/>
            </center>
        </div>
        <div class="rightFloat">
            <br/><br/><br/>
            <div id="displayProfileMembersDiv">
                <input type="checkbox" name="displayProfileMembers" id="displayProfileMembers"/><label for="displayProfileMembers" class="label-control">Display Profile Members Only</label>
            </div>
            <br/><br/>
            <table id="2s" class="cell-border hover lineShadeTable" cellspacing="0" width="100%">
                <thead>
                    <tr>
                        <th>&nbsp;</th>
                        <th>Customer ID</th>
                        <th>Agent
                            <span class="searchSpan">Search:&nbsp;<input style="color: black"type="text" id="searchTable2"/></span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input type="checkbox"/></td>
                        <td>Customer ID</td>
                        <td>Name</td>
                    </tr>
                    <tr>
                        <td><input type="checkbox"/></td>
                        <td>Customer ID</td>
                        <td>Name</td>
                    </tr>
                    <tr>
                        <td><input type="checkbox"/></td>
                        <td>Customer ID</td>
                        <td>Name</td>
                    </tr>
                    <tr>
                        <td><input type="checkbox"/></td>
                        <td>Customer ID</td>
                        <td>Name</td>
                    </tr>
                    <tr>
                        <td><input type="checkbox"/></td>
                        <td>Customer ID</td>
                        <td>Name</td>
                    </tr>
                    <tr>
                        <td><input type="checkbox"/></td>
                        <td>Customer ID</td>
                        <td>Name</td>
                    </tr>
                    <tr>
                        <td><input type="checkbox"/></td>
                        <td>Customer ID</td>
                        <td>Name</td>
                    </tr>
                    <tr>
                        <td><input type="checkbox"/></td>
                        <td>Customer ID</td>
                        <td>Name</td>
                    </tr>
                    <tr>
                        <td><input type="checkbox"/></td>
                        <td>Customer ID</td>
                        <td>Name</td>
                    </tr>
                    <tr>
                        <td><input type="checkbox"/></td>
                        <td>Customer ID</td>
                        <td>Name</td>
                    </tr>
                    <tr>
                        <td><input type="checkbox"/></td>
                        <td>Customer ID</td>
                        <td>Name</td>
                    </tr>
                    <tr>
                        <td><input type="checkbox"/></td>
                        <td>Customer ID</td>
                        <td>Name</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </form>
</div>