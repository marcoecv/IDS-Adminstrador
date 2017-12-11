<?php
echo $this->Html->css('props');
echo $this->Html->script('props/playersedition');
?>
<?php echo $this->element('maintheader', array("pagename" => "Players Edition")); ?>

<div class="mainConteinerPlayersEdition center">
    <div class="left2" >
        <h3>Players Edition</h3>
        <div id="playerPropTableContainer">
            <table class="playerPropTable">
                <?php
                $cont = 0;
                foreach ($propsToInsertArray as $prop) {
                    $propInfoArray = explode("*", $prop);
                    $description=  str_replace("<","&lt;",$propInfoArray[1]);
                    $description2= str_replace(">", "&gt;", $description);
                    if ($propInfoArray[13] == 2) {
                        ?>
                        <tr>
                            <td><label class="mediumWidth"><?= $description2 ?></label><input type="hidden" name="propInfo[]" value="<?= $prop ?>"/></td>
                            <td>
                                <label class="label-control"><?= $propInfoArray[14] ?></label>
                                <input type="text" name="" id="<?= $propInfoArray[0] . "_" . $cont . "_inp1" ?>" class="form-control" size="14"/>
                                <select class="form-control" style="width: 150px;" name="" id="">
                                    <option value=""></option>
                                </select>
                            </td>
                            <td>
                                <label class="label-control"><?= $propInfoArray[15] ?></label>
                                <input type="text" name="" id="<?= $propInfoArray[0] . "_" . $cont . "_inp2" ?>" class="form-control" size="14"/>
                                <select class="form-control" name="" style="width: 150px;" id="">
                                    <option value=""></option>
                                </select>
                            </td>
                            <td>
                                <button class="btn btn-default" onclick="addPlayersToList('<?= $propInfoArray[0] . "_" . $cont ?>', '<?= $propInfoArray[0] . "_" . $cont . "_inp1" ?>', '<?= $propInfoArray[0] . "_" . $cont . "_inp2" ?>')"><i class="glyphicon glyphicon-arrow-right"></i></button>
                            </td>
                            <td>
                                <span>Double Click to Remove</span><br/>
                                <select class="form-control" multiple="multiple" style="width: 300px;"name="players[]" size="3" id="<?= $propInfoArray[0] . "_" . $cont ?>">
                                </select>
                            </td>
                        </tr>
                        <?php } else {
                            $description=  str_replace("<","&lt;",$propInfoArray[1]);
                            $description2= str_replace(">", "&gt;", $description);
                        ?>
                        <tr>
                            <td><label class="mediumWidth"><?= $description2 ?></label><input type="hidden" name="propInfo[]" value="<?= $prop ?>"/></td>
                            <td colspan="2">
                                <label class="label-control"><?= $propInfoArray[14] ?> vs <?= $propInfoArray[15] ?></label>
                                <input type="text" name="" id="<?= $propInfoArray[0] . "_" . $cont . "_inp" ?>" class="form-control" size="14"/>
                                <select class="form-control"  name="" id="">
                                    <option value=""></option>
                                </select>
                            </td>
                            <td>
                                <button class="btn btn-default" onclick="addPlayerToList('<?= $propInfoArray[0] . "_" . $cont ?>', '<?= $propInfoArray[0] . "_" . $cont . "_inp" ?>')"><i class="glyphicon glyphicon-arrow-right"></i></button>
                            </td>
                            <td>
                                <span>Double Click to Remove</span><br/>
                                <select class="form-control" multiple="multiple" style="width: 300px;"name="players[]" size="3" id="<?= $propInfoArray[0] . "_" . $cont ?>">
                                </select>
                            </td>
                        </tr>

                        <?php
                    }
                    $cont++;
                }
                ?>
            </table>
        </div>
    </div>
    <div class="right2" >
        <div id="insertionResults">
            <h3>Insertion Results</h3>
            <table id="resultsTable" class="cell-border hover resultsInsertionTable" cellspacing="0" style="width: 100%">
                <thead>
                    <tr>
                        <th>
                            CorrelationID
                        </th>
                        <th>
                            Prop Description
                        </th>
                        <th>
                            Status
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="saved">
                        <td>Correlaion1</td>
                        <td>Description1</td>
                        <td>Saved</td>
                    </tr>
                    <tr class="notSaved">
                        <td>Correlaion2</td>
                        <td>Description2</td>
                        <td>Error</td>
                    </tr>
                    <tr class="saved">
                        <td>Correlaion3</td>
                        <td>Description3</td>
                        <td>Saved</td>
                    </tr>
                    <tr class="saved">
                        <td>Correlaion4</td>
                        <td>Description4</td>
                        <td>Saved</td>
                    </tr>
                    <tr class="notSaved">
                        <td>Correlaion5</td>
                        <td>Description5</td>
                        <td>Not Saved</td>
                    </tr>
                    <tr class="saved">
                        <td>Correlaion1</td>
                        <td>Description1</td>
                        <td>Saved</td>
                    </tr>
                    <tr class="notSaved">
                        <td>Correlaion2</td>
                        <td>Description2</td>
                        <td>Error</td>
                    </tr>
                    <tr class="saved">
                        <td>Correlaion3</td>
                        <td>Description3</td>
                        <td>Saved</td>
                    </tr>
                    <tr class="saved">
                        <td>Correlaion4</td>
                        <td>Description4</td>
                        <td>Saved</td>
                    </tr>
                    <tr class="notSaved">
                        <td>Correlaion5</td>
                        <td>Description5</td>
                        <td>Not Saved</td>
                    </tr>
                    <tr class="saved">
                        <td>Correlaion1</td>
                        <td>Description1</td>
                        <td>Saved</td>
                    </tr>
                    <tr class="notSaved">
                        <td>Correlaion2</td>
                        <td>Description2</td>
                        <td>Error</td>
                    </tr>
                    <tr class="saved">
                        <td>Correlaion3</td>
                        <td>Description3</td>
                        <td>Saved</td>
                    </tr>
                    <tr class="saved">
                        <td>Correlaion4</td>
                        <td>Description4</td>
                        <td>Saved</td>
                    </tr>
                    <tr class="notSaved">
                        <td>Correlaion5</td>
                        <td>Description5</td>
                        <td>Not Saved</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <button class="btn btn-success" name="savePlayerPropButton" id="savePlayerPropButton">Send</button>
</div>