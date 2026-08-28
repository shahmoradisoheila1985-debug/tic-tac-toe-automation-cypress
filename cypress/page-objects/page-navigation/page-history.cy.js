/// <reference types="cypress" />
import PlayPage from "./page-play.cy"

const plyrpg = new PlayPage()

class HistoryPage {
  elements = {
    btnElHstryNav: 'nav-history',
    btnElPlyNav: 'nav-play',
    sectElHstryVw: 'view-history',
    ttlElHstry: 'history-title',
    msgElEmptHstry: 'history-empty',
    tblElHstry: 'history-table',
    btnElClrHstry: 'btn-clear-history',
    rwsElHstry: "[data-testid^='history-row-']",
    attrElDtRslt: "data-result"
  }

    openHistoryPage() {
        cy.getByTestId(this.elements.btnElHstryNav).should('be.visible').click()
        cy.getByTestId(this.elements.sectElHstryVw).should('be.visible')
    }

    openPlayPage() {
        cy.getByTestId(this.elements.btnElPlyNav).should('be.visible').click()
        cy.getByTestId(this.elements.sectElHstryVw).should('not.exist')
    }

    validateHistoryPageIsDisplayed() {
        cy.getByTestId(this.elements.sectElHstryVw).should('be.visible')
        cy.getByTestId(this.elements.ttlElHstry).should('be.visible')
    }

    getHistoryRows() {
        return cy.get(this.elements.rwsElHstry)
    }

    getHistoryRow(recIndx) {
        return cy.getByTestId(`history-row-${recIndx}`)
    }

    getHistoryResult(recIndx) {
        return cy.getByTestId(`history-result-${recIndx}`)
    }

    getHistoryDifficulty(recIndx) {
        return cy.getByTestId(`history-difficulty-${recIndx}`)
    }

    getHistoryDate(recIndx) {
        return cy.getByTestId(`history-date-${recIndx}`)
    }

    validateEmptyHistoryState() {
        cy.getByTestId(this.elements.msgElEmptHstry).should('be.visible').invoke('text')
          .then((msgTxt) => {
            expect(msgTxt.trim()).not.to.equal('')
          })
        cy.getByTestId(this.elements.tblElHstry).should('not.exist')
        cy.getByTestId(this.elements.btnElClrHstry).should('not.exist')
        cy.get(this.elements.rwsElHstry).should('not.exist')
    }

    completeDeterministicPlayerWin() {
        plyrpg.selectDifficulty('easy')
        // Player X: cell 0 — Computer O: cell 1
        plyrpg.selectCell(0)
        plyrpg.validateNumberOfCellsWithState('o', 1)
        // Player X: cell 3 — Computer O: cell 2
        plyrpg.selectCell(3)
        plyrpg.validateNumberOfCellsWithState('o', 2)
        // Player X: cell 6 — Player wins
        plyrpg.selectCell(6)
        plyrpg.validatePlayerWinStatus()
        plyrpg.validateWinningCells([0, 3, 6])
    }

    validateHistoryTableIsDisplayed() {
        cy.getByTestId(this.elements.tblElHstry).should('be.visible')
    }

    validateHistoryRecordCount(expdCnt) {
        if (expdCnt === 0) {
          cy.get(this.elements.rwsElHstry).should('not.exist')
          return
        }
        this.getHistoryRows().should('have.length', expdCnt)
    }

    getExpectedResultText(result) {
        const resultTexts = {
          win: 'Win',
          loss: 'Loss',
          draw: 'Draw',
        }
        if (!resultTexts[result]) {
          throw new Error(
            `Unsupported history result: "${result}". ` +
            'Use "win", "loss", or "draw".'
          )
        }
        return resultTexts[result]
    }

    validateHistoryRowResult(recIndx, expdRslt) {
        const expdRsltText =
        this.getExpectedResultText(expdRslt)
        this.getHistoryRow(recIndx).should('be.visible')
          .and('have.attr', this.elements.attrElDtRslt, expdRslt)

        this.getHistoryResult(recIndx).should('be.visible')
          .and('have.text', expdRsltText)
    }

    validateHistoryRowDifficulty(recIndx, expdDiffic) {
      const supportedDifficulties = [
        'Easy',
        'Medium',
        'Hard',
      ]
      if (!supportedDifficulties.includes(expdDiffic)) {
        throw new Error(
          `Unsupported visible difficulty: ` +
          `"${expdDiffic}". ` +
          'Use "Easy", "Medium", or "Hard".'
        )
      }
      this.getHistoryDifficulty(recIndx).should('be.visible').and('have.text', expdDiffic)
    }

    validateHistoryRowDateIsNotEmpty(recIndx) {
      this.getHistoryDate(recIndx).should('be.visible').invoke('text')
        .then((dateText) => {
          expect(dateText.trim()).not.to.equal('')
        })
    }

    validateHistoryRecord(recIndx, expdRslt, expdDiffic) {
        this.validateHistoryRowResult(recIndx, expdRslt)
        this.validateHistoryRowDifficulty(recIndx, expdDiffic)
        this.validateHistoryRowDateIsNotEmpty(recIndx)
    }

    validateLatestHistoryRecord(expdRslt, expdDiffic) {
        this.validateHistoryRecord(0, expdRslt, expdDiffic)
    }

    validateClearHistoryButtonIsDisplayed() {
        cy.getByTestId(this.elements.btnElClrHstry).should('be.visible')
          .and('not.be.disabled')
    }

    clearHistoryAndConfirm() {
        cy.window().then((win) => {
          cy.stub(win, 'confirm')
            .returns(true)
            .as('clearHistoryConfirmation')
        })
        cy.getByTestId(this.elements.btnElClrHstry).should('be.visible')
          .and('not.be.disabled').click()
        cy.get('@clearHistoryConfirmation').should('have.been.calledOnce')
    }

    clearHistoryAndCancel() {
        cy.window().then((win) => {
          cy.stub(win, 'confirm')
            .returns(false)
            .as('cancelHistoryClear')
        })
        cy.getByTestId(this.elements.btnElClrHstry).should('be.visible')
          .and('not.be.disabled').click()
        cy.get('@cancelHistoryClear').should('have.been.calledOnce')
    }

    validateHistoryWasNotCleared(expdrecCnt) {
      this.validateHistoryTableIsDisplayed()
      this.validateHistoryRecordCount(expdrecCnt)
      cy.getByTestId(this.elements.msgElEmptHstry).should('not.exist')
    }
}

export default HistoryPage