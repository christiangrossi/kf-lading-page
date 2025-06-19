import { createServer } from 'http';
import { readFile } from 'fs/promises';
import path from 'path';
import url from 'url';

const port = process.env.PORT || 3000;
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const indexPath = path.join(__dirname, 'index.html');

const server = createServer(async (req, res) => {
  if (req.url === '/') {
    try {
      const data = await readFile(indexPath);
      res.setHeader('Content-Type', 'text/html');
      res.end(data);
    } catch {
      res.statusCode = 500;
      res.end('Erro interno');
    }
  } else {
    res.statusCode = 404;
    res.end('Not found');
  }
});

server.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
