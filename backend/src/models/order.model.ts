import { OrderStatus } from "../constants/order_status";

export interface OrderItem {
    id: string;
    filmId: number;
    purchaseMethod: boolean;
    rentDays: number;
}

export interface Order {
    id: string;
    orderItems: string; //lista di id dei singoli elementi in un ordine
    totalPrice: number;
    name: string;
    address: string;
    status: OrderStatus;
    userId: number;
    createdAt: string;
    updatedAt: string;
}