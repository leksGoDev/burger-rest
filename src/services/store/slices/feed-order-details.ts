import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IIngredient } from "../../../models/ingredient";
import { IFeedOrder } from "../../../models/order";

interface IFeedOrderIngredient {
    details: Pick<IIngredient, "image" | "name" | "price">;
    count: number;
}

type TFeedOrderDetails = Omit<IFeedOrder, "_id" | "ingredients" | "updatedAt">
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
        setOrderDetails(state, action: PayloadAction<any>) {
            state.details = { ...action.payload };
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