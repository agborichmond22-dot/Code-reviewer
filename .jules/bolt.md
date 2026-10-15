## 2025-08-10 - Gutter Line Update Optimization
**Learning:** Performing a full DOM innerHTML update and splitting the entire document text into an array on every keystroke causes significant input lag, especially on large files. Cache the line count and perform an O(1) early exit if it is unchanged. Additionally, using a simple character scan loop instead of splitting the string avoids costly array allocations.
**Action:** Always cache state and use character-by-character scan loops instead of full string splits inside key-press or input event handlers.
