## 2026-11-03 - Accessible Inputs and Destructive Action Safeguards
**Learning:** Full-bleed custom-rendered textareas and unannounced gutters confuse assistive technologies unless explicitly labeled and hidden from the accessibility tree, while keyboard focus rings can be inadvertently clipped without negative outline offsets.
**Action:** Always provide explicit aria-labels for unlabeled controls, hide non-semantic line number gutters with aria-hidden, use negative outline offsets for edge-to-edge inputs, and confirm before destructive clear operations.
