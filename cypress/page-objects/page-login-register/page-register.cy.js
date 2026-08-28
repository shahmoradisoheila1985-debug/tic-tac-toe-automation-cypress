/// <reference types = "cypress"/>
import RegisterLoginPage from "./page-common-features.cy.js"
import NavigationBar from "../page-navigation/page-navigation-bar.cy.js"

const reglgnpg = new RegisterLoginPage()
const nvBr = new NavigationBar()

class RegisterPage {

    elements = {
        txtReg: "Register",
        fldElPlyrNm: "input-name",
        btnElCrtAcnt: "btn-register",
        msgElAuthErr: "[data-testid='auth-error']",
    }

    checkShowCreateAccountButton(){
        cy.getByTestId(this.elements.btnElCrtAcnt).should('be.visible')
    }

    clickOnTheCreateAccountButton(){
        cy.getByTestId(this.elements.btnElCrtAcnt).click()
    }

    registerAUserByRandomlyPlayerName(){
        const plyrNmVal = reglgnpg.generateUniquePlayerName()
        cy.writeFile('cypress/files/generatedPlayerNameRandomlyValue.txt', plyrNmVal)
        reglgnpg.enterANameInsidePlayerNameField(plyrNmVal)
        this.clickOnTheCreateAccountButton()
        nvBr.checkShowNavigationBarSection()
    }

    validateEmptyPlayerNameErrorMessageByClickingOnTheCreateAccountButton(emptNmErrMsg){
        reglgnpg.validateEnterANameErrorMessage(emptNmErrMsg)
    }

    validateDuplicatePlayerNameErrorByClickingOnTheCreateAccountButton(dupNmErrMsg){
        reglgnpg.validateDuplicatePlayerNameErrorMessage(dupNmErrMsg)
    }

    validateAtLeastCharactersNameErrorMessage(atLstCharErrMsg){
        cy.get(this.elements.msgElAuthErr).should('have.text', atLstCharErrMsg)
    }
}
export default RegisterPage