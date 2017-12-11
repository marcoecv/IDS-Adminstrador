<?php
echo $this -> Html -> css('games');
echo $this -> Html -> script('games/create');
?>
<?php echo $this -> element('maintheader', array("pagename" => "Create Game")); ?>
<?php echo $this -> element('games/confirmationmodal', array("message" => "Game created successfully")); ?>
<form id="gamefrm" action="#" role="form" class="form-inline" method="post">
	<div class="left">
            <div class="inline-form" style="margin-left: 60px;" >
			<label for="sportid" class="control-label">Sport:&nbsp;&nbsp;</label>
                        <select id="sportid" name="sportid" class="form-control validate[required]" onchange="setCorrelationalId()">
				<?php
				foreach($sports as $i => $sport){
				?>
					<option value="<?=$sport['SportType']?>"><?=$sport['SportType']?></option>
				<?php
				}
				?>
			</select>
		</div>
		<div class="inline-form">
			<label for="leagueid" class="control-label">League:&nbsp;&nbsp;</label>
			<select id="leagueid" name="leagueid" class="form-control validate[required]" onchange="setCorrelationalId()">
				<option value=""></option>
			</select>
		</div><br/><br/>
		<div class="inline-form2">
			<label for="scheduleText" class="control-label">Schedule Text:&nbsp;&nbsp;</label>
                        <input type="text" id="scheduleText" size="66" name="scheduleText" class="form-control" onkeyup="upper()"/>
		</div>
		<span class="separator"></span>
		<div class="form-group editor">
			<label for="teamAid" class="control-label">Visitor: </label>
			<div class="input-group rotationDiv">
				<span class="input-group-addon"><b>#</b></span>
				<input type="number" step="1" class="form-control validate[required,custom[integer]]" id="rotANumber" name="rotANumber" min="0" required />
			</div>
			<input type="text" id="teamAid" name="teamAid" class="form-control validate[required]" onkeyup="setCorrelationalId()" />
		</div>
		<div class="form-group editor" id="pitcherDiv1">
			<label for="pitcher1" class="control-label">Pitcher: </label>
			<input type="text" id="pitcher1" name="pitcher1" class="form-control" />
		</div>
		<br />
		<br />
		<div class="form-group editor">
			<label for="teamHid" class="control-label">Home: </label>
			<div class="input-group rotationDiv">
				<span class="input-group-addon"><b>#</b></span>
				<input type="number" step="1" class="form-control validate[required,custom[integer]]" id="rotHNumber" name="rotHNumber" min="0" required/>
			</div>
			<input type="text" id="teamHid" name="teamHid" class="form-control validate[required]" onkeyup="setCorrelationalId()"/>
		</div>
		<div class="form-group editor" id="pitcherDiv2">
			<label for="pitcher2" class="control-label">Pitcher: </label>
			<input type="text" id="pitcher2" name="pitcher2" class="form-control"/>
		</div>
		<br />
		<br />
		<div class="form-group editor" id="drawGroup">
			<label for="drawRotNumber" class="control-label">Draw: </label>
			<div class="input-group rotationDiv">
				<span class="input-group-addon"><b>#</b></span>
				<input type="number" step="1" class="form-control validate[custom[integer]]" id="drawRotNumber" name="drawRotNumber" min="0"/>
			</div>
		</div>

		<span class="separator"></span>
		<label for="broadcastid" class="control-label">Broadcast: </label>
		<input type="text" id="broadcastid" name="broadcastid" class="form-control"/>
		<br />
		<br />
		<label for="comments" class="control-label">Comments: </label>
		<textarea id="comments" name="comments" class="form-control" rows="3"></textarea>
	</div>
	<div class="right">
		<label for="gamedate" class="control-label">Game Date: </label>
		<div class="input-group date form_date col-md-5" id='gamedate' data-date="" data-date-format="mm-dd-yyyy" data-link-field="dtp_input2" data-link-format="yyyy-mm-dd">
                    <input id="gamedateval" name="gamedateval" class="form-control validate[required]" size="16" type="text" value="" readonly onchange="setCorrelationalId()">
			<span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
		</div>
		<br />
		<br />
		<label for="gametime" class="control-label">Game Time: </label>
		<div class="input-group date form_time col-md-5" id="gametime" data-date="" data-date-format="hh:ii" data-link-field="dtp_input3" data-link-format="hh:ii">
                    <input id="gametimeval" name="gametimeval" class="form-control validate[required]" size="16" type="text" value="" readonly>
			<span class="input-group-addon"><span class="glyphicon glyphicon-time"></span></span>
		</div>
		<br />
		<br />
		<label for="wagercutoff" class="control-label">Wager Cutoff: </label>
		<div class="input-group date form_time col-md-5" id="wagercutoff" data-date="" data-date-format="hh:ii" data-link-field="dtp_input3" data-link-format="hh:ii">
			<input id="wagercutoffval" name="wagercutoffval" class="form-control" size="16" type="text" value="">
			<span class="input-group-addon"><span class="glyphicon glyphicon-time"></span></span>
		</div>
		<span class="separator"></span>
		<span class="preventbuying">
			<input type="checkbox" id="preventbuying" name="preventbuying">
			Prevent buying points
			</input> </span>
		<fieldset class="fieldset-restrictions">
			<legend class="legend-fieldset-restrictions">
				Parlay's, If's & Teaser's
			</legend>
			<div>
				<input type="radio" id="allow" name="restrictions" value="A">
				Allow
				</input>
				<br />
				<input type="radio" id="same" name="restrictions" checked="checked" value="S">
				Deny Same Game
				</input>
				<br />
				<input type="radio" id="deny" name="restrictions" value="D">
				Deny All
				</input>
				<br />
			</div>
		</fieldset>
		<span class="separator"></span>
		<label for="correlationid" class="control-label">CorrelationID: </label>
                <input type="text" id="correlationid" name="correlationid" readonly class="form-control validate[required,maxSize[40]]" />

	</div>
</form>