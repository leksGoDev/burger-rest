import { useEffect, useMemo } from "react";
import { useRouteMatch } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./redux";
import { setIngredientDetails } from "../services/store/slices/ingredient-details";
import { IFeedData } from "../models/order";

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
}