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
class SettingsController extends AppController {

    public function index() {
        
    }

    public function stores() {
        $soapPreGame = $this->getService('preGameService');
        $results = $soapPreGame->getStores(array("db" => $this->getReadDatabase()));

        $array = json_decode($results->return, true);

        $this->set("stores", $array['results']);
    }

    public function charts() {
        $soapPreStore = $this->getService('storeService');

        $result = $soapPreStore->getLineType(array("db" => $this->getReadDatabase()));

        $array = json_decode($result->return, true);

        $this->set("lineTypes", $array['results']);
    }

    public function category() {
        $soapPreGame = $this->getService('preGameService');
        $result = $soapPreGame->getSports(array("db" => $this->getReadDatabase()));
        $sports = json_decode($result->return, true);

        $this->set('sports', $sports['results']);

        $soapPreCategory = $this->getService('categoryService');
        $result2 = $soapPreCategory->getPeriodType(array("db" => $this->getReadDatabase()));

        $periods = json_decode($result2->return, true);

        $this->set('periods', $periods['results']);
    }

    public function team() {
        $soapPreGame = $this->getService('preGameService');
        $result = $soapPreGame->getSports(array("db" => $this->getReadDatabase()));
        $sports = json_decode($result->return, true);

        $this->set('sports', $sports['results']);
    }

    public function loadleagues($sportid = "") {
        $soapPreGame = $this->getService('preGameService');
        $result = $soapPreGame->getCategoriesBySport(array("db" => $this->getReadDatabase(), "sportType" => split(',', $sportid)));

        $return = json_decode($result->return);

        return new CakeResponse(array('body' => json_encode($return->results)));
    }

    public function getperiods() {
        $sport = @$_POST['sport'];
        $league = @$_POST['subSport'];
        $soapPreGame = $this->getService('preGameService');
        $results = $soapPreGame->getPeriodsBySubSportType(array("db" => $this->getReadDatabase(), "sportType" => $sport, "sportSubType" => $league));

        $array = json_decode($results->return);
//        print_r($array);die();
        $storesString = "";

        foreach ($array->results as $value) {
            $storesString.=$value->PeriodDescription . ",";
        }

        $storesString = substr($storesString, 0, -1);
        return new CakeResponse(array('body' => $storesString));
    }

    public function loadcountriesbysport() {
        $subsporttype = @$_POST['subSport'];
        $sportid = @$_POST['sport'];
        $soapPreGame = $this->getService('preGameService');
        $result = $soapPreGame->getCountries(array("db" => $this->getReadDatabase(), "sportType" => split(',', $sportid), "sportSubType" => split(',', $subsporttype)));

        $return = json_decode($result->return);
        return new CakeResponse(array('body' => json_encode($return->results)));
    }

    public function loadAllPeriods() {
        $soapPreCategory = $this->getService('categoryService');
        $result = $soapPreCategory->getPeriodType(array("db" => $this->getReadDatabase()));

        $array = json_decode($result->return);
        return new CakeResponse(array('body' => json_encode($array->results)));
    }

    public function loadAllCountries() {
        $soapGenInfo = $this->getService('genInfoService');
        $result = $soapGenInfo->getCountry(array("db" => $this->getReadDatabase()));

        $array = json_decode($result->return);

        return new CakeResponse(array('body' => json_encode($array->results)));
    }

    public function savecategory() {
        $sport = @$_POST['sport'];
        $subSport = @$_POST['subSport'];
        $period = @$_POST['period'];
        $allowDraw = @$_POST['allowDraw'];

        $soapPreCategory = $this->getService('categoryService');
        $result = $soapPreCategory->setSportSub(array("db" => $this->getEditDatabase(), "sportType" => $sport, "sportSubType" => $subSport, "drawFlag" => $allowDraw, "periodType" => $period));

        $array = json_decode($result->return);

        return new CakeResponse(array('body' => $array->results));
    }

    public function deletecategory() {
        $sport = @$_POST['sport'];
        $subSport = @$_POST['subSport'];

        $soapPreCategory = $this->getService('categoryService');
        $result = $soapPreCategory->deleteSportType(array("db" => $this->getEditDatabase(), "sportType" => $sport, "sportSubType" => $subSport));

        $array = json_decode($result->return);

        return new CakeResponse(array('body' => 28));
    }

    public function loadperiodtypebysport() {
        $sport = @$_POST['sport'];
        $subSport = @$_POST['subSport'];

        $soapPreCategory = $this->getService('categoryService');
        $result = $soapPreCategory->getPeriodTypeBySport(array("db" => $this->getReadDatabase(), "sport" => $sport, "subSport" => $subSport));

        $array = json_decode($result->return);

        return new CakeResponse(array('body' => $array->results->row1->PeriodType));
    }

    public function getstorelines($store) {
        $soapPreStore = $this->getService('storeService');

        $result = $soapPreStore->getStoreData(array("db" => $this->getReadDatabase(), "store" => $store));
        $array = json_decode($result->return);
//        print_r($array);die();
        return new CakeResponse(array('body' => json_encode($array->results)));
    }

    public function addnewstore() {
        $newStore = @$_POST['storeName'];

        $soapPreStore = $this->getService('storeService');

        $result = $soapPreStore->setStoreData(array("db" => $this->getEditDatabase(), "store" => $newStore, "sportType" => "", "sportSubType" => "",
            "periodNumber" => "", "wagerType" => "", "lineType" => "", "maximumWager" => "", "maximumCircled" => "",
            "inetMaximimumWager" => "", "FollowFavoriteFlag" => "", "action" => 1));

        $array = json_decode($result->return);
        return new CakeResponse(array('body' => json_encode($array->results)));
    }

    public function deletestore() {
        $newStore = @$_POST['storeName'];

        $soapPreStore = $this->getService('storeService');

        $result = $soapPreStore->setStoreData(array("db" => $this->getEditDatabase(), "store" => $newStore, "sportType" => "", "sportSubType" => "",
            "periodNumber" => "", "wagerType" => "", "lineType" => "", "maximumWager" => "", "maximumCircled" => "",
            "inetMaximimumWager" => "", "FollowFavoriteFlag" => "", "action" => 2));

        $array = json_decode($result->return);
        return new CakeResponse(array('body' => json_encode($array->results)));
    }

    public function editstoreline() {
        $store = @$_POST['store'];
        $sport = @$_POST['sport'];
        $subsport = @$_POST['subsport'];
        $periodId = @$_POST['periodId'];
        $wagerType = @$_POST['wagerType'];
        $linetype = @$_POST['linetype'];
        $cuMaxBet = @$_POST['cuMaxBet'];
        $inetMaxBet = @$_POST['inetMaxBet'];
        $dfltCircled = @$_POST['dfltCircled'];
        $followMaster = @$_POST['followMaster'];
        $description = @$_POST['description'];

        $soapPreStore = $this->getService('storeService');

        $result = $soapPreStore->setStoreData(array("db" => $this->getEditDatabase(), "store" => $store, "sportType" => $sport, "sportSubType" => $subsport,
            "periodNumber" => $periodId, "wagerType" => $wagerType, "lineType" => $linetype, "maximumWager" => $cuMaxBet, "maximumCircled" => $dfltCircled,
            "inetMaximimumWager" => $inetMaxBet, "FollowFavoriteFlag" => $followMaster, "action" => 3, "description" => $description));
        $array = json_decode($result->return);
        return new CakeResponse(array('body' => json_encode($array->results)));
    }

    public function getLineType() {
        $soapPreStore = $this->getService('storeService');

        $result = $soapPreStore->getLineType(array("db" => $this->getReadDatabase()));

        $array = json_decode($result->return);

        return new CakeResponse(array('body' => json_encode($array->results)));
    }

    public function getchartlines($lineType) {
        $soapPreStore = $this->getService('storeService');

        $result = $soapPreStore->findChart(array('db' => $this->getReadDatabase(), 'lineType' => $lineType));

        $array = json_decode($result->return);

        return new CakeResponse(array('body' => json_encode($array->results)));
    }

    public function savechartlinetype() {
        $array = @$_POST['array'];
        $array = substr($array, 0, -1);
        $lineType = @$_POST['lineType'];
        $arraytmp = explode(";", $array);
        $chartLines = array();
        foreach ($arraytmp as $chartline) {
            $line = explode(',', $chartline);
            $chartLines[] = $line;
        }
        $soapPreStore = $this->getService('storeService');

        $result = $soapPreStore->updateChart(array('db' => $this->getEditDatabase(), 'lineType' => $lineType, 'data' => $chartLines));
        $array = json_decode($result->return);
        return new CakeResponse(array('body' => json_encode($array->results)));
    }

    public function createlinetype() {
        $lineType = @$_POST['lineType'];
        $chartLines = array(0, 0, 0);

        $soapPreStore = $this->getService('storeService');

        $result = $soapPreStore->updateChart(array('db' => $this->getEditDatabase(), 'lineType' => $lineType, 'data' => array($chartLines)));
        $array = json_decode($result->return);
        return new CakeResponse(array('body' => json_encode($array->results)));
    }

    public function deletelinetype() {
        $lineType = @$_POST['lineType'];

        $soapPreStore = $this->getService('storeService');

        $result = $soapPreStore->deleteLineType(array('db' => $this->getEditDatabase(), 'lineType' => $lineType));
        $array = json_decode($result->return);
        return new CakeResponse(array('body' => json_encode($array->results)));
    }

    public function loadteams() {
        $sport = @$_POST['sport'];
        $league = @$_POST['league'];
        $soapPreTeam = $this->getService('teamService');

        $result = $soapPreTeam->getTeam(array('db' => $this->getReadDatabase(), "sport" => $sport, "subSport" => $league));
        $array = json_decode($result->return);
        return new CakeResponse(array('body' => json_encode($array->results)));
    }

    public function getsports() {
        $soapPreGame = $this->getService('preGameService');
        $result = $soapPreGame->getSports(array("db" => $this->getReadDatabase()));
        $sports = json_decode($result->return);

        return new CakeResponse(array('body' => json_encode($sports->results)));
    }

    
    public function insertteam(){
        $newTeam=@$_POST['newTeam'];
        $sport=@$_POST['sport'];
        $subSport=@$_POST['subSport'];
        $soapPreTeam = $this->getService('teamService');

        $result = $soapPreTeam->setInsertTeam(array('db' => $this->getEditDatabase(),"sportType"=>$sport,"sportSubType"=>$subSport,"team"=>$newTeam));
        
        $array = json_decode($result->return);
        return new CakeResponse(array('body' => json_encode($array->results)));
    }
    
    public function deleteteam(){
        $newTeam=@$_POST['newTeam'];
        $arrayTeams=  explode("|", $newTeam);
        $sport=@$_POST['sport'];
        $subSport=@$_POST['subSport'];
        $soapPreTeam = $this->getService('teamService');
        $successTeams=array();
        $errorTeams=array();
        
        foreach ($arrayTeams as $team) {
            $result = $soapPreTeam->setDeleteTeam(array('db' => $this->getEditDatabase(),"sportType"=>$sport,"sportSubType"=>$subSport,"team"=>$team));
            $array = json_decode($result->return,true);
            if($array['results']>=1){
                $successTeams[]=$team;
            }else{
                $errorTeams[]=$team;
            }
        }
        $arrayResult=array("success"=>$successTeams,"error"=>$errorTeams);
        
        return new CakeResponse(array('body' => json_encode($arrayResult)));
    }
    public function lineshadegroups(){
        $soapPreGame = $this->getService('preGameService');
        $results = $soapPreGame->getStores(array("db" => $this->getReadDatabase()));

        $array = json_decode($results->return, true);

        $this->set("stores", $array['results']);
    }
    
    public function systemsettings(){
        
    }
    
    public function getSystemSettings(){
        $soapPreGame = $this->getService('settingsService');
        $results = $soapPreGame->getSettings(array("db" => $this->getReadDatabase()));

        $array = json_decode($results->return, true);
        
        return new CakeResponse(array('body' => json_encode($array["results"])));
    }
    
    
    public function saveSystemSettins(){
        $minimumwager=$_POST['minimumwager'];
        $updategamemilliseconds=$_POST['updategamemilliseconds'];
        $updatemoneymilliseconds=$_POST['updatemoneymilliseconds'];
        $admindisplaycompletedgamedays=$_POST['admindisplaycompletedgamedays'];
        $defaultcutoffminutes=$_POST['defaultcutoffminutes'];
        $keepopenminutes=$_POST['keepopenminutes'];
        $posttimeleadminutes=$_POST['posttimeleadminutes'];
        $weeklyfigurestarts=$_POST['weeklyfigurestarts'];
        $closedayofweek=$_POST['closedayofweek'];
        $localtimezonedesc=$_POST['localtimezonedesc'];
        $localtimezone=$_POST['localtimezone'];
        $notificationadministrator=$_POST['notificationadministrator'];
        $notifytoexceedmaxwager=$_POST['notifytoexceedmaxwager'];
        $notifyofinsufficientfunds=$_POST['notifyofinsufficientfunds'];
        $notificationminutesaftercutoff=$_POST['notificationminutesaftercutoff'];
        $includecents=$_POST['includecents'];
        $truncatemoney=$_POST['truncatemoney'];
        $maxparlaybet=$_POST['maxparlaybet'];
        $maxparlaypayout=$_POST['maxparlaypayout'];
        $maxinetparlaybet=$_POST['maxinetparlaybet'];
        $maxhorsebet=-1;
        $maxhorsepayout=-1;
        $maxinethorsebet=-1;
        $maxteaserbet=$_POST['maxteaserbet'];
        $maxinetteaserbet=$_POST['maxinetteaserbet'];
        $maxcontestbet=$_POST['maxcontestbet'];
        $maxinetcontestbet=$_POST['maxinetcontestbet'];

        $soapPreGame = $this->getService('settingsService');
        $results = $soapPreGame->setSettingsWired(array("db"=>$this->getReadDatabase(),
            "minimumwager"=>$minimumwager,
            "updategamemilliseconds"=>$updategamemilliseconds,
            "updatemoneymilliseconds"=>$updatemoneymilliseconds,
            "admindisplaycompletedgamedays"=>$admindisplaycompletedgamedays,
            "defaultcutoffminutes"=>$defaultcutoffminutes,
            "keepopenminutes"=>$keepopenminutes,
            "posttimeleadminutes"=>$posttimeleadminutes,
            "weeklyfigurestarts"=>$weeklyfigurestarts,
            "closedayofweek"=>$closedayofweek,
            "localtimezonedesc"=>$localtimezonedesc,
            "localtimezone"=>$localtimezone,
            "notificationadministrator"=>$notificationadministrator,
            "notifytoexceedmaxwager"=>$notifytoexceedmaxwager,
            "notifyofinsufficientfunds"=>$notifyofinsufficientfunds,
            "notificationminutesaftercutoff"=>$notificationminutesaftercutoff,
            "includecents"=>$includecents,
            "truncatemoney"=>$truncatemoney,
            "maxparlaybet"=>$maxparlaybet,
            "maxparlaypayout"=>$maxparlaypayout,
            "maxinetparlaybet"=>$maxinetparlaybet,
            "maxhorsebet"=>$maxhorsebet,
            "maxhorsepayout"=>$maxhorsepayout,
            "maxinethorsebet"=>$maxinethorsebet,
            "maxteaserbet"=>$maxteaserbet,
            "maxinetteaserbet"=>$maxinetteaserbet,
            "maxcontestbet"=>$maxcontestbet,
            "maxinetcontestbet"=>$maxinetcontestbet));
        
        $array = json_decode($results->return, true);
        
        
        return new CakeResponse(array('body' => json_encode($array["results"])));
        
    }
    
    public function getAgents(){
        $soapPreGame = $this->getService('settingsService');
        $results = $soapPreGame->getAgent(array("db"=>$this->getReadDatabase()));
        
        $array = json_decode($results->return, true);
        return new CakeResponse(array('body' => json_encode($array["results"])));
    }
}
