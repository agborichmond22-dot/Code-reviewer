# Sentinel Journal - Security Learnings

## 2024-03-24 - Secure API Key Storage for Static Frontend Application
**Vulnerability:** Exposure/lack of mechanism for handling client-side API keys in a static frontend codebase.
**Learning:** For serverless static HTML/JS frontend apps, making direct API calls requires the user's secret key. If no UI configuration input exists, developers or users are forced to hardcode secrets into the source file or configuration files, creating high risk of accidental leakage via version control.
**Prevention:** Provide a password-masked UI input that persists securely in the client's local storage (`localStorage`). This avoids hardcoding secrets in source files while enabling secure direct browser access with appropriate custom headers (`anthropic-dangerous-direct-browser-access`, `x-api-key`).
