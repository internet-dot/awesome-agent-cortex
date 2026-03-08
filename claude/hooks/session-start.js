// Notification hook: detects project environment at session start.
// Outputs an informational summary to stderr -- does not block anything.

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

function readStdin() {
  return new Promise((resolve) => {
    let data = "";
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", (chunk) => (data += chunk));
    process.stdin.on("end", () => resolve(data));
  });
}

function fileExists(filePath) {
  try {
    fs.accessSync(filePath);
    return true;
  } catch {
    return false;
  }
}

function dirExists(dirPath) {
  try {
    return fs.statSync(dirPath).isDirectory();
  } catch {
    return false;
  }
}

function getGitBranch() {
  try {
    return execFileSync("git", ["rev-parse", "--abbrev-ref", "HEAD"], {
      encoding: "utf8",
      stdio: ["pipe", "pipe", "pipe"],
    }).trim();
  } catch {
    return null;
  }
}

function detectEnvironment(cwd) {
  const info = [];

  // Language/runtime detection
  const projectFiles = [
    { file: "package.json", label: "Node.js (package.json)" },
    { file: "requirements.txt", label: "Python (requirements.txt)" },
    { file: "pyproject.toml", label: "Python (pyproject.toml)" },
    { file: "Cargo.toml", label: "Rust (Cargo.toml)" },
    { file: "go.mod", label: "Go (go.mod)" },
  ];

  for (const { file, label } of projectFiles) {
    if (fileExists(path.join(cwd, file))) {
      info.push(`Project type: ${label}`);
    }
  }

  // Config files
  const configs = [];
  const configPatterns = [
    { glob: ".eslintrc", label: "ESLint" },
    { glob: "eslint.config", label: "ESLint" },
    { glob: ".prettierrc", label: "Prettier" },
    { glob: "prettier.config", label: "Prettier" },
    { glob: "tsconfig.json", label: "TypeScript" },
    { glob: ".editorconfig", label: "EditorConfig" },
  ];

  for (const { glob, label } of configPatterns) {
    const extensions = ["", ".js", ".cjs", ".mjs", ".json", ".yml", ".yaml"];
    for (const ext of extensions) {
      if (fileExists(path.join(cwd, glob + ext))) {
        if (!configs.includes(label)) configs.push(label);
        break;
      }
    }
  }

  if (configs.length > 0) {
    info.push(`Config: ${configs.join(", ")}`);
  }

  // .env.example reminder
  if (fileExists(path.join(cwd, ".env.example"))) {
    if (!fileExists(path.join(cwd, ".env"))) {
      info.push("Note: .env.example found but no .env -- consider copying it");
    }
  }

  // CI detection
  const ciSystems = [];
  if (dirExists(path.join(cwd, ".github", "workflows"))) {
    ciSystems.push("GitHub Actions");
  }
  if (fileExists(path.join(cwd, ".gitlab-ci.yml"))) {
    ciSystems.push("GitLab CI");
  }
  if (ciSystems.length > 0) {
    info.push(`CI: ${ciSystems.join(", ")}`);
  }

  // Git branch
  const branch = getGitBranch();
  if (branch) {
    info.push(`Git branch: ${branch}`);
  }

  return info;
}

async function main() {
  await readStdin(); // consume stdin even though we don't need it

  const cwd = process.cwd();
  const info = detectEnvironment(cwd);

  if (info.length > 0) {
    process.stderr.write(`[session-start] Environment detected:\n`);
    for (const line of info) {
      process.stderr.write(`  ${line}\n`);
    }
  }
}

main();
