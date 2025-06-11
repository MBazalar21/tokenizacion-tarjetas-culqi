import { ICard } from '../../../core/interfaces/card/ICard';
import { ICardRepository} from '../../../core/interfaces/card/ICardRepository';
import { isMongooseValidationError } from '../../../domain/utils/typeGuards';
import { Card } from '../../../infrastructure/database/models/card';
import { BadRequestException } from '../../../infrastructure/exceptions/BadRequestException';
import { CreateCardDTO } from '../dtos/createCard.dto';

export class CreateCardService {
  constructor(private readonly cardRepo: ICardRepository) {}
  
  async execute(data: CreateCardDTO){   
    return this.cardRepo.save(data);
  }
}
