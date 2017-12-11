<?php

App::uses('AppController', 'Controller');

/**
 * Static content controller
 *
 * Override this controller by placing a copy in controllers directory of an application
 *
 * @package       app.Controller
 * @link http://book.cakephp.org/2.0/en/controllers/pages-controller.html
 */
class PropsController extends AppController {

    public function index() {
        
    }

    public function create_ext() {
        
    }

    public function create() {
        $contestType = rawurldecode(@$_POST['contestType']);
        if ($contestType === "")
            $contestType = ".";
        $contestType2 = rawurldecode(@$_POST['contestType2']);
        if ($contestType2 === "")
            $contestType2 = ".";
        $contestType3 = rawurldecode(@$_POST['contestType3']);
        if ($contestType3 === "")
            $contestType3 = ".";
        $contestDesc = rawurldecode(@$_POST['contestDesc']);
        $contestDate = rawurldecode(@$_POST['contestDate']);
        $contestTime = rawurldecode(@$_POST['contestTime']);
        $contestCutOff = rawurldecode(@$_POST['contestCutOff']);

        if ($contestCutOff == "") {
            $contestCutOff = $contestTime;
        }
        $comments = rawurldecode(@$_POST['comments']);
        $unit = rawurldecode(@$_POST['unit']);
        $contestantString = rawurldecode(@$_POST['contestants']);

        $contestantArray = split("/", substr($contestantString, 0, -1));
        $contestants = array();
        foreach ($contestantArray as $value) {
            $contestant = split("_", $value);
            $contestants[] = array($contestant[0], $contestant[1]);
        }
        $type = rawurldecode(@$_POST['type']);
        $correlationID = rawurldecode(@$_POST['correlationID']);


        $contestDateTime = date_parse_from_format("m-d-Y H:i", $contestDate . " " . $contestTime);
        $contestDateTime = mktime($contestDateTime['hour'], $contestDateTime['minute'], $contestDateTime['second'], $contestDateTime['month'], $contestDateTime['day'], $contestDateTime['year']);

        $contestCutOffDateTime = date_parse_from_format("m-d-Y H:i", $contestDate . " " . $contestCutOff);
        $contestCutOffDateTime = mktime($contestCutOffDateTime['hour'], $contestCutOffDateTime['minute'], $contestCutOffDateTime['second'], $contestCutOffDateTime['month'], $contestCutOffDateTime['day'], $contestCutOffDateTime['year']);

        $soapPreGame = $this->getService('preLineService');
        $result = $soapPreGame->setProps(array("db" => $this->getEditDatabase(),
            "contestType" => $contestType,
            "contestType2" => $contestType2,
            "contestType3" => $contestType3,
            "contestDesc" => $contestDesc,
            "contestDate" => $contestDateTime,
            "contestCutOff" => $contestDateTime,
            "xtolinerep" => 'N',
            "comments" => $comments,
            "unit" => $unit,
            "type" => $type,
            "firstRotNum" => $contestants[0][0],
            "correlationID" => $correlationID));

        $array = json_decode($result->return, true);
        $contestantNum = $array['results']['row1']['ContestNum'];


        foreach ($contestants as $value) {
            $result2 = $soapPreGame->setPropsCostest(array(
                "db" => $this->getEditDatabase(),
                "contestType" => $contestType,
                "contestType2" => $contestType2,
                "contestType3" => $contestType3,
                "contestDesc" => $contestDesc,
                "rotNum" => $value[0],
                "contestantName" => $value[1]));
        }

        return new CakeResponse(array('body' => $array['results'] === -1 ? -1 : 1));
    }

    public function delete() {
        $soapPreGame = $this->getService('preLineService');

        $contestType = rawurldecode(@$_POST['contestType']);
        if ($contestType == "")
            $contestType = ".";

        $substr = substr($contestType, 0, 1);
        if ($substr != ".")
            $contestType = "." . $contestType;

        $contestType2 = rawurldecode(@$_POST['contestType2']);
        if ($contestType2 === "")
            $contestType2 = ".";
        $contestType3 = rawurldecode(@$_POST['contestType3']);
        if ($contestType3 === "")
            $contestType3 = ".";
        $contestDesc = rawurldecode(@$_POST['contestDesc']);


        $res = $soapPreGame->getHavePropsLine(array("db" => $this->getEditDatabase(),
            "contestType" => rawurldecode($contestType),
            "contestType2" => rawurldecode($contestType2),
            "contestType3" => rawurldecode($contestType3),
            "contestdesc" => $contestDesc));
        $results = json_decode($res->return, true);
        if ($results['results'] == 0) {
            $result = $soapPreGame->setPropsDelete(array("db" => $this->getEditDatabase(),
                "contestType" => rawurldecode($contestType),
                "contestType2" => rawurldecode($contestType2),
                "contestType3" => rawurldecode($contestType3),
                "contestDesc" => rawurldecode($contestDesc)));
            $array = json_decode($result->return, true);
            return new CakeResponse(array('body' => $array['results']));
        } else if ($results['results'] > 0) {
            return new CakeResponse(array('body' => -2)); //Tiene Apuestas
        } else {
            return new CakeResponse(array('body' => -3)); //Error en la ejecucion
        }
    }

    public function edit() {
        $contestNum = rawurldecode(@$_POST['contestNum']);
        $correlation = rawurldecode(@$_POST['correlation']);
        $store = @$_POST['store'];
        $correlationID = rawurldecode($correlation);
        $soapPreGame = $this->getService('preLineService');
        $res = $soapPreGame->getPropsdetail(array("db" => $this->getReadDatabase(), "contestNum" => $contestNum, "store" => $store));
        $array = json_decode($res->return, true);

        return new CakeResponse(array('body' => json_encode($array['results'])));
    }

    public function isPropBets() {
        $contestType = @$_POST['contestType'];
        $contestType2 = @$_POST['contestType2'];
        $contestType3 = @$_POST['contestType3'];
        $contestdesc = @$_POST['contestdesc'];
        $soapPreGame = $this->getService('preLineService');
        $res = $soapPreGame->getHavePropsLine(array("db" => $this->getEditDatabase(),
            "contestType" => $contestType,
            "contestType2" => $contestType2,
            "contestType3" => $contestType3,
            "contestdesc" => $contestdesc));

        $array = json_decode($res->return, true);

        return new CakeResponse(array('body' => json_encode($array['results'])));
    }

    public function saveedit() {
        $contestType = rawurldecode(@$_POST['contestType']);
        if ($contestType == "")
            $contestType = ".";
        $contestType2 = rawurldecode(@$_POST['contestType2']);
        if ($contestType2 == "")
            $contestType2 = ".";
        $contestType3 = rawurldecode(@$_POST['contestType3']);
        if ($contestType3 == "")
            $contestType3 = ".";
        $contestDesc = rawurldecode(@$_POST['contestDesc']);
        $oldContestDesc = rawurldecode(@$_POST['oldContestDesc']);
        $contestDate = rawurldecode(@$_POST['contestDate']);
        $contestTime = rawurldecode(@$_POST['contestTime']);
        $contestCutOff = rawurldecode(@$_POST['contestCutOff']);
        $currentContestants = @$_POST['currentContestants'];
        if ($contestCutOff == "") {
            $contestCutOff = $contestTime;
        }
        $comments = rawurldecode(@$_POST['comments']);

        $contestantString = rawurldecode(@$_POST['contestants']);
        $contestST = split("/", substr($currentContestants, 0, -1));
        $contestantArray = split("/", substr($contestantString, 0, -1));

        $rotContestantsArray = array();
        foreach ($contestST as $value) {
            $contestant = split("_", $value);
            $rotContestantsArray[] = $contestant[0];
        }

        $contestants = array();
        foreach ($contestantArray as $value) {
            $contestant = split("_", $value);
            if (!in_array($contestant[0], $rotContestantsArray)) {
                $contestants[] = array($contestant[0], $contestant[1]);
            }
        }

        $type = rawurldecode(@$_POST['type']);
        $correlationID = rawurldecode(@$_POST['correlationID']);

        $unit = rawurldecode(@$_POST['units']);

        $contestDateTime = date_parse_from_format("m-d-Y H:i", $contestDate . " " . $contestTime);
        $contestDateTime = mktime($contestDateTime['hour'], $contestDateTime['minute'], $contestDateTime['second'], $contestDateTime['month'], $contestDateTime['day'], $contestDateTime['year']);

        $contestCutOffDateTime = date_parse_from_format("m-d-Y H:i", $contestDate . " " . $contestCutOff);
        $contestCutOffDateTime = mktime($contestCutOffDateTime['hour'], $contestCutOffDateTime['minute'], $contestCutOffDateTime['second'], $contestCutOffDateTime['month'], $contestCutOffDateTime['day'], $contestCutOffDateTime['year']);

        $soapPreGame = $this->getService('preLineService');



        $res = $soapPreGame->getHavePropsLine(array("db" => $this->getEditDatabase(),
            "contestType" => $contestType,
            "contestType2" => $contestType2,
            "contestType3" => $contestType3,
            "contestdesc" => $contestDesc));
        $results = json_decode($res->return, true);
        if ($results['results'] > 0) {
            $contestantString = rawurldecode(@$_POST['contestants']);
            $contestST = split("/", substr($currentContestants, 0, -1));
            $contestantArray = split("/", substr($contestantString, 0, -1));

            $rotContestantsArray = array();
            foreach ($contestST as $value) {
                $contestant = split("_", $value);
                $rotContestantsArray[] = $contestant[0];
            }

            $contestants = array();
            foreach ($contestantArray as $value) {
                $contestant = split("_", $value);
                if (!in_array($contestant[0], $rotContestantsArray)) {
                    $contestants[] = array($contestant[0], $contestant[1]);
                }
            }



            $res = $soapPreGame->setEditProps(array("db" => $this->getEditDatabase(),
                "contestType" => $contestType,
                "contestType2" => $contestType2,
                "contestType3" => $contestType3,
                "contestDesc" => $contestDesc,
                "contestDate" => $contestDateTime,
                "contestCutOff" => $contestCutOffDateTime,
                "comments" => $comments));

            $array = json_decode($res->return, true);

            foreach ($contestants as $value) {
                $result2 = $soapPreGame->setPropsCostest(array(
                    "db" => $this->getEditDatabase(),
                    "contestType" => $contestType,
                    "contestType2" => $contestType2,
                    "contestType3" => $contestType3,
                    "contestDesc" => $contestDesc,
                    "rotNum" => $value[0],
                    "contestantName" => $value[1]));
            }

            return new CakeResponse(array('body' => $array['results']));
        } else if ($results['results'] == 0) {

            $contestantString = rawurldecode(@$_POST['contestants']);
            $contestST = split("/", substr($currentContestants, 0, -1));
            $contestantArray = split("/", substr($contestantString, 0, -1));

            $rotContestantsArray = array();
            foreach ($contestST as $value) {
                $contestant = split("_", $value);
                $rotContestantsArray[] = $contestant[0];
            }

            $contestants = array();
            foreach ($contestantArray as $value) {
                $contestant = split("_", $value);
                $contestants[] = array($contestant[0], $contestant[1]);
            }
            $soapPreGame = $this->getService('preLineService');
            $result = $soapPreGame->setPropsEditnew(array("db" => $this->getEditDatabase(),
                "contestType" => $contestType,
                "contestType2" => $contestType2,
                "contestType3" => $contestType3,
                "contestDescnew" => $contestDesc,
                "contestDate" => $contestDateTime,
                "contestDescold" => $oldContestDesc,
                "contestCutOff" => $contestDateTime,
                "xtolinerep" => 'N',
                "comments" => $comments,
                "unit" => $unit,
                "type" => $type,
                "firstRotNum" => $contestants[0][0],
                "correlationID" => $correlationID));

            foreach ($contestants as $value) {
                $result2 = $soapPreGame->setPropsCostest(array(
                    "db" => $this->getEditDatabase(),
                    "contestType" => $contestType,
                    "contestType2" => $contestType2,
                    "contestType3" => $contestType3,
                    "contestDesc" => $contestDesc,
                    "rotNum" => $value[0],
                    "contestantName" => $value[1]));
            }
            return new CakeResponse(array('body' => 0));
        } else {
            return new CakeResponse(array('body' => -1));
        }
    }

    public function ajaxcall() {
        $this->set('return', 2);
        $this->layout = "ajax";
    }

    public function createpropbytemplate() {
        
    }

    public function getgamesbydate() {
        $sportType = @$_POST['sport'];
        $subSportType = @$_POST['subsport'];
        $dateFrom = @$_POST['dateFrom'];
        $dateTo = @$_POST['dateTo'];
        $df = explode("-", $dateFrom);
        $dt = explode("-", $dateTo);
        
        $DateTimeFrom = $df[2]."-".$df[0]."-".$df[1];
        $DateTimeTo = $dt[2]."-".$dt[0]."-".$dt[1];

        $soapPreGame = $this->getService('settingsService');
        $result = $soapPreGame->getGameInfo(array("db" => $this->getReadDatabase(), "sporttype" => $sportType, "sportsubtype" => $subSportType, "startdate" => $DateTimeFrom, "enddate" => $DateTimeTo));

        $resArray = json_decode($result->return, true);

        return new CakeResponse(array('body' => json_encode($resArray['results'])));
    }

    public function loadpropslist() {
        $sport = @$_POST["sporttype"];
        $subSportType = @$_POST["subsporttype"];
        $propType = @$_POST["propType"];
        $soapPreGame = $this->getService('settingsService');

        if ($sport === "Soccer") {
            $result = $soapPreGame->getProptemplatesoccer(array("db" => $this->getEditDatabase(), "sportsubtype" => $subSportType));
        } else {
            $result = $soapPreGame->getProptemplate(array("db" => $this->getEditDatabase(), "sporttype" => $sport, "proptype" => $propType, "propsubtype" => ""));
        }
        $resArray = json_decode($result->return, true);
        return new CakeResponse(array('body' => json_encode($resArray['results'])));
    }

    public function propinsertionorder() {
        $gamesSelected = @$_POST['games'];
        $spreadProps = @$_POST['spreadProps'];
        $moneylineProps = @$_POST['moneylineProps'];
        $totalProps = @$_POST['totalProp'];

        $propsSelected = "";
        if (count($spreadProps) > 0) {
            foreach ($spreadProps as $prop) {
                $propsSelected.=$prop . "|";
            }
        }
        if (count($moneylineProps) > 0) {
            foreach ($moneylineProps as $prop) {
                $propsSelected.=$prop . "|";
            }
        }
        if (count($totalProps) > 0) {
            foreach ($totalProps as $prop) {
                $propsSelected.=$prop . "|";
            }
        }
        $gamesInfoArray = "";
        $soapPreGame = $this->getService('preGameService');
        foreach ($gamesSelected as $game) {
            $result = $soapPreGame->getGame(array("db" => $this->getReadDatabase(), "gameNum" => $game));
            $array = json_decode($result->return, true);
            $gameInfo = $array["results"]["row1"]["CorrelationID"] . "%" . $array["results"]["row1"]["GameDateTime"] . "%" . $array["results"]["row1"]["Team1ID"] . "%" . $array["results"]["row1"]["Team2ID"] . "%" .$array["results"]["row1"]["SportSubType"]. "%" .$array["results"]["row1"]["Team1RotNum"] . "|";
            $gamesInfoArray.=$gameInfo;
        }
        $propType = @$_POST['propType'];
        $propArray = explode("|", substr($propsSelected, 0, -1));

        $this->set('propList', $propArray);
        $this->set('gamesInfo', substr($gamesInfoArray, 0, -1));
        $this->set('fullPropList', substr($propsSelected, 0, -1));

        if (@$_POST["propType"] == "P") {
            $this->set("buttonText", "Edit Players");
            $this->set("proptype", "Player");
        } else if (@$_POST["propType"] == "G") {
            $this->set("buttonText", "Send Request");
//            $this->set("action", "savegameprops");
            $this->set("proptype", "Game");
        }
    }

    public function playersedition() {
        
        $games = @$_POST["gamesInfo"];
        $props = @$_POST["propsList"];
        $propsOrder = @$_POST["props"];
        $propType = @$_POST["proptype"];
        $propsToInsertArray=  $this->getPropArray($games,$props,$propsOrder,$propType,2);

        $this->set("propsToInsertArray",$propsToInsertArray);
    }

    public function savegameprops() {
        $games = @$_POST["gamesInfo"];
        $props = @$_POST["propsList"];
        $propsOrder = @$_POST["props"];
        $propType = @$_POST["proptype"];
        $propsOrder = substr($propsOrder, 0, -1);
        $propsOrder = explode("|", $propsOrder);
        $propsToInsertArray=  $this->getPropArray($games,$props,$propsOrder,$propType,1);
        $subSport=$this->getSubSportFromArray($games);
        $soapPreGame = $this->getService('settingsService');
        if(trim($subSport)=="FULL ODDS"){
            $results = $soapPreGame->setPropsSoccermasive(array("db" => $this->getEditDatabase(), "propsdata" => $propsToInsertArray));
        }else{
            $propsToInsertArray2=array();
            foreach ($propsToInsertArray as $prop){
                for($i=0;$i<30;$i++){
                    $prop[]="null";
                }
                if($prop[0]==60||$prop[0]==59){
                    $prop2=$prop;
                    $prop2[14]=$prop2[15];
                    $propsToInsertArray2[]=$prop;
                    $propsToInsertArray2[]=$prop2;
                }else{
                    $propsToInsertArray2[]=$prop;
                }
            }
            $propsToInsertArray=$propsToInsertArray2;
            $results =$soapPreGame-> setPropsmasive(array("db"=>$this->getEditDatabase(),"propsdata"=>$propsToInsertArray));
        }
        $resArray = json_decode($results->return, true);
        return new CakeResponse(array('body' => json_encode($resArray['results'])));
    }

    private function getSubSportFromArray($games){
        $gamesArray = explode("|", $games);
        $firstGame=explode("%", $gamesArray[0]);
        return $firstGame[4];
    }


    private function getPropArray($games,$props,$propsOrder,$propType,$arrayType){
        $orderedPropArray = array();
        $notOrderPropArray = explode("|", $props);

        foreach ($propsOrder as $pos) {
            $orderedPropArray[] = $notOrderPropArray[$pos];
        }

        $gamesArray = explode("|", $games);
        $propsToInsertArray = array();
        foreach ($gamesArray as $game) {
            $gameInfo = explode("%", $game);
            foreach ($orderedPropArray as $prop) {
                $propInfo = explode("%", $prop);
                
                $propID=$propInfo[4];
                $contestDesc = "$propInfo[0]";
                $correlation = $gameInfo[0];
                $team1 = $gameInfo[2];
                $team2 = $gameInfo[3];
                $subSport = $gameInfo[4];
                $rotANumber= $gameInfo[5];
                $units = $propInfo[1];
                $comments = $propInfo[3];
                $PropWithPlayers=$propInfo[6];
                $PropWithTeams=$propInfo[5];
                $type = "";
                $stringDate = explode(" ", $gameInfo[1]);
                $stringHour = explode(":", $stringDate[1]);

                $contestDateTime = date_parse_from_format("Y-m-d H:i", $stringDate[0] . " " . $stringHour[0] . ":" . $stringHour[1]);
                $contestDateTime = mktime($contestDateTime['hour'], $contestDateTime['minute'], $contestDateTime['second'], $contestDateTime['month'], $contestDateTime['day'], $contestDateTime['year']);


                switch ($propInfo[2]){
                    case 'S':
                        $type = 'Spread';
                        break;
                    case 'M':
                        $type = 'MoneyLine';
                        break;
                    case 'T':
                        $type = 'Total';
                        break;
                }
                if($arrayType==1){
                    $propsToInsertArray[] = array($propID,$contestDesc,"I", $propType, $type, $correlation, base64_decode($comments),$units,$subSport,$rotANumber,$team1." vs ".$team2,$contestDateTime, $PropWithTeams,$PropWithPlayers,$team1 ,$team2);
                }else{
                    $propsToInsertArray[] = $propID ."*". $contestDesc ."*"."I" ."*".$propType ."*". $type ."*". $correlation ."*". $comments ."*". $units ."*". $subSport ."*". $rotANumber ."*". $team1." vs ".$team2 ."*". $contestDateTime ."*". $PropWithTeams ."*". $PropWithPlayers ."*". $team1  ."*". $team2;
                }
            }
        }
        return $propsToInsertArray;
    }

    public function savePlayerProps(){
        $players=@$_POST["players"];
        $props=@$_POST["propsInfo"];
        
        $propsToInsert=$this->getPlayerPropArray($players,$props);
        $soapPreGame = $this->getService('settingsService');
        $results = $soapPreGame-> setPropsmasive(array("db"=>$this->getEditDatabase(),"propsdata"=>$propsToInsert));
    
        $resArray=  json_decode($results->return,true);
        return new CakeResponse(array('body' => json_encode($resArray['results'])));
    } 
    
    private function getPlayerPropArray($players,$props){
        $propsArray=array();
        $cont=0;
        foreach ($props as $prop){
            $currentProp=  explode("*", $prop);
            $currentProp[6]=  base64_decode($currentProp[6]);
            $Contestants=  explode(",",  substr($players[$cont], 0,-1));
            if($currentProp[13]==2){
                foreach($Contestants as $contestant){
                    $conte=  explode("-", $contestant);
                    $tmpArray=$currentProp;
                    $tmpArray[]=$conte[0];
                    $tmpArray[]=$conte[1];
                    for($i=count($tmpArray);$i<46;$i++){
                        $tmpArray[]="null";
                    }
                    $propsArray[]=$tmpArray;
                }
            }else{
                $tmpArray=$currentProp;
                foreach ($Contestants as $contestant){
                    $tmpArray[]=$contestant;
                }
                for($i=count($tmpArray);$i<46;$i++){
                    $tmpArray[]="null";
                }
                $propsArray[]=$tmpArray;
            }
            $cont++;
        }
        return $propsArray;
    }
    
    
    public function getpropsbycorrelation($correlationID){
        $soapPreGame = $this->getService('preGameService');
        $results =$soapPreGame->getGradepropsCorralation(array("db"=>$this->getReadDatabase(),"corralation"=>$correlationID));
        
        $res=  json_decode($results->return,true);
        return new CakeResponse(array('body' => json_encode($res['results'])));
    }
    
    public function getFuturepropsbySubsport(){
        $subSport=@$_POST['subsport'];
        $soapPreGame = $this->getService('preGameService');
        $results =$soapPreGame->getGradepropsFutures(array("db"=>$this->getReadDatabase(),"liga"=>$subSport));
        
        $res=  json_decode($results->return,true);
        return new CakeResponse(array('body' => json_encode($res['results'])));
    }
    
    public function getGradepropsExternal(){
        $contestType1=@$_POST['contestType1'];
        $soapPreGame = $this->getService('preGameService');
        $results =$soapPreGame->getGradepropsExternal(array("db"=>$this->getReadDatabase(),"carpeta"=>$contestType1));
        
        $res=  json_decode($results->return,true);
        return new CakeResponse(array('body' => json_encode($res['results'])));
    }

}
