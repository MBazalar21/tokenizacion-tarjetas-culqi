import { IncomingMessage, ServerResponse } from 'http';
import { createCardController } from './controllers/createCard.controller';

export const cardRoutes = (req: IncomingMessage, res: ServerResponse) => {
  try {
    if (req.method === 'POST' && req.url === '/card/tokens') {
      return createCardController(req, res);
    }
    
    res.statusCode = 405;
    res.end(JSON.stringify({ message: 'Método no permitido' }));
  } catch (error: any) {
    const status = error?.status || 500;
    const message = error?.message || 'Error interno del servidor';

    res.writeHead(status, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      success: false,
      error: message,
    }));
  }
};
