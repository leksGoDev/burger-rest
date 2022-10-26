const BASE_URL = 'https://norma.nomoreparties.space/api/';

const checkResponse = (res: Response) => res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

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
        .then(checkResponse)
        .then(data => data as TResponse)
        .catch(err => {
            console.log(err)

            return Promise.reject(err)
        });
};