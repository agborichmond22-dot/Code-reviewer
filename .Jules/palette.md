## 2026-07-21 - Focus indicator styling on static web apps with outline: none
**Learning:** Overriding focus outlines completely via `outline: none` or similar reset styles blocks keyboard-navigable accessibility (a11y) entirely unless custom `:focus-visible` states are introduced. Providing an `outline: 2px solid var(--accent); outline-offset: 2px;` styles interactive elements cleanly only during keyboard interactions without visual noise for pointer users.
**Action:** When working with form inputs, selects, and custom buttons, always verify if a reset stylesheet or inline styling has suppressed standard browser focus indicators and restore them with native `:focus-visible` rules.

## 2026-07-21 - Visual feedback on empty form state buttons
**Learning:** Leaving action buttons like "Clear" or "Copy" enabled when there is no text/content to clear or copy creates dead clicks. Providing immediate dynamic state disabling (`disabled = !hasContent`) coupled with high visual fidelity changes (`opacity: 0.4` and `cursor: not-allowed`) prevents user error and enhances UI crispness.
**Action:** Review action panels in input forms and ensure any secondary or context-dependent buttons are correctly bound to model/view state to toggle accessibility.
