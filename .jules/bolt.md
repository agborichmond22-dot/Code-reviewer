# Bolt's Performance Journal

## 2026-07-19 - [DOM Thrashing and Allocation Avoidance under Fast Typing Events]
**Learning:** In a textarea or code editor where typing events fire rapidly on every keypress, executing operations that split entire document strings or recreate entire collections of line numbers (such as using `Array.from` or array splitting) induces massive garbage collection overhead and triggers unnecessary DOM thrashing and reflows/paints if the layout is updated when the line count hasn't changed.
**Action:** Always track the line count in a state/parent scope variable and only perform DOM updates and heavy element creation when the line count actually changes. Additionally, use index-of iteration over splitting/array allocations to determine line count in O(n) time with O(1) memory overhead.
