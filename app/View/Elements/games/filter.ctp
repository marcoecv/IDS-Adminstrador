<div id="header">
    <div class="title">
        Games Schedule
    </div>
    <span id="gamesfilter">
        <div style="padding-right: 5px; display: inline-block">
        <?php
        $databaseArray = $this->Session->read("databases".Configure::read("session.id"));
        $databases = split(",", $databaseArray);
        $selectedDB = $this->Session->read("selectedDB".Configure::read("session.id"));
        ?>
        <select class="form-control" name="dataBases" id="dataBases" onchange="$.ajax({url: 'games/setselecteddb/' + $(this).val(), success: function (data) {  location.reload(); 
                        }})">
            <?php
            foreach ($databases as $value) {
                $selected = "";
                if ($selectedDB == $value)
                    $selected = "selected='selected'";
                ?>
                <option value="<?php echo $value ?>" <?php echo $selected ?>><?php echo $value ?></option>
                <?php
            }
            ?>
                <option value="Master" <?php if($selectedDB=="Master"){ echo "selected='selected'";}else{ echo"";} ?>>Master</option>
        </select>
    </div>
<!--        <div class="btn-group">
            <button type="button" class="btn btn-default">
                Sport
            </button>
            <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                <span class="caret"></span>
                <span class="sr-only">Toggle Dropdown</span>
            </button>
            <ul class="dropdown-menu" role="menu" id="sports">
                <?php
                foreach ($sports as $i => $sport) {
                    ?>
                    <li>
                        <input type="checkbox" name="sport" value="<?= $sport['SportType'] ?>" onclick="getScheduleFilterSportsParams(this)">
                        &nbsp;&nbsp;<?= $sport['SportType'] ?></input>
                    </li>
                    <?php
                }
                ?>
            </ul>
        </div>
        <div class="btn-group">
            <button type="button" class="btn btn-default">
                League
            </button>
            <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                <span class="caret"></span>
                <span class="sr-only">Toggle Dropdown</span>
            </button>
            <ul class="dropdown-menu" role="menu" id="leagueGroupD">
            </ul>
        </div>
        <div class="btn-group">
            <button type="button" class="btn btn-default">
                Country
            </button>
            <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                <span class="caret"></span>
                <span class="sr-only">Toggle Dropdown</span>
            </button>
            <ul class="dropdown-menu" role="menu" id="countryGroupD">
            </ul>
        </div>
        <div class="input-group date form_date col-md-5" id='startfilter' data-date="" data-date-format="mm-dd-yyyy" data-link-field="dtp_input2" data-link-format="yyyy-mm-dd">
            <input class="form-control" id="dateFrom" size="16" type="text" value="" readonly onchange="setScheduleDate()">
            <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
        </div>
        <div class="input-group date form_date col-md-5" id='endfilter' data-date="" data-date-format="mm-dd-yyyy" data-link-field="dtp_input2" data-link-format="yyyy-mm-dd">
            <input class="form-control" id="dateTo" size="16" type="text" value="" readonly onchange="setScheduleDate()">
            <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
        </div>
    </span>-->
    
</div>