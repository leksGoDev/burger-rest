import { rest } from "msw";
import { setupServer } from "msw/node";

import { HTTP_BASE_URL } from "../../../../constants/api";
import reducer, { checkEmail, resetPassword, BASE_URL } from "./pass-reset-api";
import { store } from "../../index";

const handlers = [
    rest.post(`${HTTP_BASE_URL}${BASE_URL}/`, (_, res, ctx) => {
        return res(
            ctx.json({
                success: true,
                message: ""
            }),
            ctx.delay(150)
        );
    }),
    rest.post(`${HTTP_BASE_URL}${BASE_URL}/reset`, (_, res, ctx) => {
        return res(
            ctx.json({
                success: true,
                message: ""
            }),
            ctx.delay(150)
        );
    })
];
const server = setupServer(...handlers);

describe('pass reset api reducer', () => {
    beforeAll(() => server.listen());
    afterAll(() => server.close());
    afterEach(() => server.resetHandlers());

    it('should return the initial state', () => {
        expect(
            reducer(undefined, { type: undefined })
        ).toEqual({
            isLoading: false,
            hasError: false,
            isMailSent: false
        });
    });

    describe('check email thunk', () => {
        it('should set pending status while awaiting', () => {
            const prevState = {
                isLoading: false,
                hasError: false,
                isMailSent: false
            };

            expect(
                reducer(prevState, { type: checkEmail.pending })
            ).toEqual({
                ...prevState,
                isLoading: true
            });
        });

        it('should set rejected status when failed', () => {
            const prevState = {
                isLoading: true,
                hasError: false,
                isMailSent: false
            };

            expect(
                reducer(prevState, { type: checkEmail.rejected })
            ).toEqual({
                ...prevState,
                hasError: true,
                isLoading: false
            });
        });

        it('should set fulfilled status and switch mail sent status when completed', async () => {
            const { type } = await store.dispatch(
                checkEmail("Gan-96@yandex.ru")
            );

            expect(type).toBe("passResetApi/checkEmail/fulfilled");

            const state = store.getState().passResetApi;
            expect(state).toEqual({
                isLoading: false,
                hasError: false,
                isMailSent: true
            });
        });
    });

    describe('reset password thunk', () => {
        it('should set pending status while awaiting', () => {
            const prevState = {
                isLoading: false,
                hasError: false,
                isMailSent: true
            };

            expect(
                reducer(prevState, { type: resetPassword.pending })
            ).toEqual({
                ...prevState,
                isLoading: true
            });
        });

        it('should set rejected status when failed', () => {
            const prevState = {
                isLoading: true,
                hasError: false,
                isMailSent: true
            };

            expect(
                reducer(prevState, { type: resetPassword.rejected })
            ).toEqual({
                ...prevState,
                hasError: true,
                isLoading: false
            });
        });

        it('should set fulfilled status and switch mail sent status when completed', async () => {
            const { type } = await store.dispatch(
                resetPassword({
                    token: "3b77b637-d918-4383-82f1-2754a2419fff",
                    password: "qwerty123"
                })
            );

            expect(type).toBe("passResetApi/resetPassword/fulfilled");

            const state = store.getState().passResetApi;
            expect(state).toEqual({
                isLoading: false,
                hasError: false,
                isMailSent: false
            });
        });
    });
});