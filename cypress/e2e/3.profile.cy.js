/// <reference types="cypress" />

import RegisterLoginPage from '../page-objects/page-login-register/page-common-features.cy.js'
import PlayPage from '../page-objects/page-navigation/page-play.cy.js'
import ProfilePage from '../page-objects/page-navigation/page-profile.cy.js'

const reglgnpg = new RegisterLoginPage()
const plypg = new PlayPage()
const profpg = new ProfilePage()
const tictactoeurl = Cypress.env("TICTOCTOEURL")

describe('Profile test cases in `English`', () => {
  let plyrNmVal = 'Mahshid'
  let updtdPlyrNm = 'Bahar'
  const appUrl = tictactoeurl["AppUrl"]
  const appLang = 'English'

  beforeEach(() => {
    reglgnpg.createAuthenticatedPlayerSession(appUrl, plyrNmVal, appLang)
    reglgnpg.openWelcomePage(appUrl)
    reglgnpg.validateLoggedInUser(plyrNmVal, appLang)
  })

  it('Validate update the player name and preserve it after page reload', () => {
    profpg.openProfilePage()
    profpg.verifyProfilePageIsDisplayed()
    profpg.validateProfileName(plyrNmVal)
    profpg.validatePlayerNameInNavigationBar(plyrNmVal)
    profpg.updatePlayerName(updtdPlyrNm)
    profpg.verifyProfileUpdateSucceeded(updtdPlyrNm)
    cy.reload()
    reglgnpg.validateLoggedInUser(updtdPlyrNm, appLang)
    profpg.openProfilePage()
    profpg.validateProfileName(updtdPlyrNm)
    profpg.validatePlayerNameInNavigationBar(updtdPlyrNm)
  })

  it('Validate update the profile statistics after a completed player win', () => {
    profpg.openProfilePage()
    profpg.verifyProfilePageIsDisplayed()
    profpg.validateNewPlayerStatistics()
    profpg.validateCreatedDateIsNotEmpty()
    reglgnpg.visitWithFixedRandomValue(appUrl, 0)
    reglgnpg.validateLoggedInUser(plyrNmVal, appLang)
    plypg.completeDeterministicPlayerWin()
    profpg.openProfilePage()
    profpg.validatePlayerStatistics({wins: 1, losses: 0, draws: 0,})
    cy.reload()
    reglgnpg.validateLoggedInUser(plyrNmVal, appLang)
    profpg.openProfilePage()
    profpg.validatePlayerStatistics({wins: 1, losses: 0, draws: 0,})
  })

  it('Validate the player account after confirmation and clear the authenticated session', () => {
    profpg.openProfilePage()
    profpg.verifyProfilePageIsDisplayed()
    profpg.deleteAccountAndConfirm()
    profpg.verifyAccountDeletionSucceeded()
    cy.reload()
    profpg.verifyAccountDeletionSucceeded()
  })
})