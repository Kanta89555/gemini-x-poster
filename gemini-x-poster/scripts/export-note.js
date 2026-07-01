#!/usr/bin/env node
const fs = require('node:fs');
const path = require('node:path');

const rootDir = path.resolve(__dirname, '..');
const articlesDir = path.join(rootDir, 'articles');
const exportsDir = path.join(rootDir, 'exports', 'note');
const templatePath = path.join(rootDir, 'engine', 'templates', 'note.xml');

function readMarkdownFiles(dir) {
  return fs.readdirSync(dir)
    .filter((file) => file.endsWith('.md'))
    .sort()
    .map((file) => path.join(dir, file));
}

function toNoteXml(markdown, title) {
  const escapedTitle = String(title)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  const escapedBody = String(markdown)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<note>',
    `  <title>${escapedTitle}</title>`,
    '  <content>',
    `    ${escapedBody.replace(/\n/g, '\n    ')}`,
    '  </content>',
    '</note>',
  ].join('\n');
}

function exportNotes(options = {}) {
  const targetRootDir = options.rootDir ? path.resolve(options.rootDir) : rootDir;
  const sourceDir = path.join(targetRootDir, 'articles');
  const outputDir = path.join(targetRootDir, 'exports', 'note');
  const template = fs.existsSync(templatePath)
    ? fs.readFileSync(templatePath, 'utf8')
    : '<note />';

  fs.mkdirSync(outputDir, { recursive: true });

  const files = readMarkdownFiles(sourceDir);
  const results = files.map((filePath) => {
    const title = path.basename(filePath, '.md');
    const markdown = fs.readFileSync(filePath, 'utf8');
    const xml = toNoteXml(markdown, title);
    const outputPath = path.join(outputDir, `${title}.xml`);
    fs.writeFileSync(outputPath, xml.replace('{template}', template), 'utf8');
    return { input: path.relative(targetRootDir, filePath), output: path.relative(targetRootDir, outputPath) };
  });

  return { results, outputDir: path.relative(targetRootDir, outputDir) };
}

if (require.main === module) {
  try {
    const result = exportNotes();
    console.log(`Exported ${result.results.length} note files to ${result.outputDir}`);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

module.exports = {
  exportNotes,
  readMarkdownFiles,
  toNoteXml,
};
