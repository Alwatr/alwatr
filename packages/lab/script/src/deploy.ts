#!/usr/bin/env node

import {existsSync} from 'fs';

import {$, argv, echo} from 'zx';

// $.verbose = false;
$.prefix = 'set -Eeuo pipefail';

// await $`cd $(pwd)`;

const DEPLOY_HOST = 'root@srv1.mihandoost.com';
const baseName = await $`basename $(pwd)`;
const DEPLOY_NAME = process.env.DEPLOY_NAME || baseName.stdout;
const deployPath = `/tmp/${DEPLOY_NAME}`;
const envPath = `.env.${DEPLOY_NAME}`;

function echoStep(step: string): void {
  echo`🔸 ${step}...`;
}

async function remoteShell(serverName: string, command: string): Promise<void> {
  echo(`[${serverName}]$ ${command}`);
  await $`ssh -o "ConnectTimeout=5" -tt -q ${serverName} ${command}`;
}

if (!existsSync(envPath)) {
  echo`❌ ${envPath} not found!`;
  await $`cp .env.example ${envPath}`;
  await $`vim ${envPath}`;
}

echoStep('Sync');

await remoteShell(DEPLOY_HOST, `mkdir -p ${deployPath}`);

await $`cp -afv ${envPath} .env`;
await $`rsync -Pazh --del ./_*.sh ./.env ./*.yml ./*.toml ${DEPLOY_HOST}:${deployPath}`;
await $`rm -fv .env`;

if (argv.down) {
  echoStep('Down');
  await remoteShell(DEPLOY_HOST, `cd ${deployPath} && docker-compose down --remove-orphans`);
} else {
  echoStep('Up');
  await remoteShell(DEPLOY_HOST, `cd ${deployPath} && chmod +x _up.sh && ./_up.sh`);
}
