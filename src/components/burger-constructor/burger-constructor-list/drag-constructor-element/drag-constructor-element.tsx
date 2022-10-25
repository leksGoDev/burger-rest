import * as React from 'react';
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./drag-constructor-element.module.css";
import { Ingredient } from "../../../../models/ingredient";

type IConstructorElement = Pick<Ingredient, "name" | "image" | "price">;

interface Props extends IConstructorElement {
    id: Ingredient["_id"];
}

const DragConstructorElement: React.FC<Props> = ({ id, name, image, price }) => {

    return (
        <li key={id} className={styles.listItem}>
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