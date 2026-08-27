/// <reference types = "cypress"/>


class NavigationBar{

    elements = {
        btnElLgOt: "btn-logout",
        sectElNavBr: "nav",
        valElUsrNm: "[data-testid='hello-user']",
    }

    checkShowNavigationBarSection(){
        cy.getByTestId(this.elements.sectElNavBr).should('be.visible')
    }

    checkNavigationBarSectionNotExist(){
        cy.getByTestId(this.elements.sectElNavBr).should('not.exist')
    }

    checkShowRegisteredNameInTheNavigationBarSection(rgNmVal, langVal){
        cy.get(this.elements.valElUsrNm).invoke('text').then((hloSectVal) =>{
            let usrNmVal
            if(langVal == "English"){
                usrNmVal = hloSectVal.trim().split(',')[1].trim()
            }else if(langVal == "Persian"){
                usrNmVal = hloSectVal.trim().split('،')[1].trim()
            }
            expect(usrNmVal).to.equal(rgNmVal)
        })
    }

    clickOnTheLogOutButton(){
        cy.getByTestId(this.elements.btnElLgOt).should('be.visible').click()
    }
}
export default NavigationBar