<?php

$cakeDescription = __d('cake_dev', 'Administrator BookMarkersInc');
$cakeVersion = __d('cake_dev', 'CakePHP %s', Configure::version())
?>
<!DOCTYPE html>
<html>
    <head>
	<?php echo $this->Html->charset(); ?>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">	
        <title>
		<?php echo $cakeDescription ?>:
		<?php echo $title_for_layout; ?>
        </title>
	<?php
		echo $this->Html->meta('icon');		
                echo $this->Html->css('bootstrap/bootstrap-themes');
		echo $this->Html->css('bootstrap.min');
		echo $this->Html->css('bootstrap-theme.min');
		echo $this->Html->css('jquery.dataTables.min');
		echo $this->Html->css('plugins/style.jstree.min');
		echo $this->Html->css('plugins/bootstrap-datetimepicker.min');
		echo $this->Html->css('plugins/jquery.splitter');
		echo $this->Html->css('admin-nav');
                echo $this->Html->css('validationEngine/css/validationEngine.jquery.css');
//              data tables jquery
                echo $this->Html->css('DataTables/jquery.dataTables.css');
		echo $this->Html->css('DataTables/dataTables.fixedHeader.css');
//              bootstrap-switch		
                echo $this->Html->css('plugins/bootstrapSwitch/bootstrap-switch.min');
                
		echo $this->Html->script('jquery-2.1.1.min');		
		echo $this->Html->script('bootstrap.min');
		echo $this->Html->script('plugins/jstree.min');
		echo $this->Html->script('plugins/bootstrap-datetimepicker');
		echo $this->Html->script('plugins/jquery.splitter');
		echo $this->Html->script('admin-nav');
                echo $this->Html->script('plugins/validationEngine/js/jquery.validationEngine.js');
                echo $this->Html->script('plugins/validationEngine/js/jquery.validationEngine-en.js');
//              data tables jquery
                echo $this->Html->script('plugins/DataTables/media/js/jquery.dataTables.js');
                echo $this->Html->script('plugins/DataTables/media/js/dataTables.fixedHeader.js');
                
//              HOTKEYS
                echo $this->Html->script('jquery.hotkeys');
//              STOMP
                echo $this->Html->script('stomp');
                
//              CONFIG STOMP-ACTIVEMQ CONNECTION
                echo $this->Html->script('config');
//              sortableSelect
                echo $this->Html->script('plugins/sortableSelect/jquery.sortable.js');

//              bootstrap-switch
                echo $this->Html->script('plugins/bootstrapSwitch/bootstrap-switch.min');
                
                echo $this->Html->script('creategame');
                echo $this->Html->css('creategame.css');
                echo $this -> element('creategame', array());
                
                echo $this->Html->script('systemsettings');
                echo $this->Html->css('systemSettings.css');
                echo $this -> element('systemsettings');
                
                echo $this -> element('config', array());
                
                echo $this->fetch('meta');
		echo $this->fetch('css');
		echo $this->fetch('script');
                
                //datatable
                echo $this->Html->script('jquery.dataTables.min');
                echo $this->Html->css('jquery.dataTables.min');
                
                //echo $this->Html->css('bootstrap-select-1.12.4/css/bootstrap-select.min');
                //echo $this->Html->script('bootstrap-select-1.12.4/js/bootstrap-select.min');
                
                 
	?>    
    </head>
    <body>
        <div id="container_fluid" class="control-size">	
            <div id="menu">
            	<?php echo $this->element('menu'); ?>
            </div>
            <div id="content">
            	<?php echo $this->fetch('content'); ?>
            </div>
			<div id="footer">
				<?php echo $this->element('controls'); ?>
			</div>
            <div class="clear"></div>
            <input type="hidden" id="baseurl" name="baseurl" value="<?= ($this->Html->url('/')) ? $this->Html->url('/') : '/'; ?>"/>		
        </div>
    </body>
</html>