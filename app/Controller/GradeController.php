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
class GradeController extends AppController {
    /**
     * @author mcalderon
     * @return array Sports
     */
    public function index() {
        $soapPreGame = $this->getService('preGameService');
    	$result = $soapPreGame->getScheduleSports(array("db"=>$this -> getReadDatabase()));
        $sports = json_decode($result->return, true);

        $this->set('sports', $sports['results']);
    }
    /**
     * @author mcalderon
     * @param days $int how many Days past
     * @param int $action 1 => Manual plays from current day 2=> Manual Plays from certain days past 3=> future manual plays
     * @return (array(String Description, Float AmountWagered,Date Date,int WagerNumber,String TicketWriter,
     * String CustomerID, Date PostedDateTime,Char Outcome,String ToWinAmount,Long TicketNumber))
     */
    public function manualplaylist(){
        $soapPreGame = $this->getService('manualPlays');
    	$result = $soapPreGame->getManualPlays(array("db"=>$this -> getReadDatabase(),
            "action"=>1,
            "days"=>null));
        $manualPlaysList = json_decode($result->return, true);
        $this->set('manualPlaysList', $manualPlaysList['results']);
    }
    /**
     * @author mcalderon
     * @param days $int how many Days past
     * @param int $action 1 => Manual plays from current day 2=> Manual Plays from certain days past 3=> future manual plays
     * @return (array(String Description, Float AmountWagered,Date Date,int WagerNumber,String TicketWriter,
     * String CustomerID, Date PostedDateTime,Char Outcome,String ToWinAmount,Long TicketNumber))
     */
    public function getManualPlaysList(){
        $days=@$_POST["days"];
        $action=@$_POST["action"];
        $soapPreGame = $this->getService('manualPlays');
    	$result = $soapPreGame->getManualPlays(array("db"=>$this -> getReadDatabase(),
            "action"=>$action,
            "days"=>$days));
        $manualPlaysList = json_decode($result->return, true);
        
        return new CakeResponse(array('body' => json_encode($manualPlaysList['results'])));
    }

        public function gamecontest(){
        
    }
    
    /**
     * @author mcalderon
     * @param int $gameNum game number
     */
    public function generalpropsgrading(){
        $GameNum=@$_POST['gameNumRedirect'];
        $optionText="";
        $optionValue="";
        if(!empty($GameNum)){
            $soapPreGame = $this->getService('preGameService');
            $result = $soapPreGame->getGame(array("db"=>$this -> getReadDatabase(), "gameNum" => $GameNum));
            $array = json_decode($result->return,true);
            $optionValue=$array['results']['row1']['CorrelationID'];
            $optionText=$array['results']['row1']['Team1ID']." vs ".$array['results']['row1']['Team2ID'];
        }
        $soapPreGame = $this->getService('preGameService');
    	$result = $soapPreGame->getScheduleSports(array("db"=>$this -> getReadDatabase()));
        $sports = json_decode($result->return, true);
        
        $this->set('sports', $sports['results']);
        
        $this->set('otionValue', $optionValue);
        $this->set('optionText', $optionText);
    }
    
    /**
     * @author mcalderon
     * 
     */
    public function gradeindividualgame(){
        $sp=@$_POST['sp'];
        $ml=@$_POST['ml'];
        $tl=@$_POST['tl'];
        $df=@$_POST['df'];
        $team1=@$_POST['team1'];
        $team2=@$_POST['team2'];
        $period=@$_POST['period'];
        $periodname=@$_POST['periodname'];
        $picher1=@$_POST['pitcher1'];
        $picher2=@$_POST['pitcher2'];
        $subSport=@$_POST['subSport'];
        $rot=@$_POST['rot'];
        $gameDate=@$_POST['gameDate'];
        $scoreAway=@$_POST['scoreAway'];
        $pointsAway=@$_POST['pointsAway'];
        $scoreHome=@$_POST['scoreHome'];
        $pointsHome=@$_POST['pointsHome'];
        $adjustlineaway=@$_POST['adjustlineaway'];
        $adjustlinehome=@$_POST['adjustlinehome'];
        $comments=@$_POST['comments'];
        $winnerid;
        if($scoreAway>$scoreHome){
            $winnerid=$team1;
        }else if($scoreAway==$scoreHome){
            $winnerid="";
        }else{
            $winnerid=$team2;
        }
        
        $dateTime=  explode(" ", $gameDate); 
        $date=  explode("-", $dateTime[0]);
        $time=  explode(":", $dateTime[1]);
        
        if($df==""){
            $df=$date[1]."-".$date[2]."-".$date[0];
        }
        $dfArray=  explode("-", $df);
        
        $dfDate=$dfArray[0]."-".$dfArray[1]."-".$dfArray[2] . " 00:00:00";
        $gameDateTime = $date[1]."-".$date[2]."-".$date[0] . " " . $time[0].":".$time[1];

        $soapPreGame = $this->getService('gradingService');
    	$result = $soapPreGame->getGradingmain(array("db"=>$this->getEditDatabase(),
            "gamedate"=>$gameDateTime,
            "teamr1"=>$rot,
            "actiongrading"=>array($sp,$ml,$tl),
            "teamspts"=>array($team1,$pointsAway,$team2,$pointsHome),
            "period"=>$period,
            "daily"=>$dfDate,
            "periodname"=>$periodname,
            "picher1"=>$picher1,
            "picher2"=>$picher2,
            "deporte"=>$subSport,
            "winnerid"=>$winnerid,
            "adjustlineaway"=>$adjustlineaway,
            "adjustlinehome"=>$adjustlinehome,
            "comments"=>$comments));
        
        $res=json_decode($result->return, true);
        return new CakeResponse(array('body' => json_encode($res['results'])));
    }
    
    
    /**
     * @author mcalderon
     * 
     */
    public function getorderedperiods(){
        $sport=@$_POST['sport'];
        $league=@$_POST['subSport'];
        $soapPreGame = $this->getService('preGameService');
        $results=$soapPreGame->getPeriodsBySubSportType(array("db"=>$this ->getReadDatabase(),"sportType" => $sport, "sportSubType" =>$league));
        
        $array=  json_decode($results->return,true);
        $array2=array();
        foreach ($array['results'] as $element){
            $array2[]=$element;
        }
        $orderArray;
        if(trim($league)=="NHL"){
            $orderArray=array(1,2,3,0);
        }else{
            $orderArray=array(3,4,1,5,6,2,0);
        }
        $orderedArray=array();
        foreach ($orderArray as $num){
            if(isset($array2[$num]))
                $orderedArray[]=$array2[$num];
            
        }
        
        return new CakeResponse(array('body' => json_encode($orderedArray)));
    }
    
    /**
     * @author mcalderon
     * 
     */
    public function getgamesforgrade(){
        $sportType = @$_POST['sport'];
        $subSportType = @$_POST['subsport'];
        $dateFrom = @$_POST['gameDate'];
        $active = @$_POST['active'];
        $all;
        if($subSportType==1){
            $subSportType="";
            $all=1;
        }else{
            $all=0;
        }
        
        
        if($active==""){
            $active="";
        }
        
        $dateF= explode("-", $dateFrom);
        
        
        $gameDateTimeFrom =$dateF[2]."-".$dateF[0]."-".$dateF[1] . " 00:00:00";
        $gameDateTimeTo =$dateF[2]."-".$dateF[0]."-".$dateF[1] . " 23:59:59";

        $soapPreGame = $this->getService('settingsService');
    	$result = $soapPreGame->getScoresGames(array("db"=>$this->getReadDatabase(),
            "inicio"=>$gameDateTimeFrom,
            "fin"=>$gameDateTimeTo,
            "sport"=>$sportType,
            "subsport"=>$subSportType,
            "active"=>$active,
            "all"=>$all));
        
        
        $res=json_decode($result->return, true);
        
        return new CakeResponse(array('body' => json_encode($res['results'])));
    }
    
    /**
     * @author mcalderon
     * 
     */
    public function getgameinfo(){
        $gameID=@$_POST['gameId'];
        $periodID=@$_POST['period'];
        $store="Master";
        $soapPreGame = $this->getService('preLineService');
        $result = $soapPreGame->getGameLines(array("db"=>$this -> getReadDatabase(), "gameNum" => $gameID, "periodNumber" => $periodID, "store" => $store, "sportType" => "",
		"sportSubType" => "", "scheduletext" => "", "date" => ""));
        $gameInfo=  json_decode($result->return,true);
        
        $gameDateTime=$gameInfo['results']['row1']['GameDate']." ".$gameInfo['results']['row1']['GameTime'];
        $soapPreGame2 = $this->getService('settingsService');
        $result2 = $soapPreGame2->getScoresGamesDetail(array("db"=>$this->getReadDatabase(),
            "rotation"=>$gameInfo['results']['row1']['Team1RotNum'],
            "fecha"=>$gameDateTime));
        
        $res=json_decode($result2->return, true);
        
        return new CakeResponse(array('body' => json_encode($res['results'])));
    }
    
    /**
     * @author mcalderon
     * 
     */
    public function greadeMLProps(){
        $cd=@$_POST['cd'];
        $contestants=@$_POST['contestants'];
        $ct=@$_POST['ct'];
        $ct2=@$_POST['ct2'];
        $ct3=@$_POST['ct3'];
        $df=@$_POST['df'];
        $comments=@$_POST['comments'];
        $ratio=@$_POST['ratio'];
        $status=@$_POST['status'];
        $dateF= explode("-", $df);
        $dailyFigureDate = $dateF[0]."-".$dateF[1]."-".$dateF[2] . " 00:00:00";
        $soapPreGame = $this->getService('gradingService');
    	$result = $soapPreGame->getProspGrading(array("db"=>$this->getEditDatabase(),
            "propsdata"=>array($ct,$ct2,$ct3,$cd),
            "contestanstatus"=>$contestants,
            "status"=>$status,
            "racial"=>$ratio==""?1:$ratio,
            "daily"=>$dailyFigureDate,
            "comments"=>$comments));
        
        $res=  json_decode($result->return,true);
        return new CakeResponse(array('body' => json_encode($res['results'])));
    }
    
    /**
     * @author mcalderon
     * 
     */
    public function greadeSPProps(){
        $cd=@$_POST['cd'];
        $contestants=@$_POST['contestants'];
        $ct=@$_POST['ct'];
        $ct2=@$_POST['ct2'];
        $ct3=@$_POST['ct3'];
        $df=@$_POST['df'];
        $comments=@$_POST['comments'];
        $points=@$_POST['points'];
        $status=@$_POST['status'];
        $dateF= explode("-", $df);
        
        
        $dailyFigureDate =$dateF[0]."-".$dateF[1]."-".$dateF[2] . " 00:00:00";
                
        $soapPreGame = $this->getService('gradingService');
    	$result = $soapPreGame->getProspGrading(array("db"=>$this->getEditDatabase(),
            "propsdata"=>array($ct,$ct2,$ct3,$cd),
            "contestanstatus"=>$contestants,
            "status"=>$status,
            "points"=>$points,
            "daily"=>$dailyFigureDate,
            "comments"=>$comments));
        $res=  json_decode($result->return,true);
        return new CakeResponse(array('body' => json_encode($res['results'])));
    }
    
    /**
     * @author mcalderon
     * 
     */
    public function greadeTLProps(){
        $cd=@$_POST['cd'];
        $contestants=@$_POST['contestants'];
        $ct=@$_POST['ct'];
        $ct2=@$_POST['ct2'];
        $ct3=@$_POST['ct3'];
        $df=@$_POST['df'];
        $points=@$_POST['points'];
        $status=@$_POST['status'];
        $comments=@$_POST['comments'];
        
        $dateF= explode("-", $df);
        
        
        $dailyFigureDate = $dateF[0]."-".$dateF[1]."-".$dateF[2] . " 00:00:00";
                
        $soapPreGame = $this->getService('gradingService');
    	$result = $soapPreGame->getProspGrading(array("db"=>$this->getEditDatabase(),
            "propsdata"=>array($ct,$ct2,$ct3,$cd),
            "contestanstatus"=>$contestants,
            "status"=>$status,
            "points"=>$points,
            "daily"=>$dailyFigureDate,
            "comments"=>$comments));
        
        $res=  json_decode($result->return,true);
        return new CakeResponse(array('body' => json_encode($res['results'])));
    }
    
    /**
     * @author mcalderon
     * 
     */
    public function getgradeinfo(){
        $rotNum=@$_POST['rotNum'];
        $gameDate=@$_POST['gameDate'];
        $periodNum=@$_POST['periodNum'];
        
        $gameDateTimeArray=explode(" ", $gameDate);
        $date=  explode("-", $gameDateTimeArray[0]);
        $time=  explode(":", $gameDateTimeArray[1]);
        
        $gameDateTime = $date[1]."-".$date[2]."-".$date[0] . " ".$time[0].":".$time[1];
        
        $soapPreGame = $this->getService('settingsService');
    	$result = $soapPreGame->getGradeData(array("db"=>$this->getReadDatabase(),
            "rotation"=>$rotNum,
            "fecha"=>$gameDateTime,
            "period"=>$periodNum));
        
        $res=  json_decode($result->return,true);
        return new CakeResponse(array('body' => json_encode($res['results'])));
    }
    
    /**
     * @author mcalderon
     * @param Long $TicketNumber
     * @param Long $WagerNumber
     * @param Long $Outcome
     * @param Long $DailyFigureDate
     * @param Long $AmountWagered
     * @param Long $AmountLost
     * @param Long $AmountWon
     * @return \CakeResponse
     */
    public function gradeManualPlay(){
        $TicketNumber=@$_POST["TicketNumber"];
        $WagerNumber=@$_POST["WagerNumber"];
        $Outcome=@$_POST["Outcome"];
        $DailyFigureDate=@$_POST["DailyFigureDate"];
        $AmountWagered=@$_POST["AmountWagered"];
        $AmountLost=@$_POST["AmountLost"];
        $AmountWon=@$_POST["AmountWon"];
        
        $gameDateTimeArray=explode(" ", $DailyFigureDate);
        $date=  explode("-", $gameDateTimeArray[0]);
        $dfDate = date_parse_from_format("m-d-Y H:i", $date[0]."-".$date[1]."-".$date[2] . "00:00");
		$dfDate = mktime($dfDate['hour'], $dfDate['minute'], $dfDate['second'], 
			$dfDate['month'], $dfDate['day'], $dfDate['year']);
                
        $soapPreGame = $this->getService('manualPlays');
    	$result = $soapPreGame->gradeManualPlay(array("db"=>$this -> getReadDatabase(),
            "TicketNumber"=>$TicketNumber,
            "WagerNumber"=>$WagerNumber,
            "Outcome"=>$Outcome,
            "DailyFigureDate"=>$dfDate,
            "AmountWagered"=>$AmountWagered,
            "AmountLost"=>$AmountLost,
            "AmountWon"=>$AmountWon));
        
        $res = json_decode($result->return, true);
        return new CakeResponse(array('body' => json_encode($res['results'])));
    }
}
