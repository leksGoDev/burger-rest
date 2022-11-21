import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IIngredient } from "../../../models/ingredient";

type IIngredientDetails = Pick<IIngredient, "image_large" | "name" | "calories" | "proteins" | "fat" | "carbohydrates">;

interface IState {
    details: IIngredientDetails | null;
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
        setDetails(state, action: PayloadAction<IIngredientDetails>) {
            state.details = { ...action.payload };
            state.hasDeallocated = false;
        },
        deleteDetails(state) {
            state.details = null;
            state.hasDeallocated = true;
        }
    }
});

export const { setDetails, deleteDetails } = ingredientDetails.actions;

export default ingredientDetails.reducer;