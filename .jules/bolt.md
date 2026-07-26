# Bolt's Journal - Critical Performance learnings only

## 2025-07-26 - [Input Lag Optimization in Code Editor]
**Learning:** For a code editor component, running complete DOM gutter line updates and splitting the entire code string into array allocations (`.split('\n')`) on every single keystroke causes significant typing/input lag, especially with larger files.
**Action:** Implement O(1) early return by comparing current and cached line counts before performing any DOM updates, array allocations, or layout calculations. Avoid using standard array `.split('\n')` for counting lines, opting instead for character/newline scans or Regex-based non-allocating approaches. Check parameters strictly to avoid default values being overwritten by event objects.
