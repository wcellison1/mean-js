(function () {
  'use strict';

  angular
    .module('wants')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Looking for',
      state: 'wants',
      type: 'dropdown',
      roles: ['user']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'wants', {
      title: 'PAIR Profiles',
      state: 'wants.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'wants', {
      title: 'Create Ideal Human',
      state: 'wants.create',
      roles: ['user']
    });
  }
}());
