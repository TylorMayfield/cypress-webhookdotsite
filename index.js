const Request = require('./requestBuilder');

let requester = new Request();
// Parameter Options
// token
// password
// apikey

const webhookGenerateToken = (parameters) => {
  requester.post('token', parameters).then((tokenRequest) => {
    expect(tokenRequest.uuid).to.be.a('string');
    expect(tokenRequest.uuid).to.have.length(36);
    cy.log('View requests from your browser here:');
    cy.log(`https://webhook.site/#!/${tokenRequest.uuid}`);
    if (parameters.hasOwnProperty('password')) {
      requester.put(`token/${tokenRequest.uuid}/password`, parameters);
    }
    cy.wrap(tokenRequest.uuid);
  });
};

const webhookGetEmailAddress = (parameters) => {
  if (!parameters.hasOwnProperty('token')) {
    throw new Error('You must provide a token');
  }
  expect(parameters.token).to.have.length(36);
  cy.wrap(`${parameters.token}@email.webhook.site`);
};

const webhookGetAllRequests = (parameters) => {
  if (!parameters.hasOwnProperty('token')) {
    throw new Error('You must provide a token');
  }
  expect(parameters.token).to.have.length(36);
  requester.get(`token/${parameters.token}/requests`, parameters).then((requests) => {
    expect(requests.data).to.be.an('array');
    cy.wrap(requests.data);
  });
};

const webhookGetURI = (parameters) => {
  if (!parameters.hasOwnProperty('token')) {
    throw new Error('You must provide a token');
  }
  expect(parameters.token).to.have.length(36);
  cy.wrap(`https://webhook.site/${parameters.token}`);
};

const webhookDeleteSession = (parameters) => {
  if (!parameters.hasOwnProperty('token')) {
    throw new Error('You must provide a token');
  }
  expect(parameters.token).to.have.length(36);
  requester.del(`token/${parameters.token}`);
};

Cypress.Commands.add('webhookGenerateToken', webhookGenerateToken);
Cypress.Commands.add('webhookGetEmailAddress', webhookGetEmailAddress);
Cypress.Commands.add('webhookGetAllRequests', webhookGetAllRequests);
Cypress.Commands.add('webhookGetURI', webhookGetURI);
Cypress.Commands.add('webhookDeleteSession', webhookDeleteSession);
