import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  store: service(),

  showCreationModal: false,
  newFeatureName: '',

  didReceiveAttrs() {
    this._super(...arguments)
    this.store.findAll('feature')
    this.set('features', this.store.peekAll('feature'))
  },

  filteredFeatures: computed('features.[]', function () {
    return this.features.filterBy('isDeleted', false)
  }),

  actions: {
    toggleCreationModal() {
      this.toggleProperty('showCreationModal')
    },

    async createFeature() {
      const newFeature = this.store.createRecord('feature', { name: this.get('newFeatureName') })

      try {
        await newFeature.save()
        this.set('newFeatureName', '')
        this.toggleProperty('showCreationModal')
      } catch (err) {
        newFeature.rollbackAttributes()
        console.error(err)
      }
    }
  }
});
