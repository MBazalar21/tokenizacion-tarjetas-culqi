import { ICardRepository} from '../../../core/interfaces/card/ICardRepository';
import { CreateCardDTO } from '../dtos/createCard.dto';

export class CreateCardService {
  constructor(private readonly cardRepo: ICardRepository) {}
  
  async execute(data: CreateCardDTO){   
    return this.cardRepo.save(data);
  }
}
