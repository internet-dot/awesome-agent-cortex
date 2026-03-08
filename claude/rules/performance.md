# Performance

Token optimization and context management for Claude Code.

## Context Window

- Keep `CLAUDE.md` concise -- every token counts against the context window
- Use `.claude/rules/` for domain-specific rules instead of bloating `CLAUDE.md`
- Archive completed work to memory files rather than keeping it in active context
- Use `/clear` between unrelated tasks to reclaim context space

## Task Delegation

- Delegate research-heavy tasks to subagents to preserve the main context window
- Use subagents for parallel, independent queries (e.g., searching multiple codebases)
- Avoid duplicating work that a subagent is already handling

## Efficient Tool Usage

- Use `Glob` and `Grep` for targeted searches -- avoid broad directory exploration
- Prefer focused file reads (specific line ranges) over reading entire files
- Batch independent tool calls in parallel to minimize round-trips
- Use dedicated tools (`Read`, `Edit`, `Write`) instead of shell equivalents

## Task Management

- Break large tasks into smaller, independently completable steps
- Structure prompts with clear constraints to reduce wasted generation
- Provide relevant context upfront rather than forcing iterative discovery
- When a task is complete, state the result and stop -- avoid unnecessary elaboration

## Code Generation

- Generate minimal, correct code -- avoid boilerplate and over-abstraction
- Prefer editing existing files over creating new ones to reduce file proliferation
- Make focused, surgical changes rather than rewriting surrounding code
