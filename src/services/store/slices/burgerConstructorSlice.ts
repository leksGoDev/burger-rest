import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Ingredient } from "../../../models/ingredient";

type Id = Ingredient["_id"];

interface State {
    bun: Id | null;
    ingredients: Id[];
}

const initialState: State = {
    bun: null,
    ingredients: []
};

const burgerConstructorSlice = createSlice({
    name: 'burgerConstructor',
    initialState: initialState,
    reducers: {
        changeBun(state, action: PayloadAction<Id | null>) {
            state.bun = action.payload;
        },
        addIngredient(state, action: PayloadAction<Id>) {
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