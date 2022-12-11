import { ACCESS_TOKEN_MAX_AGE, REFRESH_TOKEN_MAX_AGE } from "../../constants/api";

const setCookie = (key: string, value: string, maxAge: number) => {
    value = encodeURIComponent(value);
    document.cookie = `${key}=${value}; max-age=${maxAge}`;
};

export const getCookie = (name: string) => {
    const matches = document.cookie.match(
        new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()\[\]\\\/+^])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
};

export const deleteCookie = (key: string) => setCookie(key, "", -1);

export const saveTokens = (accessToken: string, refreshToken: string) => {
    if (accessToken?.indexOf("Bearer") === 0) {
        const token = accessToken.split('Bearer ')[1];
        setCookie("accessToken", token, ACCESS_TOKEN_MAX_AGE);
    }
    if (refreshToken) {
        setCookie("refreshToken", refreshToken, REFRESH_TOKEN_MAX_AGE);
    }
};

export const deleteTokens = () => {
    deleteCookie("accessToken");
    deleteCookie("refreshToken");
};