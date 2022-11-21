import type { FC } from 'react';

import styles from "./modal-overlay.module.css"

interface IProps {
    onClick: () => void;
}

const ModalOverlay: FC<IProps> = ({ onClick }) => {

    return (
        <aside className={styles.overlay} onClick={onClick} />
    );
};

export default ModalOverlay;