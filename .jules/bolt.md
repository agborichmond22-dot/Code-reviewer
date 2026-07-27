# Bolt's Performance Journal

This journal contains critical learnings to avoid performance regressions and design optimal optimizations.

## 2025-07-27 - [Optimizing Line Gutter Updates in Text Area Editors]
**Learning:** Performing array allocation (`.split('\n')`) and executing full DOM layout/reflow via `innerHTML` updates on *every* keystroke (even inside the same line) introduces noticeable input lag and causes high GC activity in the browser main thread.
**Action:** Always count line endings using an O(N) single-pass loop or non-allocating search instead of `.split()`, compare the current count with a cached value, and return early (O(1) fast path) if the line count hasn't changed. Be extremely careful when using standard event listeners: browser event delegation passes the implicit `Event` object as the first parameter, so check parameters strictly (e.g., `force === true`) rather than loosely (e.g., `!force`) to prevent unexpected cache bypasses.
