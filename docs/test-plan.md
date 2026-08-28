# Short Test Plan

## Objective

Validate the critical user journeys, state transitions, and data persistence of the Tic-Tac-Toe application within the three-day assignment time box.

Testing focuses on authentication, gameplay integrity, result recording, account data, localisation, settings persistence, History, Profile statistics, and responsive behaviour on representative mobile viewports.

## Scope

### In Scope

- Registration, Login, Logout, and account deletion
- Authentication validation and authenticated-session persistence
- English and Persian localisation
- LTR and RTL document direction and layout
- Light and Dark Theme selection and persistence
- Initial game and board state
- Player and computer turns
- Prevention of interaction during the computer turn
- Player Win, computer Win, and Draw behaviour
- Winning-cell highlighting and board locking
- Result recording from the player's perspective
- Difficulty selection and changes during an active game
- Difficulty persistence
- New Game behaviour and board reset
- Hint behaviour
- Profile Display Name, account information, statistics, and validation
- Empty and populated History states
- History clearing, persistence, and duplicate prevention
- Consistency between History records and Profile statistics
- `localStorage` persistence across reload and authenticated sessions
- Basic responsive testing at representative desktop and mobile viewport sizes
- Basic usability and accessibility exploration

### Out of Scope

- Backend or API testing because the SUT is a client-side application
- Load, volume, and stress testing
- Full security penetration testing
- Exhaustive testing of every possible AI or board permutation
- Comprehensive cross-browser and cross-device certification
- Pixel-perfect visual regression testing
- Full WCAG accessibility audit
- Legacy-browser support
- Performance benchmarking
- Automated visual-difference testing

## Test Approach

- Exploratory and scenario-based manual testing
- Risk-based prioritisation of P0, P1, and P2 scenarios
- Positive and negative functional testing
- Boundary-value and input-validation testing
- State-transition and persistence testing
- Responsive-layout exploration on representative mobile viewports
- Cypress E2E automation using JavaScript for critical, stable, and repeatable flows
- Page Object Model for reusable page-level operations and assertions
- Stable `data-testid` locators where available
- Retryable Cypress assertions instead of fixed waits
- Controlled randomness for deterministic game-completion scenarios
- Test isolation through controlled account and `localStorage` state
- Manual investigation for random, visual, environment-dependent, and difficult-to-reproduce behaviour
- Defect reporting with screenshots or videos where useful

## Automation Coverage

The automated suite prioritises critical and repeatable flows. It does not claim complete automation of every scenario listed in Scope.

Current automated or partially automated areas include:

- Valid Registration
- Authentication validation
- Existing-account and unknown-account Login
- Logout
- Authenticated-session persistence after reload
- Initial game-board state
- Player and computer moves
- Board locking during the computer turn
- Prevention of occupied-cell reuse through disabled state
- Deterministic Player Win
- Board reset through New Game
- Recording a Player Win exactly once
- Display Name update and persistence
- Player Win statistics and persistence
- Confirmed account deletion and session clearing
- Empty History state
- Player Win History record
- History persistence and duplicate prevention
- Confirmed History clearing
- Cleared-History persistence after reload
- Persian language and RTL setting
- Persian language persistence
- Dark Theme selection and persistence

The following areas remain manual, partially automated, or require further investigation:

- Whitespace-only authentication input, if not covered separately
- Login with a deleted account
- Reload while unauthenticated Login mode is open
- Language change while validation feedback is visible
- Computer Win and Draw completion
- Hint behaviour
- Cancelled and confirmed active-game difficulty changes
- Difficulty persistence after Logout and Login
- Player-mark ownership after sequential difficulty or session changes
- Saving an unchanged or invalid Profile name
- Persian Profile localisation
- Profile Loss and Draw statistics
- Cancelling account deletion
- Cancelling History clearing
- Cleared-History persistence after Logout and Login
- Complete comparison between History and Profile totals
- History retention boundaries
- Switching settings back to English and Light Theme
- Responsive-layout behaviour that requires visual evaluation

## Environment

| Item | Details |
|---|---|
| Operating System | Windows 11 |
| Primary Browser | Google Chrome 151.0.7922.170 |
| Automation Framework | Cypress |
| Automation Language | JavaScript |
| Local Server | `http-server` |
| SUT URL | `http://127.0.0.1:3000/index.html` |
| State Storage | Browser `localStorage` |
| Primary Desktop Testing | Google Chrome |
| Mobile Testing | Chrome DevTools Device Emulation |
| Representative Mobile Viewports | Galaxy Z Fold 5 at 344 × 882 and Surface Duo at 540 × 720 |
| Application Languages | English and Persian |
| Text Directions | LTR and RTL |
| Themes | Light and Dark |

For reproducible responsive testing, viewport dimensions should be recorded and browser zoom should be normalised to 100% where possible.

## Test Data

- Use unique or controlled player names where test isolation is required.
- Use fixture data for valid, invalid, duplicate, and boundary player names.
- Ensure each test begins with a known authentication, Profile, and History state.
- Avoid allowing cached `cy.session()` data or persisted `localStorage` records to create dependencies between tests.
- Use a controlled random value for deterministic Player Win scenarios.
- Do not depend on uncontrolled AI behaviour for tests that require a specific final board state.

## Priority Definitions

- **P0 — Critical:** Core user journey, application state integrity, account integrity, or persistent data integrity
- **P1 — Important:** Important functionality, localisation, persistence, or high regression value
- **P2 — Lower Risk:** Usability, visual consistency, compatibility, or lower-impact boundary behaviour

## Main Risks

| Risk | Impact | Priority |
|---|---|---|
| Win, Loss, or Draw is detected or recorded incorrectly | High | P0 |
| X or O ownership changes or becomes inconsistent | High | P0 |
| The player can interact with the board during the computer turn | High | P0 |
| A completed result is missing, duplicated, or recorded from the wrong perspective | High | P0 |
| Account, Profile, or History data is corrupted or associated with the wrong player | High | P0 |
| Authentication or session persistence fails after reload | High | P0 |
| Account deletion does not fully remove account data | High | P0 |
| Important gameplay controls are clipped or inaccessible on mobile viewports | High | P1 |
| Random AI behaviour creates flaky or non-repeatable tests | Medium | P1 |
| Cached session or `localStorage` data causes test dependency | Medium | P1 |
| Persian content, RTL direction, or visual alignment is inconsistent | Medium | P1 |
| Language or Theme preferences do not persist after reload | Medium | P1 |
| Navigation controls wrap outside their container on narrow viewports | Medium | P2 |
| Native validation feedback differs according to browser or operating-system language | Low | P2 |
| History retention behaviour is undefined at high record counts | Low | P2 |

## Responsive Testing Focus

Responsive testing covers representative viewport sizes rather than complete physical-device certification.

The main checks include:

- Navigation actions remain visible and inside their intended container.
- Authentication, Profile, History, and Play content fit within the available width.
- The game board does not cause horizontal overflow.
- Controls below the board remain fully visible and reachable.
- Important actions are not clipped by fixed-height containers.
- English/LTR and Persian/RTL layouts behave consistently at identical viewport sizes.
- Text remains readable without unintended overlap.
- Page or container scrolling allows all content to be reached.
- Theme and localisation controls remain usable on narrow screens.

Confirmed responsive defects are documented as:

- `BUG-010` — Log Out action wraps outside the navigation bar on a narrow mobile viewport.
- `BUG-011` — Game action controls are clipped below the board on a mobile viewport.

## Localisation Testing Focus

Localisation testing includes:

- English and Persian language selection
- Correct `lang` attribute
- Correct `dir` attribute
- LTR and RTL layout behaviour
- Translation of visible labels, helper text, and empty states
- Language-selector active state
- Behaviour of feedback already displayed when the language changes
- Persistence of the selected language after reload
- Distinguishing application-owned text from browser-owned native validation and dialog text

Browser-owned text such as native validation messages or native dialog buttons is treated as environment-dependent unless the product requirements explicitly require custom localised components.

## Entry Criteria

- `index.html` can be served and opened through the documented local server.
- JavaScript is enabled in the browser.
- Browser `localStorage` is available.
- No blocker prevents access to the Authentication view.
- Cypress dependencies are installed.
- The Cypress `baseUrl` or configured application URL points to the running SUT.
- Required fixtures and Page Object files are available.
- Test data and expected language values are defined.

## Exit Criteria

- All planned P0 scenarios have been executed, or any unexecuted P0 scenario is explicitly documented with its reason and associated risk.
- Critical automated flows pass in the primary browser, or known failures are linked to defect reports.
- P1 scenarios are executed according to the available time and risk.
- Automation statuses in the test-case documentation match the tests actually implemented.
- Confirmed defects contain reproducible steps, expected and actual results, severity, priority, and evidence where applicable.
- Candidate defects are clearly marked as requiring reproduction and are not presented as confirmed defects.
- Environment-dependent observations are distinguished from application defects.
- Responsive defects include the tested viewport dimensions.
- Test setup and execution instructions are available in the repository.
- Known limitations, incomplete scenarios, and remaining risks are documented.

## Deliverables

- Exploratory testing notes
- Short Test Plan
- Concrete manual and automated test cases
- Defect reports
- Screenshots and video evidence
- Cypress E2E automation written in JavaScript
- Page Object files
- Test fixtures
- Automation approach
- Repository README with setup and execution instructions

## Known Limitations

- Automated gameplay currently covers a deterministic Player Win but not a deterministic computer Win or Draw.
- Some scenarios are covered indirectly as part of larger E2E flows rather than through dedicated tests.
- Mobile testing uses browser device emulation and is not equivalent to testing on physical devices.
- Responsive defects may depend on viewport size, zoom, language direction, and available vertical space.
- Visual localisation defects are primarily verified manually.
- Native browser validation and dialog text may vary according to the browser and operating-system language.
- History retention behaviour cannot be fully validated until the expected maximum record count is defined.
- The suspected player-mark ownership issue requires a stable, reproducible sequence before it can be treated as a confirmed defect.