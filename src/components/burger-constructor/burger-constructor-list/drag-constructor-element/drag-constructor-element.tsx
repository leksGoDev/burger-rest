import * as React from 'react';
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";

import styles from "./drag-constructor-element.module.css";
import { Ingredient } from "../../../../models/ingredient";
import { useAppDispatch } from "../../../../hooks/redux";
import { removeStuffing } from "../../../../services/store/slices/burgerConstructorSlice";

interface Props {
    index: number;
    ingredient: Ingredient;
}

interface DragProps {
    isDrag: boolean;
}

const DragConstructorElement: React.FC<Props> = ({ index, ingredient }) => {
    const dispatch = useAppDispatch();

    const { name, image, price } = ingredient;

    const [{ isDrag }, drag] = useDrag<Ingredient, null, DragProps>({
        type: 'stuffing',
        item: ingredient,
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    }, [ingredient]);

    if (isDrag) return null;

    return (
        <li ref={drag} className={styles.listItem}>
            <DragIcon type="primary" />
            <ConstructorElement
                text={name}
                thumbnail={image}
                price={price}
                handleClose={dispatch.bind(null, removeStuffing(index))}
            />
        </li>
    );
};

export default DragConstructorElement;