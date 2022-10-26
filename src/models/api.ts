import { Ingredient } from "./ingredient";
import { Order } from "./order";

export interface IngredientsResponse {
    data: Ingredient[];
    success: boolean;
}

export interface OrderResponse extends Order {
    success: boolean;
}