export class Film {
    id!: string;
    name!: string;
    price!: number;
    priceRent!: number;
    genres?: string[];
    favorite!: boolean;
    score!: number;
    imageUrl!: string;
    plot!: string;
    director!: string;
    country!: string[];
    year!: number;
    duration!: string;
    rentable!: number; //*ngIf con i booleani non funziona quindi: true=1 e false=0
    //fruitionMethod!: string;
}