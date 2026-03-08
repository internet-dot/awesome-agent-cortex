# Claude Code Hooks

Hooks are event-driven shell commands that run automatically during Claude Code sessions. They let you enforce guardrails, gather context, and react to agent actions without manual intervention.

## Hook Lifecycle Events

| Event | When it runs | Can block? |
|-------|-------------|------------|
| `PreToolUse` | Before a tool call executes | Yes |
| `PostToolUse` | After a tool call completes | No |
| `Notification` | When Claude sends a notification | No |
| `Stop` | When the agent turn ends | Yes |
| `SubagentStop` | When a subagent turn ends | Yes |

## How to Install

Add hook configurations to `.claude/settings.json` under the `hooks` key. Each event type maps to an array of hook groups, where each group has a `matcher` (regex matched against tool names) and a list of commands to run.

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "node .claude/hooks/secret-scanner.js"
          }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "node .claude/hooks/after-edit-lint.js"
          }
        ]
      }
    ],
    "Notification": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "node .claude/hooks/session-start.js"
          }
        ]
      }
    ]
  }
}
```

## Hook Input

Hooks receive a JSON object on **stdin** containing context about the event:

```json
{
  "session_id": "abc-123",
  "tool_name": "Write",
  "tool_input": {
    "file_path": "/path/to/file.js",
    "content": "file content here..."
  }
}
```

The exact fields vary by event type and tool, but `session_id` and `tool_name` are always present for tool-related events.

## Hook Output

- **PreToolUse** hooks can print JSON to stdout to block or approve a tool call:
  ```json
  {"decision": "block", "reason": "Potential secret detected in file content"}
  ```
  ```json
  {"decision": "approve", "reason": "Content looks safe"}
  ```
  If a PreToolUse hook exits with code 0 and produces no stdout, the tool call proceeds normally.

- **PostToolUse / Notification** hooks typically write informational output to **stderr**. Their stdout is not used for decisions.

- A non-zero exit code from any hook is treated as an error and reported to the user.

## Hooks in This Directory

| File | Event | Purpose |
|------|-------|---------|
| `secret-scanner.js` | PreToolUse | Blocks file writes that contain leaked secrets |
| `session-start.js` | Notification | Detects project environment and logs context |
| `after-edit-lint.js` | PostToolUse | Warns about debug statements and TODO comments after edits |

## Official Documentation

Full details on the hooks system: https://docs.anthropic.com/en/docs/claude-code/hooks
