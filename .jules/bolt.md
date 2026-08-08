## 2026-08-08 - Loose event-listener parameter override bypasses default parameters
**Learning:** When a function with default parameters (e.g., `func(force = false)`) is directly registered as a browser event listener, the browser's implicit `Event` object overrides the default parameter, making it truthy. This can bypass performance early-returns that check parameters loosely.
**Action:** Use strict type/value checking (e.g., `force === true`) instead of loose falsy checks when checking default boolean parameters in direct event listeners, or wrap the handler in an anonymous function.
