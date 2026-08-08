## 2026-08-08 - Secure API Key Storage and Input Masking
**Vulnerability:** Hardcoded API keys or unmasked client-side input elements exposing sensitive keys in browser sessions and local storage.
**Learning:** To allow a frontend application to securely communicate directly with third-party LLM APIs (like Anthropic) in a client-only static app, keys should be supplied by the user dynamically via password-masked inputs and stored in localStorage with proper error boundaries.
**Prevention:** Always use password-type inputs with autocomplete="off" and spellcheck="false" for credentials, wrap storage storage/retrieval in try/catch to avoid environment DOMExceptions, and use the correct HTTP header settings to make direct browser requests.
