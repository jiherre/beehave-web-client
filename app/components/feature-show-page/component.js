import Component from '@ember/component';
import { computed } from '@ember/object';
import { isPresent } from '@ember/utils';
import { inject as service } from '@ember/service';

export default Component.extend({
  ajax: service(),
  router: service(),

  isGherkinChanged: computed('feature.content', function () {
    return isPresent(this.feature.changedAttributes().content)
  }),

  actions: {
    save() {
      this.feature.save().then(() => {
        this.notifyPropertyChange('isGherkinChanged')
      })
    },

    pushToGit() {
      this.ajax.request(`http://localhost:3000/features/${this.feature.id}/push`, {
        method: 'POST'
      }).then(() => {
        this.feature.destroyRecord()
        this.router.transitionTo('features')
      })
    }
  }
});
