import * as React from 'react';
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import ModalOverlay from "./modal-overlay/modal-overlay";
import styles from "./modal.module.css";

interface Props {
    title?: string;
    children: React.ReactNode;
    onClose: () => void;
}

const modalRoot = document.getElementById("modal");

const Modal: React.FC<Props> = ({ title , children, onClose }) => {

    return (
        ReactDOM.createPortal((
            <section>
                <ModalOverlay onClick={onClose} />

                <article
                    className={styles.article}
                    style={{ height: "Детали ингредиента" ? "539px" : "718px"}}
                >
                    <header
                        className={`${styles.header} mt-15 ml-10 mr-10`}
                        style={{ justifyContent: title?.length ? "space-between" : "right" }}
                    >
                        <p className="text text_type_main-large">{title}</p>
                        <CloseIcon type="primary" onClick={onClose}/>
                    </header>

                    <main>
                        {children}
                    </main>
                </article>
            </section>
        ), modalRoot!)
    );
};

export default Modal;