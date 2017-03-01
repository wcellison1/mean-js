'use strict';

describe('Wants E2E Tests:', function () {
  describe('Test Wants page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/wants');
      expect(element.all(by.repeater('want in wants')).count()).toEqual(0);
    });
  });
});
