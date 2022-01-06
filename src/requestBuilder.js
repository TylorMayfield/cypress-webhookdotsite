class RequestBuilder {
  constructor(options) {
    this.baseUrl = "https://webhook.site/";
    this.webHookDotSiteApiKey = options.webHookDotSiteApiKey || null;
    this.headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    if (this.webHookDotSiteApiKey) {
      this.headers["Api-Key"] = this.webHookDotSiteApiKey;
    }
  }

  buildOptions(method, path) {
    return {
      method,
      url: `${this.baseUrl}${path}`,
      headers: this.headers,
    };
  }
  request(method, path, body) {
    const options = this.buildOptions(method, path);
    options.body = body || undefined;
    return cy.request(options).its("body");
  }

  get(path) {
    return this.request("GET", path);
  }

  post(path, body) {
    return this.request("POST", path, body);
  }

  put(path, body) {
    return this.request("PUT", path, body);
  }

  del(path) {
    return this.request("DELETE", path);
  }
}

module.exports = RequestBuilder;
