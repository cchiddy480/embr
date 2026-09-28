#!/usr/bin/env node

/**
 * Embr Session Initialization Script
 * Automatically detects platform and ensures proper synchronization
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Platform detection
const platform = process.platform;
const isWindows = platform === 'win32';
const isMac = platform === 'darwin';

console.log('🚀 Embr Session Initialization');
console.log('================================');

// Detect platform
console.log(`📱 Platform Detected: ${isWindows ? 'Windows' : isMac ? 'Mac' : 'Unknown'}`);
console.log(`🖥️  OS: ${platform}`);
console.log('');

// Check Git status
console.log('🔄 Checking Git Synchronization...');
try {
  const gitStatus = execSync('git status --porcelain', { encoding: 'utf8' });
  const gitBranch = execSync('git branch --show-current', { encoding: 'utf8' }).trim();
  const gitRemote = execSync('git remote get-url origin', { encoding: 'utf8' }).trim();
  
  console.log(`📋 Current Branch: ${gitBranch}`);
  console.log(`🔗 Remote: ${gitRemote}`);
  
  if (gitStatus.trim()) {
    console.log('⚠️  Uncommitted changes detected:');
    console.log(gitStatus);
    console.log('');
    console.log('💡 Tip: Use `npm run git:commit "message"` to commit changes');
    console.log('💡 Tip: Use `npm run git:finish` to merge feature branch and cleanup');
  } else {
    console.log('✅ No uncommitted changes');
  }
  
  // Check if we're on a feature/session branch
  if (gitBranch.startsWith('feature/') || gitBranch.startsWith('hotfix/') || gitBranch.startsWith('session/')) {
    console.log('');
    console.log('🔧 Development Branch Detected:');
    console.log('   - Use `npm run git:save "message"` to save session progress');
    console.log('   - Use `npm run git:end` to end session (merge & cleanup)');
    console.log('   - Use `npm run git:status` to check current status');
  } else if (gitBranch === 'main') {
    console.log('');
    console.log('🌿 Main Branch Detected:');
    console.log('   - Use `npm run git:session <session-name>` to create new session branch');
    console.log('   - Use `npm run git:start <feature-name>` to create new feature branch');
    console.log('   - Use `npm run git:status` to check current status');
  }
} catch (error) {
  console.log('❌ Git check failed:', error.message);
}

// Check for latest changes
console.log('');
console.log('📥 Checking for Latest Changes...');
try {
  const gitFetch = execSync('git fetch origin', { encoding: 'utf8' });
  const gitLog = execSync('git log HEAD..origin/main --oneline', { encoding: 'utf8' });
  
  if (gitLog.trim()) {
    console.log('⚠️  New changes available from remote:');
    console.log(gitLog);
    console.log('');
    console.log('🔄 Pulling latest changes...');
    const gitPull = execSync('git pull origin main', { encoding: 'utf8' });
    console.log('✅ Latest changes pulled successfully');
  } else {
    console.log('✅ Repository is up to date');
  }
} catch (error) {
  console.log('❌ Git pull failed:', error.message);
}

// Check Node.js version
console.log('');
console.log('📦 Checking Node.js Environment...');
try {
  const nodeVersion = execSync('node --version', { encoding: 'utf8' }).trim();
  const npmVersion = execSync('npm --version', { encoding: 'utf8' }).trim();
  
  console.log(`🟢 Node.js: ${nodeVersion}`);
  console.log(`🟢 npm: ${npmVersion}`);
  
  // Check if package-lock.json exists
  if (fs.existsSync('package-lock.json')) {
    console.log('✅ package-lock.json found');
  } else {
    console.log('⚠️  package-lock.json not found');
  }
} catch (error) {
  console.log('❌ Node.js check failed:', error.message);
}

// Install/update dependencies
console.log('');
console.log('📦 Installing Dependencies...');
try {
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ Dependencies installed successfully');
} catch (error) {
  console.log('❌ Dependency installation failed:', error.message);
}

// Run quality checks
console.log('');
console.log('🔍 Running Quality Checks...');
try {
  console.log('Running isolation check...');
  execSync('npm run check:isolation', { stdio: 'inherit' });
  console.log('✅ Isolation check passed');
} catch (error) {
  console.log('❌ Isolation check failed:', error.message);
}

try {
  console.log('Running theme audit...');
  execSync('npm run audit:theme', { stdio: 'inherit' });
  console.log('✅ Theme audit passed');
} catch (error) {
  console.log('❌ Theme audit failed:', error.message);
}

// Update development log
console.log('');
console.log('📝 Updating Development Log...');
try {
  execSync('npm run devlog:update', { stdio: 'inherit' });
  console.log('✅ Development log updated');
} catch (error) {
  console.log('❌ Development log update failed:', error.message);
}

// Session summary
console.log('');
console.log('🎯 Session Initialization Complete!');
console.log('====================================');
console.log(`Platform: ${isWindows ? 'Windows' : isMac ? 'Mac' : 'Unknown'}`);
console.log('Status: Ready for development');
console.log('');
console.log('🚀 Next Steps:');
console.log('1. Run `npm run dev` to start development server');
console.log('2. Test your changes on this platform');
console.log('3. Commit and push changes when ready');
console.log('4. Switch to other machine and repeat sync process');
console.log('');
console.log('📚 Available Commands:');
console.log('- `npm run dev` - Start development server');
console.log('- `npm run check:isolation` - Check demo/client isolation');
console.log('- `npm run audit:theme` - Audit theme compliance');
console.log('- `npm run devlog:update` - Update development log');
console.log('- `npm run devlog:append -- "message"` - Add log entry');
console.log('');
console.log('🌿 Git Workflow Commands:');
console.log('Session-Based Workflow:');
console.log('- `npm run git:session <session-name>` - Create new session branch');
console.log('- `npm run git:save "message"` - Save session progress');
console.log('- `npm run git:end` - End session (merge & cleanup)');
console.log('');
console.log('Feature-Based Workflow:');
console.log('- `npm run git:start <feature-name>` - Create new feature branch');
console.log('- `npm run git:commit "message"` - Commit and push changes');
console.log('- `npm run git:finish` - Merge to main and cleanup');
console.log('');
console.log('Utility Commands:');
console.log('- `npm run git:status` - Show current branch status');
console.log('- `npm run git:cleanup <branch-name>` - Cleanup specific branch');
