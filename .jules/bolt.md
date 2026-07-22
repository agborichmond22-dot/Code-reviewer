# Bolt's Journal - Critical Performance learnings

This journal holds performance-oriented learnings for CodeCheck.

## 2026-07-22 - Default parameter overridden by browser Event object in listener
**Learning:** When registering a function directly as an event listener in JavaScript (e.g., `addEventListener('input', func)`), the browser passes an `Event` object as the first argument. If the function has a default parameter like `func(force = false)`, the default parameter gets overridden by the truthy `Event` object, rendering checks like `if (!force)` completely ineffective.
**Action:** Always check parameter types strictly (e.g., `force === true`) or wrap the listener in an arrow function (e.g., `() => func()`) to avoid implicit argument pollution from browser events.
