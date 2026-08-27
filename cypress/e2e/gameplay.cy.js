/// <reference types = "cypress"/>
import RegisterLoginPage from "../page-objects/page-login-register/page-common-features.cy.js"
import RegisterPage from "../page-objects/page-login-register/page-register.cy.js"
import NavigationBar from "../page-objects/page-navigation/page-navigation-bar.cy.js"
import PlayPage from "../page-objects/page-navigation/page-play.cy.js"
import LoginPage from "../page-objects/page-login-register/page-login.cy.js"

const reglgnpg = new RegisterLoginPage()
const regpg = new RegisterPage()
const nvBr = new NavigationBar()
const plypg = new PlayPage()
const lgnpg = new LoginPage()
const tictactoeurl = Cypress.env("TICTOCTOEURL")


describe('Gameplay test cases in `English` language', () => {
    let plyrNmVal
    const appUrl = tictactoeurl["AppUrl"]
    const appLang = "English"
  
    before(() =>{
        cy.fixture('player-names.json').then((plyrNm) =>{
            plyrNmVal = plyrNm
        })
    })

    beforeEach(() => {
        reglgnpg.createAuthenticatedPlayerSession(appUrl, plyrNmVal.valid, appLang)
        reglgnpg.openWelcomePage(appUrl)
        reglgnpg.validateLoggedInUser(plyrNmVal.valid, appLang)
    })

    it('Validate display an empty board when a new game starts', () => {
        plypg.checkGameBoardIsDisplayed()
        plypg.validateBoardHasNineCells()
        plypg.validateAllBoardCellsAreEmpty()
        plypg.validateAllBoardCellsAreEnabled()
        plypg.validateNumberOfCellsWithState('x', 0)
        plypg.validateNumberOfCellsWithState('o', 0)
        plypg.validatePlayerTurn()
        plypg.validateDefaultDifficultyIsEasy()
        plypg.validateHintButtonIsEnabled()
    })

    it('Validate place an `X` in the cell selected by the player', () => {
        plypg.selectCell(0)
        plypg.validateCellState(0, 'x')
        plypg.validateCellMark(0, 'X')
        plypg.validateCellIsDisabled(0)
        plypg.validateNumberOfCellsWithState('x', 1)
    })

    it('Validate make exactly one computer move after the player move', () => {
        plypg.selectCell(0)
        plypg.validateCellState(0, 'x')
        plypg.validateNumberOfCellsWithState('x', 1)
        plypg.validateNumberOfCellsWithState('o', 1)
        plypg.validateNumberOfCellsWithState('x', 1)
        plypg.validatePlayerTurn()
    })

    it('Validate disable board interaction while the computer is thinking', () => {
        plypg.selectCell(0)
        plypg.validateComputerIsThinking()
        plypg.validateEmptyBoardCellsAreDisabled()
        plypg.validateNumberOfCellsWithState('x', 1)
        plypg.validateNumberOfCellsWithState('o', 1)
        plypg.validatePlayerTurn()
        plypg.validateEmptyBoardCellsAreEnabled()
    })

    it('Validate prevent an occupied cell from being selected again', () => {
        plypg.selectCell(0)
        plypg.validateCellState(0, 'x')
        plypg.validateCellIsDisabled(0)
        plypg.validateNumberOfCellsWithState('o', 1)
        plypg.validateCellState(0, 'x')
        plypg.validateCellMark(0, 'X')
        plypg.validateCellIsDisabled(0)
        plypg.validateNumberOfCellsWithState('x', 1)
        plypg.validateNumberOfCellsWithState('o', 1)
    })

    it('Validate detect and display a player win', () => {
        reglgnpg.visitWithFixedRandomValue(appUrl, 0)
        reglgnpg.validateLoggedInUser(plyrNmVal.valid, appLang)
        plypg.selectDifficulty('easy')
        /*
         * X -> cell 0
         * O -> cell 1
         */
        plypg.selectCell(0)
        plypg.validateNumberOfCellsWithState('o', 1)
        /*
         * X -> cell 3
         * O -> cell 2
         */
        plypg.selectCell(3)
        plypg.validateNumberOfCellsWithState('o', 2)
        /*
         * X -> cell 6
         * Player wins with cells 0, 3, and 6.
         */
        plypg.selectCell(6)
        plypg.validatePlayerWinStatus()
        plypg.validateWinningCells([0, 3, 6])
        plypg.validateAllBoardCellsAreDisabled()
        /*
         * The computer must not make another move after the win.
         */
        plypg.validateNumberOfCellsWithState('o', 2)
    })

    it('Validate record a completed player win exactly once', () => {
        reglgnpg.visitWithFixedRandomValue(appUrl, 0)
        reglgnpg.validateLoggedInUser(plyrNmVal.valid, appLang)
        plypg.selectDifficulty('easy')
        /*
         * Complete a deterministic player-win flow.
         */
        plypg.selectCell(0)
        plypg.validateNumberOfCellsWithState('o', 1)
        plypg.selectCell(3)
        plypg.validateNumberOfCellsWithState('o', 2)
        plypg.selectCell(6)
        plypg.validatePlayerWinStatus()
        plypg.validateWinningCells([0, 3, 6])
        /*
         * Open the History view and verify the saved result.
         */
        plypg.openHistory()
        plypg.validateHistoryTableIsDisplayed()
        plypg.validateHistoryRecordCount(1)
        plypg.validateHistoryRecordResult(0, 'win')
        plypg.validateHistoryDifficulty(0, 'Easy')
        plypg.validateHistoryDateIsNotEmpty(0)
        /*
         * Navigate away from History and open it again.
         * No duplicate record must be created.
         */
        plypg.openPlayView()
        plypg.openHistory()
        plypg.validateHistoryRecordCount(1)
        /*
         * Reload the application and verify that the persisted
         * history still contains exactly one record.
         */
        cy.reload()
        plypg.openHistory()
        plypg.validateHistoryRecordCount(1)
        plypg.validateHistoryRecordResult(0, 'win')
    })

    it('Validate reset the board when the player starts a new game', () => {
        plypg.selectDifficulty('easy')
        plypg.selectCell(0)
        plypg.validateNumberOfCellsWithState('o', 1)
        plypg.validateNumberOfCellsWithState('x', 1)
        plypg.validateBoardIsNotEmpty()
        plypg.startNewGame()
        plypg.validateBoardHasNineCells()
        plypg.validateAllBoardCellsAreEmpty()
        plypg.validateAllBoardCellsAreEnabled()
        plypg.validateNumberOfCellsWithState('x', 0)
        plypg.validateNumberOfCellsWithState('o', 0)
        plypg.validatePlayerTurn()
        /*
         * Starting a new game must preserve the selected difficulty.
         */
        plypg.validateSelectedDifficulty('easy')
    })
})