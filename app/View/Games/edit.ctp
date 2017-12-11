<?php
echo $this -> Html -> css('games');
echo $this -> Html -> script('games/edit');
?>
<?php echo $this -> element('maintheader', array("pagename" => "Modify Game")); ?>
<?php echo $this -> element('confirmationmodal', array("message" => "Game updated successfully")); ?>
<form id="gameEditfrm" action="#" role="form" class="form-inline" method="post">
	<div class="left">
		<div class="inline-form">
			<label for="sportid" class="control-label">Sport:&nbsp;&nbsp;</label>
                        <input type="text" id="sportid" name="sportid" class="form-control" value="<?=$game->row1->SportType?>" readonly />
		</div>
		<div class="inline-form">
			<label for="leagueid" class="control-label">League:&nbsp;&nbsp;</label>
			<input type="text" id="leagueid" name="leagueid" class="form-control" value="<?=$game->row1->SportSubType?>" readonly/>
		</div>
		<div class="inline-form">
			<label for="countryid" class="control-label">Country:&nbsp;&nbsp;</label>
			<input type="text" id="countryid" name="countryid" class="form-control" value="<?=$game->row1->ScheduleText?>" readonly/>
		</div>
		<span class="separator"></span>
		<label for="teamAid" class="control-label">Visitor: </label>
		<div class="input-group rotationDiv">
  			<span class="input-group-addon"><b>#</b></span>
  			<input type="number" step="1" class="form-control" id="rotANumber" value="<?=$game->row1->Team1RotNum?>" name="rotANumber" readonly/>
		</div>
        <input id="teamAid" name="teamAid" value="<?=$game->row1->Team1ID?>" class="form-control" disabled="disabled"/>
		<br />
		<br />
		<label for="teamHid" class="control-label">Home: </label>
		<div class="input-group rotationDiv">
  			<span class="input-group-addon"><b>#</b></span>
  			<input type="number" step="1" class="form-control" value="<?=$game->row1->Team2RotNum?>" id="rotHNumber" name="rotHNumber" readonly/>
		</div>
		<input id="teamHid" name="teamAid" value="<?=$game->row1->Team2ID?>" class="form-control" readonly/>
                
		<span class="separator"></span>
		<label for="broadcastid"  class="control-label">Broadcast: </label>
		<input type="text" id="broadcastid" value="<?=$game->row1->BroadcastInfo?>" name="broadcastid" class="form-control" />
		<br />
		<br />
		<label for="comments" class="control-label">Comments: </label>
		<textarea id="comments" name="comments" class="form-control" rows="3"><?=$game->row1->Comments?></textarea>
	</div>
	<div class="right">
		<label for="gamedate" class="control-label">Game Date: </label>
		<div class="input-group date form_date col-md-5" id='gamedate' data-date="" data-date-format="mm-dd-yyyy" data-link-field="dtp_input2" data-link-format="yyyy-mm-dd">
                    <input class="form-control validate[required]" name="gamedateval" id="gamedateval" size="16" type="text" value="<?=$gameDate?>" readonly required>
			<span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
		</div>
		<br />
		<br />
		<label for="gametime" class="control-label">Game Time: </label>
		<div class="input-group date form_time col-md-5" id="gametime" data-date="" data-date-format="hh:ii" data-link-field="dtp_input3" data-link-format="hh:ii">
                    <input class="form-control validate[required]" name="gametimeval" id="gametimeval" size="16" type="text" value="<?=$gameTime?>" readonly required>
			<span class="input-group-addon"><span class="glyphicon glyphicon-time"></span></span>
		</div>
		<br />
		<br />
		<label for="wagercutoff" class="control-label">Wager Cutoff: </label>
		<div class="input-group date form_time col-md-5" id="wagercutoff" data-date="" data-date-format="hh:ii" data-link-field="dtp_input3" data-link-format="hh:ii">
                    <input class="form-control" size="16" name="wagercutoffval" id="wagercutoffval" type="text" value="<?=$wagerCutoff?>" readonly required>
			<span class="input-group-addon"><span class="glyphicon glyphicon-time"></span></span>
		</div>
		<span class="separator"></span>
		<span class="preventbuying">
			<input type="checkbox" id="preventbuying" name="preventbuying" <?=$game->row1->PreventPointBuyingFlag === 'Y'? 'checked="checked"' : ''?>>
			Prevent buying points
			</input>
		</span>
		<fieldset class="fieldset-restrictions">
			<legend class="legend-fieldset-restrictions">
				Parlay's, If's & Teaser's
			</legend>
			<div>
				<input type="radio" id="allow" name="restrictions" value="A" <?=$game->row1->ParlayRestriction === 'A'? 'checked="checked"' : ''?>>
				Allow
				</input>
				<br />
				<input type="radio" id="same" name="restrictions"  value="S" <?=$game->row1->ParlayRestriction === 'S'? 'checked="checked"' : ''?>>
				Deny Same Game
				</input>
				<br />
				<input type="radio" id="deny" name="restrictions" value="D" <?=$game->row1->ParlayRestriction === 'D'? 'checked="checked"' : ''?>>
				Deny All
				</input>
				<br />
			</div>
		</fieldset>
		<span class="separator"></span>
		<label for="correlationid" class="control-label">CorrelationID: </label>
		<input id="correlationid" name="correlationid'"readonly class="form-control" value="<?=$game->row1->CorrelationID?>" />
                <input type="hidden" value="<?=$idGame?>" name="idGame" id="idGame"/>
	</div>
</form>
