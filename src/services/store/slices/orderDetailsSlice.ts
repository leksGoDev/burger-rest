import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AppDispatch } from "../index";
import { Order } from "../../../models/order";
import { Ingredient } from "../../../models/ingredient";
import { OrderResponse } from "../../../models/api";
import { request } from "../../request";

interface State {
    isDetailsVisible: boolean;
    isLoading: boolean;
    hasError: boolean;
    data: Order;
}

const initialState: State = {
    isDetailsVisible: false,
    isLoading: false,
    hasError: false,
    data: {} as Order
};

const orderDetailsSlice = createSlice({
    name: 'orderDetails',
    initialState: initialState,
    reducers: {
        loading(state) {
            state.isLoading = true;
        },
        failed(state) {
            state.hasError = true;
            state.isLoading = false;
            state.data = {} as Order;
        },
        received(state, action: PayloadAction<Order>) {
            state.hasError = false;
            state.isLoading = false;
            state.data = action.payload;
            state.isDetailsVisible = true;
        },
        closeDetails(state) {
            state.isDetailsVisible = false;
            state.data = {} as Order;
        }
    }
});

const { loading, failed, received } = orderDetailsSlice.actions;

export const { closeDetails } = orderDetailsSlice.actions;

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

export default orderDetailsSlice.reducer;