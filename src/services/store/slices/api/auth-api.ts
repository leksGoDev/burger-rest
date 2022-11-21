import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { TAppDispatch } from "../../index";
import { IUser, TUserInfo } from "../../../../models/profile";
import {
    IAuthResponse, ILoginBodyData, ILogoutBodyData,
    ILogoutResponse, IRegisterBodyData, IUserResponse
} from "../../../../models/api";
import { createOptionsWithJSON, request, requestWithAuth } from "../../../api/request";
import { getCookie, deleteTokens } from "../../../api/cookie";

interface IState {
    isLoading: boolean;
    hasError: boolean;
    user: TUserInfo | null;
}

const BASE_URL = 'auth';

const initialState: IState = {
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
        received(state, action: PayloadAction<TUserInfo | null>) {
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

export const register = (email: string, password: string, name: string) => async (dispatch: TAppDispatch) => {
    dispatch(loading());

    try {
        const options = createOptionsWithJSON<IRegisterBodyData>("POST", { email, password, name });
        const { user } = await request<IAuthResponse>(`${BASE_URL}/register`, options);
        dispatch(received(user));
    }
    catch (err) {
        dispatch(failed());
    }
};

export const login = (email: string, password: string) => async (dispatch: TAppDispatch) => {
    dispatch(loading());

    try {
        const options = createOptionsWithJSON<ILoginBodyData>("POST", { email, password });
        const { user } = await request<IAuthResponse>(`${BASE_URL}/login`, options);
        dispatch(received(user));
    }
    catch (err) {
        dispatch(failed());
    }
};

export const logout = () => async (dispatch: TAppDispatch) => {
    dispatch(loading());

    try {
        const token = getCookie("refreshToken") ?? "";
        const options = createOptionsWithJSON<ILogoutBodyData>("POST", { token });
        await request<ILogoutResponse>(`${BASE_URL}/logout`, options);
        deleteTokens();
        dispatch(received(null));
    }
    catch (err) {
        dispatch(failed());
    }
};

export const fetchUser = (signal: AbortController["signal"]) => async (dispatch: TAppDispatch) => {
    dispatch(loading());

    try {
        const { user } = await requestWithAuth<IUserResponse>(`${BASE_URL}/user`, { signal });
        dispatch(received(user));
    } catch (err) {
        dispatch(failed());
    }
};

export const patchUser = (email: string, password: string, name: string) => async (dispatch: TAppDispatch) => {
    dispatch(loading());

    try {
        const options = createOptionsWithJSON<IUser>("PATCH", { email, password, name });
        const { user } = await requestWithAuth<IUserResponse>(`${BASE_URL}/user`, options);
        dispatch(received(user));
    } catch (err) {
        dispatch(failed());
        dispatch(checkAuth());
    }
};

export const checkAuth = () => async (dispatch: TAppDispatch) => {
    const accessToken = getCookie("accessToken");
    const refreshToken = getCookie("refreshToken");

    if (!accessToken && !refreshToken) {
        dispatch(reset());
    }
};

export default authApi.reducer;