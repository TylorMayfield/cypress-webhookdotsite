const Request = require("./requestBuilder");

const defaultApiKey = Cypress.env("webHookDotSiteApiKey") || null;
let requester = new Request({ defaultApiKey });

const webHookDotSiteGetToken = () => {
  requester.post("token").then((tokenRequest) => {
    expect(tokenRequest.uuid).to.be.a("string");
    expect(tokenRequest.uuid).to.have.length(36);
    cy.wrap(tokenRequest.uuid);
  });
};

const webHookDotSiteEmailAddress = (token) => {
  expect(token).to.have.length(36);
  cy.wrap(`${token}@email.webhook.site`);
};

const webHookDotSiteGetResponses = (token) => {
  expect(token).to.have.length(36);
  requester.get(`token/${token}/requests`).then((requests) => {
    expect(requests.data).to.be.an("array");
    cy.wrap(requests.data);
  });
};

const webHookDotSiteWebHookURI = (token) => {
  expect(token).to.have.length(36);
  cy.wrap(`https://webhook.site/${token}`);
};

Cypress.Commands.add("webHookDotSiteGetToken", webHookDotSiteGetToken);
Cypress.Commands.add("webHookDotSiteEmailAddress", webHookDotSiteEmailAddress);
Cypress.Commands.add("webHookDotSiteGetResponses", webHookDotSiteGetResponses);
Cypress.Commands.add("webHookDotSiteWebHookURI", webHookDotSiteWebHookURI);
