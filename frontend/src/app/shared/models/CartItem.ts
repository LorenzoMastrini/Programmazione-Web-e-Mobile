import { Film } from "./Film";

export class CartItem {
    //il modificatore inizializza la proprietà film della classe
    constructor(public film:Film)  { }

    purchaseMethod: 'Acquisto' | 'Noleggio' = 'Acquisto'; //default impostato su acquisto
    totalArticlePrice: number = this.film.price; //quindi il prezzo è quello intero
}