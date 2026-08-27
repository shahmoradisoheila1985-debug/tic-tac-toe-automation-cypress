/// <reference types = "cypress"/>


class RegisterLoginPage{

    elements = {
        wlcmPgUrl: "/index.html",
        sectElWlcm: "#root",
        msgElAuthErr: "[data-testid='auth-error']",
        btnElSwMd: "btn-switch-mode",
        frmElAuth: "auth-form",
        cboxElLang: "#select-language"
    }

    navigateToTheWelcomePage(appUrl){   
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
        this.navigateToTheWelcomePage(appUrl)
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

        for (let index = 0; index < 6; index += 1) {
        const rndmIndx = Math.floor(Math.random() * alpha.length)
        sfx += alpha[rndmIndx]
    }
        return `${seldNm}${sfx}`
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
}
export default RegisterLoginPage