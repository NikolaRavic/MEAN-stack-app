(function(){
  'use strict';
  angular.module('myApp')
    .service('toastService', toastService);

  function toastService ($mdToast) {
    return {
      showSimple: showSimple
    };

    function showSimple (text) {
      $mdToast.show(
        $mdToast.simple()
          .textContent(text)
          .position('top right')
          .hideDelay(3000)
      );
    }

  }


}());