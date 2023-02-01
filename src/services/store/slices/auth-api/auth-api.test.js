import { rest } from "msw";
import { setupServer } from "msw/node";

import * as cookie from "../../../api/cookie";
import { HTTP_BASE_URL } from "../../../../constants/api";
import reducer, { BASE_URL, register, login, logout, fetchUser, patchUser, checkAuth } from "./auth-api";
import { store } from "../../index";

const userDataMock = {
    email: 'gan-96@yandex.ru',
    name: 'leksGo'
};

const handlers = [
    rest.post(`${HTTP_BASE_URL}${BASE_URL}/register`, (_, res, ctx) => {
        return res(
            ctx.json({
                success: true,
                user: userDataMock
            }),
            ctx.delay(150)
        );
    }),
    rest.post(`${HTTP_BASE_URL}${BASE_URL}/login`, (_, res, ctx) => {
        return res(
            ctx.json({
                success: true,
                user: userDataMock
            }),
            ctx.delay(150)
        );
    }),
    rest.post(`${HTTP_BASE_URL}${BASE_URL}/logout`, (_, res, ctx) => {
        return res(
            ctx.json({
                success: true,
                message: ""
            }),
            ctx.delay(150)
        );
    }),
    rest.post(`${HTTP_BASE_URL}${BASE_URL}/token`, (_, res, ctx) => {
        return res(
            ctx.json({ success: true })
        );
    }),
    rest.get(`${HTTP_BASE_URL}${BASE_URL}/user`, (_, res, ctx) => {
        return res(
            ctx.json({
                success: true,
                user: userDataMock
            }),
            ctx.delay(150)
        );
    }),
    rest.patch(`${HTTP_BASE_URL}${BASE_URL}/user`, (_, res, ctx) => {
        return res(
            ctx.json({
                success: true,
                user: userDataMock
            }),
            ctx.delay(150)
        );
    })
];
const server = setupServer(...handlers);

describe('auth api reducer', () => {
    beforeAll(() => server.listen());
    afterAll(() => server.close());
    afterEach(() => server.resetHandlers());

    it('should return the initial state', () => {
        expect(
            reducer(undefined, { type: undefined })
        ).toEqual({
            isLoading: false,
            hasError: false,
            user: null
        });
    });

    it('should check auth status', () => {
        const prevState = {
            isLoading: false,
            hasError: false,
            user: userDataMock
        };

        expect(
            reducer(prevState, checkAuth())
        ).toEqual({
            isLoading: false,
            hasError: false,
            user: null
        });

        jest.spyOn(cookie, "getCookie").mockImplementation(() => true);
        expect(
            reducer(prevState, checkAuth())
        ).toEqual({
            isLoading: false,
            hasError: false,
            user: userDataMock
        });
    });

    describe('register thunk', () => {
        it('should set pending status while awaiting', () => {
            const prevState = {
                isLoading: false,
                hasError: false,
                user: null
            };

            expect(
                reducer(prevState, { type: register.pending })
            ).toEqual({
                ...prevState,
                isLoading: true
            });
        });

        it('should set rejected status when failed', () => {
            const prevState = {
                isLoading: true,
                hasError: false,
                user: null
            };

            expect(
                reducer(prevState, { type: register.rejected })
            ).toEqual({
                ...prevState,
                hasError: true,
                isLoading: false
            });
        });

        it('should set fulfilled status and save user when completed', async () => {
            const registerBodyData = {
                ...userDataMock,
                password: "qwerty123"
            };
            const { type: actionType, payload: user } = await store.dispatch(
                register(registerBodyData)
            );

            expect(actionType).toBe("authApi/register/fulfilled");
            expect(user).toEqual(userDataMock);

            const state = store.getState().authApi;
            expect(state).toEqual({
                isLoading: false,
                hasError: false,
                user: userDataMock
            });
        });
    });

    describe('login thunk', () => {
        it('should set pending status while awaiting', () => {
            const prevState = {
                isLoading: false,
                hasError: false,
                user: null
            };

            expect(
                reducer(prevState, { type: login.pending })
            ).toEqual({
                ...prevState,
                isLoading: true
            });
        });

        it('should set rejected status when failed', () => {
            const prevState = {
                isLoading: true,
                hasError: false,
                user: null
            };

            expect(
                reducer(prevState, { type: login.rejected })
            ).toEqual({
                ...prevState,
                hasError: true,
                isLoading: false
            });
        });

        it('should set fulfilled status and save user when completed', async () => {
            const loginBodyData = {
                email: userDataMock.email,
                password: "qwerty123"
            };
            const { type: actionType, payload: user } = await store.dispatch(
                login(loginBodyData)
            );

            expect(actionType).toBe("authApi/login/fulfilled");
            expect(user).toEqual(userDataMock);

            const state = store.getState().authApi;
            expect(state).toEqual({
                isLoading: false,
                hasError: false,
                user: userDataMock
            });
        });
    });

    describe('logout thunk', () => {
        it('should set pending status while awaiting', () => {
            const prevState = {
                isLoading: false,
                hasError: false,
                user: userDataMock
            };

            expect(
                reducer(prevState, { type: logout.pending })
            ).toEqual({
                ...prevState,
                isLoading: true
            });
        });

        it('should set rejected status when failed', () => {
            const prevState = {
                isLoading: true,
                hasError: false,
                user: userDataMock
            };

            expect(
                reducer(prevState, { type: logout.rejected })
            ).toEqual({
                ...prevState,
                hasError: true,
                isLoading: false
            });
        });

        it('should set fulfilled status and clear user when completed', async () => {
            await store.dispatch(
                fetchUser()
            );
            let state = store.getState().authApi;
            expect(state).toEqual({
                isLoading: false,
                hasError: false,
                user: userDataMock
            });

            const { type } = await store.dispatch(
                logout()
            );

            expect(type).toBe("authApi/logout/fulfilled");
            state = store.getState().authApi;
            expect(state).toEqual({
                isLoading: false,
                hasError: false,
                user: null
            });
        });
    });

    describe('fetch user thunk', () => {
        it('should set pending status while awaiting', () => {
            const prevState = {
                isLoading: false,
                hasError: false,
                user: null
            };

            expect(
                reducer(prevState, { type: fetchUser.pending })
            ).toEqual({
                ...prevState,
                isLoading: true
            });
        });

        it('should set rejected status when failed', () => {
            const prevState = {
                isLoading: true,
                hasError: false,
                user: null
            };

            expect(
                reducer(prevState, { type: fetchUser.rejected })
            ).toEqual({
                ...prevState,
                hasError: true,
                isLoading: false
            });
        });

        it('should set fulfilled status and save user when completed', async () => {
            const { type: actionType, payload: user } = await store.dispatch(
                fetchUser()
            );

            expect(actionType).toBe("authApi/fetchUser/fulfilled");
            expect(user).toEqual(userDataMock);

            const state = store.getState().authApi;
            expect(state).toEqual({
                isLoading: false,
                hasError: false,
                user: userDataMock
            });
        });
    });

    describe('patch user thunk', () => {
        it('should set pending status while awaiting', () => {
            const prevState = {
                isLoading: false,
                hasError: false,
                user: null
            };

            expect(
                reducer(prevState, { type: patchUser.pending })
            ).toEqual({
                ...prevState,
                isLoading: true
            });
        });

        it('should set rejected status when failed', () => {
            const prevState = {
                isLoading: true,
                hasError: false,
                user: null
            };

            expect(
                reducer(prevState, { type: patchUser.rejected })
            ).toEqual({
                ...prevState,
                hasError: true,
                isLoading: false
            });
        });

        it('should set fulfilled status and update user when completed', async () => {
            const { type: actionType, payload: user } = await store.dispatch(
                patchUser({
                    ...userDataMock,
                    password: ""
                })
            );

            expect(actionType).toBe("authApi/patchUser/fulfilled");
            expect(user).toEqual(userDataMock);

            const state = store.getState().authApi;
            expect(state).toEqual({
                isLoading: false,
                hasError: false,
                user: userDataMock
            });
        });
    });
});