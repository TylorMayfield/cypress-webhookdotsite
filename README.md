# cypress-webhookdotsite

cypress npm extension to allow for email and webhook testing through webhook.site

### What is it?

Webhook.site is a developer tool that provides email and webhook testing. This is a third party library and I have no affiliation to webhook.site or any of its partners.

### Installation

```sh
npm install cypress-webhookdotsite --save-dev
```

Once downloaded, add the following line to `cypress/support/index.js` to import the commands into your Cypress project:

```js
require("cypress-webhookdotsite");
```

### Example Usage

```
      cy.webHookDotSiteGetToken().then((token) => {
        cy.log(`Token: ${token}`);
        cy.webHookDotSiteEmailAddress(token).then((emailAddress) => {
          console.log(emailAddress);
          cy.log(`Email Address: ${emailAddress}`);
        });
        cy.webHookDotSiteWebHookURI(token).then((webHookURI) => {
          console.log(webHookURI);
          cy.log(`WebHook URI: ${webHookURI}`);
          cy.request(webHookURI); // hit our hook so there is an entry
        });
        cy.webHookDotSiteGetResponses(token).then((responses) => {
          console.log(responses);
          responses.forEach((response) => {
            cy.log(`Response: ${response.ip}`);
          });
        });
      });
```

test
