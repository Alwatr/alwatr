#!/usr/bin/env bun

/*
 * Alwatr Fast File Server
 *
 * Small static file server that lists directories and files in current path and serve for easy transfer/download over network.
 */

import {readdir as readDir, exists as pathExists} from 'node:fs/promises';
import {networkInterfaces, type NetworkInterfaceInfo} from 'node:os';
import {basename as pathBasename, join as pathJoin} from 'node:path';

import {createLogger} from '@alwatr/core';
import {env, file as openFile, write as writeFile, serve as createServer, argv} from 'bun';

import listHtml_ from './list.html' with {type: 'text'};

const listHtml = listHtml_ as unknown as string;

const verbose = argv.includes('--verbose') || argv.includes('-v');
const logger = createLogger('ffs', verbose);

const cwd = process.cwd();

/**
 * Default headers applied to non-HTML responses.
 */
const defaultHeaders: Record<string, string> = {
  server: 'AlwatrFastFileServer',
};

/**
 * Convert bytes to human friendly string (KB / MB / GB) with adaptive precision.
 *
 * @param bytes - number of bytes
 * @returns human-readable string like "12.3 MB"
 */
function formatBytes(bytes: number): string {
  const kb = bytes / 1000;
  if (kb < 1000) {
    return (kb < 100 ? kb.toFixed(2) : kb.toFixed(1)) + ' KB';
  }
  const mb = kb / 1000;
  if (mb < 1000) {
    return (mb < 100 ? mb.toFixed(2) : mb.toFixed(1)) + ' MB';
  }
  const gb = mb / 1000;
  return (gb < 100 ? gb.toFixed(2) : gb.toFixed(1)) + ' GB';
}

/**
 * Build a Response containing the HTML template with a small status/list fragment.
 *
 * The HTML template (`listHtml`) should contain `{{PATH}}` and `{{LIST}}` placeholders.
 *
 * @param status - HTTP status to return (200, 404, 403, etc.)
 * @param requestedPath - the path that was requested (used to replace {{PATH}} in template)
 * @returns Response containing HTML
 */
function errorPage(status: number): Response {
  logger.logMethodArgs?.('errorPage', {status});

  const fragments: Record<number | 'default', string> = {
    default: `
      <div class="item">
        <div class="name">
          <span class="icon">📭</span>
          An unexpected error occurred.
        </div>
        <div class="size">${status || 500}</div>
      </div>
    `,
    200: `
      <div class="item">
        <div class="name">
          <span class="icon">📭</span>
          This directory is empty
        </div>
        <div class="size">0 B</div>
      </div>
    `,
    404: `
      <div class="item">
        <div class="name">
          <span class="icon">⚠</span>
          The requested path was not found
        </div>
        <div class="size">404</div>
      </div>
    `,
    403: `
      <div class="item">
        <div class="name">
          <span class="icon">⛔</span>
          You do not have permission to access this resource
        </div>
        <div class="size">403</div>
      </div>
    `,
  };

  const fragment = fragments[status] ?? fragments.default;
  const html = listHtml.replace('{{LIST}}', fragment);

  return new Response(html, {
    status,
    headers: {
      ...defaultHeaders,
      'content-type': 'text/html;charset=utf-8',
    },
  });
}

/**
 * Serve a file at the given path using Bun.file(...) semantics.
 *
 * If the file does not exist, returns a 404 HTML page.
 *
 * @param fsPath - file system path to serve
 * @returns Response streaming the file or a 404 HTML response
 */
async function serveFile(fsPath: string): Promise<Response> {
  logger.logMethodArgs?.('serveFile', {fsPath});

  const fileObj = openFile(fsPath);
  // Bun's File-like object exposes .exists()
  if (!(await fileObj.exists())) {
    return errorPage(404);
  }
  // For binary responses use DEFAULT_HEADERS
  return new Response(fileObj, {
    status: 200,
    headers: {
      ...defaultHeaders,
      'content-type': 'application/octet-stream',
    },
  });
}

/**
 * Generate an index listing for a directory and return it as an HTML Response.
 *
 * Behavior:
 * - Skips entries that start with a dot (hidden files)
 * - For each entry uses stat() to get size and mtime
 * - Directories and files use different HTML snippets
 *
 * @param dirPath - path to a directory (should end with '/')
 * @returns Response with populated HTML page; 200 for listing, or 200 with "empty" fragment,
 *          or 404 if directory is missing
 */
async function listDirectory(dirPath: string): Promise<Response> {
  logger.logMethodArgs?.('listDirectory', {dirPath});

  if (!(await pathExists(dirPath))) {
    return errorPage(404);
  }

  const entries = await readDir(dirPath);
  let foldersHtml = '';
  let filesHtml = '';

  for (const name of entries) {
    // skip dotfiles and hidden entries
    if (name.startsWith('.')) continue;

    const candidatePath = pathJoin(dirPath, name);
    const fileObj = openFile(candidatePath);
    const stats = await fileObj.stat();
    const humanSize = formatBytes(stats.size);
    const mtimeStr = stats.mtime.toLocaleString('fa-IR', {
      calendar: 'persian',
      numberingSystem: 'latn',

      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

    if (stats.isDirectory()) {
      foldersHtml += `
        <a class="item folder" href="${name}/">
          <div class="name">
            <span class="icon">📁</span>
            ${name}
          </div>
          <div class="mtime">${mtimeStr}</div>
        </a>
      `;
    } else if (stats.isFile()) {
      filesHtml += `
        <a class="item file" href="${name}" download>
          <div class="name">
            <span class="icon">⬇</span>
            ${name}
          </div>
          <div class="mtime">${mtimeStr}</div>
          <div class="size">${humanSize}</div>
        </a>
      `;
    }
  }

  if (foldersHtml === '' && filesHtml === '') {
    return errorPage(200);
  }

  const combined = foldersHtml + filesHtml;
  const html = listHtml.replace('{{CLIPBOARD}}', savedClipboard).replace('{{LIST}}', combined);

  return new Response(html, {
    status: 200,
    headers: {
      ...defaultHeaders,
      'content-type': 'text/html;charset=utf-8',
    },
  });
}

let savedClipboard = '';
async function saveClipboard(request: Request): Promise<void> {
  logger.logMethod?.('saveClipboard');
  if (request.method.toUpperCase() !== 'POST') return;
  const formData = await request.formData();
  const text = formData.get('text');
  logger.logProperty?.('saveClipboard.text', text);
  savedClipboard = String(text ?? '');
}

async function saveUploadedFile(request: Request, path: string) {
  logger.logMethodArgs?.('saveUploadedFile', {path});
  if (request.method.toUpperCase() !== 'POST') return;
  const formData = await request.formData();
  const file = formData.get('file');
  if (!(file != null && typeof file === 'object' && file.name != null)) {
    logger.accident('saveUploadedFile', 'invalid_form_data', {file});
    return;
  }
  logger.logProperty?.('saveUploadedFile.file', file.name);
  await writeFile(pathJoin(path, file.name), file); // [!code ++]
}

/**
 * Start the HTTP server bound to 0.0.0.0 and the port specified by environment variable PORT.
 *
 * Behavior of the fetch handler:
 * - logs requests to console
 * - decodes URL path and joins it to '.' (project root)
 * - denies access to hidden files (basename starts with '.' and basename !== '.')
 * - if path ends with '/', returns a directory listing
 * - otherwise tries to serve the file
 */
function startServer(): void {
  const server = createServer({
    hostname: '0.0.0.0',
    port: env.PORT ? +env.PORT : 80,
    development: false,
    async fetch(request: Request) {
      const url = new URL(request.url);
      const pathname = decodeURI(url.pathname);
      const requestIp = server.requestIP(request)?.address ?? 'unknown';

      console.log('%s ↠ %s', requestIp, pathname);

      const fsPath = pathJoin(cwd, pathname);
      const base = pathBasename(fsPath);

      try {
        // Deny access to hidden base names like ".env" or ".git"
        if (base !== '.' && base.startsWith('.')) {
          return errorPage(403);
        }

        if (url.searchParams.has('clipboard')) {
          await saveClipboard(request);
        } else if (url.searchParams.has('upload')) {
          await saveUploadedFile(request, fsPath);
        }

        if (pathname.endsWith('/')) {
          return await listDirectory(fsPath);
        }

        return await serveFile(fsPath);
      } catch (err) {
        return errorPage(500);
      }
    },
  });

  const networks = Object.values(networkInterfaces()).flat() as NetworkInterfaceInfo[];
  const hasIPv4 = networks.filter(({family}) => family === 'IPv4');
  const address = hasIPv4.map((int) => `${server.protocol}://${int.address}:${server.port}`);
  console.log('Alwatr Fast File Server v2.0\nServe "%s/" on', cwd);
  console.log(address.join('\n'));
}

startServer();
