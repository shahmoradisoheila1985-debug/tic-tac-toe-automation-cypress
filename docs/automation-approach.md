# Automation Approach

## Tool Selection

Cypress with JavaScript was selected because the SUT is a small client-side browser application and the assignment has a three-day time box. Cypress provides fast setup, retryable assertions, browser-storage access, native-dialog handling, screenshots and videos, viewport control, and interactive debugging.

JavaScript was selected to remain consistent with the SUT and to minimise configuration overhead.

## Prioritisation

Automation was selected based on product impact, regression value, repeatability, stability, and implementation cost. The suite focuses on critical and repeatable flows across Authentication, Gameplay, Profile, History, and Settings.

The suite does not claim complete automation of every scenario in the Test Plan. Scenarios that depend on subjective visual assessment, uncontrolled AI behaviour, undefined requirements, browser-native content, or difficult-to-reproduce state changes remain manual or partially automated.

## Current Automated Coverage

### Authentication

Automated coverage includes:

- Registration with a valid name
- Empty-name validation
- One-character-name validation
- Exact duplicate-name rejection
- Case-insensitive duplicate-name rejection in English
- Login with an existing account
- Rejection of an unknown account
- Logout
- Authenticated-session persistence after reload

The Registration-to-Login mode switch is exercised inside Login flows but does not have a dedicated test. Login with a deleted account, unauthenticated mode persistence, and language changes while feedback is visible remain manual.

### Gameplay

Automated coverage includes:

- Initial empty board and nine enabled cells
- Initial player turn and default difficulty
- Placement of the player's X
- Exactly one computer O after a player move
- Disabled empty cells while the computer is thinking
- Return of control to the player
- Occupied-cell protection through the disabled state
- Deterministic Player Win
- Winning-cell highlighting and board locking
- Prevention of an additional computer move after a Win
- New Game board reset
- Preservation of the selected difficulty after New Game
- Recording a completed Player Win exactly once

Computer Win, Draw, Hint, active-game difficulty confirmation/cancellation, difficulty persistence after Logout/Login, and confirmation that an unfinished game is not recorded remain manual or partially automated.

### Profile

Automated coverage includes:

- Opening Profile and displaying player data
- Displaying initial statistics and a non-empty creation date
- Updating the Display Name
- Updating the Navigation name
- Preserving the updated name after reload
- Updating and preserving Win statistics after a deterministic Player Win
- Confirming account deletion
- Clearing the authenticated session
- Preserving the unauthenticated state after reload

Unchanged, empty, and excessively long Display Names; Persian Profile localisation; Loss and Draw statistics; cancellation of account deletion; and Login with a deleted account remain manual or partially automated.

### History

Automated coverage includes:

- Empty History for a new player
- Recording one deterministic Player Win
- Verifying one Win record with Easy difficulty
- Preventing duplicate records after navigation
- Preserving the record after reload
- Confirming Clear History
- Returning to the empty state after clearing
- Preserving the cleared state after reload

Date coverage depends on the assertions implemented inside the History Page Object. Loss and Draw records, cancellation of Clear History, persistence after Logout/Login, comparison with all Profile totals, and retention boundaries remain manual.

### Settings and Localisation

Automated coverage includes:

- Switching from English to Persian
- Verifying the configured Persian and RTL state
- Preserving Persian and RTL after reload
- Switching from Light Theme to Dark Theme
- Preserving Dark Theme after reload

The exact depth of this coverage depends on the Page Object assertions. Complete coverage should verify the selected control values and the document's `lang`, `dir`, and `data-theme` attributes.

Translation quality, the RTL language-selector indicator, stateful feedback after a language change, and switching back to English and Light Theme remain manual.

### Responsive Behaviour

Responsive testing is currently exploratory and manual. Chrome DevTools device emulation is used to evaluate navigation wrapping, content overflow, board sizing, vertical scrolling, and control accessibility.

The following responsive defects are not currently covered by automated visual-regression tests:

- `BUG-009` — Log Out action wraps outside the navigation bar on a narrow mobile viewport.
- `BUG-010` — Game action controls are clipped below the board on a mobile viewport.

## Design

- Page Objects contain selectors, reusable UI actions, and page-level assertions.
- Test specifications describe user scenarios and expected business outcomes.
- Stable `data-testid` attributes are the primary locator strategy.
- Selectors are not repeated directly throughout test cases.
- Custom commands remain small and generic rather than hiding complex business flows.
- Fixed waits are avoided; Cypress retryable assertions wait for observable state.
- Easy-mode randomness is controlled only when a deterministic board state is required.
- Cypress sessions provide reusable authenticated setup while test setup maintains scenario independence.

Typical Page Object files include:

```text
page-common-features.cy.js
page-register.cy.js
page-login.cy.js
page-navigation-bar.cy.js
page-play.cy.js
page-profile.cy.js
page-history.cy.js
page-settings.cy.js
```

The primary custom selector command is:

```js
Cypress.Commands.add('getByTestId', (testId) => {
  return cy.get(`[data-testid="${testId}"]`)
})
```

## Synchronisation Strategy

The suite avoids fixed delays such as `cy.wait(1000)`. Tests wait for observable application states, including:

- A status message becoming visible
- Empty cells becoming disabled or enabled
- An X or O appearing on the board
- The player's turn being restored
- A History record being displayed
- Profile or Navigation data being updated

This approach reduces timing dependence and unnecessary test duration.

## Deterministic Gameplay

Easy-mode computer behaviour is random. For scenarios that require a known final board, randomness is controlled before the application state is created:

```js
reglgnpg.visitWithFixedRandomValue(appUrl, 0)
```

This supports a repeatable Player Win sequence. Randomness is not fixed globally because doing so could hide other valid AI behaviours. Deterministic Computer Win and Draw helpers have not yet been implemented.

## Session and Test-State Management

Reusable authenticated setup is created through a Page Object method backed by `cy.session()`:

```js
reglgnpg.createAuthenticatedPlayerSession(appUrl, playerName, appLanguage)
```

After session restoration, the application is opened and the authenticated player is validated.

Tests that modify Profile, History, language, Theme, difficulty, or account state must begin with a known state. Cached sessions and persisted `localStorage` data must not create dependencies between tests. Unique users, controlled cleanup, or explicit state reset should be used where necessary.

## Test Data

Fixture data is used for reusable input such as player names. Test data may include:

- Valid names
- Empty and whitespace-only values
- One-character values
- Exact duplicates
- Case-insensitive duplicates
- Updated Display Names
- Boundary-length values

Static names are acceptable only when test setup guarantees isolated state.

## Defect-Related Coverage

Automation status reflects only implemented assertions:

- **Automated:** The complete documented result is asserted.
- **Partially Automated:** Only part of the documented result is asserted.
- **Manual:** No corresponding automated test is implemented.
- **Manual Investigation:** Stable reproduction is required before automation is appropriate.

The following defects require special handling:

- `BUG-001`, `BUG-002`, `BUG-003`, `BUG-005`, and `BUG-006` primarily require localisation or visual assertions that are not fully represented by generic language-state checks.
- `BUG-004` requires boundary input and responsive layout validation for excessively long Display Names and is currently manual.
- `BUG-007` concerns browser-native validation text and is treated as an environment-dependent observation.
- `BUG-008` is a candidate board-state integrity issue. It should remain `Needs Reproduction` until an exact move, difficulty, and session sequence is repeatable.
- `BUG-009` and `BUG-010` are responsive-layout defects currently supported by manual screenshot evidence rather than automated visual checks.

## Execution

Start the local server before Cypress:

```powershell
npm start
```

or:

```powershell
npx http-server . -p 3000 -c-1
```

Open Cypress interactively:

```powershell
npx cypress open
```

Run the suite in headless mode:

```powershell
npx cypress run
```

The expected SUT URL is:

```text
http://127.0.0.1:3000/index.html
```

## Reporting and Evidence

Cypress command logs, screenshots, videos, and manually captured evidence are used where appropriate. Evidence is stored under:

```text
docs/evidence/
```

Evidence filenames follow the related defect ID. For the responsive defects, use:

```text
docs/evidence/BUG-009-mobile-navbar-logout-wrap-en.png
docs/evidence/BUG-010-mobile-game-actions-clipped-en.png
```

## Limitations

- Exhaustive AI and board-state permutation testing was not performed.
- Automated gameplay covers a deterministic Player Win but not a deterministic Computer Win or Draw.
- The candidate board-state integrity issue, `BUG-008`, requires exact reproduction.
- Some behaviours are exercised indirectly within larger E2E flows rather than by dedicated tests.
- Profile statistics automation covers Win but not Loss and Draw.
- History automation covers a Player Win but not Loss and Draw records.
- Account deletion automation verifies the unauthenticated state but does not attempt Login with the deleted account.
- Comprehensive Persian translation verification is not automated.
- Browser-native validation and confirmation text may vary by browser and operating-system locale.
- Responsive, visual, and accessibility coverage is exploratory rather than a full audit.
- Mobile testing uses Chrome DevTools emulation rather than physical devices.
- Automated visual-regression testing was not implemented.
- Cross-browser coverage is limited by the assignment time box.
- History retention behaviour cannot be fully tested until the supported capacity is defined.
- Automation reliability depends on correct isolation of cached Cypress sessions and persisted `localStorage` data.
