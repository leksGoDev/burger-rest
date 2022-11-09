import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AppDispatch } from "../../index";
import { Order } from "../../../../models/order";
import { Ingredient } from "../../../../models/ingredient";
import { OrderResponse, OrderBodyData } from "../../../../models/api";
import { createOptionsWithJSON, requestWithAuth } from "../../../api/request";

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

const orderDetailsApi = createSlice({
    name: 'orderDetailsApi',
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

const { loading, failed, received } = orderDetailsApi.actions;

export const { closeDetails } = orderDetailsApi.actions;

export const makeOrder = (ingredientsIds: Ingredient["_id"][]) => async (dispatch: AppDispatch) => {
    dispatch(loading());

    try {
        const options = createOptionsWithJSON<OrderBodyData>("POST", { ingredients: ingredientsIds });
        const { name, order } = await requestWithAuth<OrderResponse>('orders', options);
        dispatch(received({ order, name }));
    }
    catch (err) {
        dispatch(failed());
    }
};

export default orderDetailsApi.reducer;