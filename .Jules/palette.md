## 2025-07-27 - Focus Visible & ARIA accessibility
**Learning:** Absolute-positioned and overflow-hidden containers like the code editor wrapping div can cut off standard browser outlines. Using a negative outline offset with `:focus-visible` (e.g. `outline-offset: -2px`) prevents the focus ring from being clipped.
**Action:** When styling edge-to-edge interactive elements or inputs wrapped inside overflow-hidden parents, apply negative outline offsets to ensure the focus indicator is fully visible to keyboard navigation users.
