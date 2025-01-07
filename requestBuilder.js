class RequestBuilder {
  constructor(options = {}) {
    this.baseUrl = options.baseUrl || 'https://webhook.site/';
    this.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...options.headers,
    };
    this.failOnStatusCode = options.failOnStatusCode ?? false;
    this.timeout = options.timeout || 30000;
  }

  buildOptions(method, path, parameters = {}) {
    const options = {
      method,
      url: `${this.baseUrl}${path}`,
      headers: { ...this.headers },
      timeout: this.timeout,
      failOnStatusCode: this.failOnStatusCode,
    };

    if (parameters.body) {
      options.body = parameters.body;
    }

    return options;
  }

  validateParameters(parameters = {}) {
    if (parameters.password && !parameters.apikey) {
      throw new Error('You must provide an apikey when using a password');
    }
  }

  buildUrl(baseUrl, path, parameters = {}) {
    const url = new URL(`${baseUrl}${path}`);
    if (parameters.password) {
      url.searchParams.append('password', parameters.password);
    }
    return url.toString();
  }

  async request(method, path, parameters = {}) {
    this.validateParameters(parameters);

    const options = this.buildOptions(method, path, parameters);
    
    if (parameters.apikey) {
      options.headers['Api-Key'] = parameters.apikey;
    }

    options.url = this.buildUrl(this.baseUrl, path, parameters);

    try {
      return await cy.request(options);
    } catch (error) {
      cy.log(`Request failed: ${error.message}`);
      throw error;
    }
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
