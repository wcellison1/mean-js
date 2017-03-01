(function () {
  'use strict';

  angular
    .module('profiles')
    .controller('ProfilesListController', ProfilesListController);

  ProfilesListController.$inject = ['ProfilesService', '$window'];

  function ProfilesListController(ProfilesService, $window) {
    var vm = this;
    vm.user = $window.user;
    vm.profiles = ProfilesService.query();
  }
}());
