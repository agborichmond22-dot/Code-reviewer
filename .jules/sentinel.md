## 2024-07-24 - API Key Exposure Prevention
**Vulnerability:** A static frontend web application directly invoking the Anthropic Claude API must avoid hardcoding sensitive API keys. In addition, calling the API directly from the client requires passing direct browser access headers.
**Learning:** Storing the Anthropic API key in a password-masked UI input and persisting it client-side in the user's browser `localStorage` allows making secure client-side API calls without risking exposure in the source code or server logs.
**Prevention:** Always delegate secret key inputs to the end user via a secure input field, save to local browser storage, and pass the headers `x-api-key`, `anthropic-version`, and `anthropic-dangerous-direct-browser-access` at runtime.
