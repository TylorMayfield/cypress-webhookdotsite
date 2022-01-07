const Request = require("./requestBuilder");

/// <reference types="cypress" />

/**
 * Session token used to retrieve requests
 */
export interface token {
  /**
   * Token Value UUID
   */
  token?: string;
}

/**
 * Paid token used to retrieve
 */
export interface apikey {
  /**
   * Api Key for paid accounts
   */
  apikey?: string;
}

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Set API key if available
       */
      webHookDotSiteSetApiKey(
        /**
         * Set API key if available
         */
        apiKey: string
      ): Cypress.Chainable<string>;

      /**
       * Retrieve session token
       */
      webHookDotSiteGetToken(
        /**
         * Retrieve session token
         */
        token: string
      ): Cypress.Chainable<token>;

      /**
       * Return usable email address
       */
      webHookDotSiteEmailAddress(
        /**
         * Return usable email address
         */
        token: string
      ): Cypress.Chainable<token>;

      /**
       * Return usable webhook uri
       */
      webHookDotSiteWebHookURI(
        /**
         * Return usable webhook uri
         */
        token: string
      ): Cypress.Chainable<token>;

      /**
       * Return an webhook responses
       */
      webHookDotSiteGetResponses(
        /**
         * Return an webhook responses
         */
        token: string
      ): Cypress.Chainable<token>;
    }
  }
}
