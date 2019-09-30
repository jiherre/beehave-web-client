import Component from '@ember/component';
import { computed } from '@ember/object';
import { isPresent } from '@ember/utils';
import { inject as service } from '@ember/service';
import elasticlunr from 'elasticlunr'
import { guidFor } from '@ember/object/internals'

export default Component.extend({
  ajax: service(),
  router: service(),
  store: service(),

  suggestions: null,
  dictionaryIndex: null,
  searchQuery: '',
  searchResults: computed('searchQuery', function () {
    if (!this.searchQuery) {
      return this.suggestions
    }
    const res = this.dictionaryIndex.search(this.searchQuery, { expand: true })
    return res.map((occ) => {
      return this.suggestions.findBy('id', occ.ref)
    })
  }),

  didReceiveAttrs() {
    this._super(...arguments)
    this.set('suggestions', []);
    this.set('dictionaryIndex', elasticlunr(function () {
      this.addField('name');
      this.setRef('id');
    }))
    this.loadDictionary()
  },
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
  },

  loadDictionary() {
    fetch("https://raw.githubusercontent.com/jracenet/hps-behat/master/features/beehave/dictionaries/suggestions.json")
      .then(content => {
        return content.json()
      })
      .then(json => {
        this.indexDictionary(json)
      })
  },

  indexDictionary(json) {
    json.forEach(sugg => {
      const doc = {
        id: guidFor(sugg["name"]),
        name: sugg["name"]
      };
      this.suggestions.pushObject(doc);
      this.dictionaryIndex.addDoc(doc);
    })
  }
});
