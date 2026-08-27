/// <reference types = "cypress"/>
import AuthLoginPage from "../../common-classes/auth-login.cy"

const algn = new AuthLoginPage()


class RegisterLoginPage{

    elements = {
        wlcmPgUrl: "/index.html",
        sectElWlcm: "#root"
    }

    navigateToTheWelcomePage(){   
        //cy.visit(this.elements.wlcmPgUrl)
        cy.visit(this.elements.wlcmPgUrl, {
            onBeforeLoad(win) {
                win.localStorage.clear()
            }
        })
    }

    checkTheWelcomePageIsOpened(){
        cy.get(this.elements.sectElWlcm).should('be.visible')
    }

    navigateToTheWelcomePageAndCheckItIsOpened(){
        this.navigateToTheWelcomePage()
        this.checkTheWelcomePageIsOpened()
    }
}
export default RegisterLoginPage