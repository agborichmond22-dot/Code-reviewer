# Sentinel Security Journal 🛡️

## 2025-02-18 - Securing Client-Side API Integration for Static Apps
**Vulnerability:** Static, browser-only applications attempting to make client-side requests to third-party APIs (such as Anthropic Claude) often lack a secure way to supply the required API key without hardcoding or risking key exposure in plain text.
**Learning:** Without a backend to act as a proxy, any credentials must be provided by the client. Hardcoding secrets in repository files leads to immediate credentials leak. The recommended secure pattern is to prompt the user directly via a password-masked UI input, storing the key strictly within client-side state (`localStorage`) and transmitting it securely via HTTPS.
**Prevention:** Use a secure `type="password"` input field to mask credentials, bind it to input events to persist securely in browser-local storage under `anthropic_api_key`, and include the required headers (`x-api-key`, `anthropic-version`, and `anthropic-dangerous-direct-browser-access: true`) in client-side fetch calls. Always validate that the key exists before initiating requests and fail gracefully to prevent blank or broken API requests.
