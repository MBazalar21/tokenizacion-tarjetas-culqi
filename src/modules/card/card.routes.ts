import { IncomingMessage, ServerResponse } from 'http';
import { createCardController, findCardController } from './controllers/card.controller';

export const cardRoutes = (req: IncomingMessage, res: ServerResponse) => {
    if (req.method === 'POST' && req.url === '/card/tokens') {
      return createCardController(req, res);
    }
    if (req.method === 'GET' && req.url?.startsWith('/card/find/')) {
      const token = req.url.split('/').pop();
      return findCardController(req, res, token!);
    }
    
    res.statusCode = 405;
    res.end(JSON.stringify({ message: 'Método no permitido' }));
};
