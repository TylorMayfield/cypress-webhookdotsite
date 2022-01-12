class RequestBuilder {
  constructor(options) {
    this.baseUrl = 'https://webhook.site/';
    this.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
  }

  buildOptions(method, path) {
    return {
      method,
      url: `${this.baseUrl}${path}`,
      headers: this.headers,
    };
  }
  request(method, path, parameters) {
    const options = this.buildOptions(method, path);
    if (parameters.hasOwnProperty('password') && !parameters.hasOwnProperty('apikey')) {
      throw new Error('You must provide an apikey if a password is provided');
    }
    if (parameters.hasOwnProperty('apikey')) {
      options.headers['Api-Key'] = parameters.apikey;
    }
    if (parameters.hasOwnProperty('password')) {
      options.url = `${options.url}?password=${parameters.password}`;
    }

    //options.body = body || undefined;
    return cy.request(options).its('body');
  }

  get(path, parameters) {
    return this.request('GET', path, parameters);
  }

  post(path, parameters) {
    return this.request('POST', path, parameters);
  }

  put(path, parameters) {
    return this.request('PUT', path, parameters);
  }

  del(path, parameters) {
    return this.request('DELETE', path, parameters);
  }
}

module.exports = RequestBuilder;
