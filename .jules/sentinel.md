## 2024-08-01 - Client-Side API Key Configuration & Storage
**Vulnerability:** Static frontend applications communicating directly with the Anthropic API would fail without local key configuration, or tempt developers into hardcoding API keys in the client bundle.
**Learning:** By providing a password-masked input in the UI that persists safely via `try/catch`-wrapped `localStorage` and attaching the required `anthropic-dangerous-direct-browser-access` header, we let users use their own keys securely without backend exposure or risk of committing secrets.
**Prevention:** Always mask client-side API credentials using `type="password"`, wrap `localStorage` access in `try/catch` to avoid DOMException failures, and never store plaintext keys directly in the source control.
