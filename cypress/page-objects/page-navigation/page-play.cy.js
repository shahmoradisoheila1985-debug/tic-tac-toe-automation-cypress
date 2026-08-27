/// <reference types = "cypress"/>

import { timeout } from "async"
import { time } from "systeminformation"

class PlayPage{

    elements = {
        sectElPlyVw: "view-play",
        sectElGmBrd: "board",
        btnElBrdCls: "[data-testid = 'board'] button",
        sectElGmSts: "status",
        cboxElSelDiff: "select-difficulty",
        btnElHnt: "btn-hint",
        attrElDtStat: "data-state",
        attrElDtSts: "data-status",
        txtYrTrn: "your-turn",
        txtHum: "human",
        txtYuWn: "You win",
        txtEmpt: "empty",
        statElEmpt: "[data-state='empty']",
        txtCopmThkng: "computer-thinking",
        btnElHstryNv: "nav-history",
        tblElHstry: "history-table",
        attrElDtRslt: "data-result",
        btnElPlyNav: "nav-play",
        btnElNwGm: "btn-new",
        rwElHstryTbl: "[data-testid^='history-row-']"
    }

    checkPlayPageIsDisplayed(){
        cy.getByTestId(this.elements.sectElPlyVw).should('be.visible')
    }

    checkGameBoardIsDisplayed(){
        cy.getByTestId(this.elements.sectElGmBrd).should('be.visible')
    }

    getBoardCells() {
        return cy.get(this.elements.btnElBrdCls)
    }

    getCell(celIndx) {
        return cy.getByTestId(`cell-${celIndx}`)
    }

    validateBoardHasNineCells(){
        this.getBoardCells().should('have.length', 9)
    }

    validateAllBoardCellsAreEmpty() {
        this.getBoardCells().should('have.length', 9).each(($ele) => {
            cy.wrap($ele).should('have.attr', 'data-state', 'empty').and('not.be.disabled')
        })
    }

    validateDefaultDifficulty() {
        cy.getByTestId(this.elements.cboxElSelDiff).should('have.value', 'medium')
    }

    validateHintButtonIsEnabled() {
        cy.getByTestId(this.elements.btnElHnt).should('be.visible').and('not.be.disabled')
    }

    validateAllBoardCellsAreEnabled() {
        this.getBoardCells().each(($ele) => {
          cy.wrap($ele).should('not.be.disabled')
        })
    }

    validateNumberOfCellsWithState(stat, expdCnt) {
        cy.getByTestId(this.elements.sectElGmBrd).find(`[data-state="${stat}"]`).should('have.length', expdCnt)
    }

    validatePlayerTurn() {
        cy.getByTestId(this.elements.sectElGmSts).should('be.visible').and('have.attr', this.elements.attrElDtSts, this.elements.txtYrTrn)
    }

    validateSelectedDifficulty(expdDiff) {
        cy.getByTestId(this.elements.cboxElSelDiff).should('have.value', expdDiff)
    }

    validateDefaultDifficultyIsEasy() {
        this.validateSelectedDifficulty('easy')
    }

    validateHintButtonIsEnabled() {
        cy.getByTestId(this.elements.btnElHnt).should('be.visible').and('not.be.disabled')
    }

    validatePlayerWinStatus() {
        cy.getByTestId(this.elements.sectElGmSts).should('be.visible')
          .and('have.attr', this.elements.attrElDtSts, this.elements.txtHum)
          .and('contain.text', this.elements.txtYuWn)
    }

    selectCell(celIndx) {
        this.getCell(celIndx).should('have.attr', this.elements.attrElDtStat, this.elements.txtEmpt)
            .and('not.be.disabled').click()
    }

    validateCellState(celIndx, expdStat) {
        this.getCell(celIndx).should('have.attr', this.elements.attrElDtStat, expdStat).and('be.disabled')
    }

    validateCellMark(celIndx, expdMrk) {
        this.getCell(celIndx, {timeout: 7000}).should('have.text', expdMrk)
    }

    validateCellIsDisabled(celIndx) {
        this.getCell(celIndx).should('be.disabled')
    }

    validateNumberOfCellsWithState(stat, expdCnt) {
        cy.getByTestId(this.elements.sectElGmBrd).find(`[data-state='${stat}']`)
            .should('have.length', expdCnt)
    }

    validateEmptyBoardCellsAreDisabled() {
        this.getBoardCells().filter(this.elements.statElEmpt).each(($cel) => {
            cy.wrap($cel).should('be.disabled')
        })
    }

    validateEmptyBoardCellsAreEnabled() {
        this.getBoardCells().filter(this.elements.statElEmpt).each(($cel) => {
            cy.wrap($cel).should('not.be.disabled')
        })
    }

    validateAllBoardCellsAreDisabled() {
        this.getBoardCells().each(($cel) => {
          cy.wrap($cel).should('be.disabled')
        })
    }

    selectDifficulty(diffic) {
        const suppdDiffic = [
          'easy',
          'medium',
          'hard',
        ]
        if (!suppdDiffic.includes(diffic)) {
          throw new Error(
            `Unsupported difficulty: "${diffic}". ` +
            'Use "easy", "medium", or "hard".'
          )
        }
        cy.getByTestId(this.elements.cboxElSelDiff)
          .should('be.visible')
          .then(($sel) => {
            const currDiffic = $sel.val()
            if (currDiffic !== diffic) {
              cy.wrap($sel).select(diffic)
            }
          })
        this.validateSelectedDifficulty(diffic)
    }

    validateBoardIsNotEmpty() {
        this.getBoardCells().then(($cels) => {
            const occCels = [...$cels].filter((cel) =>
              cel.getAttribute(this.elements.attrElDtStat) !== this.elements.txtEmpt
            )
            expect(occCels.length).to.be.greaterThan(0)
        })
    }

    validateWinningCells(celIndxs) {
        celIndxs.forEach((celIndx) => {
          this.getCell(celIndx)
            .should('have.class', 'is-win')
        })
    }

    validateComputerIsThinking() {
        cy.getByTestId(this.elements.sectElGmSts).should('be.visible')
          .and('have.attr', this.elements.attrElDtSts, this.elements.txtCopmThkng)
    }

    openHistory() {
        cy.getByTestId(this.elements.btnElHstryNv).should('be.visible').click()
    }

    validateHistoryTableIsDisplayed() {
        cy.getByTestId(this.elements.tblElHstry).should('be.visible')
    }

    getHistoryRows() {
        return cy.get(this.elements.rwElHstryTbl)
    }

    validateHistoryRecordCount(expdCnt) {
        this.getHistoryRows().should('have.length', expdCnt)
    }

  validateHistoryRecordResult(recIndx, expdRslt) {
    cy.getByTestId(`history-row-${recIndx}`)
      .should('have.attr', this.elements.attrElDtRslt, expdRslt)
    }

    validateHistoryDateIsNotEmpty(recIndx) {
        cy.getByTestId(`history-date-${recIndx}`).invoke('text').should('not.be.empty')
    }

    openPlayView() {
        cy.getByTestId(this.elements.btnElPlyNav).should('be.visible').click()
    }

    startNewGame() {
        cy.getByTestId(this.elements.btnElNwGm).should('be.visible').click()
    }

    validateHistoryDifficulty(recIndx, expdDiffic) {
        cy.getByTestId(`history-difficulty-${recIndx}`).should('contain.text', expdDiffic)
    }
}
export default PlayPage