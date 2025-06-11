// src/modules/user/repositories/user.repository.ts
import { ICardRepository } from '../../../core/interfaces/card/ICardRepository';
import { Card } from '../../../infrastructure/database/models/card';
import { CreateCardDTO } from '../dtos/createCard.dto';

export class CardRepository implements ICardRepository {

  async save(card: CreateCardDTO): Promise<any> {
    try {
      let newCard = new Card(card);
      await newCard.validate();
      newCard = await newCard.save()
      console.log('Datos a guardar', newCard);
      return newCard;
    } catch (error) {
      console.error('Error al guardar la tarjeta:', error);
      throw error;
    }
  }
}
