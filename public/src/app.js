(function(){
  'use strict';

  var app = angular.module('myApp', ['ngMaterial', 'ngMdIcons']);
    app.run(()=> {
      console.log('Greetings from Angular! Have a nice day!');
    })
      //set theme palette for styling
      .config(function($mdThemingProvider) {
      $mdThemingProvider.theme('default')
        .primaryPalette('blue')
        .accentPalette('red');
    });

}());