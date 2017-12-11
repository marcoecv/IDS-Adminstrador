<?php 

    $user = $this->Session->read("LOGIN_METADATA_USER");
    $lobby = $user['lobby']['AppUrl'];
    $accessPermissions = $user['accessPermissions'];
?>


<a class="btn btn-menu" role="button" order=0 href="<?=$lobby.'/'.$user['user']['UserName']?>">Home</a>

<?php 
  foreach($accessPermissions as $permission) {
?>

<a class="btn btn-menu" role="button" href="<?php echo $this->Html->url(array('controller'=>$permission['PermissionPage'])) ?>"><?php echo $permission['PermissionDesc']?></a>

<?php 
  }
?>

<div class="btn-group">
	<a class="btn 
		<?=strpos($_SERVER["REQUEST_URI"],'games')? 'btn-menu-selected' : 'btn-menu'?> 
		menu-group-value" type="button" href="<?php echo $this->Html->url(array('controller'=>'games','action'=>'index')) ?>">Games</a>
	<button data-toggle="dropdown" class="btn btn-menu dropdown-toggle menu-group-arrow" type="button" aria-expanded="true">
		<span class="caret"></span>
		<span class="sr-only">Toggle Dropdown</span>
	</button>
	<ul role="menu" class="dropdown-menu">
            <li><a href="#" onclick="openCreateGameModal()">Create Game</a></li>
            <li><a href="<?php echo $this->Html->url(array('controller'=>'games','action'=>'pauses')) ?>">Pauses</a></li>
	</ul>
</div>
    <a class="btn 
        <?=strpos($_SERVER["REQUEST_URI"],'banners')? 'btn-menu-selected' : 'btn-menu'?> 
            menu-group-value" type="button" href="<?php echo $this->Html->url(array('controller'=>'banners','action'=>'index')) ?>">Banners</a>
<div class="btn-group">
	<a class="btn 
		<?=strpos($_SERVER["REQUEST_URI"],'props')? 'btn-menu-selected' : 'btn-menu'?> 
		menu-group-value" type="button" href="">Props</a>
	<button data-toggle="dropdown" class="btn btn-menu dropdown-toggle menu-group-arrow" type="button" aria-expanded="true">
		<span class="caret"></span>
		<span class="sr-only">Toggle Dropdown</span>
	</button>
	<ul role="menu" class="dropdown-menu">
		<li><a href="<?php echo $this->Html->url(array('controller'=>'props','action'=>'createpropbytemplate')) ?>">Props by Templates</a></li>
                <li><a href="<?php echo $this->Html->url(array('controller'=>'props','action'=>'create_ext')) ?>">Create External Prop</a></li>
	</ul>
</div>
<div class="btn-group">
	<a class="btn 
		<?=strpos($_SERVER["REQUEST_URI"],'grade')? 'btn-menu-selected' : 'btn-menu'?> 
		menu-group-value" type="button" href="">Grade</a>
	<button data-toggle="dropdown" class="btn btn-menu dropdown-toggle menu-group-arrow" type="button" aria-expanded="true">
		<span class="caret"></span>
		<span class="sr-only">Toggle Dropdown</span>
	</button>
        <ul role="menu" class="dropdown-menu" style="z-index: 3">
		<li><a href="<?php echo $this->Html->url(array('controller'=>'grade','action'=>'manualplaylist')) ?>">Manual Plays</a></li>
                <li><a href="<?php echo $this->Html->url(array('controller'=>'grade','action'=>'index')) ?>">Games Grading</a></li>
                <li><a href="<?php echo $this->Html->url(array('controller'=>'grade','action'=>'generalpropsgrading')) ?>">Props Grading</a></li>
	</ul>
</div>
<div class="btn-group">
	<a class="btn 
		<?=strpos($_SERVER["REQUEST_URI"],'settings')? 'btn-menu-selected' : 'btn-menu'?> 
           menu-group-value" type="button" href="#" onclick="openSystemSettingsModal()">Settings</a>
	<button data-toggle="dropdown" class="btn btn-menu dropdown-toggle menu-group-arrow" type="button" aria-expanded="true">
		<span class="caret"></span>
		<span class="sr-only">Toggle Dropdown</span>
	</button>
	<ul role="menu" class="dropdown-menu">
		<li><a href="<?php echo $this->Html->url(array('controller'=>'settings','action'=>'category')) ?>">Category</a></li>
		<li><a href="<?php echo $this->Html->url(array('controller'=>'settings','action'=>'team')) ?>">Team</a></li>
        <li><a href="<?php echo $this->Html->url(array('controller'=>'settings','action'=>'charts')) ?>">Chart</a></li>
        <li><a href="<?php echo $this->Html->url(array('controller'=>'settings','action'=>'stores')) ?>">Store</a></li>
        <li><a href="<?php echo $this->Html->url(array('controller'=>'settings','action'=>'lineshadegroups')) ?>">Lines Shade Group</a></li>
	</ul>
</div>

<a class="btn btn-menu" role="button" href="<?php echo $this->Html->url(array('controller'=>'pages','action'=>'login')) ?>">Logout</a>    
