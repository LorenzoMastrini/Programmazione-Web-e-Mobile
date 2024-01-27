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
    duration: number;
    purchaseMethodsAvailable: "buyOnly" | "rentOnly" | "both";
    comingSoon: boolean;
}