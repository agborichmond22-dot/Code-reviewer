# Bolt's Journal - Critical Learnings Only

## 2025-08-02 - Gutter Update Performance Bottleneck
**Learning:** Frequent array allocations (via `.split('\n')`) and DOM manipulations (`innerHTML` updates) on every single keystroke block the main thread and lead to noticeable input lag/stuttering in long text inputs, especially as the code grows larger. By caching the previous line count and early-returning when the line count is unchanged, we achieve O(1) time complexity for most keystrokes and eliminate layout thrashing entirely.
**Action:** Always verify if dynamic UI elements (like editor gutters, counters, status bars) can be cached or bypassed if their underlying source length or count hasn't changed.
