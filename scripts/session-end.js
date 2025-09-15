#!/usr/bin/env node

/**
 * Embr Session End Script
 * Automatically handles session cleanup, documentation updates, and Git operations
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const MAIN_BRANCH = 'main';
const FEATURE_PREFIX = 'feature/';
const SESSION_PREFIX = 'session/';

function execCommand(command, options = {}) {
  try {
    return execSync(command, { encoding: 'utf8', ...options });
  } catch (error) {
    console.log(`⚠️  Command failed: ${command}`);
    console.log(`   Error: ${error.message}`);
    return null;
  }
}

function getCurrentBranch() {
  try {
    return execSync('git branch --show-current', { encoding: 'utf8' }).trim();
  } catch (error) {
    return null;
  }
}

function getGitStatus() {
  try {
    return execSync('git status --porcelain', { encoding: 'utf8' });
  } catch (error) {
    return '';
  }
}

function hasUncommittedChanges() {
  return getGitStatus().trim().length > 0;
}

function runQualityChecks() {
  console.log('🔍 Running Quality Checks...');
  
  // Check isolation
  console.log('   📋 Checking demo/client isolation...');
  const isolationResult = execCommand('npm run check:isolation');
  if (isolationResult) {
    console.log('   ✅ Isolation check completed');
  }
  
  // Theme audit
  console.log('   🎨 Running theme audit...');
  const themeResult = execCommand('npm run audit:theme');
  if (themeResult) {
    console.log('   ✅ Theme audit completed');
  }
}

function updateDocumentation() {
  console.log('📚 Updating Documentation...');
  
  // Update development log
  console.log('   📝 Updating development log...');
  const logResult = execCommand('npm run devlog:update');
  if (logResult) {
    console.log('   ✅ Development log updated');
  }
  
  // Add session end entry
  const endMessage = `Session ended - ${new Date().toLocaleString()}`;
  const appendResult = execCommand(`npm run devlog:append -- "${endMessage}"`);
  if (appendResult) {
    console.log('   ✅ Session end logged');
  }
}

function handleGitOperations() {
  const currentBranch = getCurrentBranch();
  const hasChanges = hasUncommittedChanges();
  
  console.log('🌿 Git Operations...');
  console.log(`   📋 Current Branch: ${currentBranch}`);
  console.log(`   📝 Uncommitted Changes: ${hasChanges ? 'Yes' : 'No'}`);
  
  if (!hasChanges) {
    console.log('   ✅ No changes to commit');
    return;
  }
  
  // If on main branch with changes
  if (currentBranch === MAIN_BRANCH && hasChanges) {
    console.log('   ⚠️  Changes detected on main branch');
    console.log('   💡 Tip: Consider creating a feature branch first');
    console.log('   💡 Use: npm run git:start <feature-name>');
    return;
  }
  
  // If on feature/session branch with changes
  if (currentBranch && (currentBranch.startsWith(FEATURE_PREFIX) || currentBranch.startsWith(SESSION_PREFIX)) && hasChanges) {
    console.log('   🔧 Development branch with uncommitted changes detected');
    if (currentBranch.startsWith(SESSION_PREFIX)) {
      console.log('   💡 Use: npm run git:save "descriptive message"');
      console.log('   💡 Then: npm run git:end (when ready to merge)');
    } else {
      console.log('   💡 Use: npm run git:commit "descriptive message"');
      console.log('   💡 Then: npm run git:finish (when ready to merge)');
    }
    return;
  }
  
  console.log('   ✅ Git status is clean');
}

function displaySessionSummary() {
  console.log('');
  console.log('📊 Session End Summary:');
  console.log('   ✅ Quality checks completed');
  console.log('   ✅ Documentation updated');
  console.log('   ✅ Git status checked');
  console.log('');
  console.log('🎯 Next Steps:');
  
  const currentBranch = getCurrentBranch();
  const hasChanges = hasUncommittedChanges();
  
  if (hasChanges) {
    if (currentBranch === MAIN_BRANCH) {
      console.log('   1. Create session branch: npm run git:session <session-name>');
      console.log('   2. Save progress: npm run git:save "message"');
    } else if (currentBranch && currentBranch.startsWith(SESSION_PREFIX)) {
      console.log('   1. Save progress: npm run git:save "message"');
      console.log('   2. End session: npm run git:end (when ready)');
    } else if (currentBranch && currentBranch.startsWith(FEATURE_PREFIX)) {
      console.log('   1. Commit changes: npm run git:commit "message"');
      console.log('   2. Finish feature: npm run git:finish (when ready)');
    }
  } else {
    console.log('   🎉 Ready for next session!');
    console.log('   💡 Next session: npm run session:init');
  }
  
  console.log('');
  console.log('📚 Available Commands:');
  console.log('Session-Based Workflow:');
  console.log('   npm run git:session <name>  - Create new session branch');
  console.log('   npm run git:save "msg"      - Save session progress');
  console.log('   npm run git:end             - End session (merge & cleanup)');
  console.log('');
  console.log('Feature-Based Workflow:');
  console.log('   npm run git:start <name>    - Create new feature branch');
  console.log('   npm run git:commit "msg"    - Commit and push changes');
  console.log('   npm run git:finish          - Merge to main and cleanup');
  console.log('');
  console.log('Utility Commands:');
  console.log('   npm run git:status          - Show current branch status');
  console.log('   npm run session:init        - Initialize next session');
}

function main() {
  console.log('🏁 Embr Session End - Automated Cleanup');
  console.log('=====================================');
  console.log('');
  
  // Run quality checks
  runQualityChecks();
  console.log('');
  
  // Update documentation
  updateDocumentation();
  console.log('');
  
  // Handle Git operations
  handleGitOperations();
  console.log('');
  
  // Display summary
  displaySessionSummary();
  
  console.log('✅ Session end process completed!');
  console.log('🚀 Ready for next development session!');
}

// CLI Interface
const command = process.argv[2];

switch (command) {
  case '--help':
  case '-h':
    console.log('🏁 Embr Session End Script');
    console.log('');
    console.log('Usage:');
    console.log('  npm run session:end          - Run full session end process');
    console.log('  npm run session:end --help   - Show this help');
    console.log('');
    console.log('What it does:');
    console.log('  - Runs quality checks (isolation, theme audit)');
    console.log('  - Updates development documentation');
    console.log('  - Checks Git status and provides guidance');
    console.log('  - Displays next steps for development');
    break;
    
  default:
    main();
    break;
}
