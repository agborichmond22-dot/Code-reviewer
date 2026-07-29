## 2026-07-29 - [Negative Outline Offset for Code Inputs]
**Learning:** In layout containers that use overflow rules or absolute positioning, traditional focus outline indicators on input areas (like a code editor textarea) can be clipped by parent elements. Using a negative offset `outline-offset: -2px` with `:focus-visible` keeps the focus ring fully inside the input boundaries.
**Action:** Always apply `outline-offset: -2px` on absolute/full-size code input fields to keep focus rings completely visible and accessible.
