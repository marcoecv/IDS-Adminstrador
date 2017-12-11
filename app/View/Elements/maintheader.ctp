<div id="header">
	<div class="title"><?=$pagename?></div>      
        <div style="float: right;padding-right: 100px; display: inline-block;">
            
            <?php 
                $databaseArray=  $this->Session->read("databases".Configure::read("session.id"));
                $databases=split(",", $databaseArray);
                $selectedDB=$this->Session->read("selectedDB".Configure::read("session.id"));
                ?>
            <select class="form-control" name="dataBases" id="dataBases" onchange="$.ajax({url: '../games/setselecteddb/'+$(this).val(),success: function (data) { location.reload(); }})">
                <?php 
                        foreach ($databases as $value) {
                            $selected="";
                            if($selectedDB==$value)
                                $selected="selected='selected'";
                            ?>
                            <option value="<?php echo $value?>" <?php echo $selected ?>><?php echo $value?></option>
                        <?php
                        }
                ?>
                    <option value="Master" <?php if($selectedDB=="Master"){ echo "selected='selected'";}else{ echo"";} ?>>Master</option>
            </select>
        </div>
</div>