import { IIngredient } from "./ingredient";
import { FeedOrderStatus } from "../constants/order";

export interface IOrderInfo {
    _id: string;
    status: FeedOrderStatus;
    name: string;
    number: number;
    createdAt: string;
    updatedAt: string;
}

interface INewOrderOwner {
    createdAt: string;
    email: string;
    name: string;
    updatedAt: string;
}

export interface INewOrder {
    name: string;
    order: IOrderInfo & {
        ingredients: IIngredient[];
        price: number;
        owner: INewOrderOwner;
    };
}

export interface IFeedOrder extends IOrderInfo {
    ingredients: IIngredient["_id"][];
}

export interface IOrder extends IFeedOrder {
    _v: number;
    owner: string;
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