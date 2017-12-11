<!--BEGIN MODAL FADE-->
<div class="modal" id="moneyLineModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog modalWidth">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="myModalLabel">MoneyLine</h4>
                <span style="width: 310px"type="text" name="lineDescriptionml" id="lineDescriptionml" readonly id="category" rows="5"></span>
            </div>
            <div class="modal-body">
                <form class="modalFmr" id="moneyLineModalFmr" name="moneyLineModalFmr">
                    <table id="moneyLineTable1">
                        <tr>
                            <td style="text-align: left">
                                <select id="ml_shadesAll" name="groups" size="6" style="width: 310px;height: 150px;"class="form-control" >
                                    <option value=".">.</option>
                                </select>
                            </td>
                            <td style="text-align: right">
                                <select id="ml_shades" name="groups" size="6" style="margin-left: 20px; height: 150px;width: 310px"class="form-control" >
                                    <option value=".">.</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td  style="text-align: left">
                                <button class="btn btn-default" style="width: 310px" type="button" id="ml_addShade"><i class="glyphicon glyphicon-forward"></i></button>
                            </td>
                            <td style="text-align: right">
                                <button class="btn btn-default" style="margin-right: 14px;width: 310px" type="button" id="ml_removeShade"><i class="glyphicon glyphicon-backward"></i></button>
                            </td>
                        </tr>
                    </table>
                    <table id="moneyLineTable2">
                        <tr>
                            <td><label>&nbsp;</label></td>
                            <td style="width: 20px">&nbsp;</td>
                            <td><label>Price</label></td>
                        </tr>
                        <tr>
                            <td><input type="text" class="form-control" size="34" disabled name="mlTeam1" id="mlTeam1"/></td>
                            <td style="width: 20px">&nbsp;</td>
                            <td><input type="text" class="form-control validate[custom[number],minSize[3]]" size="8" name="mlPricet1" id="mlPricet1"/></td>
                            <td><span id="comeBackml1"></span></td>
                        </tr>
                        <tr>
                            <td><input type="text" class="form-control" size="34" disabled name="mlTeam2" id="mlTeam2"/></td>
                            <td style="width: 20px">&nbsp;</td>
                            <td><input type="text" class="form-control validate[custom[number],minSize[3]]" size="8" name="mlPricet2" id="mlPricet2"/></td>
                            <td><span id="comeBackml2"></span></td>
                        </tr>
                        <tr>
                            <td><input type="text" class="form-control" size="34" disabled name="mlDraw" id="mlDraw"/></td>
                            <td style="width: 20px">&nbsp;</td>
                            <td><input type="text" class="form-control validate[custom[number],minSize[3]]" size="8" name="mlPricet3" id="mlPricet3"/></td>
                            <td><span id="comeBackml3"></span></td>
                        </tr>
                    </table>
                    <br/><br/>
                    <div class="FRight">
                        <input type="checkbox" name="linkToMasterml" id="linkToMasterml"/>&nbsp;<label for="linkToMasterml" id="labellinkToMasterml">Linked to Master Store</label>
                    </div>
                    <div class="FLeft">
                        <button id="lockComback_ml" name="lockComback" type="button" class="btn btn-default">Lock Comeback</button>
                    </div>
                    <br/><br/><br/>
                    <textarea name="commentsml" id="commentsml" style="width: 665px;">
                                
                    </textarea><br/><br/>
                    <label for="minutesml">Keep open for</label>&nbsp;<input type="text" name="minutesml" id="minutesml" size="3"/>&nbsp;<label for="category"> minues from now</label><br/>
                    <input type="checkbox" name="offlineml" id="offlineml"/>&nbsp;
                    <label for="offlineml">Take Offline</label><br/>
                    <input type="checkbox" name="checkCircledMaxWagerml" size="4" id="checkCircledMaxWagerml"/>
                    <label for="checkCircledMaxWagerml">Circle contest with maximun wager of</label>
                    <input type="text" name="circledMaxWagerml" size="4" id="circledMaxWagerml"/><br/>
                    <input type="hidden" name="gameNumML" id="gameNumML" value=""/>
                    <input type="hidden" name="sporttypeml" id="sporttypeml"value=""/>
                    <input type="hidden" name="sportSubTypeml" id="sportSubTypeml"value=""/>
                    <input type="hidden" name="rotANumberml" id="rotANumberml"/>
                    <input type="hidden" name="rotHNumberml" id="rotHNumberml"/>
                    <input type="hidden" name="americanPriceml1" id="americanPriceml1" value=""/>
                    <input type="hidden" name="americanPriceml2" id="americanPriceml2" value=""/>
                    <input type="hidden" name="gamedateml" id="gamedateml" value=""/>
                    <input type="hidden" name="gametimeml" id="gametimeml" value=""/>
                    <input type="hidden" name="ml_shadesList" id="ml_shadesList" value=""/>
                </form>
            </div>
            <div class="modal-footer">
                <button id="line_histButtonML" name="line_histButtonML" data-dismiss="modal" type="button" class="btn btn-primary">
                    Wagers/Line History
                </button>
                <button id="cancelButtonML" name="cancelButtonML" type="button" data-dismiss="modal" class="btn btn-danger">
                    Cancel
                </button>
                <button id="saveButtonML" name="saveButtonML" type="button" class="btn btn-success">
                    Save
                </button>
            </div>
        </div>
    </div>
</div>
<!--END MODAL FADE-->