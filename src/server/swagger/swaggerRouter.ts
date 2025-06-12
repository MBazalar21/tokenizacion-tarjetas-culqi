import { IncomingMessage, ServerResponse } from 'http';
import * as fs from 'fs';
import * as path from 'path';
import * as mime from 'mime-types';
import swaggerUiDist from 'swagger-ui-dist';

export const swaggerRouter = (req: IncomingMessage, res: ServerResponse) => {
  const url = req.url || '';
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (url === '/docs') {
    const htmlPath = path.join(__dirname, 'swagger.html');
    const html = fs.readFileSync(htmlPath, 'utf8');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    return res.end(html);
  }

  if (url === '/swagger.yaml') {
    const yamlPath = path.join(__dirname, 'swagger.yaml');
    const yaml = fs.readFileSync(yamlPath, 'utf8');
    res.writeHead(200, { 'Content-Type': 'application/x-yaml' });
    return res.end(yaml);
  }
  if (url === '/swagger-initializer.js') {
    const jsPath = path.join(__dirname, 'swagger-initializer.js');
    const js = fs.readFileSync(jsPath, 'utf8');
    res.writeHead(200, { 'Content-Type': 'application/javascript' });
    return res.end(js);
  }
  if (url?.startsWith('/swagger-ui/')) {
    const filePath = path.join(swaggerUiDist.getAbsoluteFSPath(), url.replace('/swagger-ui/', ''));
    if (fs.existsSync(filePath)) {
      const mimeType = mime.lookup(filePath) || 'application/octet-stream';
      res.writeHead(200, { 'Content-Type': mimeType });
      return fs.createReadStream(filePath).pipe(res);
    }
  }

  return false;
};
