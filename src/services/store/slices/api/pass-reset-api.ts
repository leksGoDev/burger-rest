import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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

export const checkEmail = createAsyncThunk<void, ICheckEmailBodyData>(
    'passResetApi/checkEmail',
    async ({ email }) => {
        const options = createOptionsWithJSON<ICheckEmailBodyData>("POST", { email })
        await request<IPassResetResponse>(`${BASE_URL}/`, options);
    }
);

export const resetPassword = createAsyncThunk<void, IPassResetBodyData>(
    'passResetApi/resetPassword',
    async ({ password, token }) => {
        const options = createOptionsWithJSON<IPassResetBodyData>("POST", { password, token })
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

export default passResetApi.reducer;