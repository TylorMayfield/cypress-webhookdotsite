export interface token {
  token: string;
}

declare global {
  namespace Cypress {
    interface Chainable {
      webHookDotSiteWebHookURI(token: string): Cypress.Chainable<string>;
      webHookDotSiteGetResponses(token: string): Cypress.Chainable<any>;
      webHookDotSiteEmailAddress(token: string): Cypress.Chainable<string>;
      webHookDotSiteGetToken(): Cypress.Chainable<string>;
    }
  }
}
