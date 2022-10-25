import * as React from 'react';
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";

import styles from "./constructor-element-wrapper.module.css";
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

const ConstructorElementWrapper: React.FC<Props> = ({ index, ingredient }) => {
    const dispatch = useAppDispatch();

    const { name, image, price } = ingredient;

    const [{ isDrag }, drag] = useDrag<Ingredient, null, DragProps>({
        type: 'sort',
        item: ingredient,
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    }, [ingredient]);

    if (isDrag) return null;

    return (
        <li>
            <div ref={drag} className={styles.listItem}>
                <DragIcon type="primary" />
                <ConstructorElement
                    text={name}
                    thumbnail={image}
                    price={price}
                    handleClose={dispatch.bind(null, removeStuffing(index))}
                />
            </div>
        </li>
    );
};

export default ConstructorElementWrapper;