#!/usr/bin/env node

/*
  Embr Client Config Validator
  - Validates client configuration files
  - Checks for required fields and proper formatting
  - Provides helpful error messages and suggestions
  
  Usage:
    node scripts/validate-client-config.js [config-file]
    node scripts/validate-client-config.js --all
*/

const fs = require('fs');
const path = require('path');

function getArg(flag) {
  const idx = process.argv.indexOf(flag);
  if (idx === -1) return undefined;
  return process.argv[idx + 1];
}

function hasFlag(flag) {
  return process.argv.includes(flag);
}

const REQUIRED_FIELDS = [
  'clientId',
  'accessCode', 
  'name',
  'description',
  'version',
  'expiry',
  'theme',
  'navigation',
  'features',
  'content'
];

const REQUIRED_THEME_FIELDS = [
  'colors',
  'typography'
];

const REQUIRED_COLOR_FIELDS = [
  'primary',
  'secondary',
  'background',
  'surface',
  'text'
];

const REQUIRED_FEATURES_FIELDS = [
  'qrCode',
  'pushNotifications',
  'offlineMode',
  'analytics'
];

function validateConfig(config, filePath) {
  const errors = [];
  const warnings = [];
  
  // Check required fields
  REQUIRED_FIELDS.forEach(field => {
    if (!config[field]) {
      errors.push(`Missing required field: ${field}`);
    }
  });
  
  // Validate clientId format
  if (config.clientId) {
    if (!/^[a-z0-9-]+$/.test(config.clientId)) {
      errors.push('clientId must contain only lowercase letters, numbers, and hyphens');
    }
    if (!config.clientId.endsWith('-2025')) {
      warnings.push('clientId should end with "-2025" for consistency');
    }
  }
  
  // Validate accessCode format
  if (config.accessCode) {
    if (!/^[A-Z0-9]+$/.test(config.accessCode)) {
      errors.push('accessCode must contain only uppercase letters and numbers');
    }
    if (config.accessCode.length < 6) {
      warnings.push('accessCode should be at least 6 characters for security');
    }
  }
  
  // Validate theme
  if (config.theme) {
    REQUIRED_THEME_FIELDS.forEach(field => {
      if (!config.theme[field]) {
        errors.push(`Missing required theme field: ${field}`);
      }
    });
    
    // Validate colors
    if (config.theme.colors) {
      REQUIRED_COLOR_FIELDS.forEach(field => {
        if (!config.theme.colors[field]) {
          errors.push(`Missing required color: ${field}`);
        } else if (!/^#[0-9A-Fa-f]{6}$/.test(config.theme.colors[field])) {
          errors.push(`Invalid color format for ${field}: must be hex color (e.g., #FF0000)`);
        }
      });
    }
  }
  
  // Validate features
  if (config.features) {
    REQUIRED_FEATURES_FIELDS.forEach(field => {
      if (typeof config.features[field] !== 'boolean') {
        errors.push(`Feature ${field} must be a boolean value`);
      }
    });
  }
  
  // Validate navigation
  if (config.navigation && Array.isArray(config.navigation)) {
    config.navigation.forEach((item, index) => {
      if (!item.id || !item.label || !item.path) {
        errors.push(`Navigation item ${index} is missing required fields (id, label, path)`);
      }
    });
  } else if (config.navigation) {
    errors.push('Navigation must be an array');
  }
  
  // Validate expiry date
  if (config.expiry) {
    const expiryDate = new Date(config.expiry);
    if (isNaN(expiryDate.getTime())) {
      errors.push('Invalid expiry date format');
    } else if (expiryDate < new Date()) {
      warnings.push('Expiry date is in the past');
    }
  }
  
  // Check for common issues
  if (config.name && config.name.length > 50) {
    warnings.push('Client name is quite long, consider shortening for mobile display');
  }
  
  if (config.description && config.description.length > 200) {
    warnings.push('Description is quite long, consider shortening for better UX');
  }
  
  return { errors, warnings };
}

function validateFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const config = JSON.parse(content);
    
    const { errors, warnings } = validateConfig(config, filePath);
    
    console.log(`\n📋 Validating: ${path.basename(filePath)}`);
    
    if (errors.length === 0 && warnings.length === 0) {
      console.log('✅ Valid configuration');
      return true;
    }
    
    if (errors.length > 0) {
      console.log('❌ Errors:');
      errors.forEach(error => console.log(`   • ${error}`));
    }
    
    if (warnings.length > 0) {
      console.log('⚠️  Warnings:');
      warnings.forEach(warning => console.log(`   • ${warning}`));
    }
    
    return errors.length === 0;
    
  } catch (error) {
    console.log(`❌ Error reading ${filePath}: ${error.message}`);
    return false;
  }
}

function validateAll() {
  const configsDir = 'packages/hub-app/public/client-configs';
  
  if (!fs.existsSync(configsDir)) {
    console.log('❌ Configs directory not found');
    return;
  }
  
  const files = fs.readdirSync(configsDir).filter(f => f.endsWith('.json'));
  
  if (files.length === 0) {
    console.log('📁 No config files found');
    return;
  }
  
  console.log(`🔍 Validating ${files.length} config file(s)...`);
  
  let validCount = 0;
  let totalCount = files.length;
  
  files.forEach(file => {
    const filePath = path.join(configsDir, file);
    if (validateFile(filePath)) {
      validCount++;
    }
  });
  
  console.log(`\n📊 Validation Summary:`);
  console.log(`   ✅ Valid: ${validCount}`);
  console.log(`   ❌ Invalid: ${totalCount - validCount}`);
  console.log(`   📁 Total: ${totalCount}`);
  
  if (validCount === totalCount) {
    console.log('\n🎉 All configurations are valid!');
  } else {
    console.log('\n🔧 Please fix the errors above before deploying.');
  }
}

function main() {
  const help = hasFlag('--help') || hasFlag('-h');
  const all = hasFlag('--all');
  const file = getArg('--file');
  
  if (help) {
    console.log(`
🔍 Embr Client Config Validator

Usage:
  node scripts/validate-client-config.js [config-file]
  node scripts/validate-client-config.js --all
  node scripts/validate-client-config.js --file [config-file]

Options:
  --file [path]  Validate specific config file
  --all          Validate all config files
  --help, -h     Show this help

Examples:
  node scripts/validate-client-config.js packages/hub-app/public/client-configs/my-client.json
  node scripts/validate-client-config.js --all
    `);
    return;
  }
  
  if (all) {
    validateAll();
  } else if (file) {
    if (!fs.existsSync(file)) {
      console.log(`❌ File not found: ${file}`);
      process.exit(1);
    }
    validateFile(file);
  } else {
    // Default: validate all
    validateAll();
  }
}

main();
