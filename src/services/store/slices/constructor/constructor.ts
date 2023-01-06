import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuid } from 'uuid';

import { IIngredient, IDragIngredient } from "../../../../models/ingredient";
import { SliceActions } from "../../../../models/redux";

interface IState {
    bun: IIngredient | null;
    stuffing: IDragIngredient[];
}

interface ISwapPayload {
    dragIndex: number;
    hoverIndex: number;
}

const initialState: IState = {
    bun: null,
    stuffing: []
};

const burgerConstructor = createSlice({
    name: 'burgerConstructor',
    initialState: initialState,
    reducers: {
        changeBun(state, action: PayloadAction<IIngredient>) {
            state.bun = action.payload;
        },
        addStuffing: {
            reducer(state, action: PayloadAction<IDragIngredient>) {
                state.stuffing.push(action.payload);
            },
            prepare(ingredient: IIngredient) {
                return { payload: { dragId: uuid(), ...ingredient }}
            }
        },
        removeStuffing(state, action: PayloadAction<IDragIngredient["dragId"]>) {
            const dragId = action.payload;
            state.stuffing = state.stuffing.filter(entry => entry.dragId !== dragId);
        },
        swapStuffing(state, action: PayloadAction<ISwapPayload>) {
            const { dragIndex, hoverIndex } = action.payload;
            const dragElement = state.stuffing[dragIndex];
            state.stuffing.splice(dragIndex, 1, state.stuffing[hoverIndex]);
            state.stuffing.splice(hoverIndex, 1, dragElement);
        },
        clearConstructor(state) {
            state.bun = null;
            state.stuffing = [];
        }
    }
});

export const { changeBun, addStuffing, removeStuffing, swapStuffing, clearConstructor } = burgerConstructor.actions;

export type TBurgerConstructorActions = SliceActions<typeof burgerConstructor.actions>;

export default burgerConstructor.reducer;