export interface CreateCardDTO {
    card_number: number;
    cvv: number;
    expiration_year: string;
    expiration_month: string;
    email: string;
}