<!--BEGIN MODAL FADE-->
<div class="modal" id="spreadModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog modalWidth">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="myModalLabel">Spread</h4>
                <span style="width: 310px" type="text" name="lineDescriptionsp" readonly id="lineDescriptionsp" rows="5"></span>
            </div>
            <div class="modal-body">
                <form class="modalFrm" name="spreadModalFrm" id="spreadModalFrm">
                    <table id="tableSpreadModal2">
                        <tr>
                            <td style="text-align: left">
                                <select id="sp_shadesAll" name="groups" size="5" style="width: 310px;height: 150px;"class="form-control" >
                                </select>
                            </td>
                            <td style="text-align: right">
                                <select id="sp_shades" name="groups" size="5" style="margin-left: 20px;height: 150px; width: 310px"class="form-control" >
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td  style="text-align: left">
                                <button class="btn btn-default" style="width: 310px" type="button" id="sp_addShade"><i class="glyphicon glyphicon-forward"></i></button>
                            </td>
                            <td style="text-align: right">
                                <button class="btn btn-default" style="margin-right: 14px;width: 310px" type="button" id="sp_removeShade"><i class="glyphicon glyphicon-backward"></i></button>
                            </td>
                        </tr>
                    </table>
                    <br/>
                    <table id="tableSpreadModal">
                        <tr>
                            <td><label>&nbsp;</label></td>
                            <td style="width: 20px">&nbsp;</td>
                            <td><label>Spread</label></td>
                            <td><label>Price</label></td>
                            <td><label>&nbsp;</label></td>
                        </tr>
                        <tr>
                            <td>
                                <input type="text" class="form-control" size="34" disabled name="team1" id="team1"/>
                            </td>
                            <td style="width: 20px">&nbsp;</td>
                            <td>
                                <input type="text" class="form-control" size="8" onkeyup="changeValues(this);
                                    spreadinvert(2);" name="spreadt1" id="spreadt1"/>
                            </td>
                            <td>
                                <input type="text" class="form-control validate[custom[number],minSize[3]]" size="8" name="" id="pricesp1"/>
                            </td>
                            <td>
                                <span id="comeBacksp1"></span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="text" class="form-control" size="34" disabled name="team2" id="team2"/>
                            </td>
                            <td style="width: 20px">&nbsp;</td>
                            <td>
                                <input type="text" class="form-control" size="8" onkeyup="changeValues(this);
                                        spreadinvert(1);" name="spreadt2" id="spreadt2"/>
                            </td>
                            </td>
                            <td>
                                <input type="text" class="form-control validate[custom[number],minSize[3]]" size="8" name="pricesp2" id="pricesp2"/>
                            </td>
                            <td><span id="comeBacksp2"></span></td>
                        </tr>
                    </table><br/><br/>
                    <div class="FRight">
                        <input type="checkbox" name="linkToMastersp" id="linkToMastersp"/>&nbsp;<label for="linkToMastersp" id ="labellinkToMastersp">Linked to Master Store</label>
                    </div>
                    <div class="FLeft">
                        <button id="lockComback_sp" name="lockComback" type="button" class="btn btn-default">Lock Comeback</button>
                    </div>
                    <br/><br/><br/>
                    <textarea name="commentssp" id="commentssp" style="width: 665px;">
                                
                    </textarea><br/><br/>
                    <label for="minutessp">Keep open for</label>&nbsp;<input type="text" name="minutessp" id="minutessp" size="3"/>&nbsp;<label for="category"> minues from now</label><br/>
                    <input type="checkbox" name="offlinesp" id="offlinesp"/>&nbsp;
                    <label for="offlinesp">Take Offline</label><br/>
                    <input type="checkbox" name="checkCircledMaxWagersp" size="4" id="checkCircledMaxWagersp"/>
                    <label for="checkCircledMaxWagersp">Circle contest with maximun wager of</label>
                    <input type="text" name="circledMaxWagersp" size="4" id="circledMaxWagersp"/><br/>


                    <input type="hidden" name="gamedatespread" id="gamedatespread" value=""/>
                    <input type="hidden" name="gametimespread" id="gametimespread" value=""/>

                    <input type="hidden" name="gameNumSP" id="gameNumSP" value=""/>
                    <input type="hidden" name="sporttypesp" id="sporttypesp"value=""/>
                    <input type="hidden" name="sportSubTypesp" id="sportSubTypesp"value=""/>
                    <input type="hidden" name="rotANumbersp" id="rotANumbersp" value=""/>
                    <input type="hidden" name="rotHNumbersp" id="rotHNumbersp" value=""/>
                    <input type="hidden" name="americanPricesp1" id="americanPricesp1" value=""/>
                    <input type="hidden" name="americanPricesp2" id="americanPricesp2" value=""/>
                    <input type="hidden" name="sp_shadesList" id="sp_shadesList" value=""/>
                </form>
            </div>
            <div class="modal-footer">
                <button id="line_histButtonSP" name="line_histButtonSP" data-dismiss="modal" type="button" class="btn btn-primary">
                    Wagers/Line History
                </button>
                <button id="cancelButtonSP" name="cancelButtonSP" type="button" data-dismiss="modal" class="btn btn-danger">
                    Cancel
                </button>
                <button id="saveButtonSP" name="saveButtonSP" type="button" class="btn btn-success">
                    Save
                </button>
            </div>
        </div>
    </div>
</div>
<!--END MODAL FADE-->