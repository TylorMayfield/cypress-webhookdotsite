import Request from "./requestBuilder";

class WebHookSiteCommands {
  static get cypressCommands() {
    return ["webHookDotSiteGetToken", "webhookGetResponses"];
  }

  constructor() {
    const defaultApiKey = Cypress.env("webHookDotSiteApiKey");
    this.webHookDotSiteSetApiKey(defaultApiKey);
  }

  webHookDotSiteSetApiKey(apiKey) {
    this.request = new Request({
      apiKey,
    });
  }

  webHookDotSiteGetToken() {
    cy.wrap(this.request.post("token"));
  }

  webHookDotSiteEmailAddress(token) {
    cy.wrap(`${token}.@email.webhook.site`);
  }

  webHookDotSiteWebHookURI(token) {
    cy.wrap(`https://webhook.site/${token}`);
  }

  webHookDotSiteGetResponses(token) {
    let responses = this.request.get(`token/${token}/requests`);
    cy.wrap(responses.data);
  }
}

export default WebHookSiteCommands;
