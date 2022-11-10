import { useEffect } from "react";
import type { FC } from 'react';
import { useParams } from "react-router-dom";

import styles from "./ingredient.module.css";
import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { setDetails, deleteDetails } from "../../services/store/slices/ingredient-details";

const Ingredient: FC = () => {
    const { id } = useParams<{ id: string }>();
    const { data } = useAppSelector(store => store.ingredientsApi);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const ingredient = data.find(entry => entry._id === id);
        if (ingredient) {
            const { image_large, name, calories, proteins, fat, carbohydrates } = ingredient;
            dispatch(
                setDetails({ image_large, name, calories, proteins, fat, carbohydrates })
            );
        }

        return () => {
            dispatch(deleteDetails());
        }
    }, [id, data, dispatch]);

    return (
        <main className={styles.main}>
            <IngredientDetails />
        </main>
    );
};

export default Ingredient;