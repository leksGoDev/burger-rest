import { IIngredient } from "./ingredient";
import { FeedOrderStatus } from "../constants/order";

export interface IOrder {
    name: string;
    order: {
        number: number;
    };
}

export interface IFeedOrder {
    _id: string;
    status: FeedOrderStatus;
    name: string;
    number: string;
    createdAt: string;
    updatedAt: string;
    ingredients: IIngredient["_id"][];
}

export interface IFeedOrderIngredient {
    details: Pick<IIngredient, "image" | "name" | "price">;
    count: number;
}

export interface IFeedData {
    orders: IFeedOrder[];
    total: number;
    totalToday: number;
}