import { IncomingMessage, ServerResponse } from 'http';
import { EventEmitter } from 'events';

export function invokeController(controller: Function, method: string, path: string, body: any): Promise<{ statusCode: number, data: any }> {
  const req = new EventEmitter() as IncomingMessage;
  const res = new ServerResponse(req);

  req.method = method;
  req.url = path;

  const chunks: any[] = [];
  const bodyString = JSON.stringify(body);

  const resultPromise = new Promise<{ statusCode: number, data: any }>((resolve) => {
    res.end = ((chunk?: any) => {
      if (chunk) chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
      const raw = Buffer.concat(chunks).toString();
      const data = raw ? JSON.parse(raw) : {};
      resolve({ statusCode: res.statusCode, data });
      return res;
    }) as any;
  });

  controller(req, res);
  req.emit('data', bodyString);
  req.emit('end');

  return resultPromise;
}
