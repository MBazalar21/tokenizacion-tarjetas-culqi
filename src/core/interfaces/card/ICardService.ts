export interface ICardService {
    [x: string]: any;
    card_number: number;
    cvv: number;
    cardType: string;
    expiration_year: string;
    expiration_month: string;
    email: string;
    tokenCulqi?: string;
}
