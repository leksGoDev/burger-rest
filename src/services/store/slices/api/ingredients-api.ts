import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { IIngredient } from "../../../../models/ingredient";
import { IIngredientsResponse } from "../../../../models/api";
import { SliceActions } from "../../../../models/redux";
import { request } from "../../../api/request";

interface IState {
    isLoading: boolean;
    hasError: boolean;
    data: IIngredient[];
}

const initialState: IState = {
    isLoading: false,
    hasError: false,
    data: [],
};

export const fetchIngredients = createAsyncThunk<IIngredient[], AbortController["signal"]>(
    'ingredientsApi/fetchIngredients',
    async (signal) => {
        const { data } = await request<IIngredientsResponse>('ingredients', { signal });

        return data;
    }
);

const ingredientsApi = createSlice({
    name: 'ingredientsApi',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchIngredients.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchIngredients.rejected, (state) => {
                state.hasError = true;
                state.isLoading = false;
                state.data = [];
            })
            .addCase(fetchIngredients.fulfilled, (state, action) => {
                state.hasError = false;
                state.isLoading = false;
                state.data = action.payload;
            })
    }
});

export type TIngredientsApiActions = SliceActions<typeof ingredientsApi.actions>;

export default ingredientsApi.reducer;