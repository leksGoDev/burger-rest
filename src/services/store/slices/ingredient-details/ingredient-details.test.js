import reducer, { setDetails, clearDetails } from "./ingredient-details"

const detailsExample = {
    image_large: "https://code.s3.yandex.net/react/code/meat-03-large.png",
    name: "Филе Люминесцентного тетраодонтимформа",
    calories: 643,
    proteins: 44,
    fat: 26,
    carbohydrates: 85
};

describe('ingredient details reducer', () => {
    it('should return the initial state', () => {
        expect(
            reducer(undefined, { type: undefined })
        ).toEqual({ details: null, hasDeallocated: false });
    });

    it('should set details', () => {
        const prevState = { details: null, hasDeallocated: false };

        expect(
            reducer(prevState, setDetails(detailsExample))
        ).toEqual({ details: detailsExample, hasDeallocated: false });
    });

    it('should clear details', () => {
        const prevState = { details: detailsExample, hasDeallocated: false };

        expect(
            reducer(prevState, clearDetails())
        ).toEqual({ details: null, hasDeallocated: true});
    });
});