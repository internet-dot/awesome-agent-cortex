# AGENTS.md -- Agent Orchestration Guide
#
# This guide defines principles and patterns for multi-agent workflows
# in Claude Code. Adapt the agent definitions to your project's needs.

## Core Principles

### Plan Before Execute

Break complex tasks into discrete steps before writing any code. Identify dependencies between steps, surface ambiguities early, and confirm the approach before committing to implementation. A 5-minute plan prevents a 2-hour dead end.

### Test-Driven Development

Write tests first. Define expected behavior before implementation. Tests serve as both specification and verification -- they clarify what "done" means and catch regressions immediately. Run the full test suite before declaring any task complete.

### Security First

Never commit secrets, credentials, API keys, or tokens. Validate all external inputs. Apply the principle of least privilege. Default to secure configurations. When in doubt, restrict access and require explicit opt-in rather than opt-out.

### Immutability and Pure Functions

Prefer pure functions that take inputs and return outputs without side effects. Use immutable data structures where practical. Isolate stateful operations (I/O, database, network) at the boundaries of your system. This makes code easier to test, reason about, and parallelize.

### Agent-First Delegation

Delegate complex, context-heavy, or parallelizable tasks to subagents. The main agent should orchestrate and make decisions; subagents should execute focused work. This preserves the main context window for high-level reasoning.

---

## Agent Orchestration Patterns

### When to Delegate to Subagents

- **Research tasks**: Exploring unfamiliar codebases, reading documentation, investigating dependencies
- **Parallel workstreams**: Independent changes across multiple files or modules
- **Context-heavy analysis**: Tasks that require reading many files but produce a concise result
- **Repetitive operations**: Applying the same transformation across many locations

### How to Compose Agents

Use agents as specialized roles, not general-purpose assistants:

- **Explorer** (subagent_type=Explore): Deep codebase search, dependency tracing, architecture mapping
- **Planner**: Task decomposition, dependency analysis, risk identification
- **Implementer**: Focused code changes scoped to a single concern
- **Reviewer**: Post-implementation quality and correctness checks

### Context Management Across Handoffs

When delegating to subagents or resuming work:

- Pass explicit context: file paths, function names, architectural decisions made so far
- Include the "why" alongside the "what" -- decisions without rationale get revisited unnecessarily
- Summarize key constraints: what has been tried, what failed, what must not change
- Request structured output from subagents (file lists, decision logs) for easy consumption

---

## Agent Definitions

The following four agents are universally applicable across project types. Add project-specific agents as needed.

### 1. Planner

**Role**: Analyze tasks, create implementation plans, identify risks and dependencies.

**When to invoke**: At the start of any non-trivial task, before writing code.

**Responsibilities**:
- Decompose the task into ordered, testable steps
- Identify files that need to change and potential side effects
- Flag ambiguities or missing requirements
- Estimate blast radius of proposed changes
- Produce a clear plan that another agent (or human) can execute

**Output format**: Numbered steps with file paths, rationale for key decisions, and a list of open questions.

### 2. Reviewer

**Role**: Review code changes for correctness, style adherence, and maintainability.

**When to invoke**: After implementation, before committing.

**Responsibilities**:
- Verify changes match the stated intent and do not introduce regressions
- Check adherence to project conventions (naming, structure, patterns)
- Identify missing tests or edge cases
- Flag unnecessary complexity or over-engineering
- Confirm no debug artifacts, commented-out code, or TODO items slipped in

**Output format**: List of findings categorized as blocking (must fix), warning (should fix), or suggestion (consider fixing).

### 3. Security Reviewer

**Role**: Focused security audit of code changes.

**When to invoke**: For any changes involving authentication, authorization, user input handling, data storage, or external service integration.

**Responsibilities**:
- Check for OWASP Top 10 vulnerabilities (injection, XSS, CSRF, etc.)
- Scan for hardcoded secrets, credentials, or API keys
- Verify input validation and output encoding at system boundaries
- Review access control logic for privilege escalation paths
- Check dependency versions for known vulnerabilities
- Confirm sensitive data is not logged or exposed in error messages

**Output format**: Severity-ranked findings (critical, high, medium, low) with specific file locations and remediation guidance.

### 4. Doc Updater

**Role**: Keep documentation in sync with code changes.

**When to invoke**: After any change that affects public APIs, configuration, setup steps, or architectural decisions.

**Responsibilities**:
- Update README, CHANGELOG, and inline documentation to reflect changes
- Ensure code examples in docs actually work
- Update configuration references when defaults or options change
- Add migration notes for breaking changes
- Verify links and cross-references remain valid

**Output format**: List of documentation files updated, with a summary of what changed and why.
