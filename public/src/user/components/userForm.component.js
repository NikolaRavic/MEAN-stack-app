(function(){
  'use strict';

  angular.module('myApp')
    .component('userForm', {
      templateUrl: './src/user/components/userForm.tpl.html',
      controller: userFormController,
      bindings: {
        onSubmit: '&',
        countries: '<',
        submiting: '<'
      }
    });
  
  function userFormController () {

    // Regex for email validation in userForm
    this.emailValidation = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  }



}());