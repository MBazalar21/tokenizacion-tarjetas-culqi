import { IncomingMessage, ServerResponse } from 'http';
import { CardService } from '../services/card.service';
import { CardRepository } from '../repositories/card.repository';

const service = new CardService(new CardRepository());
    
export const createCardController = (req: IncomingMessage, res: ServerResponse) => {
  try{
    let body = '';
    req.on('data', chunk => (body += chunk));
    req.on('end', async () => {
      const data = JSON.parse(body);
      const result:any= await service.createCard(data);
      if(result.statusCode && result.statusCode != 201){
        res.writeHead(result.statusCode, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify(result));
      }
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(result));
    });
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ message: 'Error interno del servidor' }));
  }
};
    
export const findCardController = async (req: IncomingMessage, res: ServerResponse,token: string) => {
 try {
    const result: any = await service.findCard(token);
    if (result.statusCode && result.statusCode !== 200) {
      res.writeHead(result.statusCode, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(result));
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(result));
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ message: 'Error interno del servidor' }));
  }
};
