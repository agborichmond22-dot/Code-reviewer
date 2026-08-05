## 2024-08-05 - Secure API Key Handing in Static Frontend
**Vulnerability:** Insecure or hardcoded API keys, lack of password masking, and unsafe storage or parsing of API keys, plus risk of exposing credentials to browser autofill or search indexing.
**Learning:** Client-side static single-page applications that communicate directly with backend APIs need password-masked input fields, strict handling of browser autofill prevention, and try/catch wrapped local storage access.
**Prevention:** Use `<input type="password" id="api-key-input" autocomplete="off" spellcheck="false" class="input-api-key" placeholder="Enter Anthropic API Key">` with safe event-driven persistence inside try-catch blocks. Avoid committing any hardcoded secrets.
