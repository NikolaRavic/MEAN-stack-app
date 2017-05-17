(function(){
  'use strict';

  // User form controller is our logic for user form and user list UI
  angular.module('myApp')
    .controller('userFormCtrl', userFormCtrl);

  // DI
  userFormCtrl.$inject = ['$scope',  '$mdDialog', 'countriesService', 'toastService', 'userService'];

  function userFormCtrl($scope,  $mdDialog, countriesService, toastService, userService){

    // Init all needed variables and fetch needed data at the beginning
    // This is usually done in router resolve method
    (function init () {

      // initial sorting option for user list
      $scope.sort = 'oldest';

      // Init user object which is 2-way bind to our form in UI
      $scope.user = {};

      // Fetching flag variable which serves to determine if loader should be shown instead of data in UI.
      // For user list linear progress bar is used and for saving to DB circular progress bar is used
      // These can only be seen if communication with backend and DB is slower (this can be emulate with setTimeout() in backend)
      $scope.fetching = true;

      // Initial user list fetching flag which is used just to display first toast message: "All users successfully fetched."
      $scope.initialFetch = true;

      // Fetch all users
      getAllUsers();

      // Get all countries to fill our countries array for select options form element
      getAllCountries();
    }());

    // Fetch all users from DB
    function getAllUsers () {
      userService.getAllUsers()
        .then(getUsersSuccess, errFn);
    }

    // Fetch all countries from 3rd-party API
    function getAllCountries () {
      countriesService.getAll()
        .then(function (response) {
          $scope.countries = [];
          response.data.forEach(function (country) {
            $scope.countries.push(country.name);
          });
        }, errFn);
    }

    //Handle success callback and save users to scope object
    function getUsersSuccess (response) {
      $scope.users = response.data;
      if($scope.initialFetch){
        $scope.fetching = false;
        if(response.data.length !== 0){
          toastService.showSimple('All users successfully fetched.');
        } else {
          toastService.showSimple('No users in DB yet.');
        }
        // This is set in order to disable toast message every time users are fetched
        $scope.initialFetch = false;
      }
    }

    // Handle err response
    function errFn (err) {
      console.log(err);
      toastService.showSimple('Something went wrong: ' + err.data);
      $scope.fetching = false;
      $scope.submiting = false;
    }

    // This function is fired when all input fields are filled and all data are validated
    // in order to add user to DB. If user is saved, users array will be automatically populated
    // And new user will show in the list
    $scope.onSubmit = function (userForm, user) {
      console.log(userForm, user);
      $scope.submiting = true;
      userService.createUser(user)
        .then(createUserSuccess, errFn)
      function createUserSuccess (response) {
        toastService.showSimple('User ' + $scope.user.fullName + ' successfully added.');
        // reset user form
        $scope.user = {};
        userForm.$setPristine();
        userForm.$setUntouched();
        // fetch all users with new populated data
        getAllUsers();
        $scope.submiting = false;
      }
    }

    // Function which will be called when delete button is pressed
    // Confirmation dialog will pop-up. If user confirms selected user will be deleted from DB
    // and toast msg will be shown
    $scope.onDelete = function (user, $event) {
      console.log($event);
      var confirm = $mdDialog.confirm()
        .title('Delete user?')
        .textContent('This action can not be undone!')
        .ariaLabel('Delete user confirm dialog')
        .targetEvent($event)
        .clickOutsideToClose(true)
        .hasBackdrop(false)
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
  }

}());