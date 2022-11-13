import * as React from 'react';
import { useDrop } from "react-dnd";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./burger-constructor-list.module.css";
import { Ingredient, DragIngredient, IngredientType } from "../../../models/ingredient";
import { useAppDispatch } from "../../../hooks";
import { addStuffing, changeBun } from "../../../services/store/slices/constructor";
import ConstructorElementWrapper from "./constructor-element-wrapper/constructor-element-wrapper";

interface Props {
    bun: Ingredient | null;
    stuffing: DragIngredient[];
}

const BurgerConstructorList: React.FC<Props> = ({ bun, stuffing }) => {
    const dispatch = useAppDispatch();

    const useBunDrop = () => useDrop<Ingredient>({
        accept: IngredientType.bun,
        drop(ingredient) {
            dispatch(changeBun(ingredient));
        }
    }, [dispatch]);
    const [, bunDropHeader] = useBunDrop();
    const [, bunDropFooter] = useBunDrop();
    const [, stuffingDrop] = useDrop<Ingredient>({
        accept: 'stuffing',
        drop(ingredient) {
            dispatch(addStuffing(ingredient));
        }
    }, [dispatch]);

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

            <ul ref={stuffingDrop} className={styles.list}>
                {stuffing.map((ingredient, index) =>
                    <ConstructorElementWrapper key={ingredient.dragId} index={index} ingredient={ingredient} />
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