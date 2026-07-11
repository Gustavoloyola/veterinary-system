import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize } from 'node:path';

const port = Number(process.env.PORT ?? 4200);
const publicDirectory = join(process.cwd(), 'public');

const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.ico': 'image/x-icon',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
};

function sendFile(filePath, response) {
  const extension = extname(filePath).toLowerCase();

  response.writeHead(200, {
    'Content-Type': contentTypes[extension] ?? 'application/octet-stream',
    'Cache-Control':
      extension === '.html'
        ? 'no-cache'
        : 'public, max-age=31536000, immutable'
  });

  createReadStream(filePath).pipe(response);
}

const server = createServer((request, response) => {
  const requestUrl = new URL(
    request.url ?? '/',
    `http://${request.headers.host ?? 'localhost'}`
  );

  let pathname = decodeURIComponent(requestUrl.pathname);

  if (pathname === '/') {
    pathname = '/index.html';
  }

  const relativePath = normalize(pathname).replace(/^(\.\.[/\\])+/, '');
  const requestedFile = join(publicDirectory, relativePath);

  if (
    existsSync(requestedFile) &&
    statSync(requestedFile).isFile()
  ) {
    sendFile(requestedFile, response);
    return;
  }

  // Angular SPA fallback para rutas como /login, /owners y /pets.
  const indexFile = join(publicDirectory, 'index.html');

  if (existsSync(indexFile)) {
    sendFile(indexFile, response);
    return;
  }

  response.writeHead(404, {
    'Content-Type': 'text/plain; charset=utf-8'
  });
  response.end('Frontend no encontrado.');
});

server.listen(port, '0.0.0.0', () => {
  console.log(`Veterinary frontend listening on port ${port}`);
});
