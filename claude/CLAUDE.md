# CLAUDE.md -- Project Memory Template
#
# This is a starter template. Copy it to your project root (or .claude/CLAUDE.md)
# and replace every bracketed placeholder with your project's specifics.
# Claude Code reads this file at session start to understand your project.

# Project Overview

[Brief description of your project: what it does, who it serves, and why it exists.]

## Tech Stack

[List your languages, frameworks, databases, and key dependencies. Example:]

- Language: [e.g., TypeScript, Python, Rust]
- Framework: [e.g., Next.js, FastAPI, Actix]
- Database: [e.g., PostgreSQL, SQLite, Redis]
- Package Manager: [e.g., pnpm, uv, cargo]
- Runtime: [e.g., Node 22, Python 3.12, Rust 1.80]

## Architecture

[Describe your project structure and key patterns. Example:]

```
src/
  core/       -- Business logic
  api/        -- HTTP handlers / routes
  db/         -- Database access layer
  lib/        -- Shared utilities
tests/        -- Test suites
```

[Note any architectural patterns: monorepo vs single package, layered architecture,
event-driven, microservices, etc.]

## Key Commands

[List the commands you use daily. Example:]

```bash
# Development
[your-dev-command]          # Start dev server

# Testing
[your-test-command]         # Run all tests
[your-test-watch-command]   # Run tests in watch mode

# Linting and Formatting
[your-lint-command]         # Lint code
[your-format-command]       # Format code

# Building
[your-build-command]        # Production build

# Deployment
[your-deploy-command]       # Deploy to production
```

## Development Guidelines

- Follow existing code patterns and conventions in the codebase
- Write tests for all new functionality
- Use conventional commits: feat:, fix:, docs:, test:, refactor:, chore:
- Never commit secrets, credentials, API keys, or .env files
- Prefer editing existing files over creating new ones
- Make minimal, focused changes -- do not refactor unrelated code
- Delete unused code completely; no backwards-compatibility shims

## Testing Strategy

[Describe your testing approach. Example:]

- Unit tests: [location, framework, naming conventions]
- Integration tests: [location, framework, setup requirements]
- E2E tests: [location, framework, how to run]
- Minimum coverage: [e.g., 80% line coverage]

[Note any testing conventions: test file naming, fixture patterns, mocking approach.]

## Code Style

[Language-specific style rules. Example:]

- [Formatting tool and config file, e.g., Prettier with .prettierrc]
- [Linter and config file, e.g., ESLint with eslint.config.js]
- [Naming conventions: camelCase for functions, PascalCase for types, etc.]
- [Import ordering rules]
- [Max line length, indentation style]

## Important Files

[List key files and their purposes. Example:]

- `[config-file]` -- Main configuration
- `[entry-point]` -- Application entry point
- `[schema-file]` -- Database schema / API schema
- `[ci-config]` -- CI/CD pipeline definition

## Environment Variables

[List required environment variables without actual values. Example:]

- `DATABASE_URL` -- Database connection string
- `API_KEY` -- External service API key
- `NODE_ENV` -- Runtime environment (development/production)

## Common Pitfalls

[Document things that tend to trip people up. Example:]

- [Known gotcha #1]
- [Known gotcha #2]
- [Anything that requires special handling or workarounds]
