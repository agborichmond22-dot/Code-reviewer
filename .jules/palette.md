## 2026-09-22 - Negative Outline Offset for Edge-to-Edge Inputs
**Learning:** Edge-to-edge textareas wrapped in `overflow: hidden` parent containers will clip standard positive focus outlines (`outline-offset: 1px`). Using `outline-offset: -2px` on `:focus-visible` keeps focus outlines completely visible inside the input bounds.
**Action:** Apply `outline-offset: -2px` on `:focus-visible` states for full-bleed or edge-to-edge inputs inside overflow-clipped wrappers.
