#!/usr/bin/env node

import {exec} from 'child_process';
import {promisify} from 'util';

// Promisify exec for async/await usage
const execPromise = promisify(exec);

// List of commands to be executed sequentially
const commands: string[] = [
  'yarn set version latest',
  'yarn upgrade-interactive',
  'yarn dlx syncpack lint',
  'yarn dlx syncpack fix',
  'yarn dlx syncpack format',
  'yarn up "@*/*" "*" --recursive',
  'yarn dedupe',
  'yarn dlx @yarnpkg/sdks vscode',
];

// A helper function to execute a command and log its output
async function runCommand(command: string): Promise<void> {
  console.log(`\n\x1b[36m$ ${command}\x1b[0m`); // Log command in cyan
  try {
    const {stdout, stderr} = await execPromise(command);
    if (stdout) {
      console.log(stdout);
    }
    if (stderr) {
      console.error(`\x1b[33m${stderr}\x1b[0m`); // Log warnings in yellow
    }
  }
  catch (error) {
    console.error(`\x1b[31mError executing command: ${command}\x1b[0m`);
    if (error instanceof Error) {
      console.error(error.message);
    }
    // Stop the script if a command fails
    process.exit(1);
  }
}

// Main function to run all commands in sequence
async function main() {
  console.log('🚀 Starting project maintenance script...');
  for (const command of commands) {
    await runCommand(command);
  }
  console.log('\n✅ All tasks completed successfully!');
}

// Start the process
main();
