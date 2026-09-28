#!/usr/bin/env -S npx tsx

/*
  Embr Prospect Demo (Phase C)
  - Turns a real prospect's itinerary (a URL or a local text/PDF file) into
    a watermarked preview guide, pushed live so you can look at it (and
    send it) before anyone's paid anything.
  - Uses the exact same importItinerary() the eventual /try self-serve
    path (Phase D) will use — one code path, not a separate demo-only one.
  - This *is* the mandatory human review step for now: it prints the link,
    confidence and every extraction warning so you can eyeball the
    rendered page before sending it to a real person. Once you've looked
    at it, log the outcome with scripts/log-review.js so the review-streak
    mechanism (scripts/review-streak.js) has real data.

  Usage:
    npx tsx scripts/prospect-demo.ts https://example.com/tuscany-retreat-itinerary
    npx tsx scripts/prospect-demo.ts ./prospects/acme-offsite.txt
    npx tsx scripts/prospect-demo.ts ./prospects/acme-offsite.pdf
    npx tsx scripts/prospect-demo.ts ./prospects/acme-offsite.txt --name "Acme Offsite" --no-push
*/

import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { importItinerary, type ImportInput } from '../packages/hub-app/src/lib/import';

function getArg(flag: string): string | undefined {
  const idx = process.argv.indexOf(flag);
  return idx === -1 ? undefined : process.argv[idx + 1];
}

function hasFlag(flag: string): boolean {
  return process.argv.includes(flag);
}

async function buildInput(source: string): Promise<{ input: ImportInput; clientIdHint: string }> {
  if (/^https?:\/\//i.test(source)) {
    const hint = new URL(source).hostname.replace(/^www\./, '');
    return { input: { type: 'url', url: source }, clientIdHint: hint };
  }

  const resolved = path.resolve(source);
  if (!fs.existsSync(resolved)) {
    console.error(`❌ File not found: ${resolved}`);
    process.exit(1);
  }
  const filename = path.basename(resolved);
  const clientIdHint = filename.replace(/\.[^.]+$/, '');

  if (resolved.toLowerCase().endsWith('.pdf')) {
    return { input: { type: 'pdf', buffer: fs.readFileSync(resolved), filename }, clientIdHint };
  }
  return { input: { type: 'text', content: fs.readFileSync(resolved, 'utf8') }, clientIdHint };
}

async function main() {
  const source = process.argv[2];
  const help = hasFlag('--help') || hasFlag('-h') || !source;
  if (help) {
    console.log(`
🔍 Embr Prospect Demo

Usage:
  npx tsx scripts/prospect-demo.ts <url-or-file> [--name "Display Name"] [--no-push]

Options:
  --name     Override the guide's display name (default: taken from the source)
  --no-push  Write the config locally but skip pushing to Firestore
  --help     Show this help
    `);
    process.exit(help && source ? 0 : 1);
  }

  const nameOverride = getArg('--name');
  const skipPush = hasFlag('--no-push');

  const { input, clientIdHint } = await buildInput(source);

  console.log(`🔍 Importing from: ${source}`);
  const result = await importItinerary(input, { clientIdHint });

  if ('error' in result) {
    console.error(`❌ Import failed [${result.error.code}]: ${result.error.message}`);
    process.exit(1);
  }

  const config = {
    ...result.config,
    name: nameOverride || result.config.name,
    watermark: true,
    expiry: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  };

  const configsDir = path.join(process.cwd(), 'packages', 'hub-app', 'public', 'client-configs');
  const configPath = path.join(configsDir, `${config.clientId}.json`);
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2) + '\n');
  console.log(`✅ Config written: ${configPath}`);

  // Snapshot exactly what this script wrote (name/watermark/expiry
  // overrides included) so scripts/log-review.js can later diff a
  // human-edited version of the config file against this baseline — that
  // diff is what makes fieldsChanged an objective record of what the
  // *reviewer* changed, not what this script itself already changed.
  const outputDir = path.join(process.cwd(), 'prospects', 'output');
  fs.mkdirSync(outputDir, { recursive: true });
  const originalSnapshotPath = path.join(outputDir, `${config.clientId}.original.json`);
  fs.writeFileSync(originalSnapshotPath, JSON.stringify(config, null, 2) + '\n');

  if (!skipPush) {
    console.log(`🚀 Pushing to Firestore...`);
    try {
      execFileSync('node', ['scripts/configs-push.js', '--only', config.clientId], { stdio: 'inherit' });
    } catch (e) {
      console.error('❌ Push failed — see output above. Config is still saved locally; fix and re-run:');
      console.error(`   node scripts/configs-push.js --only ${config.clientId}`);
      process.exit(1);
    }
  } else {
    console.log('⏭️  Skipped push (--no-push). Run this to push later:');
    console.log(`   node scripts/configs-push.js --only ${config.clientId}`);
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://app.build-embr.co.uk';
  console.log(`\n📋 Summary`);
  console.log(`   Confidence: ${result.confidence}`);
  console.log(`   Link: ${baseUrl}/c/${config.clientId}`);
  if (result.warnings.length > 0) {
    console.log(`   Warnings (review before sending):`);
    for (const w of result.warnings) console.log(`     • ${w}`);
  } else {
    console.log(`   Warnings: none`);
  }
  console.log(`\n👀 Look at the rendered page before sending it to anyone, then log the outcome:`);
  console.log(`   node scripts/log-review.js ${config.clientId} --no-fixes`);
  console.log(`   node scripts/log-review.js ${config.clientId}              # after editing ${configPath} by hand`);
}

main().catch((e) => {
  console.error('❌ Unexpected error:', e instanceof Error ? e.stack : e);
  process.exit(1);
});
