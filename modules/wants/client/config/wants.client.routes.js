(function () {
  'use strict';

  angular
    .module('wants')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('wants', {
        abstract: true,
        url: '/wants',
        template: '<ui-view/>'
      })
      .state('wants.list', {
        url: '',
        templateUrl: 'modules/wants/client/views/list-wants.client.view.html',
        controller: 'WantsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Wants List'
        }
      })
      .state('wants.create', {
        url: '/create',
        templateUrl: 'modules/wants/client/views/form-want.client.view.html',
        controller: 'WantsController',
        controllerAs: 'vm',
        resolve: {
          wantResolve: newWant
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Wants Create'
        }
      })
      .state('wants.edit', {
        url: '/:wantId/edit',
        templateUrl: 'modules/wants/client/views/form-want.client.view.html',
        controller: 'WantsController',
        controllerAs: 'vm',
        resolve: {
          wantResolve: getWant
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Want {{ wantResolve.name }}'
        }
      })
      .state('wants.view', {
        url: '/:wantId',
        templateUrl: 'modules/wants/client/views/view-want.client.view.html',
        controller: 'WantsController',
        controllerAs: 'vm',
        resolve: {
          wantResolve: getWant
        },
        data: {
          pageTitle: 'Want {{ wantResolve.name }}'
        }
      });
  }

  getWant.$inject = ['$stateParams', 'WantsService'];

  function getWant($stateParams, WantsService) {
    return WantsService.get({
      wantId: $stateParams.wantId
    }).$promise;
  }

  newWant.$inject = ['WantsService'];

  function newWant(WantsService) {
    return new WantsService();
  }
}());
