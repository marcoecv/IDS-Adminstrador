<div id="linesFilter" class="col-sm-12">
    <div class="col-sm-1">
        <label class="label-control" for="lineFilterStore">Store:</label>
        <select class="form-control" id="lineFilterStore" name="lineFilterStore" onchange="changeLinePerStore()">
        </select>
    </div>
    <div class="col-sm-1">
        <label class="label-control" for="lineFilterPeriod">Period:</label>
        <select class="form-control" id="lineFilterPeriod" name="lineFilterPeriod" onchange="changeLinePerStore()">
        </select>
    </div>
    <div class="col-sm-1">
        <label class="label-control" for="lineFilterStatus">Status:</label>
        <select class="form-control" id="lineFilterStatus" name="lineFilterStatus" onchange="setGameLines()">
            <option value="Active">Active</option>
            <option value="Offline">Offline</option>
            <option value="Expired">Expired</option>
        </select>
    </div>
    <div class="col-sm-1">
        <label class="label-control">&nbsp;</label>
        <select class="form-control" id="wagerLineFilter" name="wagerLineFilter" onchange="changeWagerFilter()">
            <option value="Profit">Profit</option>
            <option value="Risk">Risk</option>
            <option value="Payout">Payout</option>
            <option value="Volume">Volume</option>
            <option value="Count">Count</option>
        </select>
    </div>
    <div class="col-sm-2">
        <label class="label-control" for="lineActionFilter">Action Filter:</label>
        <select class="form-control" id="lineActionFilter" name="lineActionFilter">
            <option value="*">--- all players ---</option>

        </select>
    </div>
    <div class="col-sm-1">
        <label class="label-control" for="displayTypeFilter">Display:</label>
        <select class="form-control" id="displayTypeFilter" name="displayTypeFilter" onchange="changeDisplayValues()">
            <option value="A">American</option>
            <option value="D">Decimal</option>
        </select>
    </div>
    <div class="col-sm-1">
        <label class="label-control">&nbsp;</label>
        <input type="button" class="btn btn-default disabled" value="Shaded">
    </div>
    <div class="col-sm-2">
        <label class="label-control">Search</label>
        <span id="searchBoxSpan" class="searchBox">
            <i class="glyphicon glyphicon-search"></i>
            <input class="" type="text" id="searchBox" size="25"></input>
        </span>
    </div>
    <div class="col-sm-1">
        <label class="label-control">&nbsp;</label>
        <button type="button" class="btn btn-info" style="margin-left: 15px" id="openAllButton" name="openAllButton">Open All</button>
    </div>
    <div class="col-sm-1">
        <label class="label-control">&nbsp;</label>
        <button type="button" class="btn btn-warning" style="margin-left: 15px" id="openPausesButton" name="openPausesButton">Paused Games</button>
    </div>
    <div class="col-sm-12 underscore">
    </div>
</div>
