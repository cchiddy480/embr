#!/usr/bin/env node

/*
  Embr Client Config Validator (Phase B)
  - For any config with a `blocks` array, validates it against
    TripConfigSchema (scripts/lib/trip-config-schema.js) and prints zod's
    own issue list on failure.
  - For any config WITHOUT a `blocks` array (the old template-based shape:
    wildroots-festival-2025, festival-*-2025, etc.), this is a legacy
    config outside Phase B's scope — it's noted and skipped, not failed.
    Those still render through the legacy renderer chain in ClientApp.tsx
    and aren't part of this rewrite (see the production plan's cleanup
    pass for when they eventually get migrated or deleted).

  Usage:
    node scripts/validate-client-config.js [config-file]
    node scripts/validate-client-config.js --all
*/

const fs = require('fs');
const path = require('path');
const { TripConfigSchema, isTripConfigShape } = require('./lib/trip-config-schema');

function getArg(flag) {
  const idx = process.argv.indexOf(flag);
  if (idx === -1) return undefined;
  return process.argv[idx + 1];
}

function hasFlag(flag) {
  return process.argv.includes(flag);
}

// Returns 'valid' | 'invalid' | 'skipped-legacy'
function validateFile(filePath) {
  console.log(`\n📋 Validating: ${path.basename(filePath)}`);

  let config;
  try {
    config = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (error) {
    console.log(`❌ Error reading file: ${error.message}`);
    return 'invalid';
  }

  if (!isTripConfigShape(config)) {
    console.log('⏭️  Legacy config (no `blocks` array) — outside Phase B schema scope, skipping.');
    return 'skipped-legacy';
  }

  const result = TripConfigSchema.safeParse(config);
  if (result.success) {
    console.log('✅ Valid TripConfig');
    return 'valid';
  }

  console.log('❌ Errors:');
  for (const issue of result.error.issues) {
    console.log(`   • ${issue.path.join('.') || '(root)'}: ${issue.message}`);
  }
  return 'invalid';
}

function validateAll() {
  const configsDir = 'packages/hub-app/public/client-configs';

  if (!fs.existsSync(configsDir)) {
    console.log('❌ Configs directory not found');
    process.exitCode = 1;
    return;
  }

  const files = fs.readdirSync(configsDir).filter((f) => f.endsWith('.json'));

  if (files.length === 0) {
    console.log('📁 No config files found');
    return;
  }

  console.log(`🔍 Validating ${files.length} config file(s)...`);

  const counts = { valid: 0, invalid: 0, 'skipped-legacy': 0 };
  files.forEach((file) => {
    const result = validateFile(path.join(configsDir, file));
    counts[result] += 1;
  });

  console.log(`\n📊 Validation Summary:`);
  console.log(`   ✅ Valid TripConfigs: ${counts.valid}`);
  console.log(`   ❌ Invalid TripConfigs: ${counts.invalid}`);
  console.log(`   ⏭️  Legacy (skipped): ${counts['skipped-legacy']}`);

  if (counts.invalid > 0) {
    console.log('\n🔧 Please fix the errors above before deploying.');
    process.exitCode = 1;
  } else {
    console.log('\n🎉 All TripConfigs are valid.');
  }
}

function main() {
  const help = hasFlag('--help') || hasFlag('-h');
  const all = hasFlag('--all');
  const file = getArg('--file') || (process.argv[2] && !process.argv[2].startsWith('--') ? process.argv[2] : undefined);

  if (help) {
    console.log(`
🔍 Embr Client Config Validator (Phase B)

Usage:
  node scripts/validate-client-config.js [config-file]
  node scripts/validate-client-config.js --all
  node scripts/validate-client-config.js --file [config-file]

Options:
  --file [path]  Validate a specific config file
  --all          Validate all config files (default)
  --help, -h     Show this help
    `);
    return;
  }

  if (file) {
    if (!fs.existsSync(file)) {
      console.log(`❌ File not found: ${file}`);
      process.exit(1);
    }
    const result = validateFile(file);
    if (result === 'invalid') process.exitCode = 1;
  } else {
    validateAll();
  }
}

main();
