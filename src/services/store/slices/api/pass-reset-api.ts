import { createSlice } from "@reduxjs/toolkit";

import { AppDispatch } from "../../index";
import { CheckEmailBodyData, PassResetBodyData, PassResetResponse } from "../../../../models/api";
import { createOptionsWithJSON, request } from "../../../api/request";

interface State {
    isLoading: boolean;
    hasError: boolean;
    isMailSent: boolean;
}

const BASE_URL = "password-reset";

const initialState: State = {
    isLoading: false,
    hasError: false,
    isMailSent: false
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
            state.isMailSent = true;
        },
        reset(state) {
            state.hasError = false;
            state.isLoading = false;
            state.isMailSent = false;
        }
    }
});

const { loading, failed, sent, reset } = passResetApi.actions;

export const checkEmail = (email: string) => async (dispatch: AppDispatch) => {
    dispatch(loading());

    try {
        const options = createOptionsWithJSON<CheckEmailBodyData>("POST", { email })
        await request<PassResetResponse>(`${BASE_URL}/`, options);
        dispatch(sent());
    }
    catch (err) {
        dispatch(failed());
    }
};

export const resetPassword = (password: string, token: string) => async (dispatch: AppDispatch) => {
    dispatch(loading());

    try {
        const options = createOptionsWithJSON<PassResetBodyData>("POST", { password, token })
        await request<PassResetResponse>(`${BASE_URL}/reset`, options);
        dispatch(reset());
    }
    catch (err) {
        dispatch(failed());
    }
};

export default passResetApi.reducer;