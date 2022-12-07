import { IIngredient } from "./ingredient";

export interface INewOrder {
    name: string;
    order: {
        number: number;
    };
}

export enum OrderStatus {
    done = "done",
    pending = "pending"
}

export interface IOrder {
    ingredients: IIngredient["_id"][];
    _id: string;
    status: OrderStatus;
    name: string;
    number: string;
    createdAt: string;
    updatedAt: string;
}

export interface IFeedData {
    orders: IOrder[];
    total: number;
    totalToday: number;
}