import * as React from 'react';
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import ModalOverlay from "./modal-overlay/modal-overlay";
import styles from "./modal.module.css";

interface Props {
    children?: React.ReactNode;
}

const modalRoot = document.getElementById("modal");

const Modal: React.FC<Props> = ({ children }) => {

    return (
        ReactDOM.createPortal((
            <ModalOverlay>
                <article className={styles.article}>
                    <header className={styles.header}>
                        <span className={styles.icon}>
                            <CloseIcon type="primary" />
                        </span>
                    </header>

                    <main>
                        {children}
                    </main>
                </article>
            </ModalOverlay>
        ), modalRoot!)
    );
};

export default Modal;