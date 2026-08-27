/// <reference types = "cypress"/>
declare global {
  namespace Cypress {
    interface Chainable {
      /** 
       * Get an element and check it is enable or disable
       @param {string} selector - The selector is an element on page
       @example
        cy.getByTestId(".a-text-h3")
      */
      getByTestId(selector: string): Cypress.Chainable
    }
  }
}