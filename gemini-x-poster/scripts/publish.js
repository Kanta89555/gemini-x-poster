#!/usr/bin/env node
const { execFileSync } = require('node:child_process');
const path = require('node:path');

const rootDir = path.resolve(__dirname, '..');

function run(command, args, options = {}) {
  return execFileSync(command, args, {
    cwd: rootDir,
    stdio: 'pipe',
    encoding: 'utf8',
    ...options,
  });
}

function publish(options = {}) {
  const message = options.message || 'chore: publish generated content';
  const remote = options.remote || 'origin';
  const branch = options.branch || 'main';

  run('git', ['add', '.']);
  run('git', ['commit', '-m', message]);
  run('git', ['push', remote, branch]);

  return { message, remote, branch };
}

if (require.main === module) {
  try {
    const result = publish();
    console.log(`Published to ${result.remote}/${result.branch}`);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

module.exports = {
  publish,
};
