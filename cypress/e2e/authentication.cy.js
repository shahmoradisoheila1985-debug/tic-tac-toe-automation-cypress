/// <reference types = "cypress"/>
import RegisterLoginPage from "../page-objects/page-login-register/page-common-features.cy"
import RegisterPage from "../page-objects/page-login-register/page-register.cy"
import NavigationBar from "../page-objects/page-navigation/page-navigation-bar.cy"
import PlayPage from "../page-objects/page-navigation/page-play"
import LoginPage from "../page-objects/page-login-register/page-login.cy"

const reglgnpg = new RegisterLoginPage()
const regpg = new RegisterPage()
const nvBr = new NavigationBar()
const plypg = new PlayPage()
const lgnpg = new LoginPage()
const tictactoeurl = Cypress.env("TICTOCTOEURL")


describe('Authentication test cases for `English` language', () => {
  let plyrNmVal
  let errMsgVal
  const appUrl = tictactoeurl["AppUrl"]
  const appLang = "English"
  
  beforeEach(() => {
    cy.fixture('player-names.json').then((plyrNm) =>{
      plyrNmVal = plyrNm
    })
    cy.fixture('error-messages.json').then((errMsg) =>{
      errMsgVal = errMsg
    })
    reglgnpg.navigateToTheWelcomePageAndCheckItIsOpened(appUrl)
    reglgnpg.setApplicationLanguage(appLang)
  })

  it('Validate register a user with a valid name', () => {
    regpg.enterANameInsidePlayerNameField(plyrNmVal.valid)
    regpg.clickOnTheCreateAccountButton()
    nvBr.checkShowNavigationBarSection()
    nvBr.checkShowRegisteredNameInTheNavigationBarSection(plyrNmVal.valid, appLang)
    plypg.checkShowPlayBoard()
  })

  it('Validate login an unknown user', () => {
    reglgnpg.clickOnTheSwitchModeButton()
    lgnpg.checkShowLoginButton()
    regpg.enterANameInsidePlayerNameField(plyrNmVal.unknown)
    lgnpg.clickOnTheLoginButton()
    lgnpg.checkShowLoginButton()
    lgnpg.validateNoAccountNameErrorMessage(errMsgVal.noAccountNameErrorEn)
  })

  it('Validate empty player name', () => {
    regpg.clickOnTheCreateAccountButton()
    regpg.validateEmptyPlayerNameErrorMessageByClickingOnTheCreateAccountButton(errMsgVal.emptyNameErrorEn)
  })

  it('Validate successful login by registered a player', () => {
    regpg.registerAUserByRandomlyPlayerName()
    nvBr.clickOnTheLogOutButton()
    reglgnpg.clickOnTheSwitchModeButton()
    cy.readFile('cypress/files/generatedPlayerNameRandomlyValue.txt').then((gnrtdPlyrNmVal) =>{
      regpg.enterANameInsidePlayerNameField(gnrtdPlyrNmVal)
      lgnpg.clickOnTheLoginButton()
      nvBr.checkShowRegisteredNameInTheNavigationBarSection(gnrtdPlyrNmVal, appLang)
    })
  })

  it('Validate logs out the authenticated user', () => {
    regpg.registerAUserByRandomlyPlayerName()
    nvBr.clickOnTheLogOutButton()
    regpg.checkShowCreateAccountButton()
    nvBr.checkNavigationBarSectionNotExist()
  })

  it('Validate duplicate player name registration', () => {
    regpg.registerAUserByRandomlyPlayerName()
    nvBr.clickOnTheLogOutButton()
    cy.readFile('cypress/files/generatedPlayerNameRandomlyValue.txt').then((gnrtdPlyrNmVal) =>{
      regpg.enterANameInsidePlayerNameField(gnrtdPlyrNmVal)
    })
    regpg.clickOnTheCreateAccountButton()
    regpg.validateDuplicatePlayerNameErrorByClickingOnTheCreateAccountButton(errMsgVal.duplicateNameErrorEn)
  })

  it('Validate rejects a one-character player name', () => {
    regpg.enterANameInsidePlayerNameField(plyrNmVal.short)
    regpg.clickOnTheCreateAccountButton()
    regpg.validateAtLeastCharactersNameErrorMessage(errMsgVal.atLeastCharactersErrorEn)
  })

  it('Validate preserves the session after page reload', () => {
    regpg.registerAUserByRandomlyPlayerName()
    cy.readFile('cypress/files/generatedPlayerNameRandomlyValue.txt').then((gnrtdPlyrNmVal) =>{
      nvBr.checkShowRegisteredNameInTheNavigationBarSection(gnrtdPlyrNmVal, appLang)
    })
    plypg.checkShowPlayBoard()
    cy.reload()
    nvBr.checkShowNavigationBarSection()
    cy.readFile('cypress/files/generatedPlayerNameRandomlyValue.txt').then((gnrtdPlyrNmVal) =>{
      nvBr.checkShowRegisteredNameInTheNavigationBarSection(gnrtdPlyrNmVal, appLang)
    })
    plypg.checkShowPlayBoard()
    reglgnpg.checkAuthenticationFormNotExist()
  })
})

describe('Authentication test cases for `Persian` language', () => {
  let plyrNmVal
  let errMsgVal
  const appUrl = tictactoeurl["AppUrl"]
  const appLang = "Persian"
  
  beforeEach(() => {
    cy.fixture('player-names.json').then((plyrNm) =>{
      plyrNmVal = plyrNm
    })
    cy.fixture('error-messages.json').then((errMsg) =>{
      errMsgVal = errMsg
    })
    reglgnpg.navigateToTheWelcomePageAndCheckItIsOpened(appUrl)
    reglgnpg.setApplicationLanguage(appLang)
  })

  it('Validate register a user with a valid name', () => {
    regpg.enterANameInsidePlayerNameField(plyrNmVal.valid)
    regpg.clickOnTheCreateAccountButton()
    nvBr.checkShowNavigationBarSection()
    nvBr.checkShowRegisteredNameInTheNavigationBarSection(plyrNmVal.valid, appLang)
    plypg.checkShowPlayBoard()
  })

  it('Validate login an unknown user', () => {
    reglgnpg.clickOnTheSwitchModeButton()
    lgnpg.checkShowLoginButton()
    regpg.enterANameInsidePlayerNameField(plyrNmVal.unknown)
    lgnpg.clickOnTheLoginButton()
    lgnpg.checkShowLoginButton()
    lgnpg.validateNoAccountNameErrorMessage(errMsgVal.noAccountNameErrorFa)
  })

  it('Validate empty player name', () => {
    regpg.clickOnTheCreateAccountButton()
    regpg.validateEmptyPlayerNameErrorMessageByClickingOnTheCreateAccountButton(errMsgVal.emptyNameErrorFa)
  })

  it('Validate successful login by registered a player', () => {
    regpg.registerAUserByRandomlyPlayerName()
    nvBr.clickOnTheLogOutButton()
    reglgnpg.clickOnTheSwitchModeButton()
    cy.readFile('cypress/files/generatedPlayerNameRandomlyValue.txt').then((gnrtdPlyrNmVal) =>{
      regpg.enterANameInsidePlayerNameField(gnrtdPlyrNmVal)
      lgnpg.clickOnTheLoginButton()
      nvBr.checkShowRegisteredNameInTheNavigationBarSection(gnrtdPlyrNmVal, appLang)
    })
  })

  it('Validate logs out the authenticated user', () => {
    regpg.registerAUserByRandomlyPlayerName()
    nvBr.clickOnTheLogOutButton()
    regpg.checkShowCreateAccountButton()
    nvBr.checkNavigationBarSectionNotExist()
  })

  it('Validate duplicate player name registration', () => {
    regpg.registerAUserByRandomlyPlayerName()
    nvBr.clickOnTheLogOutButton()
    cy.readFile('cypress/files/generatedPlayerNameRandomlyValue.txt').then((gnrtdPlyrNmVal) =>{
      regpg.enterANameInsidePlayerNameField(gnrtdPlyrNmVal)
    })
    regpg.clickOnTheCreateAccountButton()
    regpg.validateDuplicatePlayerNameErrorByClickingOnTheCreateAccountButton(errMsgVal.duplicateNameErrorFa)
  })

  it('Validate rejects a one-character player name', () => {
    regpg.enterANameInsidePlayerNameField(plyrNmVal.short)
    regpg.clickOnTheCreateAccountButton()
    regpg.validateAtLeastCharactersNameErrorMessage(errMsgVal.atLeastCharactersErrorFa)
  })

  it('Validate preserves the session after page reload', () => {
    regpg.registerAUserByRandomlyPlayerName()
    cy.readFile('cypress/files/generatedPlayerNameRandomlyValue.txt').then((gnrtdPlyrNmVal) =>{
      nvBr.checkShowRegisteredNameInTheNavigationBarSection(gnrtdPlyrNmVal, appLang)
    })
    plypg.checkShowPlayBoard()
    cy.reload()
    nvBr.checkShowNavigationBarSection()
    cy.readFile('cypress/files/generatedPlayerNameRandomlyValue.txt').then((gnrtdPlyrNmVal) =>{
      nvBr.checkShowRegisteredNameInTheNavigationBarSection(gnrtdPlyrNmVal, appLang)
    })
    plypg.checkShowPlayBoard()
    reglgnpg.checkAuthenticationFormNotExist()
  })
})