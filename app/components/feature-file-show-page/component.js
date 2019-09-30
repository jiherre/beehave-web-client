import Component from '@ember/component';
import { inject as service } from '@ember/service';


export default Component.extend({
  ajax: service(),
  router: service(),
  store: service(),

  feature: null,
  gherkinContent: null,

  willInsertElement() {
    this._super(...arguments)
    this.set('gherkinContent', '')
    if (this.feature) {
      this.fetchGherkinContent(this.feature.downloadUrl)
    }
  },

  actions: {
    edit() {
      const newFeature = this.store.createRecord('feature', {
        name: this.feature.name,
        content: this.gherkinContent,
      })

      newFeature.save().then((newFeature) => {
        this.router.transitionTo('features')
      })
    }
  },

  fetchGherkinContent(downloadUrl) {
    fetch(downloadUrl)
      .then(content => {
        return content.text()
      })
      .then(text => {
        this.set('gherkinContent', text)
      })
  }
});
