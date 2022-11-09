import { AuthResponse, RefreshBodyData, Response as ApiResponse } from "../../models/api";
import { deleteTokens, getCookie, saveTokens } from "./cookie";

const BASE_URL = 'https://norma.nomoreparties.space/api/';

interface AuthResponsePartial extends ApiResponse {
    accessToken?: string;
    refreshToken?: string;
}

export const createOptionsWithJSON = <IBodyData>(method: "POST" | "PATH", bodyData: IBodyData): RequestInit => ({
    method,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyData)
});

const checkOk = (res: Response) => res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
const checkSuccess = (data: ApiResponse) => data.success ? data : Promise.reject(data);
const checkCookie = (data: AuthResponsePartial) => {
    const { accessToken, refreshToken } = data;
    if (accessToken && refreshToken) {
        saveTokens(accessToken, refreshToken)
    }

    return data;
};

export const request = <TResponse>(url: string, options?: RequestInit): Promise<TResponse> =>
    fetch(BASE_URL + url, options)
        .then(checkOk)
        .then(checkSuccess)
        .then(checkCookie)
        .then(data => data as TResponse);

export const requestWithAuth = async <TResponse>(url: string, options?: any): Promise<TResponse> => {
    options.headers.Authorization = "Bearer " + (getCookie("accessToken") ?? "");

    try {
        return request<TResponse>(url, options);
    }
    catch (_) {
        try {
            const token = getCookie("refreshToken") ?? "";
            const tokenOptions = createOptionsWithJSON<RefreshBodyData>("POST", { token });
            const { accessToken } = await request<AuthResponse>(`${BASE_URL}/auth/token`, tokenOptions);
            options.headers.Authorization = "Bearer " + accessToken;
        }
        catch (err) {
            deleteTokens();
            return Promise.reject(err);
        }

        return request<TResponse>(url, options);
    }
};