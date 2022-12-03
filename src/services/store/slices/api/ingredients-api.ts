import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IIngredient } from "../../../../models/ingredient";
import { IIngredientsResponse } from "../../../../models/api";
import { TAppDispatch } from "../../index";
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
        received(state, action: PayloadAction<IIngredient[]>) {
            state.hasError = false;
            state.isLoading = false;
            state.data = action.payload;
        }
    }
});

const { loading, failed, received } = ingredientsApi.actions;

export const fetchIngredients = (signal: AbortController["signal"]) => async (dispatch: TAppDispatch) => {
    dispatch(loading());

    try {
        const { data } = await request<IIngredientsResponse>('ingredients', { signal });
        dispatch(received(data));
    }
    catch (err) {
        dispatch(failed());
    }
};

export default ingredientsApi.reducer;