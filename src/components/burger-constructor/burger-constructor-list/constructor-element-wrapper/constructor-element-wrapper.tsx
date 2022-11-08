import * as React from 'react';
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, useDrop } from "react-dnd";

import styles from "./constructor-element-wrapper.module.css";
import { DragIngredient } from "../../../../models/ingredient";
import { useAppDispatch } from "../../../../hooks";
import { removeStuffing, swapStuffing } from "../../../../services/store/slices/constructor";

interface Props {
    index: number;
    ingredient: DragIngredient;
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

    const handleRemoveStuffing = React.useCallback(
        () => dispatch(
            removeStuffing(ingredient.dragId)
        ), [ingredient, dispatch]);

    return (
        <li ref={ingredientRef} className={styles.listItem} style={{ opacity }}>
            <DragIcon type="primary" />
            <ConstructorElement
                text={name}
                thumbnail={image}
                price={price}
                handleClose={handleRemoveStuffing}
            />
        </li>
    );
};

export default ConstructorElementWrapper;