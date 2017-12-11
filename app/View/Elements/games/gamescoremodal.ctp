<!--BEGIN MODAL FADE-->
<div class="modal" id="gameScoreModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="myModalLabel">Game Score</h4>
            </div>
            <div class="modal-body">

                <div class="headerDiv center">
                    <div id="gameScoreTitle" class="bordered-div">
                        <span id="homeTeam">Edmonton Oilers</span> vs <span id="awayTeam">New Jersey Devils</span><br/>
                        Game Number: <span id="gameNumber">123456789</span><br/>
                        Game Time: <span id="gameTime">Monday 02/09/2015 7:05 PM</span>
                    </div>
                </div>
                <div class="wraplinehistory center">
                    <table id="linehistoryTable">
                        <tr>
                            <td>Period</td>
                            <td><span id="homeTeamTable">Edmonton Oilers</span></td>
                            <td><span id="awayTeamTable">New Jersey Devils</span></td>
                        </tr>
                    </table>
                </div>
                <div class="inner_LineHistoryTable center" >
                    <table id="linehistoryTableBody">
                        <tr>
                            <td>1st Quarter</td>
                            <td>1</td>
                            <td>0</td>
                        </tr>
                        <tr>
                            <td>2nd Quarter</td>
                            <td>2</td>
                            <td>1</td>
                        </tr>
                        <tr>
                            <td>3rd Quarter</td>
                            <td>2</td>
                            <td>2</td>
                        </tr>
                        <tr>
                            <td>4th Quarter</td>
                            <td>4</td>
                            <td>2</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="modal-footer">
                <button id="cancelDeleteButton" name="scheduleButton" type="button" data-dismiss="modal" class="btn btn-success">
                    OK
                </button>
            </div>
        </div>
    </div>
</div>
<!--END MODAL FADE--> 