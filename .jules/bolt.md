# Bolt's Journal - Critical Learnings

This journal is used to track critical performance learnings from optimizing the codebase.

## 2024-07-18 - [Optimizing Line Gutter Rendering]
**Learning:** In editors with high-frequency keystroke input (like a text area for pasting code), recalculating the line gutter and updating the DOM innerHTML on every single keystroke causes massive style/layout recalculations (reflow) and high garbage collection overhead due to `.split('\n')` array allocations, even when the line count has not changed. Caching the line count and only updating the DOM when the line count changes, and counting lines using index-of loops instead of splitting strings, significantly reduces CPU usage during fast typing.
**Action:** Implement `lastLineCount` cache and a fast line-counting algorithm, early returning if line count has not changed.
