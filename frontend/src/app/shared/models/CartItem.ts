import { Film } from "./Film";

export class CartItem {
    //il modificatore inizializza la proprietà film della classe
    constructor(public film:Film)  { }

    purchaseMethod: 'Acquisto' | 'Noleggio' = 'Acquisto'; //default impostato su acquisto
    rentDays: number = 0; //default a zero perché l'opzione iniziale è l'acquisto del film
    totalArticlePrice: number = this.film.price; //quindi il prezzo è quello intero
}