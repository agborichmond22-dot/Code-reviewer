## 2025-01-26 - Prevent typing lag via early return line counting
**Learning:** Running split('\n') and regenerating the full gutter innerHTML on every keystroke causes significant input lag in larger text files. This can be optimized by counting lines via index search and returning early in O(1) if the line count hasn't changed.
**Action:** Use an index search loop instead of `.split('\n')`, keep a cached line count, and strictly check force flags (e.g. `force === true`) when registering event listeners to prevent the implicit event argument from overriding default parameters.
