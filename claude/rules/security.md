# Security

Security-first defaults for every project.

## Secrets Management

- Never commit secrets, API keys, credentials, or `.env` files
- Use environment variables or secret managers -- never hardcode credentials
- Add sensitive file patterns to `.gitignore` before writing any code

## Input Validation

- Validate and sanitize all external inputs: user input, API responses, environment variables
- Use allowlists over blocklists -- explicitly permit known-good values
- Reject unexpected input types and shapes early at system boundaries

## Injection Prevention

- Use parameterized queries -- never string-concatenate SQL
- Escape output to prevent XSS -- use framework-provided escaping by default
- Avoid dynamic code execution and shell interpolation of user input

## Authentication and Authorization

- Principle of least privilege for all permissions, scopes, and tokens
- Use constant-time comparison for secrets and tokens
- Set secure defaults for cookies: `HttpOnly`, `Secure`, `SameSite`
- Validate authentication on every request -- never trust client-side checks alone

## Dependencies

- Pin dependency versions to avoid supply chain attacks
- Audit dependencies for known vulnerabilities regularly
- Minimize the dependency surface -- fewer deps means fewer attack vectors

## Logging and Monitoring

- Log security-relevant events: auth failures, permission denials, input validation rejections
- Never log sensitive data: passwords, tokens, PII, credentials
- Include enough context in logs to reconstruct what happened without exposing secrets
