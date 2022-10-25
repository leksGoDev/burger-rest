import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Ingredient } from "../../../models/ingredient";

interface State {
    bun: Ingredient | null;
    stuffing: Ingredient[];
}

const initialState: State = {
    bun: null,
    stuffing: []
};

const burgerConstructorSlice = createSlice({
    name: 'burgerConstructor',
    initialState: initialState,
    reducers: {
        changeBun(state, action: PayloadAction<Ingredient>) {
            state.bun = action.payload;
        },
        addStuffing(state, action: PayloadAction<Ingredient>) {
            state.stuffing.push(action.payload);
        },
        removeStuffing(state, action: PayloadAction<number>) {
            const index = action.payload;
            state.stuffing = state.stuffing.filter((_, i) => i !== index);
        }
    }
});

export const { changeBun, addStuffing, removeStuffing } = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;