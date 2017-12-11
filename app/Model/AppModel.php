<?php
/**
 * Application model for CakePHP.
 *
 * This file is application-wide model file. You can put all
 * application-wide model-related methods here.
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
 * @package       app.Model
 * @since         CakePHP(tm) v 0.2.9
 * @license       http://www.opensource.org/licenses/mit-license.php MIT License
 */

App::uses('Model', 'Model');

/**
 * Application model for Cake.
 *
 * Add your application-wide methods in the class below, your models
 * will inherit them.
 *
 * @package       app.Model
 */
class AppModel extends Model {

    public function searchGames($parameters){
       
        $soapLdap = $this->requestAction(array('controller' => 'App', 'action' => 'getService', 'preGameSiteService'));	           
        $result = $soapLdap->manageSiteGameBanner(array('CustomerID' => $parameters['CustomerID'],
                                                        'GameNum' => null,            
                                                        'SportType' =>  $parameters['Sport'],
                                                        'SportSubType' =>  $parameters['SubSport'],
                                                        'ScheduleText' =>null,
                                                        'Banner' => null,
                                                        'Option' => 1,
                                                        'InitialDate'=>$parameters['InitialDate'],
                                                        'EndDate'=>$parameters['EndDate'],
                                                        'Team1RotNum'=>null,
                                                        'GameDate'=>null,
                                                        'Team1ID'=>null,
                                                        'database'=>null
                                                        ));
        return json_decode($result->return, true);
        
    }
    
    public function assignBannerToGame($parameters){             
        
        $soapLdap = $this->requestAction(array('controller' => 'App', 'action' => 'getService', 'preGameSiteService'));	           
        $result = $soapLdap->manageSiteGameBanner(array('CustomerID' => $parameters['CustomerID'],
                                                        'GameNum' => $parameters['GameNum'],            
                                                        'SportType' =>  $parameters['SportType'],
                                                        'SportSubType' =>  $parameters['SportSubType'],
                                                        'ScheduleText' =>$parameters['ScheduleText'],                                                       
                                                        'Banner' => $parameters['Banner'],
                                                        'Option' => 2,
                                                        'InitialDate'=>null,
                                                        'EndDate'=>null,
                                                        'Team1RotNum'=>$parameters['Team1RotNum'],
                                                        'GameDate'=>$parameters['GameDate'],
                                                        'Team1ID'=>$parameters['Team1ID'],
                                                        'database'=>$parameters['database']
                                                        ));        
        
        return json_decode($result->return, true);
        
    }
    
    public function saveBanner($parameters){

        $soapLdap = $this->requestAction(array('controller' => 'App', 'action' => 'getService', 'preGameSiteService'));	           
        $result = $soapLdap->manageSiteBannerName(array('CustomerID' => $parameters['CustomerID'],
                                                        'ID' => null,            
                                                        'Banner' =>  $parameters['BannerDescription'],
                                                        'Option' => 4
                                                        ));
        return json_decode($result->return, true);
        
    }
    
    public function deleteBanner($parameters){

        $soapLdap = $this->requestAction(array('controller' => 'App', 'action' => 'getService', 'preGameSiteService'));	           
        $result = $soapLdap->manageSiteBannerName(array('CustomerID' => $parameters['CustomerID'],
                                                        'ID' => $parameters['ID'],            
                                                        'Banner' => null,
                                                        'Option' => 3
                                                        ));
        return json_decode($result->return, true);
        
    }
    
    public function searchAllBanners(){
        $soapLdap = $this->requestAction(array('controller' => 'App', 'action' => 'getService', 'preGameSiteService'));	           
        $result = $soapLdap->manageSiteBannerName(array('CustomerID' => Configure::read('default_master_site'),
                                                        'ID' => null,            
                                                        'Banner' => null,
                                                        'Option' => 1
                                                        ));
        return json_decode($result->return, true);
        
    }
    
    
}
