/// <reference types="cypress" />

class ProfilePage {
  elements = {
    btnElProfNav: 'nav-profile',
    sectElProfVw: 'view-profile',
    ttlElProf: 'profile-title',
    frmElProf: 'profile-form',
    inptElProfNm: 'input-profile-name',
    btnElSvProf: 'btn-save-profile',
    msgElProfSucc: 'profile-message',
    msgElProfErr: 'profile-error',
    sectElProfStat: 'profile-stats',
    sectElProfCrtdDt: 'profile-created',
    sectElProfWns: 'profile-wins',
    sectElProLss: 'profile-losses',
    sectElProDrws: 'profile-draws',
    btnElDelAcnt: 'btn-delete-account',
    sectElNavBr: 'nav',
    sectElNavBr: 'nav',
    frmElAuth: 'auth-form',
  }

    openProfilePage() {
        cy.getByTestId(this.elements.btnElProfNav).should('be.visible').click()
        cy.getByTestId(this.elements.sectElProfVw).should('be.visible')
    }

    verifyProfilePageIsDisplayed() {
        cy.getByTestId(this.elements.sectElProfVw).should('be.visible')
        cy.getByTestId(this.elements.ttlElProf).should('be.visible')
        cy.getByTestId(this.elements.frmElProf).should('be.visible')
        cy.getByTestId(this.elements.inptElProfNm).should('be.visible')
        cy.getByTestId(this.elements.sectElProfStat).should('be.visible')
    }

    updatePlayerName(nwPlyrNm) {
        if (typeof nwPlyrNm !== 'string' || nwPlyrNm.trim().length < 2) {
          throw new Error(
            'The new player name must contain at least two characters.'
          )
        }
        cy.getByTestId(this.elements.inptElProfNm).should('be.visible').clear().type(nwPlyrNm.trim())
        cy.getByTestId(this.elements.btnElSvProf).should('be.visible').and('not.be.disabled').click()
    }

    verifyProfileUpdateSucceeded(expdPlyrNm) {
        cy.getByTestId(this.elements.msgElProfSucc).should('be.visible').and('not.have.text', '')
        cy.getByTestId(this.elements.inptElProfNm).should('have.value', expdPlyrNm)
        cy.getByTestId(this.elements.sectElNavBr).should('be.visible').and('contain.text', expdPlyrNm)
        cy.getByTestId(this.elements.msgElProfErr).should('not.exist')
    }

    validatePlayerNameInNavigationBar(expdPlyrNm) {
        cy.getByTestId(this.elements.sectElNavBr).should('be.visible').and('contain.text', expdPlyrNm)
    }

    validateProfileName(expdPlyrNm) {
        cy.getByTestId(this.elements.inptElProfNm).should('be.visible').and('have.value', expdPlyrNm)
    }

    validateCreatedDateIsNotEmpty() {
        cy.getByTestId(this.elements.sectElProfCrtdDt).should('be.visible').invoke('text').then((dateText) => {
            expect(dateText.trim()).not.to.equal('')
        })
    }

    validatePlayerStatistics({wins, losses, draws}) {
        cy.getByTestId(this.elements.sectElProfWns).should('be.visible').and('have.text', String(wins))
        cy.getByTestId(this.elements.sectElProLss).should('be.visible').and('have.text', String(losses))
        cy.getByTestId(this.elements.sectElProDrws).should('be.visible').and('have.text', String(draws))
    }

    validateNewPlayerStatistics() {
        this.validatePlayerStatistics({wins: 0, losses: 0, draws: 0,
        })
    }

    deleteAccountAndConfirm() {
        cy.window().then((win) => {
          cy.stub(win, 'confirm')
            .returns(true)
            .as('deleteAccountConfirmation')
        })
        cy.getByTestId(this.elements.btnElDelAcnt).should('be.visible').and('not.be.disabled').click()
        cy.get('@deleteAccountConfirmation').should('have.been.calledOnce')
    }

    verifyAccountDeletionSucceeded() {
        cy.getByTestId(this.elements.frmElAuth).should('be.visible')
        cy.getByTestId(this.elements.sectElNavBr).should('not.exist')
        cy.getByTestId(this.elements.sectElProfVw).should('not.exist')
    }
}

export default ProfilePage