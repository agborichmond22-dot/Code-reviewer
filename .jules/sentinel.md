# Sentinel's Journal: Critical Security Learnings

## 2024-07-22 - Missing Client-Side API Key Security Handling
**Vulnerability:** The application was making direct fetch requests to the Anthropic API without an API key, missing required headers (`x-api-key`, `anthropic-version`, and `anthropic-dangerous-direct-browser-access`), and lacking any UI mechanism for the user to securely input, mask, validate, and persist their own key in `localStorage`. This could lead to hardcoding secrets or non-functional API requests.
**Learning:** For a serverless/static frontend application, managing API keys directly in the client requires careful validation, password masking in the UI, and secure storage in `localStorage` without exposing the secret in standard error outputs or logs.
**Prevention:** Always provide a password-masked, validated input for client-side API keys, bind it to `localStorage` under `anthropic_api_key`, and ensure that request headers are constructed securely with direct browser access flags.
