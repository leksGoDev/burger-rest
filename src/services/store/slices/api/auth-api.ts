import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AppDispatch } from "../../index";
import { User, UserInfo } from "../../../../models/profile";
import {
    AuthResponse, LoginBodyData, LogoutBodyData,
    LogoutResponse, RegisterBodyData, UserResponse
} from "../../../../models/api";
import { createOptionsWithJSON, request, requestWithAuth } from "../../../api/request";
import { getCookie } from "../../../api/cookie";

interface State {
    isLoading: boolean;
    hasError: boolean;
    user: UserInfo | null;
}

const BASE_URL = 'auth';

const initialState: State = {
    isLoading: false,
    hasError: false,
    user: null
};

const authApi = createSlice({
    name: 'authApi',
    initialState: initialState,
    reducers: {
        loading(state) {
            state.isLoading = true;
        },
        failed(state) {
            state.hasError = true;
            state.isLoading = false;
        },
        received(state, action: PayloadAction<UserInfo | null>) {
            state.hasError = false;
            state.isLoading = false;
            state.user = action.payload;
        },
        reset(state) {
            state.user = null;
        }
    }
});

const { loading, failed, received, reset } = authApi.actions;

export const register = (email: string, password: string, name: string) => async (dispatch: AppDispatch) => {
    dispatch(loading());

    try {
        const options = createOptionsWithJSON<RegisterBodyData>("POST", { email, password, name });
        const { user } = await request<AuthResponse>(`${BASE_URL}/register`, options);
        dispatch(received(user));
    }
    catch (err) {
        dispatch(failed());
    }
};

export const login = (email: string, password: string) => async (dispatch: AppDispatch) => {
    dispatch(loading());

    try {
        const options = createOptionsWithJSON<LoginBodyData>("POST", { email, password });
        const { user } = await request<AuthResponse>(`${BASE_URL}/login`, options);
        dispatch(received(user));
    }
    catch (err) {
        dispatch(failed());
    }
};

export const logout = () => async (dispatch: AppDispatch) => {
    dispatch(loading());

    try {
        const token = getCookie("refreshToken") ?? "";
        const options = createOptionsWithJSON<LogoutBodyData>("POST", { token });
        await request<LogoutResponse>(`${BASE_URL}/login`, options);
        dispatch(received(null));
    }
    catch (err) {
        dispatch(failed());
    }
};

export const getUser = () => async (dispatch: AppDispatch) => {
    dispatch(loading());

    try {
        const { user } = await requestWithAuth<UserResponse>(`${BASE_URL}/user`);
        dispatch(received(user));
    } catch (err) {
        dispatch(failed());
    }
};

export const pathUser = (email: string, password: string, name: string) => async (dispatch: AppDispatch) => {
    dispatch(loading());

    try {
        const options = createOptionsWithJSON<User>("PATH", { email, password, name });
        const { user } = await requestWithAuth<UserResponse>(`${BASE_URL}/user`, options);
        dispatch(received(user));
    } catch (err) {
        dispatch(failed());
        dispatch(checkAuth());
    }
};

export const checkAuth = () => async (dispatch: AppDispatch) => {
    const accessToken = getCookie("accessToken");
    const refreshToken = getCookie("refreshToken");

    if (!accessToken && !refreshToken) {
        dispatch(reset());
    }
};

export default authApi.reducer;