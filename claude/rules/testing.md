# Testing

TDD patterns and coverage standards.

## Philosophy

- Write tests before or alongside implementation, not after
- Test behavior, not implementation details -- tests should survive refactors
- Each test should answer: "what should happen when X?"

## Test Structure

- Follow Arrange-Act-Assert (or Given-When-Then)
- One assertion per test where practical -- multiple assertions are fine if testing one logical behavior
- Name tests descriptively: `test_<what>_<when>_<expected>`
- Keep tests independent -- no shared mutable state between tests

## Coverage Targets

- Target 80%+ code coverage overall
- 100% coverage for critical paths: auth, payments, data mutations
- Coverage is a floor, not a ceiling -- don't write meaningless tests to hit a number

## What to Test

- Happy path and expected error conditions
- Edge cases: empty inputs, boundary values, null/undefined, large inputs
- Integration tests for API endpoints and database operations
- Contract tests for external service interfaces

## Mocking

- Mock external dependencies (APIs, databases, file systems), not internal logic
- Prefer fakes and stubs over complex mock frameworks when possible
- Verify that mocks match the real interface -- outdated mocks hide bugs

## Organization

- Keep test files colocated with source or in a parallel test directory -- be consistent
- Share test fixtures through explicit helpers, not implicit inheritance
- Tests are production code -- apply the same quality standards
