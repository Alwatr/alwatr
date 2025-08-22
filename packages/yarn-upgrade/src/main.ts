#!/usr/bin/env node

import {spawn} from 'child_process';

// List of commands to be executed sequentially
const commands: string[] = [
  'pwd',
  'yarn set version latest',
  'yarn upgrade-interactive',
  'yarn up "@*/*" "*" --recursive',
  'yarn dlx @yarnpkg/sdks vscode',
  'yarn dedupe',
  'yarn dlx syncpack@alpha format',
  'yarn dlx syncpack@alpha fix',
  'yarn dlx syncpack@alpha lint --sort count'
];

// A helper function to execute a command and log its output
function runCommand(command: string): Promise<void> {
  console.log(`\n\x1b[36m$ ${command}\x1b[0m`); // Log command in cyan
  return new Promise((resolve, reject) => {
    const [cmd, ...args] = command.split(' ');
    const child = spawn(cmd, args, {
      // This is the magic part:
      // It connects the child process's stdio to the parent process (your terminal)
      stdio: 'inherit',

      // Run in the directory where the user executed the command
      cwd: process.cwd(), 
    });

    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      }
      else {
        reject();
      }
    });

    child.on('error', (err) => {
      reject(err);
    });
  });
}

// Main function to run all commands in sequence
async function main() {
  console.log('🚀 Starting project maintenance script...');
  for (const command of commands) {
    try {
      await runCommand(command);
    }
    catch (error) {
      console.error(`\x1b[31mFailed to execute command: ${command}\x1b[0m`);
      process.exit(1);
    }
  }
  console.log('\n✅ All tasks completed successfully!');
}

// Start the process
main();
