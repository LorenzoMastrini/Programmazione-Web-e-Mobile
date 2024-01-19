export interface IOrderItem {
    film: number;
    purchaseMethod: 'Acquisto' | 'Noleggio'; //default impostato su acquisto
    rentDays: number; //default a zero perché l'opzione iniziale è l'acquisto del film
    totalArticlePrice: number; //quindi il prezzo è quello intero
}