# Palette's Journal - Critical UX Learnings

## 2025-08-28 - ARIA accessibility for static HTML web components
**Learning:** Static single-page web applications with custom editor layouts and live toast notifications often lack accessible labels and live region attributes (`aria-live="polite"`), preventing screen readers from announcing content changes or identifying inputs.
**Action:** Always inspect HTML templates for missing `aria-label`, `aria-describedby`, and `aria-live` attributes on inputs, action buttons, dynamic toast popups, and review output regions.
