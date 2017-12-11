<table id="tlbGames">
    <thead>
        <th class=" btn-blue btn-transparent active" style="text-align: center; width: 3%;"><input class="selectAll" name="selectAll" type="checkbox"></th>
        <th class=" btn-blue btn-transparent active" style="width: 5%">Sport </th>
        <th class=" btn-blue btn-transparent active" style="width: 5%">Sub Sport </th>
        <th class=" btn-blue btn-transparent active" style="width: 17%"> League </th>
        <th class=" btn-blue btn-transparent active" style="width: 10%"> Date Game </th>
        <th class=" btn-blue btn-transparent active" style="text-align: left; width: 20%"> Game Description </th>        
        <th class=" btn-blue btn-transparent active" style="width: 10%"> 
            <select class="form-control" id="assignBannerSelector">                         
                <option value="">Select Banner</option> 
                <option value="-1">Remove Banner</option> 
                <?php foreach ($banners as $row){ ?>
                <option value="<?php echo $row['BannerName'] ?>"><?php echo $row['BannerName'] ?></option>  
                <?php } ?>
            </select> 
            <span class="error_hide">This field is required</span> 
        </th>       
        <th class=" btn-blue btn-transparent active" style="width: 10%">
            <select class="form-control" id="database"> 
                <option value="">Select Database</option> 
                <?php foreach ($databases as $row){ ?>
                <option value="<?php echo $row['value'] ?>"><?php echo $row['name'] ?></option>  
                <?php } ?>
            </select>     
            <span class="error_hide" id="error_databases">This field is required</span> 
        </th>
    </thead>
    <tbody>
        <?php for($i = 0; $i < count($games); ++$i) {
            
            $date = new DateTime($games[$i]['GameDateTime']);
            $date = $date->format('F jS Y h:ia');
        ?>
        <tr>
            <td style="text-align: center;">
                <div class="selectedGame">
                    <input GameNum="<?php echo $games[$i]['GameNum']?>"
                           GameDate="<?php echo $games[$i]['GameDateTime']?>"
                           ScheduleText="<?php echo trim($games[$i]['ScheduleText'])?>"
                           SportType="<?php echo trim($games[$i]['SportType'])?>"
                           SportSubType="<?php echo trim($games[$i]['SportSubType'])?>"
                           Team1RotNum="<?php echo trim($games[$i]['Team1RotNum'])?>"                            
                           Team1ID="<?php echo trim($games[$i]['Team1ID'])?>" 
                           Team2RotNum="<?php echo trim($games[$i]['Team2RotNum'])?>"                            
                           Team2ID="<?php echo trim($games[$i]['Team2ID'])?>" 
                           type="checkbox"
                           class="game"/>
                </div>                    
            </td> 
            <td style="text-align: left;"><?php echo $games[$i]['SportType']?></td>
            <td style="text-align: left;"><?php echo $games[$i]['SportSubType']?></td> 
            <td style="text-align: left;"><?php echo $games[$i]['ScheduleText']?></td> 
            <td style="text-align: left;"><?php echo $date?></td>
            <td style="text-align: left;">
                <?php echo $games[$i]['Team1RotNum'] ?>.   <?php echo $games[$i]['Team1ID']?>
                &nbsp;&nbsp;&nbsp;<b>vs</b>&nbsp;&nbsp;&nbsp;
                <?php echo $games[$i]['Team2RotNum']?>.   <?php echo $games[$i]['Team2ID']?>
            </td>           
            <td style="text-align: left;"><?php echo $games[$i]['Banner']?></td>  
            <td style="text-align: left;">&nbsp;</td> 
        </tr>
        <?php } ?>
    </tbody>
    
</table>






