import { rest } from "msw";
import { setupServer } from "msw/node";

import { HTTP_BASE_URL } from "../../../../constants/api";
import reducer, { fetchIngredients } from "./ingredients-api";
import { store } from "../../index";

const ingredientsDataMock = [
    {
        _id: '60d3b41abdacab0026a733c6',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
        __v: 0
    },
    {
        _id: '60d3b41abdacab0026a733c8',
        name: 'Филе Люминесцентного тетраодонтимформа',
        type: 'main',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/meat-03.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
        __v: 0
    },
    {
        _id: '60d3b41abdacab0026a733cc',
        name: 'Соус Spicy-X',
        type: 'sauce',
        proteins: 30,
        fat: 20,
        carbohydrates: 40,
        calories: 30,
        price: 90,
        image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
        __v: 0
    }
];

const handlers = [
    rest.get(`${HTTP_BASE_URL}ingredients`, (_, res, ctx) => {
        return res(
            ctx.json({
                success: true,
                data: ingredientsDataMock
            }),
            ctx.delay(150)
        );
    })
];
const server = setupServer(...handlers);

describe('ingredients api reducer', () => {
    beforeAll(() => server.listen());
    afterAll(() => server.close());
    afterEach(() => server.resetHandlers());

    it('should return the initial state', () => {
        expect(
            reducer(undefined, { type: undefined })
        ).toEqual({
            isLoading: false,
            hasError: false,
            data: []
        });
    });

    it('should set pending status while awaiting', () => {
        const prevState = {
            isLoading: false,
            hasError: false,
            data: []
        };

        expect(
            reducer(prevState, { type: fetchIngredients.pending })
        ).toEqual({
            ...prevState,
            isLoading: true
        });
    });

    it('should set rejected status when failed', () => {
        const prevState = {
            isLoading: true,
            hasError: false,
            data: []
        };

        expect(
            reducer(prevState, { type: fetchIngredients.rejected })
        ).toEqual({
            isLoading: false,
            hasError: true,
            data: []
        });
    });

    it('should set fulfilled status and save ingredients when completed', async () => {
        const result = await store.dispatch(
            fetchIngredients()
        );
        const { type: actionType, payload: data } = result;

        expect(actionType).toBe("ingredientsApi/fetchIngredients/fulfilled");
        expect(data).toEqual(ingredientsDataMock);

        const state = store.getState().ingredientsApi;
        expect(state).toEqual({
            isLoading: false,
            hasError: false,
            data: ingredientsDataMock
        });
    });
});