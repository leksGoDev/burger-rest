import { ITokenBodyData, IResponse as IApiResponse, ITokenResponse } from "../../models/api";
import { deleteTokens, getCookie, saveTokens } from "./cookie";

const BASE_URL = 'https://norma.nomoreparties.space/api/';

interface IAuthResponsePartial extends IApiResponse {
    accessToken?: string;
    refreshToken?: string;
}

export const createOptionsWithJSON = <TBodyData>(method: "POST" | "PATCH", bodyData: TBodyData): RequestInit => ({
    method,
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(bodyData)
});

const checkOk = (res: Response) => res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
const checkSuccess = (data: IApiResponse) => data.success ? data : Promise.reject(data);
const checkCookie = (data: IAuthResponsePartial) => {
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

export const requestWithAuth = async <TResponse>(url: string, options: any = {}): Promise<TResponse> => {
    try {
        const accessToken = getCookie("accessToken");
        if (!accessToken) {
            await Promise.reject();
        }

        options.headers = {
            ...options.headers,
            "Authorization": "Bearer " +  accessToken
        };

        return await request<TResponse>(url, options);
    }
    catch (_) {
        if (options.signal?.aborted) {
            return Promise.reject();
        }

        try {
            const token = getCookie("refreshToken") ?? "";
            const tokenOptions = createOptionsWithJSON<ITokenBodyData>("POST", { token });
            const { accessToken } = await request<ITokenResponse>("auth/token", tokenOptions);
            options.headers = {
                ...options.headers,
                "Authorization": accessToken
            };
        }
        catch (err) {
            deleteTokens();
            return Promise.reject(err);
        }

        return request<TResponse>(url, options);
    }
};