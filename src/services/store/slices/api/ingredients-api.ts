import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Ingredient } from "../../../../models/ingredient";
import { IngredientsResponse } from "../../../../models/api";
import { AppDispatch } from "../../index";
import { request } from "../../../api/request";

interface State {
    isLoading: boolean;
    hasError: boolean;
    data: Ingredient[];
}

const initialState: State = {
    isLoading: false,
    hasError: false,
    data: [],
};

const ingredientsApi = createSlice({
    name: 'ingredientsApi',
    initialState: initialState,
    reducers: {
        loading(state) {
            state.isLoading = true;
        },
        failed(state) {
            state.hasError = true;
            state.isLoading = false;
            state.data = [];
        },
        received(state, action: PayloadAction<Ingredient[]>) {
            state.hasError = false;
            state.isLoading = false;
            state.data = action.payload;
        }
    }
});

const { loading, failed, received } = ingredientsApi.actions;

export const fetchIngredients = () => async (dispatch: AppDispatch) => {
    dispatch(loading());

    try {
        const { data, success } = await request<IngredientsResponse>('ingredients');
        if (success) dispatch(received(data));
        else dispatch(failed());
    }
    catch (err) {
        dispatch(failed());
    }
};

export default ingredientsApi.reducer;