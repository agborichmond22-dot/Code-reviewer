## 2025-05-18 - Editor Gutter Redraw Bottleneck
**Learning:** In string-based editor implementations, running DOM gutter line number generation (`Array.from().join('<br>')` and `.innerHTML`) on every `input` event causes unnecessary array allocations and layout thrashing even when the line count hasn't changed.
**Action:** Always cache line count and perform an O(1) early return when the total line count is identical to avoid redundant DOM updates during normal typing on the same line.
