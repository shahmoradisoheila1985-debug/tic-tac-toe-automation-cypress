/// <reference types="cypress" />

import SettingsPage from "../page-objects/page-settings/page-settings.cy"
import RegisterLoginPage from "../page-objects/page-login-register/page-common-features.cy"

const reglgnpg = new RegisterLoginPage()
const setspg = new SettingsPage()
const tictactoeurl = Cypress.env("TICTOCTOEURL")

describe('Application settings test cases in `English` language', () => {
    const appUrl = tictactoeurl["AppUrl"]
    const appLang = "English"

  beforeEach(() => {
    reglgnpg.navigateToTheWelcomePageAndCheckItIsOpened(appUrl)
    setspg.verifyApplicationIsDisplayed()
    setspg.verifyDefaultSettings()
  })

  it('Validate switch the application language to Persian and enable RTL', () => {
    setspg.verifyEnglishLanguageIsApplied()
    setspg.setLanguage('fa')
    setspg.verifyPersianLanguageIsApplied()
  })

  it('Validate preserve the selected Persian language and RTL direction after page reload', () => {
    setspg.setLanguage('fa')
    setspg.verifyPersianLanguageIsApplied()
    cy.reload()
    setspg.verifyApplicationIsDisplayed()
    setspg.verifyPersianLanguageIsApplied()
  })

  it('Validate apply and preserve the dark theme after page reload', () => {
    setspg.verifyLightThemeIsApplied()
    setspg.setTheme('dark')
    setspg.verifyDarkThemeIsApplied()
    cy.reload()
    setspg.verifyApplicationIsDisplayed()
    setspg.verifyDarkThemeIsApplied()
  })
})