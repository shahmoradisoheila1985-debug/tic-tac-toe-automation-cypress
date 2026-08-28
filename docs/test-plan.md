# Short Test Plan

## Objective

Validate the critical user journeys and state transitions of the Tic-Tac-Toe application within the three-day time box, with emphasis on authentication, board-state integrity, result recording, account data, localisation, and Local Storage persistence.

## Scope

### In Scope

- Registration, Login, Logout, and account deletion
- Authentication validation and session persistence
- English/Persian localisation and LTR/RTL direction
- Light/Dark themes
- Initial game state, player/computer turns, Win/Loss/Draw
- Difficulty changes, persistence, New Game, Reset, and Hint
- Profile name, statistics, and validation
- Empty/populated History, result perspective, clearing, and persistence
- Consistency between History and Profile statistics
- Basic responsive, usability, and accessibility exploration

### Out of Scope

- Backend/API testing (the SUT has no backend)
- Load/stress testing
- Full security penetration testing
- Exhaustive testing of every AI board permutation
- Pixel-perfect visual regression
- Full WCAG audit
- Legacy-browser support

## Approach

- Exploratory and scenario-based manual testing
- Risk-based prioritisation of P0/P1 scenarios
- Negative, boundary, state-transition, and persistence testing
- Cypress E2E automation using JavaScript for critical repeatable flows
- `data-testid` locators and Page Objects
- Retryable assertions instead of fixed waits
- Controlled randomness for deterministic game-completion scenarios
- Defect reporting with screenshots/video where useful

## Environment

- OS: Windows 11
- Browser: Chrome 151.0.7922.170
- Framework: Cypress
- Language: JavaScript
- Server: `http-server`
- URL: `http://127.0.0.1:3000/index.html`

## Priority

- **P0:** Critical flow, state integrity, or data integrity
- **P1:** Important behaviour or high regression value
- **P2:** Lower-risk usability, visual, or compatibility scenario

## Main Risks

| Risk | Impact | Priority |
|---|---|---|
| Incorrect Win/Loss/Draw or mark ownership | High | P0 |
| Player acts during computer turn | High | P0 |
| Completed result is missing or duplicated | High | P0 |
| Account/Profile/History data is corrupted | High | P0 |
| Authentication/session persistence fails | High | P0 |
| Random AI causes flaky tests | Medium | P1 |
| Persian/RTL content is inconsistent | Medium | P1 |
| Long user input breaks layout | Medium | P1 |

## Entry Criteria

- `index.html` can be served and opened.
- JavaScript and Local Storage are enabled.
- No blocker prevents access to Authentication.

## Exit Criteria

- All P0 scenarios have been executed.
- Critical automated flows pass in the primary browser, or known failures are linked to defects.
- Confirmed defects have reproducible steps and evidence where applicable.
- Setup and execution instructions are available.

## Deliverables

- Exploratory notes
- Short test plan
- Concrete test cases
- Defect reports and evidence
- Cypress/JavaScript automation
- README
- Optional automation approach
