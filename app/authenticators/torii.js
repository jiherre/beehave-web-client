import ToriiAuthenticator from 'ember-simple-auth/authenticators/torii';
import { inject as service } from '@ember/service';
import config from '../config/environment';

export default ToriiAuthenticator.extend({
  torii: service(),
  ajax: service(),

  async authenticate() {
    const tokenExchangeUri = config.torii.providers['github-oauth2'].tokenExchangeUri;
    const data = await this._super(...arguments);

    const response = await this.ajax.request(tokenExchangeUri, {
      type: 'POST',
      crossDomain: true,
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({
        code: data.authorizationCode
      })
    })

    return {
      access_token: response.access_token,
      provider: data.provider
    }
  }
});