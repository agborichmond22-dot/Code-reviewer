## 2026-10-02 - Throttle SSE Stream Rendering with requestAnimationFrame
**Learning:** Parsing markdown and writing directly to `innerHTML` and `scrollTop` on every individual SSE text delta token causes severe main-thread UI thrashing and layout reflows during high-frequency AI streaming responses.
**Action:** Schedule DOM streaming updates using `requestAnimationFrame` to batch renders to ~60 FPS, and ensure any pending animation frame is canceled before performing the final stream cleanup render.
