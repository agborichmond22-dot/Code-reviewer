## 2025-08-04 - [Line-count Caching for Gutter rendering]
**Learning:** Performing `textarea.value.split('\n')` and modifying `gutterEl.innerHTML` on every single keystroke causes substantial typing lag, especially on larger files, due to O(N) array allocation, garbage collection, and heavy DOM reflows.
**Action:** Keep a cached line count and fast-path return `O(1)` when the line count is unchanged. Calculate the line count using a fast regex scanner instead of splitting the entire string into an array.
