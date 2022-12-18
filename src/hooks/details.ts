import { useEffect, useMemo } from "react";
import { useRouteMatch } from "react-router-dom";

import { SocketStoreName } from "../constants/redux";
import { IFeedData } from "../models/order";
import { IIngredient } from "../models/ingredient";
import { useAppDispatch, useAppSelector } from "./redux";
import { setDetails as setOrderDetails } from "../services/store/slices/feed-order-details/feed-order-details";
import { setDetails as setIngredientDetails } from "../services/store/slices/ingredient-details/ingredient-details";
import { findOrder } from "../services/store/slices/order-details-api/order-details-api";

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

export const useSocketLastMessage = (storeName: SocketStoreName) => {
    const { messages } = useAppSelector(store => store[storeName]);
    const emptyData: IFeedData = {
        total: 0,
        totalToday: 0,
        orders: []
    };
    const data: IFeedData= useMemo(
        () => (messages[messages.length - 1]) ?? emptyData,
        [messages, storeName, emptyData]
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
    const message = useSocketLastMessage(feedMatch ? SocketStoreName.feed : SocketStoreName.history);
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

export const useRefreshNewOrderDetails = () => {
    const match = useRouteMatch<{ id: string; }>("/orders/:id");
    const dispatch = useAppDispatch();
    const { orderNumber, isLoading, hasDeallocated } = useAppSelector(store => store.orderDetailsApi);

    useEffect(() => {
        if (match && !orderNumber && !hasDeallocated && !isLoading) {
            dispatch(findOrder(match.params.id));
        }
    }, [match, orderNumber, hasDeallocated, isLoading, dispatch]);

};