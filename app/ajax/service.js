import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import AjaxService from 'ember-ajax/services/ajax';

export default AjaxService.extend({
  host: "http://localhost:3000",
  session: service(),

  init() {
    const headers = {};
    this._super(...arguments);
    this.session.authorize("authorizer:github", (headerName, headerValue) => {
      headers[headerName] = headerValue;
      this.set("headers", headers);
    });
  }
});