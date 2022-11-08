import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Ingredient } from "../../../models/ingredient";

type IIngredientDetails = Pick<Ingredient, "image_large" | "name" | "calories" | "proteins" | "fat" | "carbohydrates">;

interface State {
    details: IIngredientDetails | null;
}

const initialState: State = {
    details: null
};

const ingredientDetails = createSlice({
    name: 'ingredientDetails',
    initialState: initialState,
    reducers: {
        openDetails(state, action: PayloadAction<IIngredientDetails>) {
            state.details = { ...action.payload };
        },
        closeDetails(state) {
            state.details = null;
        }
    }
});

export const { openDetails, closeDetails } = ingredientDetails.actions;

export default ingredientDetails.reducer;