import { IncomingMessage, ServerResponse } from 'http';
import { cardRoutes } from '../../modules/card/card.routes';

export const router = (req: IncomingMessage, res: ServerResponse) => {
  if (req.url?.startsWith('/card')) {
    return cardRoutes(req, res);
  }

  res.statusCode = 404;
  res.end(JSON.stringify({ message: 'Not Found' }));
};
