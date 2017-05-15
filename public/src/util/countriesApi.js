(function(){
  'use strict';
  angular.module('myApp')
    .service('countriesService', countriesService);

  function countriesService ($http) {
    return {
      getAll: getAll
    }

    function getAll () {
      return $http.get('https://restcountries.eu/rest/v2/all');
    }
  }

}());