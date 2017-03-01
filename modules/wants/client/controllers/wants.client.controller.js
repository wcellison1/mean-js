(function () {
  'use strict';

  // Wants controller
  angular
    .module('wants')
    .controller('WantsController', WantsController);

  WantsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'wantResolve'];

  function WantsController ($scope, $state, $window, Authentication, want) {
    var vm = this;
    vm.user = $window.user;
    vm.authentication = Authentication;
    vm.want = want;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Want
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.want.$remove($state.go('wants.list'));
      }
    }

    // Save Want
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.wantForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.want._id) {
        vm.want.$update(successCallback, errorCallback);
      } else {
        vm.want.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('wants.view', {
          wantId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
