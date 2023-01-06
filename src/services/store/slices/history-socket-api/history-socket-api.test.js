import reducer, { opened, failed, closed, received } from "./history-socket-api";

const messageExample = {
    success: true,
    orders: [
        {
            _id: '636cd6d09b518a001bb7fa79',
            ingredients: [
                '60d3b41abdacab0026a733c7',
                '60d3b41abdacab0026a733cd',
                '60d3b41abdacab0026a733cf',
                '60d3b41abdacab0026a733c9',
                '60d3b41abdacab0026a733c7'
            ],
            status: 'done',
            name: 'Бессмертный флюоресцентный space антарианский бургер',
            createdAt: '2022-11-10T10:47:44.101Z',
            updatedAt: '2022-11-10T10:47:44.466Z',
            number: 30014
        }
    ],
    total: 35665,
    totalToday: 130
};

describe('history socket api reducer', () => {
    it('should return the initial state', () => {
        expect(
            reducer(undefined, { type: undefined })
        ).toEqual({
            connected: false,
            hasError: false,
            messages: []
        });
    });

    it('should set opened status', () => {
        const prevState = {
            connected: false,
            hasError: false,
            messages: []
        };

        expect(
            reducer(prevState, opened())
        ).toEqual({
            ...prevState,
            connected: true,
            hasError: false
        });
    });

    it('should set failed status', () => {
        const prevState = {
            connected: true,
            hasError: false,
            messages: []
        };

        expect(
            reducer(prevState, failed())
        ).toEqual({
            ...prevState,
            connected: false,
            hasError: true
        });
    });

    it('should set closed status', () => {
        const prevState = {
            connected: true,
            hasError: false,
            messages: [messageExample]
        };

        expect(
            reducer(prevState, closed())
        ).toEqual({
            connected: false,
            hasError: false,
            messages: []
        });
    });

    it('should save message', () => {
        const prevState = {
            connected: true,
            hasError: false,
            messages: []
        };
        const jsonMessage = JSON.stringify(messageExample);

        expect(
            reducer(prevState, received(jsonMessage))
        ).toEqual({
            ...prevState,
            messages: [messageExample]
        });
    });
});