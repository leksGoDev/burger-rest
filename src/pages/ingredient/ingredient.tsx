import { useEffect } from "react";
import type { FC } from 'react';

import styles from "./ingredient.module.css";
import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { deleteIngredientDetails } from "../../services/store/slices/ingredient-details";

const Ingredient: FC = () => {
    const { details } = useAppSelector(store => store.ingredientDetails);
    const dispatch = useAppDispatch();

    useEffect(() => {
        return () => {
            if (details) {
                dispatch(deleteIngredientDetails());
            }
        }
    }, [dispatch, details]);

    return (
        <main className={styles.content}>
            <IngredientDetails />
        </main>
    );
};

export default Ingredient;