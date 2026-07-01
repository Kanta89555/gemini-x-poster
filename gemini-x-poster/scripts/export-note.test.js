const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { exportNotes, toNoteXml } = require('./export-note');

const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'export-note-'));
fs.mkdirSync(path.join(tempDir, 'articles'), { recursive: true });
fs.mkdirSync(path.join(tempDir, 'exports', 'note'), { recursive: true });
fs.writeFileSync(path.join(tempDir, 'articles', 'sample.md'), '# Sample\n\nHello world', 'utf8');

const result = exportNotes({ rootDir: tempDir });
assert.equal(result.results.length, 1);
assert.ok(fs.existsSync(path.join(tempDir, 'exports', 'note', 'sample.xml')));
assert.match(toNoteXml('# Sample', 'Sample'), /<title>Sample<\/title>/);

console.log('export-note tests passed');
