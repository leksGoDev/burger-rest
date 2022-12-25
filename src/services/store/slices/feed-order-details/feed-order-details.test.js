import reducer, { setDetails, clearDetails } from "./feed-order-details"

describe('feed order details reducer', () => {
    it('should return the initial state', () => {
        expect(
            reducer(undefined, { type: undefined })
        ).toEqual({ details: null, hasDeallocated: false });
    });

    it('should set details', () => {
        const prevState = { details: null, hasDeallocated: false };
        const payloadExample = {
            status: "done",
            name: "Space spicy флюоресцентный антарианский бургер",
            number: 35701,
            createdAt: "2022-12-25T19:01:54.650Z",
            totalCost: 2146,
            ingredients: [
                {
                    _id: "60d3b41abdacab0026a733c7",
                    name: "Флюоресцентная булка R2-D3",
                    price: 988,
                    image: "https://code.s3.yandex.net/react/code/bun-01.png"
                },
                {
                    _id: "60d3b41abdacab0026a733cd",
                    name: "Соус фирменный Space Sauce",
                    price: 80,
                    image: "https://code.s3.yandex.net/react/code/sauce-04.png"
                },
                {
                    _id: "60d3b41abdacab0026a733cc",
                    name: "Соус Spicy-X",
                    price: 90,
                    image: "https://code.s3.yandex.net/react/code/sauce-02.png"
                },
                {
                    _id: "60d3b41abdacab0026a733c7",
                    name: "Флюоресцентная булка R2-D3",
                    price: 988,
                    image: "https://code.s3.yandex.net/react/code/bun-01.png"
                }
            ]
        };

        expect(
            reducer(prevState, setDetails(payloadExample))
        ).toEqual({
            details: {
                status: "done",
                name: "Space spicy флюоресцентный антарианский бургер",
                number: 35701,
                createdAt: "2022-12-25T19:01:54.650Z",
                totalCost: 2146,
                ingredients: {
                    "60d3b41abdacab0026a733c7": {
                        count: 2,
                        details: {
                            name: "Флюоресцентная булка R2-D3",
                            price: 988,
                            image: "https://code.s3.yandex.net/react/code/bun-01.png"
                        }
                    },
                    "60d3b41abdacab0026a733cd": {
                        count: 1,
                        details: {
                            name: "Соус фирменный Space Sauce",
                            price: 80,
                            image: "https://code.s3.yandex.net/react/code/sauce-04.png"
                        }
                    },
                    "60d3b41abdacab0026a733cc": {
                        count: 1,
                        details: {
                            name: "Соус Spicy-X",
                            price: 90,
                            image: "https://code.s3.yandex.net/react/code/sauce-02.png"
                        }
                    }
                }
            },
            hasDeallocated: false
        });
    });

    it('should clear details', () => {
        const prevState = {
            details: {
                status: 'done',
                name: 'Space spicy флюоресцентный антарианский бургер',
                number: 35701,
                createdAt: '2022-12-25T19:01:54.650Z',
                totalCost: 2234,
                ingredients: {
                    '60d3b41abdacab0026a733c7': {
                        count: 2,
                        details: {}
                    },
                    '60d3b41abdacab0026a733cd': {
                        count: 1,
                        details: {}
                    },
                    '60d3b41abdacab0026a733cc': {
                        count: 1,
                        details: {}
                    }
                }
            },
            hasDeallocated: false
        };

        expect(
            reducer(prevState, clearDetails())
        ).toEqual({ details: null, hasDeallocated: true });
    });
});