<!--BEGIN MODAL FADE-->
<div class="modal" id="teamTotalModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog modalWidth">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="myModalLabel">Team Total</h4>
                <span style="width: 310px"type="text" name="lineDescriptiontt" id="lineDescriptiontt" readonly id="category" rows="5">Wednesday - 10-29-2014 07:25:00 Atlanta Hawks regular Season wins</span>
            </div>
            <div class="modal-body">
                    <form class="modalFrm" id="teamTotalModalFrm" name="teamTotalModalFrm">
                    <table id="ttTable">
                        <tr>
                            <td style="text-align: left">
                                <select id="tt_shadesAll" name="groups" size="6" style="width: 310px;height: 150px;"class="form-control" >
                                </select>
                            </td>
                            <td style="text-align: right">
                                <select id="tt_shades" name="groups" size="6" style="margin-left: 20px; height: 150px;width: 310px"class="form-control" >
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td  style="text-align: left">
                                <button class="btn btn-default" style="width: 310px" type="button" id="tt_addShade"><i class="glyphicon glyphicon-forward"></i></button>
                            </td>
                            <td style="text-align: right">
                                <button class="btn btn-default" style="margin-right: 14px;width: 310px" type="button" id="tt_removeShade"><i class="glyphicon glyphicon-backward"></i></button>
                            </td>
                        </tr>
                    </table>
                    <table id="ttTable2">
                        <tr>
                            <td><label>&nbsp;</label></td>
                            <td style="width: 20px">&nbsp;</td>
                            <td><label>Points</label></td>
                            <td><label>Price</label></td>
                        </tr>
                        <tr>
                            <td><input type="text" class="form-control" size="34" disabled name="ttTeam1" id="ttTeam1" value="OVER"/></td>
                            <td style="width: 20px">&nbsp;</td>
                            <td><input type="text" class="form-control" onkeyup="changeValues(this, 't')" size="8" name="pointstt1" id="pointstt1"/></td>
                            <td><input type="text" class="form-control validate[custom[number],minSize[3]]" size="8" name="pricett1" id="pricett1"/></td>
                            <td><span id="comeBacktt1"></span></td>
                        </tr>
                        <tr>
                            <td><input type="text" class="form-control" size="34" disabled name="ttTeam2" id="ttTeam2" value="UNDER"/></td>
                            <td style="width: 20px">&nbsp;</td>
                            <td>&nbsp;</td>
                            <td><input type="text" class="form-control validate[custom[number],minSize[3]]" size="8" name="pricett2" id="pricett2"/></td>
                            <td><span id="comeBacktt2"></span></td>
                        </tr>
                    </table> <br/><br/>
                    <div class="FRight">
                        <input type="checkbox" name="linkToMastertt" id="linkToMastertt"/>&nbsp;<label for="linkToMastertt" id="labellinkToMastertt">Linked to Master Store</label>
                    </div>
                    <div class="FLeft">
                        <button id="lockComback_tt" name="lockComback" type="button" class="btn btn-default">Lock Comeback</button>
                    </div><br/><br/><br/>
                    <textarea name="commentstt" id="commentstt" style="width: 665px;">
                                
                    </textarea><br/><br/>
                    <label for="minutestt">Keep open for</label>&nbsp;<input type="text" name="minutestt" id="minutestt" size="3"/>&nbsp;<label for="category"> minues from now</label><br/>
                    <input type="checkbox" name="offlinett" id="offlinett"/>&nbsp;
                    <label for="offlinett">Take Offline</label><br/>
                    <input type="checkbox" name="checkCircledMaxWagertt" size="4" id="checkCircledMaxWagertt"/>
                    <label for="checkCircledMaxWagertt">Circle contest with maximun wager of</label>
                    <input type="text" name="circledMaxWagertt" size="4" id="circledMaxWagertt"/><br/>
                    <input type="hidden" name="gameNumTT" id="gameNumTT" value=""/>
                    <input type="hidden" name="sporttypett" id="sporttypett"value=""/>
                    <input type="hidden" name="sportSubTypett" id="sportSubTypett"value=""/>
                    <input type="hidden" name="rotANumbertt" id="rotANumbertt"/>
                    <input type="hidden" name="rotHNumbertt" id="rotHNumbertt"/>
                    <input type="hidden" name="position" id="position" value=""/>
                    <input type="hidden" name="americanPricett1" id="americanPricett1" value=""/>
                    <input type="hidden" name="americanPricett2" id="americanPricett2" value=""/>

                    <input type="hidden" name="gamedateteam" id="gamedateteam" value=""/>
                    <input type="hidden" name="gametimeteam" id="gametimeteam" value=""/>
                    <input type="hidden" name="tt_shadesList" id="tt_shadesList" value=""/>
                </form>
            </div>
            <div class="modal-footer">
                <button id="line_histButtonTT" name="line_histButtonTT" data-dismiss="modal" type="button" class="btn btn-primary"  onclick="openLineHistoryModal('TeamTotal')">
                    Wagers/Line History
                </button>
                <button id="cancelButtonTT" name="cancelButtonTT" type="button" data-dismiss="modal" class="btn btn-danger">
                    Cancel
                </button>
                <button id="saveButtonTT" name="saveButtonTT" type="button" class="btn btn-success">
                    Save
                </button>
            </div>
        </div>
    </div>
</div>
<!--END MODAL FADE-->