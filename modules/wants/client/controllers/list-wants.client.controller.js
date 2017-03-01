(function () {
  'use strict';

  angular
    .module('wants')
    .controller('WantsListController', WantsListController);

  WantsListController.$inject = ['WantsService', '$window'];

  function WantsListController(WantsService, $window) {
    var vm = this;
    vm.user = $window.user;
    vm.wants = WantsService.query();
  }
}());
