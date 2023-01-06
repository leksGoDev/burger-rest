import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IIngredient } from "../../../../models/ingredient";
import { SliceActions } from "../../../../models/redux";

type TIngredientDetails = Pick<IIngredient, "image_large" | "name" | "calories" | "proteins" | "fat" | "carbohydrates">;

interface IState {
    details: TIngredientDetails | null;
    hasDeallocated: boolean;
}

const initialState: IState = {
    details: null,
    hasDeallocated: false
};

const ingredientDetails = createSlice({
    name: 'ingredientDetails',
    initialState: initialState,
    reducers: {
        setDetails(state, action: PayloadAction<TIngredientDetails>) {
            state.details = { ...action.payload };
            state.hasDeallocated = false;
        },
        clearDetails(state) {
            state.details = null;
            state.hasDeallocated = true;
        }
    }
});

export const { setDetails, clearDetails } = ingredientDetails.actions;

export type TIngredientDetailsActions = SliceActions<typeof ingredientDetails.actions>;

export default ingredientDetails.reducer;