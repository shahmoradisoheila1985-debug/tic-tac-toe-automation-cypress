# Automation Approach

## Tool Selection

Cypress with JavaScript was selected because the SUT is a small client-side browser application and the assignment has a three-day time box. Cypress provides fast setup, retryable assertions, browser-storage access, dialog handling, screenshots/videos, and interactive debugging.

## Prioritisation

Automation was selected based on product impact, regression value, repeatability, and implementation cost. Critical flows were automated across Authentication, Gameplay, History, Profile, and Settings. Broader visual, translation-quality, accessibility, and AI-permutation checks remained manual.

## Design

- Page Objects contain locators and reusable UI actions.
- Test specifications describe user scenarios and expected outcomes.
- Stable `data-testid` values are the primary locator strategy.
- Fixed waits are avoided; retryable assertions wait for observable state.
- Random Easy-mode behaviour is controlled only where deterministic board states are necessary.
- Cypress sessions are used for reusable authenticated setup while keeping scenarios independent.

## Limitations

- Exhaustive AI-state testing was not performed.
- The candidate board-state corruption issue requires exact reproduction.
- Visual and accessibility coverage is exploratory rather than a full audit.
- Cross-browser coverage is limited by the time box.
