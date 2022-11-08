import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AppDispatch } from "../../index";
import { Order } from "../../../../models/order";
import { Ingredient } from "../../../../models/ingredient";
import { OrderResponse } from "../../../../models/api";
import { request } from "../../../api/request";

interface State {
    isLoading: boolean;
    hasError: boolean;
    data: Order | null;
}

const initialState: State = {
    isLoading: false,
    hasError: false,
    data: null
};

const profileApi = createSlice({
    name: 'profileApi',
    initialState: initialState,
    reducers: {
        loading(state) {
            state.isLoading = true;
        },
        failed(state) {
            state.hasError = true;
            state.isLoading = false;
            state.data = null;
        },
        received(state, action: PayloadAction<Order>) {
            state.hasError = false;
            state.isLoading = false;
            state.data = action.payload;
        },
        closeDetails(state) {
            state.data = null;
        }
    }
});

const { loading, failed, received } = profileApi.actions;

export const { closeDetails } = profileApi.actions;

export const makeOrder = (ingredientsIds: Ingredient["_id"][]) => async (dispatch: AppDispatch) => {
    dispatch(loading());

    try {
        const requestBody = { ingredients: ingredientsIds };
        const { name, order, success } = await request<OrderResponse>('orders', requestBody);
        if (success) dispatch(received({ order, name }));
        else dispatch(failed());
    }
    catch (err) {
        dispatch(failed());
    }
};

export default profileApi.reducer;