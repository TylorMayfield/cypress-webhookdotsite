const Request = require("./requestBuilder");

const defaultApiKey = Cypress.env("webHookDotSiteApiKey") || null;

const webHookDotSiteGetToken = ({}) => {
  let tokenBody = this.request.post("token");
  cy.wrap(tokenBody.uuid);
};

const webHookDotSiteEmailAddress = ({ token }) => {
  cy.wrap(`${token}.@email.webhook.site`);
};

const webHookDotSiteGetResponses = ({ token }) => {
  let responses = this.request.get(`token/${token}/requests`);
  cy.wrap(responses.data);
};

const webHookDotSiteWebHookURI = ({ token }) => {
  cy.wrap(`https://webhook.site/${token}`);
};

Cypress.Commands.add("webHookDotSiteGetToken", webHookDotSiteGetToken);
Cypress.Commands.add("webHookDotSiteEmailAddress", webHookDotSiteEmailAddress);
Cypress.Commands.add("webHookDotSiteGetResponses", webHookDotSiteGetResponses);
Cypress.Commands.add("webHookDotSiteWebHookURI", webHookDotSiteWebHookURI);
