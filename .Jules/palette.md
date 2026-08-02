## 2026-08-02 - Keyboard Focus Rings on Absolute-Positioned Inputs
**Learning:** When styling absolute-positioned or edge-to-edge inputs (such as the code input editor) for focus states, standard focus borders or outlines might get clipped or obscured by parent elements that have `overflow: hidden` set on them.
**Action:** Use a negative outline offset (e.g., `outline-offset: -2px`) with `:focus-visible` to ensure focus rings are fully visible inside the bounds of the input, instead of being clipped.

## 2026-08-02 - Making Floating Toasts Accessible to Screen Readers
**Learning:** Dynamic, JavaScript-triggered toast notifications or floating statuses are often completely ignored by modern screen readers if not specifically configured.
**Action:** Always add standard ARIA attributes like `role="status"` and `aria-live="polite"` to the toast container so that the user's assistive technology automatically voices status updates.
