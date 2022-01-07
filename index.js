const Request = require("./requestBuilder");

const defaultApiKey = Cypress.env("webHookDotSiteApiKey") || null;
let requester = new Request({ defaultApiKey });

const webhookGenerateToken = () => {
  requester.post("token").then((tokenRequest) => {
    expect(tokenRequest.uuid).to.be.a("string");
    expect(tokenRequest.uuid).to.have.length(36);
    cy.wrap(tokenRequest.uuid);
  });
};

const webhookGetEmailAddress = (token) => {
  expect(token).to.have.length(36);
  cy.wrap(`${token}@email.webhook.site`);
};

const webhookGetAllRequests = (token) => {
  expect(token).to.have.length(36);
  requester.get(`token/${token}/requests`).then((requests) => {
    expect(requests.data).to.be.an("array");
    cy.wrap(requests.data);
  });
};

const webhookGetURI = (token) => {
  expect(token).to.have.length(36);
  cy.wrap(`https://webhook.site/${token}`);
};

Cypress.Commands.add("webhookGenerateToken", webhookGenerateToken);
Cypress.Commands.add("webhookGetEmailAddress", webhookGetEmailAddress);
Cypress.Commands.add("webhookGetAllRequests", webhookGetAllRequests);
Cypress.Commands.add("webhookGetURI", webhookGetURI);
