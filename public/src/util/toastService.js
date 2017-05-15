(function(){
  'use strict';

  // Toast service which is nice to decouple from controllers logic,
  // because of boilerplate which gets annoying when application grows
  // We can set here several kinds of toast message containers
  // (toast with action, alert toast, info toast, warning toast...) and expose it via service methods

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