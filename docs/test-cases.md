# Manual and Automated Test Cases

> Update the **Automation** column to match the tests that are actually implemented in your repository. Do not label an incomplete or flaky script as Automated.

## Authentication and Localisation

| ID | Priority | Scenario | Expected Result | Automation | Automated Coverage | Related Defect |
| --- | --- | --- | --- | --- | --- | --- |
| AUTH-001 | P0 | Register with a valid name | Account is created, player is authenticated, and the Play view opens | Automated | English and Persian | — |
| AUTH-002 | P0 | Submit an empty player name | Account is not created and required-name feedback is displayed | Automated | English and Persian | — |
| AUTH-003 | P1 | Submit a whitespace-only player name | Account is not created and required-name feedback is displayed | Manual | — | — |
| AUTH-004 | P1 | Submit a one-character player name | Account is not created and minimum-length feedback is displayed | Automated | English and Persian | — |
| AUTH-005 | P0 | Register an exact duplicate player name | Duplicate account registration is rejected | Automated | English and Persian | — |
| AUTH-006 | P0 | Register a case-insensitive duplicate player name | Duplicate account registration is rejected regardless of letter case | Automated | English only | — |
| AUTH-007 | P0 | Log in with an existing account | Login succeeds, the player name is displayed, and the Play view opens | Automated | English and Persian | — |
| AUTH-008 | P0 | Log in with an unknown account | Login is rejected and account-not-found feedback is displayed | Automated | English and Persian | — |
| AUTH-009 | P0 | Log in with a deleted account | Login is rejected and account-not-found feedback is displayed | Manual | — | — |
| AUTH-010 | P0 | Reload while authenticated | The same authenticated player session and Play view are restored | Automated | English and Persian | — |
| AUTH-011 | P0 | Log out | The authenticated session ends and the Authentication view is displayed | Automated | English and Persian | — |
| AUTH-012 | P1 | Switch from Registration mode to Login mode | Create Account is replaced by an enabled Login action | Partially Automated | Covered as part of English and Persian Login scenarios; no dedicated test | — |
| AUTH-013 | P1 | Reload while unauthenticated Login mode is displayed | The default Registration mode is restored | Manual | — | — |
| LOC-001 | P1 | Switch the application from English to Persian | Persian is selected and the document uses `lang="fa"` and `dir="rtl"` | Partially Automated | Language selection is performed during setup; explicit `lang` and `dir` assertions require confirmation | BUG-001, BUG-003, BUG-004 |
| LOC-002 | P1 | Change language while feedback is visible | Existing feedback is translated or cleared | Manual | — | BUG-002 |

## Gameplay

| ID | Priority | Scenario | Expected Result | Automation | Automated Coverage | Related Defect |
|---|---|---|---|---|---|---|
| GAME-001 | P0 | Open a new game | Nine empty and enabled cells are displayed; it is the player's turn; the default difficulty and Hint control are available | Automated | English | — |
| GAME-002 | P0 | Select an empty cell | The selected cell becomes X and is disabled | Automated | English | — |
| GAME-003 | P0 | Wait for the computer response | Exactly one O is placed after the player's move and control returns to the player | Automated | English | — |
| GAME-004 | P0 | Try interacting during the computer turn | Empty cells are disabled while the computer is thinking and are enabled again when the player's turn resumes | Automated | English | — |
| GAME-005 | P0 | Re-select an occupied cell | The occupied cell remains unchanged and no additional turn occurs | Partially Automated | English: the occupied cell is verified as disabled and its state and mark remain unchanged; no second click is attempted | — |
| GAME-006 | P0 | Complete a player win | Win status and winning cells are displayed, the board is locked, and the computer makes no additional move | Automated | English | — |
| GAME-007 | P0 | Complete a computer win | Loss status is displayed for the player and the board is locked | Manual | — | — |
| GAME-008 | P0 | Complete a draw | Draw status is displayed, the board is locked, and the result is recorded | Manual | — | — |
| GAME-009 | P1 | Start a New Game after making moves | The board resets, the selected difficulty is preserved, and the unfinished game is not recorded | Partially Automated | English: board reset and difficulty preservation are covered; History is not checked for an unfinished-game record | — |
| GAME-010 | P1 | Request a Hint | One valid empty cell is highlighted without changing the board state or turn | Manual | — | — |
| GAME-011 | P1 | Cancel an active-game difficulty change | The current board state and previously selected difficulty remain unchanged | Manual | — | — |
| GAME-012 | P1 | Confirm an active-game difficulty change | The new difficulty is applied and the active board is reset | Manual | — | — |
| GAME-013 | P1 | Log out and log in after changing difficulty | The saved difficulty is restored for the same player | Manual | — | — |
| GAME-014 | P0 | Continue playing after sequential difficulty and session changes | X and O ownership remains valid throughout the game | Manual Investigation | — | BUG-008|
| GAME-015 | P0 | Record a completed player win exactly once | One Win record with the correct difficulty and a non-empty date is stored and remains unique after navigation and reload | Automated | English | — |

## Profile

| ID | Priority | Scenario | Expected Result | Automation | Automated Coverage | Related Defect |
|---|---|---|---|---|---|---|
| PROF-001 | P0 | Open Profile | The registered Display Name, initial statistics, and account creation date are displayed | Automated | English: Profile view, Display Name, initial statistics, and non-empty creation date are verified across the Profile tests | — |
| PROF-002 | P0 | Save a valid new Display Name | The Profile and Navigation names are updated and remain updated after page reload | Automated | English | — |
| PROF-003 | P1 | Save an unchanged Display Name | Behaviour remains consistent and existing account data is not corrupted | Manual | — | Observation |
| PROF-004 | P0 | Save an empty Display Name | The update is rejected and appropriate required-name feedback is displayed | Manual | — | BUG-008 |
| PROF-005 | P1 | Save an excessively long Display Name | A safe maximum length is enforced and the layout remains usable | Manual | — | BUG-005 |
| PROF-006 | P1 | View the Profile in Persian | All Profile labels and values are correctly presented in Persian | Manual | — | BUG-006 |
| PROF-007 | P0 | Complete games and view Profile statistics | Wins, Losses, and Draws are updated according to completed game results and persist after reload | Partially Automated | English: a deterministic Player Win updates Wins to 1 while Losses and Draws remain 0; persistence after reload is verified. Computer Loss and Draw scenarios are not covered | — |
| PROF-008 | P0 | Confirm account deletion | The account and authenticated session are removed and the Authentication view remains displayed after reload | Partially Automated | English: deletion is confirmed and the unauthenticated state is verified before and after reload; rejection of Login with the deleted account is not tested | — |
| PROF-009 | P1 | Cancel account deletion | The account and authenticated session remain active and Profile data is unchanged | Manual | — | — |
| PROF-010 | P0 | Log in after account deletion | Login with the deleted account is rejected with account-not-found feedback | Manual | — | — |

## History

| ID | Priority | Scenario | Expected Result | Automation | Automated Coverage | Related Defect |
|---|---|---|---|---|---|---|
| HIST-001 | P1 | Open History for a new player | The empty-history state is displayed with zero records; the History table and Clear History action are not displayed | Partially Automated | English: History is opened, zero records are verified, and the empty state is validated. Absence of the table and Clear History action depends on the assertions inside `validateEmptyHistoryState()` | BUG-007 |
| HIST-002 | P0 | Complete one player win | Exactly one History record is displayed with a non-empty Date, Easy difficulty, and Win result | Partially Automated | English: exactly one Win record with Easy difficulty is verified. Date verification depends on the assertions inside `validateHistoryRecord()` | — |
| HIST-003 | P0 | Complete a computer win | History records a Loss from the player's perspective | Manual | — | — |
| HIST-004 | P0 | Reopen and reload History after a completed game | The existing History record persists and is not duplicated | Automated | English: the record count remains one after navigating away, reopening History, and reloading the application | — |
| HIST-005 | P1 | Cancel Clear History | The confirmation is dismissed and all existing History records remain unchanged | Manual | — | — |
| HIST-006 | P1 | Confirm Clear History | All History records are removed and the empty-history state is displayed | Automated | English | — |
| HIST-007 | P1 | Reload after clearing History | History remains empty after page reload | Automated | English | — |
| HIST-008 | P1 | Log out and log in after clearing History | The cleared History state persists for the same player | Manual | — | — |
| HIST-009 | P0 | Compare Profile statistics with History records | Profile Win, Loss, and Draw totals match the corresponding completed results in History | Manual | — | — |
| HIST-010 | P2 | Reach the supported History boundary | History retention, ordering, and removal behaviour match the product specification | Not Automated | Scenario has not been executed or automated; the supported boundary must first be defined | — |

## Settings

| ID | Priority | Scenario | Expected Result | Automation | Automated Coverage | Related Defect |
|---|---|---|---|---|---|---|
| SET-001 | P1 | Switch the application language from English to Persian | Persian is selected and the document uses `lang="fa"` and `dir="rtl"` | Automated* | Language selection and Persian/RTL application are verified through `verifyPersianLanguageIsApplied()`; exact coverage depends on its Page Object assertions | BUG-001, BUG-003, BUG-004 |
| SET-002 | P1 | Reload after selecting Persian | Persian remains selected and `lang="fa"` and `dir="rtl"` are preserved after reload | Automated* | Persian and RTL are verified before and after reload through `verifyPersianLanguageIsApplied()` | — |
| SET-003 | P1 | Switch from Light Theme to Dark Theme | Dark Theme is selected and `data-theme="dark"` is applied | Automated* | Light Theme is verified first; Dark Theme is then selected and verified through `verifyDarkThemeIsApplied()` | — |
| SET-004 | P1 | Reload after selecting Dark Theme | Dark Theme and `data-theme="dark"` are preserved after reload | Automated* | Dark Theme is verified before and after reload | — |
| SET-005 | P2 | Switch back to English and Light Theme | English is selected, `lang="en"` and `dir="ltr"` are restored, and Light Theme is applied | Manual | No switch-back flow is implemented in the supplied spec | — |
