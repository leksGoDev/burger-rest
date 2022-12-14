import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {INewOrder, IOrder, IOrderInfo} from "../../../../models/order";
import { IFindOrderResponse, INewOrderResponse, IOrderBodyData } from "../../../../models/api";
import { SliceActions } from "../../../../models/redux";
import { createOptionsWithJSON, requestWithAuth } from "../../../api/request";

interface IState {
    isLoading: boolean;
    hasError: boolean;
    hasDeallocated: boolean;
    orderNumber: IOrderInfo["number"] | null;
}

const initialState: IState = {
    isLoading: false,
    hasError: false,
    hasDeallocated: false,
    orderNumber: null
};

export const makeOrder = createAsyncThunk<INewOrder, IOrderBodyData>(
    'orderDetailsApi/makeOrder',
    async (data) => {
        const options = createOptionsWithJSON<IOrderBodyData>("POST", data);
        const { order, name } = await requestWithAuth<INewOrderResponse>('orders', options);

        return ({ name, order });
    }
);

export const findOrder = createAsyncThunk<IOrder[], INewOrder["order"]["number"]>(
    'orderDetailsApi/findOrder',
    async (orderNumber) => {
        const { orders } = await requestWithAuth<IFindOrderResponse>(`orders/${orderNumber}`);

        return orders;
    }
);

const orderDetailsApi = createSlice({
    name: 'orderDetailsApi',
    initialState: initialState,
    reducers: {
        clearDetails(state) {
            state.orderNumber = null;
            state.hasDeallocated = true;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(makeOrder.pending, (state) => {
                state.isLoading = true;
                state.hasDeallocated = false;
            })
            .addCase(makeOrder.rejected, (state) => {
                state.hasError = true;
                state.isLoading = false;
                state.orderNumber = null;
            })
            .addCase(makeOrder.fulfilled, (state, action) => {
                const newOrder = action.payload;

                state.hasError = false;
                state.isLoading = false;
                state.orderNumber = newOrder.order.number;
            })

            .addCase(findOrder.pending, (state) => {
                state.isLoading = true;
                state.hasDeallocated = false;
            })
            .addCase(findOrder.rejected, (state) => {
                state.hasError = true;
                state.isLoading = false;
                state.orderNumber = null;
            })
            .addCase(findOrder.fulfilled, (state, action) => {
                const orders = action.payload;

                state.hasError = false;
                state.isLoading = false;
                state.orderNumber = orders[0].number;
            })
    }
});

export const { clearDetails } = orderDetailsApi.actions;

export type TOrderDetailsApiActions = SliceActions<typeof orderDetailsApi.actions>;

export default orderDetailsApi.reducer;