/// <reference types = "cypress"/>
import NavigationBar from "../page-navigation/page-navigation-bar.cy.js"
import PlayPage from "../page-navigation/page-play.cy.js"

const nvBr = new NavigationBar()
const plypg = new PlayPage()

class RegisterLoginPage {
    elements = {
        sectElWlcm: "#root",
        fldElPlyrNm: "input-name",
        msgElAuthErr: "[data-testid='auth-error']",
        authElErr: "auth-error",
        sectElNavBr: "nav",
        sectElWlcmMsg: "nav-hello",
        btnElSwMd: "btn-switch-mode",
        frmElAuth: "auth-form",
        cboxElLang: "#select-language",
        attrDtMd: "data-mode",
        txtReg: "register",
        txtLgn: "login",
        inptPlyrNm: 'input-auth-name',
        btnElLgn: "btn-login",
        btnElCrtAcnt: "btn-register",
    }

    openWelcomePage(appUrl){
        cy.visit(appUrl)
    }

    navigateToTheWelcomePageByClearStorage(appUrl){   
        cy.visit(appUrl, {
            onBeforeLoad(win) {
                win.localStorage.clear()
            }
        })
    }

    checkTheWelcomePageIsOpened(){
        cy.get(this.elements.sectElWlcm).should('be.visible')
    }

    navigateToTheWelcomePageAndCheckItIsOpened(appUrl){
        this.navigateToTheWelcomePageByClearStorage(appUrl)
        this.checkTheWelcomePageIsOpened()
    }

    generateUniquePlayerName() {
        const plyrNms = [
          'Alice',
          'Daniel',
          'Emma',
          'Henry',
          'Julia',
          'Lucas',
        ]
        const alpha = 'abcdefghijklmnopqrstuvwxyz'
        const seldNm = plyrNms[Math.floor(Math.random() * plyrNms.length)]
        let sfx = ''

        for (let i = 0; i < 6; i += 1) {
        const rndmIndx = Math.floor(Math.random() * alpha.length)
        sfx += alpha[rndmIndx]
    }
        return `${seldNm}${sfx}`
    }

    enterANameInsidePlayerNameField(nmVal){
        cy.getByTestId(this.elements.fldElPlyrNm).type(nmVal)
    }

    validateEnterANameErrorMessage(errMsgVal){
        cy.get(this.elements.msgElAuthErr).should('have.text', errMsgVal)
    }

    validateDuplicatePlayerNameErrorMessage(dupePlyrNmErrMsg){
        cy.get(this.elements.msgElAuthErr).should('have.text', dupePlyrNmErrMsg)
    }

    clickOnTheSwitchModeButton(){
        cy.getByTestId(this.elements.btnElSwMd).click()
    }

    checkAuthenticationFormNotExist(){
        cy.getByTestId(this.elements.frmElAuth).should('not.exist')
    }

    setApplicationLanguage(trgtLang){
        cy.get(this.elements.cboxElLang).then(($ele) => {
          const currLang = $ele.val()
          if (currLang !== trgtLang) {
            cy.wrap($ele).select(trgtLang)
          }
        })
    }

    setAuthenticationMode(trgtMd) {
        const sprtdMds = [this.elements.txtReg, this.elements.txtLgn]

        if (!sprtdMds.includes(trgtMd)) {
          throw new Error(
            `Unsupported authentication mode: "${trgtMd}". ` + 'Use "register" or "login".'
          )
        }
        return cy.getByTestId(this.elements.frmElAuth).should('be.visible').then(($ele) => {
            const currMd = $ele.attr(this.elements.attrDtMd)

            if (currMd !== trgtMd) {
                return cy.getByTestId(this.elements.btnElSwMd).should('be.visible').click()
            }
        }).then(() => {
          cy.getByTestId(this.elements.frmElAuth).should('have.attr', this.elements.attrDtMd, trgtMd)
        })
    }

    login(plyrNm) {
        this.setAuthenticationMode(this.elements.txtLgn)
        cy.getByTestId(this.elements.fldElPlyrNm).clear().type(plyrNm)
        cy.getByTestId(this.elements.btnElLgn).click()
    }

    register(plyrNm) {
        this.setAuthenticationMode(this.elements.txtReg)
        this.enterANameInsidePlayerNameField(plyrNm)
        cy.getByTestId(this.elements.btnElCrtAcnt).click()
    }

    loginOrRegister(plyrNm) {
        this.login(plyrNm)
        cy.get('body').then(($bdy) => {
            const acntNtFnd = $bdy.find(`[data-testid='${this.elements.fldElPlyrNm}']`).length > 0
            if (acntNtFnd) {
              this.register(plyrNm)
            }
        })
    }

    validateLoggedInUser(plyrNm, appLang){
        nvBr.checkShowNavigationBarSection()
        nvBr.checkShowRegisteredNameInTheNavigationBarSection(plyrNm, appLang)
        plypg.checkGameBoardIsDisplayed()
        this.checkAuthenticationFormNotExist()
    }

    createAuthenticatedPlayerSession(appUrl, plyrNm, appLang){
        return cy.session(['authenticated-player', plyrNm, appLang],() => {
            cy.visit(appUrl)
            this.setApplicationLanguage(appLang)
            this.loginOrRegister(plyrNm)
            this.validateLoggedInUser(plyrNm, appLang)
        })
    }

    visitWithFixedRandomValue(appUrl, rndmVal) {
        return cy.visit(appUrl, {onBeforeLoad(win) {
              cy.stub(win.Math, 'random').returns(rndmVal)
            }
        })
    }
}
export default RegisterLoginPage