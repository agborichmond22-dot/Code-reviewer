# Sentinel's Journal - Critical Security Learnings

This journal records critical security-related discoveries and learnings.

## 2026-08-02 - Secure API Key Management for Direct Browser-to-LLM Requests
**Vulnerability:** The application previously attempted client-side fetch requests directly to the Anthropic API without an API key field or required headers, creating a high risk of developers hardcoding production secrets directly in client-side code, or standard client-side API calls failing immediately.
**Learning:** Safely enabling client-to-LLM communication requires providing a password-masked API key field (`type="password"`) with `autocomplete="off"` and `spellcheck="false"`. Any operations accessing `localStorage` must be wrapped in `try/catch` blocks to protect against environments where third-party state storage is restricted.
**Prevention:** Integrate a password-masked input for client-side API credentials, store them securely in the user's local context with robust error handling, and supply the required headers (`anthropic-dangerous-direct-browser-access: true`) safely on demand.
