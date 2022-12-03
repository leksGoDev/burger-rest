import { createSlice } from "@reduxjs/toolkit";

import { TAppDispatch } from "../../index";
import { ICheckEmailBodyData, IPassResetBodyData, IPassResetResponse } from "../../../../models/api";
import { createOptionsWithJSON, request } from "../../../api/request";

interface IState {
    isLoading: boolean;
    hasError: boolean;
    isMailSent: boolean;
}

const BASE_URL = "password-reset";

const initialState: IState = {
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

export const checkEmail = (email: string) => async (dispatch: TAppDispatch) => {
    dispatch(loading());

    try {
        const options = createOptionsWithJSON<ICheckEmailBodyData>("POST", { email })
        await request<IPassResetResponse>(`${BASE_URL}/`, options);
        dispatch(sent());
    }
    catch (err) {
        dispatch(failed());
    }
};

export const resetPassword = (password: string, token: string) => async (dispatch: TAppDispatch) => {
    dispatch(loading());

    try {
        const options = createOptionsWithJSON<IPassResetBodyData>("POST", { password, token })
        await request<IPassResetResponse>(`${BASE_URL}/reset`, options);
        dispatch(reset());
    }
    catch (err) {
        dispatch(failed());
    }
};

export default passResetApi.reducer;