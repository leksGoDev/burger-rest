import reducer, { changeBun, addStuffing, removeStuffing, swapStuffing, clearConstructor } from "./constructor"

const UUID_MOCK = 'b07ebebe-9dd9-4f68-a002-902c23e57615';
jest.mock('uuid', () => ({ v4: () => UUID_MOCK }));

describe('constructor reducer', () => {
    it('should return the initial state', () => {
        expect(
            reducer(undefined, { type: undefined })
        ).toEqual({ bun: null, stuffing: [] });
    });

    it('should change bun ingredient', () => {
        const prevState = { bun: null, stuffing: [] };
        const bun = {
            _id: "60d3b41abdacab0026a733c6",
            name: "Краторная булка N-200i",
            type: "bun",
            proteins: 80,
            fat: 24,
            carbohydrates: 53,
            calories: 420,
            price: 1255,
            image: "https://code.s3.yandex.net/react/code/bun-02.png",
            image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
            image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
            __v: 0
        };

        expect(
            reducer(prevState, changeBun(bun))
        ).toEqual({
            bun: bun,
            stuffing: []
        });
    });

    it('should add stuffing', () => {
        const prevState = { bun: null, stuffing: [] };
        const stuffing = {
            _id: '60d3b41abdacab0026a733cd',
            name: 'Соус фирменный Space Sauce',
            type: 'sauce',
            proteins: 50,
            fat: 22,
            carbohydrates: 11,
            calories: 14,
            price: 80,
            image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
            __v: 0
        };

        expect(
            reducer(prevState, addStuffing(stuffing))
        ).toEqual({
            bun: null,
            stuffing: [{
                ...stuffing,
                dragId: UUID_MOCK
            }]
        });
    });

    it('should remove stuffing', () => {
        const dragId = 'b07ebebe-9dd9-4f68-a002-902c23e57615';
        const prevState = {
            bun: null,
            stuffing: [
                {
                    dragId: dragId,
                    _id: '60d3b41abdacab0026a733cd',
                    name: 'Соус фирменный Space Sauce',
                    type: 'sauce',
                    proteins: 50,
                    fat: 22,
                    carbohydrates: 11,
                    calories: 14,
                    price: 80,
                    image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
                    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
                    image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
                    __v: 0
                }
            ]
        };

        expect(
            reducer(prevState, removeStuffing(dragId))
        ).toEqual({ bun: null, stuffing: [] });
    });

    it('should swap stuffing', () => {
        const dragStuffing = {
            dragId: 'b07ebebe-9dd9-4f68-a002-902c23e57615',
            _id: '60d3b41abdacab0026a733cd',
            name: 'Соус фирменный Space Sauce',
            type: 'sauce',
            proteins: 50,
            fat: 22,
            carbohydrates: 11,
            calories: 14,
            price: 80,
            image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
            __v: 0
        };
        const hoverStuffing = {
            dragId: '1ddb1b23-c463-42eb-a15e-9c6414dc272c',
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
        };
        const prevState = {
            bun: null,
            stuffing: [
                dragStuffing,
                hoverStuffing
            ]
        };

        expect(
            reducer(prevState, swapStuffing({ dragIndex: 0, hoverIndex: 1 }))
        ).toEqual({
            bun: null,
            stuffing: [
                hoverStuffing,
                dragStuffing
            ]
        });
    });

    it('should clear constructor', () => {
        const prevState = {
            bun: {
                _id: "60d3b41abdacab0026a733c6",
                name: "Краторная булка N-200i",
                type: "bun",
                proteins: 80,
                fat: 24,
                carbohydrates: 53,
                calories: 420,
                price: 1255,
                image: "https://code.s3.yandex.net/react/code/bun-02.png",
                image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
                image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
                __v: 0
            },
            stuffing: [
                {
                    dragId: "b07ebebe-9dd9-4f68-a002-902c23e57615",
                    _id: "60d3b41abdacab0026a733ca",
                    name: "Говяжий метеорит (отбивная)",
                    type: "main",
                    proteins: 800,
                    fat: 800,
                    carbohydrates: 300,
                    calories: 2674,
                    price: 3000,
                    image: "https://code.s3.yandex.net/react/code/meat-04.png",
                    image_mobile: "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
                    image_large: "https://code.s3.yandex.net/react/code/meat-04-large.png",
                    __v: 0
                }
            ]
        };

        expect(
            reducer(prevState, clearConstructor())
        ).toEqual({ bun: null, stuffing: [] });
    });
});