#!/usr/bin/env node

/**
 * Embr Dev Log Updater
 * - Ensures today's daily file exists in docs/dev-log/YYYY-MM-DD.md
 * - Updates DEV_LOG.md Latest Summary date to today
 * - Adds today's entry to the Index if missing
 * - Optional: pass --append "message" to append a bullet to today's entry
 */

const fs = require('fs');
const path = require('path');

function formatDate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function getToday() {
  // Use local date (sessions are local-time scoped)
  return formatDate(new Date());
}

function ensureDailyFile(repoRoot, dateStr) {
  const dailyDir = path.join(repoRoot, 'docs', 'dev-log');
  const dailyPath = path.join(dailyDir, `${dateStr}.md`);
  if (!fs.existsSync(dailyDir)) fs.mkdirSync(dailyDir, { recursive: true });
  if (!fs.existsSync(dailyPath)) {
    const template = `# ${dateStr} — Daily Log\n\n## Overview\n- Session started.\n\n## Changes\n- \n\n## Impact\n- \n\n## Next\n- \n`;
    fs.writeFileSync(dailyPath, template, 'utf8');
    return { created: true, dailyPath };
  }
  return { created: false, dailyPath };
}

function updateDevLog(repoRoot, dateStr) {
  const devLogPath = path.join(repoRoot, 'DEV_LOG.md');
  if (!fs.existsSync(devLogPath)) {
    throw new Error('DEV_LOG.md not found at repository root');
  }
  let md = fs.readFileSync(devLogPath, 'utf8');
  let changed = false;

  // Ensure date exists in Index
  const indexHeader = '### Index';
  const indexStart = md.indexOf(indexHeader);
  if (indexStart !== -1) {
    const afterIndex = indexStart + indexHeader.length;
    const nextHeadingPos = md.indexOf('### ', afterIndex);
    const indexEnd = nextHeadingPos !== -1 ? nextHeadingPos : md.length;
    const indexBlock = md.slice(afterIndex, indexEnd);
    const entryLine = `- ${dateStr} → docs/dev-log/${dateStr}.md`;
    if (!indexBlock.includes(entryLine)) {
      const insertionPoint = indexEnd;
      const prefix = md.slice(0, insertionPoint);
      const suffix = md.slice(insertionPoint);
      const needsNewline = prefix.endsWith('\n') ? '' : '\n';
      md = `${prefix}${needsNewline}${entryLine}\n${suffix}`;
      changed = true;
    }
  }

  // Update Latest Summary heading date
  const latestSummaryRegex = /(### Latest Summary \()\d{4}-\d{2}-\d{2}(\))/;
  if (latestSummaryRegex.test(md)) {
    md = md.replace(latestSummaryRegex, `$1${dateStr}$2`);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(path.join(repoRoot, 'DEV_LOG.md'), md, 'utf8');
  }
  return { changed };
}

function appendToDaily(repoRoot, dateStr, message) {
  if (!message) return false;
  const dailyPath = path.join(repoRoot, 'docs', 'dev-log', `${dateStr}.md`);
  if (!fs.existsSync(dailyPath)) return false;
  const timestamp = new Date().toLocaleTimeString();
  const line = `- [${timestamp}] ${message}`;
  let content = fs.readFileSync(dailyPath, 'utf8');

  // Append under Changes section if present, else to end
  const changesHeader = '\n## Changes';
  const pos = content.indexOf(changesHeader);
  if (pos !== -1) {
    const insertPos = content.indexOf('\n', pos + changesHeader.length);
    const at = insertPos !== -1 ? insertPos + 1 : content.length;
    content = content.slice(0, at) + line + '\n' + content.slice(at);
  } else {
    if (!content.endsWith('\n')) content += '\n';
    content += `\n${line}\n`;
  }
  fs.writeFileSync(dailyPath, content, 'utf8');
  return true;
}

function main() {
  try {
    const repoRoot = process.cwd();
    const today = getToday();

    const args = process.argv.slice(2);
    const appendIndex = args.indexOf('--append');
    const appendMsg = appendIndex !== -1 ? args[appendIndex + 1] : undefined;

    const { created, dailyPath } = ensureDailyFile(repoRoot, today);
    const { changed } = updateDevLog(repoRoot, today);
    const appended = appendToDaily(repoRoot, today, appendMsg);

    console.log('[Dev Log] Date:', today);
    if (created) console.log('[Dev Log] Created daily entry:', dailyPath);
    if (changed) console.log('[Dev Log] Updated DEV_LOG.md (index and/or latest summary).');
    if (appendMsg) console.log('[Dev Log] Appended to today\'s entry:', appended ? 'ok' : 'failed');
  } catch (err) {
    console.error('[Dev Log] Error:', err.message);
    process.exit(1);
  }
}

main();


