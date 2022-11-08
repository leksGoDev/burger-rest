const BASE_URL = 'https://norma.nomoreparties.space/api/';

const checkResponse = (res: Response) => res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

export const request = <TResponse, TBody = undefined>(url: string, bodyData?: TBody): Promise<TResponse> => {
    const options: RequestInit = bodyData ? {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(bodyData)
    } : {};

    return fetch(BASE_URL + url, options)
        .then(checkResponse)
        .then(data => data as TResponse)
        .catch(err => {
            console.log(err)

            return Promise.reject(err)
        });
};