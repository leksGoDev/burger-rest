import { Ingredient } from "./ingredient";

export interface IngredientsResponse {
    data: Ingredient[];
    success: boolean;
}

export interface OrderResponse {
    name: string;
    order: {
        number: number;
    };
    success: boolean;
}