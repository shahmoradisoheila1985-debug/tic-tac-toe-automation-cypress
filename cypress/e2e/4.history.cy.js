/// <reference types="cypress" />

import RegisterLoginPage from '../page-objects/page-login-register/page-common-features.cy.js'
import PlayPage from '../page-objects/page-navigation/page-play.cy.js'
import HistoryPage from '../page-objects/page-navigation/page-history.cy.js'

const reglgnpg = new RegisterLoginPage()
const playPage = new PlayPage()
const hstrypg = new HistoryPage()
const tictactoeurl = Cypress.env("TICTOCTOEURL")

describe('Game history test cases in English', () => {
  let plyrNmVal = 'Mohi'
  const appUrl = tictactoeurl["AppUrl"]
  const appLang = 'English'

    beforeEach(() => {
        reglgnpg.createAuthenticatedPlayerSession(appUrl, plyrNmVal, appLang)
        reglgnpg.openWelcomePage(appUrl)
        reglgnpg.validateLoggedInUser(plyrNmVal, appLang)
        reglgnpg.visitWithFixedRandomValue(appUrl, 0)
        reglgnpg.validateLoggedInUser(plyrNmVal, appLang)
    })

    it('Validate display an empty history state for a new player', () => {
        hstrypg.openHistoryPage()
        hstrypg.validateHistoryPageIsDisplayed()
        hstrypg.validateHistoryRecordCount(0)
        hstrypg.validateEmptyHistoryState()
    })

    it('Validate record a completed player win exactly once and preserve it after reload', () => {
        playPage.completeDeterministicPlayerWin()
        hstrypg.openHistoryPage()
        hstrypg.validateHistoryPageIsDisplayed()
        hstrypg.validateHistoryTableIsDisplayed()
        hstrypg.validateHistoryRecordCount(1)
        hstrypg.validateHistoryRecord(0, 'win', 'Easy')
        hstrypg.openPlayPage()
        hstrypg.openHistoryPage()
        hstrypg.validateHistoryRecordCount(1)
        cy.reload()
        reglgnpg.validateLoggedInUser(plyrNmVal, appLang)
        hstrypg.openHistoryPage()
        hstrypg.validateHistoryRecordCount(1)
        hstrypg.validateHistoryRecord(0, 'win', 'Easy')
    })

    it('Validate clear all game history after confirmation', () => {
        playPage.completeDeterministicPlayerWin()
        hstrypg.openHistoryPage()
        hstrypg.validateHistoryTableIsDisplayed()
        hstrypg.validateHistoryRecordCount(1)
        hstrypg.clearHistoryAndConfirm()
        hstrypg.validateHistoryRecordCount(0)
        hstrypg.validateEmptyHistoryState()
        cy.reload()
        reglgnpg.validateLoggedInUser(plyrNmVal, appLang)
        hstrypg.openHistoryPage()
        hstrypg.validateHistoryRecordCount(0)
        hstrypg.validateEmptyHistoryState()
    })
})