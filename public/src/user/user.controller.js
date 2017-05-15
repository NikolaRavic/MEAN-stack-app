(function(){
  'use strict';

  angular.module('myApp')
    .controller('userFormCtrl', userFormCtrl);

  userFormCtrl.$inject = ['$scope',  '$mdDialog', 'countriesService', 'toastService', 'userService'];

  function userFormCtrl($scope,  $mdDialog, countriesService, toastService, userService){
    //init all data
    (function init () {
      $scope.sort = 'oldest';
      $scope.user = {};
      $scope.fetching = true;
      $scope.initialFetch = true;
      $scope.emailValidation = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      getAllUsers();
      getAllCountries();
    }());

    function getAllUsers () {
      userService.getAllUsers()
        .then(getUsersSuccess, errFn);
    }

    function getAllCountries () {
      countriesService.getAll()
        .then(function (response) {
          $scope.countries = [];
          response.data.forEach(function (country) {
            $scope.countries.push(country.name);
          });
        }, errFn);
    }

    function getUsersSuccess (response) {
      $scope.users = response.data;
      if($scope.initialFetch){
        $scope.fetching = false;
        if(response.data.length !== 0){
          toastService.showSimple('All users successfully fetched.');
        } else {
          toastService.showSimple('No users in DB yet.');
        }
        $scope.initialFetch = false;
      }
    }

    function errFn (err) {
      toastService.showSimple(err.message);
      $scope.fetching = false;
      $scope.submiting = false;
    }

    $scope.onSubmit = function (userForm) {
      $scope.submiting = true;
      userService.createUser($scope.user)
        .then(createUserSuccess, errFn)
      function createUserSuccess (response) {
        toastService.showSimple('User ' + $scope.user.fullName + ' successfully added.');
        $scope.user = {};
        userForm.$setPristine();
        userForm.$setUntouched();
        getAllUsers();
        $scope.submiting = false;
      }
    }

    $scope.onDelete = function (user, ev) {
      var confirm = $mdDialog.confirm()
        .title('Delete user?')
        .textContent('This action can not be undone!')
        .ariaLabel('Delete user confirm dialog')
        .targetEvent(ev)
        .ok('Delete')
        .cancel('Cancel');

      $mdDialog.show(confirm).then(function() {
        userService.deleteUser(user._id)
          .then(deleteUserSuccess, errFn);
        function deleteUserSuccess (response) {
          getAllUsers();
          toastService.showSimple('User ' + user.fullName + ' deleted.');
        }
      }, function() {
      });
    }

    $scope.sortFunction = function () {
      switch ($scope.sort) {
        case 'newest':
          return '-timestamp';
          break;
        case 'oldest':
          return 'timestamp';
          break;
        case 'nameAZ':
          return 'fullName';
          break;
        case 'nameZA':
          return '-fullName';
          break;
      }
    }

    $scope.onSelect = function (value) {
      $scope.sort = value;
    }
  }

}());