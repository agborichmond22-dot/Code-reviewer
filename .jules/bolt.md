## 2026-09-19 - Editor Gutter DOM Line Caching
**Learning:** Running full DOM gutter line updates (`innerHTML` reassignment and `Array.from` allocations) on every typing event causes input lag and redundant DOM layout cycles when typing on the same line.
**Action:** Cache the previous line count and early return in line gutter handlers when line count is unchanged.
