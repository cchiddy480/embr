#!/usr/bin/env node

/**
 * Embr Dev Log Updater
 * - Ensures today's entry exists at the top of DEV_LOG.md
 * - Optional: pass --append "message" to append a bullet under today's entry
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
  return formatDate(new Date());
}

function ensureTodayEntry(repoRoot, dateStr) {
  const devLogPath = path.join(repoRoot, 'DEV_LOG.md');
  if (!fs.existsSync(devLogPath)) {
    throw new Error('DEV_LOG.md not found at repository root');
  }
  let md = fs.readFileSync(devLogPath, 'utf8');
  const heading = `### ${dateStr}`;
  if (md.includes(heading)) return { created: false };

  const entriesHeader = '## Entries';
  const insertAt = md.indexOf(entriesHeader);
  const template = `${heading}\n- \n\n`;
  if (insertAt === -1) {
    // No entries section yet — append one.
    if (!md.endsWith('\n')) md += '\n';
    md += `\n${entriesHeader}\n\n${template}`;
  } else {
    const afterHeader = insertAt + entriesHeader.length;
    const nextNewline = md.indexOf('\n', afterHeader);
    const insertPos = nextNewline !== -1 ? nextNewline + 1 : md.length;
    // Skip a following blank line so the new entry sits right under the header.
    let cursor = insertPos;
    while (md[cursor] === '\n') cursor += 1;
    md = md.slice(0, cursor) + `\n${template}` + md.slice(cursor);
  }
  fs.writeFileSync(devLogPath, md, 'utf8');
  return { created: true };
}

function appendToToday(repoRoot, dateStr, message) {
  if (!message) return false;
  const devLogPath = path.join(repoRoot, 'DEV_LOG.md');
  let md = fs.readFileSync(devLogPath, 'utf8');
  const heading = `### ${dateStr}`;
  const headingPos = md.indexOf(heading);
  if (headingPos === -1) return false;

  const timestamp = new Date().toLocaleTimeString();
  const line = `- [${timestamp}] ${message}`;
  const afterHeading = headingPos + heading.length;
  const nextHeadingPos = md.indexOf('\n### ', afterHeading);
  const sectionEnd = nextHeadingPos !== -1 ? nextHeadingPos : md.length;
  const section = md.slice(afterHeading, sectionEnd);
  // Replace a lone empty placeholder bullet ("- ") if that's all there is.
  const trimmedSection = section.trim();
  let newSection;
  if (trimmedSection === '-' || trimmedSection === '') {
    newSection = `\n${line}\n\n`;
  } else {
    newSection = section.replace(/\n*$/, `\n${line}\n\n`);
  }
  md = md.slice(0, afterHeading) + newSection + md.slice(sectionEnd);
  fs.writeFileSync(devLogPath, md, 'utf8');
  return true;
}

function main() {
  try {
    const repoRoot = process.cwd();
    const today = getToday();

    const args = process.argv.slice(2);
    const appendIndex = args.indexOf('--append');
    const appendMsg = appendIndex !== -1 ? args[appendIndex + 1] : undefined;

    const { created } = ensureTodayEntry(repoRoot, today);
    const appended = appendMsg ? appendToToday(repoRoot, today, appendMsg) : false;

    console.log('[Dev Log] Date:', today);
    if (created) console.log('[Dev Log] Created today\'s entry in DEV_LOG.md');
    if (appendMsg) console.log('[Dev Log] Appended to today\'s entry:', appended ? 'ok' : 'failed');
  } catch (err) {
    console.error('[Dev Log] Error:', err.message);
    process.exit(1);
  }
}

main();
