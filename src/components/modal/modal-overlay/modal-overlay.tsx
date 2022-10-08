import * as React from 'react';

import styles from "./modal-overlay.module.css"

interface Props {
    children: React.ReactNode;
}

const ModalOverlay: React.FC<Props> = ({ children }) => {

    return (
        <section className={styles.section}>
            {children}
        </section>
    );
};

export default ModalOverlay;