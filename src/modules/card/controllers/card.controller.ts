import { IncomingMessage, ServerResponse } from 'http';
import { CardService } from '../services/card.service';
import { CardRepository } from '../repositories/card.repository';

const service = new CardService(new CardRepository());
    
export const createCardController = (req: IncomingMessage, res: ServerResponse) => {
  let body = '';
  req.on('data', chunk => (body += chunk));
  req.on('end', async () => {
    const data = JSON.parse(body);
    const result = await service.createCard(data);

    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(result));
  });
};
    
export const findCardController = async (req: IncomingMessage, res: ServerResponse,token: string) => {
  const result = await service.findCard(token);

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(result));

};
