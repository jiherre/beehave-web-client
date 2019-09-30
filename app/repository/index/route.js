import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  ajax: service(),
  store: service(),

  model() {
    return this.ajax.request('/git_tree').then((files) => {
      return files.map((file) => {
        return this.store.createRecord('feature-file', {
          sha: file.id,
          name: file.name,
          downloadUrl: file.download_url
        })
      })
    })
  }
});
