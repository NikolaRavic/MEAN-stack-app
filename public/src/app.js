(function(){
  'use strict';

  //Registration of our angular module and some config settings

  var app = angular.module('myApp', ['ngMaterial', 'ngMdIcons', 'ngAnimate', 'ngMessages']);
    app.run(()=> {
      console.log('Greetings from Angular! Have a nice day!');
    })
      //set theme palette for styling for Angular Material Design
      .config(function($mdThemingProvider) {
      $mdThemingProvider.theme('default')
        .primaryPalette('blue')
        .accentPalette('red');
    });

}());