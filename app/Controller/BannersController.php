<?php


App::uses('AppController', 'Controller');
App::uses('AppModel', 'Model');

class BannersController extends AppController {
    
    
    public function index() {
      $sports = $this->getSportsAndLeagues();
      $this->set('sports', $sports);  
      
      $soap = new AppModel();
      $banners =  $soap->searchAllBanners();	
      
      $this->set('banners', $banners); 
   
    }
    
    public function searchGames(){

	$view = new View($this, false);	
	
	$parameters = array(); 
        $parameters['CustomerID']=Configure::read('default_master_site');
        $parameters['Sport']= ($this->request->data('sport')) != "" ? $this->request->data('sport') : null;
        $parameters['SubSport']= ($this->request->data('subSport')) != "" ? $this->request->data('subSport') : null;
        $parameters['InitialDate']= ($this->request->data('initialDate')) != "" ? $this->request->data('initialDate') : null;
        $parameters['EndDate']= ($this->request->data('endDate')) != "" ? $this->request->data('endDate') : null;
              
        $soap = new AppModel();
        $result = $soap->searchGames($parameters);	

        $detailGames = '';

        if (!empty($result)){
                $games=$result;
        }else{
                $games=null;	
        }
 
        $banners =  $soap->searchAllBanners();	
        $databases = Configure::read('databases');
                        
        $values=array("games" => $games, "banners"  => $banners, "databases" => $databases);
        $detailGames .= $view->element('banners/showGames', $values);
        return new CakeResponse(array('body' => $detailGames)); 
    
    }
    
    public function saveBanner(){
        $view = new View($this, false);	
        
        $parameters = array(); 
        $parameters['CustomerID']=Configure::read('default_master_site');
        $parameters['BannerDescription']= ($this->request->data('banner')) != "" ? $this->request->data('banner') : null;
    
        $soap = new AppModel();
        $result = $soap->saveBanner($parameters);
        
        return new CakeResponse(array('body' => $result[0]['Result'])); 
    }
    
    public function deleteBanner(){
        $view = new View($this, false);	
        
        $parameters = array(); 
        $parameters['CustomerID']=Configure::read('default_master_site');
        $parameters['ID']= ($this->request->data('idBanner')) != "" ? $this->request->data('idBanner') : null;
    
        $soap = new AppModel();
        $result = $soap->deleteBanner($parameters);

        return new CakeResponse(array('body' => $result[0]['Result'])); 
    }
    
    public function searchAllBanners(){
        $view = new View($this, false);	
        $soap = new AppModel();
        $banners =  $soap->searchAllBanners();	
        return new CakeResponse(array('body' => json_encode($banners))); 
    }
    
     public function assignBanner(){        
        $view = new View($this, false);	
        $soap = new AppModel();
        $games = ($this->request->data('games') != "") ? json_decode($this->request->data('games'),true) : null;
        
        if (isset($games) && $games != null){            
            foreach ($games as $row =>$value){
                $parameters = array(); 
                $parameters['CustomerID']=Configure::read('default_master_site');
                $parameters['GameNum']= $value['gamenum'];
                $parameters['SportType']= $value['sportType'];
                $parameters['SportSubType']= $value['sportSubtype'];
                $parameters['ScheduleText']= $value['scheduleText'];
                $parameters['Team1ID']= $value['team1Id'];
                $parameters['Team1RotNum']= $value['team1RotNum'];
                $parameters['GameDate']= $value['gameDate'];
                $parameters['Banner']= $value['banner'] != "-1" ? $value['banner'] : null;
                $parameters['database']= $value['database'];
                
                $result = $soap->assignBannerToGame($parameters); 
            }
            
        }
        
        return new CakeResponse(array('body' => $result[0]['Result'])); 
    }
    
    
}
