/*
  A small, dependency-free recursive deep-diff: returns the list of
  key-paths present in `after` whose value differs from `before` (added,
  removed, or changed), as dotted paths like "blocks.0.events.2.time".
  Used by scripts/log-review.js to compute an objective fieldsChanged list
  — "looked fine to me" doesn't count as no_fixes; an empty diff does.
*/

function isPlainObject(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function deepEqual(a, b) {
  if (a === b) return true;
  if (typeof a !== typeof b) return false;
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    return a.every((v, i) => deepEqual(v, b[i]));
  }
  if (isPlainObject(a) && isPlainObject(b)) {
    const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
    return [...keys].every((k) => deepEqual(a[k], b[k]));
  }
  return false;
}

function deepDiff(before, after, prefix = '') {
  const changed = [];

  if (isPlainObject(before) && isPlainObject(after)) {
    const keys = new Set([...Object.keys(before), ...Object.keys(after)]);
    for (const key of keys) {
      changed.push(...deepDiff(before[key], after[key], prefix ? `${prefix}.${key}` : key));
    }
    return changed;
  }

  if (Array.isArray(before) && Array.isArray(after)) {
    const len = Math.max(before.length, after.length);
    for (let i = 0; i < len; i++) {
      changed.push(...deepDiff(before[i], after[i], `${prefix}.${i}`));
    }
    return changed;
  }

  if (!deepEqual(before, after)) {
    changed.push(prefix || '(root)');
  }
  return changed;
}

module.exports = { deepDiff, deepEqual };
