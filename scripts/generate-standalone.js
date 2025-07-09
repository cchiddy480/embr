#!/usr/bin/env node

const { program } = require('commander');
const chalk = require('chalk');
const fs = require('fs-extra');
const path = require('path');
const { generateStandaloneApp } = require('../packages/standalone-app/scripts/generate');

program
  .name('embr-generate')
  .description('Generate standalone Embr apps from client configurations')
  .version('1.0.0');

program
  .command('standalone')
  .description('Generate a standalone app for a specific client')
  .argument('<clientId>', 'Client ID to generate app for')
  .option('-c, --config <path>', 'Path to client config file', './client-configs')
  .option('-o, --output <path>', 'Output directory for generated app', './dist/standalone')
  .option('--ios', 'Generate iOS app')
  .option('--android', 'Generate Android app')
  .option('--web', 'Generate web app')
  .action(async (clientId, options) => {
    try {
      console.log(chalk.blue(`🚀 Generating standalone app for client: ${clientId}`));
      
      const configPath = path.resolve(options.config);
      const outputPath = path.resolve(options.output);
      
      // Ensure output directory exists
      await fs.ensureDir(outputPath);
      
      // Generate the standalone app
      await generateStandaloneApp({
        clientId,
        configPath,
        outputPath,
        platforms: {
          ios: options.ios || false,
          android: options.android || false,
          web: options.web || true
        }
      });
      
      console.log(chalk.green(`✅ Successfully generated standalone app for ${clientId}`));
      console.log(chalk.gray(`📁 Output: ${outputPath}`));
      
    } catch (error) {
      console.error(chalk.red(`❌ Error generating standalone app: ${error.message}`));
      process.exit(1);
    }
  });

program
  .command('validate')
  .description('Validate a client configuration file')
  .argument('<configPath>', 'Path to client config file')
  .action(async (configPath) => {
    try {
      console.log(chalk.blue(`🔍 Validating config: ${configPath}`));
      
      const config = await fs.readJson(configPath);
      
      // Basic validation
      const requiredFields = ['clientId', 'name', 'version', 'expiry', 'theme', 'navigation'];
      const missingFields = requiredFields.filter(field => !config[field]);
      
      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
      }
      
      // Check expiry
      const expiryDate = new Date(config.expiry);
      if (isNaN(expiryDate.getTime())) {
        throw new Error('Invalid expiry date format');
      }
      
      console.log(chalk.green(`✅ Configuration is valid`));
      console.log(chalk.gray(`📅 Expires: ${expiryDate.toLocaleDateString()}`));
      
    } catch (error) {
      console.error(chalk.red(`❌ Configuration validation failed: ${error.message}`));
      process.exit(1);
    }
  });

program.parse(); 