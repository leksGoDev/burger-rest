import * as React from 'react';

import styles from "./burger-constructor-list.module.css";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Ingredient } from "../../../models/ingredient";

interface Props {
    bun: Ingredient | null;
    otherIngredients: Ingredient[];
}

const BurgerConstructorList: React.FC<Props> = ({ bun, otherIngredients }) => {

    return (
        <>
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
        </>
    );
};

export default BurgerConstructorList;