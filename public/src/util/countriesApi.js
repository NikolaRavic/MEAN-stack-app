(function(){
  'use strict';

  // Fetch countries service witch servers to fetch needed data from 3rd party API
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