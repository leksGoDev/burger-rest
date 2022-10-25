import * as React from 'react';
import { useDrop } from "react-dnd";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./burger-constructor-list.module.css";
import { Ingredient, IngredientType } from "../../../models/ingredient";
import { useAppDispatch } from "../../../hooks/redux";
import { addIngredient, changeBun } from "../../../services/store/slices/burgerConstructorSlice";
import DragConstructorElement from "./drag-constructor-element/drag-constructor-element";

interface Props {
    bun: Ingredient | null;
    otherIngredients: Ingredient[];
}

const BurgerConstructorList: React.FC<Props> = ({ bun, otherIngredients }) => {
    const dispatch = useAppDispatch();

    const useBunDrop = () => useDrop<Ingredient>({
        accept: IngredientType.bun,
        drop(ingredient) {
            dispatch(changeBun(ingredient));
        }
    });
    const [, bunDropHeader] = useBunDrop();
    const [, bunDropFooter] = useBunDrop();
    const [, ingredientsDrop] = useDrop<Ingredient>({
        accept: IngredientType.sauce || IngredientType.main,
        drop(ingredient) {
            dispatch(addIngredient(ingredient));
        }
    });

    return (
        <>
            <header ref={bunDropHeader} className={`${styles.bunSection} mb-4 pl-8`}>
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

            <ul ref={ingredientsDrop} className={styles.list}>
                {otherIngredients.map(({ _id, name, image, price}) =>
                    <DragConstructorElement id={_id} name={name} price={price} image={image} />
                )}
            </ul>

            <footer ref={bunDropFooter} className={`${styles.bunSection} mt-4 pl-8`}>
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
        </>
    );
};

export default BurgerConstructorList;