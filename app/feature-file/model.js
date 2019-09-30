import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
  sha: DS.attr(),
  name: DS.attr(),
  downloadUrl: DS.attr()
});
