export enum IngredientType {
    bun = "bun",
    sauce = "sauce",
    main = "main"
}

export enum IngredientTypeName {
    bun = "Булки",
    sauce = "Соусы",
    main = "Начинки"
}

export interface Ingredient {
    _id: string;
    name: string;
    type: IngredientType;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
}

export interface DragIngredient extends Ingredient {
    dragId: string;
}