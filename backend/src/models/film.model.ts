export interface Film {
    id: string;
    name: string;
    price: number;
    price_rent: number;
    genres: string[];
    favorite: boolean;
    stars: number;
    imageUrl: string;
    description: string;
    director: string;
    origins: string[];
    year: number;
    duration: string;
    rent: number; //*ngIf con i booleani non funziona quindi: true=1 e false=0
    fruitionMethod: string;
}