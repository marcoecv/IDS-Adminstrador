<?php
    global $browser_cache_version;
    echo $this->Html->script('banners/banners.js?='.$browser_cache_version);
?>
<script>
    var arraySports=<?php echo json_encode($sports)?>;
</script>

<div id="header">
    <div class="title">
        Assign Banners
    </div>
</div>
<br>
<table width="98%" align="center" border="0" cellspacing="0" cellpadding="0" class="table table-bordered ">
    <tbody>
        <tr>                                    
            <td style=" width:90%;">
                <div class="form-inline" style="width: 98%">
                    <div class="form-group col-md-2">
                        <label for="tags">Sports: </label>
                        <div class="form-group">
                            <select class="form-control" id="sports" style="width: 200px;">
                                <option value="">Selected Sport</option>  
                                <?php foreach ($sports as $key => $value){ ?>
                                <option><?php echo $key ?></option>  
                                 <?php } ?>
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-md-3">
                        <label for="tags">Sub Sports: </label>
                        <div class="form-group">
                            <select id="subSports" class="form-control" style="width: 300px;">          
                                <option value="">Selected Sub Sport</option>            
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="initialDate" class="control-label">Initial Date: </label>
                        <div class="input-group date form_date col-md-3" id='initialDateBanner' data-date="" data-date-format="yyyy-mm-dd" data-link-field="dtp_input2">
                            <input id="initialDate" name="initialDate" class="form-control" style="width: 200px" type="text" value="">
                            <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="endDate" class="control-label">End Date: </label>
                         <div class="input-group date form_date  col-md-2" id='endDateBanner' data-date="" data-date-format="yyyy-mm-dd" data-link-field="dtp_input2">
                            <input id="endDate" name="endDate" class="form-control" style="width: 200px" type="text" value="">
                            <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
                        </div>
                    </div>
                    <div class="form-group">
                        <button class="btn btn-success" onclick="searchGames();" type="button">Search Games</button>
                    </div>
                    <div class="form-group">
                        <button class="btn btn-success" type="button" id="btnCreateBanner">Create Banner</button>
                    </div>
                    <br> <br>
                </div>
             </td>
        </tr>
        <tr>  
             <td style=" width:90%;" align="center">
                <div id="resultGames"></div>
            </td>
        </tr>
    </tbody>
</table>
<div class="modal in" id="createBanner" tabindex="-1" role="dialog" aria-labelledby="createBannerModal" aria-hidden="true">
    <div class="modal-dialog" style="width: 800px">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="myModalLabel">Create Banner</h4>
            </div>
            <div class="modal-body">
                <form id="formOffice" action="#" role="form" class="form-inline " method="post">
                    <div class="form-group">
                       <label for="newSite_name" class="control-label">Banner Description:</label>
                       <input type="text" id="bannerDescription" name="bannerDescription" class="form-control" value="" placeholder="Enter banner description" size="90">
                       <a class="btn btn-save" id="btn_save" href="#">Save</a>
                    </div> 
                    <span id="errorNoBanner" class="error_hide">This field is required</span> 
                </form>
            </div>
            <div class="modal-header">
                <h4 class="modal-title" id="myModalLabel">Delete Banner</h4>
            </div>
            <div class="modal-body">
                <form id="formOffice" action="#" role="form" class="form-inline " method="post">
                    <div class="form-group ">                        
                        <table width="98%" align="center" border="0" cellspacing="0" cellpadding="0" class="table table-bordered">
                            <thead>
                                <tr>    
                                    <td style="width:90%; vertical-align: middle; text-align:center;"><b>Banner Description:</b></td>
                                    <td style="width:10%; ">&nbsp;</td>                                    
                                </tr>
                            </thead>
                            <tbody>
                                <tr>                 
                                    <td valign="top">                                       
                                        <div class="form-group">
                                            <select class="form-control" id="bannerDelete" style="width: 700px;">
                                                <option value="">Select Banner</option>                                                                                     
                                            </select>                                   
                                        </div>                                   
                                    </td><td style=" width:5%" class="deleteOffice">
                                        <div class="input-group" style="float:left;">
                                            <span class="input-group-addon">
                                                <a href="#"><span class="glyphicon glyphicon-trash"></span></a>
                                            </span>
                                        </div>
                                    </td>
                                </tr>                                 
                            </tbody>
                        </table>
                    </div> 
                </form>
            </div>
            <div class="modal-footer ">
                <a class="btn btn-success" id="btn_cancel" data-dismiss="modal">OK</a> 
                <a class="btn btn-cancel" id="btn_cancel" data-dismiss="modal">Cancel</a>                
            </div>
        </div>
    </div>
</div>

<div class="modal in" id="saveChangeSucces" tabindex="-1" role="dialog" aria-labelledby="saveChangeSuccesModal" aria-hidden="true">
    <div class="modal-dialog" style="width: 400px;">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="myModalLabel">Message!</h4>
            </div>
            <div class="modal-body">
                <div class="col-xs-12">
                    Changes were succesfully applied!!
                </div>
            </div>
            <div class="modal-footer ">
                <button type="button" data-dismiss="modal" class="btn btn-success" onclick="closeMessage();">
                    OK
                </button>
            </div>
        </div>
    </div>
</div>

<div class="modal" id="saveChangeSucces2" tabindex="-1" role="dialog" aria-labelledby="saveChangeSuccesModal" aria-hidden="true">
    <div class="modal-dialog" style="width: 400px;">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="myModalLabel">Message!</h4>
            </div>
            <div class="modal-body">
                <div class="col-xs-12">
                    
                    Changes were succesfully applied!
                    
                </div>
            </div>
            <div class="modal-footer ">
                <button type="button" data-dismiss="modal" class="btn btn-success" onclick="closeMessage2();">
                    OK
                </button>
            </div>
        </div>
    </div>
</div>

<div class="modal" id="selectAgame" tabindex="-1" role="dialog" aria-labelledby="selectAgameModal" aria-hidden="true">
    <div class="modal-dialog" style="width: 400px;">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="myModalLabel">Message!</h4>
            </div>
            <div class="modal-body">
                <div class="col-xs-12">
                   Select a game
                   <br> <br>
                </div>
            </div>
            <div class="modal-footer ">
                <button type="button" data-dismiss="modal" class="btn btn-success">
                    OK
                </button>
            </div>
        </div>
    </div>
</div>

<div class="modal in" id="loadingModal" tabindex="-1" role="dialog" aria-labelledby="saveChangeSuccesModal" aria-hidden="true">

    <div class="col-md-6 col-md-offset-3">
            <!--------------------------SPINNER (LOADING SESSION)----------------------- -->
            <style type="text/css">
                    .sk-spinner-fading-circle.sk-spinner {
                            margin: 0 auto;
                            width: 100px;
                            height: 100px;
                            position: relative;
                    }
                    .sk-spinner-fading-circle .sk-circle {
                            width: 100%;
                            height: 100%;
                            position: absolute;
                            left: 0;
                            top: 0;
                    }
                    .sk-spinner-fading-circle .sk-circle:before {
                            content: '';
                            display: block;
                            margin: 0 auto;
                            width: 10%;
                            height: 10%;
                            background-color: #444;
                            /*border-radius: 100%;*/
                            -webkit-animation: sk-circleFadeDelay 1.2s infinite ease-in-out;
                            animation: sk-circleFadeDelay 1.2s infinite ease-in-out;
                            /* Prevent first frame from flickering when animation starts */
                            -webkit-animation-fill-mode: both;
                            animation-fill-mode: both;
                    }
                    .sk-spinner-fading-circle .sk-circle2 {
                            -webkit-transform: rotate(30deg);
                            -ms-transform: rotate(30deg);
                            transform: rotate(30deg);
                    }
                    .sk-spinner-fading-circle .sk-circle3 {
                            -webkit-transform: rotate(60deg);
                            -ms-transform: rotate(60deg);
                            transform: rotate(60deg);
                    }
                    .sk-spinner-fading-circle .sk-circle4 {
                            -webkit-transform: rotate(90deg);
                            -ms-transform: rotate(90deg);
                            transform: rotate(90deg);
                    }
                    .sk-spinner-fading-circle .sk-circle5 {
                            -webkit-transform: rotate(120deg);
                            -ms-transform: rotate(120deg);
                            transform: rotate(120deg);
                    }
                    .sk-spinner-fading-circle .sk-circle6 {
                            -webkit-transform: rotate(150deg);
                            -ms-transform: rotate(150deg);
                            transform: rotate(150deg);
                    }
                    .sk-spinner-fading-circle .sk-circle7 {
                            -webkit-transform: rotate(180deg);
                            -ms-transform: rotate(180deg);
                            transform: rotate(180deg);
                    }
                    .sk-spinner-fading-circle .sk-circle8 {
                            -webkit-transform: rotate(210deg);
                            -ms-transform: rotate(210deg);
                            transform: rotate(210deg);
                    }
                    .sk-spinner-fading-circle .sk-circle9 {
                            -webkit-transform: rotate(240deg);
                            -ms-transform: rotate(240deg);
                            transform: rotate(240deg);
                    }
                    .sk-spinner-fading-circle .sk-circle10 {
                            -webkit-transform: rotate(270deg);
                            -ms-transform: rotate(270deg);
                            transform: rotate(270deg);
                    }
                    .sk-spinner-fading-circle .sk-circle11 {
                            -webkit-transform: rotate(300deg);
                            -ms-transform: rotate(300deg);
                            transform: rotate(300deg);
                    }
                    .sk-spinner-fading-circle .sk-circle12 {
                            -webkit-transform: rotate(330deg);
                            -ms-transform: rotate(330deg);
                            transform: rotate(330deg);
                    }
                    .sk-spinner-fading-circle .sk-circle2:before {
                            -webkit-animation-delay: -1.1s;
                            animation-delay: -1.1s;
                    }
                    .sk-spinner-fading-circle .sk-circle3:before {
                            -webkit-animation-delay: -1s;
                            animation-delay: -1s;
                    }
                    .sk-spinner-fading-circle .sk-circle4:before {
                            -webkit-animation-delay: -0.9s;
                            animation-delay: -0.9s;
                    }
                    .sk-spinner-fading-circle .sk-circle5:before {
                            -webkit-animation-delay: -0.8s;
                            animation-delay: -0.8s;
                    }
                    .sk-spinner-fading-circle .sk-circle6:before {
                            -webkit-animation-delay: -0.7s;
                            animation-delay: -0.7s;
                    }
                    .sk-spinner-fading-circle .sk-circle7:before {
                            -webkit-animation-delay: -0.6s;
                            animation-delay: -0.6s;
                    }
                    .sk-spinner-fading-circle .sk-circle8:before {
                            -webkit-animation-delay: -0.5s;
                            animation-delay: -0.5s;
                    }
                    .sk-spinner-fading-circle .sk-circle9:before {
                            -webkit-animation-delay: -0.4s;
                            animation-delay: -0.4s;
                    }
                    .sk-spinner-fading-circle .sk-circle10:before {
                            -webkit-animation-delay: -0.3s;
                            animation-delay: -0.3s;
                    }
                    .sk-spinner-fading-circle .sk-circle11:before {
                            -webkit-animation-delay: -0.2s;
                            animation-delay: -0.2s;
                    }
                    .sk-spinner-fading-circle .sk-circle12:before {
                            -webkit-animation-delay: -0.1s;
                            animation-delay: -0.1s;
                    }

                    @-webkit-keyframes sk-circleFadeDelay {
                            0%, 39%, 100% {
                                    opacity: 0; 
                            }

                            40% {
                                    opacity: 1; 
                            }
                    }

                    @keyframes sk-circleFadeDelay {
                            0%, 39%, 100% {
                                    opacity: 0;
                            }

                            40% {
                                    opacity: 1; 
                            } 
                    }

            </style>

            <div class="sk-spinner sk-spinner-fading-circle">
                    <div class="sk-circle1 sk-circle"></div>
                    <div class="sk-circle2 sk-circle"></div>
                    <div class="sk-circle3 sk-circle"></div>
                    <div class="sk-circle4 sk-circle"></div>
                    <div class="sk-circle5 sk-circle"></div>
                    <div class="sk-circle6 sk-circle"></div>
                    <div class="sk-circle7 sk-circle"></div>
                    <div class="sk-circle8 sk-circle"></div>
                    <div class="sk-circle9 sk-circle"></div>
                    <div class="sk-circle10 sk-circle"></div>
                    <div class="sk-circle11 sk-circle"></div>
                    <div class="sk-circle12 sk-circle"></div>
            </div>
    </div>
</div>
