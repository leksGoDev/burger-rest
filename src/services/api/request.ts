import { AuthResponse, Response as ApiResponse } from "../../models/api";
import { getCookie, saveTokens } from "./cookie";

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
    options.headers.Authorization = getCookie("accessToken");
    try {
        return request<TResponse>(url, options);
    }
    catch (_) {
        try {
            const refreshToken = getCookie("refreshToken");
            const tokenData = await request<AuthResponse>(`${BASE_URL}/auth/token`);
            options.headers.Authorization = tokenData.accessToken;
            return request<TResponse>(url, options);
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
};