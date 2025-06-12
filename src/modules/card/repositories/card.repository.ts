// src/modules/user/repositories/user.repository.ts
import { ICardRepository } from '../../../core/interfaces/card/ICardRepository';
import { errorResponse } from '../../../domain/utils/errorResponse';
import { Card } from '../../../infrastructure/database/models/card';
import { CreateCardDTO } from '../dtos/createCard.dto';

export class CardRepository implements ICardRepository {

  async save(card: CreateCardDTO): Promise<any> {
    try {
      let newCard = new Card(card);
      await newCard.validate();
      newCard = await newCard.save()
      return newCard;
    } catch (error:any) {
      if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map((err: any) => err.message);
        return errorResponse(messages.join('. '),400);
      }
      return errorResponse('Error interno del servidor',500);
    }
  }
  async findByToken(token: string): Promise<any> {
    try {
      const card = await Card.findOne({tokenCulqi: token}).exec();
      if (!card) {
        return errorResponse(`Tarjeta con Token ${token} no encontrada.`,400);
      }
      return card;
    } catch (error:any) {
      console.error('Error al buscar tarjeta por Token:', error);
      const status = error.statusCode || 500;
      const message = error.message || 'Error interno del servidor';
      return errorResponse(message,status);
    }
  }
}
