import * as React from 'react';

import styles from "./modal-overlay.module.css"

interface Props {
    children: React.ReactNode;
    onClick: () => void;
}

const ModalOverlay: React.FC<Props> = ({ children, onClick }) => {

    return (
        <section className={styles.section} onClick={onClick}>
            {children}
        </section>
    );
};

export default ModalOverlay;