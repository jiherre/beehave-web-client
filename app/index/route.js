import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { inject as service } from '@ember/service';

export default Route.extend(AuthenticatedRouteMixin, {
  ajax: service(),
  session: service(),

  model() {
    const headers = {};
    this.session.authorize('authorizer:github', (headerName, headerValue) => {
      headers[headerName] = headerValue;
    });
    return this.ajax.request('http://localhost:3000/projects', { headers });
  }
});
