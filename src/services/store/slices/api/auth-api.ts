import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

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

export const register = createAsyncThunk<TUserInfo, IUser>(
    'authApi/register',
    async ({ email, password, name }) => {
        const options = createOptionsWithJSON<IRegisterBodyData>("POST", { email, password, name });
        const { user } = await request<IAuthResponse>(`${BASE_URL}/register`, options);

        return user;
    }
);

export const login = createAsyncThunk<TUserInfo, Omit<IUser, "name">>(
    'authApi/login',
    async ({ email, password}) => {
        const options = createOptionsWithJSON<ILoginBodyData>("POST", { email, password });
        const { user } = await request<IAuthResponse>(`${BASE_URL}/login`, options);

        return user;
    }
);

export const logout = createAsyncThunk(
    'authApi/logout',
    async () => {
        const token = getCookie("refreshToken") ?? "";
        const options = createOptionsWithJSON<ILogoutBodyData>("POST", { token });
        await request<ILogoutResponse>(`${BASE_URL}/logout`, options);
        deleteTokens();
    }
);

export const fetchUser = createAsyncThunk<TUserInfo, AbortController["signal"]>(
    'authApi/fetchUser',
    async (signal) => {
        const { user } = await requestWithAuth<IUserResponse>(`${BASE_URL}/user`, { signal });

        return user;
    }
);

export const patchUser = createAsyncThunk<TUserInfo, IUser>(
    'authApi/patchUser',
    async ({ email, password, name }) => {
        const options = createOptionsWithJSON<IUser>("PATCH", { email, password, name });
        const { user } = await requestWithAuth<IUserResponse>(`${BASE_URL}/user`, options);

        return user;
    }
);

const authApi = createSlice({
    name: 'authApi',
    initialState: initialState,
    reducers: {
        checkAuth:  {
            reducer(state, action: PayloadAction<boolean>) {
                if (action.payload) {
                    state.user = null;
                }
            },
            prepare() {
                const accessToken = getCookie("accessToken");
                const refreshToken = getCookie("refreshToken");

                return { payload: !accessToken && !refreshToken };
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.rejected, (state) => {
                state.hasError = true;
                state.isLoading = false;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.hasError = false;
                state.isLoading = false;
                state.user = action.payload;
            })

            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.rejected, (state) => {
                state.hasError = true;
                state.isLoading = false;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.hasError = false;
                state.isLoading = false;
                state.user = action.payload;
            })

            .addCase(logout.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(logout.rejected, (state) => {
                state.hasError = true;
                state.isLoading = false;
            })
            .addCase(logout.fulfilled, (state) => {
                state.hasError = false;
                state.isLoading = false;
                state.user = null;
            })

            .addCase(fetchUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchUser.rejected, (state) => {
                state.hasError = true;
                state.isLoading = false;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.hasError = false;
                state.isLoading = false;
                state.user = action.payload;
            })

            .addCase(patchUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(patchUser.rejected, (state) => {
                state.hasError = true;
                state.isLoading = false;
            })
            .addCase(patchUser.fulfilled, (state, action) => {
                state.hasError = false;
                state.isLoading = false;
                state.user = action.payload;
            });
    }
});

export const { checkAuth } = authApi.actions;

export default authApi.reducer;