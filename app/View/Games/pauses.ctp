<?php
echo $this->Html->css('games');
echo $this->Html->script('games/pauses');
?>
<div id="header" class="col-md-12">
    <div class="title col-sm-2">Pauses</div>
<?php
    foreach ($dbs as $db){?>
    <div class="col-sm-2">
        <div class="col-sm-6">
            <label class="control-label" for=""><?=$db?></label>
        </div>
        <div class="col-sm-6">
            <input type="checkbox" class="ps_db" checked value="<?=$db?>"/>
        </div>
    </div>
<?php    
    }
?>
    
    <div style="float: right;padding-right: 100px; display: inline-block;"></div>
</div>
<div class="col-md-12">
    <div id="ps_tableHeaderDiv" class="col-md-12">
        <div class="col-sm-2">
            <label class="control-label">Sport</label>
            <select class="form-control" id="ps_sport">
                <option value=""></option>
                <?php
                foreach ($sports as $sport) {
                    if ($sport["Type2"] == "Game") {
                        ?>
                        <option value="<?= $sport["SportType"] ?>"><?= $sport["SportType"] ?></option>
                        <?php
                    }
                }
                ?>
            </select>
        </div>
        <div class="col-sm-2">
            <label class="control-label">Sub Sport</label>
            <select class="form-control" id="ps_subSport"></select>
        </div>
        <div class="col-sm-2">
            <label class="control-label">Game</label>
            <input type="text" class="form-control" id="ps_rot"/>
        </div>
        <div class="col-sm-2">
            <label class="control-label">Period</label>
            <select class="form-control" id="ps_period">
                <option value="">All</option>
                <option value="0">Game</option>
                <option value="1">1st Half</option>
                <option value="2">2nd Half</option>
                <option value="3">1st Quarter</option>
                <option value="4">2nd Quarter</option>
                <option value="5">3rd Quarter</option>
                <option value="6">4th Quarter</option>
            </select>
        </div>
        <div class="col-sm-2">
            <label class="control-label">LineType</label>
            <select class="form-control" id="ps_lineType">
                <option value="">All</option>
                <option value="S">Spread</option>
                <option value="M">Money Line</option>
                <option value="T">Total</option>
                <option value="L">Team Total</option>
            </select>
        </div>
        <div class="col-sm-2" style="line-height: 80px;text-align: center">
            <button id="b_setPause" type="button" class="btn btn-success">Confirm</button>
        </div>
    </div>
    <div id="psTableDiv" class="col-md-12">
        <table class="table table-striped" id="ps_tableHeader">
            <?php foreach ($pauses as $value) { ?>
                <tr>
                    <td class="col-sm-2 tdStyle">
                        <span><?= $value["SportType"] ?></span>
                    </td>
                    <td class="col-sm-2 tdStyle">
                        <span><?= $value["SportSubType"] ?></span>
                    </td>
                    <td class="col-sm-2 tdStyle">
                        <span><?= $value["RotNum"] ?></span>
                    </td>
                    <td class="col-sm-2 tdStyle">
                        <span><?= ($value["Period"]!=null?$periods[$value["Period"]]:"") ?></span>
                    </td>
                    <td class="col-sm-2 tdStyle">
                        <span><?= ($value["LineType"]!=null?$lineTypes[$value["LineType"]]:"") ?></span>
                    <td class="col-sm-2 tdStyle">
                        <button id="b_deletePause" type="button" class="btn btn-danger" onclick="actionPause('<?=$value["RotNum"]?>','<?=$value["SportType"]?>','<?=$value["SportSubType"]?>','<?=$value["Period"]?>','<?=$value["LineType"]?>',0)"><i class="glyphicon glyphicon-trash"></i></button>
                    </td>
                </tr>
                <?php
            }
            ?>
        </table>
    </div>
</div>
