(function () {
  'use strict';

  angular
    .module('profiles')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Profile',
      state: 'profiles',
      type: 'dropdown',
      roles: ['user']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'profiles', {
      title: 'PAIR Profile',
      state: 'profiles.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'profiles', {
      title: 'Create PAIR Profile',
      state: 'profiles.create',
      roles: ['user']
    });
  }
}());
