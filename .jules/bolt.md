## 2026-08-23 - Code Editor Input Gutter Optimization
**Learning:** Updating the code editor gutter DOM (`innerHTML` re-renders and line array creation) on every single `input` keystroke causes severe typing lag in simple textareas. Checking line count changes and performing an O(1) early return when the count is unchanged eliminates unnecessary main thread work.
**Action:** Always check if string/line counts or relevant structural states have actually changed before re-rendering editor line numbers or DOM gutters on key inputs.
