import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IIngredient } from "../../../models/ingredient";
import { IFeedOrder, IFeedOrderIngredient } from "../../../models/order";

type TFeedOrderDetailsPayload = Omit<IFeedOrder, "_id" | "ingredients" | "updatedAt">
    & {
        totalCost: number;
        ingredients: (IIngredient | undefined)[]
    };

type TFeedOrderDetails = Omit<TFeedOrderDetailsPayload, "ingredients">
    & {
        ingredients: {
            [key: IIngredient["_id"]]: IFeedOrderIngredient;
        };
    };

interface IState {
    details: TFeedOrderDetails | null;
    hasDeallocated: boolean;
}

const initialState: IState = {
    details: null,
    hasDeallocated: false
};

const feedOrderDetails = createSlice({
    name: 'feedOrderDetails',
    initialState: initialState,
    reducers: {
        setOrderDetails(state, action: PayloadAction<TFeedOrderDetailsPayload>) {
            const { status, name, number, createdAt, totalCost, ingredients } = action.payload;
            const ingredientsDetails = {} as TFeedOrderDetails["ingredients"];

            for (const ingredient of ingredients) {
                if (ingredient) {
                    const { _id, image, price, name } = ingredient;
                    if (ingredientsDetails.hasOwnProperty(_id)) {
                        ingredientsDetails[_id].count++;
                    } else {
                        ingredientsDetails[_id] = {
                            count: 1,
                            details: { image, price, name }
                        };
                    }
                }
            }

            state.details = { status, name, number, createdAt, totalCost, ingredients: ingredientsDetails };
            state.hasDeallocated = false;
        },
        deleteOrderDetails(state) {
            state.details = null;
            state.hasDeallocated = true;
        }
    }
});

export const { setOrderDetails, deleteOrderDetails } = feedOrderDetails.actions;

export default feedOrderDetails.reducer;