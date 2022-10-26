import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Ingredient } from "../../../models/ingredient";

type IIngredientDetails = Pick<Ingredient, "image_large" | "name" | "calories" | "proteins" | "fat" | "carbohydrates">;

interface State {
    isDetailsVisible: boolean;
    details: IIngredientDetails;
}

const initialState: State = {
    isDetailsVisible: false,
    details: {} as IIngredientDetails
};

const ingredientDetailsSlice = createSlice({
    name: 'ingredientDetails',
    initialState: initialState,
    reducers: {
        openDetails(state, action: PayloadAction<IIngredientDetails>) {
            state.isDetailsVisible = true;
            state.details = { ...action.payload };
        },
        closeDetails(state) {
            state.isDetailsVisible = false;
            state.details = {} as IIngredientDetails;
        }
    }
});

export const { openDetails, closeDetails } = ingredientDetailsSlice.actions;

export default ingredientDetailsSlice.reducer;