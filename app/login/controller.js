import Controller from '@ember/controller';

export default Controller.extend({
  session: Ember.inject.service(),

  actions: {
    login() {
      this.session.authenticate('authenticator:torii', 'github')
    }
  }
});
