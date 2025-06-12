import { IncomingMessage, ServerResponse } from 'http';
import { cardRoutes } from '../../modules/card/card.routes';
import { swaggerRouter } from '../../server/swagger/swaggerRouter';

export const router = (req: IncomingMessage, res: ServerResponse) => {
  if (swaggerRouter(req, res)) return;
  
  if (req.url?.startsWith('/card')) {
    return cardRoutes(req, res);
  }

  res.statusCode = 404;
  res.end(JSON.stringify({ message: 'Not Found' }));
};
