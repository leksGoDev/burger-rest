import * as React from 'react';
import { useDrop } from "react-dnd";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./burger-constructor-list.module.css";
import { Ingredient, IngredientType } from "../../../models/ingredient";
import { useAppDispatch } from "../../../hooks/redux";
import { addIngredient, changeBun } from "../../../services/store/slices/burgerConstructorSlice";

interface Props {
    bun: Ingredient | null;
    otherIngredients: Ingredient[];
}

const BurgerConstructorList: React.FC<Props> = ({ bun, otherIngredients }) => {
    const dispatch = useAppDispatch();
    const [, drop] = useDrop<Ingredient>({
       accept: 'ingredientsDnd',
        drop(ingredient) {
           if (ingredient.type === IngredientType.bun) dispatch(changeBun(ingredient));
           else dispatch(addIngredient(ingredient));
        }
    });

    return (
        <div ref={drop}>
            <header className={`${styles.bunSection} mb-4 pl-8`}>
                {
                    bun ?
                        <ConstructorElement
                            isLocked
                            type="top"
                            text={`${bun.name} (верх)`}
                            thumbnail={bun.image}
                            price={bun.price}
                        />
                        :
                        <div className="constructor-element constructor-element_pos_top" />
                }
            </header>

            <ul className={styles.list}>
                {otherIngredients.map(({ _id, name, image, price}) =>
                    <li key={_id} className={styles.listItem}>
                        <DragIcon type="primary" />
                        <ConstructorElement
                            text={name}
                            thumbnail={image}
                            price={price}
                        />
                    </li>
                )}
            </ul>

            <footer className={`${styles.bunSection} mt-4 pl-8`}>
                {
                    bun ?
                        <ConstructorElement
                            isLocked
                            type="bottom"
                            text={`${bun.name} (низ)`}
                            thumbnail={bun.image}
                            price={bun.price}
                        />
                        :
                        <div className="constructor-element constructor-element_pos_bottom" />
                }
            </footer>
        </div>
    );
};

export default BurgerConstructorList;