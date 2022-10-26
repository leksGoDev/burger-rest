import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuid } from 'uuid';

import { Ingredient, DragIngredient } from "../../../models/ingredient";

interface State {
    bun: Ingredient | null;
    stuffing: DragIngredient[];
}

interface SwapPayload {
    dragIndex: number;
    hoverIndex: number;
}

const initialState: State = {
    bun: null,
    stuffing: []
};

const burgerConstructorSlice = createSlice({
    name: 'burgerConstructor',
    initialState: initialState,
    reducers: {
        changeBun(state, action: PayloadAction<Ingredient | null>) {
            state.bun = action.payload;
        },
        addStuffing(state, action: PayloadAction<Ingredient>) {
            state.stuffing.push({ dragId: uuid(), ...action.payload});
        },
        removeStuffing(state, action: PayloadAction<DragIngredient["dragId"]>) {
            const dragId = action.payload;
            state.stuffing = state.stuffing.filter(entry => entry.dragId !== dragId);
        },
        swapStuffing(state, action: PayloadAction<SwapPayload>) {
            const { dragIndex, hoverIndex } = action.payload;
            const dragElement = state.stuffing[dragIndex];
            state.stuffing.splice(dragIndex, 1, state.stuffing[hoverIndex]);
            state.stuffing.splice(hoverIndex, 1, dragElement);
        }
    }
});

export const { changeBun, addStuffing, removeStuffing, swapStuffing } = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;