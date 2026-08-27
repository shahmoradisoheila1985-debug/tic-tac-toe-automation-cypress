/// <reference types = "cypress"/>
import RegisterLoginPage from "../page-objects/page-login-register/page-common-features.cy"

const regLgnPg = new RegisterLoginPage()


describe('Authentication test cases', () => {
  beforeEach(() => {
    regLgnPg.navigateToTheWelcomePageAndCheckItIsOpened()
  })

  it('AUTH-001: registers a user with a valid name', () => {
    cy.getByTestId('input-auth-name').type('Sara');
    cy.getByTestId('btn-register').click();

    cy.getByTestId('nav').should('be.visible');

    cy.getByTestId('nav-hello')
      .should('contain.text', 'Sara');

    cy.getByTestId('board').should('be.visible');
  });

  it('AUTH-002: rejects an empty player name', () => {
    cy.getByTestId('btn-register').click();

    cy.getByTestId('auth-error').should('be.visible');
    cy.getByTestId('auth-form').should('be.visible');
  });

  it('AUTH-003: rejects a one-character player name', () => {
    cy.getByTestId('input-auth-name').type('S');
    cy.getByTestId('btn-register').click();

    cy.getByTestId('auth-error').should('be.visible');
    cy.getByTestId('auth-form').should('be.visible');
  });

  it('AUTH-004: prevents case-insensitive duplicate registration', () => {
    cy.registerUser('Sara');

    cy.getByTestId('btn-logout').click();

    cy.getByTestId('input-auth-name').type('sara');
    cy.getByTestId('btn-register').click();

    cy.getByTestId('auth-error').should('be.visible');
    cy.getByTestId('auth-form').should('be.visible');
  });

  it('AUTH-005: preserves the session after page reload', () => {
    cy.registerUser('Sara');

    cy.reload();

    cy.getByTestId('nav').should('be.visible');

    cy.getByTestId('nav-hello')
      .should('contain.text', 'Sara');

    cy.getByTestId('board').should('be.visible');
  });

  it('AUTH-006: logs out the authenticated user', () => {
    cy.registerUser('Sara');

    cy.getByTestId('btn-logout').click();

    cy.getByTestId('auth-form').should('be.visible');
    cy.getByTestId('nav').should('not.exist');
    cy.getByTestId('board').should('not.exist');
  });
});