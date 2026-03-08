// PreToolUse hook: scans file content for leaked secrets before writes.
// Blocks the tool call if a potential secret is detected.

const SECRET_PATTERNS = [
  { name: "AWS Access Key", pattern: /AKIA[0-9A-Z]{16}/ },
  { name: "GitHub Personal Access Token", pattern: /ghp_[a-zA-Z0-9]{36}/ },
  { name: "GitHub OAuth Token", pattern: /gho_[a-zA-Z0-9]{36}/ },
  { name: "GitHub Server Token", pattern: /ghs_[a-zA-Z0-9]{36}/ },
  { name: "GitHub Fine-Grained PAT", pattern: /github_pat_[a-zA-Z0-9_]{20,}/ },
  { name: "Secret Key (sk-)", pattern: /sk-[a-zA-Z0-9]{20,}/ },
  { name: "Stripe Live Key", pattern: /sk_live_[a-zA-Z0-9]{20,}/ },
  { name: "Stripe Test Key", pattern: /sk_test_[a-zA-Z0-9]{20,}/ },
  { name: "RSA Private Key", pattern: /-----BEGIN RSA PRIVATE KEY-----/ },
  { name: "EC Private Key", pattern: /-----BEGIN EC PRIVATE KEY-----/ },
  { name: "OpenSSH Private Key", pattern: /-----BEGIN OPENSSH PRIVATE KEY-----/ },
  { name: "Generic Private Key", pattern: /-----BEGIN PRIVATE KEY-----/ },
  {
    name: "Hardcoded Secret Assignment",
    pattern: /(?:secret|password|passwd|token|api_key|apikey|api_secret|access_token|auth_token|credentials)\s*[:=]\s*["'][a-zA-Z0-9+/=_\-]{16,}["']/i,
  },
];

function readStdin() {
  return new Promise((resolve) => {
    let data = "";
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", (chunk) => (data += chunk));
    process.stdin.on("end", () => resolve(data));
  });
}

function scanContent(content) {
  const findings = [];
  for (const { name, pattern } of SECRET_PATTERNS) {
    if (pattern.test(content)) {
      findings.push(name);
    }
  }
  return findings;
}

async function main() {
  const raw = await readStdin();
  let input;
  try {
    input = JSON.parse(raw);
  } catch {
    return;
  }

  const toolInput = input.tool_input || {};
  // Write tool uses "content", Edit tool uses "new_string"
  const content = toolInput.content || toolInput.new_string || "";

  if (!content) return;

  const findings = scanContent(content);

  if (findings.length > 0) {
    const result = {
      decision: "block",
      reason: `Potential secret detected: ${findings.join(", ")}`,
    };
    process.stdout.write(JSON.stringify(result));
  }
}

main();
