<?php
echo $this->Html->css('reports');
echo $this->Html->script('reports/gradeprogress');
?>
<?php echo $this->element('maintheader', array("pagename" => "Manual open Game / Contest")); ?>
<?php echo $this->element('loadingajaxcallmodal'); ?>
<?php echo $this->element('defaultmsgmodal'); ?>


<div class="mainConteiner center">
    <form id="gameScoreFrm" action="#" role="form" class="form-horizontal">
        <label class="label-control">In Progress</label>
        <br/>
        <table id="" class="cell-border hover gradeProgressTable" cellspacing="0" width="100%">
            <thead>
               <tr>
                   <th>Action</th>
                    <th>Game</th>
                    <th>Contest</th>
                    <th>Status</th>
                </tr> 
            </thead>
            <tbody>
            </tbody>
            
        </table>
        <br/>
        <label class="label-control">Complete</label>
        <br/>
        <table id=""class="cell-border hover gradeProgressTable" cellspacing="0" width="100%">
             <thead>
               <tr>
                   <th>Action</th>
                    <th>Game</th>
                    <th>Contest</th>
                    <th>Status</th>
                </tr> 
            </thead>
            <tbody>
            </tbody>
        </table>
    </form>
</div>