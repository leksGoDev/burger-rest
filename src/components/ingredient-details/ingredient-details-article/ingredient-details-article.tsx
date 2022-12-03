import type { FC } from 'react';

import styles from "./ingredient-details-article.module.css";

interface IProps {
    name: string;
    value: number;
    width: number;
}

const IngredientDetailsArticle: FC<IProps> = ({ name, value, width }) => {

    return (
        <article className={styles.article} style={{ width: `${width}px` }}>
            <p className="text text_type_main-default text_color_inactive">
                {name}
            </p>

            <p className="text text_type_digits-default text_color_inactive">
                {value}
            </p>
        </article>
    );
};

export default IngredientDetailsArticle;