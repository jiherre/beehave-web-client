import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function () {
  this.route('login');
  this.route('home');

  this.route('features', function () {
    this.route('show', { path: '/:feature_id' });
  });

  this.route('repository', function () {
    this.route('feature-file', { path: '/:feature-file_id' });
  });
});

export default Router;
