## 2026-10-06 - Avoid DOM updates and array allocations on editor input events

**Learning:** Running line gutter DOM updates (`innerHTML`, `textContent`) and array allocations (`split('\n')`, `Array.from()`) on every single `input` event during active typing causes unnecessary DOM layout thrashing and GC pressure in code editor textareas, even when line count hasn't changed.

**Action:** Cache the previous line count and count newlines via a simple character scan (`charCodeAt(10)`); perform an early return when line count is unchanged to keep keystrokes O(1) with 0 DOM writes.
