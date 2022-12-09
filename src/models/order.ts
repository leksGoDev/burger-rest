import { IIngredient } from "./ingredient";

export interface IOrder {
    name: string;
    order: {
        number: number;
    };
}

export enum FeedOrderStatus {
    created = "created",
    pending = "pending",
    done = "done",
    cancelled = "cancelled"
}

export interface IFeedOrder {
    ingredients: IIngredient["_id"][];
    _id: string;
    status: FeedOrderStatus;
    name: string;
    number: string;
    createdAt: string;
    updatedAt: string;
}

export interface IFeedData {
    orders: IFeedOrder[];
    total: number;
    totalToday: number;
}