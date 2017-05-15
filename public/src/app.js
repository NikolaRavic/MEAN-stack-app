(function(){
  'use strict';

  var app = angular.module('myApp', ['ngMaterial', 'ngMdIcons']);
    app.run(($rootScope)=> {
      console.log('Greetings from Angular! Have a nice working week!');
      $rootScope._ = window._;
    })
      .config(function($mdThemingProvider) {
      $mdThemingProvider.theme('default')
        .primaryPalette('blue')
        .accentPalette('red');
    });

}());