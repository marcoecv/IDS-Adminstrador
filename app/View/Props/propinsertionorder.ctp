<?php
echo $this->Html->css('props');
echo $this->Html->script('props/propinsertionorder');
?>
<?php echo $this->element('maintheader', array("pagename" => "Player Props")); ?>

<div class="mainConteiner center">
    <div class="tablesContainer">
        <div class="left">
            <form id="propsInsertionOrderFrm" action="" method="post">
                <h3>Sortable List</h3>
                <section id="selectList">
                    <table id="colorsTable">
                        <tr>
                            <td class="spread"><b>Spread</b></td>
                            <td class="moneyline"><b>Money Line</b></td>
                            <td class="total"><b>Total</b></td>
                            <td><button class="btn btn-info" name="orderPropsSend" id="orderPropsSend"><?= $buttonText ?></button></td>
                        </tr>
                    </table>
                    <div id="sortableList">
                        <ul class="sortable list">
                            <?php
                            $cont = 0;
                            foreach ($propList as $prop) {
                                $propTmp = explode("%", $prop);
                                $description=  str_replace("<","&lt;",$propTmp[0]);
                                $description2= str_replace(">", "&gt;", $description);
                                switch ($propTmp[2]) {
                                    case 'S':
                                        ?>
                                        <li class="spread"><input type="hidden" name="props[]" value="<?= $cont ?>"/><?= $description2 ?>  </li>
                                        <?php
                                        break;
                                    case 'M':
                                        ?>
                                        <li class="moneyline"><input type="hidden" name="props[]" value="<?= $cont ?>"/><?= $description2 ?>  </li>
                                        <?php
                                        break;
                                    case 'T':
                                        ?>
                                        <li class="total"><input type="hidden" name="props[]" value="<?= $cont ?>"/><?= $description2 ?>  </li>
                                        <?php
                                        break;
                                }
                                $cont++;
                            }
                            ?>
                        </ul>
                    </div>
                </section>
                <input type="hidden" name="gamesInfo" id="gamesInfo" value="<?= $gamesInfo ?>"/>
                <input type="hidden" name="propsList" id="propsList" value="<?= $fullPropList ?>"/>
                <input type="hidden" name="proptype" id="proptype" value="<?= $proptype ?>"/>
            </form>
        </div>
        <div class="right">
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
    </div>
</div>