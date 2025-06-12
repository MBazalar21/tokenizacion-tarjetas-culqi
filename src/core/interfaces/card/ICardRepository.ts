import { CreateCardDTO } from "../../../modules/card/dtos/createCard.dto";
import { ICard } from "./ICard";

export interface ICardRepository {
    save(card:CreateCardDTO): Promise<ICard>;
    findByToken(token:string): Promise<ICard>;
}