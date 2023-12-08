import { CartItem } from "./CartItem";

export class Order {
    id!: number;
    items!: CartItem[]; //posso inizializzarlo usando cart.items
    totalPrice!: number;
    name!: string;
    address!: string;
    paymentId!: string;
    createdAt!: string;
    status!: string;
}