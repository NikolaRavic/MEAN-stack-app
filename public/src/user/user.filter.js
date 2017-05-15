(function(){
  'use strict';
  angular.module('myApp')
    .filter('sort', function (_) {
      return function (users, option) {
        var outputUsers = [];
        switch (option) {
          case 'newest':
            outputUsers = _.sortBy(users, 'timestamp');
        }
      }
    })



}());