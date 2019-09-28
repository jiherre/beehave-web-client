import Component from '@ember/component';
import { computed } from '@ember/object';
import { isPresent } from '@ember/utils';

export default Component.extend({
  isGherkinChanged: computed('feature.hasDirtyAttributes', 'feature.content', function () {
    return isPresent(this.feature.changedAttributes().content)
  }),

  actions: {
    save() {
      this.feature.save()
    }
  }
});
