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
class ReportsController extends AppController {

    public function index() {
        
    }
    
    public function gprogress(){
        $soapPreGame = $this->getService('preGameService');
        $results = $soapPreGame->getStores(array("db" => $this->getReadDatabase()));

        $array = json_decode($results->return, true);

        $this->set("stores", $array['results']);
    }
    
    public function linehistory(){
        $soapPreGame = $this->getService('preGameService');
        $results = $soapPreGame->getStores(array("db" => $this->getReadDatabase()));

        $array = json_decode($results->return, true);

        $this->set("stores", $array['results']);
    }
    
    public function gamescore(){
        
    }
    
    public function gradeprogress(){
        
    }
}
