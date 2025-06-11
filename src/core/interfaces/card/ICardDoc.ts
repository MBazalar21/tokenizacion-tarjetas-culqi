import * as mongoose from 'mongoose';

export interface ICardDoc  extends mongoose.Document {
    card_number: number;
    cvv: number;
    cardType: string;
    expiration_year: string;
    expiration_month: string;
    email: string;
    tokenCulqi?: string;
}
