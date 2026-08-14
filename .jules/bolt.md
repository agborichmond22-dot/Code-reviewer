## 2026-08-14 - Prevent Gutter Re-rendering Bottleneck
**Learning:** For interactive input editors, full DOM line updates (such as rebuilding a gutter element with innerHTML) or array allocations (`.split('\n')`) on every keystroke create substantial lag and CPU overhead as the document grows.
**Action:** Always cache the current line count and compare it prior to modifying the DOM or performing costly layouts. When checking parameter triggers for event listeners, perform strict types/values comparisons to avoid implicit browser event parameters bypassing early exits.
