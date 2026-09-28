#!/usr/bin/env node

/*
  Embr Client Config Validator
  Validates a guide config against TripConfigSchema
  (scripts/lib/trip-config-schema.js) and prints zod's own issue list on
  failure. Every guide config is a TripConfig — there is no other shape.

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

// Returns 'valid' | 'invalid'
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
    console.log('❌ Not a TripConfig — missing a `blocks` array. Every guide config is a TripConfig.');
    return 'invalid';
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
    // Not an error: git doesn't track empty directories, so a fresh clone
    // with no guides authored yet simply won't have this folder.
    console.log('📁 No config files found (configs directory does not exist yet)');
    return;
  }

  const files = fs.readdirSync(configsDir).filter((f) => f.endsWith('.json'));

  if (files.length === 0) {
    console.log('📁 No config files found');
    return;
  }

  console.log(`🔍 Validating ${files.length} config file(s)...`);

  const counts = { valid: 0, invalid: 0 };
  files.forEach((file) => {
    const result = validateFile(path.join(configsDir, file));
    counts[result] += 1;
  });

  console.log(`\n📊 Validation Summary:`);
  console.log(`   ✅ Valid TripConfigs: ${counts.valid}`);
  console.log(`   ❌ Invalid TripConfigs: ${counts.invalid}`);

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
🔍 Embr Client Config Validator

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
