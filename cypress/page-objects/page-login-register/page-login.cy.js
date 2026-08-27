/// <reference types = "cypress"/>


class LoginPage{

    elements = {
        btnElLgn: "btn-login",
        msgElAuthErr: "[data-testid='auth-error']",
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
}
export default LoginPage