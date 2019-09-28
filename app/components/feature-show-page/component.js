import Component from '@ember/component';
import { computed } from '@ember/object';
import { isPresent } from '@ember/utils';
import { inject as service } from '@ember/service';

export default Component.extend({
  ajax: service(),

  isGherkinChanged: computed('feature.hasDirtyAttributes', 'feature.content', function () {
    return isPresent(this.feature.changedAttributes().content)
  }),

  actions: {
    save() {
      this.feature.save()
    },

    pushToGit() {
      this.ajax.request(`http://localhost:3000/features/${this.feature.id}/push`, {
        method: 'POST'
      })
    }
  }
});
