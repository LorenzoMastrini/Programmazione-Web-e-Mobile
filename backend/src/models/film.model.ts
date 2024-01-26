export interface Film {
    id: string;
    name: string;
    price: number;
    priceRent: number;
    genres: string[];
    favorite: boolean;
    score: number;
    imageUrl: string;
    plot: string;
    director: string;
    country: string;
    year: number;
    duration: string;
    purchaseMethodsAvailable: "buyOnly" | "rentOnly" | "both";
}