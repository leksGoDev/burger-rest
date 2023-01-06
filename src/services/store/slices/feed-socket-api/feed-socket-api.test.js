import reducer, { opened, failed, closed, received } from "./feed-socket-api";

const messageExample = {
    success: true,
    orders: [
        {
            _id: '63a987ff99a25c001cd6da31',
            ingredients: [
                '60d3b41abdacab0026a733cf'
            ],
            status: 'done',
            name: 'Антарианский бургер',
            createdAt: '2022-12-26T11:39:43.760Z',
            updatedAt: '2022-12-26T11:39:44.163Z',
            number: 35754
        },
        {
            _id: '63a986d399a25c001cd6da29',
            ingredients: [
                '60d3b41abdacab0026a733cf',
                '60d3b41abdacab0026a733ca',
                '60d3b41abdacab0026a733d2'
            ],
            status: 'done',
            name: 'Антарианский альфа-сахаридный метеоритный бургер',
            createdAt: '2022-12-26T11:34:43.324Z',
            updatedAt: '2022-12-26T11:34:43.709Z',
            number: 35753
        }
    ],
    total: 35663,
    totalToday: 135
};

describe('feed socket api reducer', () => {
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