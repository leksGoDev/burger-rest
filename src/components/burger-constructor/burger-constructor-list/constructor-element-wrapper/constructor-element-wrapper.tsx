import * as React from 'react';
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, useDrop } from "react-dnd";

import styles from "./constructor-element-wrapper.module.css";
import { Ingredient } from "../../../../models/ingredient";
import { useAppDispatch } from "../../../../hooks/redux";
import { removeStuffing, swapStuffing } from "../../../../services/store/slices/burgerConstructorSlice";

interface Props {
    index: number;
    ingredient: Ingredient;
}

interface DndSortItem {
    index: number;
}

interface DragProps {
    isDrag: boolean;
}

const ConstructorElementWrapper: React.FC<Props> = ({ index, ingredient }) => {
    const { name, image, price } = ingredient;

    const dispatch = useAppDispatch();

    const ingredientRef: React.MutableRefObject<HTMLLIElement | null> = React.useRef(null);

    const [{ isDrag }, drag] = useDrag<DndSortItem, null, DragProps>({
        type: 'sort',
        item: { index },
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    }, [ingredient]);

    const [, drop] = useDrop<DndSortItem>({
        accept: 'sort',
        hover(item, monitor) {
            if (!ingredientRef.current) return;

            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) return;

            const hoverBoundingRect = ingredientRef.current.getBoundingClientRect();
            const hoverHalfHeight = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

            const clientOffset = monitor.getClientOffset();
            const hoverClientY = (clientOffset?.y ?? 0) - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverHalfHeight) return;
            if (dragIndex > hoverIndex && hoverClientY > hoverHalfHeight) return;

            dispatch(swapStuffing({ dragIndex, hoverIndex }));

            item.index = hoverIndex;
        }
    }, [dispatch, ingredientRef]);

    React.useEffect(() => {
        drag(drop(ingredientRef));
    }, [drag, drop, ingredientRef]);

    const opacity = isDrag ? 0 : 1;

    return (
        <li ref={ingredientRef} style={{ opacity }}>
            <div className={styles.listItem}>
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