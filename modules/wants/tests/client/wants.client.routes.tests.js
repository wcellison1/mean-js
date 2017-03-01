(function () {
  'use strict';

  describe('Wants Route Tests', function () {
    // Initialize global variables
    var $scope,
      WantsService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _WantsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      WantsService = _WantsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('wants');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/wants');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('View Route', function () {
        var viewstate,
          WantsController,
          mockWant;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('wants.view');
          $templateCache.put('modules/wants/client/views/view-want.client.view.html', '');

          // create mock Want
          mockWant = new WantsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Want Name'
          });

          // Initialize Controller
          WantsController = $controller('WantsController as vm', {
            $scope: $scope,
            wantResolve: mockWant
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:wantId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.wantResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            wantId: 1
          })).toEqual('/wants/1');
        }));

        it('should attach an Want to the controller scope', function () {
          expect($scope.vm.want._id).toBe(mockWant._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/wants/client/views/view-want.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          WantsController,
          mockWant;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('wants.create');
          $templateCache.put('modules/wants/client/views/form-want.client.view.html', '');

          // create mock Want
          mockWant = new WantsService();

          // Initialize Controller
          WantsController = $controller('WantsController as vm', {
            $scope: $scope,
            wantResolve: mockWant
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.wantResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/wants/create');
        }));

        it('should attach an Want to the controller scope', function () {
          expect($scope.vm.want._id).toBe(mockWant._id);
          expect($scope.vm.want._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/wants/client/views/form-want.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          WantsController,
          mockWant;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('wants.edit');
          $templateCache.put('modules/wants/client/views/form-want.client.view.html', '');

          // create mock Want
          mockWant = new WantsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Want Name'
          });

          // Initialize Controller
          WantsController = $controller('WantsController as vm', {
            $scope: $scope,
            wantResolve: mockWant
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:wantId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.wantResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            wantId: 1
          })).toEqual('/wants/1/edit');
        }));

        it('should attach an Want to the controller scope', function () {
          expect($scope.vm.want._id).toBe(mockWant._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/wants/client/views/form-want.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
