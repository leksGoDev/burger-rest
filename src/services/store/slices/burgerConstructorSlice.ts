import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Ingredient } from "../../../models/ingredient";

interface State {
    bun: Ingredient | null;
    ingredients: Ingredient[];
}

const initialState: State = {
    bun: null,
    ingredients: []
};

const burgerConstructorSlice = createSlice({
    name: 'burgerConstructor',
    initialState: initialState,
    reducers: {
        changeBun(state, action: PayloadAction<Ingredient>) {
            state.bun = action.payload;
        },
        addIngredient(state, action: PayloadAction<Ingredient>) {
            state.ingredients.push(action.payload);
        },
        removeIngredient(state, action: PayloadAction<number>) {
            const index = action.payload;
            state.ingredients = state.ingredients.filter((_, i) => i !== index);
        }
    }
});

export const { changeBun, addIngredient, removeIngredient } = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;