# Coding Style

Universal conventions for clean, maintainable code.

## Naming

- Use descriptive names that reveal intent -- avoid abbreviations
- Follow language conventions for casing (camelCase, snake_case, PascalCase)
- Booleans should read as predicates: `is_valid`, `hasAccess`, `shouldRetry`

## Functions

- Single responsibility -- each function does one thing well
- Keep functions under ~50 lines; extract when complexity grows, not preemptively
- Use early returns to reduce nesting and clarify control flow
- Prefer pure functions where practical -- explicit inputs and outputs

## Comments and Documentation

- Write code that explains itself; add comments only where logic is non-obvious
- Never commit commented-out code -- use version control instead
- Document "why" not "what" -- the code already shows what it does

## Structure

- DRY, but avoid premature abstraction -- three similar lines are better than an unnecessary helper
- Prefer composition over inheritance
- Keep imports organized and remove unused ones
- Avoid magic numbers and strings -- use named constants

## Error Handling

- Error messages should be actionable and include context (what failed, why, what to do)
- Fail fast and loud -- silent failures are harder to debug than noisy ones
- Handle errors at the appropriate level -- don't catch what you can't handle meaningfully
