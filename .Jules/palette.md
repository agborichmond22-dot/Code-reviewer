# Palette's Journal - Critical UX/Accessibility Learnings

## 2025-07-30 - Focus ring clipping in absolute editors
**Learning:** When styling absolute-positioned/full-height editors like `#code-input` for focus states, using custom outlines can result in focus rings being clipped by parent overflow rules. Setting `outline-offset: -2px` on `:focus-visible` keeps focus rings fully visible within their containers.
**Action:** Always use a negative outline offset for absolute/edge-aligned interactive elements.
