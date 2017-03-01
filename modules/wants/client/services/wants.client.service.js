// Wants service used to communicate Wants REST endpoints
(function () {
  'use strict';

  angular
    .module('wants')
    .factory('WantsService', WantsService);

  WantsService.$inject = ['$resource'];

  function WantsService($resource) {
    return $resource('api/wants/:wantId', {
      wantId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
