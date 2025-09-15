#!/usr/bin/env node

/**
 * File Validation Script
 * Scans codebase for file references and validates they exist and are tracked in git
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const SCAN_DIRECTORIES = [
  'packages/hub-app/src',
  'packages/ui/src',
  'packages/standalone-app/src'
];

const FILE_REFERENCE_PATTERNS = [
  // Import statements
  /import\s+.*?from\s+['"]([^'"]+)['"]/g,
  /require\s*\(\s*['"]([^'"]+)['"]\s*\)/g,
  
  // Static assets
  /src\s*=\s*['"]([^'"]+)['"]/g,
  /href\s*=\s*['"]([^'"]+)['"]/g,
  /url\s*\(\s*['"]([^'"]+)['"]\s*\)/g,
  
  // Next.js Image component
  /<Image[^>]*src\s*=\s*['"]([^'"]+)['"]/g,
  
  // CSS imports
  /@import\s+['"]([^'"]+)['"]/g,
  
  // JSON references
  /"([^"]*\.(json|svg|png|jpg|jpeg|gif|ico|webp))"/g
];

const IGNORE_PATTERNS = [
  // Node modules
  /^node_modules\//,
  // External packages
  /^@[^/]+\//,
  // HTTP URLs
  /^https?:\/\//,
  // Data URLs
  /^data:/,
  // CSS variables
  /^--/,
  // Relative paths that are likely dynamic
  /^\.\.?\//
];

class FileValidator {
  constructor() {
    this.referencedFiles = new Set();
    this.missingFiles = [];
    this.untrackedFiles = [];
    this.errors = [];
  }

  /**
   * Main validation function
   */
  async validate() {
    console.log('🔍 Scanning for file references...');
    
    try {
      // Scan for file references
      await this.scanForReferences();
      
      // Validate referenced files
      await this.validateReferencedFiles();
      
      // Check git tracking
      await this.checkGitTracking();
      
      // Report results
      this.reportResults();
      
      return this.missingFiles.length === 0 && this.untrackedFiles.length === 0;
      
    } catch (error) {
      console.error('❌ Validation failed:', error.message);
      return false;
    }
  }

  /**
   * Scan codebase for file references
   */
  async scanForReferences() {
    for (const dir of SCAN_DIRECTORIES) {
      if (fs.existsSync(dir)) {
        await this.scanDirectory(dir);
      }
    }
  }

  /**
   * Scan a directory recursively for file references
   */
  async scanDirectory(dir) {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const file of files) {
      const fullPath = path.join(dir, file.name);
      
      if (file.isDirectory()) {
        await this.scanDirectory(fullPath);
      } else if (this.isTextFile(file.name)) {
        await this.scanFile(fullPath);
      }
    }
  }

  /**
   * Scan a single file for file references
   */
  async scanFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      
      for (const pattern of FILE_REFERENCE_PATTERNS) {
        let match;
        while ((match = pattern.exec(content)) !== null) {
          const referencedFile = match[1];
          
          // Skip ignored patterns
          if (this.shouldIgnoreReference(referencedFile)) {
            continue;
          }
          
          // Convert to absolute path
          const absolutePath = this.resolveFilePath(filePath, referencedFile);
          if (absolutePath) {
            this.referencedFiles.add(absolutePath);
          }
        }
      }
    } catch (error) {
      this.errors.push(`Error reading ${filePath}: ${error.message}`);
    }
  }

  /**
   * Check if a file reference should be ignored
   */
  shouldIgnoreReference(reference) {
    return IGNORE_PATTERNS.some(pattern => pattern.test(reference));
  }

  /**
   * Resolve a file reference to an absolute path
   */
  resolveFilePath(sourceFile, reference) {
    // Skip external references
    if (reference.startsWith('http') || reference.startsWith('//')) {
      return null;
    }
    
    // Handle absolute paths from public directory
    if (reference.startsWith('/')) {
      // Check if it's a public asset
      const publicPath = path.join(process.cwd(), 'packages/hub-app/public', reference);
      if (fs.existsSync(publicPath)) {
        return publicPath;
      }
      return null;
    }
    
    // Handle relative paths
    const sourceDir = path.dirname(sourceFile);
    const resolvedPath = path.resolve(sourceDir, reference);
    
    // Check if file exists
    if (fs.existsSync(resolvedPath)) {
      return resolvedPath;
    }
    
    // Try with common extensions
    const extensions = ['.tsx', '.ts', '.js', '.jsx', '.css', '.scss', '.json'];
    for (const ext of extensions) {
      const pathWithExt = resolvedPath + ext;
      if (fs.existsSync(pathWithExt)) {
        return pathWithExt;
      }
    }
    
    return null;
  }

  /**
   * Validate that all referenced files exist
   */
  async validateReferencedFiles() {
    for (const filePath of this.referencedFiles) {
      if (!fs.existsSync(filePath)) {
        this.missingFiles.push(filePath);
      }
    }
  }

  /**
   * Check git tracking status of referenced files
   */
  async checkGitTracking() {
    try {
      // Get list of all tracked files
      const trackedFiles = execSync('git ls-files', { encoding: 'utf8' })
        .split('\n')
        .filter(line => line.trim());
      
      for (const filePath of this.referencedFiles) {
        const relativePath = path.relative(process.cwd(), filePath);
        
        if (!trackedFiles.includes(relativePath)) {
          this.untrackedFiles.push(relativePath);
        }
      }
    } catch (error) {
      this.errors.push(`Error checking git tracking: ${error.message}`);
    }
  }

  /**
   * Check if a file is a text file that might contain references
   */
  isTextFile(filename) {
    const textExtensions = ['.ts', '.tsx', '.js', '.jsx', '.css', '.scss', '.json', '.md', '.html'];
    return textExtensions.some(ext => filename.endsWith(ext));
  }

  /**
   * Report validation results
   */
  reportResults() {
    console.log('\n📊 File Validation Results');
    console.log('========================');
    
    if (this.referencedFiles.size > 0) {
      console.log(`✅ Found ${this.referencedFiles.size} file references`);
    }
    
    if (this.missingFiles.length > 0) {
      console.log(`\n❌ Missing Files (${this.missingFiles.length}):`);
      this.missingFiles.forEach(file => {
        console.log(`   - ${file}`);
      });
    }
    
    if (this.untrackedFiles.length > 0) {
      console.log(`\n⚠️  Untracked Files (${this.untrackedFiles.length}):`);
      this.untrackedFiles.forEach(file => {
        console.log(`   - ${file}`);
      });
      console.log('\n💡 To fix untracked files:');
      this.untrackedFiles.forEach(file => {
        console.log(`   git add -f ${file}`);
      });
    }
    
    if (this.errors.length > 0) {
      console.log(`\n🚨 Errors (${this.errors.length}):`);
      this.errors.forEach(error => {
        console.log(`   - ${error}`);
      });
    }
    
    if (this.missingFiles.length === 0 && this.untrackedFiles.length === 0 && this.errors.length === 0) {
      console.log('\n✅ All file references are valid and tracked!');
    }
  }
}

// Main execution
async function main() {
  const validator = new FileValidator();
  const isValid = await validator.validate();
  
  if (!isValid) {
    console.log('\n❌ File validation failed!');
    process.exit(1);
  } else {
    console.log('\n✅ File validation passed!');
    process.exit(0);
  }
}

// Run if called directly
if (require.main === module) {
  main().catch(error => {
    console.error('❌ Validation script failed:', error);
    process.exit(1);
  });
}

module.exports = FileValidator;
