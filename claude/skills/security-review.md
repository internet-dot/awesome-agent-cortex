# Security Review

Run a systematic security audit against a codebase target.

## Usage

Invoke with `/security-review [target]` where target is a file, directory, or module to audit. If no target is provided, review recently changed files (via `git diff` or `git log`).

## Workflow

When this skill is invoked, follow these steps exactly:

### 1. Identify the Target

- If `$ARGUMENTS` is provided, use it as the audit target (file path, directory, or glob pattern)
- If no arguments, run `git diff --name-only HEAD~5` to find recently changed files and audit those

### 2. Run the Security Checklist

For each file in scope, systematically check every item below. Do not skip items -- explicitly mark each as PASS, FAIL, or N/A.

- **Input Validation**: All user inputs are validated and sanitized. Check request bodies, query params, URL params, headers, file uploads.
- **Authentication**: Auth flows are correct. Tokens have expiry, are validated server-side, and use secure storage. Sessions are invalidated on logout.
- **Authorization**: Access controls enforce least privilege. Role-based permissions are checked on every protected endpoint. No IDOR vulnerabilities.
- **Data Protection**: Sensitive data (PII, passwords, tokens) is encrypted at rest and in transit. No sensitive data in URLs or query strings.
- **SQL Injection**: All database queries use parameterized queries or prepared statements. No string concatenation in SQL.
- **XSS**: All output is encoded/escaped for the appropriate context (HTML, JS, URL, CSS). No unsafe innerHTML usage without prior sanitization via a library like DOMPurify.
- **CSRF**: State-changing operations require anti-CSRF tokens. SameSite cookie attributes are set.
- **Secrets**: No hardcoded credentials, API keys, connection strings, or private keys in source. Check for `.env` files committed to git.
- **Dependencies**: Run dependency audit (`npm audit`, `pip audit`, `cargo audit`, etc.) and flag known vulnerabilities.
- **Logging**: No sensitive data (passwords, tokens, PII) written to logs. Errors do not leak stack traces or internal details to clients.

### 3. Report Findings

Output findings grouped by severity:

**CRITICAL** -- Must fix before deploy. Active exploitability.
- Format: `[CRITICAL] file_path:line_number -- Description of the vulnerability. Suggested fix: ...`

**WARNING** -- Should fix soon. Potential risk under certain conditions.
- Format: `[WARNING] file_path:line_number -- Description of the issue. Suggested fix: ...`

**INFO** -- Best practice recommendations. Not immediately exploitable.
- Format: `[INFO] file_path:line_number -- Description. Recommendation: ...`

### 4. Summary

End with a summary table:

| Severity | Count |
|----------|-------|
| CRITICAL | N     |
| WARNING  | N     |
| INFO     | N     |

If zero findings across all categories, state: "No security issues found in the audited scope."
