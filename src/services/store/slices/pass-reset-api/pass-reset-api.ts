import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { ICheckEmailBodyData, IPassResetBodyData, IPassResetResponse } from "../../../../models/api";
import { SliceActions } from "../../../../models/redux";
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

export const checkEmail = createAsyncThunk<void, ICheckEmailBodyData>(
    'passResetApi/checkEmail',
    async (data) => {
        const options = createOptionsWithJSON<ICheckEmailBodyData>("POST", data)
        await request<IPassResetResponse>(`${BASE_URL}/`, options);
    }
);

export const resetPassword = createAsyncThunk<void, IPassResetBodyData>(
    'passResetApi/resetPassword',
    async (data) => {
        const options = createOptionsWithJSON<IPassResetBodyData>("POST", data)
        await request<IPassResetResponse>(`${BASE_URL}/reset`, options);
    }
);

const passResetApi = createSlice({
    name: 'passResetApi',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(checkEmail.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(checkEmail.rejected, (state) => {
                state.hasError = true;
                state.isLoading = false;
            })
            .addCase(checkEmail.fulfilled, (state) => {
                state.hasError = false;
                state.isLoading = false;
                state.isMailSent = true;
            })

            .addCase(resetPassword.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(resetPassword.rejected, (state) => {
                state.hasError = true;
                state.isLoading = false;
            })
            .addCase(resetPassword.fulfilled, (state) => {
                state.hasError = false;
                state.isLoading = false;
                state.isMailSent = false;
            })
    }
});

export type TPassResetApiActions = SliceActions<typeof passResetApi.actions>;

export default passResetApi.reducer;