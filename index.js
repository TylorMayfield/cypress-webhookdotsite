const Request = require('./requestBuilder');

let requester = new Request();
// Parameter Options
// token
// password
// apikey

const webhookGenerateToken = (parameters, retry = 0) => {
  requester.post('token', parameters).then((tokenRequest) => {
    cy.log(tokenRequest);
    // if the response code isn't a 200 and it has tried less than 3 times
    if (tokenRequest.status > 400 && retry < 5) {
      cy.wait(1000);
      webhookGenerateToken(parameters, retry + 1);
    }
    if (retry >= 3) {
      throw new Error('Webhook.site is not responding');
    }
    expect(tokenRequest.body.uuid).to.be.a('string');
    expect(tokenRequest.body.uuid).to.have.length(36);
    cy.log('View requests from your browser here:');
    cy.log(`https://webhook.site/#!/${tokenRequest.body.uuid}`);
    if (parameters.hasOwnProperty('password')) {
      requester.put(`token/${tokenRequest.body.uuid}/password`, parameters);
    }
    cy.wrap(tokenRequest.body.uuid);
  });
};

const webhookGetEmailAddress = (parameters) => {
  if (!parameters.hasOwnProperty('token')) {
    throw new Error('You must provide a token');
  }
  expect(parameters.token).to.have.length(36);
  cy.wrap(`${parameters.token}@email.webhook.site`);
};

const webhookGetAllRequests = (parameters, retry = 0) => {
  if (!parameters.hasOwnProperty('token')) {
    throw new Error('You must provide a token');
  }
  expect(parameters.token).to.have.length(36);

  requester.get(`token/${parameters.token}/requests`, parameters).then((requests) => {
    if (requests.status > 400 && retry < 5) {
      cy.wait(1000);
      webhookGetAllRequests(parameters, retry + 1);
    }
    if (retry >= 3) {
      throw new Error('Webhook.site is not responding');
    }
    expect(requests.body.data).to.be.an('array');
    cy.wrap(requests.body.data);
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
