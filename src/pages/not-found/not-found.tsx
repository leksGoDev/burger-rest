import type { FC } from 'react';

import styles from "./not-found.module.css";
import messageImg from "../../images/404.jpg";

const NotFound: FC = () => {

    return (
        <main className={styles.main}>
            <img className={styles.image} src={messageImg} alt="error" />
        </main>
    );
};

export default NotFound;