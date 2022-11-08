type ICookieProps = { [key: string]: string };

export const setCookie = (props: ICookieProps = {}, maxAge: number = 14400) => {
    let cookie = "";
    Object.keys(props).forEach(key => {
        const value = encodeURIComponent(props[key]);
        cookie += `${key}=${value}; `;
    })

    cookie += `max-age=${maxAge}; `;
    document.cookie = cookie;
};

export const getCookieByName = (name: string) => {
    const matches = document.cookie.match(
        new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()\[\]\\\/+^])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
};