import { CartItem } from "../models/CartItem";

export interface INewOrder {
    orderItems: CartItem[]; //posso inizializzarlo usando cart.items
    totalPrice: number;
    userId: number;
    name: string;
    address: string
}