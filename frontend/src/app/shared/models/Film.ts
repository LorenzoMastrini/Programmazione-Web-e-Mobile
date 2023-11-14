export class Film {
    id!: string;
    name!: string;
    price!: number;
    price_rent!: number;
    genres?: string[];
    favorite!: boolean;
    stars!: number;
    imageUrl!: string;
    description!: string;
    director!: string;
    origins!: string[];
    year!: number;
    duration!: string;
    purchaseMethod!: string;
    fruitionMethod!: string;
}