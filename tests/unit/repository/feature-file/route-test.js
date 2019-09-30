import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | repository/feature-file', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:repository/feature-file');
    assert.ok(route);
  });
});
