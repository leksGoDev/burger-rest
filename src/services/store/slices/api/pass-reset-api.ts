import { createSlice } from "@reduxjs/toolkit";

import { AppDispatch } from "../../index";
import { CheckEmailBodyData, PassResetBodyData, PassResetResponse } from "../../../../models/api";
import { request } from "../../../api/request";

interface State {
    isLoading: boolean;
    hasError: boolean;
    isMessageSent: boolean;
}

const BASE_URL = "password-reset";

const initialState: State = {
    isLoading: false,
    hasError: false,
    isMessageSent: false
};

const passResetApi = createSlice({
    name: 'passResetApi',
    initialState: initialState,
    reducers: {
        loading(state) {
            state.isLoading = true;
        },
        failed(state) {
            state.hasError = true;
            state.isLoading = false;
        },
        sent(state) {
            state.hasError = false;
            state.isLoading = false;
            state.isMessageSent = true;
        },
        reset(state) {
            state.hasError = false;
            state.isLoading = false;
            state.isMessageSent = false;
        }
    }
});

const { loading, failed, sent, reset } = passResetApi.actions;

export const checkEmail = (email: string) => async (dispatch: AppDispatch) => {
    dispatch(loading());

    try {
        const bodyData = { email };
        const { success } = await request<PassResetResponse, CheckEmailBodyData>(`${BASE_URL}/`, bodyData);

        if (success) dispatch(sent());
        else dispatch(failed());
    }
    catch (err) {
        dispatch(failed());
    }
};

export const resetPassword = (password: string, token: string) => async (dispatch: AppDispatch) => {
    dispatch(loading());

    try {
        const bodyData = { password, token };
        const { success } = await request<PassResetResponse, PassResetBodyData>(`${BASE_URL}/reset`, bodyData);

        if (success) dispatch(reset())
        else dispatch(failed());
    }
    catch (err) {
        dispatch(failed());
    }
};

export default passResetApi.reducer;