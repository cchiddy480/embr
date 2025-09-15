#!/usr/bin/env node

/**
 * Embr Git Workflow Manager
 * Automated branch management, commit, push, and cleanup
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const MAIN_BRANCH = 'main';
const FEATURE_PREFIX = 'feature/';
const HOTFIX_PREFIX = 'hotfix/';
const SESSION_PREFIX = 'session/';

// Get current date for branch naming
const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

function execCommand(command, options = {}) {
  try {
    return execSync(command, { encoding: 'utf8', ...options });
  } catch (error) {
    throw new Error(`Command failed: ${command}\nError: ${error.message}`);
  }
}

function getCurrentBranch() {
  return execCommand('git branch --show-current').trim();
}

function getGitStatus() {
  return execCommand('git status --porcelain');
}

function hasUncommittedChanges() {
  return getGitStatus().trim().length > 0;
}

function createFeatureBranch(featureName) {
  const branchName = `${FEATURE_PREFIX}${featureName}-${today}`;
  
  console.log(`🌿 Creating feature branch: ${branchName}`);
  
  // Ensure we're on main and up to date
  console.log('📋 Switching to main branch...');
  execCommand('git checkout main');
  
  console.log('📥 Pulling latest changes...');
  execCommand('git pull origin main');
  
  // Create and switch to new branch
  console.log(`🔨 Creating branch: ${branchName}`);
  execCommand(`git checkout -b ${branchName}`);
  
  console.log(`✅ Successfully created and switched to: ${branchName}`);
  return branchName;
}

function createSessionBranch(sessionName) {
  const branchName = `${SESSION_PREFIX}${sessionName}-${today}`;
  
  console.log(`🎯 Creating session branch: ${branchName}`);
  
  // Ensure we're on main and up to date
  console.log('📋 Switching to main branch...');
  execCommand('git checkout main');
  
  console.log('📥 Pulling latest changes...');
  execCommand('git pull origin main');
  
  // Create and switch to new branch
  console.log(`🔨 Creating branch: ${branchName}`);
  execCommand(`git checkout -b ${branchName}`);
  
  console.log(`✅ Successfully created and switched to: ${branchName}`);
  return branchName;
}

function endSessionAndCleanup(branchName = null) {
  const currentBranch = branchName || getCurrentBranch();
  
  if (!currentBranch.startsWith(SESSION_PREFIX) && !currentBranch.startsWith(FEATURE_PREFIX) && !currentBranch.startsWith(HOTFIX_PREFIX)) {
    throw new Error('Can only end sessions for session, feature, or hotfix branches');
  }
  
  console.log(`🏁 Ending session: ${currentBranch}`);
  
  // Check if there are uncommitted changes
  if (hasUncommittedChanges()) {
    console.log('⚠️  Warning: You have uncommitted changes. Please commit them first.');
    console.log('   Use: npm run git:commit "your message"');
    console.log('   Or: npm run git:save "your message" to commit and continue');
    return false;
  }
  
  // Switch to main
  console.log('📋 Switching to main branch...');
  execCommand('git checkout main');
  
  // Pull latest changes
  console.log('📥 Pulling latest changes...');
  execCommand('git pull origin main');
  
  // Merge the session/feature branch
  console.log(`🔄 Merging ${currentBranch} to main...`);
  execCommand(`git merge ${currentBranch} --no-ff -m "Merge ${currentBranch} into main"`);
  
  // Push to main
  console.log('🚀 Pushing to main...');
  execCommand('git push origin main');
  
  // Delete local branch
  console.log(`🗑️  Deleting local branch: ${currentBranch}`);
  execCommand(`git branch -d ${currentBranch}`);
  
  // Delete remote branch
  console.log(`🗑️  Deleting remote branch: ${currentBranch}`);
  execCommand(`git push origin --delete ${currentBranch}`);
  
  console.log(`✅ Session ended successfully! ${currentBranch} merged to main and cleaned up`);
  return true;
}

function saveSessionProgress(message, branchName = null) {
  const currentBranch = branchName || getCurrentBranch();
  
  console.log(`💾 Saving session progress on branch: ${currentBranch}`);
  
  if (!hasUncommittedChanges()) {
    console.log('ℹ️  No changes to save');
    return;
  }
  
  // Stage all changes
  console.log('📦 Staging changes...');
  execCommand('git add .');
  
  // Commit with message
  console.log(`💾 Committing: ${message}`);
  execCommand(`git commit -m "${message}"`);
  
  // Push to remote
  console.log(`🚀 Pushing to remote: ${currentBranch}`);
  execCommand(`git push origin ${currentBranch}`);
  
  console.log('✅ Session progress saved successfully');
}

function commitAndPush(message, branchName = null) {
  const currentBranch = branchName || getCurrentBranch();
  
  console.log(`📝 Committing changes on branch: ${currentBranch}`);
  
  if (!hasUncommittedChanges()) {
    console.log('ℹ️  No changes to commit');
    return;
  }
  
  // Stage all changes
  console.log('📦 Staging changes...');
  execCommand('git add .');
  
  // Commit with message
  console.log(`💾 Committing: ${message}`);
  execCommand(`git commit -m "${message}"`);
  
  // Push to remote
  console.log(`🚀 Pushing to remote: ${currentBranch}`);
  execCommand(`git push origin ${currentBranch}`);
  
  console.log('✅ Changes committed and pushed successfully');
}

function mergeToMainAndCleanup(branchName = null) {
  const currentBranch = branchName || getCurrentBranch();
  
  if (!currentBranch.startsWith(FEATURE_PREFIX) && !currentBranch.startsWith(HOTFIX_PREFIX)) {
    throw new Error('Can only merge feature or hotfix branches to main');
  }
  
  console.log(`🔄 Merging ${currentBranch} to main...`);
  
  // Switch to main
  execCommand('git checkout main');
  
  // Pull latest changes
  execCommand('git pull origin main');
  
  // Merge the feature branch
  execCommand(`git merge ${currentBranch} --no-ff -m "Merge ${currentBranch} into main"`);
  
  // Push to main
  execCommand('git push origin main');
  
  // Delete local branch
  console.log(`🗑️  Deleting local branch: ${currentBranch}`);
  execCommand(`git branch -d ${currentBranch}`);
  
  // Delete remote branch
  console.log(`🗑️  Deleting remote branch: ${currentBranch}`);
  execCommand(`git push origin --delete ${currentBranch}`);
  
  console.log(`✅ Successfully merged ${currentBranch} to main and cleaned up`);
}

function getBranchInfo() {
  const currentBranch = getCurrentBranch();
  const status = getGitStatus();
  const hasChanges = status.trim().length > 0;
  
  return {
    currentBranch,
    hasChanges,
    status: hasChanges ? status : 'No changes'
  };
}

function displayBranchStatus() {
  const info = getBranchInfo();
  
  console.log('📊 Current Git Status:');
  console.log(`   Branch: ${info.currentBranch}`);
  console.log(`   Changes: ${info.hasChanges ? 'Yes' : 'No'}`);
  
  if (info.hasChanges) {
    console.log('   Modified files:');
    console.log(info.status);
  }
}

// CLI Interface
const command = process.argv[2];
const args = process.argv.slice(3);

switch (command) {
  case 'start':
    if (args.length === 0) {
      console.error('❌ Please provide a feature name: npm run git:start feature-name');
      process.exit(1);
    }
    const featureName = args[0];
    createFeatureBranch(featureName);
    break;
    
  case 'session':
    if (args.length === 0) {
      console.error('❌ Please provide a session name: npm run git:session session-name');
      process.exit(1);
    }
    const sessionName = args[0];
    createSessionBranch(sessionName);
    break;
    
  case 'commit':
    if (args.length === 0) {
      console.error('❌ Please provide a commit message: npm run git:commit "message"');
      process.exit(1);
    }
    const message = args.join(' ');
    commitAndPush(message);
    break;
    
  case 'save':
    if (args.length === 0) {
      console.error('❌ Please provide a commit message: npm run git:save "message"');
      process.exit(1);
    }
    const saveMessage = args.join(' ');
    saveSessionProgress(saveMessage);
    break;
    
  case 'finish':
    mergeToMainAndCleanup();
    break;
    
  case 'end':
    endSessionAndCleanup();
    break;
    
  case 'status':
    displayBranchStatus();
    break;
    
  case 'cleanup':
    if (args.length === 0) {
      console.error('❌ Please provide a branch name: npm run git:cleanup branch-name');
      process.exit(1);
    }
    const branchToCleanup = args[0];
    mergeToMainAndCleanup(branchToCleanup);
    break;
    
  default:
    console.log('🚀 Embr Git Workflow Manager');
    console.log('');
    console.log('Session-Based Workflow:');
    console.log('  npm run git:session <session-name>  - Create new session branch');
    console.log('  npm run git:save "message"          - Save session progress');
    console.log('  npm run git:end                     - End session (merge & cleanup)');
    console.log('');
    console.log('Feature-Based Workflow:');
    console.log('  npm run git:start <feature-name>    - Create new feature branch');
    console.log('  npm run git:commit "message"        - Commit and push changes');
    console.log('  npm run git:finish                  - Merge to main and cleanup');
    console.log('');
    console.log('Utility Commands:');
    console.log('  npm run git:status                  - Show current branch status');
    console.log('  npm run git:cleanup <branch-name>   - Cleanup specific branch');
    console.log('');
    console.log('Examples:');
    console.log('  npm run git:session wildroots-fixes');
    console.log('  npm run git:save "Fixed TypeScript errors"');
    console.log('  npm run git:end');
    console.log('');
    console.log('  npm run git:start demo-fixes');
    console.log('  npm run git:commit "Fix button styling issues"');
    console.log('  npm run git:finish');
    break;
}
