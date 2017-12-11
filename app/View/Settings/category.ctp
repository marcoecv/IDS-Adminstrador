<?php
echo $this->Html->css('settings'); 
echo $this->Html->script('settings/category');
?>
<?php echo $this->element('maintheader', array("pagename" => "Category Maintenance")); ?>
<?php echo $this->element('settings/sportmaintenance'); ?>
<?php echo $this->element('settings/sportsubtypemaintenance'); ?>
<?php echo $this->element('confirmationmodal', array("message" => "Changes updated succesfully")); ?>
<form id="categoryfrm" action="#" role="form" class="form-horizontal">
    <div class="left">
        <label for="sportid" class="adminTitle">Sport:</label>
        
        <div class="bordercontrol">
        	<table class="optionTable">
        		<tbody>
            		<?php foreach ($sports as $sport) { ?>
            			<tr>
            				<td style="width: 40px; text-align: center;">
            					<input type="radio" class="sportsRadio" id="<?php echo trim($sport['SportType'] )?>" name="sportid" onclick="loadLeagues(this,'<?php echo $sport['DrawFlag']?>')" value="<?php echo trim($sport['SportType']) ?>" />
            				</td>
            				<td>
            					<?php echo trim($sport['SportType']) ?>
            				</td>
            			</tr>
					<?php
					}
            		?>
            	</tbody>
            </table>
        </div>
    </div>
    <div class="middle">
        <label for="subsportid" class="adminTitle">Sport Subtype:
        	<span class="glyphicon glyphicon-plus addSport"></span>
        	<span class="glyphicon glyphicon-minus addSport"></span>
        </label>
        <div class="bordercontrol">
			<table class="optionTable">
        		<tbody>
        		</tbody>
        	</table>
        </div>
    </div>
    <div class="right">
        <label for="subsportid" class="adminTitle">Periods:&nbsp;&nbsp;
        	<span class="rightcontrol">
            	<input type="checkbox" id="drawallowed" name="drawallowed">&nbsp;&nbsp;Draw</input>
        	</span>
        </label>
        <div class="bordercontrol">
        	<table class="optionTable">
        		<tbody>
            	<?php 
                foreach ($periods as $period) {?>
                	<tr>
                		<td style="width: 40px; text-align: center;">
                			<input type="radio" value="<?php echo trim($period['PeriodType'])?>" id="<?php echo trim($period['PeriodType'])?>" name="periods"/>
                		</td>
                		<td>
                			<?php echo trim($period['PeriodType'])?>
                		</td>
                	</tr>
            		<?php
               	}
            	?>
            	</tbody>
            </table>
        </div>
    </div>
</form>

