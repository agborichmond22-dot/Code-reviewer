# Bolt's Performance Journal

This journal records critical learnings regarding the performance of the CodeCheck AI Code Reviewer.

## 2024-07-28 - [Eliminating Text Editor Input Lag with O(1) Gutter State Checking]
**Learning:** Performing array allocation (`.split('\n')`) and destructive DOM modifications (`innerHTML`) on every single keystroke in a code editor causes severe typing latency, layout thrashing, and garbage collection churn. Since keypresses rarely change the actual number of lines in a document, comparing the new line count with a cached state allows for an O(1) early-return, bypassing DOM updates entirely on most keystrokes.
**Action:** Always check and cache calculated UI states before performing DOM mutations or heavy processing in input event handlers.
