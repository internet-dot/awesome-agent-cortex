# TDD Workflow

Implement a feature using strict Test-Driven Development (Red-Green-Refactor).

## Usage

Invoke with `/tdd-workflow <feature description>` where the argument describes the function, module, or behavior to implement.

## Workflow

When this skill is invoked, follow the Red-Green-Refactor cycle exactly as described below. Do not skip steps or combine phases.

### 0. Parse the Requirement

- Read `$ARGUMENTS` to understand what needs to be implemented
- Identify the project's existing test framework, conventions, and file structure before writing anything
- Determine where the implementation and test files should live based on existing patterns

### 1. Red -- Write Failing Tests First

Before writing any implementation code:

1. Identify test cases covering:
   - **Happy path**: The primary expected behavior
   - **Edge cases**: Empty inputs, boundary values, large inputs, null/undefined
   - **Error conditions**: Invalid inputs, missing required fields, permission failures
2. Write the test file using the project's existing test framework and naming conventions
3. Run the tests and confirm they **fail** (red). Paste the test runner output showing failures.
4. If tests pass without implementation, the tests are not testing the right thing -- rewrite them.

### 2. Green -- Minimal Implementation

1. Write the **minimum code** necessary to make all tests pass
2. Do not optimize, do not add abstractions, do not handle cases not covered by tests
3. Run the tests and confirm they **all pass** (green). Paste the test runner output.
4. If any test fails, fix the implementation (not the test) until green.

### 3. Refactor -- Improve Without Changing Behavior

1. Review the implementation for:
   - Code duplication (DRY)
   - Unclear naming
   - Functions doing too much (extract helpers only if clearly warranted)
   - Performance issues obvious at a glance
2. Make improvements while keeping all tests passing
3. Run the tests again and confirm they **still pass**. Paste the output.

### 4. Summary

Report what was done:

- **Files created/modified**: List each file with its absolute path
- **Tests**: Number of test cases, all passing
- **Implementation**: Brief description of the approach taken
- **Refactoring**: What was improved in the refactor step (or "None needed")
