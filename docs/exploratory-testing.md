# Exploratory Testing Notes

## Session Information

- **Application:** Tic-Tac-Toe
- **Test type:** Exploratory functional testing
- **Tester:** Soheila Shahmoradi
- **Date:** August 26, 2026
- **Duration:** 3 days
- **Operating system:** Windows 11
- **Primary browser:** Google Chrome 151.0.7922.170
- **SUT URL:** `http://127.0.0.1:3000/index.html`

> Replace every value in brackets before submission.

## Objective

The objective of the exploratory sessions was to understand the application's main features, user journeys, state transitions, localisation behaviour, and client-side persistence. The sessions were also used to identify product risks and select stable, high-value scenarios for Cypress automation.

## Approach

A scenario-based and risk-based approach was used. The application was exercised as:

- a new visitor without an account;
- a newly registered player;
- a returning player;
- a player whose account had been deleted;
- a user working in English and Persian;
- a player using different difficulty levels and game states.

Observed behaviour was compared with expected user-visible behaviour, turn rules, localisation consistency, and persistence expectations.

---

## Charter 1 — Authentication and Localisation

### Coverage

- Opened the unauthenticated application in English and Persian.
- Checked the main title, subtitle, Welcome heading, helper text, and authentication-mode link.
- Switched between Registration and Login modes.
- Reloaded the page while Login mode was selected.
- Submitted an empty or whitespace-only player name.
- Submitted a one-character player name.
- Registered a valid player with at least two characters.
- Attempted case-insensitive duplicate registration.
- Logged in with an existing account.
- Attempted Login with an unknown or deleted account.
- Logged out and logged in again.
- Changed language while error or success feedback was visible.

### Expected Behaviour

- All application-owned visible content should match the selected language.
- Persian should use `lang="fa"` and RTL direction; English should use `lang="en"` and LTR direction.
- Registration and Login validations should reject invalid values with an appropriate message.
- A valid Registration should authenticate the player and open Play.
- Logout should clear the current session but preserve the account.
- A deleted account should not be accepted during Login.

### Observations

- The main title and Welcome heading changed with the language.
- The subtitle remained in English in the observed Persian state.
- Empty, short, duplicate, and unknown-account validation paths were exercised.
- Existing feedback remained in the language in which it was generated after the language changed.
- The Persian helper text did not fully preserve the English call-to-action in the observed build.
- The Persian authentication-mode link was understandable, although not a literal translation.
- The language selector arrow appeared visually incorrect in RTL mode.
- Registration, Login, Logout, and rejection of a deleted account otherwise worked in the tested happy paths.
- Registration was restored as the default unauthenticated mode after reload.

### Related Defects

- `BUG-001` — Subtitle remains in English in Persian mode.
- `BUG-002` — Existing messages do not update after language changes.
- `BUG-003` — Language selector indicator is visually incorrect in RTL mode.
- `BUG-004` — Persian authentication helper text omits part of the English meaning.

---

## Charter 2 — Theme

### Coverage

- Switched from Light to Dark Theme.
- Switched back to Light Theme.
- Checked readability and control usability after theme changes.
- Checked theme persistence after reload.

### Observations

- Theme switching worked during the session.
- No confirmed functional Theme defect was observed.

---

## Charter 3 — Account Lifecycle

### Coverage

- Registered valid accounts in English and Persian.
- Verified automatic authentication after Registration.
- Verified the player's name in the Navigation Bar.
- Logged out and logged in with the existing account.
- Deleted an account and attempted to log in with the deleted name.

### Observations

- Successful Registration opened the Play view.
- The Navigation Bar displayed the expected player name, for example `Hello, Sara`.
- Logout returned the player to Authentication.
- Existing-account Login succeeded.
- Deleted-account Login was rejected.

---

## Charter 4 — Initial Gameplay and Turn Integrity

### Coverage

- Checked the active Play navigation item after Registration and Login.
- Checked the initial difficulty, status, New Game, Hint, and Reset controls.
- Verified that the board contained nine empty cells.
- Selected an empty cell and checked that it became `X` and unavailable.
- Checked that the player could not make an additional move while the computer was thinking.
- Checked that the computer added one `O` to an empty cell.
- Checked that the turn returned to the player.

### Expected Behaviour

- A new game should contain nine empty, selectable cells.
- The initial status should indicate the player's turn.
- A selected cell should retain its owner and be unavailable for reuse.
- Board interaction should be disabled during the computer turn.
- The computer should make exactly one move in an empty cell.

### Observations

- The initial board and normal turn flow worked in the primary scenarios tested.
- The observed default difficulty was Easy; this must be verified once more using a brand-new account and clean Local Storage before final submission because difficulty is stored per player.
- A candidate state-corruption issue was observed during specific difficulty/session sequences; see `BUG-009`.

---

## Charter 5 — Difficulty Changes and Preference Persistence

### Coverage

- Changed difficulty before gameplay.
- Changed difficulty after at least one move.
- Cancelled the confirmation dialog.
- Accepted the confirmation dialog.
- Repeated the flow in English and Persian.
- Logged out and back in after changing difficulty.

### Observations

- Cancelling preserved the current board and previous difficulty.
- Confirming applied the new difficulty and reset the board.
- The selected difficulty was restored for the same player after Logout and Login.
- The dialog body was localised in the observed Persian flow. The browser-provided dialog heading and `OK`/`Cancel` labels followed the browser/OS locale and were recorded as an environment observation, not an application defect.

---

## Charter 6 — Profile

### Coverage

- Opened Profile in English and Persian.
- Verified the registered name in Display Name.
- Saved without changing the value.
- Changed the Display Name and saved it.
- Changed language while the save-success message was visible.
- Entered an approximately 100-character Display Name.
- Cleared the Display Name and submitted the form.
- Checked Created, Wins, Losses, and Draws.
- Cancelled and confirmed account deletion.

### Observations

- The registered name was displayed correctly.
- Saving displayed a success message.
- Existing success feedback did not change language with the rest of the UI.
- An excessively long Display Name was accepted and caused visible layout degradation.
- Empty input triggered native browser required-field validation; in the tested browser locale, the message was English even while the application was Persian.
- The `Created` label remained English in Persian mode, while the result labels were translated.
- Account deletion confirmation worked; Cancel preserved the account and Confirm deleted it.
- The large Profile heading and enabled Save button for unchanged data were recorded as UX observations, not defects, because no design requirement defines them.

### Related Defects

- `BUG-002` — Existing messages do not update after language changes.
- `BUG-005` — Long Display Names are accepted and break the layout.
- `BUG-006` — `Created` remains English in Persian Profile.

---

## Charter 7 — History

### Coverage

- Opened History for a new account with no completed games.
- Checked the empty state in English and Persian.
- Completed games at different difficulties.
- Checked Date, Difficulty, and Result columns.
- Checked results from the player's perspective: player win = Win, computer win = Loss, no winner = Draw.
- Compared History outcomes with Profile statistics.
- Cancelled and confirmed Clear History.
- Reloaded after clearing History.
- Logged out and in again after clearing History.

### Observations

- New players saw the empty state.
- The Persian empty-state copy omitted the English `Play one` call-to-action.
- Completing a game replaced the empty state with a History table.
- Clear History Cancel preserved records; Confirm removed all records.
- Cleared History remained empty after reload and after a new Login.
- Result counts were compared with Profile statistics.
- Pagination/lazy loading and deletion of individual rows were recorded as enhancement ideas, not defects. The implementation retains a bounded History, and the 100-record boundary was not fully exercised manually.

### Related Defect

- `BUG-007` — Persian empty-History copy omits the call-to-action.

---

## Charter 8 — Extended Board-State Investigation

### Coverage

- Played after sequential difficulty changes from Easy to Medium to Hard.
- Re-selected the same board position after each confirmed restart.
- Set Hard difficulty, logged out, logged in again, and continued playing.
- Recorded video of an unexpected cell-state sequence.

### Observation Requiring Confirmation

A player-owned `X` appeared to become a computer-owned `O`, or an unexpected mark appeared, during specific difficulty/session sequences. Exact cell indexes and move order must be extracted from the video and reproduced at least three times before treating this as a confirmed defect.

### Candidate Defect

- `BUG-009` — Player mark may be replaced by a computer mark after difficulty/session state changes.

---

## Coverage Summary

Manual exploration covered:

- Authentication content, validation, and mode switching;
- Registration, Login, Logout, Session, and deletion;
- English/Persian localisation and RTL/LTR;
- Light/Dark themes;
- initial board state and turn handling;
- difficulty changes and preference persistence;
- Profile update, validation, statistics, and deletion;
- empty/populated History, result perspective, deletion, and persistence;
- consistency between Profile statistics and History;
- board-state integrity after difficulty and session changes.

## Defect Summary

| ID | Title | Classification |
|---|---|---|
| BUG-001 | Subtitle remains in English in Persian mode | Confirmed |
| BUG-002 | Existing feedback does not update after language change | Confirmed |
| BUG-003 | Language selector indicator is visually incorrect in RTL | Confirmed |
| BUG-004 | Persian authentication helper text omits source meaning | Confirmed localisation issue |
| BUG-005 | Long Display Names are accepted and break layout | Confirmed |
| BUG-006 | Profile `Created` label remains English in Persian | Confirmed |
| BUG-007 | Persian empty-History copy omits `Play one` | Confirmed localisation issue |
| BUG-008 | Native required-field message appears in English in Persian mode | Environment-dependent observation |
| BUG-009 | Player mark may change ownership in specific sequences | Candidate — needs exact reproduction |

## Overall Summary

The main flows were functional in the tested happy paths. The largest confirmed defect group relates to localisation consistency, especially stale feedback after language changes. The highest potential product risk is the candidate board-state corruption issue; it should be prioritised for exact reproduction. Critical, repeatable flows were selected for Cypress automation, while subjective UI concerns, native browser-dialog behaviour, and enhancement ideas were documented separately.
