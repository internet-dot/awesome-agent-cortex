// PostToolUse hook: checks edited files for common issues after writes.
// Outputs warnings to stderr -- does not block anything.

const fs = require("fs");
const path = require("path");

const DEBUG_PATTERNS = [
  { pattern: /console\.log\s*\(\s*["'`](?:debug|test|xxx|TODO)/i, label: "debug console.log" },
  { pattern: /console\.log\s*\(\s*["'`]###/i, label: "debug console.log" },
  { pattern: /print\s*\(\s*["'](?:debug|test|xxx|TODO)/i, label: "debug print" },
  { pattern: /debugger\s*;?\s*$/m, label: "debugger statement" },
];

const TODO_PATTERN = /\b(TODO|FIXME|HACK|XXX)\b/;

const LINTER_SUGGESTIONS = {
  ".js": "eslint / oxlint",
  ".jsx": "eslint / oxlint",
  ".ts": "eslint / oxlint",
  ".tsx": "eslint / oxlint",
  ".py": "ruff check",
  ".rs": "cargo clippy",
  ".go": "go vet",
  ".rb": "rubocop",
};

function readStdin() {
  return new Promise((resolve) => {
    let data = "";
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", (chunk) => (data += chunk));
    process.stdin.on("end", () => resolve(data));
  });
}

function checkFile(filePath) {
  const warnings = [];

  let content;
  try {
    content = fs.readFileSync(filePath, "utf8");
  } catch {
    return warnings;
  }

  const lines = content.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineNum = i + 1;

    for (const { pattern, label } of DEBUG_PATTERNS) {
      if (pattern.test(line)) {
        warnings.push(`${filePath}:${lineNum} -- possible ${label} leftover`);
      }
    }

    if (TODO_PATTERN.test(line)) {
      const match = line.match(TODO_PATTERN);
      warnings.push(`${filePath}:${lineNum} -- ${match[1]} comment found`);
    }
  }

  // Suggest linter based on file extension
  const ext = path.extname(filePath).toLowerCase();
  const linter = LINTER_SUGGESTIONS[ext];
  if (linter) {
    warnings.push(`Consider running ${linter} on ${path.basename(filePath)}`);
  }

  return warnings;
}

async function main() {
  const raw = await readStdin();
  let input;
  try {
    input = JSON.parse(raw);
  } catch {
    return;
  }

  const toolName = input.tool_name || "";
  if (toolName !== "Write" && toolName !== "Edit") return;

  const toolInput = input.tool_input || {};
  const filePath = toolInput.file_path;
  if (!filePath) return;

  const warnings = checkFile(filePath);

  if (warnings.length > 0) {
    process.stderr.write(`[after-edit-lint] Warnings for ${path.basename(filePath)}:\n`);
    for (const warning of warnings) {
      process.stderr.write(`  ${warning}\n`);
    }
  }
}

main();
