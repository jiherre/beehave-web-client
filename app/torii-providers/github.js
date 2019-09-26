import GithubOAuth2Provider from 'torii/providers/github-oauth2';

export default GithubOAuth2Provider.extend({
  fetch(data) {
    return data;
  }
});