import type { FC } from 'react';

import { IIngredient } from "../../../../../models/ingredient";
import styles from "./ingredients-icons.module.css";

interface IProps {
    icons: (IIngredient["image"] | undefined)[];
}

const IngredientsIcons: FC<IProps> = ({ icons }) => {

    return (
        <article className={styles.row}>
            {
                icons.slice(0, 6).map((icon, index) =>
                    <span
                        key={index}
                        className={styles.gradient}
                        style={{ zIndex: (icons.length - index) }}
                    >
                        <span className={styles.background}>
                            <img
                                className={styles.img}
                                src={icon}
                                alt=""
                                style={{ opacity: index === 5 ? .6 : 1 }}
                            />
                        </span>

                        {
                            index === 5 &&
                                <p className={`${styles.counter} text text_type_main-default`}>
                                    +{icons.length - 5}
                                </p>
                        }
                    </span>
                )
            }
        </article>
    );
};

export default IngredientsIcons;
