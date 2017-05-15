(function(){
  'use strict';

  //Constant factory to save our environment variables, like DEV_URL, PROD_URL, PORT...
  angular.module('myApp')
    .constant('config',{
      SERVER_URL: 'https://meanstackdemo.herokuapp.com/'
    });
}());