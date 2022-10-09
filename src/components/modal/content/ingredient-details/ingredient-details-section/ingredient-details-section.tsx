import * as React from 'react';

import styles from "./ingredient-details-section.module.css";

interface Props {
    name: string;
    value: number;
    width: number;
}

const IngredientDetailsSection: React.FC<Props> = ({ name, value, width }) => {
    return (
        <section className={styles.section} style={{ width: `${width}px` }}>
            <p className="text text_type_main-default text_color_inactive">
                {name}
            </p>

            <p className="text text_type_digits-default text_color_inactive">
                {value}
            </p>
        </section>
    );
};

export default IngredientDetailsSection;