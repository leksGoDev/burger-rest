import { TAuthApiActions } from "../services/store/slices/api/auth-api";
import { TFeedSocketApiActions } from "../services/store/slices/api/feed-socket-api";
import { TIngredientsApiActions } from "../services/store/slices/api/ingredients-api";
import { TOrderDetailsApiActions } from "../services/store/slices/api/order-details-api";
import { TPassResetApiActions } from "../services/store/slices/api/pass-reset-api";
import { TBurgerConstructorActions } from "../services/store/slices/constructor";
import { TFeedOrderDetailsActions } from "../services/store/slices/feed-order-details";
import { TIngredientDetailsActions } from "../services/store/slices/ingredient-details";

export type SliceActions<T> = {
    [K in keyof T]: {type: K; payload: T[K] extends (...args: infer P) => void ? P[0] : never};
}[keyof T];

export type TAppActions =
    TAuthApiActions |
    TFeedSocketApiActions |
    TIngredientsApiActions |
    TOrderDetailsApiActions |
    TPassResetApiActions |
    TBurgerConstructorActions |
    TFeedOrderDetailsActions |
    TIngredientDetailsActions;
