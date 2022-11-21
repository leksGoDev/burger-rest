import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { TAppDispatch } from "../../index";
import { IOrder } from "../../../../models/order";
import { IIngredient } from "../../../../models/ingredient";
import { IOrderResponse, IOrderBodyData } from "../../../../models/api";
import { createOptionsWithJSON, requestWithAuth } from "../../../api/request";
import { checkAuth } from "./auth-api";

interface IState {
    isLoading: boolean;
    hasError: boolean;
    data: IOrder | null;
}

const initialState: IState = {
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
        received(state, action: PayloadAction<IOrder>) {
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

export const makeOrder = (ingredientsIds: IIngredient["_id"][]) => async (dispatch: TAppDispatch) => {
    dispatch(loading());

    try {
        const options = createOptionsWithJSON<IOrderBodyData>("POST", { ingredients: ingredientsIds });
        const { name, order } = await requestWithAuth<IOrderResponse>('orders', options);
        dispatch(received({ order, name }));
    }
    catch (err) {
        dispatch(failed());
        dispatch(checkAuth());
    }
};

export default orderDetailsApi.reducer;