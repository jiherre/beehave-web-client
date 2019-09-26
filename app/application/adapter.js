import DS from 'ember-data';
import { inject as service } from '@ember/service';

export default DS.JSONAPIAdapter.extend({
  host: 'http://localhost:3000',
  session: Ember.inject.service(),

  init() {
    const headers = {}
    this._super(...arguments)
    this.session.authorize('authorizer:github', (headerName, headerValue) => {
      headers[headerName] = headerValue;
      this.set('headers', headers)
    });
  }
});
