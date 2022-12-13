import { useEffect, useMemo } from "react";
import { useRouteMatch } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "./redux";
import { IFeedData } from "../models/order";
import { IIngredient } from "../models/ingredient";
import { setOrderDetails } from "../services/store/slices/feed-order-details";
import { setIngredientDetails } from "../services/store/slices/ingredient-details";

export const useRefreshIngredientDetails = () => {
    const match = useRouteMatch<{ id: string; }>("/ingredients/:id");
    const { hasDeallocated, details, data: ingredientsAll } = useAppSelector(
        store => ({ ...store.ingredientDetails, ...store.ingredientsApi })
    );
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (match && !details && !hasDeallocated) {
            const ingredient = ingredientsAll.find(entry => entry._id === match.params.id);
            if (ingredient) {
                const { image_large, name, calories, proteins, fat, carbohydrates } = ingredient;
                dispatch(
                    setIngredientDetails({ image_large, name, calories, proteins, fat, carbohydrates })
                );
            }
        }
    }, [match, hasDeallocated, details, ingredientsAll, dispatch]);
};

export const useSocketLastMessage = () => {
    const { messages } = useAppSelector(store => store.feedSocketApi);
    const emptyData: IFeedData = {
        total: 0,
        totalToday: 0,
        orders: []
    };
    const data: IFeedData= useMemo(
        () => (messages[messages.length - 1]) ?? emptyData,
        [messages]
    );

    return data;
};

export const usePrepareIngredientFullInfo = (ingredientsIds: IIngredient["_id"][]) => {
    const { data: ingredientsAll } = useAppSelector(store => store.ingredientsApi);

    return useMemo(
        () => {
            const ingredientsInfo = ingredientsIds.map(
                id => ingredientsAll.find(({_id}) => _id === id)
            );
            const totalCost = ingredientsInfo.reduce((acc, curr) => curr ? (curr.price + acc) : acc, 0);

            return { ingredientsInfo, totalCost };
        }, [ingredientsAll, ingredientsIds]
    );
};

export const useRefreshFeedOrderDetails = () => {
    const feedMatch = useRouteMatch<{ id: string; }>("/feed/:id");
    const profileMatch = useRouteMatch<{ id: string; }>("/profile/orders/:id");
    const dispatch = useAppDispatch();
    const message = useSocketLastMessage();
    const { hasDeallocated, details } = useAppSelector(store => store.feedOrderDetails);
    const order = useMemo(
        () => {
            const id = (feedMatch ?? profileMatch)?.params.id;
            return message.orders.find(({ _id }) => _id === id);
        },
        [message, feedMatch, profileMatch]
    );
    const { ingredientsInfo, totalCost } = usePrepareIngredientFullInfo(order?.ingredients ?? []);

    useEffect(() => {
        if ((feedMatch || profileMatch) && !details && !hasDeallocated && order) {
            const { status, name, number, createdAt } = order;
            dispatch(
                setOrderDetails({ status, name, number, createdAt, totalCost, ingredients: ingredientsInfo })
            );
        }
    }, [feedMatch, profileMatch, details, hasDeallocated, order, dispatch, totalCost, ingredientsInfo]);
};
