# Palette's Journal - Code Reviewer UX/a11y learnings

## 2025-07-31 - Visible Focus Rings & Dynamic Accessible Announcements
**Learning:** When styling custom editor textareas and absolute-positioned layouts, using `:focus-visible` with a negative `outline-offset` prevents focus rings from being clipped by overflow-hidden parent elements. Furthermore, dynamic elements like toast alerts require explicit `role="status"` and `aria-live="polite"` attributes to ensure modern screen readers announce changes immediately.
**Action:** Always apply `outline-offset: -2px` on edge-to-edge text areas and ensure live-region attributes are present on elements that dynamically display copy or confirmation messages.
