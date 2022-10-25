import * as React from 'react';
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";

import styles from "./drag-constructor-element.module.css";
import { Ingredient } from "../../../../models/ingredient";

interface Props {
    ingredient: Ingredient;
}

const DragConstructorElement: React.FC<Props> = ({ ingredient }) => {
    const { type, name, image, price } = ingredient;

    const [, drag] = useDrag<Ingredient>({
        type: type,
        item: ingredient
    });

    return (
        <li ref={drag} className={styles.listItem}>
            <DragIcon type="primary" />
            <ConstructorElement
                text={name}
                thumbnail={image}
                price={price}
            />
        </li>
    );
};

export default DragConstructorElement;