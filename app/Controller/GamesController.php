<?php

App::uses('AppController', 'Controller');

class GamesController extends AppController {

    /**
     * Reasigna los casos al usuario indicado.
     * @author		nombre apellido <correo>
     * 
     * @param string	APP_UID del caso.
     * @param int		DEL_INDEX del caso.
     * @param string	USR_UID del usuario ya asignado.
     * @param string	USR_UID del nuevo usuario a asignar.
     */
    public function index() {
        $soapPreGame = $this->getService('preGameService');
        $result = $soapPreGame->getScheduleSports(array("db" => $this->getReadDatabase()));
        $sports = json_decode($result->return, true);

        $this->set('sports', $sports['results']);
    }

    /**
     * @author mcalderon
     *
     * @param int $operacion operacion para el SP depende del nivel del arbol seleccionado
     * @param String $sport Sport Type
     * @param String $scheduleText
     * @param String $scheduleDate 
     * @param String $scheduleDateText Sub Sport Type 
     * @param String $db selected data base
     * 
     * @return Operation 1 All Sport types and main external props folders
     * Operation 2 All Scheduletext or schedule Date for the specific sport
     * Operation 3 All Sub Sports por the specific schedule text or date
     * Operation 4 All games for the specific sub Sport
     */
    public function schedule() {
        $operation = @$_POST['operation'];
        $sport = rawurldecode(@$_POST['sportType']);
        $subSport = rawurldecode(@$_POST['subSport']);
        $scheduleText = rawurldecode(@$_POST['scheduleText']);
        $scheduleDate = rawurldecode(@$_POST['scheduleDate']);
        $soapPreGame = $this->getService('preGameService');
        $res;
        $results;
        switch ($operation) {
            case '1':
                $res = $soapPreGame->getScheduleSports(array("db" => $this->getReadDatabase()));
                $results = json_decode($res->return, true);

                break;
            case '2':
                $res = $soapPreGame->getScheduleSubSports(array("db" => $this->getReadDatabase(), "sporttype" => $sport));
                $results = json_decode($res->return, true);
                break;
            case '3':
                $res = $soapPreGame->getScheduleText(array("db" => $this->getReadDatabase(), "sporttype" => $sport, "subSport" => $subSport));
                $results = json_decode($res->return, true);
                break;
            case '4':
                $res = $soapPreGame->getSchedule(array("db" => $this->getReadDatabase(), "sporttype" => $sport, "subSport" => $subSport, "scheduleText" => $scheduleText, "date" => $scheduleDate));
                $results = json_decode($res->return, true);
                break;
        }
        return new CakeResponse(array('body' => json_encode($results['results'])));
    }

    /**
     * @author mcalderon
     * 
     * @param String $db selected data base
     * 
     * @return All sport types
     */
    public function getSports() {
        $soapPreGame = $this->getService('preGameService');
        $result = $soapPreGame->getSports(array("db" => $this->getEditDatabase()));
        $sports = json_decode($result->return, true);
        return new CakeResponse(array('body' => json_encode($sports['results'])));
    }

    /**
     * @author mcalderon
     * @description delete games by gameId
     * @param int $id gameId
     * 
     */
//    public function delete($id) {
//        $soapPreGame = $this->getService('preGameService');
//        $res = $soapPreGame->getCorrelationIDs(array("db"=>$this -> getReadDatabase()));
//        $array2=json_decode($res->return);
//        $this->set('correlationArray', $array2->results);
//        if($id!=-1){
//            $result = $soapPreGame->getGame(array("db"=>$this -> getEditDatabase(),"gameNum" => $id));
//            $array = json_decode($result->return);
//            $this->set('correlationID', $array->results->row1->CorrelationID);
//            $this->set('rotANumber', $array->results->row1->Team1RotNum);
//            $this->set('rotHNumber', $array->results->row1->Team2RotNum);
//            $this->set('disabled','readonly');
//        }else{
//            $this->set('correlationID', -1);
//            $this->set('rotANumber', " ");
//            $this->set('rotHNumber', " ");
//            $this->set('disabled','');
//        }
//    }

    /**
     * @author mcalderon
     * @param type $id gameId
     * 
     * @return TimeChangeFlag,CorrelationID,SportSubType,GameNum,ParlayRestriction,GradeDateTime,ListedPitcher2,
     * Team2Nss,ListedPitcher1,OnTV,GameDateTime,Team2RotNum,Pitcher2StartedFlag,Team2ID,Pitcher1StartedFlag,
     * WagerCutoff,Comments,CircledMaxWager,SportType,Team1Nss,Team1FinalScore,Team1RotNum,ScheduleID,Status,
     * BroadcastInfo,EventBetsFlag,FinalWinnerID,ScheduleText,Team2FinalScore,PreventPointBuyingFlag,DrawRotNum,Team1ID,TeamActionLinePos
     */
    public function edit($id) {
        $soapPreGame = $this->getService('preGameService');

        $result = $soapPreGame->getGame(array("db" => $this->getReadDatabase(), "gameNum" => $id));

        $array = json_decode($result->return, true);

        return new CakeResponse(array('body' => json_encode($array['results'])));
    }

    /**
     * @author mcalderon
     * @param int $rotANumber rotation away 
     * @param String $broadcastid
     * @param comments $comments gameId
     * @param String $gamedateval game date
     * @param String $gametimeval game time
     * @param String $wagercutoffval wager cut off
     * @param String $preventbuying prevent Buying points
     * @param String $restrictions gameId
     * @param String $status game status
     * 
     * @return 1 = Ok, 0 = not Saved
     */
    public function saveedit() {
        $rotANumber = @$_POST['rotANumber'];
        $broadcastid = @$_POST['broadcastid'];
        $comments = @$_POST['comments'];
        $gamedateval = explode("-", @$_POST['gamedateval']);
        $gametimeval = @$_POST['gametimeval'];
        $wagercutoffval = @$_POST['wagercutoffval'];
        $preventbuying = @$_POST['preventbuying'];
        $restrictions = @$_POST['restrictions'];
        $status = @$_POST['status'];
        if ($status == "")
            $status = 'O';
        $Circle = @$_POST['Circle'];

        $gameDateTime = $gamedateval[2]."-".$gamedateval[0]."-".$gamedateval[1]." ".$gametimeval;
        $gameWagerCutoff = $gamedateval[2]."-".$gamedateval[0]."-".$gamedateval[1]." ".$wagercutoffval;

        $soapPreGame = $this->getService('preGameService');
        $result = $soapPreGame->editGame(array(
            "db" => $this->getEditDatabase(),
            'gameDateTime' => $gameDateTime,
            'wagerCutOff' => $gameWagerCutoff,
            'rot1Num' => $rotANumber,
            'comments' => $comments,
            'broadcast' => $broadcastid,
            'parlayrestiction' => $restrictions,
            'preventbuying' => $preventbuying,
            'status' => $status,
            'Circle' => $Circle
                )
        );
        $results = json_decode($result->return, true);
        return new CakeResponse(array('body' => json_encode($results['results'])));
    }

    /**
     * @author mcalderon
     * @param String $sportid sport type
     * @param String $leagueidsub sport type
     * @param String $countryid schedule text
     * @param int $rotANumber 
     * @param int $teamAid Away Team Name
     * @param String $pitcher1 pitcher away for Baseball
     * @param int $rotHNumber
     * @param String $teamHid Home team name
     * @param String $pitcher2 pitcher home for baseball
     * @param int $drawRotNumber
     * @param String $broadcastid
     * @param String $comments
     * @param String $gamedateval game date
     * @param String $gametimeval game time
     * @param String $wagercutoffval wager cut off
     * @param String $preventbuying
     * @param String $restrictions
     * @param String $correlationId
     * 
     */
    public function insertgame() {
        $sportid = @$_POST['sportid'];
        $leagueid = @$_POST['leagueid'];
        if (isset($_POST['countryid']) && $_POST['countryid'] != "")
            $countryid = @$_POST['countryid'];
        else
            $countryid = "";
        $rotANumber = @$_POST['rotANumber'];
        $teamAid = @$_POST['teamAid'];
        $pitcher1 = @$_POST['pitcher1'];
        $rotHNumber = @$_POST['rotHNumber'];
        $teamHid = @$_POST['teamHid'];
        $pitcher2 = @$_POST['pitcher2'];
        $drawRotNumber = @$_POST['drawRotNumber'];
        $broadcastid = @$_POST['broadcastid'];
        $comments = @$_POST['comments'];
        $gamedateval = explode("-", @$_POST['gamedateval']);
        $gametimeval = @$_POST['gametimeval'];
        $wagercutoffval = @$_POST['wagercutoffval'];
        $preventbuying = @$_POST['preventbuying'];
        $restrictions = @$_POST['restrictions'];
        $correlationId = @$_POST['correlationid'];

        
        $gameDateTime = $gamedateval[2]."-".$gamedateval[0]."-".$gamedateval[1]." ".$gametimeval;
        $gameWagerCutoff = $gamedateval[2]."-".$gamedateval[0]."-".$gamedateval[1]." ".$wagercutoffval;

        $soapPreGame = $this->getService('preGameService');
        $result = $soapPreGame->createGame(
                array(
                    "db" => $this->getEditDatabase(),
                    'awayRotNumber' => $rotANumber,
                    'homeRotNumber' => $rotHNumber,
                    'awayTeam' => $teamAid,
                    'homeTeam' => $teamHid,
                    'sportType' => $sportid,
                    'sportSubType' => $leagueid,
                    'comments' => $comments,
                    'scheduledDate' => $gameDateTime,
                    'cutOffDate' => $gameWagerCutoff,
                    'broadcast' => $broadcastid,
                    'pitcherName1' => $pitcher1,
                    'pitcherName2' => $pitcher2,
                    'parlayRestriction' => $restrictions,
                    'draw' => $drawRotNumber,
                    'scheduleText' => $countryid,
                    'correlationid' => $correlationId,
                    'preventPointBuyingFlag' => $preventbuying));


        $this->set('return', 0);
        $this->layout = "ajax";
    }

    /**
     * @author mcalderon
     * 
     * @param int $idGame
     * @param int $periodID 
     * @param String $store 
     * 
     * @return \CakeResponse(TtlPointsNumerator1,MoneyLineDenominatorDraw,CircledMaxWagerTotal,Team2TtlPtsNumerator2,
     * Team2TtlPtsNumerator1,PeriodNumber,TtlPtsAdj1,GameTime,TtlPointsNumerator2,TtlPtsAdj2,SportSubType,
     * CircledMaxWagerSpread,MoneyLineDenominator2,CircledMaxWagerMoneyLine,WagerCutOff,Team1TtlPtsDecimal2,
     * Team1TtlPtsNumerator1,Team1TtlPtsDecimal1,Team2ID,AllowBuyOnSpread,GameDate,Team2TtlPtsDecimal1,
     * Team2TtlPtsDecimal2,MoneyLine2,Comments,MoneyLine1,Team1TtlPtsDenominator2,Team1TtlPtsDenominator1,
     * Team2TotalPoints,Team2TtlPtsAdj1,Team2TtlPtsAdj2,SpreadDecimal2,SportType,MoneyLineDecimalDraw,Spread,
     * FavoredTeamID,Team1RotNum,MoneyLineDenominator1,SpreadDecimal1,Team1TotalPoints,SpreadNumerator2,
     * SpreadNumerator1,MoneyLineDecimal2,MoneyLineDecimal1,MoneyLineDraw,Team1TtlPtsAdj2,Team1TtlPtsAdj1,
     * LineSeq,CircledMaxWagerTeamTotal,MoneyLineNumerator1,AllowBuyOnPoints,MoneyLineNumerator2,Store,
     * TotalPoints,CorrelationID,GameNum,MoneyLineNumeratorDraw,ListedPitcher2,ListedPitcher1,Team2RotNum,
     * TtlPointsDenominator2,TtlPointsDenominator1,LinkedToStoreFlag,Team1TtlPtsNumerator2,CustProfile,
     * SpreadDenominator1,PeriodDescription,Team2TtlPtsDenominator1,SpreadDenominator2,TtlPointsDecimal2,
     * Team2TtlPtsDenominator2,Status,TtlPointsDecimal1,SpreadAdj2,SpreadAdj1,ScheduleText,DrawRotNum,Team1ID)
     */
    public function getgame() {
        $idGame;
        $periodID;
        $store;
        if (isset($_POST['store']))
            $store = @$_POST['store'];
        else
            $store = "ALINE";

        if (isset($_POST['idGame']))
            $idGame = @$_POST['idGame'];
        else
            $idGame = null;


        if (isset($_POST['periodID'])) {
            $periodID = @$_POST['periodID'];
        } else {
            $periodID = "0";
        }
        $soapPreGame = $this->getService('preLineService');
        $result = $soapPreGame->getGameLines(array("db" => $this->getReadDatabase(), "gameNum" => $idGame, "periodNumber" => $periodID, "store" => $store, "sportType" => "",
            "sportSubType" => "", "scheduletext" => "", "date" => ""));

        return new CakeResponse(array('body' => $result->return));
    }

    /**
     * 
     * @param type $sportid Sport type
     * @return \CakeResponse (All subsports by the specific sport type)
     */
    public function loadleagues($sportid = "") {
        $sportid = rawurldecode($sportid);
        $sportid = str_replace("_", " ", $sportid);
        $soapPreGame = $this->getService('preGameService');
        $result = $soapPreGame->getCategoriesBySport(array("db" => $this->getReadDatabase(), "sportType" => $sportid));

        $return = json_decode($result->return);
        return new CakeResponse(array('body' => json_encode($return->results)));
    }

    public function loadcountries($sportid = "", $subsporttype = "") {
        $soapPreGame = $this->getService('preGameService');
        $result = $soapPreGame->getCountries(array("db" => $this->getEditDatabase(), "sportType" => split(',', $sportid), "sportSubType" => split(',', $subsporttype)));

        $return = json_decode($result->return);
        return new CakeResponse(array('body' => json_encode($return->results)));
    }

    /**
     * @author mcalderon
     * ajax call idem getgame Function
     * 
     */
    public function ajaxdelete() {
        $id = @$_POST['idGame'];
        $soapPreGame = $this->getService('preGameService');
        $result = $soapPreGame->getGame(array("db" => $this->getReadDatabase(), "gameNum" => $id));
        $array = json_decode($result->return);
        $jsonArray = json_encode($array->results->row1);
        return new CakeResponse(array('body' => $jsonArray));
    }

    /**
     * @author mcalderon
     * 
     * @param string $gamedateval Game Date
     * @param string $gametimeval Game Time
     * @param String $rotANumber Rotation away Team
     * 
     * @return \CakeResponse (int true or false)
     */
    public function dodelete() {
        $gametimeval = @$_POST['gametime'];
        $gamedateval = explode("-", @$_POST['gamedate']);
        $rotANumber = @$_POST['rotANumber'];
        
        $gameDateTime= $gamedateval[2]."/".$gamedateval[0]."/".$gamedateval[1]." ".$gametimeval;

        $soapPreGame = $this->getService('preGameService');
        $res = $soapPreGame->setDeleteGame(array("db" => $this->getEditDatabase(), "gameDateTime" => $gameDateTime, 'rot1Num' => $rotANumber));
        return new CakeResponse(array('body' => $res->return));
    }

    /**
     * @author mcalderon
     * 
     * @return \CakeResponse(All stores)
     */
    public function getstores() {
        $soapPreGame = $this->getService('preGameService');
        $results = $soapPreGame->getStores(array("db" => $this->getReadDatabase()));

        $array = json_decode($results->return);

        $storesString = "";

        foreach ($array->results as $value) {
            $storesString .= $value->Store . ",";
        }

        $storesString = substr($storesString, 0, -1);
        return new CakeResponse(array('body' => $storesString));
    }

    /**
     * @author mcalderon
     * 
     * @param String $sport sport
     * @param String $league sub Spor type
     * @return \CakeResponse (All periods by specific sport and subsport)
     */
    public function getperiods() {
        $sport = urldecode(@$_POST['sport']);
        $league = urldecode(@$_POST['subSport']);
        $soapPreGame = $this->getService('preGameService');
        $results = $soapPreGame->getPeriodsBySubSportType(array("db" => $this->getReadDatabase(), "sportType" => $sport, "sportSubType" => $league));
        $array = json_decode($results->return, true);


        return new CakeResponse(array('body' => json_encode($array['results'])));
    }

    /**
     * @author mcalderon
     * 
     * @param int $operacion 1-> get gameLines by sport, 2->get game lines by schedule date or text 3->get game lines by subsport
     * @param string $sport 
     * @param String $subSport sub sport type
     * @param string $date game date
     * @param string $country schedule text
     * @param string $store 
     * @param int $gameNum game number
     * @param int $period period number
     * @param string $status 
     * @return \CakeResponse (TtlPointsNumerator1,MoneyLineDenominatorDraw,CircledMaxWagerTotal,Team2TtlPtsNumerator2,
     * Team2TtlPtsNumerator1,PeriodNumberTtlPtsAdj1,GameTime,TtlPointsNumerator2,,TtlPtsAdj2,SportSubType,
     * CircledMaxWagerSpread,MoneyLineDenominator2,CircledMaxWagerMoneyLine,WagerCutOff,Team1TtlPtsDecimal2,
     * Team1TtlPtsNumerator1,Team1TtlPtsDecimal1,Team2ID,AllowBuyOnSpread,GameDate,Team2TtlPtsDecimal1,
     * Team2TtlPtsDecimal2,MoneyLine2,Comments,MoneyLine1,Team1TtlPtsDenominator2,Team1TtlPtsDenominator1,
     * Team2TotalPoints,Team2TtlPtsAdj1,Team2TtlPtsAdj2,SpreadDecimal2,SportType,MoneyLineDecimalDraw,Spread,
     * FavoredTeamID,Team1RotNum,MoneyLineDenominator1SpreadDecimal1,Team1TotalPoints,,SpreadNumerator2SpreadNumerator1,
     * MoneyLineDecimal2,MoneyLineDecimal1MoneyLineDraw,,Team1TtlPtsAdj2,Team1TtlPtsAdj1,LineSeq,CircledMaxWagerTeamTotal,
     * MoneyLineNumerator1,AllowBuyOnPoints,MoneyLineNumerator2,Store,TotalPoints,CorrelationID,GameNum,
     * MoneyLineNumeratorDrawListedPitcher2,ListedPitcher1,,Team2RotNum,TtlPointsDenominator2,
     * TtlPointsDenominator1LinkedToStoreFlag,,Team1TtlPtsNumerator2,CustProfile,SpreadDenominator1PeriodDescription,
     * Team2TtlPtsDenominator1,,SpreadDenominator2TtlPointsDecimal2,,Team2TtlPtsDenominator2Status,TtlPointsDecimal1,
     * SpreadAdj2,,SpreadAdj1,ScheduleText,DrawRotNumTeam1ID)
     */
    public function getgamelines() {
        $operacion = rawurldecode(@$_POST['operacion']);
        $sport = rawurldecode(@$_POST['sport']);
        $subSport = rawurldecode(@$_POST['subsport']);
        $date = rawurldecode(@$_POST['date']);
        $country = rawurldecode(@$_POST['country']);
        $store = @$_POST['store'];
        $gameNum = @$_POST['gameNum'];
        $period = @$_POST['period'];
        $status = @$_POST['status'];
        $soapPreGame2 = $this->getService('preLineService');
        $res = "";
        switch ($operacion) {
            case 1:
                $res = $soapPreGame2->getGamelinesBySport(array(
                    "db" => $this->getReadDatabase(),
                    "period" => $period,
                    "store" => $store,
                    "sportType" => $sport));
                break;
            case 2:
                $res = $soapPreGame2->getGamelinesBySubSport(array(
                    "db" => $this->getReadDatabase(),
                    "period" => $period,
                    "store" => $store,
                    "sportType" => $sport,
                    "subSportType" => $subSport
                ));
                break;
            case 3:
                $res = $soapPreGame2->getGamelinesByDate(array(
                    "db" => $this->getReadDatabase(),
                    "period" => $period,
                    "store" => $store,
                    "sportType" => $sport,
                    "subSportType" => $subSport,
                    "date" => $date,
                    "scheduleText" => $country,
                ));
                break;
            case 4:
                $res = $soapPreGame2->getGameLines(array(
                    "db" => $this->getReadDatabase(),
                    "gameNum" => $gameNum,
                    "periodNumber" => $period,
                    "store" => $store,
                    "sportType" => $sport,
                    "sportSubType" => $subSport,
                    "scheduletext" => $country,
                    "date" => $date,
                ));
                break;
        }

        return new CakeResponse(array('body' => $res->return));
    }

//    public function calculateComeBack(){
//        $store=@$_POST['store'];
//        $sporttype=@$_POST['sporttype'];
//        $sportSubType=@$_POST['sportSubType'];
//        $periodNumber=@$_POST['periodNumber'];
//        $wagerType=@$_POST['wagerType'];
//        $price=@$_POST['price'];
//        $type=@$_POST['type'];
//
//        $soapPreGame=$this->getService('preLineService');
//        $res = $soapPreGame->getCalcComeback(array("db"=>$this -> getReadDatabase(),"store"=>$store,"sporttype"=>$sporttype,"sportSubType"=>$sportSubType,
//            "periodNumber"=>$periodNumber,"wagerType"=>$wagerType,"price"=>$price,"type"=>$type));
//        
//        $array=  json_decode($res->return,true);
//        return new CakeResponse(array('body' => json_encode($array['results']['row1'])));
//    }

    /**
     * @author mcalderon
     * @param int $gameNum game number
     * @param String $store 
     * @param int $period period number
     * 
     * @return \CakeResponse
     */
    public function getGameInfoLine() {
        $gameNum = @$_POST['gameNum'];
        $store = @$_POST['store'];
        $period = @$_POST['period'];
        $cusprofile = @$_POST['cusprofile'];

        $soapPreGame = $this->getService('preLineService');
        $res = $soapPreGame->getGameinfoLine(array("db" => $this->getReadDatabase(),
            "gamenum" => $gameNum,
            "store" => $store,
            "periodo" => $period,
            "cusprofile" => $cusprofile));

        $result = json_decode($res->return, true);
        return new CakeResponse(array('body' => json_encode($result['results'])));
    }

    /**
     * @author mcalderon
     * 
     * @param int $periodNum period number
     * @param String $store 
     * @param int $rotationAway
     * @param int $rotationHome
     * @param int $homePoints home line
     * @param int $homePrice 
     * @param int $awayPoints away Line
     * @param int $awayPrice 
     * @param string $link 
     * @param string $gametimeval Game Time
     * @param String $gamedateval Dame Date
     * @return \CakeResponse
     */
    public function saveSpread() {
        $periodNum = @$_POST['periodNum'];
        $store = @$_POST['store'];
        $rotationAway = @$_POST['rotationAway'];
        $rotationHome = @$_POST['rotationHome'];
        $homePoints = @$_POST['homePoints'];
        $homePrice = @$_POST['homePrice'];
        $awayPoints = @$_POST['awayPoints'];
        $awayPrice = @$_POST['awayPrice'];
        $soapPreGame = $this->getService('preLineService');
        $link = @$_POST['link'];
        $cusprofile = @$_POST['cusprofile'];
        $gametimeval = @$_POST['gametimespread'];
        $gamedateval = explode("-", @$_POST['gamedatespread']);


        $gameDateTime = $gamedateval[2] . "-" . $gamedateval[0] . "-" . $gamedateval[1] . " " . $gametimeval;

        if (($awayPoints == "-" && $homePoints == "") || ($awayPoints == "" && $homePoints == "-") || ($awayPoints == "" && $homePoints == "") || ($awayPoints == "-" && $homePoints == "-")) {
            $res = $soapPreGame->setCleanSpread(array(
                "db" => $this->getEditDatabase(),
                "period" => $periodNum,
                "rot1" => $rotationAway,
                "date" => $gameDateTime,
                "store" => $store,
                "cusprofile" => $cusprofile));
        } else {
            $res = $soapPreGame->setSpreadUpdate(array("db" => $this->getEditDatabase(),
                "periodNum" => $periodNum,
                "store" => $store,
                "rotationHome" => $rotationHome,
                "rotationAway" => $rotationAway,
                "homePoints" => $homePoints,
                "homePrice" => $homePrice,
                "awayPoints" => $awayPoints,
                "awayPrice" => $awayPrice,
                "link" => $link,
                "cusprofile" => $cusprofile));
        }
        $result = json_decode($res->return, true);
        return new CakeResponse(array('body' => json_encode($result['results'])));
    }

    /**
     * @author mcalderon
     * @param int $periodNum period Number
     * @param int $rotationAway 
     * @param int $rotationHome 
     * @param int $home home price
     * @param int $away away price
     * @param int $draw draw price
     * @param String $link link to master
     * @param String $gamedateval game date
     * @param String $gametimeval game time
     * @return \CakeResponse
     */
    public function saveMoneyLine() {
        $periodNum = @$_POST['periodNum'];
        $store = @$_POST['store'];
        $rotationAway = @$_POST['rotationAway'];
        $rotationHome = @$_POST['rotationHome'];
        $home = @$_POST['home'];
        $away = @$_POST['away'];
        $draw = @$_POST['draw'];
        $link = @$_POST['link'];
        $cusprofile = @$_POST['cusprofile'];
        $gamedateval = explode("-", @$_POST['gamedateml']);
        $gametimeval = @$_POST['gametimeml'];

        $soapPreGame = $this->getService('preLineService');

        $gameDateTime = $gamedateval[2] . "-" . $gamedateval[0] . "-" . $gamedateval[1] . " " . $gametimeval;


        if ($home == "" && $away == "") {
            $res = $soapPreGame->setCleanMoney(array("db" => $this->getEditDatabase(),
                "period" => $periodNum,
                "rot1" => $rotationAway,
                "date" => $gameDateTime,
                "store" => $store,
                "cusprofile" => $cusprofile
            ));
        } else {

            $res = $soapPreGame->setMoneyLineUpdate(array("db" => $this->getEditDatabase(),
                "periodNum" => $periodNum,
                "store" => $store,
                "rotationHome" => $rotationHome,
                "rotationAway" => $rotationAway,
                "home" => $home,
                "away" => $away,
                "draw" => $draw,
                "link" => $link,
                "cusprofile" => $cusprofile));
        }



        $result = json_decode($res->return, true);
        return new CakeResponse(array('body' => json_encode($result['results'])));
    }

    /**
     * @author mcalderon
     * @param int $periodNum Period Number
     * @param String $store 
     * @param int $rotationAway
     * @param int $rotationHome
     * @param int $totalPoints 
     * @param int $totalPriceOver 
     * @param int $totalPriceUnder 
     * @param string $link link to master
     * @return \CakeResponse
     */
    public function saveTotal() {
        $periodNum = @$_POST['periodNum'];
        $store = @$_POST['store'];
        $rotationAway = @$_POST['rotationAway'];
        $rotationHome = @$_POST['rotationHome'];
        $totalPoints = @$_POST['totalPoints'];
        $totalPriceOver = @$_POST['totalPriceOver'];
        $totalPriceUnder = @$_POST['totalPriceUnder'];
        $link = @$_POST['link'];
        $cusprofile = @$_POST['cusprofile'];
        $gamedateval = explode("-", @$_POST['gamedatet']);
        $gametimeval = @$_POST['gametimet'];

        $soapPreGame = $this->getService('preLineService');

        $gameDateTime = $gamedateval[2] . "-" . $gamedateval[0] . "-" . $gamedateval[1] . " " . $gametimeval;
        if ($totalPoints == "") {
            $res = $soapPreGame->setCleanTotal(array("db" => $this->getEditDatabase(),
                "period" => $periodNum,
                "rot1" => $rotationAway,
                "date" => $gameDateTime,
                "store" => $store,
                "cusprofile" => $cusprofile
            ));
        } else {
            $res = $soapPreGame->setTotalUpdate(array("db" => $this->getEditDatabase(),
                "periodNum" => $periodNum,
                "store" => $store,
                "rotationHome" => $rotationHome,
                "rotationAway" => $rotationAway,
                "totalPoints" => $totalPoints,
                "totalPriceOver" => $totalPriceOver,
                "totalPriceUnder" => $totalPriceUnder,
                "link" => $link,
                "cusprofile" => $cusprofile));
        }




        $result = json_decode($res->return, true);
        return new CakeResponse(array('body' => json_encode($result['results'])));
    }

    /**
     * @author mcalderon
     * @param int $periodNum Period Number
     * @param String $store 
     * @param int $rotationAway
     * @param int $rotationHome
     * @param int $totalPoints 
     * @param int $totalPriceOver 
     * @param int $totalPriceUnder 
     * @param string $link link to master
     * @param int $pos If belongs to away team or home team
     * @return \CakeResponse
     */
    public function saveTeamTotal() {
        $periodNum = @$_POST['periodNum'];
        $store = @$_POST['store'];
        $rotationAway = @$_POST['rotationAway'];
        $rotationHome = @$_POST['rotationHome'];
        $totalPoints = @$_POST['totalPoints'];
        $totalPriceOver = @$_POST['totalPriceOver'];
        $totalPriceUnder = @$_POST['totalPriceUnder'];
        $pos = @$_POST['pos'];
        $link = @$_POST['link'];
        $cusprofile = @$_POST['cusprofile'];
        $gamedateval = explode("-", @$_POST['gamedateteam']);
        $gametimeval = @$_POST['gametimeteam'];
        $soapPreGame = $this->getService('preLineService');

        $gameDateTime = $gamedateval[2] . "-" . $gamedateval[0] . "-" . $gamedateval[1] . " " . $gametimeval;
        if ($totalPoints == "") {
            $res = $soapPreGame->setCleanTeam(array("db" => $this->getEditDatabase(),
                "period" => $periodNum,
                "rot1" => $rotationAway,
                "date" => $gameDateTime,
                "store" => $store,
                "pos" => $pos,
                "cusprofile" => $cusprofile
            ));
        } else {

            $res = $soapPreGame->setTeamUpdate(array("db" => $this->getEditDatabase(),
                "periodNum" => $periodNum,
                "store" => $store,
                "rotationHome" => $rotationHome,
                "rotationAway" => $rotationAway,
                "totalPoints" => $totalPoints,
                "totalPriceOver" => $totalPriceOver,
                "totalPriceUnder" => $totalPriceUnder,
                "pos" => $pos,
                "link" => $link,
                "cusprofile" => $cusprofile));
        }

        $result = json_decode($res->return, true);
        return new CakeResponse(array('body' => json_encode($result['results'])));
    }

//    public function getFutureProps($id){
//        $subsport=  rawurldecode($id);
//        $array=  json_decode($this->loadleagues($subsport), true);
//        $leaguesArray=array();
//        foreach ($array as $value){
//            $leaguesArray[]=$value['SportSubType'];
//        }
//        $leaguesArray[]=  strtoupper($id);
//        $soapPreGame=$this->getService('preGameService');
//        $res = $soapPreGame->getFutureSport(array("db"=>$this->getReadDatabase(),"ligas"=>$leaguesArray));
//        $result=  json_decode($res->return,true);
//        return $result['results'];
//    }

    /**
     * @author mcalderon
     * @param string $correlation 
     * @return \CakeResponse (ContestType3,ContestType2,ContestDesc,Store,ContestantNum,RotNum,DecimalODDS,
     * ContestType,Numerator,Status,ContestantName,Denominator,MoneyLine,ThresholdType,ThresholdUnits,
     * WagerCutoff,ThresholdLine,ToBase,CustProfile,ContestNum)
     */
    public function getProps() {
        $correlation = rawurldecode(@$_POST['correlation']);
        $soapPreGame = $this->getService('preLineService');
        $res = $soapPreGame->getProps(array("db" => $this->getReadDatabase(), "corralation" => $correlation));
        $res2 = $soapPreGame->getPropsFile(array("db" => $this->getReadDatabase(), "corralation" => $correlation));

        $result = json_decode($res->return, true);
        $results2 = json_decode($res2->return, true);

        $fullArray = array();
        foreach ($result['results'] as $value) {
            $fullArray[] = $value;
        }
        foreach ($results2['results'] as $value) {
            $fullArray[] = $value;
        }
        return new CakeResponse(array('body' => json_encode($fullArray)));
    }

    /**
     * @author mcalderon
     * @param string $ContestType2
     * @param String $correlation
     * @param JSON $res (ContestType3,ContestType2,ContestDesc,Store,ContestantNum,RotNum,DecimalODDS,ContestType,Numerator,Status,ContestantName,Denominator,MoneyLine,ThresholdType,ThresholdUnits,WagerCutoff,ThresholdLine,ToBase,CustProfile,ContestNum)
     * @param JSON $res2 (ContestType3,ContestType2,ContestDesc,Store,ContestantNum,RotNum,DecimalODDS,ContestType,Numerator,Status,ContestantName,Denominator,MoneyLine,ThresholdType,ThresholdUnits,WagerCutoff,ThresholdLine,ToBase,CustProfile,ContestNum)
     * @return \CakeResponse array($res,$res2)
     */
    public function getPropsFolderL2() {
        $ContestType2 = rawurldecode(@$_POST['ContestType2']);
        $correlation = rawurldecode(@$_POST['correlation']);
        $soapPreGame = $this->getService('preLineService');
        $res = $soapPreGame->getProps2L(array("db" => $this->getReadDatabase(), "corralation" => $correlation, "firthlevel" => $ContestType2));
        $res2 = $soapPreGame->getPropsFile2L(array("db" => $this->getReadDatabase(), "corralation" => $correlation, "firthlevel" => $ContestType2));

        $result = json_decode($res->return, true);
        $results2 = json_decode($res2->return, true);

        $fullArray = array();
        foreach ($result['results'] as $value) {
            $fullArray[] = $value;
        }
        foreach ($results2['results'] as $value) {
            $fullArray[] = $value;
        }
        return new CakeResponse(array('body' => json_encode($fullArray)));
    }

    /**
     * @author mcalderon
     * @param String $ContestType2 
     * @param String $ContestType3
     * @param String $correlation
     * 
     * @return \CakeResponse (ContestType3,ContestType2,ContestDesc,Store,ContestantNum,RotNum,DecimalODDS,
     * ContestType,Numerator,Status,ContestantName,Denominator,MoneyLine,ThresholdType,ThresholdUnits,
     * WagerCutoff,ThresholdLine,ToBase,CustProfile,ContestNum)
     */
    public function getProps3L() {
        $ContestType2 = rawurldecode(@$_POST['ContestType2']);
        $ContestType3 = rawurldecode(@$_POST['ContestType3']);
        $correlation = rawurldecode(@$_POST['correlation']);
        $soapPreGame = $this->getService('preLineService');
        $res = $soapPreGame->getProps3L(array("db" => $this->getReadDatabase(), "corralation" => $correlation, "firthlevel" => $ContestType2, "secondlevel" => $ContestType3));

        $result = json_decode($res->return, true);

        return new CakeResponse(array('body' => json_encode($result['results'])));
    }

    /**
     * @author mcalderon
     * @param int $operacion
     * @param string $correlation
     * @param string $firstLevel ContestType
     * @param String $secondLevel ContestType2
     * @param String $thirdLevel contestType3
     * @param int $contestNum contest Number
     * @param String $store 
     * 
     * @return Operacion 1 = lineas de todos los props asociados al contesttype1
     *         Operacion 2 = lineas de todos los props asociados al contesttype1 y contesttype2
     *         Operacion 3 = lineas de todos los props asociados al contesttype1, contesttype2 y contesttype3
     *         Operacion 4 = lineas de un prop especifico
     */
    public function getPropLine() {
        $gameDatePost = @$_POST['gameDate'];
        $gameDate = null;
        if ($gameDatePost != null) {
            $Arr = explode("/", $gameDatePost);
            $gameDate = "20" . $Arr[2] . "-" . $Arr[0] . "-" . $Arr[1];
        }
        $correlation = rawurldecode(@$_POST['correlation']);
        $ContestType2 = rawurldecode(@$_POST['ContestType2']);
        $ContestType3 = rawurldecode(@$_POST['contestType3']);
        $contestNum = @$_POST['contestNum'];
        $store = @$_POST['store'];
        $option = 1;
        if ($contestNum != null) {
            $option = 4;
        } else if ($ContestType2 != null && $ContestType3 != null) {
            $option = 3;
        } else if ($ContestType2 != null) {
            $option = 2;
        }

        $soapPreGame = $this->getService('preLineService');
        $res = $soapPreGame->getPropsline(array("db" => $this->getReadDatabase(),
            "corralation" => $correlation,
            "ContestType2" => $ContestType2,
            "ContestType3" => $ContestType3,
            "ContestNum" => $contestNum,
            "Store" => $store,
            "gameDate" => $gameDate,
            "option" => $option));
        $results = json_decode($res->return, true);

        return new CakeResponse(array('body' => json_encode($results['results'])));
    }

    public function getFuturePropLines() {
        $ContestType = rawurldecode(@$_POST['ct']);
        $ContestType2 = rawurldecode(@$_POST['ct2']);
        $ContestType3 = rawurldecode(@$_POST['ct3']);
        $contestNum = @$_POST['contestNum'];
        $store = @$_POST['store'];
        $option = 1;
        if ($contestNum != null) {
            $option = 4;
        } else if ($ContestType2 != null && $ContestType3 != null) {
            $option = 3;
        } else if ($ContestType2 != null) {
            $option = 2;
        }

        $soapPreGame = $this->getService('preLineService');
        $res = $soapPreGame->getPropsFutureline(array("db" => $this->getReadDatabase(),
            "ContestType" => $ContestType,
            "ContestType2" => $ContestType2,
            "ContestType3" => $ContestType3,
            "ContestNum" => $contestNum,
            "Store" => $store,
            "option" => $option));
        $results = json_decode($res->return, true);

        return new CakeResponse(array('body' => json_encode($results['results'])));
    }

    /**
     * @author mcalderon
     * @return array(correlationId's)
     */
    public function getCorrelacionIds() {
        $soapPreGame = $this->getService('preGameService');
        $res = $soapPreGame->getCorrelationIDs(array("db" => $this->getReadDatabase()));

        $result = json_decode($res->return, true);
        return new CakeResponse(array('body' => json_encode($result['results'])));
    }

    /**
     * 
     * @param type $gameNum
     * @return correationId asociado al game number
     */
    public function getGameCorrelation($gameNum) {
        $soapPreGame = $this->getService('preGameService');
        $res = $soapPreGame->getGame(array("db" => $this->getReadDatabase(), "gameNum" => $gameNum));

        $result = json_decode($res->return, true);
        return new CakeResponse(array('body' => json_encode(trim($result['results']['row1']['CorrelationID']))));
    }

    /**
     * @author mcalderon
     * @param String $contesttype
     * @param String $contesttype2
     * @param String $contesttype3 
     * @param String $contestDesc contest Description
     * @param String $profile Cust Profile
     * @param int $rot1 rotation away
     * @param String $store 
     * @param int $odds price for prop line
     * @param int $line prop line
     * @param String $status (offline, active, circled)
     * @param int $circle circle value
     * @param int $maxwager maximun wager value
     * @param int $rot2 rotation Home
     * @param int $odd2 
     * @param String $type wager type
     * @return \CakeResponse
     */
    public function setPropLine() {
        $contestType = @$_POST['contestType'];
        $contestType2 = @$_POST['contestType2'];
        $contestType3 = @$_POST['contestType3'];
        $contestDesc = @$_POST['contestDesc'];
        $profile = @$_POST['profile'];
        $rot1 = @$_POST['rot1'];
        $store = @$_POST['store'];
        $odds = @$_POST['odds'];
        $line = @$_POST['line'];

        $status = @$_POST['status'];
        $circle = @$_POST['circle'];
        $maxwayer = @$_POST['maxwayer'];
        $rot2 = @$_POST['rot2'];
        $odd2 = @$_POST['odd2'];
        $type = @$_POST['type'];
        $soapPreGame = $this->getService('preLineService');
        $res = $soapPreGame->setPropsline(array("db" => $this->getEditDatabase(),
            "contestType" => $contestType,
            "contestType2" => $contestType2,
            "contestType3" => $contestType3,
            "contestDesc" => $contestDesc,
            "profile" => $profile,
            "rot1" => $rot1,
            "store" => $store,
            "odds" => $odds,
            "line" => $line,
            "status" => $status,
            "circle" => $circle,
            "maxwayer" => $maxwayer,
            "rot2" => $rot2,
            "odd2" => $odd2,
            "type" => $type
        ));

        $result = json_decode($res->return, true);

        return new CakeResponse(array('body' => json_encode($result['results'])));
    }

    /**
     * @author mcalderon
     * @param int $rot rotation away
     * @param String $status (offline, active, circled)
     * @param String $type wager Type
     * @param String $gametimeval Game time
     * @param String $gamedateval Game Date
     * @return \CakeResponse
     */
    public function updategamestatus() {
        $rot = @$_POST['rot1'];
        $status = @$_POST['status'];
        $circled = @$_POST['circle'];
        $type = @$_POST['type'];
        $gametimeval = @$_POST['contestTime'];
        $gamedateval = @$_POST['contestDate'];
        //CAMBIAR FORMATO FECHA A STRING
        $gameDateTime = date_parse_from_format("m-d-Y H:i", $gamedateval . " " . $gametimeval);
        $gameDateTime = mktime($gameDateTime['hour'], $gameDateTime['minute'], $gameDateTime['second'], $gameDateTime['month'], $gameDateTime['day'], $gameDateTime['year']);
        $comments = @$_POST['comments'];
        $soapPreGame = $this->getService('preLineService');
        $res = $soapPreGame->setGameStatus(array("db" => $this->getEditDatabase(),
            "rot1" => $rot,
            "status" => $status,
            "circle" => $circled,
            "type" => $type,
            "comments" => $comments,
            "gamedate" => $gameDateTime));

        $result = json_decode($res->return, true);
        return new CakeResponse(array('body' => json_encode($result['results'])));
    }

    /**
     * @author mcalderon
     * @param int $rot rot away number
     * @param int $minute 
     * @return \CakeResponse
     */
    public function updatekeepopen() {
        $rot = @$_POST['rotationNumber'];
        $minute = @$_POST['minute'];
        $periodNum = @$_POST['periodNum'];
        $soapPreGame = $this->getService('preLineService');
        $res = $soapPreGame->setKeepOpen(array("db" => $this->getEditDatabase(),
            "rotationNumber" => $rot,
            "minute" => $minute,
            "periodNum" => $periodNum));

        $result = json_decode($res->return, true);
        return new CakeResponse(array('body' => json_encode($result['results'])));
    }

    public function setselecteddb($selected) {
        $this->Session->write("selectedDB", $selected);
        return new CakeResponse(array('body' => 1));
    }

    /**
     * @author mcalderon
     * @param String $store 
     * @param String $sportType 
     * @param String $sportSubType 
     * @param int $periodNumber 
     * @param String $wagerType 
     * 
     * @return \CakeResponse array(CentsDifference,EndingPrice,StartingPrice)
     */
    public function findPriceOffering() {
        $store = @$_POST['store'];
        $sportType = @$_POST['sportType'];
        $sportSubType = @$_POST['sportSubType'];
        $periodNumber = @$_POST['periodNumber'];
        $wagerType = @$_POST['wagerType'];

        $soapPreGame = $this->getService('storeService');
        $res = $soapPreGame->findPriceOfferingBychart(array(
            "db" => $this->getReadDatabase(),
            "store" => $store,
            "sportType" => $sportType,
            "sportSubType" => $sportSubType,
            "periodNumber" => $periodNumber,
            "wagerType" => $wagerType));

        $result = json_decode($res->return, true);
        return new CakeResponse(array('body' => json_encode($result['results'])));
    }

    /**
     * @author mcalderon
     * @param string $ct 
     * @param array $array subsport Array
     * @return \CakeResponse (ContestType3,ContestType2,ContestDesc,Store,ContestantNum,RotNum,DecimalODDS,
     * ContestType,Numerator,Status,ContestantName,Denominator,MoneyLine,ThresholdType,ThresholdUnits,
     * WagerCutoff,ThresholdLine,ToBase,CustProfile,ContestNum)
     */
    public function getFutureProps() {
        $ct = urldecode(@$_POST['ct']);
        $ct2 = urldecode(@$_POST['ct2']);
        $ct3 = urldecode(@$_POST['ct3']);
        $op = urldecode(@$_POST['op']);
        $store = urldecode(@$_POST['store']);

        $soapPreGame = $this->getService('preGameService');
        $res = $soapPreGame->getFutureProps(array("db" => $this->getReadDatabase(), "ct" => $ct, "ct2" => $ct2, "ct3" => $ct3, "op" => $op, "store" => $store));

        $props = json_decode($res->return, true);

        return new CakeResponse(array('body' => json_encode($props['results'])));
    }

       /**
     * @author mcalderon
     * @param int $gamenum 
     * @param int $periodnum period Number
     * @param String $store
     * @param String $wagerType P = parlay, T = Teaser, I = ifbets, S = straigh bets
     * @param String $wagertype2 S = Spread, M = MoneyLine, L = Total, E = Team Total
     * @param int $totalpicks Total of teams choosen in Parlay or Teaser
     * @return \CakeResponse (RifNoActionFlag,PercentBook,Store,WagerNumber,RifBackwardWagerNumber,TotalPointsOU,
     * FinalMoney,PostedDateTime,CurrencyCode,AgentID,WagerType,VolumeAmount,RifBackwardTicketNumber,FinalDecimal,
     * FinalDenominator,AdjTotalPoints,FinalNumerator,CustomerID,TotalPicks,ItemNumber,,ChosenTeamID,
     * LayoffFlag,AdjSpread,TicketNumber)
     */
    public function getWagerCoverageByThreshold() {
        $gamenum = $_POST["GameNum"];
        $periodnum = $_POST["periodNumber"];
        $wagertype1 = $_POST["WagerType"];
        $wagertype2 = $_POST["DetailWager"];
        $totalpicks = $_POST["Team"];
        $store = $_POST["store"];

        $soapPreGame = $this->getService('wagerCoverage');
        $res = $soapPreGame->getWagerCoverageByThreshold(array("db" => $this->getReadDatabase(),
            "GameNum" => $gamenum,
            "periodNumber" => $periodnum,
            "WagerType" => $wagertype1,
            "DetailWager" => $wagertype2,
            "Team" => $totalpicks,
            "store" => $store));

        $array = json_decode($res->return, true);

        return new CakeResponse(array('body' => json_encode($array['results'])));
    }

    /**
     * @author mcalderon
     * @param int $gamenum 
     * @param int $periodnum 
     * @param String $store 
     * @param String $wagerType P = parlay, T = Teaser, I = ifbets, S = straigh bets
     * @param String $wagertype2 S = Spread, M = MoneyLine, L = Total, E = Team Total
     * @param int $totalpicks Total of teams choosen in Parlay or Teaser
     * @param String $homeTeam 
     * @param String $homeAwayTeam 
     * @return \CakeResponse (Cleveland_Cavaliers_line,Cleveland_Cavaliers,Miami_Heat_line,Miami_Heat)
     */
    public function getWagerCoverageDetail() {
        $gamenum = $_POST["GameNum"];
        $periodnum = $_POST["periodNumber"];
        $wagertype1 = $_POST["WagerType"];
        $wagertype2 = $_POST["DetailWager"];
        $totalpicks = $_POST["Team"];
        $store = $_POST["store"];

        $soapPreGame = $this->getService('wagerCoverage');
        $res = $soapPreGame->getWagerCoverageDetail(array("db" => $this->getReadDatabase(),
            "GameNum" => $gamenum,
            "periodNumber" => $periodnum,
            "WagerType" => $wagertype1,
            "DetailWager" => $wagertype2,
            "Team" => $totalpicks,
            "store" => $store));

        $array = json_decode($res->return, true);

        return new CakeResponse(array('body' => json_encode($array['results'])));
    }

    /**
     * @author mcalderon
     * @param int $ticket 
     * @param String $wager 
     * @return (Period,BetType,Description,AwayTeamScore,Acct,Type,DocumentNumber,Lost,Total_Ticket,TicketWriter,
     * PostedDateTime,Outcome,HomeTeamScore,CurrencyCode,Won,AgentID,Status,Paid,,Risk,Ties,GameDateTime,innerID,
     * ToWin,TicketNumber)
     */
    public function getwagerdetail() {
        $tikect = $_POST["ticket"];
        $wager = $_POST["wager"];

        $soapPreGame = $this->getService('wagerCoverage');
        $res = $soapPreGame->getWagerDetails(array("db" => $this->getReadDatabase(),
            "ticketNum" => $tikect,
            "wagerNum" => $wager));

        $array = json_decode($res->return, true);

        return new CakeResponse(array('body' => json_encode($array['results'])));
    }

    /**
     * @author mcalderon
     * @param String $store 
     * @param int $gamenum 
     * @param String $wagertype 
     * @return \CakeResponse (NewLine,ChangedBy,WagerCount,Volume,LS Group/Link,EffectiveASOf,WagerCutoff)
     */
    public function getlinehistory() {
        $store = $_POST["store"];
        $gamenum = $_POST["gamenum"];
        $wagertype;
        switch ($_POST["wagertype"]) {
            case 'spread':
                $wagertype = 'S';
                break;
            case 'moneyline':
                $wagertype = 'M';
                break;
            case 'total':
                $wagertype = 'L';
                break;
        }
        $periodnum = $_POST["periodnum"];
        $option = $_POST["option"];
        $soapPreGame = $this->getService('lineHistoryService');
        $res = $soapPreGame->getLinesHistory(array("db" => "Casablanca_Euro",
            "store" => $store,
            "gamenum" => $gamenum,
            "wagertype" => $wagertype,
            "periodnum" => $periodnum,
            "option" => $option,
            "appid" => "admin",
            "userid" => "abc"));

        $array = json_decode($res->return, true);

        return new CakeResponse(array('body' => json_encode($array['results'])));
    }

    public function getShadesByStore() {
        $store = @$_POST["store"];
        $soapPreGame = $this->getService('preLineService');
        $res = $soapPreGame->getShades(array("db" => $this->getReadDatabase(),
            "store" => $store));

        $array = json_decode($res->return, true);
        return new CakeResponse(array('body' => json_encode($array['results'])));
    }

    public function getInfolinebyCustProfile() {
        $gamenum = @$_POST["gamenum"];
        $store = @$_POST["store"];
        $periodo = @$_POST["periodo"];
        $cusprofile = @$_POST["cusprofile"];
        $soapPreGame = $this->getService('preLineService');
        $res = $soapPreGame->getInfoLineCuspro(array("db" => $this->getReadDatabase(),
            "gamenum" => $gamenum,
            "store" => $store,
            "periodo" => $periodo,
            "cusprofile" => $cusprofile));

        $array = json_decode($res->return, true);
        return new CakeResponse(array('body' => json_encode($array['results'])));
    }

    public function deleteShadeFromGame() {
        $gamenum = @$_POST["gamenum"];
        $cusprofile = @$_POST["cusprofile"];
        $store = @$_POST["store"];
        $soapPreGame = $this->getService('preLineService');
        $res = $soapPreGame->deleteShadeFromGame(array("db" => $this->getReadDatabase(),
            "gamenum" => $gamenum,
            "shadeName" => $cusprofile,
            "store" => $store));

        $array = json_decode($res->return, true);
        return new CakeResponse(array('body' => json_encode($array['results'])));
    }

    public function openGame() {
        $status = @$_POST['status'] == "" ? null : @$_POST['status'];
        $AwayRotNum = @$_POST['AwayRotNum'] == "" ? null : @$_POST['AwayRotNum'];
        $date = @$_POST['gameDate'] == "" ? null : @$_POST['gameDate'];
        $type = @$_POST['type'];
        $sportType = @$_POST['sportType'] == "" ? null : @$_POST['sportType'];
        $ScheduleDate = @$_POST['ScheduleDate'] == "" ? null : @$_POST['ScheduleDate'];
        $ScheduleText = @$_POST['ScheduleText'] == "" ? null : @$_POST['ScheduleText'];
        $SportSubType = @$_POST['SportSubType'] == "" ? null : @$_POST['SportSubType'];
        if ($type == 1) {
            $dataArray = split("/", $date);
            $gameDateTime = "20" . $dataArray[2] . "-" . $dataArray[0] . "-" . $dataArray[1];
        } else {
            $gameDateTime = null;
        }
        $soapPreGame = $this->getService('preGameService');
        $res = $soapPreGame->openGame(array("db" => $this->getEditDatabase(),
            "AwayRotNum" => $AwayRotNum,
            "gameDate" => $gameDateTime,
            "status" => $status,
            "type" => $type,
            "sportType" => $sportType,
            "ScheduleDate" => $ScheduleDate,
            "ScheduleText" => $ScheduleText,
            "SportSubType" => $SportSubType));

        $array = json_decode($res->return, true);
        return new CakeResponse(array('body' => json_encode($array['results'])));
    }

    public function openMassiveGame() {
        $gamenums = @$_POST['gameNums'];

        $soapPreGame = $this->getService('preGameService');

        foreach ($gamenums as $gameNum) {
            $res = $soapPreGame->openGame(array("db" => $this->getEditDatabase(),
                "gamenum" => $gameNum,
                "status" => "O"));
        }
        return new CakeResponse(array('body' => 1));
    }

    public function openAllProps() {
        $correlation = @$_POST["correlation"];
        $gameDate = explode("/", @$_POST["gamedate"]);
        $ct2 = @$_POST["ContestType2"];
        $ct3 = @$_POST["ContestType3"];
        $status = @$_POST["Status"];

        $option = 1;
        if ($ct3 != null && $ct2 != null) {
            $option = 3;
        } else if ($ct2 != null) {
            $option = 2;
        }
        $soapPreGame = $this->getService('preGameService');
        $response = $soapPreGame->openAllProps(array("db" => $this->getEditDatabase(),
            "correlation" => $correlation,
            "gameDate" => "20" . $gameDate[2] . "/" . $gameDate[0] . "/" . $gameDate[1],
            "ContestType2" => $ct2,
            "ContestType3" => $ct3,
            "Status" => $status,
            "Option" => $option));

        return new CakeResponse(array('body' => $response->return));
    }

    public function openAllFutureProps() {
        $sport = @$_POST["sport"];
        $ct2 = @$_POST["ContestType2"];
        $ct3 = @$_POST["ContestType3"];
        $status = @$_POST["Status"];

        $option = 1;
        if ($ct3 != null && $ct2 != null) {
            $option = 3;
        } else if ($ct2 != null) {
            $option = 2;
        }
        $soapPreGame = $this->getService('preGameService');
        $response = $soapPreGame->openAllFutureProps(array("db" => $this->getEditDatabase(),
            "ContestType" => "Futures -" . $sport,
            "ContestType2" => $ct2,
            "ContestType3" => $ct3,
            "Status" => $status,
            "Option" => $option));

        return new CakeResponse(array('body' => $response->return));
    }

    public function pauseGame() {
        $rotNum = @$_POST["rotNum"];
        $option = @$_POST["option"];
        if ($option == 1) {
            $this->setGamesPause(null,$rotNum, null, null, null, 'S');
            $this->setGamesPause(null,$rotNum, null, null, null, 'M');
            $this->setGamesPause(null,$rotNum, null, null, null, 'T');
            $this->setGamesPause(null,$rotNum, null, null, null, 'L');
        } else {
            $this->setGamesUnpause(null,$rotNum, null, null, null, 'S');
            $this->setGamesUnpause(null,$rotNum, null, null, null, 'M');
            $this->setGamesUnpause(null,$rotNum, null, null, null, 'T');
            $this->setGamesUnpause(null,$rotNum, null, null, null, 'L');
        }
        return new CakeResponse(array('body' => 0));
    }

    public function pauseLine() {
        $rotNum = @$_POST["rotNum"];
        $period = @$_POST["period"];
        $lineType = @$_POST["lineType"];
        $option = @$_POST["option"];
        if ($option == 1)
            $this->setGamesPause(null,$rotNum, null, null, $period, $lineType);
        else
            $this->setGamesUnpause(null,$rotNum, null, null, $period, $lineType);
        return new CakeResponse(array('body' => 0));
    }

    private function setGamesPause($dbs,$rotNum, $sport, $subSport, $period, $wagerType) {
        $soapPreGame = $this->getService('preLineService');
        $db=($dbs==null?$this->getEditDatabase():$dbs);
        $response = $soapPreGame->setGamesPause(array("db" =>$db ,
            "rotNum" => $rotNum,
            "sport" => $sport,
            "subSport" => $subSport,
            "period" => $period,
            "wagerType" => $wagerType,
            "option" => 1));
    }

    private function setGamesUnpause($dbs,$rotNum, $sport, $subSport, $period, $wagerType) {
        $soapPreGame = $this->getService('preLineService');
        $db=($dbs==null?$this->getEditDatabase():$dbs);
        $response = $soapPreGame->setGamesPause(array("db" =>$db ,
            "rotNum" => $rotNum,
            "sport" => $sport,
            "subSport" => $subSport,
            "period" => $period,
            "wagerType" => $wagerType,
            "option" => 0));
    }
    
    public function loadAllPauses() {
        $soapPreGame = $this->getService('preLineService');
        $result = $soapPreGame->setGamesPause(array("db" => $this->getEditDatabase(),
            "rotNum" => null,
            "sport" => null,
            "subSport" => null,
            "period" => null,
            "wagerType" => null,
            "option" => 2));
        
        $pauses = json_decode($result->return, true);
        return new CakeResponse(array('body' => json_encode($pauses["results"])));
    }
    
    
    public function loadPauses() {
        $rot = @$_POST["rotNum"];
        $sport = @$_POST["sport"];
        $subSport = @$_POST["subSport"];

        $option = 1;
        if ($rot != null) {
            $option = 3;
        } else if ($subSport != null) {
            $option = 2;
        }
        $soapPreGame = $this->getService('preLineService');
        $response = $soapPreGame->getGamePauses(array("db" => $this->getEditDatabase(),
            "rotNum" => $rot,
            "sport" => $sport,
            "subSport" => $subSport,
            "option" => $option));
        return new CakeResponse(array('body' => $response->return));
    }

    public function pauses() {
        $periods=array("0"=>"Game","1"=>"1st Half","2"=>"2nd Half","3"=>"1st Quarter","4"=>"2nd Quarter","5"=>"3rd Quarter","6"=>"4th Quarter");
        $lineTypes=array("S"=>"Spread","M"=>"Money Line","T"=>"Total","L"=>"Team Total");
        $soapPreGame = $this->getService('preGameService');
        $result = $soapPreGame->getScheduleSports(array("db" => $this->getReadDatabase()));
        $sports = json_decode($result->return, true);

        $soapPreGame = $this->getService('preLineService');
        $result = $soapPreGame->setGamesPause(array("db" => $this->getEditDatabase(),
            "rotNum" => null,
            "sport" => null,
            "subSport" => null,
            "period" => null,
            "wagerType" => null,
            "option" => 2));
        
        $pauses = json_decode($result->return, true);
        $this->set("dbs",explode(",",$this->getDatabases()));
        $this->set('periods', $periods);
        $this->set('lineTypes', $lineTypes);
        $this->set('pauses', $pauses['results']);
        $this->set('sports', $sports['results']);
    }

    public function actionPause() {
        $rotNum = @$_POST["rotNum"] == "" ? null : @$_POST["rotNum"];
        $sport = @$_POST["sport"] == "" ? null : @$_POST["sport"];
        $subSport = @$_POST["subSport"] == "" ? null : @$_POST["subSport"];
        $period = @$_POST["period"] == "" ? null : @$_POST["period"];
        $lineType = @$_POST["lineType"] == "" ? null : @$_POST["lineType"];
        $dbs = @$_POST["dbs"];
        $option = @$_POST["option"];
        if ($option == 1) {
            $this->setGamesPause($dbs,$rotNum, $sport, $subSport, $period, $lineType);
        } else {
            $this->setGamesUnpause($dbs,$rotNum, $sport, $subSport, $period, $lineType);
        }

        return new CakeResponse(array('body' => 0));
    }

}
