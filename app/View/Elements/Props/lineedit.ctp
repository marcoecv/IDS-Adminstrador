<!--BEGIN MODAL FADE-->
<div class="modal" id="editLinePropModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="myModalLabel">Add Prop Information</h4>
            </div>
            <div class="modal-body">
                <form class="modalFrm" id="editPropLineFrm" name="editPropLineFrm">
                    <table>
                        <tr>
                            <td>
                                <label for="propLineDescription">Line</label><br/>
                                <textarea style="width: 300px"type="text" name="propLineDescription" readonly id="propLineDescription" rows="5">
                                </textarea>
                            </td>
                            <td style="text-align: right">
                                <label for="category"></label>&nbsp;
                                <select multiple name="groups" size="6" style="margin-left: 20px; width: 200px"class="form-control" >
                                    <option value="1">Perfil-1</option>
                                    <option value="2">Perfil-2</option>
                                    <option value="3">Perfil-3</option>
                                </select>
                            </td>
                        </tr>
                    </table>
                    <br/>
                    <table id="oddLineTable">
                        <tr>
                            <td><label class="label-control inlineElement" for="odds">Odds:</label>&nbsp;</td>
                            <td><input type="text" class="form-control smallWidth inlineElement inlineElement validate[custom[number]]" size="5" name="oddProp" id="oddProp"/></td>
                            <td><span class="inlineElement" id="convertedValues"></span></td>
                        </tr>
                        <tr>
                            <td><label class="label-control" for="line">Line:</label>&nbsp;</td>
                            <td><input type="text" size="4" name="lineProp" id="lineProp"/></td>
                            <td></td>
                        </tr>
                    </table>
                    <br/>
                    <label for="category">Comments</label>&nbsp;<br/>
                    <textarea type="text" name="propComments" style="width: 565px; "id="propComments" rows="5" cols="30"></textarea><br/>
                    <input type="checkbox" name="offlineProp" id="offlineProp"/>&nbsp;<label for="offlineProp">Offline</label><br/>

                    <input type="checkbox" name="circledContestProp" id="circledContestProp"/>&nbsp;
                    <label for="circledContestProp">Circle contest with maximun wager of</label>
                    <input type="text" name="circledContestMaxWagerProp" size="6" id="circledContestMaxWagerProp" value=""/><br/>

                    <label for="contestMaxWagerProp">Contest maximun wager of</label>
                    <input type="text" name="contestMaxWagerProp" size="6" id="contestMaxWagerProp" value=""/><br/>
                    <input type="hidden" name="contestType" id="contestType"/>
                    <input type="hidden" name="contestType2" id="contestType2"/>
                    <input type="hidden" name="contestType3" id="contestType3"/>
                    <input type="hidden" name="contestDescProp" id="contestDescProp"/>
                    <input type="hidden" name="rotNProp1" id="rotNProp1"/>
                    <input type="hidden" name="rotNProp2" id="rotNProp2"/>
                    <input type="hidden" name="lineProp2" id="lineProp2"/>
                    <input type="hidden" name="propLineType" id="propLineType"/>
                </form>
            </div>
            <div class="modal-footer">
                <button id="wagersButton" name="wagersButton" type="button" class="btn btn-primary">
                    Wagers
                </button>
                <button id="line_histButton" name="line_histButton" type="button" class="btn btn-primary">
                    Line History
                </button>
                <button id="savePropLineButton" name="saveButton" type="button" class="btn btn-success">
                    Save
                </button>
                <button id="cancelPropLineButton" name="cancelButton" type="button" data-dismiss="modal" class="btn btn-danger">
                    Cancel
                </button>
            </div>
        </div>
    </div>
</div>
<!--END MODAL FADE-->