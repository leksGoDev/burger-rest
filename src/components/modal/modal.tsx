import { useEffect } from "react";
import type { FC, ReactNode } from 'react';
import { createPortal } from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import ModalOverlay from "./modal-overlay/modal-overlay";
import styles from "./modal.module.css";

interface Props {
    children: ReactNode;
    onClose: () => void;
}

const modalRoot = document.getElementById("modal");

const Modal: FC<Props> = ({ children, onClose }) => {
    useEffect(() => {
        const close = (e: KeyboardEvent) => {
            if (e.code === "Escape"){
                onClose();
            }
        };
        window.addEventListener('keydown', close);

        return () => window.removeEventListener('keydown', close);
    },[onClose])

    return (
        createPortal((
            <section>
                <ModalOverlay onClick={onClose} />

                <article className={styles.article}>
                    <button className={styles.button} onClick={onClose}>
                        <CloseIcon type="primary" />
                    </button>

                    {children}
                </article>
            </section>
        ), modalRoot!)
    );
};

export default Modal;