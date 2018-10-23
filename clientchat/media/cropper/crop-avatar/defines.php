<?php session_start();
      define('JD_PATH_CROPPER', realpath(__FILE__));
      define("DS",DIRECTORY_SEPARATOR);
      $pathparse = explode(DS.'media',JD_PATH_CROPPER);
      define('JD_PATH_ROOT',      $pathparse[0]);
      $sessionid = session_id();
      $user =  &$_SESSION['jdcart']['userlogin'.$sessionid];
      //
      $pathRoot= JD_PATH_ROOT.DS.'data'.DS.'images'.DS.'employees';
      if(!empty($user)){
          $userid=$user->_id;
          if($userid>0){
              $pathRoot= JD_PATH_ROOT.DS.'data'.DS.'images'.DS.'employees'.DS.$userid;
              if(is_dir($pathRoot)===false){
                  mkdir($pathRoot,0775);
              }
              $pathRootf= $pathRoot.DS.'files';
              if(is_dir($pathRootf)===false){
                  mkdir($pathRootf,0775);
              }
              $pathRoots= $pathRoot.DS.'docs';
              if(is_dir($pathRoots)===false){
                  mkdir($pathRoots,0775);
              }
          }
      }
      define('JD_PATH_UPLOAD',    $pathRoot.DS);
      define('JD_URL_ROOT_MEDIA',    'http://localhost/asana/erp/');
?>