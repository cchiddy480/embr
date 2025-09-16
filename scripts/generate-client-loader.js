const fs = require('fs');
const path = require('path');

const CLIENTS_ROOT = path.join(__dirname, '..', 'packages', 'hub-app', 'src', 'components', 'clients');
const OUTPUT_FILE = path.join(CLIENTS_ROOT, 'loader.ts');

function getDirectories(srcPath) {
  return fs
    .readdirSync(srcPath, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name);
}

function main() {
  if (!fs.existsSync(CLIENTS_ROOT)) {
    console.error('Clients root not found:', CLIENTS_ROOT);
    process.exit(1);
  }

  const industries = getDirectories(CLIENTS_ROOT).filter(name => name !== 'loader.ts' && name !== 'index.ts');
  const entries = [];

  for (const industry of industries) {
    const industryPath = path.join(CLIENTS_ROOT, industry);
    const clients = getDirectories(industryPath);
    for (const clientId of clients) {
      // Prefer importing the directory index (which re-exports the app)
      const importPath = `./${industry}/${clientId}`;
      entries.push({ clientId, importPath });
    }
  }

  entries.sort((a, b) => a.clientId.localeCompare(b.clientId));

  const header = `// AUTO-GENERATED FILE. Do not edit manually.
// Run: npm run clients:loader
// This map is used to lazy-load client-specific apps on demand.
`;

  const lines = [];
  lines.push(header);
  lines.push('export const CLIENT_PLUGIN_LOADERS: Record<string, () => Promise<any>> = {');
  for (const { clientId, importPath } of entries) {
    lines.push(`  '${clientId}': () => import('${importPath}'),`);
  }
  lines.push('};');
  lines.push('');

  fs.writeFileSync(OUTPUT_FILE, lines.join('\n'));
  console.log(`Generated ${OUTPUT_FILE} with ${entries.length} entries.`);
}

main();


