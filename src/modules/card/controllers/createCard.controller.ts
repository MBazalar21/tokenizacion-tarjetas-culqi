import { IncomingMessage, ServerResponse } from 'http';
import { CreateCardService } from '../services/createCard.service';
import { CardRepository } from '../repositories/card.repository';

export const createCardController = (req: IncomingMessage, res: ServerResponse) => {
  let body = '';
  req.on('data', chunk => (body += chunk));
  req.on('end', async () => {
    const data = JSON.parse(body);
    const service = new CreateCardService(new CardRepository());
    const result = await service.execute(data);

    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(result));
  });
};
