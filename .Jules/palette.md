# Palette's Journal - Critical UX/Accessibility Learnings

## 2025-07-25 - [Accessibility & Interaction States on Code Reviewer]
**Learning:** Keyboard accessibility and dynamic button disabled states are vital for high-density, tool-based single-page interfaces. When action buttons (like "Copy" or "Clear") are active but have no content to operate on, it causes cognitive friction. Disabling them dynamically provides a clearer visual and programmatic cue of the app's current state. Also, standardizing focus-visible outlines ensures keyboard users can easily navigate the text area, selectors, and buttons without visual clutter.
**Action:** Always map editor content length or presence to the disabled state of associated context actions, and provide custom, high-contrast `:focus-visible` styles on all interactive control elements.
