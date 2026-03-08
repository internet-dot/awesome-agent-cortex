# Git Workflow

Conventional commits and PR standards.

## Commit Messages

- Use Conventional Commits format: `type(scope): description`
- Types: `feat`, `fix`, `docs`, `test`, `refactor`, `chore`, `ci`, `perf`
- Write in imperative mood: "add feature" not "added feature"
- Keep the subject line under 72 characters
- Use the body to explain "why" when the diff alone is insufficient

## Commit Hygiene

- Atomic commits: one logical change per commit
- Never commit secrets, credentials, or generated artifacts
- Stage specific files -- avoid `git add .` which can include unintended files
- Run tests before committing -- don't break the build

## Branching

- Branch naming: `type/short-description` (e.g., `feat/user-auth`, `fix/login-redirect`)
- Keep branches short-lived -- merge within days, not weeks
- Rebase feature branches on the base branch to keep history clean
- Never force-push shared branches
- Delete branches after merge

## Pull Requests

- PR titles follow Conventional Commit format
- PRs should be reviewable in under 30 minutes -- split large changes
- Always write a description explaining what changed and why
- Link to relevant issues or context
- Request reviews from people who own the affected code

## Releases

- Tag releases with semantic versioning: `vMAJOR.MINOR.PATCH`
- Breaking changes bump the major version
- Write changelogs from commit history -- good commits make this easy
