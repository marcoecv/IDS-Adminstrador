<?php
echo $this->Html->css('games');
echo $this->Html->script('games/delete');
?>
<?php echo $this->element('maintheader', array("pagename" => "Delete Game")); ?>
<?php echo $this->element('confirmationmodal', array("message" => "Game deleted successfully")); ?>
<br />
<br />
<form id="gamefrm" action="#" role="form" class="form-horizontal" method="post">
    <div class="form-group" >
        <label for="gamedateval" class="control-label">Game Date: </label>
        <div class="input-group date form_date col-md-5" id='gamedate' data-date="" data-date-format="mm-dd-yyyy" data-link-field="dtp_input2" data-link-format="yyyy-mm-dd">
            <input id="gamedateval" name="gamedateval" class="form-control validate[required]" style="width: 200px" type="text" value="" readonly>
            <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
        </div>
    </div>
    <div class="form-group" > 
        <label for="gametime" class="control-label">Game Time: </label>
        <div class="input-group date form_time col-md-5" id="gametime" data-date="" data-date-format="hh:ii" data-link-field="dtp_input3" data-link-format="hh:ii">
            <input id="gametimeval" name="gametimeval" class="form-control validate[required]" style="width: 200px" type="text" value="" readonly>
                <span class="input-group-addon"><span class="glyphicon glyphicon-time"></span></span>
        </div>
    </div>
    <div class="form-group">
        <label for="rotANumber" class="label-control">Rot A: </label>
        <input type="text" <?= $disabled ?> name="rotANumber" class="form-control validate[required,custom[integer]]" size="6" id="rotANumber" value="<?= $rotANumber ?>"/><br/>
    </div>
    <div class="form-group">    
        <label for="rotHNumber" class="label-control">Rot H: </label>
        <input type="text" name="rotHNumber" size="6" class="form-control" readonly id="rotHNumber"/>
    </div>
    <div class="form-group">
        <label for="correlationid" class="control-label">Correlation ID:</label>
        <input type="text" id="correlationid" readonly style="width: 400px" class="form-control" name="correlationid"/>
    </div>
</form>
<!--BEGIN MODAL FADE-->
<div class="modal fade" id="deleteGameModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="myModalLabel">Delete Games</h4>
            </div>
            <div class="modal-body">
                Do you really wants to delete this game?
            </div>
            <div class="modal-footer">
                <button id="cancelDelete" name="cancelCreate"
                        type="button" class="btn btn-danger" data-dismiss="modal">
                    No
                </button>
                <button id="confirmDelete" name="saveCreate" type="button" class="btn btn-success">
                    Yes
                </button>
            </div>
        </div>
    </div>
</div>
<!--END MODAL FADE-->