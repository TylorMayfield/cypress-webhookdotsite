# cypress-webhookdotsite

[![Node.js Package](https://github.com/TylorMayfield/cypress-webhookdotsite/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/TylorMayfield/cypress-webhookdotsite/actions/workflows/npm-publish.yml)

[![NPM](https://nodei.co/npm/cypress-webhookdotsite.png?mini=true)](https://npmjs.org/package/cypress-webhookdotsite)

A Cypress plugin that facilitates email and webhook testing through [Webhook.site](https://webhook.site/).

## What is it?

[Webhook.site](https://webhook.site/) is a developer tool that provides email and webhook testing capabilities. This plugin integrates Webhook.site with Cypress to allow automated testing of webhook events and emails. This is a third-party library with no affiliation to Webhook.site or its partners.

## Installation

Install `cypress-webhookdotsite` as a development dependency:

```sh
npm install cypress-webhookdotsite --save-dev
```

Then, import the plugin in your Cypress support file (e.g., `cypress/support/index.js` or `cypress/support/e2e.js`):

```js
require('cypress-webhookdotsite');
```

## Usage

Use the provided Cypress commands to interact with Webhook.site's API.

### Example

```javascript
describe('Webhook.site Testing', () => {
  it('Generates a token, retrieves an email address and webhook URI, and fetches requests', () => {
    cy.webhookGenerateToken({
      apikey: Cypress.env('WEBHOOKSITE_API_KEY'),
      password: Cypress.env('WEBHOOKSITE_PASSWORD'),
    }).then((token) => {
      cy.log(`Token: ${token}`);

      cy.webhookGetEmailAddress({
        token,
        apikey: Cypress.env('WEBHOOKSITE_API_KEY'),
        password: Cypress.env('WEBHOOKSITE_PASSWORD'),
      }).then((emailAddress) => {
        cy.log(`Email Address: ${emailAddress}`);
      });

      cy.webhookGetURI({
        token,
        apikey: Cypress.env('WEBHOOKSITE_API_KEY'),
        password: Cypress.env('WEBHOOKSITE_PASSWORD'),
      }).then((webHookURI) => {
        cy.log(`WebHook URI: ${webHookURI}`);
        cy.request(webHookURI);
      });

      cy.webhookGetAllRequests({
        token,
        apikey: Cypress.env('WEBHOOKSITE_API_KEY'),
        password: Cypress.env('WEBHOOKSITE_PASSWORD'),
      }).then((responses) => {
        responses.forEach((response) => {
          cy.log(`Response: ${response.ip}`);
        });
      });
    });
  });
});
```

## Configuration

To keep credentials secure, store your Webhook.site API key and password in Cypress environment variables:

```js
module.exports = {
  env: {
    WEBHOOKSITE_API_KEY: 'your-api-key',
    WEBHOOKSITE_PASSWORD: 'your-password',
  }
};
```

Then, reference them in your tests as shown in the example above.

## Features
- ✅ Automates email and webhook testing with Webhook.site
- ✅ Securely retrieves email addresses and webhook URIs
- ✅ Fetches and logs webhook requests
- ✅ Seamless integration with Cypress

## Contributing
Pull requests and issues are welcome! If you have ideas for improvements or encounter bugs, feel free to contribute.

## License
This project is licensed under the [MIT License](LICENSE).
