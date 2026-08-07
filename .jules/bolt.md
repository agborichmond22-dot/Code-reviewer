# Bolt's Journal - Critical Learnings Only

## 2024-08-07 - Minimizing Gutter Updates to Eliminate Typing Lag
**Learning:** Frequent DOM gutter rendering and array allocations (`.split('\n')`) on every keystroke introduce typing/input lag in the text editor. We can optimize this by comparing the current and cached line count first, and returning early in O(1) if unchanged.
**Action:** Implement a cached line count check in `updateGutter`, avoiding unnecessary DOM writes and array allocation. Ensure direct event listener registrations don't override the `force` parameter with the browser's implicit `Event` argument.
