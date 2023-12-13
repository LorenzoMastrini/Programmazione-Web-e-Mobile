import { OrderStatus } from "../constants/order_status";

export interface OrderItem {
    id: number;
    film_id: number;
    rent: boolean;
    rent_days: number;
}

export interface Order {
    id: string;
    orderItems: OrderItem[];
    totalPrice: number;
    name: string;
    address: string;
    status: OrderStatus;
    userId: number;
    createdAt: string;
    updatedAt: string;
}