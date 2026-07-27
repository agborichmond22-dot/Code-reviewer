## 2025-07-27 - Direct Client-Side Anthropic API Requests & Key Masking

**Vulnerability:** Client-side API keys must be handled securely in the browser to prevent leakage and unhandled runtime exceptions. Direct client-side requests to Anthropic Claude API require explicit headers (`anthropic-dangerous-direct-browser-access: true`), which signals intentional exposure in front-end code. If client-side persistence (`localStorage`) is used without strict safety wrappers, the application crashes under restricted browser policies (e.g., incognito or iframe sandbox configurations). Additionally, password masking in DOM inputs is critical to prevent "shoulder surfing" visual exposure.

**Learning:**
1. Direct Anthropic API calls from the browser must pass specific authorization headers, including a dangerous access opt-in header.
2. `localStorage` access can throw unhandled DOMException errors (e.g., SecurityError) in private/restricted environments. Wrapping key persistence operations inside a robust `try/catch` block isolates potential failures and preserves core application stability.
3. API key fields must use `type="password"` to ensure visual shielding, as users frequently share screenshots or perform screenshares during code reviews.

**Prevention:** Always shield sensitive credential fields in HTML inputs with `type="password"`, wrap storage-bound persistence mechanisms in safe error boundaries, and add specific authorization headers when building headless, browser-direct LLM integrations.
