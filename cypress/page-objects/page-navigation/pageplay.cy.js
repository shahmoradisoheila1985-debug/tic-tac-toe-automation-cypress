/// <reference types="cypress" />

class PlayPage {
  elements = {
    playView: 'view-play',
    gameBoard: 'board',
    gameStatus: 'status',
    difficultySelector: 'select-difficulty',
    hintButton: 'btn-hint',
    newGameButton: 'btn-new-game',
    playNavigationButton: 'nav-play',
    historyNavigationButton: 'nav-history',
    historyTable: 'history-table',
  }

  verifyPlayPageIsDisplayed() {
    cy.getByTestId(this.elements.playView).should('be.visible')
    cy.getByTestId(this.elements.gameBoard).should('be.visible')
  }

  verifyGameBoardIsDisplayed() {
    cy.getByTestId(this.elements.gameBoard).should('be.visible')
  }

  getBoardCells() {
    return cy
      .getByTestId(this.elements.gameBoard).find('[data-testid^="cell-"]')
  }

  getCell(cellIndex) {
    return cy.getByTestId(`cell-${cellIndex}`)
  }

  verifyBoardHasNineCells() {
    this.getBoardCells().should('have.length', 9)
  }

  verifyAllBoardCellsAreEmpty() {
    this.getBoardCells().should('have.length', 9)
      .each(($cell) => {
        cy.wrap($cell).should('have.attr', 'data-state', 'empty').and('have.text', '')
      })
  }

  verifyAllBoardCellsAreEnabled() {
    this.getBoardCells().each(($cell) => {
      cy.wrap($cell).should('not.be.disabled')
    })
  }

  verifyAllBoardCellsAreDisabled() {
    this.getBoardCells().each(($cell) => {
      cy.wrap($cell).should('be.disabled')
    })
  }

  verifyEmptyBoardCellsAreDisabled() {
    this.getBoardCells().filter('[data-state="empty"]').each(($cell) => {
        cy.wrap($cell).should('be.disabled')
      })
  }

  verifyEmptyBoardCellsAreEnabled() {
    this.getBoardCells().filter('[data-state="empty"]').each(($cell) => {
        cy.wrap($cell).should('not.be.disabled');
      })
  }

  selectCell(cellIndex) {
    this.getCell(cellIndex).should('have.attr', 'data-state', 'empty').and('not.be.disabled').click()
  }

  verifyCellState(cellIndex, expectedState) {
    this.getCell(cellIndex).should('have.attr', 'data-state', expectedState)
  }

  verifyCellMark(cellIndex, expectedMark) {
    this.getCell(cellIndex).should('have.text', expectedMark)
  }

  verifyCellIsDisabled(cellIndex) {
    this.getCell(cellIndex).should('be.disabled')
  }

    verifyNumberOfCellsWithState(state, expectedCount) {
        cy.getByTestId(this.elements.gameBoard)
            .find(`[data-state="${state}"]`, {timeout: 3000})
            .should('have.length', expectedCount)
    }

  verifyPlayerTurn() {
    cy.getByTestId(this.elements.gameStatus).should('be.visible')
      .and('have.attr', this.elements.attrElDtSts, 'human')
  }

  verifyComputerIsThinking() {
    cy.getByTestId(this.elements.gameStatus).should('be.visible').and('have.attr',this.elements.attrElDtSts,'computer-thinking')
  }

  verifyPlayerWinStatus() {
    cy.getByTestId(this.elements.gameStatus).should('be.visible')
      .and('have.attr', this.elements.attrElDtSts, 'human')
      .and('contain.text', 'You win')
  }

  validateWinningCells(cellIndexes) {
    cellIndexes.forEach((cellIndex) => {
      this.getCell(cellIndex).should('have.class', 'is-win')
    })

    cy.getByTestId(this.elements.gameBoard)
      .find('.is-win').should('have.length', cellIndexes.length)
  }

  selectDifficulty(difficulty) {
    const supportedDifficulties = [
      'easy',
      'medium',
      'hard',
    ]

    if (!supportedDifficulties.includes(difficulty)) {
      throw new Error(
        `Unsupported difficulty: "${difficulty}". ` +
        'Use "easy", "medium", or "hard".'
      )
    }

    cy.getByTestId(this.elements.difficultySelector)
      .should('be.visible')
      .then(($selector) => {
        const currentDifficulty = $selector.val()
        if (currentDifficulty !== difficulty) {
          cy.wrap($selector).select(difficulty)
        }
      })
    this.verifySelectedDifficulty(difficulty)
  }

  verifySelectedDifficulty(expectedDifficulty) {
    cy.getByTestId(this.elements.difficultySelector)
      .should('have.value', expectedDifficulty)
  }

  verifyDefaultDifficultyIsMedium() {
    this.verifySelectedDifficulty('medium')
  }

  verifyHintButtonIsEnabled() {
    cy.getByTestId(this.elements.hintButton)
      .should('be.visible')
      .and('not.be.disabled')
  }

  verifyBoardIsNotEmpty() {
    this.getBoardCells().then(($cels) => {
        const occCels = [...$cels].filter((cel) =>
          cel.getAttribute('data-state') !== 'empty'
        )
        expect(occCels.length).to.be.greaterThan(0)
    })
  }

  startNewGame() {
    cy.getByTestId(this.elements.newGameButton)
      .should('be.visible')
      .click();
  }

  openHistory() {
    cy.getByTestId(this.elements.historyNavigationButton).should('be.visible').click()
  }

  openPlayView() {
    cy.getByTestId(this.elements.playNavigationButton).should('be.visible').click()
  }

  verifyHistoryTableIsDisplayed() {
    cy.getByTestId(this.elements.historyTable).should('be.visible')
  }

  getHistoryRows() {
    return cy.get('[data-testid^="history-row-"]')
  }

  verifyHistoryRecordCount(expectedCount) {
    this.getHistoryRows().should('have.length', expectedCount)
  }

  verifyHistoryRecordResult(recordIndex, expectedResult) {
    cy.getByTestId(`history-row-${recordIndex}`)
      .should(
        'have.attr',
        'data-result',
        expectedResult
      )
  }

  verifyHistoryDifficulty(recordIndex,expectedDifficulty) {
    cy.getByTestId(`history-difficulty-${recordIndex}`).should('contain.text', expectedDifficulty)
  }

  verifyHistoryDateIsNotEmpty(recordIndex) {
    cy.getByTestId(`history-date-${recordIndex}`).invoke('text').should('not.be.empty')
  }
}

export default PlayPage