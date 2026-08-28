# Bug Reports

## Reporting Notes

- Only reproducible application defects are listed as Confirmed.
- Browser-native confirmation headings/buttons and native validation text can depend on browser/OS locale and are documented separately.
- Translation does not have to be literal, but it should preserve meaning and consistency.
- Replace all placeholders and evidence filenames before submission.

## Summary

| ID | Title | Area | Severity | Priority | Status |
|---|---|---|---|---|---|
| BUG-001 | Subtitle remains in English in Persian mode | Localisation | Minor | Medium | Open |
| BUG-002 | Existing feedback does not update after language change | Localisation / State | Major | High | Open |
| BUG-003 | Language selector indicator is visually incorrect in RTL | UI / RTL | Minor | Low | Open |
| BUG-004 | Long Display Names are accepted and break layout | Profile / Validation | Major | High | Open |
| BUG-005 | Profile `Created` label remains English in Persian | Profile / Localisation | Minor | Medium | Open |
| BUG-006 | Persian empty-History copy omits `Play one` | History / Localisation | Minor | Medium | Open |
| BUG-007 | Native required-field feedback is English in Persian mode | Environment-dependent | Minor | Low | Observation |
| BUG-008 | Player mark may change ownership in specific sequences | Gameplay / State | Critical | High | Needs Reproduction |
| BUG-009 | Log Out action wraps outside the navigation bar on a narrow mobile viewport | Responsive UI / Navigation | Minor | Low | Open |
| BUG-010 | Game action controls are clipped below the board on a mobile viewport | Responsive UI / Gameplay | Major | High | Open |


---

## BUG-001 — Application subtitle remains in English after switching to Persian

- **Area:** Localisation / Header
- **Severity:** Minor
- **Priority:** Medium
- **Status:** Open
- **Reproducibility:** [e.g. 5/5]
- **Environment:** Windows [Version], Chrome [Version]

### Preconditions

- The application is open in English.

### Steps to Reproduce

1. Observe the subtitle below the Tic-Tac-Toe title.
2. Change Language to Persian.
3. Observe the subtitle again.

### Actual Result

The subtitle remains `A small game for test automation` in the observed Persian state.

### Expected Result

The application-owned subtitle should be displayed in Persian when Persian is selected.

### Impact

The header displays mixed-language content and reduces localisation consistency.

### Evidence

- `evidence/BUG-001-subtitle-persian.png`

---

## BUG-002 — Existing application feedback does not update after changing the selected language

- **Area:** Localisation / Authentication / Profile
- **Severity:** Major
- **Priority:** High
- **Status:** Open
- **Reproducibility:** [e.g. 5/5]
- **Environment:** Windows [Version], Chrome [Version]

### Preconditions

- English or Persian is selected.

### Steps to Reproduce — Authentication Error

1. Select English.
2. Submit Registration without a valid name, or trigger the short/duplicate validation.
3. Verify that feedback appears in English.
4. Change Language to Persian.
5. Observe the existing feedback.

### Steps to Reproduce — Profile Success

1. Log in and open Profile.
2. Save the Display Name while English is selected.
3. Verify that the success feedback appears.
4. Change Language to Persian.
5. Observe the existing success feedback.
6. Repeat in the opposite language direction.

### Actual Result

Existing error or success feedback remains in the language in which it was generated.

### Expected Result

Application-owned feedback should update to the current language or be cleared when Language changes.

### Impact

The page displays mixed-language stateful messages and can confuse users.

### Evidence

- `evidence/BUG-002-Description under the Welcome tilte.png`

### Notes

This is one systemic state/localisation defect rather than separate defects for every message type.

---

## BUG-003 — Language selector indicator is visually incorrect in Persian RTL mode

- **Area:** UI / RTL
- **Severity:** Minor
- **Priority:** Low
- **Status:** Open
- **Reproducibility:** [value]

### Steps to Reproduce

1. Open the application in English and observe the language selector arrow.
2. Change Language to Persian.
3. Observe the selector arrow/indicator in RTL mode.

### Actual Result

The arrow is visually malformed or incorrectly positioned/directed in RTL mode.

### Expected Result

The language selector should retain a clear, correctly aligned dropdown indicator in both LTR and RTL modes.

### Evidence

- `evidence/BUG-003-language-selector-rtl.png`

---

## BUG-004 — Excessively long Display Names are accepted and break the application layout

- **Area:** Profile / Navigation / Input Validation
- **Severity:** Major
- **Priority:** High
- **Status:** Open
- **Reproducibility:** [e.g. 5/5]

### Preconditions

- A player is authenticated and Profile is open.

### Steps to Reproduce

1. Replace Display Name with an approximately 100-character value.
2. Select Save Changes.
3. Observe Profile and Navigation.

### Actual Result

The value is accepted and causes visible layout degradation, overflow, or displacement of controls.

### Expected Result

A safe maximum length should be enforced with clear feedback, and long content must not break the layout.

### Impact

A user-controlled value can make important UI areas difficult to read or use.

### Evidence

- `evidence/BUG-004-History-Tab.png`
- `evidence/BUG-004-Play-Tab.png`
- `evidence/BUG-004-Profile-Tab.png`

---

## BUG-005 — Profile Created label remains in English in Persian mode

- **Area:** Profile / Localisation
- **Severity:** Minor
- **Priority:** Medium
- **Status:** Open
- **Reproducibility:** [value]

### Steps to Reproduce

1. Log in and open Profile.
2. Change Language to Persian.
3. Observe the Profile statistics labels.

### Actual Result

`Created` remains English while Win, Loss, and Draw are translated.

### Expected Result

The `Created` label should be translated consistently with the rest of Profile.

### Evidence

- `evidence/BUG-005-Created.png`

---

## BUG-006 — Persian empty-History copy omits the Play One call-to-action

- **Area:** History / Localisation
- **Severity:** Minor
- **Priority:** Medium
- **Status:** Open
- **Reproducibility:** [value]

### Preconditions

- A new authenticated player has no completed games.

### Steps to Reproduce

1. Select English and open History.
2. Note the empty-state message, including `Play one`.
3. Change Language to Persian.
4. Observe the Persian empty state.

### Actual Result

The Persian text communicates that no game exists but omits the call-to-action.

### Expected Result

The Persian empty state should preserve the complete meaning and guidance of the English source.

### Evidence

- `evidence/BUG-006-Playone!.png`

---

## BUG-007 — Native required-field feedback is displayed in English while the application is Persian

- **Area:** Profile / Localisation / Browser Validation
- **Severity:** Minor
- **Priority:** Low
- **Status:** Observation
- **Reproducibility:** [value in tested environment]
- **Environment:** Include Chrome UI language and OS locale.

### Steps to Reproduce

1. Select Persian.
2. Open Profile.
3. Clear Display Name.
4. Select Save Changes.

### Actual Result

Chrome displays `Please fill out this field.` in English.

### Expected Result

For a fully consistent Persian experience, validation should be Persian.

### Notes

This text is produced by native HTML validation and can depend on browser/OS locale. Consider custom application validation if consistent localisation is required. Keep this as an observation unless supported-browser locale requirements make it a product defect.

### Evidence

- `evidence/BUG-007-Please Enter A Name.png`
- `evidence/BUG-007-ذخیره شد.png`
- `evidence/BUG-007-لطفا یک نام وارد کنید. در بخش پروفایل.png`
- `evidence/BUG-007-حسابی با این نام وجود ندارد.png`
- `evidence/BUG-007-No Account With This Name.png`
- `evidence/BUG-007-لطفا یک نام وارد کنید.png`


---

## BUG-008 — Player mark may be replaced by a computer mark after difficulty/session changes

- **Area:** Gameplay / State Integrity
- **Severity:** Critical
- **Priority:** High
- **Status:** Needs Reproduction
- **Reproducibility:** [complete after retest]

### Preconditions

- An existing player is authenticated.
- Difficulty may be stored for the account.

### Reproduction Sequence A

1. Start at Easy.
2. Select the top-left cell (`cell-0`, if confirmed).
3. Change to Medium and confirm the restart.
4. Select the same cell.
5. Change to Hard and confirm the restart.
6. Select the same cell and continue playing.
7. Observe mark ownership.

### Reproduction Sequence B

1. Select Hard.
2. Log out and log in with the same account.
3. Verify Hard is restored.
4. Select a cell and wait for the computer.
5. Continue playing and observe previously selected cells.

### Actual Result

In the recorded session, a player-owned `X` appeared to become `O`, or an unexpected mark state appeared.

### Expected Result

An `X` must remain owned by the player for the active game. The computer must place `O` only in an empty cell. Difficulty/session changes must not corrupt board state.

### Impact

If confirmed, the issue invalidates turn and board integrity and may produce incorrect game results or History.

### Evidence

- `evidence/BUG-008-Change Difficulty values to Hard.mp4`
- `evidence/BUG-008-Change Difficulty values.mp4`

### Required Follow-up

- Extract exact cell indexes and move order from the video.
- Reproduce at least three times.
- Record `data-state` before and after the unexpected change.
- Change Status to `Open` only after confirmation.

---

# Mobile and Responsive Bug Reports

> Add the following reports to `docs/bug-reports.md`. The IDs continue the existing sequence after `BUG-009`.

## BUG-009 — Log Out action wraps outside the navigation bar on a narrow mobile viewport

| Field | Details |
|---|---|
| **ID** | BUG-010 |
| **Title** | Log Out action wraps outside the navigation bar on a narrow mobile viewport |
| **Area** | Responsive UI / Navigation |
| **Severity** | Minor |
| **Priority** | P2 |
| **Status** | Open |
| **Environment** | Google Chrome DevTools device emulation; Galaxy Z Fold 5; 344 × 882 CSS viewport; English language; Light Theme |
| **Evidence** | `docs/evidence/BUG-010-mobile-navbar-logout-wrap-en.png` |

### Preconditions

- A player account exists.
- The player is authenticated.
- The application language is English.
- The Profile view is open.
- The viewport is set to a narrow mobile size such as 344 × 882.

### Steps to Reproduce

1. Open the application in Google Chrome.
2. Enable Device Toolbar in Chrome DevTools.
3. Select **Galaxy Z Fold 5** or set the viewport width to **344 px**.
4. Register or log in as a player.
5. Open the **Profile** view.
6. Observe the authenticated-player navigation area.

### Actual Result

The **Log Out** action wraps onto a separate line and is displayed outside the main navigation-bar container. The other navigation actions remain inside the container, resulting in a broken and inconsistent mobile layout.

### Expected Result

All navigation actions, including **Log Out**, should remain inside the navigation component. If the available width is insufficient, the complete navigation should wrap or reflow consistently without placing a single action outside its container.

### Impact

The action remains visible, but the navigation hierarchy and alignment are broken on a supported narrow viewport. This reduces usability and makes the Log Out action appear detached from the authenticated-player navigation.

### Notes

- The supplied comparison image shows the Persian/RTL layout keeping the corresponding action within the navigation row, while the English/LTR layout places **Log Out** below the container.
- The defect should also be checked at widths immediately above and below 344 px to identify the exact breakpoint.
- Browser zoom should be reset to 100% when reproducing, so the result is based on CSS viewport dimensions rather than browser zoom.

---

## BUG-010 — Game action controls are clipped below the board on a mobile viewport

| Field | Details |
|---|---|
| **ID** | BUG-011 |
| **Title** | Game action controls are clipped below the board on a mobile viewport |
| **Area** | Responsive UI / Gameplay |
| **Severity** | Major |
| **Priority** | P1 |
| **Status** | Open |
| **Environment** | Google Chrome DevTools device emulation; Surface Duo; 540 × 720 CSS viewport; English language; Light Theme; completed player-win board |
| **Evidence** | `docs/evidence/BUG-011-mobile-game-actions-clipped-en.png` |

### Preconditions

- A player is authenticated.
- The application language is English.
- The Play view is open.
- A game has been completed.
- The viewport is set to a mobile size such as 540 × 720.

### Steps to Reproduce

1. Open the application in Google Chrome.
2. Enable Device Toolbar in Chrome DevTools.
3. Select **Surface Duo** or set the viewport to **540 × 720**.
4. Register or log in as a player.
5. Complete a game, for example with a player Win.
6. Scroll to the bottom of the Play view if scrolling is available.
7. Observe the actions displayed below the game board.

### Actual Result

The controls below the completed board are clipped by the lower boundary of the application card/container. Only a small portion of the controls is visible, preventing the complete labels and controls from being presented correctly and potentially making the actions difficult or impossible to use.

### Expected Result

All post-game controls should be fully visible and reachable on the mobile viewport. The Play container should expand to fit its content or allow normal vertical scrolling without clipping the controls.

### Impact

Important gameplay actions below the board, such as starting a new game or using other post-game controls, may not be fully readable or reliably accessible on mobile devices.

### Notes

- The evidence shows clipping in the English/LTR layout. The Persian comparison uses a different emulated device and viewport, so language should not be treated as the confirmed trigger until both languages are tested at identical viewport dimensions.
- Verify the issue at 100% browser zoom and test whether page or container scrolling makes the controls fully accessible.
- Check for fixed heights, `overflow: hidden`, insufficient bottom padding, and board sizing that does not account for the vertical space required by the action controls.

---

## Recommended Evidence Files

Save the supplied screenshots under these names:

```text
docs/evidence/BUG-010-mobile-navbar-logout-wrap-en.png
docs/evidence/BUG-011-mobile-game-actions-clipped-en.png
```

For stronger evidence, capture separate screenshots at 100% browser zoom with the complete DevTools device dimensions visible.


## Product Observations and Enhancement Ideas

These are not included in the confirmed defect count:

1. The Profile heading size/spacing could be reviewed for visual hierarchy.
2. Save Changes remains enabled when Display Name is unchanged.
3. Registration is the default unauthenticated mode; Login-first is a possible UX alternative, not a requirement.
4. Persian Login-link wording is understandable but not literal.
5. Native confirmation headings and OK/Cancel labels follow browser/OS locale.
6. History has no pagination/incremental loading UI; this is an enhancement unless performance fails within the supported retention limit.
7. History can only be cleared in full; per-record deletion is not required by the supplied instructions.
