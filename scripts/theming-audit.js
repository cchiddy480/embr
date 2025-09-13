/*
  Embr Theming Audit
  - Fails if forbidden color patterns exist in client code
  - Intended scope: client app code (hybrid blocks) and shared CSS

  Forbidden patterns:
  - Hardcoded hex colors (except explicit allowlist)
  - rgba()/rgb() literals
  - Tailwind ring-* usage
  - Legacy --embr-teal variable
  - Teal RGBA literal remnants
*/
const fs = require('fs');
const path = require('path');

const repoRoot = process.cwd();

// Scan targets: client custom code only
// We intentionally exclude the Hub shell and the UI library from this audit.
const targets = [
  path.join(repoRoot, 'packages/hub-app/src/components'),
];

const allowHex = new Set([
  '#fff', '#ffffff', '#FFF', '#FFFFFF',
  '#000', '#000000', '#000000ff',
]);

const forbidden = [
  { name: 'Tailwind ring-*', regex: /\bring-[\w-]+/g },
  { name: 'Legacy --embr-teal variable', regex: /--embr-teal/g },
  { name: 'Teal rgba literal', regex: /rgba\(\s*1?5\s*,\s*11?8\s*,\s*110\s*,?/g },
  { name: 'rgb()/rgba() color literal', regex: /\brgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+(?:\s*,\s*(?:0?\.\d+|1(?:\.0+)?))?\s*\)/g },
];

const hexRegex = /#[0-9a-fA-F]{3,8}\b/g;

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).flatMap((name) => {
    const p = path.join(dir, name);
    const stat = fs.statSync(p);
    if (stat.isDirectory()) return walk(p);
    return [p];
  });
}

function isTextFile(file) {
  return /(\.(ts|tsx|js|jsx|css|md)$)/.test(file);
}

const files = targets.flatMap(walk).filter(isTextFile);

let violations = [];

for (const file of files) {
  // Skip hub baseline specific files from audit
  if (file.includes('packages/hub-app/src/app/')) continue;

  const src = fs.readFileSync(file, 'utf8');

  // Skip hub modal/shell files explicitly (allowed to have brand hex)
  const hubExempt = [
    path.join('packages', 'hub-app', 'src', 'components', 'AccessCodeEntry.tsx'),
    path.join('packages', 'hub-app', 'src', 'components', 'QRCodeScanner.tsx'),
    path.join('packages', 'hub-app', 'src', 'components', 'LoadingScreen.tsx'),
  ];
  if (hubExempt.some((ex) => file.endsWith(ex))) continue;

  // Hex color check
  const hexMatches = src.match(hexRegex) || [];
  const hexOffenders = hexMatches.filter((h) => !allowHex.has(h));
  if (hexOffenders.length) {
    violations.push({ file, rule: 'Hardcoded hex color', detail: [...new Set(hexOffenders)].join(', ') });
  }

  // Other forbidden patterns
  for (const rule of forbidden) {
    const m = src.match(rule.regex);
    if (m && m.length) {
      violations.push({ file, rule: rule.name, detail: [...new Set(m)].slice(0, 5).join(', ') });
    }
  }
}

if (violations.length) {
  console.error('\n[Embr Theming Audit] Violations found:');
  for (const v of violations) {
    console.error(`- ${v.rule} → ${v.file}${v.detail ? ' :: ' + v.detail : ''}`);
  }
  process.exit(1);
} else {
  console.log('[Embr Theming Audit] Passed — no forbidden patterns found.');
}


