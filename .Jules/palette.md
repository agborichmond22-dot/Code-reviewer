# Palette's UX/A11y Journal

This journal documents critical UX and accessibility discoveries and lessons learned during development.

## 2026-07-26 - Keyboard Focus and Accessibility Overlay
**Learning:** Suppressing default browser outlines without replacing them with custom `:focus-visible` styling renders the site completely inaccessible to keyboard users, as they have no way to visual locate active focus. Additionally, using negative outline offset (`outline-offset: -2px`) on full-width inputs (like absolute or edge-to-edge textareas) ensures that focus rings are perfectly visible without causing parent box-shadow overflow clipping.
**Action:** Always verify keyboard accessibility by checking focus state visibility on all interactive form elements, and use `:focus-visible` with matching accent colors and appropriate outline offsets to ensure a beautiful and compliant experience.
