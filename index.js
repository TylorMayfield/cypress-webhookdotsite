const Request = require('./requestBuilder');

const requester = new Request();

const handleError = (func, parameters, retry) => {
  if (retry < 3) {
    cy.wait(1000);
    func(parameters, retry + 1);
  } else {
    throw new Error('Webhook.site is not responding');
  }
};

const validateToken = (token) => {
  if (!token) {
    throw new Error('You must provide a token');
  }
  expect(token).to.have.length(36);
};

const webhookGenerateToken = (parameters, retry = 0) => {
  requester.post('token', parameters).then((tokenRequest) => {
    if (tokenRequest.status > 400) {
      handleError(webhookGenerateToken, parameters, retry);
      return;
    }

    const { uuid } = tokenRequest.body;
    expect(uuid).to.be.a('string').and.have.length(36);

    cy.log('View requests from your browser here:');
    cy.log(`https://webhook.site/#!/${uuid}`);

    if (parameters.hasOwnProperty('password')) {
      requester.put(`token/${uuid}/password`, parameters);
    }

    cy.wrap(uuid);
  });
};

const webhookGetEmailAddress = ({ token }) => {
  validateToken(token);
  cy.wrap(`${token}@email.webhook.site`);
};

const webhookGetAllRequests = (parameters, retry = 0) => {
  const { token } = parameters;

  validateToken(token);

  requester.get(`token/${token}/requests`, parameters).then((requests) => {
    if (requests.status > 400) {
      handleError(webhookGetAllRequests, parameters, retry);
      return;
    }

    expect(requests.body.data).to.be.an('array');
    cy.wrap(requests.body.data);
  });
};

const webhookGetURI = ({ token }) => {
  validateToken(token);
  cy.wrap(`https://webhook.site/${token}`);
};

const webhookDeleteSession = ({ token }) => {
  validateToken(token);
  requester.del(`token/${token}`);
};

Cypress.Commands.add('webhookGenerateToken', webhookGenerateToken);
Cypress.Commands.add('webhookGetEmailAddress', webhookGetEmailAddress);
Cypress.Commands.add('webhookGetAllRequests', webhookGetAllRequests);
Cypress.Commands.add('webhookGetURI', webhookGetURI);
Cypress.Commands.add('webhookDeleteSession', webhookDeleteSession);
