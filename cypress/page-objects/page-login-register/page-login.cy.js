/// <reference types = "cypress"/>
import RegisterLoginPage from "./page-common-features.cy.js"

const reglgnpg = new RegisterLoginPage()

class LoginPage {

    elements = {
        txtLgn: "Login",
        inptPlyrNm: 'input-auth-name',
        btnElLgn: "btn-login",
        msgElAuthErr: "[data-testid='auth-error']"
    }

    checkShowLoginButton(){
        cy.getByTestId(this.elements.btnElLgn).should('be.visible')
    }

    clickOnTheLoginButton(){
        cy.getByTestId(this.elements.btnElLgn).click()
    }

    validateNoAccountNameErrorMessage(nAcntNmErrMsg){
        cy.get(this.elements.msgElAuthErr).should('have.text', nAcntNmErrMsg)
    }

    // login(plyrNm) {
    //     reglgnpg.setAuthenticationMode(this.elements.txtLgn)
    //     cy.getByTestId(this.elements.inptPlyrNm).clear().type(plyrNm)
    //     cy.getByTestId(this.elements.btnElLgn).click()
    // }
}
export default LoginPage