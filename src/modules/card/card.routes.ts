import { IncomingMessage, ServerResponse } from 'http';
import { createCardController } from './controllers/createCard.controller';

export const cardRoutes = (req: IncomingMessage, res: ServerResponse) => {
    if (req.method === 'POST' && req.url === '/card/tokens') {
      return createCardController(req, res);
    }
    
    res.statusCode = 405;
    res.end(JSON.stringify({ message: 'Método no permitido' }));
};
