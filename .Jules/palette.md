## 2025-08-04 - [Destructive Action Confirmations]
**Learning:** Performing destructive actions like clearing the user's custom-entered text or overwriting code with sample snippets unexpectedly can lead to user frustration. Asking for user confirmation strictly when there is existing user-authored content inside the editor provides a safety net without introducing unnecessary friction for empty/initial states.
**Action:** Guard clear and replace actions with a `confirm()` prompt conditioned on whether the source editor element has content (e.g. `codeEl.value.trim() !== ''`).
