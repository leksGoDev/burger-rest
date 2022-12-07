import type { FC } from 'react';

import { IIngredient } from "../../../../../models/ingredient";

interface IProps {
    ids: IIngredient["_id"][];
}

const IngredientsIcons: FC<IProps> = ({ ids }) => {
    return (
        <div>

        </div>
    );
};

export default IngredientsIcons;
