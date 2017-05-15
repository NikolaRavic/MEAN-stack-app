(function(){
  'use strict';

  angular.module('myApp')
    .service('userService', userService);

  function userService($http, config) {
    return {
      getAllUsers: getAllUsers,
      createUser: createUser,
      deleteUser: deleteUser
    };

    function getAllUsers () {
      return $http.get(config.SERVER_URL + 'all-users');
    }

    function createUser (user) {
      return $http.post(config.SERVER_URL + 'add-user', {
        user: user
      });
    }

    function deleteUser (userId) {
      return $http.post(config.SERVER_URL + 'delete-user', {
        id: userId
      });
    }
  }

}());