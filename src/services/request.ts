const BASE_URL = 'https://norma.nomoreparties.space/api/';

export const request = <TResponse>(url: string, body?: { ingredients: string[]}): Promise<TResponse> => {
    const options: RequestInit = {};
    if (!!body?.ingredients?.length) {
        options.method = 'POST';
        options.headers = {
            "Content-Type": "application/json",
        };
        options.body = JSON.stringify(body);
    }

    return fetch(BASE_URL + url, options)
        .then(res => res.json())
        .then(data => data as TResponse);
};