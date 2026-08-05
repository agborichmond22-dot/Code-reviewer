# Palette's Journal - Critical UX & Accessibility Learnings

## 2025-08-05 - Confirmation on Loss of Progress in Code Reviewer
**Learning:** Destructive actions like `clearAll()` and loading example code over existing content must prompt for user confirmation only if there is unsaved content. Otherwise, they should execute silently to preserve a frictionless workflow.
**Action:** Always check if the editor/textarea content is non-empty before triggering `confirm()`.

## 2025-08-05 - Direct Browser-triggered Event Listener Default Values
**Learning:** When registering a function with default parameters (e.g. `func(force = false)`) directly as a JavaScript event listener (e.g. `onclick="func()"`), the browser's implicit `Event` argument can override the default parameter, making it truthy.
**Action:** Use strict parameter comparison (e.g., `force === true`) to prevent event-based overrides.

## 2025-08-05 - Accessible Notification Toasts
**Learning:** Dynamic elements such as dynamic floating toasts require explicit standard roles (`role="status"` and `aria-live="polite"`) to ensure screen readers announce updates dynamically.
**Action:** Always add standard ARIA attributes to toast notification elements in the DOM.
