## 2025-05-18 - Caching Line Count in Gutter DOM Updates
**Learning:** In text editor inputs triggering `input` listeners on every keystroke, splitting content and re-rendering gutter line numbers on every key event causes noticeable DOM overhead and garbage collection pressure even when line count hasn't changed.
**Action:** Always track `lastLineCount` in module state and perform an early return `if (lines === lastLineCount)` before re-building arrays or modifying `innerHTML`.
