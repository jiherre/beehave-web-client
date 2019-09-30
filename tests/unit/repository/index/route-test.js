import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | repository/index', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:repository/index');
    assert.ok(route);
  });
});
