import { rest } from "msw";
import { setupServer } from "msw/node";

import { HTTP_BASE_URL } from "../../../../constants/api";
import reducer, { clearDetails, makeOrder, findOrder } from "./order-details-api";
import { store } from "../../index";

const makeOrderMockData = {
    success: true,
    name: "Space флюоресцентный бургер",
    order: {
        ingredients: [],
        _id: "63a5e3e299a25c001cd6ccd5",
        owner: {},
        status: "done",
        name: "Space флюоресцентный бургер",
        createdAt: "2022-12-23T17:22:42.087Z",
        updatedAt: "2022-12-23T17:22:42.551Z",
        number: 35448,
        price: 2056
    }
};

const findOrderMockData = {
    success: true,
    orders: [
        {
            _id: "63a61fc399a25c001cd6cd6c",
            ingredients: [],
            owner: "636aa2b49b518a001bb7e69a",
            status: "done",
            name: "Space флюоресцентный бургер",
            createdAt: "2022-12-23T21:38:11.637Z",
            updatedAt: "2022-12-23T21:38:12.070Z",
            number: 35464,
            __v: 0
        }
    ]
};

const handlers = [
    rest.post(`${HTTP_BASE_URL}auth/token`, (_, res, ctx) => {
        return res(
            ctx.json({ success: true })
        );
    }),
    rest.post(`${HTTP_BASE_URL}orders`, (_, res, ctx) => {
        return res(
            ctx.json(makeOrderMockData),
            ctx.delay(150)
        );
    }),
    rest.get(`${HTTP_BASE_URL}orders/:orderNumber`, (_, res, ctx) => {
        return res(
            ctx.json(findOrderMockData),
            ctx.delay(150)
        );
    })
];
const server = setupServer(...handlers);

describe('order details api reducer', () => {
    beforeAll(() => server.listen());
    afterAll(() => server.close());

    it('should return the initial state', () => {
        expect(
            reducer(undefined, { type: undefined })
        ).toEqual({
            isLoading: false,
            hasError: false,
            hasDeallocated: false,
            orderNumber: null
        });
    });

    describe('make order thunk', () => {
        afterEach(() => server.resetHandlers());

        it('should set pending status while awaiting', () => {
            const prevState = {
                isLoading: false,
                hasError: false,
                hasDeallocated: false,
                orderNumber: null
            };

            expect(
                reducer(prevState, { type: makeOrder.pending })
            ).toEqual({
                ...prevState,
                isLoading: true,
                hasDeallocated: false
            });
        });

        it('should set rejected status when failed', () => {
            const prevState = {
                isLoading: true,
                hasError: false,
                hasDeallocated: false,
                orderNumber: null
            };

            expect(
                reducer(prevState, { type: makeOrder.rejected })
            ).toEqual({
                ...prevState,
                isLoading: false,
                hasError: true,
                orderNumber: null
            });
        });

        it('should set fulfilled status and save number when completed', async () => {
            const result = await store.dispatch(
                makeOrder(["60d3b41abdacab0026a733c7"])
            );
            const { type: actionType, payload: data } = result;

            expect(actionType).toBe("orderDetailsApi/makeOrder/fulfilled");
            expect(data.order.number).toBe(makeOrderMockData.order.number);

            const state = store.getState().orderDetailsApi;
            expect(state).toEqual({
                isLoading: false,
                hasError: false,
                hasDeallocated: false,
                orderNumber: makeOrderMockData.order.number
            });
        });
    });

    describe('find order thunk', () => {
        afterEach(() => server.resetHandlers());

        it('should set pending status while awaiting', () => {
            const prevState = {
                isLoading: false,
                hasError: false,
                hasDeallocated: false,
                orderNumber: null
            };

            expect(
                reducer(prevState, { type: findOrder.pending })
            ).toEqual({
                ...prevState,
                isLoading: true,
                hasDeallocated: false
            });
        });

        it('should set rejected status when failed', () => {
            const prevState = {
                isLoading: true,
                hasError: false,
                hasDeallocated: false,
                orderNumber: null
            };

            expect(
                reducer(prevState, { type: findOrder.rejected })
            ).toEqual({
                ...prevState,
                isLoading: false,
                hasError: true,
                orderNumber: null
            });
        });

        it('should set fulfilled status and save number when completed', async () => {
            const result = await store.dispatch(
                findOrder(35464)
            );
            const { type: actionType, payload: orders } = result;

            expect(actionType).toBe("orderDetailsApi/findOrder/fulfilled");
            expect(orders[0].number).toBe(findOrderMockData.orders[0].number);

            const state = store.getState().orderDetailsApi;
            expect(state).toEqual({
                isLoading: false,
                hasError: false,
                hasDeallocated: false,
                orderNumber: findOrderMockData.orders[0].number
            });
        });
    });

    it('should clear details', () => {
        const prevState = {
            isLoading: false,
            hasError: false,
            hasDeallocated: false,
            orderNumber: "3675"
        };

        expect(
            reducer(prevState, clearDetails())
        ).toEqual({
            ...prevState,
            hasDeallocated: true,
            orderNumber: null
        });
    });
});