## 2025-08-12 - Prevent Accidental Content Discarding
**Learning:** Destructive actions such as clearing or loading placeholder examples over custom code can cause immediate data/progress loss, leading to severe user frustration. Using conditional confirmation checks based on editor content avoids annoying prompt spam while fully safeguarding user progress.
**Action:** When handling clear/load events in the editor UI, check if the editor content is non-empty before triggering a native `confirm()` modal or custom confirmation dialog.
