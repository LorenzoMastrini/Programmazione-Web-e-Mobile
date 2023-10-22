export class Film {
    id!: string;
    name!: string;
    price!: number;
    tags?: string[];
    favorite!: boolean;
    stars!: number;
    imageUrl!: string;
    description!: string;
    director!: string;
    origins!: string[];
    year!: number;
    duration!: string;
}