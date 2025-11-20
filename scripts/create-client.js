#!/usr/bin/env node

/*
  Embr Client Creator
  - Creates a new client micro-app from a template
  - Sets up directory structure, config, and component
  - Registers in appropriate industry registry
  
  Usage:
    node scripts/create-client.js --name "Client Name" --industry healthcare --access-code CLIENT2025
    node scripts/create-client.js --name "My Restaurant" --industry hospitality --access-code REST2025
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

function kebabCase(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function pascalCase(str) {
  return str
    .split(/[\s-_]+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
}

function createClientConfig(clientName, industry, accessCode, clientId) {
  const currentYear = new Date().getFullYear();
  
  // Default colors by industry
  const industryColors = {
    healthcare: { primary: '#1A476F', secondary: '#80C1D8' },
    events: { primary: '#3B6A4C', secondary: '#D98C65' },
    hospitality: { primary: '#8B4513', secondary: '#F4A460' },
    retail: { primary: '#2E8B57', secondary: '#FFD700' },
    services: { primary: '#4682B4', secondary: '#87CEEB' },
    other: { primary: '#6A5ACD', secondary: '#DDA0DD' }
  };

  const colors = industryColors[industry] || industryColors.other;

  return {
    clientId: clientId,
    accessCode: accessCode,
    name: clientName,
    description: `Your digital companion for ${clientName.toLowerCase()} - a modern, branded micro-app experience`,
    version: "1.0",
    expiry: `${currentYear + 1}-12-31`,
    theme: {
      colors: {
        primary: colors.primary,
        secondary: colors.secondary,
        background: "#FFFFFF",
        surface: "#F8F9FA",
        surfaceElevated: "#FFFFFF",
        text: "#1A1A1A",
        textSecondary: "#6B7280",
        border: "#E5E7EB"
      },
      typography: {
        heading: "Inter",
        body: "Inter"
      }
    },
    navigation: [
      { id: "home", label: "Home", icon: "home", path: "/" },
      { id: "about", label: "About", icon: "info", path: "/about" },
      { id: "contact", label: "Contact", icon: "mail", path: "/contact" }
    ],
    features: {
      qrCode: true,
      pushNotifications: false,
      offlineMode: false,
      analytics: false
    },
    content: {
      home: {
        title: `Welcome to ${clientName}`,
        subtitle: "Your digital experience starts here",
        description: `Discover everything ${clientName.toLowerCase()} has to offer through our modern, easy-to-use app.`
      },
      about: {
        title: "About Us",
        content: `Learn more about ${clientName} and what makes us special.`
      },
      contact: {
        title: "Get in Touch",
        content: "We'd love to hear from you. Contact us today!"
      }
    },
    pushNotifications: {
      enabled: false,
      topics: []
    },
    analytics: {
      enabled: false
    }
  };
}

function createClientComponent(clientName, clientId) {
  const componentName = pascalCase(clientName) + 'App';
  
  return `import React from 'react';
import { ClientConfig } from '../../../../types/client';

interface ${componentName}Props {
  config: ClientConfig;
}

export function ${componentName}({ config }: ${componentName}Props) {
  return (
    <div style={{ 
      background: config.theme.colors.background,
      color: config.theme.colors.text,
      minHeight: '100vh',
      fontFamily: config.theme.typography.body
    }}>
      {/* Header */}
      <header style={{
        background: config.theme.colors.primary,
        color: 'white',
        padding: '2rem',
        textAlign: 'center'
      }}>
        <h1 style={{ 
          margin: 0, 
          fontSize: '2rem',
          fontFamily: config.theme.typography.heading,
          fontWeight: 600
        }}>
          {config.name}
        </h1>
        <p style={{ margin: '0.5rem 0 0 0', opacity: 0.9 }}>
          {config.description}
        </p>
      </header>

      {/* Navigation */}
      <nav style={{
        background: config.theme.colors.surface,
        padding: '1rem 2rem',
        borderBottom: \`1px solid \${config.theme.colors.border}\`
      }}>
        <div style={{ display: 'flex', gap: '2rem' }}>
          {config.navigation.map((item) => (
            <a
              key={item.id}
              href={item.path}
              style={{
                color: config.theme.colors.text,
                textDecoration: 'none',
                fontWeight: 500,
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = config.theme.colors.surfaceElevated;
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main style={{ padding: '2rem' }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <h2 style={{ 
            color: config.theme.colors.primary,
            fontFamily: config.theme.typography.heading,
            fontWeight: 600
          }}>
            {config.content.home.title}
          </h2>
          <p style={{ 
            fontSize: '1.1rem',
            lineHeight: 1.6,
            color: config.theme.colors.textSecondary
          }}>
            {config.content.home.description}
          </p>
          
          {/* Add your custom content here */}
          <div style={{
            marginTop: '2rem',
            padding: '2rem',
            background: config.theme.colors.surface,
            borderRadius: '1rem',
            border: \`1px solid \${config.theme.colors.border}\`
          }}>
            <h3 style={{ 
              color: config.theme.colors.primary,
              marginTop: 0
            }}>
              Get Started
            </h3>
            <p>
              This is your client micro-app template. Customize this content to match your client's specific needs.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}`;
}

function loadTemplate(templateName) {
  const templatePath = path.join(__dirname, 'templates', `${templateName}-template.json`);
  if (!fs.existsSync(templatePath)) {
    throw new Error(`Template "${templateName}" not found at ${templatePath}`);
  }
  const templateContent = fs.readFileSync(templatePath, 'utf8');
  return JSON.parse(templateContent);
}

function replaceTemplateVariables(template, variables) {
  let content = JSON.stringify(template);

  for (const [key, value] of Object.entries(variables)) {
    const regex = new RegExp(`{{${key}}}`, 'g');
    content = content.replace(regex, value);
  }

  return JSON.parse(content);
}

async function createClient() {
  const clientName = getArg('--name');
  const industry = getArg('--industry');
  const accessCode = getArg('--access-code');
  const template = getArg('--template'); // NEW: Template flag
  const help = hasFlag('--help') || hasFlag('-h');

  if (help || !clientName || !industry || !accessCode) {
    console.log(`
🚀 Embr Client Creator

Usage:
  node scripts/create-client.js --name "Client Name" --industry [industry] --access-code [CODE] [--template template-name]

Options:
  --name        Client name (e.g., "PeakForm Physio")
  --industry    Industry: healthcare, events, hospitality, retail, services, other
  --access-code Access code (e.g., "CLIENT2025")
  --template    Template to use: festival, healthcare, menu, restaurant, property (optional)
  --help, -h    Show this help

Template-Based (Quick Setup):
  node scripts/create-client.js --name "My Festival" --industry events --access-code FEST2025 --template festival
  node scripts/create-client.js --name "Corner Cafe" --industry hospitality --access-code CAFE2025 --template restaurant

Custom Component (Advanced):
  node scripts/create-client.js --name "PeakForm Physio" --industry healthcare --access-code PEAKFORM2025
  node scripts/create-client.js --name "My Restaurant" --industry hospitality --access-code REST2025
    `);
    return;
  }

  const validIndustries = ['healthcare', 'events', 'hospitality', 'retail', 'services', 'other'];
  if (!validIndustries.includes(industry)) {
    console.error(`❌ Invalid industry. Must be one of: ${validIndustries.join(', ')}`);
    process.exit(1);
  }

  const validTemplates = ['festival', 'healthcare', 'menu', 'restaurant', 'property'];
  if (template && !validTemplates.includes(template)) {
    console.error(`❌ Invalid template. Must be one of: ${validTemplates.join(', ')}`);
    process.exit(1);
  }

  const clientId = kebabCase(clientName) + '-2025';
  const componentName = pascalCase(clientName) + 'App';
  const isTemplateBased = !!template;

  console.log(`🚀 Creating client: ${clientName}`);
  console.log(`📁 Client ID: ${clientId}`);
  console.log(`🏭 Industry: ${industry}`);
  console.log(`🔑 Access Code: ${accessCode}`);
  if (isTemplateBased) {
    console.log(`📋 Template: ${template} (uses GenericClientApp)`);
  } else {
    console.log(`📋 Mode: Custom component`);
  }

  try {
    // 1. Create config file
    const configPath = `packages/hub-app/public/client-configs/${clientId}.json`;
    let config;

    if (isTemplateBased) {
      // Load and customize template
      const templateConfig = loadTemplate(template);
      const currentYear = new Date().getFullYear();
      config = replaceTemplateVariables(templateConfig, {
        CLIENT_ID: clientId,
        ACCESS_CODE: accessCode,
        CLIENT_NAME: clientName,
        CLIENT_NAME_LOWER: clientName.toLowerCase(),
        EXPIRY: `${currentYear + 1}-12-31`,
        ANALYTICS_ID: '' // Leave empty for now
      });
      console.log(`📋 Loaded template: ${template}`);
    } else {
      // Create custom config (legacy behavior)
      config = createClientConfig(clientName, industry, accessCode, clientId);
    }

    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    console.log(`✅ Config created: ${configPath}`);

    // 2-4. Create component files (ONLY for custom, not template-based)
    if (!isTemplateBased) {
      // Create client directory
      const clientDir = `packages/hub-app/src/components/clients/${industry}/${clientId}`;
      fs.mkdirSync(clientDir, { recursive: true });
      console.log(`✅ Directory created: ${clientDir}`);

      // Create component file
      const componentPath = `${clientDir}/${componentName}.tsx`;
      const componentCode = createClientComponent(clientName, clientId);
      fs.writeFileSync(componentPath, componentCode);
      console.log(`✅ Component created: ${componentPath}`);

      // Create index file
      const indexPath = `${clientDir}/index.ts`;
      const indexCode = `// ${clientName} Client App
export { ${componentName} } from './${componentName}';
`;
      fs.writeFileSync(indexPath, indexCode);
      console.log(`✅ Index created: ${indexPath}`);
    } else {
      console.log(`⏭️  Skipping component creation (using template renderer)`);
    }

    // 5-6. Update registries (ONLY for custom components, not templates)
    if (!isTemplateBased) {
      // Update industry registry
      const industryIndexPath = `packages/hub-app/src/components/clients/${industry}/index.ts`;
      let industryIndexContent = fs.readFileSync(industryIndexPath, 'utf8');

      // Add import
      const importLine = `import { ${componentName} } from './${clientId}';`;
      if (!industryIndexContent.includes(importLine)) {
        industryIndexContent = industryIndexContent.replace(
          '// Add [industry] clients here as they are created',
          `// Add ${industry} clients here as they are created\n${importLine}`
        );
      }

      // Add to registry
      const registryPattern = /export const \w+_CLIENTS = \{([^}]*)\} as const;/;
      const match = industryIndexContent.match(registryPattern);
      if (match) {
        const currentRegistry = match[1].trim();
        const newRegistry = currentRegistry
          ? `${currentRegistry},\n  '${clientId}': ${componentName}`
          : `'${clientId}': ${componentName}`;

        industryIndexContent = industryIndexContent.replace(
          registryPattern,
          `export const ${industry.toUpperCase()}_CLIENTS = {\n  ${newRegistry}\n} as const;`
        );
      }

      fs.writeFileSync(industryIndexPath, industryIndexContent);
      console.log(`✅ Industry registry updated: ${industryIndexPath}`);

      // Update main registry
      const mainIndexPath = 'packages/hub-app/src/components/clients/index.ts';
      let mainIndexContent = fs.readFileSync(mainIndexPath, 'utf8');

      // Add import if not exists
      const mainImportLine = `import { ${industry.toUpperCase()}_CLIENTS } from './${industry}';`;
      if (!mainIndexContent.includes(mainImportLine)) {
        mainIndexContent = mainIndexContent.replace(
          '// Import from industry registries',
          `// Import from industry registries\n${mainImportLine}`
        );
      }

      // Add to main registry
      const mainRegistryPattern = /export const CLIENT_APP_REGISTRY = \{([^}]*)\} as const;/;
      const mainMatch = mainIndexContent.match(mainRegistryPattern);
      if (mainMatch) {
        const currentMainRegistry = mainMatch[1].trim();
        const newMainRegistry = currentMainRegistry
          ? `${currentMainRegistry},\n  ...${industry.toUpperCase()}_CLIENTS`
          : `...${industry.toUpperCase()}_CLIENTS`;

        mainIndexContent = mainIndexContent.replace(
          mainRegistryPattern,
          `export const CLIENT_APP_REGISTRY = {\n  ${newMainRegistry}\n} as const;`
        );
      }

      fs.writeFileSync(mainIndexPath, mainIndexContent);
      console.log(`✅ Main registry updated: ${mainIndexPath}`);
    } else {
      console.log(`⏭️  Skipping registry updates (template-based client uses GenericClientApp)`);
    }

    // 7. Update access code mapping
    const useClientConfigPath = 'packages/hub-app/src/hooks/useClientConfig.tsx';
    let useClientConfigContent = fs.readFileSync(useClientConfigPath, 'utf8');
    
    // Add access code mapping
    const mappingLine = `    '${accessCode}': '${clientId}',`;
    if (!useClientConfigContent.includes(mappingLine)) {
      useClientConfigContent = useClientConfigContent.replace(
        /const ACCESS_CODE_MAPPING: Record<string, string> = \{([^}]*)\};/,
        `const ACCESS_CODE_MAPPING: Record<string, string> = {\n    'WILDROOTS2025': 'wildroots-festival-2025',\n    'PEAKFORM2025': 'peakform-physio-2025',\n    ${mappingLine}\n    // Add more access codes here as needed\n  };`
      );
    }

    // Add config file to scan list
    const configFileLine = `      '${clientId}.json',`;
    if (!useClientConfigContent.includes(configFileLine)) {
      useClientConfigContent = useClientConfigContent.replace(
        /const configFileNames = \[([^\]]*)\];/,
        `const configFileNames = [\n      'wildroots-festival-2025.json',\n      'peakform-physio-2025.json',\n      'smith-jones-wedding-2024.json', \n      'demo-festival.json',\n      ${configFileLine}\n      // Add more as needed, or make this dynamic\n    ];`
      );
    }

    fs.writeFileSync(useClientConfigPath, useClientConfigContent);
    console.log(`✅ Access code mapping updated: ${useClientConfigPath}`);

    console.log(`\n🎉 Client "${clientName}" created successfully!`);
    console.log(`\n📋 Next steps:`);
    console.log(`1. Test locally: npm run dev`);
    console.log(`2. Navigate to your app with access code: ${accessCode}`);
    if (isTemplateBased) {
      console.log(`3. Customize content in: ${configPath}`);
      console.log(`4. Template renderer: GenericClientApp (auto-selected)`);
      console.log(`5. Deploy to Firebase: npm run configs:push`);
    } else {
      console.log(`3. Customize the component in: packages/hub-app/src/components/clients/${industry}/${clientId}`);
      console.log(`4. Deploy to Firebase: npm run configs:push`);
    }
    console.log(`\n🔗 Access your app with code: ${accessCode}`);

  } catch (error) {
    console.error('❌ Error creating client:', error.message);
    process.exit(1);
  }
}

createClient();
