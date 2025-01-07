const Request = require('./requestBuilder');

const requester = new Request();

const MAX_RETRIES = 3;
const RETRY_DELAY = 3000;

const handleError = async (func, parameters, retry = 0) => {
  if (retry < MAX_RETRIES) {
    cy.log(`Retrying request... Attempt ${retry + 1} of ${MAX_RETRIES}`);
    await cy.wait(RETRY_DELAY);
    return func(parameters, retry + 1);
  }
  throw new Error('Webhook.site is not responding after multiple retries');
};

const validateToken = (token) => {
  if (!token) {
    throw new Error('Token is required');
  }
  if (typeof token !== 'string') {
    throw new Error('Token must be a string');
  }
  if (token.length !== 36) {
    throw new Error('Invalid token format: must be 36 characters long');
  }
};

const webhookGenerateToken = async (parameters = {}, retry = 0) => {
  try {
    const tokenRequest = await requester.post('token', parameters);

    if (tokenRequest.status >= 400) {
      return handleError(webhookGenerateToken, parameters, retry);
    }

    const { uuid } = tokenRequest.body;
    validateToken(uuid);

    cy.log('Webhook URL generated successfully!');
    cy.log(`View requests at: https://webhook.site/#!/${uuid}`);

    if (parameters.password) {
      await requester.put(`token/${uuid}/password`, parameters);
      cy.log('Password protection enabled');
    }

    return cy.wrap(uuid);
  } catch (error) {
    return handleError(webhookGenerateToken, parameters, retry);
  }
};

const webhookGetEmailAddress = ({ token }) => {
  validateToken(token);
  return cy.wrap(`${token}@email.webhook.site`);
};

const webhookGetAllRequests = async (parameters = {}, retry = 0) => {
  const { token } = parameters;
  validateToken(token);

  try {
    const requests = await requester.get(`token/${token}/requests`, parameters);

    if (requests.status >= 400) {
      return handleError(webhookGetAllRequests, parameters, retry);
    }

    const { data } = requests.body;
    if (!Array.isArray(data)) {
      throw new Error('Invalid response format: expected an array of requests');
    }

    return cy.wrap(data);
  } catch (error) {
    return handleError(webhookGetAllRequests, parameters, retry);
  }
};

const webhookGetURI = ({ token }) => {
  validateToken(token);
  return cy.wrap(`https://webhook.site/${token}`);
};

const webhookDeleteSession = async ({ token }) => {
  validateToken(token);
  try {
    await requester.del(`token/${token}`);
    cy.log('Session deleted successfully');
  } catch (error) {
    cy.log(`Failed to delete session: ${error.message}`);
    throw error;
  }
};

Cypress.Commands.add('webhookGenerateToken', webhookGenerateToken);
Cypress.Commands.add('webhookGetEmailAddress', webhookGetEmailAddress);
Cypress.Commands.add('webhookGetAllRequests', webhookGetAllRequests);
Cypress.Commands.add('webhookGetURI', webhookGetURI);
Cypress.Commands.add('webhookDeleteSession', webhookDeleteSession);
