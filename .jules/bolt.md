# Bolt's Journal - Critical Performance learnings

This journal details critical performance and optimization learnings from Bolt.

## 2025-08-03 - Line gutter and count caching
**Learning:** Running `.split('\n')` on large inputs inside typing/input hotpaths allocates significant memory, triggering frequent Garbage Collection (GC) pauses. Re-generating the full gutter DOM via `Array.from()` and `innerHTML` with string concatenation on every single keystroke degrades performance exponentially as lines grow.
**Action:** Fast-path the text input by first scanning for newlines using `indexOf` or index iteration to get the line count. Compare against a cached count variable. Perform an O(1) early return if the line count hasn't changed. If changed, regenerate with efficient string concatenation loop instead of allocating intermediate arrays.
