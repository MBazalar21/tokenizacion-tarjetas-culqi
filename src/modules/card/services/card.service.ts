import { ICardRepository} from '../../../core/interfaces/card/ICardRepository';
import { errorResponse } from '../../../domain/utils/errorResponse';
import { CreateCardDTO } from '../dtos/createCard.dto';
import { validateToken } from '../../../domain/utils/secureToken';

export class CardService {
  constructor(private readonly cardRepo: ICardRepository) {}
  
  async createCard(data: CreateCardDTO){   
    return this.cardRepo.save(data);
  }
  
  async findCard(token: string){
    if(token.startsWith('pk_test_')){
      let tokenRecep = token.split('pk_test_').pop();
      if(tokenRecep?.length !== 16){
        return errorResponse('El token no contiene la cantidad necesaria de caracteres.',400)
      }
      const validateTimeToken = await validateToken(tokenRecep);
      if(!validateTimeToken){
        return errorResponse('El token expiro en tiempo de consulta.',400)
      }
    }else{
      return errorResponse('El token no cuenta con la estructura correcta.',400)
    }
    const card = await this.cardRepo.findByToken(token);
    
    return {
        card_number: card.card_number,
        cardType: card.cardType,
        expiration_month: card.expiration_month,
        expiration_year: card.expiration_year
    };
  }
}
