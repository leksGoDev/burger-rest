import { TAuthApiActions } from "../services/store/slices/auth-api/auth-api";
import { TFeedSocketApiActions } from "../services/store/slices/feed-socket-api/feed-socket-api";
import { TIngredientsApiActions } from "../services/store/slices/ingredients-api/ingredients-api";
import { TOrderDetailsApiActions } from "../services/store/slices/order-details-api/order-details-api";
import { TPassResetApiActions } from "../services/store/slices/pass-reset-api/pass-reset-api";
import { TBurgerConstructorActions } from "../services/store/slices/constructor/constructor";
import { TFeedOrderDetailsActions } from "../services/store/slices/feed-order-details/feed-order-details";
import { TIngredientDetailsActions } from "../services/store/slices/ingredient-details/ingredient-details";
import { THistorySocketApiActions } from "../services/store/slices/history-socket-api/history-socket-api";

export type SliceActions<T> = {
    [K in keyof T]: {type: K; payload: T[K] extends (...args: infer P) => void ? P[0] : never};
}[keyof T];

export type TAppActions =
    TAuthApiActions |
    TFeedSocketApiActions |
    THistorySocketApiActions |
    TIngredientsApiActions |
    TOrderDetailsApiActions |
    TPassResetApiActions |
    TBurgerConstructorActions |
    TFeedOrderDetailsActions |
    TIngredientDetailsActions;
