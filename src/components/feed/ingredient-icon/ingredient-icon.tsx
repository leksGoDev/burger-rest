import type { FC } from 'react';

import styles from "./ingredient-icon.module.css";

interface IProps {
    src?: string;
    opacity?: number;
}

const IngredientIcon: FC<IProps> = ({ src, opacity }) => {

    return (
        <span className={styles.gradient} style={{ opacity: opacity }}>
            <span className={styles.background}>
                <img className={styles.img} src={src} alt="" />
            </span>
        </span>
    );
};

export default IngredientIcon;
