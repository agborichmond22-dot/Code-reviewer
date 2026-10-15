## 2026-09-08 - Gutter line count caching on editor keystrokes
**Learning:** Re-rendering line numbers in gutter and allocating arrays via `Array.from()` on every input event causes input lag as code grows. Checking whether line count actually changed before modifying DOM permits O(1) early returns on keystrokes that do not change line count.
**Action:** When handling editor input events for gutters or line numbers, cache line counts to short-circuit DOM updates when line count remains constant.
