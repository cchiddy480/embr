#!/usr/bin/env node

/**
 * Demo Isolation Checker
 * Ensures demo pages and client configs remain completely isolated
 */

const fs = require('fs');
const path = require('path');

const DEMO_PATHS = [
  'packages/hub-app/src/app/embrkit-demo',
  'packages/hub-app/src/app/embrkit-components-demo', 
  'packages/hub-app/src/app/embrkit-themes-demo'
];

const CLIENT_CONFIG_PATHS = [
  'packages/hub-app/src/hooks/useClientConfig.tsx',
  'packages/hub-app/src/components/ClientApp.tsx',
  'packages/hub-app/src/types/client.ts',
  'packages/hub-app/src/app/page.tsx'
];

const FORBIDDEN_IMPORTS = {
  demos: [
    'useClientConfig',
    'ClientApp',
    'ClientConfig',
    '../hooks/useClientConfig',
    '../components/ClientApp',
    '../types/client'
  ],
  clientConfigs: [
    'embrkit-demo',
    'embrkit-components-demo', 
    'embrkit-themes-demo'
  ]
};

function readFileContent(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    return null;
  }
}

function checkFileForViolations(filePath, content, type) {
  const violations = [];
  const forbiddenImports = FORBIDDEN_IMPORTS[type] || [];
  
  forbiddenImports.forEach(forbidden => {
    if (content.includes(forbidden)) {
      violations.push({
        file: filePath,
        type: 'forbidden_import',
        message: `Found forbidden import: ${forbidden}`,
        line: content.split('\n').findIndex(line => line.includes(forbidden)) + 1
      });
    }
  });
  
  // Check for global CSS variables in demo files
  if (type === 'demos') {
    const globalCssVars = content.match(/var\(--embr-[^)]+\)/g);
    if (globalCssVars && globalCssVars.length > 0) {
      const hasInlineStyles = content.includes('dangerouslySetInnerHTML={{ __html: demoStyles }}');
      if (!hasInlineStyles) {
        violations.push({
          file: filePath,
          type: 'global_css_vars',
          message: `Demo page uses global CSS variables without inline override: ${globalCssVars.join(', ')}`,
          line: 'unknown'
        });
      }
    }
  }
  
  return violations;
}

function checkDirectory(dirPath, type) {
  const violations = [];
  
  if (!fs.existsSync(dirPath)) {
    return violations;
  }
  
  const files = fs.readdirSync(dirPath, { withFileTypes: true });
  
  files.forEach(file => {
    const fullPath = path.join(dirPath, file.name);
    
    if (file.isDirectory()) {
      violations.push(...checkDirectory(fullPath, type));
    } else if (file.name.endsWith('.tsx') || file.name.endsWith('.ts')) {
      const content = readFileContent(fullPath);
      if (content) {
        violations.push(...checkFileForViolations(fullPath, content, type));
      }
    }
  });
  
  return violations;
}

function main() {
  console.log('🛡️  Checking Demo-Client Config Isolation...\n');
  
  let allViolations = [];
  
  // Check demo pages
  console.log('📋 Checking Demo Pages...');
  DEMO_PATHS.forEach(demoPath => {
    const violations = checkDirectory(demoPath, 'demos');
    allViolations.push(...violations);
    
    if (violations.length === 0) {
      console.log(`  ✅ ${demoPath} - No violations`);
    } else {
      console.log(`  ❌ ${demoPath} - ${violations.length} violations`);
    }
  });
  
  // Check client config files
  console.log('\n🔧 Checking Client Config Files...');
  CLIENT_CONFIG_PATHS.forEach(configPath => {
    const content = readFileContent(configPath);
    if (content) {
      const violations = checkFileForViolations(configPath, content, 'clientConfigs');
      allViolations.push(...violations);
      
      if (violations.length === 0) {
        console.log(`  ✅ ${configPath} - No violations`);
      } else {
        console.log(`  ❌ ${configPath} - ${violations.length} violations`);
      }
    }
  });
  
  // Report results
  console.log('\n📊 Isolation Check Results:');
  
  if (allViolations.length === 0) {
    console.log('✅ All checks passed! Demo pages and client configs are properly isolated.');
    process.exit(0);
  } else {
    console.log(`❌ Found ${allViolations.length} isolation violations:\n`);
    
    allViolations.forEach((violation, index) => {
      console.log(`${index + 1}. ${violation.file}`);
      console.log(`   Type: ${violation.type}`);
      console.log(`   Issue: ${violation.message}`);
      if (violation.line !== 'unknown') {
        console.log(`   Line: ${violation.line}`);
      }
      console.log('');
    });
    
    console.log('🚨 Isolation broken! Demo pages and client configs are coupled.');
    console.log('\n📖 See packages/hub-app/src/app/demo-isolation-guard.md for fixes.');
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { checkDirectory, checkFileForViolations };
