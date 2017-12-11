<!--BEGIN MODAL FADE-->
<div class="modal" id="totalModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog modalWidth">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="myModalLabel">Total</h4>
                <span style="width: 310px"type="text" name="lineDescriptiont" id="lineDescriptiont"readonly id="category" rows="5"></span>
            </div>
            <div class="modal-body">
                <form class="modalFrm" id="totalModalFrm" name="totalModalFrm">
                    <table id="totalTable">
                        <tr>
                            <td style="text-align: left">
                                <select id="tl_shadesAll" name="groups" size="6" style="width: 310px;height: 150px;"class="form-control" >
                                    <option value=".">.</option>
                                </select>
                            </td>
                            <td style="text-align: right">
                                <select id="tl_shades" name="groups" size="6" style="margin-left: 20px;height: 150px; width: 310px"class="form-control" >
                                    <option value=".">.</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td  style="text-align: left">
                                <button class="btn btn-default" style="width: 310px" type="button" id="tl_addShade"><i class="glyphicon glyphicon-forward"></i></button>
                            </td>
                            <td style="text-align: right">
                                <button class="btn btn-default" style="margin-right: 14px;width: 310px" type="button" id="tl_removeShade"><i class="glyphicon glyphicon-backward"></i></button>
                            </td>
                        </tr>
                    </table>
                    <table id="totalTable2">
                        <tr>
                            <td><label>&nbsp;</label></td>
                            <td style="width: 20px">&nbsp;</td>
                            <td><label>Points</label></td>
                            <td><label>Price</label></td>
                        </tr>
                        <tr>
                            <td><input type="text" class="form-control" size="35" disabled name="tTeam1" id="tTeam1"/></td>
                            <td style="width: 20px">&nbsp;</td>
                            <td><input type="text" class="form-control" onkeyup="changeValues(this, 't')" size="8" name="tPoints1" id="tPoints1"/></td>
                            <td ><input type="text" class="form-control validate[custom[number],minSize[3]]" size="8" name="tPricet1" id="tPricet1"/></td>
                            <td><span id="comeBackt1"></span></td>
                        </tr>
                        <tr>
                            <td><input type="text" class="form-control" size="34" disabled name="tTeam2" id="tTeam2"/></td>
                            <td style="width: 20px">&nbsp;</td>
                            <td style="padding-left: 20px">&nbsp;</td>
                            <td><input type="text" class="form-control validate[custom[number],minSize[3]]" size="8" name="tPricet2" id="tPricet2"/></td>
                            <td><span id="comeBackt2"></span></td>
                        </tr>
                    </table>
                    <br/><br/>
                    <div class="FRight">
                        <input type="checkbox" name="linkToMastert" id="linkToMastert"/>&nbsp;<label for="linkToMastert" id="labellinkToMastert" >Linked to Master Store</label>
                    </div>
                    <div class="FLeft">
                        <button id="lockComback_tl" name="lockComback" type="button" class="btn btn-default">Lock Comeback</button>
                    </div>
                    <br/><br/><br/>
                    <textarea name="commentst" id="commentst" style="width: 665px;">
                                
                    </textarea>
                    <label for="minutest">Keep open for</label>&nbsp;<input type="text" name="minutest" id="minutest" size="3"/>&nbsp;<label for="category"> minues from now</label><br/>
                    <input type="checkbox" name="offlinet" id="offlinet"/>&nbsp;
                    <label for="offlinet">Take Offline</label><br/>
                    <input type="checkbox" name="checkCircledMaxWagert" size="4" id="checkCircledMaxWagert"/>
                    <label for="checkCircledMaxWagert">Circle contest with maximun wager of</label>
                    <input type="text" name="circledMaxWagert" size="4" id="circledMaxWagert"/><br/>
                    <input type="hidden" name="gameNumT" id="gameNumT" value=""/>
                    <input type="hidden" name="sporttypet" id="sporttypet"value=""/>
                    <input type="hidden" name="sportSubTypet" id="sportSubTypet"value=""/>
                    <input type="hidden" name="rotANumbert" id="rotANumbert"/>
                    <input type="hidden" name="rotHNumbert" id="rotHNumbert"/>
                    <input type="hidden" name="americanPricet1" id="americanPricet1" value=""/>
                    <input type="hidden" name="americanPricet2" id="americanPricet2" value=""/>

                    <input type="hidden" name="gamedatet" id="gamedatet" value=""/>
                    <input type="hidden" name="gametimet" id="gametimet" value=""/>
                    
                    <input type="hidden" name="tl_shadesList" id="tl_shadesList" value=""/>
                </form>
            </div>
            <div class="modal-footer">
                <button id="line_histButtonT" name="line_histButtonT" data-dismiss="modal" type="button" class="btn btn-primary">
                    Wagers/Line History
                </button>
                <button id="cancelButtonT" name="cancelButtonT" type="button" data-dismiss="modal" class="btn btn-danger">
                    Cancel
                </button>
                <button id="saveButtonT" name="saveButtonT" type="button" class="btn btn-success">
                    Save
                </button>
            </div>
        </div>
    </div>
</div>
<!--END MODAL FADE-->