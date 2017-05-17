(function(){
  'use strict';

  angular.module('myApp')
    .component('userList', {
      templateUrl: './src/user/components/userList.tpl.html',
      controller: userListController,
      bindings: {
        users: '<',
        fetching: '<',
        onDelete: '&'
      }
    });

  function userListController () {

    // Functions which serve to set sorting option for user list
    this.sortFunction = function () {
      switch (this.sort) {
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

    // This is helper function to change sort var value
    // This should automatically work but for some reason (bug in angular material md-select)
    // this is not working correctly so workaround was needed
    this.onSelect = function (value) {
      this.sort = value;
    }
  }

}());