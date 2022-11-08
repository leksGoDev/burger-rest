type ICookieProps = { [key: string]: string };


export const saveTokens = (accessToken: string, refreshToken: string) => {
    if (accessToken?.indexOf("Bearer") === 0) {
        const token = accessToken.split('Bearer ')[1];
        setCookie("accessToken", token, 1200);
    }
    if (refreshToken) {
        setCookie("refreshToken", refreshToken, 14400);
    }
};

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