## 2026-08-08 - Screen Reader Accessibility for Dynamic Toast Notifications
**Learning:** Dynamic notification elements like floating toasts require explicit standard status roles (e.g. role="status" aria-live="polite") to ensure they are voiced by modern screen readers. Without these, screen readers will not announce dynamic content injected into the container.
**Action:** Always include role="status" and aria-live="polite" on toast and notification containers to guarantee accessibility out-of-the-box.
