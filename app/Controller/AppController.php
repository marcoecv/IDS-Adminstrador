<?php

/**
 * Application level Controller
 *
 * This file is application-wide controller file. You can put all
 * application-wide controller-related methods here.
 *
 * CakePHP(tm) : Rapid Development Framework (http://cakephp.org)
 * Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 *
 * Licensed under The MIT License
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 * @link          http://cakephp.org CakePHP(tm) Project
 * @package       app.Controller
 * @since         CakePHP(tm) v 0.2.9
 * @license       http://www.opensource.org/licenses/mit-license.php MIT License
 */
App::uses('Controller', 'Controller');

/**
 * Application Controller
 *
 * Add your application-wide methods in the class below, your controllers
 * will inherit them.
 *
 * @package		app.Controller
 * @link		http://book.cakephp.org/2.0/en/controllers.html#the-app-controller
 */
class AppController extends Controller {

    /**
     * Function to get a service
     * 
     * @param String The name of the service that is going to be called
     * 
     * @return A soap client of the service 
     * 
     */
    
    
    
    public function beforeFilter() {
    //$this->Session->write("selectedDB".Configure::read("session.id"),"CASABLANCA_EURO"); //Recuperacion de variable de session
        $this->Session->write("databases",  Configure::read("db.edit"));
        if($this->Session->read("selectedDB")!=null){
            Configure::write('db.read',$this->Session->read("selectedDB"));
        }else{
            $this->Session->write("selectedDB","CASABLANCA");
            Configure::write('db.read',$this->Session->read("selectedDB"));
        }
    }
    public function getService($serviceName) {
        try {
            ini_set('soap.wsdl_cache_enabled', 0);
            ini_set('soap.wsdl_cache_ttl', 0);

            $client = new SoapClient($this->getServiceName($serviceName), array('trace' => TRUE, 'cache_wsdl' => WSDL_CACHE_NONE));
            return $client;
        } catch (Exception $e) {
            echo $e->getMessage();
        }

        return null;
    }

    /**
     * Function to set the names and the urls of the services - This needs to be passed to a .ini
     * 
     * @param String The name of the service that is going to be called
     * 
     * @return The url of the service
     */
    private function getServiceName($serviceName) {
        return Configure::read('service.' . $serviceName);
    }

    public function getReadDatabase(){
        if($this->Session->read("selectedDB")=="Master"){
            Configure::write('db.read',$this->Session->read("selectedDB"));
            return "CASABLANCA";
        }else{
            Configure::write('db.read',$this->Session->read("selectedDB"));
            return Configure::read('db.read');
        }
    }

    public function getEditDatabase(){
        if($this->Session->read("selectedDB")=="Master"){
            Configure::write('db.read',$this->Session->read("selectedDB"));
            return Configure::read('db.edit');
        }else{
            Configure::write('db.read',$this->Session->read("selectedDB"));
            return Configure::read('db.read');
        }
    }
    
    public function getDatabases(){
        return Configure::read('db.edit');
    }
    
    
    
     public function getSportsAndLeagues(){
        $soapLdap = $this->requestAction(array('controller' => 'App', 'action' => 'getService', 'preGameSiteService'));
        $result = $soapLdap->getCategories(array("CustomerID" => Configure::read('default_master_site'), "SportType"=>"", "SportSubType"=>""));
        $result = json_decode($result->return, true);
        $sports = (isset($result['results'])) ? $result['results'] : $result;

        $filteredData = array();

        foreach($sports as $sport => $leagues){

            if(!isset($filteredData[$sport]))
                $filteredData[$sport] = array();

            foreach($leagues as $league => $periods){
                array_push($filteredData[$sport], $league);
            }
        }
        ksort($filteredData, SORT_STRING);
        return $filteredData;
    }

}
