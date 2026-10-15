# Palette's UX & Accessibility Journal

This journal tracks critical UX and accessibility learnings and insights for the CodeCheck application.

## 2024-07-20 - Keyboard Accessibility & Screen Reader Optimization
**Learning:** In code-editor web applications, we often disable default outlines (`outline: none`) on textareas, buttons, and custom selects to match a dark-themed visual style. However, removing outline focus states without offering a custom substitute focus indicator completely breaks keyboard accessibility (`tab` navigation). Additionally, screen-readers will read out raw decorative markup (like `&lt;/&gt;` or inline SVGs) and fail to announce toast notifications unless `aria-live` or `role="status"` properties are correctly applied.
**Action:** Always map custom, visually elegant focus states (using `:focus-visible` with matching outlines or box shadows) whenever resetting standard outlines. Add `aria-hidden="true"` to decorative non-text icons, and add `role="status"` to transient toast UI regions to make them discoverable.
